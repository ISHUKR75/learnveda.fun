/**
 * @file hooks/useThrottle.ts
 * @description Throttle hooks — rate-limit state updates and callbacks
 * Unlike debounce (waits for silence), throttle fires at most once per interval
 * Useful for: scroll handlers, resize handlers, mouse move, API rate limiting
 *
 * @example
 * const throttledScrollY = useThrottle(window.scrollY, 100); // Max 10 updates/second
 */

import { useState, useEffect, useRef, useCallback } from "react"; // React hooks

/* ─── useThrottle ─────────────────────────────────────────────────────────── */
/**
 * Returns a throttled version of the value — updates at most once per `limit`ms.
 * @param value - The value to throttle
 * @param limit - Minimum time between updates in milliseconds (default: 200ms)
 */
export function useThrottle<T>(value: T, limit: number = 200): T {
  const [throttledValue,    setThrottledValue]    = useState<T>(value); // Rate-limited state
  const lastUpdatedRef = useRef<number>(Date.now()); // Timestamp of last update

  useEffect(() => {
    const now       = Date.now();                    // Current timestamp
    const elapsed   = now - lastUpdatedRef.current;  // Time since last update
    const remaining = limit - elapsed;               // Time until we can update again

    if (remaining <= 0) {
      // Enough time has passed — update immediately
      lastUpdatedRef.current = now;
      setThrottledValue(value);
    } else {
      // Schedule update for when the throttle window expires
      const timer = setTimeout(() => {
        lastUpdatedRef.current = Date.now();
        setThrottledValue(value);
      }, remaining);

      return () => clearTimeout(timer); // Cancel if value changes again
    }
  }, [value, limit]);

  return throttledValue;
}

/* ─── useThrottledCallback ────────────────────────────────────────────────── */
/**
 * Returns a throttled version of a callback — executes at most once per `limit`ms.
 * First call executes immediately; subsequent calls within the window are dropped.
 * @param callback - The function to throttle
 * @param limit - Minimum milliseconds between calls (default: 200ms)
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  limit: number = 200,
): T {
  const lastCalledRef  = useRef<number>(0);         // Timestamp of last call
  const callbackRef    = useRef<T>(callback);        // Latest callback

  // Keep callback ref current to avoid stale closures
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      const now     = Date.now();
      const elapsed = now - lastCalledRef.current; // Time since last call

      if (elapsed >= limit) {
        lastCalledRef.current = now;              // Record call time
        return callbackRef.current(...args);      // Execute the callback
      }
      // Silently drop calls within the throttle window
    },
    [limit],
  ) as T;
}
