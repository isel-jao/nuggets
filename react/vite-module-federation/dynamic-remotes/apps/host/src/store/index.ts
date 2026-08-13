import { createRemoteStore } from "../remote-store";

export const { store, useRemoteState, useAllRemoteStates } =
  createRemoteStore<React.ComponentType<any>>();
