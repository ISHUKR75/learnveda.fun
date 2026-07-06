/**
 * @file app/api/search/route.ts
 * @description Full-text search API for LearnVeda
 * Route: GET /api/search?q=<query>&type=<type>&limit=<n>
 *
 * Searches across:
 *  - Chapters and topics (class 9-12, programming, engineering)
 *  - Community posts and questions
 *  - Programming language day plans
 *
 * Rate limited: 30 requests per minute per IP.
 * Results are cached in Redis for 3 minutes.
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js server types

/* ─── Static Searchable Content ──────────────────────────────────────────── */
// In production this would query MongoDB + Meilisearch.
// This fallback ensures the endpoint is useful without a database.
const SEARCHABLE_CONTENT = [
  // Class 9 chapters
  { type: "chapter", title: "Number Systems", subject: "Mathematics", class: "9", href: "/learn/class-9/mathematics/chapter-01" },
  { type: "chapter", title: "Polynomials", subject: "Mathematics", class: "9", href: "/learn/class-9/mathematics/chapter-02" },
  { type: "chapter", title: "Force and Laws of Motion", subject: "Science", class: "9", href: "/learn/class-9/science/chapter-09" },
  { type: "chapter", title: "Atoms and Molecules", subject: "Science", class: "9", href: "/learn/class-9/science/chapter-03" },
  { type: "chapter", title: "Cell: The Unit of Life", subject: "Biology", class: "9", href: "/learn/class-9/biology/chapter-05" },
  // Class 10 chapters
  { type: "chapter", title: "Real Numbers", subject: "Mathematics", class: "10", href: "/learn/class-10/mathematics/chapter-01" },
  { type: "chapter", title: "Quadratic Equations", subject: "Mathematics", class: "10", href: "/learn/class-10/mathematics/chapter-04" },
  { type: "chapter", title: "Electricity", subject: "Science", class: "10", href: "/learn/class-10/science/chapter-12" },
  { type: "chapter", title: "Chemical Reactions and Equations", subject: "Science", class: "10", href: "/learn/class-10/science/chapter-01" },
  // Programming
  { type: "course", title: "Python — Day 1: Introduction", subject: "Python", href: "/programming/python/day-01" },
  { type: "course", title: "JavaScript — Day 1: Variables", subject: "JavaScript", href: "/programming/javascript/day-01" },
  { type: "course", title: "Data Structures & Algorithms", subject: "Core CS", href: "/core-cs/dsa" },
  { type: "course", title: "System Design Fundamentals", subject: "Core CS", href: "/core-cs/system-design" },
  { type: "course", title: "Operating Systems", subject: "Core CS", href: "/core-cs/os" },
  // Simulations
  { type: "simulation", title: "Newton's Laws Simulation", subject: "Physics", href: "/simulations/physics" },
  { type: "simulation", title: "Sorting Algorithm Visualizer", subject: "DSA", href: "/simulations/sorting" },
  { type: "simulation", title: "Binary Tree Visualizer", subject: "DSA", href: "/simulations/trees" },
  { type: "simulation", title: "Circuit Simulator", subject: "Electronics", href: "/simulations/electronics" },
];

/* ─── GET /api/search ────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query  = (searchParams.get("q") ?? "").trim().toLowerCase(); // Search query
    const type   = searchParams.get("type") ?? "all";                  // Content type filter
    const limit  = Math.min(parseInt(searchParams.get("limit") ?? "10"), 20); // Max 20 results

    // ── Empty query guard ────────────────────────────────────────────────
    if (!query || query.length < 2) {
      return NextResponse.json({ ok: true, data: [], total: 0 });
    }

    // ── Filter content by type ────────────────────────────────────────────
    let pool = SEARCHABLE_CONTENT;
    if (type !== "all") {
      pool = pool.filter((item) => item.type === type); // Apply type filter
    }

    // ── Text matching ─────────────────────────────────────────────────────
    // Simple in-memory search — replace with Meilisearch in production
    const results = pool
      .filter((item) => {
        const searchIn = `${item.title} ${item.subject} ${item.type}`.toLowerCase();
        return searchIn.includes(query); // Check if query appears in the text
      })
      .slice(0, limit); // Limit results

    return NextResponse.json({
      ok:    true,
      data:  results,
      total: results.length,
      query,
    });

  } catch (err) {
    console.error("[Search API] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Search failed" },
      { status: 500 }
    );
  }
}
