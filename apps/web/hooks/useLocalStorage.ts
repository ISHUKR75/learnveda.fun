/**
 * @file hooks/useLocalStorage.ts
 * @description Custom React hook for persistent localStorage state
 * Syncs state to localStorage — persists across page refreshes
 * SSR-safe: handles server-side rendering where localStorage is unavailable
 * Type-safe: generic hook with proper TypeScript inference
 */

"use client"; // Requires browser environment for localStorage

import { useState, useEffect, useCallback } from "react"; // React hooks

/* ─── useLocalStorage Hook ────────────────────────────────────────────────── */
/**
 * A useState-like hook that persists the value to localStorage.
 * @param key - The localStorage key to store the value under
 * @param initialValue - The default value when no stored value exists
 * @returns [value, setValue, removeValue] — like useState but persistent
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark');
 * const [user, setUser, clearUser] = useLocalStorage('user', null);
 */
export function useLocalStorage<T>(
  key: string,           // localStorage key
  initialValue: T,       // Fallback value if key doesn't exist
): [T, (value: T | ((prev: T) => T)) => void, () => void] {

  /* ── Read stored value (with SSR guard) ─────────────────────────────── */
  const readValue = useCallback((): T => {
    // Guard: localStorage is not available in SSR (Next.js server components)
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key); // Try to read from storage
      return item ? (JSON.parse(item) as T) : initialValue; // Parse or use default
    } catch (error) {
      // Log parse errors in development but don't crash
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue; // Fallback to initial value on parse error
    }
  }, [key, initialValue]);

  /* ── State initialization ────────────────────────────────────────────── */
  const [storedValue, setStoredValue] = useState<T>(readValue); // Initialize from storage

  /* ── Setter function ─────────────────────────────────────────────────── */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn("[useLocalStorage] Cannot set localStorage in SSR context"); // SSR warning
        return;
      }
      try {
        // Support functional updater pattern (like useState's setState)
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue)); // Persist to storage
        setStoredValue(newValue);                                     // Update React state
        window.dispatchEvent(new Event("local-storage"));             // Notify other tabs/hooks
      } catch (error) {
        console.warn(`[useLocalStorage] Error setting key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  /* ── Remove function ─────────────────────────────────────────────────── */
  const removeValue = useCallback(() => {
    if (typeof window === "undefined") return; // SSR guard
    try {
      window.localStorage.removeItem(key); // Delete from storage
      setStoredValue(initialValue);         // Reset to initial value
      window.dispatchEvent(new Event("local-storage")); // Notify other instances
    } catch (error) {
      console.warn(`[useLocalStorage] Error removing key "${key}":`, error);
    }
  }, [key, initialValue]);

  /* ── Sync state across tabs ──────────────────────────────────────────── */
  // Listens for storage events from other tabs/windows to keep state in sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | Event) => {
      if (e instanceof StorageEvent && e.key !== key) return; // Only react to our key
      setStoredValue(readValue()); // Re-read from storage
    };

    window.addEventListener("storage",       handleStorageChange); // Cross-tab sync
    window.addEventListener("local-storage", handleStorageChange); // Same-tab sync
    return () => {
      window.removeEventListener("storage",       handleStorageChange);
      window.removeEventListener("local-storage", handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue]; // Return state tuple
}
