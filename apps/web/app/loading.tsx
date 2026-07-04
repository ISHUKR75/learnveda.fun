/**
 * @file app/loading.tsx
 * @description Root loading skeleton for LearnVeda
 * Shown during page transitions while the next route's content is being fetched
 * Displayed automatically by Next.js App Router (Suspense integration)
 */

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 gap-4">
      {/* Brand logo skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 rounded-xl bg-brand-500 animate-pulse" />
        <div className="h-7 w-28 rounded-lg bg-muted animate-pulse" />
      </div>

      {/* Animated loading bar */}
      <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full w-full rounded-full bg-brand-500 animate-[shimmer_1.5s_ease-in-out_infinite]" />
      </div>

      {/* Loading label */}
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}
