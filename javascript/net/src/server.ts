import { createServer, Server, Socket } from "node:net";
import { SERVER_HOST, SERVER_PORT, MESSAGE_ENCODING } from "./constants";
import { THandshakeMessage, THandshakeResponse } from "./types";

type TClientHandlers = {
  validateConfig: (config: Record<string, unknown>) => boolean;
  onRegister: (socket: Socket, config: Record<string, unknown>) => void;
};

type TCPServerOptions = {
  port: number;
  messageEncoding?: BufferEncoding;
};

class TCPServer {
  private _server: Server;
  private _clientTypes: Map<string, TClientHandlers>;
  private port: number;
  private messageEncoding: BufferEncoding;

  constructor(options: TCPServerOptions) {
    this.port = options.port;
    this.messageEncoding = options.messageEncoding ?? "utf-8";
    this._clientTypes = new Map();
    this._server = createServer((socket) => {
      console.log("Client connected:", socket.remoteAddress, socket.remotePort);

      socket.once("data", (data) => {
        try {
          const messageStr = data.toString(this.messageEncoding);
          console.log("Received data:", messageStr);
          const handshakeMessage: THandshakeMessage = JSON.parse(messageStr);
          console.log("Received handshake message:", handshakeMessage);
          const type = handshakeMessage.type;
          const clientType = this._clientTypes.get(type);
          if (!clientType) {
            const response: THandshakeResponse = {
              status: "rejected",
              reason: `Unknown client type: ${type}`,
            };
            socket.write(JSON.stringify(response), this.messageEncoding);
            console.log("Handshake rejected: Unknown client type");
            socket.end();
            return;
          }
          const isValid = clientType.validateConfig(handshakeMessage.config);
          if (!isValid) {
            const response: THandshakeResponse = {
              status: "rejected",
              reason: "Invalid configuration",
            };
            socket.write(JSON.stringify(response), this.messageEncoding);
            console.log("Handshake rejected: Invalid configuration");
            socket.end();
            return;
          }
          const response: THandshakeResponse = { status: "accepted" };
          socket.write(JSON.stringify(response), this.messageEncoding);
          console.log("Handshake accepted");
          socket.removeAllListeners();
          clientType.onRegister(socket, handshakeMessage.config);
        } catch (error) {
          console.error("Error processing handshake:", error);
          const response: THandshakeResponse = {
            status: "rejected",
            reason: "Invalid handshake message format",
          };
          socket.write(JSON.stringify(response), this.messageEncoding);
          console.log("Handshake rejected: Invalid message format");
          socket.end();
        }
      });
    });
  }

  public registerClientType(type: string, handlers: TClientHandlers): void {
    this._clientTypes.set(type, handlers);
  }

  public async start(): Promise<void> {
    this._server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
  public async shutdown(): Promise<void> {}
}

const workers: Set<Socket> = new Set();

async function main() {
  const server = new TCPServer({
    port: SERVER_PORT,
    messageEncoding: MESSAGE_ENCODING,
  });

  server.registerClientType("worker", {
    validateConfig: (config) => {
      // Example validation: check for required keys
      return typeof config["exampleKey"] === "string";
    },
    onRegister: (socket, config) => {
      console.log("Worker client registered with config:", config);
      // Additional setup for worker clients can be done here
      workers.add(socket);
      socket.on("data", (data) => {
        console.log("Data from worker:", data.toString(MESSAGE_ENCODING));
        // echo back the data to the worker
        socket.write(data, MESSAGE_ENCODING);
      }); // Handle incoming data from worker

      socket.on("close", () => {
        workers.delete(socket);
        console.log("Worker disconnected");
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
