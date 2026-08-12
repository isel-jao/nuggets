import { useCallback, useSyncExternalStore } from "react";
import { loadRemote, registerRemotes } from "@module-federation/runtime";

type Listener = () => void;

type RemoteState<T extends unknown = unknown> =
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

const LOADING = { isLoading: true } as const;

function createRemoteStore<T extends unknown = unknown>() {
  const listeners: Map<string, Set<Listener>> = new Map();

  const remotes: Map<string, RemoteState<T>> = new Map();

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

  function notifyListeners(key: string) {
    listeners.get(key)?.forEach((listener) => listener());
  }

  function getState(remote: string, name: string): RemoteState {
    return remotes.get(`${remote}/${name}`) ?? LOADING;
  }

  async function load(remote: string, name: string) {
    const key = `${remote}/${name}`;
    if (remotes.has(key)) return;
    registerRemotes([
      {
        entry: remote,
        name: remote,
        type: "module",
      },
    ]);
    remotes.set(key, LOADING);
    try {
      const mod = await loadRemote<{
        default: T;
      }>(key);
      if (!mod?.default) {
        remotes.set(key, {
          isLoading: false,
          error: new Error(`Remote "${key}" has no default export`),
        });
        return;
      }
      remotes.set(key, { isLoading: false, remote: mod.default });
    } catch (error: unknown) {
      remotes.set(key, {
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    } finally {
      notifyListeners(key);
    }
  }

  return {
    subscribe,
    getState,
  };
}

const remoteStore = createRemoteStore();

export function useRemote<T extends unknown = unknown>(
  remote: string,
  name: string,
) {
  const subscribe = useCallback(
    (listener: Listener) => remoteStore.subscribe(remote, name, listener),
    [remote, name],
  );
  const getSnapshot = useCallback(
    () => remoteStore.getState(remote, name),
    [remote, name],
  );

  const state = useSyncExternalStore(subscribe, getSnapshot);
  return state as RemoteState<T>;
}

type RemoteComponentProps = Record<string, unknown> & {
  name: string;
  entry: string;
  className?: string;
};

export function RemoteComponent({
  name,
  entry,
  className,
  ...props
}: RemoteComponentProps) {
  const state = useRemote<React.ComponentType<any>>(entry, name);

  if (state.isLoading) {
    return <div className={className}>Loading...</div>;
  }

  if ("error" in state) {
    return (
      <div
        className={`p-4 rounded border bg-red-500/5 border-red-500 ${className || ""}`}
      >
        Error loading component: {state.error.message}
      </div>
    );
  }

  const LoadedComponent = state.remote;
  return <LoadedComponent {...props} />;
}
