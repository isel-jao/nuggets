import { parentPort } from "node:worker_threads";

let peerPort = null;

parentPort.on("message", (msg) => {
  if (msg.type === "connect") {
    peerPort = msg.port;

    // Set up message handler
    peerPort.on("message", (data) => {
      console.log("Worker A received from peer:", data);
    });

    // Send a message to Worker B
    peerPort.postMessage("Hello from Worker A!");
  }
});
