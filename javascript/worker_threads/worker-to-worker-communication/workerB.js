import { parentPort, workerData } from "node:worker_threads";

const { peerPort } = workerData;

parentPort.on("message", (msg) => {
  const { type, data } = msg;
  if (type === "ping") {
    peerPort.postMessage("Hello from Worker B!");
  }
  if (type == "task") {
    parentPort.postMessage({ type: "result", data: data + 1 });
  }
});

peerPort.on("message", (data) => {
  console.log("Worker B received from peer:", data);
});
