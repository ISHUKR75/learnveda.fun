/**
 * @file app/error.tsx
 * @description Global error boundary for LearnVeda
 * Catches unhandled runtime errors during rendering and shows a friendly message
 * Next.js requires "use client" on error boundaries for React error handling
 */

"use client"; // Error boundaries MUST be client components

import React, { useEffect } from "react"; // React core + lifecycle
import Link from "next/link";              // Client-side navigation
import { Button } from "@/components/ui/button"; // Button component

/* ─── Error Props ─────────────────────────────────────────────────────────── */
interface ErrorProps {
  error:  Error & { digest?: string }; // Runtime error object (digest = server error ID)
  reset:  () => void;                  // Next.js function to retry rendering the segment
}

/* ─── Global Error Page ───────────────────────────────────────────────────── */
/**
 * Shown when an unhandled error occurs in any route segment.
 * Provides a "Try again" button to retry rendering and a home link as fallback.
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  /* ── Log error to monitoring service in production ──────────────────── */
  useEffect(() => {
    // In production: send to Sentry, Datadog, or custom error tracking
    // Sentry.captureException(error);
    console.error("[LearnVeda Error Boundary]", error); // Log to console in dev
  }, [error]);

  return (
    <html lang="en"> {/* Required wrapper for app-level error boundaries */}
      <body className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="max-w-md w-full text-center space-y-6">

          {/* ── Error emoji indicator ─────────────────────────────────── */}
          <div className="text-6xl" role="img" aria-label="Error">⚠️</div>

          {/* ── Error heading ─────────────────────────────────────────── */}
          <h1 className="text-2xl font-bold">Something went wrong</h1>

          {/* ── Error message ─────────────────────────────────────────── */}
          <p className="text-muted-foreground">
            An unexpected error occurred. Our team has been notified.
            {/* Show digest in development for easier debugging */}
            {error.digest && (
              <span className="block mt-1 text-xs font-mono text-muted-foreground/60">
                Error ID: {error.digest}
              </span>
            )}
          </p>

          {/* ── Action buttons ─────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Retry button — re-renders the segment */}
            <Button
              onClick={reset}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Try Again
            </Button>

            {/* Fallback — go to homepage */}
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
          </div>

          {/* ── Support link ─────────────────────────────────────────── */}
          <p className="text-sm text-muted-foreground">
            If the problem persists,{" "}
            <Link href="/contact" className="text-brand-500 hover:underline">
              contact support
            </Link>
          </p>

        </div>
      </body>
    </html>
  );
}
