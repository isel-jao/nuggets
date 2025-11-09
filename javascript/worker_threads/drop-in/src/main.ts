import { createEngine } from "./createEngine.js";

const engine = createEngine({
  multiThreaded: process.env.MULTI_THREADED === "true",
});

async function main() {
  const result = await Promise.all(
    Array.from({ length: 3 }, (_, i) => i + 1).map((i) =>
      engine.doSomething1(`Task ${i}`)
    )
  );
  console.log("All tasks completed", { result });
}

main().catch((err) => {
  console.error("Error in main:", err);
});
