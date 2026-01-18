import { Redis } from "ioredis";

async function connect(flushDb = false) {
  const redis = new Redis({
    host: "localhost",
    port: 6379,
    password: "password",
    db: 0,
    lazyConnect: true,
  });

  await redis.connect();
  console.log("✓ Connected to Redis");

  if (flushDb) {
    await redis.flushdb();
    console.log("✓ Database flushed");
  }

  return redis;
}

async function pingPong(redis) {
  const pong = await redis.ping();
  console.log("PING response:", pong);

  const pingWithMessage = await redis.ping("Hello, Redis!");
  console.log("PING with message:", pingWithMessage);
}

async function setAndGet(redis) {
  // Basic SET and GET
  await redis.set("myKey", "myValue");
  const value = await redis.get("myKey");
  console.log("GET myKey:", value);

  // SET with expiration
  await redis.set("tempKey", "tempValue", "EX", 2);
  console.log("SET tempKey with 2s expiration");

  const tempValue = await redis.get("tempKey");
  console.log("GET tempKey (before expiration):", tempValue);

  // Wait for expiration
  console.log("Waiting 3 seconds for key to expire...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const expiredValue = await redis.get("tempKey");
  console.log("GET tempKey (after expiration):", expiredValue);
}

async function listOperations(redis) {
  // Push multiple values
  const length = await redis.lpush("myList", "value1", "value2", "value3");
  console.log(`LPUSH result: ${length} items in list`);

  // Get all items
  const allItems = await redis.lrange("myList", 0, -1);
  console.log("LRANGE myList:", allItems);

  // Pop one item
  const poppedItem = await redis.lpop("myList");
  console.log("LPOP result:", poppedItem);

  // Get remaining items
  const remainingItems = await redis.lrange("myList", 0, -1);
  console.log("LRANGE myList (after LPOP):", remainingItems);

  // Get list length
  const listLength = await redis.llen("myList");
  console.log("LLEN myList:", listLength);
}

async function hashOperations(redis) {
  // Set hash fields
  await redis.hset("user:1", "name", "John Doe", "email", "john@example.com");
  console.log("HSET user:1 fields");

  // Get specific field
  const name = await redis.hget("user:1", "name");
  console.log("HGET user:1 name:", name);

  // Get all fields
  const user = await redis.hgetall("user:1");
  console.log("HGETALL user:1:", user);
}

async function setOperations(redis) {
  // Add members to set
  await redis.sadd("tags", "nodejs", "redis", "typescript");
  console.log("SADD tags");

  // Get all members
  const members = await redis.smembers("tags");
  console.log("SMEMBERS tags:", members);

  // Check membership
  const isMember = await redis.sismember("tags", "nodejs");
  console.log("SISMEMBER tags nodejs:", isMember === 1);
}

async function main() {
  const redis = await connect(true);

  try {
    console.log("\n--- PING/PONG ---");
    await pingPong(redis);

    console.log("\n--- SET/GET Operations ---");
    await setAndGet(redis);

    console.log("\n--- List Operations ---");
    await listOperations(redis);

    console.log("\n--- Hash Operations ---");
    await hashOperations(redis);

    console.log("\n--- Set Operations ---");
    await setOperations(redis);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await redis.quit();
    console.log("\n✓ Disconnected from Redis");
  }
}

main();
