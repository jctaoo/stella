import { execSync } from "child_process";
import path from "path";
import type { Plugin } from "unified";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";

const pExecFile = promisify(execFile);

export interface GitTimeOptions {
  /**
   * Git 仓库根目录（默认 process.cwd()）
   */
  repoRoot?: string;
  /**
   * 当无法从 git 获得时间时，是否回退到 fs.stat 的 mtime/ctime
   */
  fallbackToFs?: boolean;
}

export type GitTime = {
  createdAt?: string;
  updatedAt?: string;
};

const cache = new Map<string, Promise<GitTime>>();

async function getGitTime(absPath: string, options: Required<GitTimeOptions>): Promise<GitTime> {
  const { repoRoot, fallbackToFs } = options;
  const rel = path.relative(repoRoot, absPath);

  // 并行两次 git log：
  // 1) 最近一次提交时间
  const lastArgs = [
    "-C",
    repoRoot,
    "log",
    "-1",
    "--date=iso-strict",
    "--format=%ad",
    "--follow",
    "--",
    rel,
  ];

  // 2) 首次（A=added）提交时间
  const firstArgs = [
    "-C",
    repoRoot,
    "log",
    "--diff-filter=A",
    "--follow",
    "--date=iso-strict",
    "--format=%ad",
    "-1",
    "--",
    rel,
  ];

  const [lastResult, firstResult] = await Promise.all([
    pExecFile("git", lastArgs),
    pExecFile("git", firstArgs),
  ]);

  const createdAt = firstResult.stdout.trim();
  const updatedAt = lastResult.stdout.trim();

  if (createdAt || updatedAt) {
    return {
      createdAt,
      updatedAt,
    };
  }

  if (fallbackToFs) {
    const stats = await fs.stat(absPath);
    return {
      createdAt: stats.ctime.toISOString(),
      updatedAt: stats.mtime.toISOString(),
    };
  }

  return {};
}

export const remarkModifiedTime: Plugin<[GitTimeOptions]> = function (options) {
  const { repoRoot = process.cwd(), fallbackToFs = true } = options;

  return async (tree, file) => {
    const absPath = file.path ? path.resolve(file.path) : undefined;
    if (!absPath) return;

    const key = `${absPath}|${repoRoot}|${fallbackToFs}`;
    const timesPromise = cache.get(key) ?? getGitTime(absPath, { repoRoot, fallbackToFs });
    cache.set(key, timesPromise);

    const times = await timesPromise;

    if (file.data.astro && file.data.astro.frontmatter) {
      file.data.astro.frontmatter.gitTimes = times;
    }
  };
};
