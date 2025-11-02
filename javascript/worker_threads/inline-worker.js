import { Worker } from "node:worker_threads";

const worker = new Worker(
  `
  const { parentPort } = require('node:worker_threads');
  parentPort.postMessage('Hello from worker!');
`,
  { eval: true }
);

worker.on("message", (msg) => {
  console.log("Received from worker:", msg);
});
