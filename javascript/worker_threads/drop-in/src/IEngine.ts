import { P } from "pino";

export interface IEngine {
  start(): Promise<void>;
  stop(): Promise<void>;
  restart(): Promise<void>;
  getStatus(): Promise<string>;
  doWork(task: string): Promise<string>;
}
