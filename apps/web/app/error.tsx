/**
 * @file app/error.tsx
 * @description Root error boundary for LearnVeda
 * Catches unhandled runtime errors and shows a friendly fallback UI
 * Must be a Client Component — Next.js requires "use client" for error boundaries
 */

"use client"; // Required — Error component must be a Client Component

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error:  Error & { digest?: string }; // The error object (digest = server error ID)
  reset:  () => void;                  // Function to re-render and retry the segment
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Log error to console in development — in production use Sentry via error.digest
  useEffect(() => {
    console.error("[LearnVeda Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      {/* Error icon */}
      <div className="mb-6 text-7xl">💥</div>

      <h1 className="text-3xl font-bold mb-3">Something Went Wrong</h1>
      <p className="text-muted-foreground mb-2 max-w-md">
        An unexpected error occurred. Our team has been notified. You can try refreshing the page or go back home.
      </p>

      {/* Error ID for support */}
      {error.digest && (
        <p className="text-xs text-muted-foreground/60 mb-8 font-mono">
          Error ID: {error.digest}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="gradient" onClick={reset}>
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/"><ArrowLeft className="h-4 w-4" /> Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
