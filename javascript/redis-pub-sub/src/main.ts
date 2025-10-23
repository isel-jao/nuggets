import { createClient } from "redis";

const publisher = createClient({ url: "redis://localhost:6379" });

const subscriber1 = createClient({ url: "redis://localhost:6379" });

const subscriber2 = createClient({ url: "redis://localhost:6379" });

const channel = "notifications";

publisher.on("error", (err) => console.error("Publisher Error:", err));
subscriber1.on("error", (err) => console.error("Subscriber Error:", err));

async function main() {
  await Promise.all([
    publisher.connect(),
    subscriber1.connect(),
    subscriber2.connect(),
  ]);
  console.log("✓ Connected to Redis\n");

  await subscriber1.subscribe([channel], (message) => {
    console.log(`📬 Subscriber 1 [${channel}] Received: ${message}`);
  });
  console.log(`✓ Subscriber 1 subscribed to '${channel}' channel`);

  await subscriber2.subscribe(channel, (message) => {
    console.log(`📬 Subscriber 2 [${channel}] Received: ${message}`);
  });
  console.log(`✓ Subscriber 2 subscribed to '${channel}' channel`);

  // Publish messages with delays
  console.log("📤 Publishing messages...\n");

  let count = 0;
  let intervalId = setInterval(() => {
    publisher.publish(channel, `Hello ${++count} from publisher!`);
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
    publisher.quit();
    subscriber1.quit();
    subscriber2.quit();
    console.log("\n✓ Finished publishing messages and disconnected.");
  }, 5000);
}

main().catch((err) => console.error("Error in main:", err));
