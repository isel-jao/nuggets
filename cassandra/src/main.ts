import { Client } from "cassandra-driver";

async function run() {
  const client = new Client({
    contactPoints: ["localhost"],
    localDataCenter: "datacenter1",
  });

  await client.connect();

  // list keyspaces
  const keyspaces = await client.execute(`
    SELECT * FROM system_schema.keyspaces
    `);
  console.log(keyspaces.rows);

  // create keyspace
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS demo
    WITH REPLICATION = {
        'class' : 'SimpleStrategy',
        'replication_factor' : 1
    }
    `);

  // create table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS demo.users (
        id uuid PRIMARY KEY,
        name text,
        email text,
        age int
    )
    `);

  // insert data
  await client.execute(`
    INSERT INTO demo.users (id, name, email, age)
    VALUES (uuid(), 'John Doe', 'JohDoe@email.com', 32)
    `);

  // select data
  const rs = await client.execute(`
    SELECT * FROM demo.users
    `);

  console.log(rs.rows);

  await client.shutdown();
}

run().catch(console.error);
