/**
 * @file app/loading.tsx
 * @description Global loading UI for LearnVeda
 * Shown by Next.js during route transitions and Suspense boundaries
 * Replaces the browser's default loading state with a branded spinner
 * Automatically renders as an instant loading skeleton before content arrives
 */

/* ─── Global Loading Component ────────────────────────────────────────────── */
/**
 * Full-page branded loading indicator.
 * Shown during:
 * - Initial page load (before hydration)
 * - Route transitions between pages
 * - Suspense boundary resolutions
 */
export default function GlobalLoading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background gap-4"
      role="status"            // Accessible loading role
      aria-label="Loading..."  // Screen reader description
    >
      {/* ── Brand logo + animated pulse ───────────────────────────────── */}
      <div className="relative">
        {/* Outer pulsing ring — brand color */}
        <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping" />

        {/* ── Logo mark ────────────────────────────────────────────────── */}
        <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-2xl select-none">L</span>
        </div>
      </div>

      {/* ── Loading dots ──────────────────────────────────────────────── */}
      <div className="flex gap-1.5" aria-hidden="true">
        {/* Three animated dots with staggered delay */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }} // Stagger each dot
          />
        ))}
      </div>

      {/* ── Brand name ────────────────────────────────────────────────── */}
      <p className="text-sm text-muted-foreground font-medium tracking-wide">
        LearnVeda
      </p>

      {/* ── Screen reader text ────────────────────────────────────────── */}
      <span className="sr-only">Loading page content...</span>
    </div>
  );
}
