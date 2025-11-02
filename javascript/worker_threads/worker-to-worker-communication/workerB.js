import { parentPort } from "node:worker_threads";

let peerPort = null;

parentPort.on("message", (msg) => {
  if (msg.type === "connect") {
    peerPort = msg.port;

    peerPort.on("message", (data) => {
      console.log("Worker B received from peer:", data);

      // Reply back
      peerPort.postMessage("Hello back from Worker B!");
    });
  }
});
