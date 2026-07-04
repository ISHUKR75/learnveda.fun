/**
 * @file components/ui/card.tsx
 * @description Card component system for LearnVeda
 * Provides Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 * Used throughout the app for course cards, feature cards, dashboard widgets, etc.
 */

import * as React from "react"; // React core
import { cn } from "@/lib/utils"; // Class merger utility

/* ─── Card ───────────────────────────────────────────────────────────────── */
/**
 * Root card container — provides background, border, and shadow
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm", // Base card styles
      className // Allow custom class overrides
    )}
    {...props}
  />
));
Card.displayName = "Card";

/* ─── Card Header ────────────────────────────────────────────────────────── */
/**
 * Card header section — contains title and description
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Vertical stack with padding
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ─── Card Title ─────────────────────────────────────────────────────────── */
/**
 * Card title — prominent heading text
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight", // Bold heading style
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ─── Card Description ───────────────────────────────────────────────────── */
/**
 * Card description — muted subtitle text
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Smaller muted text
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ─── Card Content ───────────────────────────────────────────────────────── */
/**
 * Card content area — main body with padding
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)} // Padding with no top (follows header)
    {...props}
  />
));
CardContent.displayName = "CardContent";

/* ─── Card Footer ────────────────────────────────────────────────────────── */
/**
 * Card footer — actions area at the bottom of the card
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} // Horizontal flex footer
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/* ─── Named Exports ──────────────────────────────────────────────────────── */
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
