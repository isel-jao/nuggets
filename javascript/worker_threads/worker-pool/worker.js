import { parentPort, isMainThread } from "node:worker_threads";
import { task1, task2 } from "./utils.js";

if (isMainThread) {
  throw new Error("This file should be run as a worker thread");
}

const tasks = {
  task1,
  task2,
};

parentPort.on("message", async (msg) => {
  const { taskId, taskName, taskData } = msg;
  const taskFunction = tasks[taskName];
  if (taskFunction) {
    const result = await taskFunction(taskData);
    parentPort.postMessage({ taskId, result });
  } else {
    parentPort.postMessage({ taskId, error: "Unknown task" });
  }
});
