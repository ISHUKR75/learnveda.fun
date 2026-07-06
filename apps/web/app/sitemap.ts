/**
 * @file app/sitemap.ts
 * @description Dynamic XML sitemap for LearnVeda
 *
 * Next.js automatically serves this at /sitemap.xml.
 * Covers all static marketing pages, learning paths (Class 9–12, Programming,
 * Engineering, Core CS), platform pages, and legal pages.
 *
 * Priority logic:
 *  1.0 — Homepage
 *  0.9 — Main content hubs (learn, programming, engineering)
 *  0.8 — Subject pages (class-9/mathematics)
 *  0.7 — Chapter pages
 *  0.6 — Marketing/info pages
 *  0.4 — Legal pages (low value for crawlers)
 */

import type { MetadataRoute } from "next"; // Next.js sitemap type

/* ─── Base URL ───────────────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://learnveda.in";

/* ─── Static Marketing URLs ──────────────────────────────────────────────── */
const MARKETING_PAGES = [
  { path: "",            priority: 1.0, freq: "daily"   as const },
  { path: "/about",      priority: 0.7, freq: "monthly" as const },
  { path: "/features",   priority: 0.8, freq: "monthly" as const },
  { path: "/pricing",    priority: 0.7, freq: "weekly"  as const },
  { path: "/contact",    priority: 0.5, freq: "yearly"  as const },
  { path: "/events",     priority: 0.7, freq: "weekly"  as const },
  { path: "/blog",       priority: 0.7, freq: "weekly"  as const },
  { path: "/simulations",priority: 0.8, freq: "monthly" as const },
  { path: "/test-center",priority: 0.8, freq: "weekly"  as const },
  { path: "/practice",   priority: 0.8, freq: "weekly"  as const },
  { path: "/explore",    priority: 0.7, freq: "weekly"  as const },
  { path: "/learn",      priority: 0.9, freq: "weekly"  as const },
];

/* ─── Class subjects (CBSE) ──────────────────────────────────────────────── */
const CBSE_SUBJECTS = [
  "mathematics", "science", "physics", "chemistry", "biology",
  "english", "hindi", "social-science", "computer-science",
  "artificial-intelligence", "sanskrit", "economics",
];

/* ─── Programming languages ──────────────────────────────────────────────── */
const PROGRAMMING_LANGS = [
  "python", "javascript", "typescript", "java", "c", "cpp",
  "rust", "kotlin", "swift", "sql", "dart", "ruby", "go",
];

/* ─── Engineering branches ───────────────────────────────────────────────── */
const ENGINEERING_BRANCHES = [
  "cse", "ece", "eee", "civil", "mechanical", "chemical", "ai", "it", "data-science",
];

/* ─── Core CS subjects ───────────────────────────────────────────────────── */
const CORE_CS = [
  "dsa", "os", "dbms", "computer-networks", "system-design",
  "web-development", "competitive-programming", "interview-preparation", "git",
];

/* ─── Sitemap Generator ──────────────────────────────────────────────────── */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(); // Current timestamp for lastModified

  const entries: MetadataRoute.Sitemap = [];

  // ── Marketing pages ────────────────────────────────────────────────────────
  for (const page of MARKETING_PAGES) {
    entries.push({
      url:             `${BASE_URL}${page.path}`, // Full absolute URL
      lastModified:    now,
      changeFrequency: page.freq,
      priority:        page.priority,
    });
  }

  // ── Class 9–12 subject pages ───────────────────────────────────────────────
  for (const cls of ["9", "10", "11", "12"]) {
    // Class hub page (e.g. /learn/class-9)
    entries.push({
      url:             `${BASE_URL}/learn/class-${cls}`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.9,
    });
    // Each subject within the class
    for (const subject of CBSE_SUBJECTS) {
      entries.push({
        url:             `${BASE_URL}/learn/class-${cls}/${subject}`,
        lastModified:    now,
        changeFrequency: "monthly",
        priority:        0.8,
      });
    }
  }

  // ── Programming language pages ─────────────────────────────────────────────
  entries.push({
    url: `${BASE_URL}/programming`, lastModified: now,
    changeFrequency: "weekly", priority: 0.9,
  });
  for (const lang of PROGRAMMING_LANGS) {
    entries.push({
      url:             `${BASE_URL}/programming/${lang}`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.8,
    });
  }

  // ── Engineering branch pages ────────────────────────────────────────────────
  entries.push({
    url: `${BASE_URL}/learn/engineering`, lastModified: now,
    changeFrequency: "monthly", priority: 0.9,
  });
  for (const branch of ENGINEERING_BRANCHES) {
    entries.push({
      url:             `${BASE_URL}/learn/engineering/${branch}`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.8,
    });
  }

  // ── Core CS pages ──────────────────────────────────────────────────────────
  for (const subject of CORE_CS) {
    entries.push({
      url:             `${BASE_URL}/core-cs/${subject}`,
      lastModified:    now,
      changeFrequency: "monthly",
      priority:        0.8,
    });
  }

  // ── Legal pages ─────────────────────────────────────────────────────────────
  entries.push(
    { url: `${BASE_URL}/privacy-policy`,  lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/terms-of-service`,lastModified: now, changeFrequency: "yearly", priority: 0.4 }
  );

  return entries;
}
