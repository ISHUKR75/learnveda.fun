/**
 * @file components/ui/progress.tsx
 * @description Animated progress bar component for LearnVeda
 * Built on Radix UI Progress primitive for proper accessibility (ARIA roles)
 * Used in: dashboard progress bars, chapter completion, XP tracking, etc.
 *
 * @example
 * <Progress value={75} className="h-2" />
 * <Progress value={30} max={100} className="h-3 bg-muted" />
 */

"use client"; // Radix UI requires client rendering

import * as React            from "react";                     // React core
import * as ProgressPrimitive from "@radix-ui/react-progress"; // Accessible progress primitive
import { cn }                from "@/lib/utils";               // Tailwind class merger

/* ─── Progress Component ──────────────────────────────────────────────────── */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full", // Base track shape
      "bg-primary/20",                                     // Track background (subtle)
      className,                                           // Consumer overrides
    )}
    {...props}
  >
    {/* ── Progress indicator (the filled portion) ─────────────────────── */}
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all duration-500 ease-out" // Smooth animated fill
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Slide from left based on value
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName; // Preserve display name for DevTools

export { Progress }; // Named export
