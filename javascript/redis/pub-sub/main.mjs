import Redis from "ioredis";

const config = {
  host: "localhost",
  port: 6379,
  password: "password",
  db: 0,
  lazyConnect: true,
};

function basicExample() {
  // Create separate connections for pub and sub
  const publisher = new Redis(config);
  const subscriber = new Redis(config);

  // Subscribe to a channel
  subscriber.subscribe("notifications", (err, count) => {
    if (err) {
      console.error("Failed to subscribe:", err);
    } else {
      console.log(`Subscribed to ${count} channel(s)`);
    }
  });

  // Listen for messages
  subscriber.on("message", (channel, message) => {
    console.log(`Received from ${channel}:`, message);
  });

  // Publish a message
  publisher.publish("notifications", "Hello, Redis!");
}

function PatternMatchingExample() {
  const subscriber = new Redis(config);
  const publisher = new Redis(config);

  // Subscribe to all channels matching the pattern
  subscriber.psubscribe("chat:*", (err, count) => {
    if (err) {
      console.error("Failed to psubscribe:", err);
      return;
    }
    console.log(`Subscribed to ${count} pattern(s)`);
  });

  // Listen for pattern-matched messages
  subscriber.on("pmessage", (pattern, channel, message) => {
    console.log(
      `Pattern: '${pattern}' | Channel: '${channel}' | Message: ${message}`,
    );
  });

  publisher.publish("chat:room1", "Hello room 1");
  publisher.publish("chat:room2", "Hello room 2");
  publisher.publish("chat:lobby", "Hello lobby");
}

function MultipleChannelsExample() {
  const subscriber = new Redis(config);
  const publisher = new Redis(config);

  subscriber.subscribe("notifications", "alerts", "updates", (err, count) => {
    if (err) {
      console.error("Failed to subscribe:", err);
      return;
    }
    console.log(`Subscribed to ${count} channels`);
  });

  subscriber.on("message", (channel, message) => {
    switch (channel) {
      case "notifications":
        console.log("Notification:", message);
        break;
      case "alerts":
        console.log("Alert:", message);
        break;
      case "updates":
        console.log("Update:", message);
        break;
    }
  });

  publisher.publish("notifications", "New notification available");
  publisher.publish("alerts", "High CPU usage detected");
  publisher.publish("updates", "System will undergo maintenance at midnight");
}

// === Unsubscribing ===

// --- Unsubscribe from specific channels ---
// subscriber.unsubscribe("notifications");

// --- Unsubscribe from all channels ---
// subscriber.unsubscribe();

// --- Unsubscribe from patterns ---
// subscriber.punsubscribe("chat:*");

// --- Unsubscribe from all patterns ---
// subscriber.punsubscribe();

function main() {
  // basicExample();
  // PatternMatchingExample();
  // MultipleChannelsExample();
}

main();
