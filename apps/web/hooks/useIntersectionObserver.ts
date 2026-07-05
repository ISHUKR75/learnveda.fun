/**
 * @file hooks/useIntersectionObserver.ts
 * @description Hook for detecting when an element enters/exits the viewport
 * Uses the native Intersection Observer API for efficient scroll-based triggers
 * Perfect for: lazy loading, scroll animations, infinite scroll, analytics tracking
 *
 * @example
 * const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
 * return <div ref={ref}>{isIntersecting ? "Visible!" : "Hidden"}</div>;
 */

import { useState, useEffect, useRef, useCallback } from "react"; // React hooks

/* ─── Options Interface ───────────────────────────────────────────────────── */
interface UseIntersectionObserverOptions {
  threshold?:   number | number[]; // Visibility percentage to trigger (0–1)
  root?:        Element | null;    // Scroll container (null = viewport)
  rootMargin?:  string;            // Margin around root (-100px, 10%, etc.)
  triggerOnce?: boolean;           // Only trigger on first intersection
}

/* ─── Return Type ─────────────────────────────────────────────────────────── */
interface UseIntersectionObserverReturn {
  ref:             (node: Element | null) => void; // Callback ref to attach
  isIntersecting:  boolean;                        // Currently in viewport?
  hasIntersected:  boolean;                        // Ever been in viewport?
  entry:           IntersectionObserverEntry | null; // Full observer entry
}

/* ─── useIntersectionObserver Hook ───────────────────────────────────────── */
/**
 * Tracks whether an element is visible in the viewport using IntersectionObserver.
 * Much more performant than scroll event listeners.
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const {
    threshold   = 0,       // Default: trigger as soon as element enters viewport
    root        = null,    // Default: use viewport as root
    rootMargin  = "0px",   // Default: no margin adjustment
    triggerOnce = false,   // Default: re-trigger on every intersection
  } = options;

  const [isIntersecting,  setIsIntersecting]  = useState(false); // Currently visible
  const [hasIntersected,  setHasIntersected]  = useState(false); // Ever been visible
  const [entry,           setEntry]           = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null); // Observer instance

  /* ── Callback ref — attaches/detaches observer as node changes ─────── */
  const ref = useCallback(
    (node: Element | null) => {
      // Disconnect previous observer before attaching to new element
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return; // No element to observe

      // Create new observer for this element
      observerRef.current = new IntersectionObserver(
        ([observerEntry]) => {
          setIsIntersecting(observerEntry.isIntersecting); // Update visibility state
          setEntry(observerEntry);                          // Store full entry data

          if (observerEntry.isIntersecting) {
            setHasIntersected(true); // Mark as ever-seen

            // If triggerOnce, disconnect after first intersection
            if (triggerOnce && observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        },
        { threshold, root, rootMargin }, // Observer configuration
      );

      observerRef.current.observe(node); // Start observing the element
    },
    [threshold, root, rootMargin, triggerOnce],
  );

  /* ── Cleanup on unmount ──────────────────────────────────────────────── */
  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect(); // Disconnect on cleanup
    };
  }, []);

  return { ref, isIntersecting, hasIntersected, entry };
}

/* ─── Simple trigger hook ─────────────────────────────────────────────────── */
/**
 * Simplified hook that just returns a boolean — true when the element has
 * entered the viewport. Useful for triggering one-shot CSS/Framer animations.
 * @param threshold - Visibility percentage to trigger (0–1, default 0.1)
 */
export function useScrollTrigger(threshold: number = 0.1): {
  ref: (node: Element | null) => void;
  triggered: boolean;
} {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold,
    triggerOnce: true, // Only triggers once — don't re-trigger on scroll back
  });
  return { ref, triggered: hasIntersected };
}
