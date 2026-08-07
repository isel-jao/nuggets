import { useCallback, useSyncExternalStore } from "react";
import { loadRemote, registerRemotes } from "@module-federation/runtime";

type Listener = () => void;

type RemoteComponentState =
  | {
      isLoading: true;
    }
  | {
      isLoading: false;
      error: Error;
    }
  | {
      isLoading: false;
      component: React.ComponentType<any>;
    };

const LOADING: RemoteComponentState = { isLoading: true };

function createRemoteComponentStore() {
  const listeners: Map<string, Set<Listener>> = new Map();

  const components: Map<string, RemoteComponentState> = new Map();

  function subscribe(remote: string, name: string, listener: Listener) {
    const key = `${remote}/${name}`;
    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }
    const keyListeners = listeners.get(key)!;
    keyListeners.add(listener);
    loadRemoteComponent(remote, name);
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

  function getState(remote: string, name: string): RemoteComponentState {
    return components.get(`${remote}/${name}`) ?? LOADING;
  }

  async function loadRemoteComponent(remote: string, name: string) {
    const key = `${remote}/${name}`;
    if (components.has(key)) return;
    registerRemotes([
      {
        entry: remote,
        name: remote,
        type: "module",
      },
    ]);
    components.set(key, LOADING);
    try {
      const mod = await loadRemote<{ default: React.ComponentType<any> }>(key);
      if (!mod?.default) {
        throw new Error(`Remote "${key}" has no default export`);
      }
      components.set(key, { isLoading: false, component: mod.default });
    } catch (error: unknown) {
      components.set(key, {
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

const remoteComponentStore = createRemoteComponentStore();

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
  // Both must be stable, or React re-subscribes on every render.
  const subscribe = useCallback(
    (listener: Listener) =>
      remoteComponentStore.subscribe(entry, name, listener),
    [entry, name],
  );
  const getSnapshot = useCallback(
    () => remoteComponentStore.getState(entry, name),
    [entry, name],
  );

  const state = useSyncExternalStore(subscribe, getSnapshot);

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

  const LoadedComponent = state.component;
  return <LoadedComponent {...props} />;
}
