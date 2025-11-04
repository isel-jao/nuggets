import { parentPort, workerData } from "node:worker_threads";

const { peerPort } = workerData;

parentPort.on("message", (msg) => {
  const { type } = msg;
  if (type === "ping") {
    peerPort.postMessage("Hello from Worker A!");
  }
  if (type == "task") {
    parentPort.postMessage({ type: "result", data: msg.data * 2 });
  }
});

peerPort.on("message", (data) => {
  console.log("Worker A received from peer:", data);
});
