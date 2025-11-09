import { IEngine } from "./IEngine.js";
import { Worker } from "node:worker_threads";
import { cpus } from "node:os";
import { randomUUID } from "node:crypto";

type Resolver = {
  resolve: (value: unknown) => void;
  reject: (reason?: undefined) => void;
};

type WorkerInfo = {
  id: string;
  worker: Worker;
  pendingTasks: Map<string, Resolver>;
};

type MultithreadManagerOptions = {
  size?: number;
};

const workerScript = `
const {Engine} = require('./dist/engine.js');
const { parentPort } = require('worker_threads');

let eng = new Engine();

parentPort.on('message', async (message) => {
  const { id, method, params } = message;
  try {
    const result = await eng[method](...params);
    parentPort.postMessage({ id, result });
  }
    catch (error) {
    parentPort.postMessage({ id, error: error.message });
    }
});
`;
export class MultithreadManager implements IEngine {
  private workersInfo: Map<number, WorkerInfo>;

  constructor(options?: MultithreadManagerOptions) {
    const { size = Math.max(1, cpus().length - 1) } = options || {};
    this.workersInfo = new Map();

    for (let i = 0; i < size; i++) {
      const worker = new Worker(workerScript, { eval: true });
      const pendingTasks: Map<string, Resolver> = new Map();
      const id = `worker-${i}`;
      const workerInfo: WorkerInfo = { id, worker, pendingTasks };
      worker.on("message", (message) => {
        const { id: messageId, result, error } = message;
        const resolver = pendingTasks.get(messageId);
        if (resolver) {
          if (error) {
            resolver.reject(error);
          } else {
            resolver.resolve(result);
          }
          pendingTasks.delete(messageId);
        }
      });
      this.workersInfo.set(i, workerInfo);
      console.log(`Started worker ${id}`);
    }
  }

  private async dispatchTask(method: string, ...params: unknown[]) {
    const workerInfos = Array.from(this.workersInfo.values());
    const workerInfo = workerInfos.reduce((prev, curr) =>
      prev.pendingTasks.size <= curr.pendingTasks.size ? prev : curr
    );

    return new Promise((resolve, reject) => {
      const taskId = randomUUID();
      workerInfo.pendingTasks.set(taskId, { resolve, reject });
      workerInfo.worker.postMessage({ id: taskId, method, params });
    });
  }

  doSomething1(task: string): Promise<string> {
    return this.dispatchTask("doSomething1", task) as Promise<string>;
  }
  doSomething2(task: string): Promise<string> {
    return this.dispatchTask("doSomething2", task) as Promise<string>;
  }
  doSomething3(task: string): Promise<number> {
    return this.dispatchTask("doSomething3", task) as Promise<number>;
  }
}
