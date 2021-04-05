import EventEmitter from "events";
import { promises } from "fs";

import chokidar from "chokidar";

import Queue from "./queue";

const { stat, readdir } = promises;

export interface FileWatcherDelegate {
  startHandleFile(path: string): void;

  stopHandleFile(path: string): void;

  handingFileChange(path: string): void;
}

enum TaskType {
  add,
  change,
  remove,
}

interface HandleTask {
  path: string;
  type: TaskType;
}

export class FileWatcher {
  public static ignored = [
    `**/*.un~`,
    `**/.DS_Store`,
    `**/.gitignore`,
    `**/.npmignore`,
    `**/.babelrc`,
    `**/yarn.lock`,
    `**/bower_components`,
    `**/node_modules`,
    `../**/dist/**`,
  ];
  private includedFiles = new Set<string>();
  private tasks = new Queue<HandleTask>();
  private eventEmitter = new EventEmitter();
  private locked = false;
  public delegate?: FileWatcherDelegate;

  constructor(public readonly targetDir: string) {}

  public start() {
    chokidar
      .watch(this.targetDir, { ignored: FileWatcher.ignored, atomic: true })
      .on("add", (path) => {
        const task: HandleTask = {
          type: TaskType.add,
          path: path,
        };
        this.tasks.enqueue(task);
        this.startTask();
      })
      .on("unlink", (path) => {
        const task: HandleTask = {
          type: TaskType.remove,
          path: path,
        };
        this.tasks.enqueue(task);
        this.startTask();
      })
      .on("unlinkDir", async (path) => {
        const task: HandleTask = {
          type: TaskType.remove,
          path: path,
        };
        this.tasks.enqueue(task);
        this.startTask();
      })
      .on("change", (path) => {
        const task: HandleTask = {
          type: TaskType.change,
          path: path,
        };
        this.tasks.enqueue(task);
        this.startTask();
      });
  }

  private startTask() {
    if (!this.locked) {
      this.locked = true;
      this.handleTask().then();
      return;
    }
    this.eventEmitter.once("unlock", () => {
      this.startTask();
    });
  }

  private async handleTask() {
    this.locked = true;

    const task = this.tasks.dequeue();
    if (task) {
      switch (task.type) {
        case TaskType.add: {
          const addStatus = await stat(task.path);
          if (addStatus.isDirectory()) {
            const children = await readdir(task.path);
            for (const child of children) {
              if (!this.includedFiles.has(child)) {
                this.includedFiles.add(child);
                this.delegate?.startHandleFile(child);
              }
            }
            break;
          }
          if (!this.includedFiles.has(task.path)) {
            this.includedFiles.add(task.path);
            this.delegate?.startHandleFile(task.path);
          }
          break;
        }
        case TaskType.change: {
          this.delegate?.handingFileChange(task.path);
          break;
        }
        case TaskType.remove: {
          const removeStatus = await stat(task.path);
          if (removeStatus.isDirectory()) {
            const children = await readdir(task.path);
            for (const child of children) {
              if (this.includedFiles.has(child)) {
                this.includedFiles.delete(child);
                this.delegate?.stopHandleFile(child);
              }
            }
            break;
          }
          if (this.includedFiles.has(task.path)) {
            this.includedFiles.delete(task.path);
            this.delegate?.stopHandleFile(task.path);
          }
          break;
        }
      }
    }

    this.locked = false;
    this.eventEmitter.emit("unlock");
  }
}
