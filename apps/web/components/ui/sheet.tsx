/**
 * @file components/ui/sheet.tsx
 * @description Slide-in sheet / drawer component for LearnVeda
 * Built on Radix UI Dialog primitive — slides in from any edge of the screen
 * Used in: mobile navigation drawer, filter panels, quick settings, etc.
 *
 * @example
 * <Sheet>
 *   <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
 *   <SheetContent side="left">
 *     <SheetHeader><SheetTitle>Menu</SheetTitle></SheetHeader>
 *     <nav>...</nav>
 *   </SheetContent>
 * </Sheet>
 */

"use client"; // Radix UI requires client rendering

import * as React        from "react";                  // React core
import * as SheetPrimitive from "@radix-ui/react-dialog"; // Reuse Dialog for Sheet
import { cva, type VariantProps } from "class-variance-authority"; // Variant utility
import { X }             from "lucide-react";             // Close icon
import { cn }            from "@/lib/utils";              // Tailwind class merger

/* ─── Root / Trigger / Close ──────────────────────────────────────────────── */
const Sheet        = SheetPrimitive.Root;     // Sheet root with open state
const SheetTrigger = SheetPrimitive.Trigger;  // Element that opens the sheet
const SheetClose   = SheetPrimitive.Close;    // Element that closes the sheet
const SheetPortal  = SheetPrimitive.Portal;   // Portal for z-index stacking

/* ─── Overlay ──────────────────────────────────────────────────────────────── */
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", // Dim background
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

/* ─── Sheet Slide Direction Variants ─────────────────────────────────────── */
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top:    "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left:   "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:  "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: { side: "right" },
  },
);

/* ─── Sheet Content ───────────────────────────────────────────────────────── */
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {/* ── Close button ──────────────────────────────────────────── */}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

/* ─── Sheet Header / Footer / Title / Description ────────────────────────── */
function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}
SheetHeader.displayName = "SheetHeader";

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />;
}
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

/* ─── Exports ─────────────────────────────────────────────────────────────── */
export {
  Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose,
  SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription,
};
