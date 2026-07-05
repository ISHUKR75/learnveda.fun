/**
 * @file hooks/useDebounce.ts
 * @description Debounce hooks for React — delay state updates to reduce API calls
 * Useful for: search inputs, form validation, auto-save, resize handlers
 *
 * @example
 * // Debounce search input — only query API after user stops typing for 300ms
 * const [query, setQuery] = useState("");
 * const debouncedQuery = useDebounce(query, 300);
 * useEffect(() => { fetchResults(debouncedQuery); }, [debouncedQuery]);
 */

import { useState, useEffect, useCallback, useRef } from "react"; // React hooks

/* ─── useDebounce ─────────────────────────────────────────────────────────── */
/**
 * Returns a debounced version of the value that only updates after
 * the specified delay has elapsed since the last change.
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 * @returns The debounced value (lags behind actual value by `delay`ms)
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value); // Delayed state

  useEffect(() => {
    // Start a timer — if value changes before the timer fires, it resets
    const timer = setTimeout(() => {
      setDebouncedValue(value); // Update debounced value after delay
    }, delay);

    return () => clearTimeout(timer); // Cancel the timer if value changes again
  }, [value, delay]);

  return debouncedValue; // Returns the delayed value
}

/* ─── useDebouncedCallback ────────────────────────────────────────────────── */
/**
 * Returns a debounced version of a callback function.
 * The function will only execute after the delay has elapsed since its last call.
 * @param callback - The function to debounce
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 * @returns Debounced version of the callback with cancel method
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 300,
): T & { cancel: () => void } {
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null); // Timer reference
  const callbackRef = useRef<T>(callback);                                 // Latest callback ref

  // Keep callback ref up-to-date without causing re-renders
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current); // Cancel previous timer
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args); // Call with latest args
      }, delay);
    },
    [delay],
  ) as T;

  // Attach cancel method to allow manual cancellation
  (debouncedFn as T & { cancel: () => void }).cancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current); // Clear pending timer
  };

  // Cleanup on unmount — prevent stale timer firing after component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFn as T & { cancel: () => void };
}
