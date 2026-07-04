/**
 * @file components/ui/button.tsx
 * @description Reusable Button component for LearnVeda design system
 * Standard shadcn/ui-compatible button with CVA variants
 * Supports asChild pattern via Radix Slot for polymorphic usage (e.g., Next.js Link)
 */

"use client";

import * as React from "react";
import { Slot }   from "@radix-ui/react-slot"; // Polymorphic slot primitive
import { cva, type VariantProps } from "class-variance-authority"; // Variant styling
import { cn }     from "@/lib/utils"; // Class name merge utility

/* ─── Button Variants (CVA) ──────────────────────────────────────────────── */
const buttonVariants = cva(
  // Base styles applied to all variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      // ── Visual style variants ──────────────────────────────────────────
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:       "hover:bg-accent hover:text-accent-foreground",
        link:        "text-primary underline-offset-4 hover:underline p-0 h-auto",
        gradient:    "bg-gradient-to-r from-brand-500 to-purple-600 text-white hover:from-brand-600 hover:to-purple-700 shadow-md hover:shadow-brand-500/25",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success:     "bg-green-500 text-white hover:bg-green-600 shadow-sm",
        warning:     "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm",
      },

      // ── Size variants ─────────────────────────────────────────────────
      size: {
        sm:      "h-8  px-3 text-xs rounded-lg",
        default: "h-10 px-4",
        md:      "h-10 px-4",
        lg:      "h-11 px-6 text-base",
        xl:      "h-12 px-8 text-base rounded-2xl",
        icon:    "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
);

/* ─── Button Props Interface ─────────────────────────────────────────────── */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // When true, merges props onto the single child element via Slot
  loading?: boolean; // When true, disables the button (spinner handled by caller)
}

/* ─── Button Component ───────────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    // Use Radix Slot when asChild=true (renders children as root element)
    // Use native <button> otherwise
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
