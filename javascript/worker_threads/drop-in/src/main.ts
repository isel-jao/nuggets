import { createEngine } from "./createEngine.js";

const engine = createEngine({
  multiThreaded: process.env.MULTI_THREADED === "true",
});

async function main() {
  await engine.start();
  const result = await engine.doWork("Sample Task");
  console.log("Work Result:", result);
  const status = await engine.getStatus();
  console.log("Engine Status:", status);
  await engine.stop();
}

main().catch((err) => {
  console.error("Error in main:", err);
});
