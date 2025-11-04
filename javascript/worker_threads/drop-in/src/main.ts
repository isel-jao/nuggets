import { createEngine } from "./createEngine";

const engine = createEngine();

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
