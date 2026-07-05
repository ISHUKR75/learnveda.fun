/**
 * @file components/ui/label.tsx
 * @description Accessible label component for LearnVeda form elements
 * Built on Radix UI Label primitive for proper accessibility (htmlFor + aria)
 * Pairs with Input, Select, Checkbox, Switch, and other form components
 */

"use client"; // Radix UI requires client environment

import * as React      from "react";                    // React core
import * as LabelPrimitive from "@radix-ui/react-label"; // Accessible label primitive
import { cn }          from "@/lib/utils";               // Tailwind class merger

/* ─── Label Component ─────────────────────────────────────────────────────── */
/**
 * Renders an accessible <label> element with consistent styling.
 * Always pair with an input via the `htmlFor` prop for accessibility.
 *
 * @example
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none",           // Base text styling
      "text-foreground",                             // Inherits theme color
      "peer-disabled:cursor-not-allowed",            // Disable cursor when paired input is disabled
      "peer-disabled:opacity-70",                    // Dim label when input is disabled
      className,                                     // Consumer className overrides
    )}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName; // Preserve display name for DevTools

export { Label }; // Named export
