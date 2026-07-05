/**
 * @file hooks/useScrollPosition.ts
 * @description Hook to track the current window scroll position reactively
 * Throttled to prevent performance issues from rapid scroll events
 * Returns scroll coordinates, direction, and whether page is scrolled at all
 *
 * @example
 * const { y, direction, isScrolled } = useScrollPosition();
 * // Navbar transparency: isScrolled ? "solid" : "transparent"
 * // Back-to-top button: y > 300
 */

"use client"; // Uses browser window scroll events

import { useState, useEffect } from "react"; // React hooks

/* ─── Scroll Position Type ────────────────────────────────────────────────── */
interface ScrollPosition {
  x:          number;               // Horizontal scroll offset in pixels
  y:          number;               // Vertical scroll offset in pixels
  direction:  "up" | "down" | null; // Scroll direction (null at top)
  isScrolled: boolean;              // True if y > threshold
  isAtBottom: boolean;              // True if near the bottom of the page
}

/* ─── useScrollPosition Hook ─────────────────────────────────────────────── */
/**
 * Tracks the window scroll position with throttling for performance.
 * @param throttleMs - Minimum time between updates (default: 100ms)
 * @param threshold  - Pixels from top to consider "scrolled" (default: 10)
 */
export function useScrollPosition(
  throttleMs: number = 100,
  threshold:  number = 10,
): ScrollPosition {
  const [scroll, setScroll] = useState<ScrollPosition>({
    x:          0,
    y:          0,
    direction:  null,
    isScrolled: false,
    isAtBottom: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard

    let lastY      = window.scrollY;   // Previous scroll Y position
    let ticking    = false;            // RAF throttle flag

    const handleScroll = () => {
      if (ticking) return; // Skip if already scheduled

      ticking = true;
      requestAnimationFrame(() => {
        const currentX = window.scrollX;                          // Current X offset
        const currentY = window.scrollY;                          // Current Y offset
        const docHeight    = document.documentElement.scrollHeight; // Total page height
        const windowHeight = window.innerHeight;                   // Viewport height

        setScroll({
          x:          currentX,
          y:          currentY,
          direction:  currentY > lastY ? "down" : currentY < lastY ? "up" : null, // Scroll direction
          isScrolled: currentY > threshold,                         // Above threshold?
          isAtBottom: currentY + windowHeight >= docHeight - 50,   // Near bottom? (50px buffer)
        });

        lastY   = currentY; // Update last Y for direction detection
        ticking = false;    // Reset RAF flag
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // Passive for performance
    handleScroll(); // Set initial position

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, [threshold]);

  return scroll;
}
