/**
 * @file components/ui/tooltip.tsx
 * @description Tooltip component for LearnVeda
 * Built on Radix UI Tooltip primitive for keyboard + pointer support
 * Used in: navbar icons, action buttons, stats, badge explanations, etc.
 *
 * @example
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="ghost"><Star /></Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Add to bookmarks</TooltipContent>
 * </Tooltip>
 */

"use client"; // Radix UI requires client rendering

import * as React           from "react";                     // React core
import * as TooltipPrimitive from "@radix-ui/react-tooltip"; // Accessible tooltip primitive
import { cn }               from "@/lib/utils";               // Tailwind class merger

/* ─── Provider ────────────────────────────────────────────────────────────── */
// Wrap your app (or tooltip group) in TooltipProvider for correct behavior
const TooltipProvider = TooltipPrimitive.Provider;

/* ─── Tooltip Root ────────────────────────────────────────────────────────── */
const Tooltip = TooltipPrimitive.Root;

/* ─── Trigger ─────────────────────────────────────────────────────────────── */
const TooltipTrigger = TooltipPrimitive.Trigger;

/* ─── Content ─────────────────────────────────────────────────────────────── */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}    // Gap between trigger and tooltip
      className={cn(
        // ── Tooltip bubble ───────────────────────────────────────────
        "z-50 overflow-hidden rounded-md",     // Layer + border radius
        "bg-primary text-primary-foreground",  // Dark background + light text
        "px-3 py-1.5 text-xs font-medium",     // Compact padding + small text
        "shadow-md",                            // Subtle drop shadow
        // ── Entrance animations ──────────────────────────────────────
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        // ── Slide direction based on tooltip position ────────────────
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/* ─── Exports ─────────────────────────────────────────────────────────────── */
export {
  Tooltip,          // Tooltip root wrapper
  TooltipTrigger,   // Element that triggers the tooltip
  TooltipContent,   // The tooltip bubble
  TooltipProvider,  // Context provider — wrap your app or layout
};
