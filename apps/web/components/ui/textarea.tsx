/**
 * @file components/ui/textarea.tsx
 * @description Auto-resizing textarea component for LearnVeda
 * Built on top of native <textarea> with shadcn/ui styling conventions
 * Used in: AI Tutor chat input, contact form, community post composer, etc.
 */

import * as React from "react"; // React core
import { cn }     from "@/lib/utils"; // Tailwind class merger utility

/* ─── Textarea Component ──────────────────────────────────────────────────── */
/**
 * A styled textarea that inherits all standard HTML textarea attributes.
 * Supports auto-resize via CSS — combine with min-h-* and max-h-* classes.
 *
 * @example
 * <Textarea
 *   placeholder="Ask a question..."
 *   className="min-h-[48px] max-h-40 resize-none"
 *   rows={1}
 * />
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // ── Base styles — matches shadcn/ui input styling ───────────
        "flex w-full rounded-xl border border-input",               // Border + shape
        "bg-background px-3 py-2",                                  // Background + padding
        "text-sm text-foreground",                                   // Text sizing + color
        "shadow-sm transition-colors",                               // Subtle shadow + transitions
        // ── Focus ring ─────────────────────────────────────────────
        "focus-visible:outline-none focus-visible:ring-1",          // Remove default outline
        "focus-visible:ring-ring",                                   // Brand focus ring
        // ── Placeholder styling ─────────────────────────────────────
        "placeholder:text-muted-foreground",                         // Dimmed placeholder text
        // ── Disabled state ──────────────────────────────────────────
        "disabled:cursor-not-allowed disabled:opacity-50",           // Grey out when disabled
        // ── Scrollbar — hide in modern browsers for cleaner look ────
        "scrollbar-none",
        className,                                                    // Consumer overrides
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea"; // For React DevTools display

export { Textarea }; // Named export
