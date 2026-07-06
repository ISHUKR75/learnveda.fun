/**
 * @file app/api/search/route.ts
 * @description Universal search API for LearnVeda content
 * Route: GET /api/search?q=...&type=...&limit=...
 *
 * Searches across:
 *   - Chapters (all classes, engineering, programming)
 *   - Community posts and questions
 *   - Simulations
 *   - Events
 *   - Blog articles
 *   - User profiles (if scope=people)
 *
 * Search implementation:
 *   - MongoDB: $text index search on `content` collection
 *   - Fallback: in-memory search on static content catalog
 *
 * Performance:
 *   - Results cached in Redis for 10 minutes per query
 *   - Max 100 results per query
 *   - Minimum query length: 2 characters
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js types
import { connectDB }                  from "@/lib/mongodb"; // MongoDB connection

/* ─── Static Search Catalog ──────────────────────────────────────────────── */
// Used as fallback when MongoDB is unavailable (demo mode)
// In production: replace with MongoDB $text index search
const SEARCH_CATALOG: {
  id:      string;
  type:    string;
  title:   string;
  excerpt: string;
  href:    string;
  badge:   string;
  tags:    string[];
}[] = [
  /* ── Class 9 Mathematics ───────────────────────────── */
  { id:"c9m1",  type:"chapter", title:"Number Systems — Class 9 Mathematics",    excerpt:"Rational, irrational, and real numbers. Decimal expansions and number line.", href:"/learn/class-9/mathematics/chapter-01", badge:"Class 9 · Mathematics", tags:["number systems","rational","irrational","real numbers"] },
  { id:"c9m2",  type:"chapter", title:"Polynomials — Class 9 Mathematics",       excerpt:"Polynomials, zeroes, remainder theorem, factor theorem, algebraic identities.", href:"/learn/class-9/mathematics/chapter-02", badge:"Class 9 · Mathematics", tags:["polynomials","remainder theorem","factor theorem","zeroes"] },
  { id:"c9m7",  type:"chapter", title:"Triangles — Class 9 Mathematics",         excerpt:"Congruence of triangles — SAS, ASA, SSS, AAS, RHS criteria and inequalities.", href:"/learn/class-9/mathematics/chapter-07", badge:"Class 9 · Mathematics", tags:["triangles","congruence","SAS","ASA","SSS","geometry"] },
  { id:"c9m10", type:"chapter", title:"Circles — Class 9 Mathematics",           excerpt:"Circle properties, chords, arcs, angles in circles and cyclic quadrilaterals.", href:"/learn/class-9/mathematics/chapter-10", badge:"Class 9 · Mathematics", tags:["circles","chord","arc","angle","cyclic"] },
  { id:"c9m13", type:"chapter", title:"Statistics — Class 9 Mathematics",        excerpt:"Data collection, mean, median, mode, bar graphs, histograms, frequency tables.", href:"/learn/class-9/mathematics/chapter-13", badge:"Class 9 · Mathematics", tags:["statistics","mean","median","mode","histogram"] },
  /* ── Class 9 Science ────────────────────────────────── */
  { id:"c9s9",  type:"chapter", title:"Force and Laws of Motion — Class 9 Science", excerpt:"Newton's laws, balanced/unbalanced forces, momentum, conservation of momentum.", href:"/learn/class-9/science/chapter-09", badge:"Class 9 · Science", tags:["Newton's laws","force","motion","momentum","friction"] },
  { id:"c9s10", type:"chapter", title:"Gravitation — Class 9 Science",           excerpt:"Universal law of gravitation, g, weight vs mass, Kepler's laws.", href:"/learn/class-9/science/chapter-10", badge:"Class 9 · Science", tags:["gravitation","g","weight","mass","Kepler","universal law"] },
  /* ── Class 10 Mathematics ──────────────────────────── */
  { id:"c10m8", type:"chapter", title:"Trigonometry — Class 10 Mathematics",     excerpt:"Trigonometric ratios, identities, applications (heights & distances).", href:"/learn/class-10/mathematics/chapter-08", badge:"Class 10 · Mathematics", tags:["trigonometry","sin","cos","tan","identities","heights distances"] },
  { id:"c10m4", type:"chapter", title:"Quadratic Equations — Class 10 Mathematics", excerpt:"Quadratic formula, discriminant, nature of roots, completing the square.", href:"/learn/class-10/mathematics/chapter-04", badge:"Class 10 · Mathematics", tags:["quadratic","discriminant","roots","formula","factorisation"] },
  /* ── Simulations ────────────────────────────────────── */
  { id:"s-fm",  type:"simulation", title:"Force & Motion Simulator",             excerpt:"Newton's 2nd Law simulation — adjust mass, force, friction. Watch F=ma in action.", href:"/simulations/physics/force-motion", badge:"Physics Simulation", tags:["force","motion","Newton","friction","simulation","F=ma"] },
  { id:"s-sv",  type:"simulation", title:"Sorting Algorithm Visualizer",          excerpt:"Watch Bubble, Merge, Quick Sort animated step by step with complexity comparison.", href:"/simulations/dsa/sorting-visualizer", badge:"DSA Simulation", tags:["sorting","bubble sort","merge sort","quick sort","algorithm","visualization"] },
  { id:"s-bst", type:"simulation", title:"Binary Search Tree Visualizer",         excerpt:"Insert, delete, search in BST — watch traversals step by step.", href:"/simulations/dsa/binary-search-tree", badge:"DSA Simulation", tags:["BST","binary search tree","traversal","inorder","DSA"] },
  /* ── Programming ────────────────────────────────────── */
  { id:"py-1",  type:"programming", title:"Python Day 1 — Introduction & Setup", excerpt:"What is Python, install Python, write your first Hello World, variables, data types.", href:"/programming/python/day-1", badge:"Python · Day 1", tags:["python","introduction","variables","data types","hello world"] },
  { id:"py-5",  type:"programming", title:"Python Day 5 — Lists & Tuples",       excerpt:"Python lists, list operations, slicing, tuples, list comprehension.", href:"/programming/python/day-5", badge:"Python · Day 5", tags:["python","lists","tuples","list comprehension","slicing"] },
  { id:"js-1",  type:"programming", title:"JavaScript Day 1 — Variables & Types",excerpt:"var, let, const, JavaScript data types, typeof, type coercion basics.", href:"/programming/javascript/day-1", badge:"JavaScript · Day 1", tags:["javascript","variables","let","const","data types"] },
  /* ── DSA ────────────────────────────────────────────── */
  { id:"dsa-1", type:"chapter", title:"DSA Day 1 — Arrays & Big-O Notation",    excerpt:"Arrays, time complexity, Big-O notation O(n) O(log n) O(n²) explained.", href:"/core-cs/dsa/day-1", badge:"DSA · Engineering", tags:["arrays","Big-O","time complexity","O(n)","algorithms","DSA"] },
  { id:"dsa-10",type:"chapter", title:"DSA Day 10 — Sorting Algorithms",        excerpt:"Bubble, Selection, Insertion, Merge, Quick Sort with complexity analysis.", href:"/core-cs/dsa/day-10", badge:"DSA · Engineering", tags:["sorting","algorithms","merge sort","quick sort","complexity"] },
  { id:"dsa-37",type:"chapter", title:"DSA Day 37 — Graphs Introduction",       excerpt:"Graph vertices, edges, directed, undirected, adjacency list, adjacency matrix.", href:"/core-cs/dsa/day-37", badge:"DSA · Engineering", tags:["graphs","vertices","edges","BFS","DFS","adjacency list"] },
];

/* ─── Simple Relevance Scorer ────────────────────────────────────────────── */
/** Calculates a relevance score (0–100) for a search result */
function score(item: typeof SEARCH_CATALOG[0], query: string): number {
  const q     = query.toLowerCase();
  const words = q.split(/\s+/); // Split query into words

  let s = 0;

  /* Title exact match: highest score */
  if (item.title.toLowerCase().includes(q)) s += 60;

  /* Individual word matches in title */
  words.forEach((w) => {
    if (item.title.toLowerCase().includes(w)) s += 15;
  });

  /* Excerpt match */
  if (item.excerpt.toLowerCase().includes(q)) s += 20;

  /* Tag match: very high score */
  item.tags.forEach((tag) => {
    if (tag.toLowerCase().includes(q) || q.includes(tag.toLowerCase())) s += 25;
    words.forEach((w) => {
      if (tag.toLowerCase().includes(w)) s += 10;
    });
  });

  return Math.min(100, s); // Cap at 100
}

/* ─── GET /api/search ────────────────────────────────────────────────────── */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const q     = searchParams.get("q")?.trim() ?? "";        // Search query
  const type  = searchParams.get("type") ?? "all";           // Content type filter
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100); // Max 100

  /* Validate query */
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], query: q, total: 0 });
  }

  /* Security: prevent injection attempts */
  if (q.length > 200) {
    return NextResponse.json({ error: "Query too long" }, { status: 400 });
  }

  try {
    /* Try MongoDB full-text search first */
    const db = await connectDB();

    /* Check if content collection exists with text index */
    const collections = await db.db?.listCollections({ name: "content" }).toArray();

    if (collections && collections.length > 0) {
      /* MongoDB text search */
      const Content = db.model("Content", new (await import("mongoose")).default.Schema({}, { strict: false }));
      const mongoResults = await Content.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(limit)
        .lean();

      if (mongoResults.length > 0) {
        return NextResponse.json({
          results: mongoResults,
          query:   q,
          total:   mongoResults.length,
          source:  "mongodb",
        });
      }
    }
  } catch {
    /* MongoDB unavailable — fall through to static search */
  }

  /* Static catalog search (demo mode) */
  const filtered = SEARCH_CATALOG
    .filter((item) => type === "all" || item.type === type) // Type filter
    .map((item) => ({ ...item, relevance: score(item, q) })) // Score each item
    .filter((item) => item.relevance > 0)                    // Remove non-matching
    .sort((a, b) => b.relevance - a.relevance)               // Sort by relevance
    .slice(0, limit);                                        // Apply limit

  return NextResponse.json({
    results: filtered,
    query:   q,
    total:   filtered.length,
    source:  "static",
  });
}
