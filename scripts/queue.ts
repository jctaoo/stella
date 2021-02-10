class Queue<T> {
  private items = new Array<T>();

  constructor() {
    this.items = [];
  }

  enqueue(...args: T[]) {
    const len = args.length;
    if (len === 0) {
      return;
    }
    for (const item of args) {
      this.items.push(item);
    }
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  show() {
    return this.items;
  }
}

export default Queue;
