/**
 * @file hooks/index.ts
 * @description Central barrel export for all LearnVeda custom React hooks
 * Import any hook from "@/hooks" instead of individual files
 *
 * @example
 * import { useLocalStorage, useDebounce, useMediaQuery } from "@/hooks";
 */

// ─── Persistence & Storage ─────────────────────────────────────────────────
export { useLocalStorage }                         from "./useLocalStorage";   // Persistent localStorage state

// ─── UI & Layout ─────────────────────────────────────────────────────────
export {
  useMediaQuery,
  useIsMobile,
  useIsSmall,
  useIsTablet,
  useIsDesktop,
  usePrefersDark,
  usePrefersReducedMotion,
}                                                  from "./useMediaQuery";      // Responsive breakpoint detection
export { useScrollPosition }                       from "./useScrollPosition";  // Window scroll tracking

// ─── Performance Utilities ─────────────────────────────────────────────────
export { useDebounce, useDebouncedCallback }       from "./useDebounce";        // Delay state/callback updates
export { useThrottle, useThrottledCallback }       from "./useThrottle";        // Rate-limit updates

// ─── Scroll & Viewport ─────────────────────────────────────────────────────
export {
  useIntersectionObserver,
  useScrollTrigger,
}                                                  from "./useIntersectionObserver"; // Element visibility detection
