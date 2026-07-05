/**
 * @file components/ui/alert.tsx
 * @description Alert / callout component for LearnVeda
 * Used for info boxes, warnings, success messages, and error notices in content
 * Not for toast notifications (see toast.tsx) — for static inline alerts
 *
 * @example
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong.</AlertDescription>
 * </Alert>
 */

import * as React from "react";  // React core
import { cva, type VariantProps } from "class-variance-authority"; // Variant management
import { cn } from "@/lib/utils"; // Tailwind class merger

/* ─── Alert Variants ──────────────────────────────────────────────────────── */
const alertVariants = cva(
  // ── Base styles ─────────────────────────────────────────────────────────
  "relative w-full rounded-xl border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default:     "bg-background text-foreground",                                        // Neutral
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive", // Error / danger
        success:     "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400 [&>svg]:text-green-500", // Success
        warning:     "border-yellow-500/30 bg-yellow-500/5 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-500", // Warning
        info:        "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-500",   // Info
      },
    },
    defaultVariants: {
      variant: "default", // Neutral by default
    },
  },
);

/* ─── Alert Root ──────────────────────────────────────────────────────────── */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"                                     // Accessibility: screen readers announce this
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

/* ─── Alert Title ─────────────────────────────────────────────────────────── */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/* ─── Alert Description ───────────────────────────────────────────────────── */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

/* ─── Exports ─────────────────────────────────────────────────────────────── */
export { Alert, AlertTitle, AlertDescription };
