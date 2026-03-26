import { MongoClient } from "mongodb";

const uri = "mongodb://dev:dev@localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("my_database");
    const users = db.collection("users");

    // Insert one document
    await users.insertOne({
      name: "Alice",
      email: "alice@example.com",
      age: 28,
    });

    // Insert multiple documents
    await users.insertMany([
      { name: "Bob", email: "bob@example.com", age: 32 },
      { name: "Charlie", email: "charlie@example.com", age: 25 },
    ]);

    // Find one document
    const user = await users.findOne({ name: "Alice" });
    console.log("Found user:", user);

    // Find multiple documents
    const allUsers = await users.find({ age: { $gte: 25 } }).toArray();
    console.log("Users aged 25+:", allUsers);

    // Update one document
    await users.updateOne({ name: "Alice" }, { $set: { age: 29 } });

    // Update multiple documents
    await users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });

    // Delete one document
    await users.deleteOne({ name: "Bob" });

    // Delete multiple documents
    await users.deleteMany({ status: "young" });

    // Create an index
    await users.createIndex({ email: 1 }, { unique: true });

    // Count documents
    const count = await users.countDocuments();
    console.log("Total users:", count);

    // Drop the collection (cleanup)
    await users.drop();
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();
