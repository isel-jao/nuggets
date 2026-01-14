export type THandshakeMessage = {
  type: string;
  config: Record<string, unknown>;
};

export type THandshakeResponse = {
  status: "accepted" | "rejected";
  reason?: string;
};
