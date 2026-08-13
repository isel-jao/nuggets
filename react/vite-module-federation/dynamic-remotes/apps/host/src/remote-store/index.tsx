import { loadRemote, registerRemotes } from "@module-federation/runtime";
import { use, useCallback, useSyncExternalStore } from "react";

export type Listener = () => void;

export type RemoteState<T extends unknown = unknown> =
  | {
      isLoading: true;
    }
  | {
      isLoading: false;
      error: Error;
    }
  | {
      isLoading: false;
      remote: T;
    };

export type AllRemoteState<T extends unknown = unknown> = (RemoteState<T> & {
  name: string;
  entry: string;
})[];

export const LOADING = { isLoading: true } as const;

export function createRemoteStore<T extends unknown = unknown>() {
  const listeners: Map<string, Set<Listener>> = new Map();
  const allRemoteListeners: Set<Listener> = new Set();
  const keyMap: Map<
    string,
    {
      readonly entry: string;
      readonly name: string;
    }
  > = new Map();

  const remotes: Map<string, RemoteState<T>> = new Map();

  // `allStates` is derived from `keyMap` + `remotes`; it is rebuilt lazily on
  // read so that mutations happening while nothing is subscribed are not lost.
  let allStates: AllRemoteState<T> = [];
  let allStatesDirty = false;

  function setState(key: string, state: RemoteState<T>) {
    remotes.set(key, state);
    allStatesDirty = true;
    notifyListeners(key);
  }

  function subscribe(remote: string, name: string, listener: Listener) {
    const key = `${remote}/${name}`;
    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }
    const keyListeners = listeners.get(key)!;
    keyListeners.add(listener);
    load(remote, name);
    return () => {
      keyListeners.delete(listener);
      if (keyListeners.size === 0) {
        listeners.delete(key);
      }
    };
  }

  function subscribeAll(listener: Listener) {
    allRemoteListeners.add(listener);
    return () => {
      allRemoteListeners.delete(listener);
    };
  }

  function notifyListeners(key: string) {
    listeners.get(key)?.forEach((listener) => listener());
    allRemoteListeners.forEach((listener) => listener());
  }

  function getState(remote: string, name: string): RemoteState<T> {
    return remotes.get(`${remote}/${name}`) ?? LOADING;
  }

  function getAllStates() {
    // Cached between mutations: `useSyncExternalStore` compares snapshots by
    // reference and loops forever if a fresh array is returned every call.
    if (allStatesDirty) {
      const next: AllRemoteState<T> = [];
      for (const [key, { entry, name }] of keyMap) {
        next.push({ ...(remotes.get(key) ?? LOADING), name, entry });
      }
      allStates = next;
      allStatesDirty = false;
    }
    return allStates;
  }

  async function load(entry: string, name: string) {
    const key = `${entry}/${name}`;
    if (remotes.has(key)) return;
    keyMap.set(key, { entry, name });
    allStatesDirty = true;
    registerRemotes([
      {
        entry,
        name: entry,
        type: "module",
      },
    ]);
    setState(key, LOADING);
    try {
      const mod = await loadRemote<{
        default: T;
      }>(key);
      if (!mod?.default) {
        setState(key, {
          isLoading: false,
          error: new Error(`Remote "${key}" has no default export`),
        });
        return;
      }
      setState(key, { isLoading: false, remote: mod.default });
    } catch (error: unknown) {
      setState(key, {
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }

  const store = {
    subscribe,
    getState,
    subscribeAll,
    getAllStates,
    load,
  };

  // helper hooks for React components ------------------------------------------
  function useAllRemoteStates() {
    const allStates = useSyncExternalStore(subscribeAll, getAllStates);
    return allStates;
  }

  function loadPromise(entry: string, name: string) {
    return new Promise<T>((resolve, reject) => {
      const key = `${entry}/${name}`;
      const state = remotes.get(key);
      if (state && "remote" in state) {
        resolve(state.remote);
        return;
      }
      if (state && "error" in state) {
        reject(state.error);
        return;
      }
      const unsubscribe = subscribe(entry, name, () => {
        const state = remotes.get(key);
        if (!state) return;
        if ("remote" in state) {
          resolve(state.remote);
          unsubscribe();
        } else if ("error" in state) {
          reject(state.error);
          unsubscribe();
        }
      });
    });
  }

  function useRemoteState(
    remote: string,
    name: string,
    options?: { suspense: false },
  ): RemoteState<T>;

  function useRemoteState(
    remote: string,
    name: string,
    options: {
      suspense: true;
    },
  ): T;

  function useRemoteState(
    remote: string,
    name: string,
    options?: { suspense: boolean },
  ) {
    const suspense = options?.suspense ?? false;
    if (suspense) {
      const LoadedComponent = use(loadPromise(remote, name));
      return LoadedComponent;
    }
    const subscribeCb = useCallback(
      (listener: Listener) => subscribe(remote, name, listener),
      [remote, name],
    );
    const getSnapshot = useCallback(
      () => getState(remote, name),
      [remote, name],
    );

    const state = useSyncExternalStore(subscribeCb, getSnapshot);
    return state;
  }
  // ------------------------------------------------------------------------------

  return {
    store,
    useRemoteState,
    useAllRemoteStates,
  };
}
