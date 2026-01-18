import { TCPClient } from "./client";
import { MESSAGE_ENCODING, SERVER_HOST, SERVER_PORT } from "./constants";

async function main() {
  const client = new TCPClient({
    port: SERVER_PORT,
    host: SERVER_HOST,
    messageEncoding: MESSAGE_ENCODING,
    handshake: {
      type: "worker",
      config: { exampleKey: "exampleValue" },
    },
  });

  await client.connect();

  client.subscribe((data) => {
    console.log("Received data:", data);
  });

  setInterval(() => {
    const message = `Hello server! Time is ${new Date().toISOString()}`;
    console.log("Sending message to server:", message);
    client.emit(message);
  }, 2_000);
}

main().catch((error) => {
  console.error("Error in client:", error);
  process.exit(1);
});
