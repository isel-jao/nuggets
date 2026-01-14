import { Socket, createConnection } from "node:net";
import {
  SERVER_HOST,
  SERVER_PORT,
  HANDSHAKE_TIMEOUT_MS,
  RETRY_INTERVAL_MS,
  MAX_RETRIES,
  MESSAGE_ENCODING,
} from "./constants";
import { randomUUID } from "node:crypto";
import { THandshakeResponse, THandshakeMessage } from "./types";

type TCPHostConfig = {
  host: string;
  port: number;
};

type TCPClientConfig = {
  handshake: THandshakeMessage;
  handshakeTimeoutMs?: number;
  retryIntervalMs?: number;
  maxRetries?: number;
  messageEncoding?: BufferEncoding;
};

type TSubscriptionCallback = (data: string) => void | Promise<void>;

type TCPClientOptions = TCPHostConfig & TCPClientConfig;

class TCPClient {
  private socket: Socket | null;
  private subscriptions: Map<string, TSubscriptionCallback>;

  private host: string;
  private port: number;
  private handshakeTimeoutMs: number;
  private retryIntervalMs: number;
  private maxRetries: number;
  private handshake: THandshakeMessage;
  private messageEncoding: BufferEncoding;

  constructor(options: TCPClientOptions) {
    // Initialize properties
    this.socket = null;
    this.subscriptions = new Map();

    // Assign configuration options
    this.host = options.host;
    this.port = options.port;
    this.handshakeTimeoutMs = options.handshakeTimeoutMs ?? 5_000;
    this.retryIntervalMs = options.retryIntervalMs ?? 2_000;
    this.maxRetries = options.maxRetries ?? 30;
    this.handshake = options.handshake;
    this.messageEncoding = options.messageEncoding ?? "utf-8";
  }

  public async connect(): Promise<void> {
    const socket = await this.attemptConnection();
    this.socket = socket;
    await this.handleHandshake();
    this.handleReconnect();
  }

  private handleReconnect(): void {
    this.socket?.on("close", async () => {
      this.socket?.removeAllListeners();
      this.socket = null;
      console.log("Connection closed. Attempting to reconnect...");
      this.socket = await this.attemptConnection();
      await this.handleHandshake();
      for (const callback of this.subscriptions.values()) {
        this.socket?.on("data", (data) => {
          callback(data.toString(this.messageEncoding));
        });
      }
    });
  }

  public async handleHandshake(): Promise<void> {
    if (!this.socket) {
      throw new Error("Socket is not connected");
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Handshake timed out"));
      }, this.handshakeTimeoutMs);
      this.socket?.write(JSON.stringify(this.handshake), this.messageEncoding);
      this.socket?.once("data", (data) => {
        clearTimeout(timeout);
        try {
          const message = data.toString(this.messageEncoding);
          console.log("Received handshake message:", message);
          const response: THandshakeResponse = JSON.parse(message);
          if (response.status === "accepted") {
            resolve();
          } else {
            reject(
              new Error(
                `Handshake rejected: ${response.reason || "No reason provided"}`
              )
            );
          }
        } catch (error) {
          reject(new Error("Invalid handshake message format"));
        }
      });
    });
  }

  private attemptConnection(attempts: number = 0): Promise<Socket> {
    return new Promise((resolve, reject) => {
      const connection = createConnection(
        { host: this.host, port: this.port },
        () => {
          console.log(`Connected to server at ${this.host}:${this.port}`);
          connection.removeAllListeners("error");
          resolve(connection);
        }
      );
      connection.once("error", (error) => {
        if (attempts >= this.maxRetries) {
          connection.destroy();
          reject(new Error("Max connection attempts exceeded"));
        } else {
          console.log(
            `Connection attempt ${attempts} failed. Retrying in ${this.retryIntervalMs} ms...`
          );
          setTimeout(() => {
            connection.destroy();
            this.attemptConnection(attempts + 1)
              .then(resolve)
              .catch(reject);
          }, this.retryIntervalMs);
        }
      });
    });
  }

  public subscribe(callback: TSubscriptionCallback) {
    const id = randomUUID();
    this.subscriptions.set(id, callback);
    this.socket?.on("data", (data) => {
      callback(data.toString(this.messageEncoding));
    });
    const unsubscribe = () => {
      this.subscriptions.delete(id);
      this.socket?.off("data", callback as (...args: unknown[]) => void);
    };
    return unsubscribe;
  }

  public emit(data: string): void {
    this.socket?.write(data, this.messageEncoding);
  }
}

async function main() {
  const client = new TCPClient({
    port: SERVER_PORT,
    host: SERVER_HOST,
    messageEncoding: MESSAGE_ENCODING,
    handshake: {
      type: "worker",
      config: { exampleKey: 10 },
    },
  });

  await client.connect();

  client.subscribe((data) => {
    console.log("Received data:", data);
  });

  // Example usage of multiple subscriptions
  const subscription1 = client.subscribe((data) => {
    console.log("Subscription 1 received data:", data);
  });
  const subscription2 = client.subscribe((data) => {
    console.log("Subscription 2 received data:", data);
  });
  // Emit data to server every 2 seconds
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
