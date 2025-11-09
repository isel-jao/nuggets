import { IEngine } from "./IEngine.js";

export class Engine implements IEngine {
  async doSomething1(task: string): Promise<string> {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const now = Date.now();
    while (Date.now() - now < 5_000) {
      // Busy wait for 2 seconds
    }
    return `Completed something 1 with task: ${task}`;
  }
  async doSomething2(task: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `Completed something 2 with task: ${task}`;
  }
  async doSomething3(task: string): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return task.length;
  }
}
