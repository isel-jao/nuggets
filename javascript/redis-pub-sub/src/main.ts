import { Redis } from "ioredis";

const publisher: Redis = new Redis({
  host: "localhost",
  port: 6379,
  lazyConnect: true,
  username: "default",
  password: "your_password_here",
  db: 0,
});

const subscriber1 = new Redis({
  host: "localhost",
  port: 6379,
  lazyConnect: true,
  db: 0,
});

const subscriber2 = new Redis({
  host: "localhost",
  port: 6379,
  lazyConnect: false,
  db: 0,
});

const channel = "notification";

publisher.on("error", (err) => console.error("Publisher Error:", err));
subscriber1.on("error", (err) => console.error("Subscriber Error:", err));
subscriber2.on("error", (err) => console.error("Subscriber Error:", err));

publisher.on("connect", () => {
  console.log("Publisher connected to Redis");
});

subscriber1.on("connect", () => {
  console.log("Subscriber 1 connected to Redis");
});

subscriber2.on("connect", () => {
  console.log("Subscriber 2 connected to Redis");
});

subscriber1.on("reconnecting", () => {
  console.log("Subscriber 1 reconnecting to Redis");
});

async function main() {
  await subscriber1.subscribe(channel, (err, count) => {
    if (err) {
      console.error("Failed to subscribe: ", err);
    } else {
      console.log(`Subscriber 1 subscribed to ${count} channel(s).`);
    }
  });
  await subscriber2.subscribe(channel, (err, count) => {
    if (err) {
      console.error("Failed to subscribe: ", err);
    } else {
      console.log(`Subscriber 2 subscribed to ${count} channel(s).`);
    }
  });
  subscriber1.on("message", (chan, message) => {
    console.log(`Subscriber 1 received message from ${chan}: ${message}`);
  });
  subscriber2.on("message", (chan, message) => {
    console.log(`Subscriber 2 received message from ${chan}: ${message}`);
  });
  let messageCount = 0;
  const intervalId = setInterval(() => {
    const message = `Notification ${++messageCount}`;
    publisher.publish(channel, message);
    console.log(`Published: ${message}`);
  }, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
    publisher.quit();
    subscriber1.quit();
    subscriber2.quit();
    console.log("Stopped publishing and unsubscribed.");
  }, 5_000);
}

main().catch((err) => console.error("Error in main:", err));
