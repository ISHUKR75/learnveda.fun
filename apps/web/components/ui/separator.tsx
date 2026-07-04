/**
 * @file components/ui/separator.tsx
 * @description Separator component for visual dividers in LearnVeda UI
 * Supports horizontal and vertical orientations
 */

"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator"; // Radix UI primitive
import { cn } from "@/lib/utils"; // Class name utility

/* ─── Separator Component ────────────────────────────────────────────────── */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}           // Marks as decorative (no ARIA role) by default
    orientation={orientation}          // "horizontal" or "vertical"
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", // Size based on orientation
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
