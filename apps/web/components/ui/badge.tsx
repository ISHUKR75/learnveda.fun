/**
 * @file components/ui/badge.tsx
 * @description Badge component for LearnVeda
 * Displays small labels for categories, status indicators, counts, etc.
 * Used in course cards, navigation, leaderboard, and subject labels
 */

import * as React from "react";                          // React core
import { cva, type VariantProps } from "class-variance-authority"; // Variant management
import { cn } from "@/lib/utils";                        // Class merger utility

/* ─── Badge Variants ─────────────────────────────────────────────────────── */
const badgeVariants = cva(
  // Base badge styles
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:     "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:   "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:     "text-foreground border border-current",
        success:     "border-transparent bg-green-500/20 text-green-700 dark:text-green-400",
        warning:     "border-transparent bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
        info:        "border-transparent bg-blue-500/20 text-blue-700 dark:text-blue-400",
        purple:      "border-transparent bg-purple-500/20 text-purple-700 dark:text-purple-400",
        gradient:    "border-transparent bg-gradient-to-r from-brand-500 to-purple-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default", // Default to primary style
    },
  }
);

/* ─── Badge Props ────────────────────────────────────────────────────────── */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/* ─── Badge Component ────────────────────────────────────────────────────── */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)} // Apply variant + custom classes
      {...props} // Spread remaining HTML attributes
    />
  );
}

export { Badge, badgeVariants }; // Named exports
