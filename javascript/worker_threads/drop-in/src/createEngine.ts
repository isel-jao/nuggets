import { IEngine } from "./IEngine.js";
import { Engine } from "./engine.js";
import { MultithreadManager } from "./multithreadManager.js";

type CrateEngineOptions = {
  multiThreaded?: boolean;
};
export function createEngine(options?: CrateEngineOptions): IEngine {
  if (options?.multiThreaded) {
    return new MultithreadManager();
  }
  return new Engine();
}
