import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "dev",
  password: "dev",
  database: "devdb",
});

async function main() {
  await client.connect();
  console.log("Connected to PostgreSQL");

  //   await client.query(`DROP TABLE IF EXISTS users`);
  //   console.log("Dropped table users if it existed");

  // Create a table
  await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      )
    `);
  console.log("Ensured table users exists");

  // Insert a row
  await client.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
    ["Alice", "alice@example.com"],
  );
  console.log("Inserted user Alice");

  // Query rows
  const result = await client.query("SELECT * FROM users");
  console.log("Users in database:", result.rows);

  // Update a row
  await client.query("UPDATE users SET name = $1 WHERE email = $2", [
    "Alice Updated",
    "alice@example.com",
  ]);
  console.log("Updated user Alice");

  // Delete a row
  await client.query("DELETE FROM users WHERE email = $1", [
    "alice@example.com",
  ]);
  console.log("Deleted user Alice");
}

main()
  .then(() => console.log("Done"))
  .catch((err) => console.error("Error in main:", err.message))
  .finally(() => client.end());
