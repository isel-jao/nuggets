import { useEffect, useRef } from "react";

/**
 * A custom React hook that returns the previous value of a state
 * whenever it changes.
 *
 * @template T The type of the value being tracked
 * @param {T} value - The state value to track
 * @returns {T | undefined} The previous value of the state (undefined on first render)
 */
export function usePrev<T>(value: T): T | undefined {
  // Create a ref to store the previous value with proper typing
  const prevRef = useRef<T | undefined>(undefined);

  // Update the ref value after render
  useEffect(() => {
    // Store current value as previous for next render
    prevRef.current = value;
  }, [value]); // Only run when value changes

  // Return the previous value (will be undefined on first render)
  return prevRef.current;
}
