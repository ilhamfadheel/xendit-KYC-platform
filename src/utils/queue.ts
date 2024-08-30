export class Queue<T> {
  private items: T[] = [];
  private processing: Set<T> = new Set();

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    const item = this.items.shift();
    if (item) {
      this.processing.add(item);
    }
    return item;
  }

  complete(item: T): void {
    this.processing.delete(item);
  }

  requeue(item: T): void {
    this.processing.delete(item);
    this.items.push(item);
  }

  isEmpty(): boolean {
    return this.items.length === 0 && this.processing.size === 0;
  }
}

export const amlQueue = new Queue<{
  submissionId: string;
  customerData: any;
  partnerId: string;
}>();
export const cftQueue = new Queue<{
  submissionId: string;
  customerData: any;
  partnerId: string;
}>();
