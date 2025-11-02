import { Worker } from "node:worker_threads";

const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker(
  `
  const { workerData, parentPort } = require('node:worker_threads');
  const sharedArray = new Int32Array(workerData.sharedBuffer);
  
  // Atomic operations prevent race conditions
  Atomics.add(sharedArray, 0, 5);
  parentPort.postMessage('done');
`,
  {
    eval: true,
    workerData: { sharedBuffer },
  }
);

worker.on("message", (msg) => {
  if (msg === "done") {
    console.log("Worker has finished execution.");
    console.log("Value in shared array:", Atomics.load(sharedArray, 0)); // Should log 5
  }
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});

worker.on("exit", (code) => {
  if (code !== 0)
    console.error(new Error(`Worker stopped with exit code ${code}`));
});
