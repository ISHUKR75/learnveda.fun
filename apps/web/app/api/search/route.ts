/**
 * @file app/api/search/route.ts
 * @description Global search API endpoint for LearnVeda
 * Route: GET /api/search?q=searchTerm&type=all|chapters|subjects|programming|community
 * Returns: Categorized search results across the entire platform
 * Auth: Public — no authentication required for search
 * In production: routes to Meilisearch for full-text search with typo tolerance
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js request/response

/* ─── Search Result Types ─────────────────────────────────────────────────── */
interface SearchResult {
  id:       string;  // Unique result ID
  type:     string;  // Result category (chapter, subject, language, community)
  title:    string;  // Display title
  subtitle: string;  // Secondary info (subject name, grade, etc.)
  href:     string;  // Navigation link
  emoji?:   string;  // Visual icon
  tags?:    string[]; // Relevant tags for the result
}

/* ─── Mock Search Data ────────────────────────────────────────────────────── */
// Production: replace with Meilisearch.search(query) call
const SEARCH_INDEX: SearchResult[] = [
  // ── Class 9 Chapters ──────────────────────────────────────────────────
  { id:"c9-m1", type:"chapter", title:"Number Systems",               subtitle:"Class 9 · Mathematics · Chapter 1", href:"/learn/class-9/mathematics/chapter-01", emoji:"🔢", tags:["math","number","rational","irrational"] },
  { id:"c9-m2", type:"chapter", title:"Polynomials",                  subtitle:"Class 9 · Mathematics · Chapter 2", href:"/learn/class-9/mathematics/chapter-02", emoji:"📐", tags:["math","polynomial","algebra"]          },
  { id:"c9-p1", type:"chapter", title:"Force & Laws of Motion",       subtitle:"Class 9 · Physics · Chapter 9",     href:"/learn/class-9/physics/chapter-09",      emoji:"⚡", tags:["physics","newton","force","motion"]    },
  { id:"c9-p2", type:"chapter", title:"Gravitation",                  subtitle:"Class 9 · Physics · Chapter 10",    href:"/learn/class-9/physics/chapter-10",       emoji:"🌍", tags:["physics","gravity","weight","mass"]    },
  { id:"c9-s1", type:"chapter", title:"The French Revolution",        subtitle:"Class 9 · Social Science · Chapter 1", href:"/learn/class-9/social-science/chapter-01", emoji:"🏛️", tags:["history","french","revolution"]  },
  { id:"c9-c1", type:"chapter", title:"Matter in Our Surroundings",   subtitle:"Class 9 · Chemistry · Chapter 1",   href:"/learn/class-9/chemistry/chapter-01",    emoji:"⚗️", tags:["chemistry","matter","solid","liquid"]  },
  { id:"c9-bi", type:"chapter", title:"Cell — Fundamental Unit of Life",subtitle:"Class 9 · Biology · Chapter 5",   href:"/learn/class-9/biology/chapter-05",      emoji:"🧬", tags:["biology","cell","nucleus","membrane"]  },

  // ── Class 10 Chapters ─────────────────────────────────────────────────
  { id:"c10-m1",type:"chapter", title:"Real Numbers",                 subtitle:"Class 10 · Mathematics · Chapter 1",href:"/learn/class-10/mathematics/chapter-01",emoji:"🔢", tags:["math","real","euclid","rational"]       },
  { id:"c10-p1",type:"chapter", title:"Electricity",                  subtitle:"Class 10 · Physics · Chapter 12",  href:"/learn/class-10/physics/chapter-12",     emoji:"⚡", tags:["physics","electricity","ohm","current"]  },
  { id:"c10-c1",type:"chapter", title:"Chemical Reactions & Equations",subtitle:"Class 10 · Chemistry · Chapter 1", href:"/learn/class-10/chemistry/chapter-01",  emoji:"⚗️", tags:["chemistry","reaction","equation"]       },

  // ── Class 11 Chapters ─────────────────────────────────────────────────
  { id:"c11-p1",type:"chapter", title:"Laws of Motion",               subtitle:"Class 11 · Physics · Chapter 5",   href:"/learn/class-11/physics/chapter-05",     emoji:"⚡", tags:["physics","newton","force","inertia"]    },
  { id:"c11-m1",type:"chapter", title:"Sets",                         subtitle:"Class 11 · Mathematics · Chapter 1",href:"/learn/class-11/mathematics/chapter-01",emoji:"🔢", tags:["math","set","union","intersection"]     },
  { id:"c11-c1",type:"chapter", title:"Thermodynamics",               subtitle:"Class 11 · Chemistry · Chapter 6", href:"/learn/class-11/chemistry/chapter-06",   emoji:"🔥", tags:["chemistry","heat","enthalpy","entropy"] },

  // ── Programming ───────────────────────────────────────────────────────
  { id:"pr-py",  type:"language", title:"Python — 45 Day Plan",       subtitle:"Programming · Beginner to Advanced",href:"/programming/python",    emoji:"🐍", tags:["python","programming","beginner"] },
  { id:"pr-js",  type:"language", title:"JavaScript — 35 Day Plan",   subtitle:"Programming · Web Development",      href:"/programming/javascript", emoji:"⚡", tags:["javascript","web","frontend"]    },
  { id:"pr-java",type:"language", title:"Java — 40 Day Plan",         subtitle:"Programming · OOP & Backend",        href:"/programming/java",       emoji:"☕", tags:["java","oop","backend","spring"]  },
  { id:"pr-cpp", type:"language", title:"C++ — 30 Day Plan",          subtitle:"Programming · Competitive",          href:"/programming/cpp",        emoji:"🔧", tags:["cpp","competitive","dsa"]        },
  { id:"pr-dsa", type:"language", title:"DSA — 60 Day Complete Plan",  subtitle:"Core CS · FAANG Preparation",       href:"/programming/dsa",        emoji:"🧠", tags:["dsa","algorithms","faang","coding"] },

  // ── Simulations ───────────────────────────────────────────────────────
  { id:"sim-fm", type:"simulation", title:"Force & Motion Simulator",  subtitle:"Physics Simulation · Class 9",      href:"/simulations/physics", emoji:"🔬", tags:["simulation","force","newton","lab"] },
  { id:"sim-lm", type:"simulation", title:"Lens & Mirror Ray Tracer",  subtitle:"Physics Simulation · Class 10",     href:"/simulations/physics", emoji:"🔬", tags:["simulation","optics","lens","mirror"] },

  // ── Community ─────────────────────────────────────────────────────────
  { id:"cm-dsa", type:"community", title:"How to approach Graph problems?",subtitle:"Community · DSA · 12 answers",  href:"/community",           emoji:"💬", tags:["dsa","graphs","community","help"] },
];

/* ─── GET /api/search ─────────────────────────────────────────────────────── */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);                     // Parse query params
  const query  = searchParams.get("q")?.trim().toLowerCase() || "";  // Search query
  const type   = searchParams.get("type") || "all";                  // Result type filter
  const limit  = parseInt(searchParams.get("limit") || "20", 10);    // Max results

  /* ── Validate query ───────────────────────────────────────────────────── */
  if (!query || query.length < 2) {
    return NextResponse.json({
      ok:      true,
      data:    { results: [], total: 0, query: "", popular: ["newton", "polynomials", "python", "dsa"] },
      message: "Enter at least 2 characters to search",
    });
  }

  /* ── Search logic ─────────────────────────────────────────────────────── */
  // Production: Meilisearch.index("learnveda").search(query, { limit, filter: type !== "all" ? `type = ${type}` : undefined })
  const filtered = SEARCH_INDEX.filter((item) => {
    // Apply type filter
    if (type !== "all" && item.type !== type) return false;

    // Search in title, subtitle, and tags
    return (
      item.title.toLowerCase().includes(query)    ||
      item.subtitle.toLowerCase().includes(query) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }).slice(0, limit); // Apply limit

  /* ── Group results by type ────────────────────────────────────────────── */
  const grouped = filtered.reduce<Record<string, SearchResult[]>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []; // Initialize group if needed
    acc[item.type].push(item);                // Add item to its type group
    return acc;
  }, {});

  /* ── Return response ──────────────────────────────────────────────────── */
  return NextResponse.json({
    ok:   true,
    data: {
      results: filtered,   // All results (flat array)
      grouped,             // Results grouped by type (for categorized display)
      total:   filtered.length,
      query,               // Echo back the search query
    },
  }, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300", // Cache 1 min
    },
  });
}
