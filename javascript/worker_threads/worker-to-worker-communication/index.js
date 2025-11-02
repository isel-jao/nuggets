import { Worker, MessageChannel } from "node:worker_threads";

// Create two workers
const workerA = new Worker(new URL("./workerA.js", import.meta.url).pathname);
const workerB = new Worker(new URL("./workerB.js", import.meta.url).pathname);

// Create a channel
const { port1, port2 } = new MessageChannel();

// Transfer port1 to workerA and port2 to workerB
// IMPORTANT: Use transferList to actually transfer the ports
workerA.postMessage({ type: "connect", port: port1 }, [port1]);
workerB.postMessage({ type: "connect", port: port2 }, [port2]);

console.log("Workers connected via MessageChannel");
