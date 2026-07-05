/**
 * @file components/ui/avatar.tsx
 * @description Avatar component with image + fallback initials for LearnVeda
 * Built on Radix UI Avatar primitive for accessible fallback handling
 * Used in: navbar user menu, leaderboard, community posts, mentor cards, etc.
 *
 * @example
 * <Avatar>
 *   <AvatarImage src={user.imageUrl} alt={user.name} />
 *   <AvatarFallback>PS</AvatarFallback>
 * </Avatar>
 */

"use client"; // Radix UI requires client rendering

import * as React          from "react";                   // React core
import * as AvatarPrimitive from "@radix-ui/react-avatar"; // Accessible avatar primitive
import { cn }              from "@/lib/utils";              // Tailwind class merger

/* ─── Avatar Root ─────────────────────────────────────────────────────────── */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Circle container
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/* ─── Avatar Image ────────────────────────────────────────────────────────── */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)} // Fill circle
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/* ─── Avatar Fallback (initials) ──────────────────────────────────────────── */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center",     // Center content
      "rounded-full bg-muted",                               // Circle + muted background
      "text-sm font-semibold text-muted-foreground",         // Small bold text
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/* ─── Exports ─────────────────────────────────────────────────────────────── */
export { Avatar, AvatarImage, AvatarFallback };
