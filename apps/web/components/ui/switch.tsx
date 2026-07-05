/**
 * @file components/ui/switch.tsx
 * @description Toggle switch component for LearnVeda
 * Built on Radix UI Switch primitive for keyboard + screen reader accessibility
 * Used in: settings toggles, notification preferences, theme switching, etc.
 *
 * @example
 * <Switch checked={notifications} onCheckedChange={setNotifications} />
 * <Switch id="dark-mode" className="data-[state=checked]:bg-brand-500" />
 */

"use client"; // Radix UI requires client rendering

import * as React         from "react";                  // React core
import * as SwitchPrimitive from "@radix-ui/react-switch"; // Accessible switch primitive
import { cn }             from "@/lib/utils";             // Tailwind class merger

/* ─── Switch Component ────────────────────────────────────────────────────── */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      // ── Track (the background strip) ────────────────────────────────
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer",   // Size and shape
      "items-center rounded-full border-2 border-transparent", // Pill shape, no border
      "transition-colors focus-visible:outline-none",          // Smooth color transition
      "focus-visible:ring-2 focus-visible:ring-ring",          // Focus ring for keyboard nav
      "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",       // Disabled state
      "data-[state=checked]:bg-primary",                       // ON = primary color
      "data-[state=unchecked]:bg-input",                       // OFF = subtle grey
      className,                                               // Consumer overrides
    )}
    {...props}
    ref={ref}
  >
    {/* ── Thumb (the sliding circle) ──────────────────────────────────── */}
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full",     // Circle shape
        "bg-background shadow-lg ring-0",                       // White thumb with shadow
        "transition-transform duration-200",                    // Smooth sliding animation
        "data-[state=checked]:translate-x-4",                  // Slide right when ON
        "data-[state=unchecked]:translate-x-0",                // Stay left when OFF
      )}
    />
  </SwitchPrimitive.Root>
));

Switch.displayName = SwitchPrimitive.Root.displayName; // Preserve display name

export { Switch }; // Named export
