/**
 * @file hooks/useMediaQuery.ts
 * @description Custom hook to track CSS media query matches reactively
 * SSR-safe — returns false on server to prevent hydration mismatches
 * Cleans up event listeners on unmount to prevent memory leaks
 *
 * @example
 * const isMobile  = useMediaQuery("(max-width: 768px)");
 * const isDark    = useMediaQuery("(prefers-color-scheme: dark)");
 * const isTablet  = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
 */

"use client"; // Uses browser window.matchMedia API

import { useState, useEffect } from "react"; // React hooks

/* ─── useMediaQuery Hook ──────────────────────────────────────────────────── */
/**
 * Returns true when the provided CSS media query matches the current viewport.
 * Re-renders the component whenever the match state changes.
 * @param query - A valid CSS media query string
 */
export function useMediaQuery(query: string): boolean {
  // Start with false for SSR — avoids hydration mismatch on server
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Guard: matchMedia not available in test environments
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQueryList = window.matchMedia(query); // Create media query listener

    // Set initial value immediately on mount (client-only)
    setMatches(mediaQueryList.matches);

    /* ── Change handler — updates state when viewport changes ─────── */
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches); // Reflect the new match state
    };

    // Modern API: addEventListener (Chrome 79+, Firefox 55+)
    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange); // Cleanup
    };
  }, [query]); // Re-run when query string changes

  return matches;
}

/* ─── Convenience Breakpoint Hooks ───────────────────────────────────────── */
// Pre-built hooks for Tailwind CSS breakpoints

/** Returns true when viewport is smaller than 640px (Tailwind's sm breakpoint) */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 639px)");
}

/** Returns true when viewport is between 640px and 767px */
export function useIsSmall(): boolean {
  return useMediaQuery("(min-width: 640px) and (max-width: 767px)");
}

/** Returns true when viewport is between 768px and 1023px (md breakpoint) */
export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

/** Returns true when viewport is 1024px or wider (lg breakpoint) */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/** Returns true when the OS is in dark mode */
export function usePrefersDark(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}

/** Returns true when the user prefers reduced motion (accessibility) */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
