import { useEffect, useRef } from "react";

/**
 * A custom React hook that runs a callback function only once when a component mounts,
 * even in React's Strict Mode which double-invokes effects during development.
 *
 * @param callback - The function to run exactly once on component mount
 * @param cleanup - Optional function to run when the component unmounts
 */
const useOnMount = (callback: () => void, cleanup?: () => void): void => {
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    // Only run the callback if it hasn't been run already
    if (!hasRun.current) {
      callback();
      hasRun.current = true;
    }

    // Return cleanup function that will run when the component unmounts
    return () => {
      // In development with StrictMode, React unmounts and remounts components
      // We don't reset hasRun.current here to ensure the callback runs only once

      // Only run the cleanup on actual unmount, not during StrictMode's
      // development double-invocation
      if (cleanup && hasRun.current) {
        cleanup();
      }
    };
  }, []);
};

export default useOnMount;
