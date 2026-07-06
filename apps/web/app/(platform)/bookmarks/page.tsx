/**
 * @file app/(platform)/bookmarks/page.tsx
 * @description Bookmarks page — saved chapters, simulations, and posts
 * Route: /bookmarks
 *
 * Organizes saved content into collections:
 *   - All bookmarks
 *   - Chapters (by subject)
 *   - Simulations
 *   - Community posts
 *   - Programming lessons
 *
 * In production: fetched from MongoDB via /api/bookmarks (per-user)
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import {
  Bookmark, BookOpen, FlaskConical, Users, Code2,
  ChevronRight, Trash2, ExternalLink, Filter,
  Clock, Star, ArrowRight,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Bookmarks — LearnVeda",
  description: "Your saved chapters, simulations, and community posts on LearnVeda.",
  robots: { index: false, follow: false },
};

/* ─── Bookmark Type ───────────────────────────────────────────────────────── */
type BookmarkType = "chapter" | "simulation" | "post" | "programming";

interface BookmarkItem {
  id:          string;  // Unique ID
  type:        BookmarkType; // Content type
  title:       string;  // Title
  subtitle:    string;  // Subject / category
  href:        string;  // Link
  savedAt:     string;  // When saved
  tags?:       string[]; // Tags
  progress?:   number;   // Chapter progress (0–100)
}

/* ─── Demo Bookmark Data ─────────────────────────────────────────────────── */
// In production: fetched from /api/bookmarks?userId=...
const BOOKMARKS: BookmarkItem[] = [
  {
    id:       "bm-001",
    type:     "chapter",
    title:    "Polynomials — Class 9 Mathematics",
    subtitle: "Class 9 · Mathematics · Chapter 2",
    href:     "/learn/class-9/mathematics/chapter-02",
    savedAt:  "2 days ago",
    tags:     ["Remainder Theorem", "Factor Theorem"],
    progress: 60,
  },
  {
    id:       "bm-002",
    type:     "simulation",
    title:    "Sorting Algorithm Visualizer",
    subtitle: "DSA Simulation · Engineering",
    href:     "/simulations/dsa/sorting-visualizer",
    savedAt:  "5 days ago",
    tags:     ["Bubble Sort", "Merge Sort", "Quick Sort"],
  },
  {
    id:       "bm-003",
    type:     "chapter",
    title:    "Chemical Reactions & Equations",
    subtitle: "Class 10 · Science · Chapter 1",
    href:     "/learn/class-10/science/chapter-01",
    savedAt:  "1 week ago",
    tags:     ["Balancing Equations", "Redox"],
    progress: 100,
  },
  {
    id:       "bm-004",
    type:     "post",
    title:    "How to score 95+ in Class 10 Maths?",
    subtitle: "Community · Class 10",
    href:     "/community/posts/class-10-maths-strategy",
    savedAt:  "1 week ago",
    tags:     ["Strategy", "Board Exam"],
  },
  {
    id:       "bm-005",
    type:     "programming",
    title:    "Python — Day 5: Lists & Tuples",
    subtitle: "Python · Day 5 · Beginner",
    href:     "/programming/python/day-5",
    savedAt:  "2 weeks ago",
    tags:     ["Lists", "Tuples", "List Comprehension"],
    progress: 80,
  },
  {
    id:       "bm-006",
    type:     "simulation",
    title:    "Force & Motion Simulator",
    subtitle: "Physics Simulation · Class 9",
    href:     "/simulations/physics/force-motion",
    savedAt:  "3 weeks ago",
    tags:     ["Newton's Laws", "F=ma", "Friction"],
  },
];

/* ─── Type icon mapping ──────────────────────────────────────────────────── */
const TYPE_ICONS: Record<BookmarkType, React.ComponentType<{ className?: string }>> = {
  chapter:     BookOpen,
  simulation:  FlaskConical,
  post:        Users,
  programming: Code2,
};

/* ─── Type color mapping ─────────────────────────────────────────────────── */
const TYPE_COLORS: Record<BookmarkType, string> = {
  chapter:     "bg-blue-500/10 text-blue-600",
  simulation:  "bg-purple-500/10 text-purple-600",
  post:        "bg-green-500/10 text-green-600",
  programming: "bg-yellow-500/10 text-yellow-600",
};

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function BookmarksPage() {
  const total     = BOOKMARKS.length; // Total bookmark count
  const byType    = (t: BookmarkType) => BOOKMARKS.filter((b) => b.type === t); // Filter by type

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Bookmarks</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20">
              <Bookmark className="h-6 w-6 text-brand-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Bookmarks</h1>
              <p className="text-muted-foreground text-sm mt-0.5">{total} saved items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(["chapter", "simulation", "programming", "post"] as BookmarkType[]).map((type) => {
            const Icon = TYPE_ICONS[type];
            const count = byType(type).length;
            return (
              <div key={type} className={`rounded-lg border border-border/40 bg-card p-4 flex items-center gap-3`}>
                <div className={`p-2 rounded-lg ${TYPE_COLORS[type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-lg">{count}</p>
                  <p className="text-xs text-muted-foreground capitalize">{type}s</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* All bookmarks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">All Saved Items</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <select className="bg-transparent text-sm border-none outline-none cursor-pointer">
                <option value="all">All types</option>
                <option value="chapter">Chapters</option>
                <option value="simulation">Simulations</option>
                <option value="programming">Programming</option>
                <option value="post">Posts</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {BOOKMARKS.map((bm) => {
              const Icon = TYPE_ICONS[bm.type];
              return (
                <div
                  key={bm.id}
                  className="flex items-start gap-4 rounded-xl border border-border/40 bg-card p-4 hover:border-border/80 transition-all group"
                >
                  {/* Type icon */}
                  <div className={`p-2 rounded-lg shrink-0 ${TYPE_COLORS[bm.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{bm.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{bm.subtitle}</p>

                    {/* Progress bar (if applicable) */}
                    {bm.progress !== undefined && (
                      <div className="mt-2">
                        <div className="h-1 bg-muted rounded-full overflow-hidden w-32">
                          <div
                            className={`h-full rounded-full ${bm.progress === 100 ? "bg-green-500" : "bg-brand-500"}`}
                            style={{ width: `${bm.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{bm.progress}% complete</p>
                      </div>
                    )}

                    {/* Tags */}
                    {bm.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {bm.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-muted/60 rounded px-1.5 py-0.5 text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {bm.savedAt}
                    </span>
                    <Link
                      href={bm.href}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Open"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Suggested content */}
        <section className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-6">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            Continue Where You Left Off
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Pick up from your most recently accessed bookmark.</p>
          <Button asChild size="sm">
            <Link href={BOOKMARKS[0].href}>
              {BOOKMARKS[0].title.slice(0, 40)}…
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
