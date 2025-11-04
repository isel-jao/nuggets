import { Worker, MessageChannel } from "node:worker_threads";

// Create a channel
const { port1, port2 } = new MessageChannel();

// Create two workers
const workerA = new Worker(new URL("./workerA.js", import.meta.url).pathname, {
  workerData: {
    peerPort: port1,
  },
  transferList: [port1],
});
const workerB = new Worker(new URL("./workerB.js", import.meta.url).pathname, {
  workerData: {
    peerPort: port2,
  },
  transferList: [port2],
});

workerA.on("message", (msg) => {
  const { type, data } = msg;
  if (type === "result") {
    console.log("Main thread received from Worker A:", data);
  }
});

workerB.on("message", (msg) => {
  const { type, data } = msg;
  if (type === "result") {
    console.log("Main thread received from Worker B:", data);
  }
});

workerA.postMessage({ type: "ping" });
workerB.postMessage({ type: "ping" });

workerA.postMessage({ type: "task", data: 5 });
workerB.postMessage({ type: "task", data: 10 });
