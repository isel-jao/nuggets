import { createServer, Server, Socket } from "node:net";
import {
  Logger,
  TClientHandlers,
  THandshakeMessage,
  THandshakeResponse,
} from "./types";

type TCPServerOptions = {
  port: number;
  messageEncoding?: BufferEncoding;
  logger?: Logger;
};

export class TCPServer {
  private _server: Server;
  private _clientTypes: Map<string, TClientHandlers>;
  private port: number;
  private messageEncoding: BufferEncoding;
  logger: Logger;

  constructor(options: TCPServerOptions) {
    this.logger = options.logger ?? console;
    this.port = options.port;
    this.messageEncoding = options.messageEncoding ?? "utf-8";
    this._clientTypes = new Map();
    this._server = createServer((socket) => {
      this.logger.debug(
        `Client connected: ${socket.remoteAddress}, ${socket.remotePort}`
      );

      socket.once("data", (data) => {
        try {
          const messageStr = data.toString(this.messageEncoding);
          this.logger.debug(`Received data: ${messageStr}`);
          const handshakeMessage: THandshakeMessage = JSON.parse(messageStr);
          this.logger.debug(
            `Received handshake message: ${JSON.stringify(handshakeMessage)}`
          );
          const type = handshakeMessage.type;
          const clientType = this._clientTypes.get(type);
          if (!clientType) {
            const response: THandshakeResponse = {
              status: "rejected",
              reason: `Unknown client type: ${type}`,
            };
            socket.write(JSON.stringify(response), this.messageEncoding);
            this.logger.debug("Handshake rejected: Unknown client type");
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
            this.logger.debug("Handshake rejected: Invalid configuration");
            socket.end();
            return;
          }
          const response: THandshakeResponse = { status: "accepted" };
          socket.write(JSON.stringify(response), this.messageEncoding);
          this.logger.debug("Handshake accepted");
          socket.removeAllListeners();
          clientType.onRegister(socket, handshakeMessage.config);
        } catch (error) {
          console.error("Error processing handshake:", error);
          const response: THandshakeResponse = {
            status: "rejected",
            reason: "Invalid handshake message format",
          };
          socket.write(JSON.stringify(response), this.messageEncoding);
          this.logger.debug("Handshake rejected: Invalid message format");
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
      this.logger.debug(`Server listening on port ${this.port}`);
    });
  }
  public async shutdown(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._server.close((err) => {
        if (err) {
          this.logger.error(`Error shutting down server: ${err.message}`);
          reject(err);
        } else {
          this.logger.debug("Server shut down successfully");
          resolve();
        }
      });
    });
  }
}
