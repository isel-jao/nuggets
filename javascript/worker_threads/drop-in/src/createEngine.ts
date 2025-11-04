import { IEngine } from "./IEngine.js";
import { Engine } from "./engine.js";

export function createEngine(): IEngine {
  return new Engine();
}
