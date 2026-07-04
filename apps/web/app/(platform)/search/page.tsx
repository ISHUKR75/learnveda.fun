/**
 * @file app/(platform)/search/page.tsx
 * @description Global search page — search chapters, subjects, languages, and community
 * Route: /search
 * Accepts: ?q=searchTerm query parameter
 * Returns: Categorized results across the entire LearnVeda platform
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Search, BookOpen, Code2, FlaskConical, Star, ArrowRight,
  Globe, Users, Clock, ChevronRight,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Search — LearnVeda",
  description: "Search across all subjects, chapters, programming tracks, and community on LearnVeda.",
};

/* ─── Search Results Data ────────────────────────────────────────────────── */
// Sample search results — in production, this hits the Elasticsearch/MongoDB search API
// These are pre-populated for popular searches
const POPULAR_SEARCHES = [
  "Newton's Laws",
  "Polynomials",
  "Python basics",
  "Pythagoras theorem",
  "French Revolution",
  "Mole concept",
  "DSA arrays",
  "JavaScript promises",
];

const SAMPLE_RESULTS = {
  chapters: [
    { title:"Polynomials",               subtitle:"Class 9 · Mathematics · Chapter 2",               href:"/learn/class-9/mathematics/chapter-02", type:"Chapter" },
    { title:"Motion",                    subtitle:"Class 9 · Science · Chapter 7",                    href:"/learn/class-9/science/chapter-07",      type:"Chapter" },
    { title:"Triangles",                 subtitle:"Class 9 · Mathematics · Chapter 7",               href:"/learn/class-9/mathematics/chapter-07",  type:"Chapter" },
    { title:"Force and Laws of Motion",  subtitle:"Class 9 · Science · Chapter 8 (⚡ Simulation)",   href:"/learn/class-9/science/chapter-08",      type:"Chapter" },
  ],
  programming: [
    { title:"Python Day 1 — Setup & Hello World", subtitle:"Python 45-Day Track · Beginner",          href:"/programming/python/day-01",     type:"Lesson" },
    { title:"JavaScript Variables & Types",       subtitle:"JavaScript 30-Day Track · Beginner",      href:"/programming/javascript/day-01", type:"Lesson" },
    { title:"Java OOP — Classes & Objects",       subtitle:"Java 45-Day Track · Intermediate",        href:"/programming/java/day-10",       type:"Lesson" },
  ],
  subjects: [
    { title:"Mathematics",    subtitle:"Class 9 · CBSE · 15 chapters",   href:"/learn/class-9/mathematics",  type:"Subject"  },
    { title:"Science",        subtitle:"Class 9 · CBSE · 14 chapters",   href:"/learn/class-9/science",      type:"Subject"  },
    { title:"Python",         subtitle:"Programming Track · 45 days",    href:"/programming/python",         type:"Track"    },
  ],
};

/* ─── Search Page Component ──────────────────────────────────────────────── */
export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Note: searchParams is async in Next.js 15 — but for static render we use fallback
  const query = ""; // Will be populated when user searches (client-side in production)

  return (
    <div className="min-h-screen bg-background">
      {/* ── Search Header ─────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-primary/5 to-background">
        <div className="container px-4 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Search LearnVeda
          </h1>

          {/* Search input */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search chapters, subjects, topics, programming..."
              className="w-full rounded-2xl border bg-background pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
              autoFocus
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
              Search
            </Button>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs text-muted-foreground">Popular:</span>
            {POPULAR_SEARCHES.map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="text-xs px-3 py-1 rounded-full border bg-card hover:bg-muted transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Browse by Category ────────────────────────────────────────────── */}
      <div className="container px-4 py-8">
        <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: "CBSE Class 9-12",   icon: BookOpen, href: "/learn",         color: "text-blue-600"   },
            { label: "Programming",        icon: Code2,    href: "/programming",   color: "text-green-600"  },
            { label: "Simulations",        icon: FlaskConical, href: "/simulations",color: "text-purple-600" },
            { label: "Community Q&A",      icon: Users,    href: "/community",     color: "text-orange-600" },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="group rounded-2xl border bg-card hover:shadow-md transition-all p-4 flex flex-col items-center gap-2 text-center"
              >
                <Icon className={`h-6 w-6 ${cat.color}`} />
                <span className="text-sm font-medium">{cat.label}</span>
              </Link>
            );
          })}
        </div>

        {/* ── Sample Results (shown when no query) ──────────────────────── */}
        <h2 className="text-lg font-semibold mb-4">Recommended Content</h2>

        {/* Chapters */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> Chapters
            </h3>
            <Link href="/learn" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {SAMPLE_RESULTS.chapters.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group flex items-center gap-4 rounded-xl border bg-card p-3 hover:shadow-sm transition-all"
              >
                <BookOpen className="h-4 w-4 text-blue-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.subtitle}</div>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">{r.type}</Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Programming lessons */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
              <Code2 className="h-4 w-4" /> Programming Lessons
            </h3>
            <Link href="/programming" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {SAMPLE_RESULTS.programming.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group flex items-center gap-4 rounded-xl border bg-card p-3 hover:shadow-sm transition-all"
              >
                <Code2 className="h-4 w-4 text-green-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium group-hover:text-primary transition-colors">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.subtitle}</div>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">{r.type}</Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
