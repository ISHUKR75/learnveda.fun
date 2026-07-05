/**
 * @file components/ui/popover.tsx
 * @description Floating popover panel component for LearnVeda
 * Built on Radix UI Popover primitive for accessible floating content
 * Used in: date pickers, color pickers, filter popovers, quick info panels
 *
 * @example
 * <Popover>
 *   <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
 *   <PopoverContent className="w-80">
 *     <p>Popover content here</p>
 *   </PopoverContent>
 * </Popover>
 */

"use client"; // Radix UI requires client rendering

import * as React           from "react";                    // React core
import * as PopoverPrimitive from "@radix-ui/react-popover"; // Accessible popover primitive
import { cn }               from "@/lib/utils";               // Tailwind class merger

/* ─── Root & Trigger ──────────────────────────────────────────────────────── */
const Popover        = PopoverPrimitive.Root;    // Popover with open state
const PopoverTrigger = PopoverPrimitive.Trigger; // Element that opens popover
const PopoverAnchor  = PopoverPrimitive.Anchor;  // Optional custom anchor

/* ─── Content ─────────────────────────────────────────────────────────────── */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}               // Alignment: start | center | end
      sideOffset={sideOffset}     // Gap between trigger and popover
      className={cn(
        "z-50 w-72 rounded-xl border bg-popover p-4", // Size + shape
        "text-popover-foreground shadow-md outline-none", // Text + shadow
        // ── Entrance/exit animations ──────────────────────────────────
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

/* ─── Exports ─────────────────────────────────────────────────────────────── */
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
