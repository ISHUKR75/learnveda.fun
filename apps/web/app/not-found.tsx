/**
 * @file app/not-found.tsx
 * @description Custom 404 Not Found page for LearnVeda
 * Shown when users navigate to a route that doesn't exist
 * Provides helpful navigation links and search to help users find content
 */

import type { Metadata } from "next"; // SEO metadata type
import Link from "next/link";         // Client-side navigation
import { Navbar } from "@/components/navigation/navbar"; // Navigation bar
import { Footer } from "@/components/navigation/footer"; // Site footer
import { Button } from "@/components/ui/button";         // Button component

/* ─── Page SEO Metadata ───────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Page Not Found — LearnVeda",
  description: "The page you're looking for doesn't exist. Explore LearnVeda's learning content, practice tests, and more.",
  robots: { index: false, follow: false }, // Don't index 404 pages
};

/* ─── Popular Page Suggestions ────────────────────────────────────────────── */
// Quick links shown on the 404 page to help users find what they need
const SUGGESTIONS = [
  { label: "Dashboard",    href: "/dashboard",      emoji: "📊" },
  { label: "Class 9",      href: "/learn/class-9",  emoji: "📚" },
  { label: "Class 10",     href: "/learn/class-10", emoji: "📚" },
  { label: "Class 11",     href: "/learn/class-11", emoji: "📚" },
  { label: "Class 12",     href: "/learn/class-12", emoji: "📚" },
  { label: "Python Track", href: "/programming/python", emoji: "🐍" },
  { label: "DSA Plan",     href: "/programming/dsa",    emoji: "🧠" },
  { label: "Live Battles", href: "/live-battles",        emoji: "⚔️" },
  { label: "AI Tutor",     href: "/ai-tutor",            emoji: "🤖" },
  { label: "Practice",     href: "/practice",            emoji: "🎯" },
  { label: "Simulations",  href: "/simulations",         emoji: "🔬" },
  { label: "Blog",         href: "/blog",                emoji: "📝" },
];

/* ─── 404 Page Component ──────────────────────────────────────────────────── */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">

          {/* ── Large 404 number ───────────────────────────────────────── */}
          <div className="relative inline-block mb-6">
            {/* Background glow behind the 404 */}
            <div
              className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-brand-400 to-purple-400 rounded-full scale-150"
              aria-hidden="true"
            />
            {/* The "404" text */}
            <p className="relative text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500 select-none">
              404
            </p>
          </div>

          {/* ── Heading ────────────────────────────────────────────────── */}
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            Page not found
          </h1>

          {/* ── Subheading ─────────────────────────────────────────────── */}
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-md mx-auto">
            Looks like this chapter doesn&apos;t exist yet. Head back to a topic you know!
          </p>

          {/* ── Primary CTAs ───────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {/* Go to homepage */}
            <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700 text-white">
              <Link href="/">← Go Home</Link>
            </Button>

            {/* Go to dashboard */}
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>

          {/* ── Divider ────────────────────────────────────────────────── */}
          <p className="text-sm text-muted-foreground mb-5">
            Or jump directly to:
          </p>

          {/* ── Quick Link Grid ─────────────────────────────────────────── */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-lg mx-auto">
            {SUGGESTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border/50 hover:border-brand-500/40 hover:bg-brand-500/5 transition-colors group"
              >
                {/* ── Emoji icon ──────────────────────────────────────── */}
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {s.emoji}
                </span>
                {/* ── Link label ──────────────────────────────────────── */}
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground text-center leading-tight">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>

          {/* ── Contact link ────────────────────────────────────────────── */}
          <p className="text-sm text-muted-foreground mt-10">
            Broken link?{" "}
            <Link href="/contact" className="text-brand-500 hover:underline">
              Let us know
            </Link>
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
