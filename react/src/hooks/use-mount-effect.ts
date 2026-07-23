import { useEffect, useRef } from "react";

type MountCallback = () => (() => void) | void;

export function useMountEffect(callback: MountCallback) {
  const hasRun = useRef(false);
  const cleanupRef = useRef<(() => void) | void>(undefined);
  const pendingCleanup = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pendingCleanup.current) {
      // Re-invoked before the deferred cleanup fired (StrictMode's synthetic
      // remount) — cancel it, the "real" mount never actually ended.
      clearTimeout(pendingCleanup.current);
      pendingCleanup.current = null;
    } else if (!hasRun.current) {
      hasRun.current = true;
      cleanupRef.current = callback();
    }

    return () => {
      pendingCleanup.current = setTimeout(() => {
        cleanupRef.current?.();
        pendingCleanup.current = null;
      }, 0);
    };
  }, []);
}
