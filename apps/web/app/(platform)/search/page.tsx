/**
 * @file app/(platform)/search/page.tsx
 * @description Universal Search page for LearnVeda
 * Route: /search?q=...
 *
 * Searches across:
 *   - Chapters (Class 9–12, Engineering, Programming)
 *   - Community posts and questions
 *   - Simulations
 *   - Events
 *   - Blog articles
 *
 * Uses client-side search with Fuse.js for instant results (no server roundtrip).
 * For production MongoDB full-text search, results are fetched from /api/search.
 */

"use client"; // Client component — uses URL search params and interactive filtering

/* ─── Imports ─────────────────────────────────────────────────────────────── */
import { useState, useEffect, useCallback } from "react"; // React hooks
import { useSearchParams, useRouter }        from "next/navigation"; // URL params
import Link                                  from "next/link"; // Navigation
import {
  Search, BookOpen, FlaskConical, Code2, Users,
  Calendar, FileText, Loader2, ChevronRight,
  Filter, X, Clock,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge component
import { Button } from "@/components/ui/button";  // Button component

/* ─── Result Type ─────────────────────────────────────────────────────────── */
/** A single search result from any content type */
interface SearchResult {
  id:          string;  // Unique identifier
  type:        "chapter" | "post" | "simulation" | "event" | "article" | "programming"; // Content type
  title:       string;  // Display title
  excerpt:     string;  // Short description or excerpt
  href:        string;  // Navigation URL
  badge:       string;  // Category label (e.g., "Class 9 · Mathematics")
  tags?:       string[]; // Optional keyword tags
  relevance?:  number;   // Search relevance score (0–1)
}

/* ─── Filter Types ────────────────────────────────────────────────────────── */
type FilterType = "all" | "chapter" | "simulation" | "post" | "event" | "programming";

/* ─── Demo Search Results ────────────────────────────────────────────────── */
// In production, these come from /api/search → MongoDB full-text search
// This static data is used when API is unavailable (demo mode)
const DEMO_RESULTS: SearchResult[] = [
  {
    id:      "r-001",
    type:    "chapter",
    title:   "Polynomials — Class 9 Mathematics",
    excerpt: "Polynomials in one variable, zeroes of polynomials, remainder theorem, factor theorem, and algebraic identities.",
    href:    "/learn/class-9/mathematics/chapter-02",
    badge:   "Class 9 · Mathematics",
    tags:    ["Polynomials", "Remainder Theorem", "Factor Theorem", "Algebra"],
  },
  {
    id:      "r-002",
    type:    "simulation",
    title:   "Force & Motion Simulator",
    excerpt: "Interactive physics simulation — apply forces, observe Newton's Second Law, friction, and kinetic energy in real time.",
    href:    "/simulations/physics/force-motion",
    badge:   "Physics Simulation · Class 9",
    tags:    ["Newton's Laws", "Force", "Motion", "Friction"],
  },
  {
    id:      "r-003",
    type:    "chapter",
    title:   "Gravitation — Class 9 Science",
    excerpt: "Universal law of gravitation, gravitational constant G, acceleration due to gravity g, mass vs weight, Kepler's laws.",
    href:    "/learn/class-9/science/chapter-10",
    badge:   "Class 9 · Science",
    tags:    ["Gravitation", "G", "g", "Kepler", "Weight"],
  },
  {
    id:      "r-004",
    type:    "programming",
    title:   "Python — Day 1: Introduction & Setup",
    excerpt: "What is Python, install Python and VS Code, write your first Hello World program, understand variables and data types.",
    href:    "/programming/python/day-1",
    badge:   "Python · Day 1 · Beginner",
    tags:    ["Python", "Variables", "Hello World", "Setup"],
  },
  {
    id:      "r-005",
    type:    "chapter",
    title:   "Chemical Reactions & Equations — Class 10",
    excerpt: "Writing and balancing chemical equations, types of reactions (combination, decomposition, displacement, redox).",
    href:    "/learn/class-10/science/chapter-01",
    badge:   "Class 10 · Science",
    tags:    ["Chemical Reactions", "Equations", "Balancing", "Redox"],
  },
  {
    id:      "r-006",
    type:    "post",
    title:   "How to score 95+ in Class 10 Maths?",
    excerpt: "A complete strategy guide from a Class 10 topper — topics to prioritize, common mistakes, last-week revision plan.",
    href:    "/community/posts/class-10-maths-strategy",
    badge:   "Community Post",
    tags:    ["Class 10", "Mathematics", "Board Exam", "Strategy"],
  },
  {
    id:      "r-007",
    type:    "simulation",
    title:   "Sorting Algorithm Visualizer",
    excerpt: "Watch Bubble Sort, Merge Sort, Quick Sort, and Insertion Sort animated step by step with complexity comparison.",
    href:    "/simulations/dsa/sorting-visualizer",
    badge:   "DSA Simulation · Engineering",
    tags:    ["Sorting", "Bubble Sort", "Merge Sort", "Quick Sort", "Algorithm"],
  },
  {
    id:      "r-008",
    type:    "chapter",
    title:   "Triangles — Class 9 Mathematics",
    excerpt: "Congruence of triangles, criteria (SAS, ASA, SSS, AAS, RHS), properties, and inequality in triangles.",
    href:    "/learn/class-9/mathematics/chapter-07",
    badge:   "Class 9 · Mathematics",
    tags:    ["Triangles", "Congruence", "SAS", "ASA", "SSS"],
  },
  {
    id:      "r-009",
    type:    "chapter",
    title:   "DSA — Day 1: Arrays & Big-O Notation",
    excerpt: "Introduction to arrays, time complexity, Big-O notation, O(n), O(log n), O(n²) explained with examples.",
    href:    "/core-cs/dsa/day-1",
    badge:   "DSA · Engineering",
    tags:    ["Arrays", "Big-O", "Time Complexity", "DSA"],
  },
  {
    id:      "r-010",
    type:    "event",
    title:   "Math Battle Royale — June 2026",
    excerpt: "Compete in a live math competition against 650+ students. Topics: Algebra, Calculus, Probability.",
    href:    "/events/math-battle-2026",
    badge:   "Live Event · Math",
    tags:    ["Math", "Competition", "Battle", "Algebra", "Calculus"],
  },
];

/* ─── Result type icon mapping ───────────────────────────────────────────── */
const TYPE_ICONS: Record<FilterType | "all", React.ComponentType<{ className?: string }>> = {
  all:         Search,
  chapter:     BookOpen,
  simulation:  FlaskConical,
  post:        Users,
  event:       Calendar,
  article:     FileText,
  programming: Code2,
};

/* ─── Filter Labels ──────────────────────────────────────────────────────── */
const FILTER_LABELS: Record<FilterType, string> = {
  all:         "All",
  chapter:     "Chapters",
  simulation:  "Simulations",
  post:        "Community",
  event:       "Events",
  programming: "Programming",
};

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function SearchPage() {
  const searchParams = useSearchParams(); // Access URL ?q= parameter
  const router       = useRouter();       // Navigate programmatically

  /* ── State ───────────────────────────────────────────────────────────── */
  const [query,     setQuery]     = useState(searchParams.get("q") || ""); // Search query
  const [filter,    setFilter]    = useState<FilterType>("all");             // Active filter tab
  const [results,   setResults]   = useState<SearchResult[]>([]);            // Search results
  const [isLoading, setIsLoading] = useState(false);                         // Loading state
  const [searched,  setSearched]  = useState(false);                         // Has search been run?

  /* ── Recent searches ──────────────────────────────────────────────────── */
  const recentSearches = ["Polynomials", "Newton's Laws", "Python tutorial", "DSA arrays", "Class 10 trigonometry"];

  /* ── Search function ─────────────────────────────────────────────────── */
  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setIsLoading(true); // Show loader

    try {
      /* Try API search first */
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}&limit=20`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []); // Use API results
      } else {
        throw new Error("API unavailable");
      }
    } catch {
      /* Fall back to client-side demo search */
      const qLower = q.toLowerCase();
      const filtered = DEMO_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(qLower) ||
          r.excerpt.toLowerCase().includes(qLower) ||
          r.tags?.some((t) => t.toLowerCase().includes(qLower))
      );
      setResults(filtered);
    } finally {
      setIsLoading(false);
      setSearched(true);
    }
  }, []);

  /* ── Run search when query changes ───────────────────────────────────── */
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, [searchParams, performSearch]);

  /* ── Handle form submit ──────────────────────────────────────────────── */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`); // Update URL
    performSearch(query.trim()); // Run search
  };

  /* ── Filter results by type ──────────────────────────────────────────── */
  const filteredResults = filter === "all"
    ? results
    : results.filter((r) => r.type === filter);

  /* ── Count results by type for filter tabs ───────────────────────────── */
  const countByType = (type: FilterType): number =>
    type === "all" ? results.length : results.filter((r) => r.type === type).length;

  /* ── Result type color ───────────────────────────────────────────────── */
  const typeColor = (type: SearchResult["type"]): string => {
    switch (type) {
      case "chapter":     return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "simulation":  return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "post":        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "event":       return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "programming": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default:            return "bg-muted text-muted-foreground";
    }
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background">
      {/* ── Search header ───────────────────────────────────────────── */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl font-bold mb-6">Search LearnVeda</h1>

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chapters, simulations, community, events…"
                className="w-full rounded-xl border border-border/60 bg-background pl-10 pr-10 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setResults([]); setSearched(false); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="gap-1.5">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search
            </Button>
          </form>

          {/* Recent searches (shown when no query) */}
          {!query && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Recent searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); performSearch(s); router.push(`/search?q=${encodeURIComponent(s)}`); }}
                    className="text-sm text-muted-foreground hover:text-foreground border border-border/40 rounded-full px-3 py-1 hover:border-border/80 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Results area ─────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter tabs (shown when there are results) */}
        {results.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(["all", "chapter", "simulation", "programming", "post", "event"] as FilterType[]).map((f) => {
              const count = countByType(f);
              if (count === 0 && f !== "all") return null; // Hide empty filters
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm border transition-all ${
                    filter === f
                      ? "bg-brand-500 text-white border-brand-500"
                      : "border-border/40 text-muted-foreground hover:border-border/80 hover:text-foreground"
                  }`}
                >
                  {FILTER_LABELS[f]}
                  <span className={`rounded-full px-1.5 text-xs ${filter === f ? "bg-white/20" : "bg-muted"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Searching…</span>
          </div>
        )}

        {/* Results list */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} for{" "}
              <strong>&ldquo;{query}&rdquo;</strong>
            </p>
            {filteredResults.map((result) => {
              const Icon = TYPE_ICONS[result.type as FilterType] ?? Search;
              return (
                <Link
                  key={result.id}
                  href={result.href}
                  className="block rounded-xl border border-border/40 bg-card p-5 hover:border-border/80 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Type icon */}
                    <div className={`p-2 rounded-lg border ${typeColor(result.type)} shrink-0 mt-0.5`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="font-semibold text-sm group-hover:text-brand-500 transition-colors">
                        {result.title}
                      </h3>
                      {/* Badge */}
                      <p className="text-xs text-muted-foreground mt-0.5">{result.badge}</p>
                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                        {result.excerpt}
                      </p>
                      {/* Tags */}
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-xs bg-muted/60 rounded px-1.5 py-0.5 text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* No results */}
        {!isLoading && searched && filteredResults.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground text-sm mb-6">
              We couldn&apos;t find anything for &ldquo;<strong>{query}</strong>&rdquo;. Try different keywords.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Polynomials", "Newton's Laws", "Python", "DSA"].map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  onClick={() => { setQuery(s); performSearch(s); router.push(`/search?q=${encodeURIComponent(s)}`); }}
                >
                  Try &ldquo;{s}&rdquo;
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Empty state (no query entered) */}
        {!query && !searched && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Type a query above to search chapters, simulations, and more.</p>
          </div>
        )}
      </div>
    </div>
  );
}
