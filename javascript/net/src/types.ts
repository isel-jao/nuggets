import { Socket } from "node:net";

export type THandshakeMessage = {
  type: string;
  config: Record<string, unknown>;
};

export type THandshakeResponse = {
  status: "accepted" | "rejected";
  reason?: string;
};

export type TClientHandlers = {
  validateConfig: (config: Record<string, unknown>) => boolean;
  onRegister: (socket: Socket, config: Record<string, unknown>) => void;
};

export interface Logger {
  log: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
}
