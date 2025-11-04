import { IEngine } from "./IEngine.js";

export class Engine implements IEngine {
  private status: string;
  constructor() {
    this.status = "stopped";
  }
  async start(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.status = "running";
  }

  async stop(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.status = "stopped";
  }

  async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  async getStatus(): Promise<string> {
    return this.status;
  }

  async doWork(task: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return `Completed task: ${task}`;
  }
}
