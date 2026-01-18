import { Socket } from "node:net";
import { MESSAGE_ENCODING, SERVER_PORT } from "./constants";
import { TCPServer } from "./server";

const workers: Set<Socket> = new Set();

const server = new TCPServer({
  port: SERVER_PORT,
  messageEncoding: MESSAGE_ENCODING,
});
async function main() {
  server.registerClientType("worker", {
    validateConfig: (config) => {
      // Example validation: check for required keys
      return typeof config["exampleKey"] === "string";
    },
    onRegister: (socket, config) => {
      server.logger.debug(
        `Worker client registered with config: ${JSON.stringify(config)}`
      );
      // Additional setup for worker clients can be done here
      workers.add(socket);
      socket.on("data", (data) => {
        server.logger.debug(
          `Data from worker: ${data.toString(MESSAGE_ENCODING)}`
        );
        // echo back the data to the worker
        socket.write(data, MESSAGE_ENCODING);
      }); // Handle incoming data from worker

      socket.on("close", () => {
        workers.delete(socket);
        server.logger.debug("Worker disconnected");
      }); // Handle worker disconnection
      socket.on("error", (error) => {
        console.error("Worker socket error:", error);
        workers.delete(socket);
      }); // Handle worker errors
    },
  });
  await server.start();
}

main().catch((error) => {
  console.error("Error in server:", error);
  process.exit(1);
});

// graceful shutdown on SIGINT
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  try {
    await server.shutdown();
    process.exit(0);
  } catch (error) {
    console.error("Error during server shutdown:", error);
    process.exit(1);
  }
});

process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  try {
    await server.shutdown();
    process.exit(0);
  } catch (error) {
    console.error("Error during server shutdown:", error);
    process.exit(1);
  }
});
