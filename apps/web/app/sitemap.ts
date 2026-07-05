/**
 * @file app/sitemap.ts
 * @description Dynamic sitemap generator for LearnVeda
 * Returns all public pages for search engine indexing
 * Next.js automatically serves this at /sitemap.xml
 * In production: augments with dynamic routes from MongoDB (blog posts, etc.)
 */

import { MetadataRoute } from "next"; // Next.js sitemap type

/* ─── Base URL ────────────────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnveda.in"; // Production base URL

/* ─── Sitemap Generator ───────────────────────────────────────────────────── */
/**
 * Generates the complete sitemap for all public pages.
 * Next.js serves this at GET /sitemap.xml automatically.
 *
 * Priorities:
 * - 1.0 = Homepage (highest)
 * - 0.9 = Key marketing pages
 * - 0.8 = Content hubs (learn, practice, simulations)
 * - 0.7 = Subject/chapter pages
 * - 0.6 = Programming tracks
 * - 0.5 = Community, events, blog
 * - 0.4 = Legal pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  /* ── Marketing / Static Pages ─────────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    // ── Core marketing pages ──────────────────────────────────────────
    { url: `${BASE_URL}/`,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/features`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`,           lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/contact`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE_URL}/events`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },

    // ── Learning content hubs ─────────────────────────────────────────
    { url: `${BASE_URL}/practice`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/simulations`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/test-center`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },

    // ── Class pages ───────────────────────────────────────────────────
    { url: `${BASE_URL}/learn/class-9`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/learn/class-10`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/learn/class-11`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/learn/class-12`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/learn/engineering`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // ── Programming tracks ────────────────────────────────────────────
    { url: `${BASE_URL}/programming`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/programming/python`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/javascript`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/java`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/cpp`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/dsa`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/programming/c`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/typescript`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/react`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/nodejs`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/golang`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/rust`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/programming/sql`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // ── Class 9 subject pages ─────────────────────────────────────────
    { url: `${BASE_URL}/learn/class-9/mathematics`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/class-9/science`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn/class-9/social-science`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/learn/class-9/english`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/learn/class-9/hindi`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },

    // ── Community ─────────────────────────────────────────────────────
    { url: `${BASE_URL}/community`,         lastModified: new Date(), changeFrequency: "daily",  priority: 0.7 },

    // ── Legal ─────────────────────────────────────────────────────────
    { url: `${BASE_URL}/privacy-policy`,    lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`,  lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  /* ── Dynamic Pages (from MongoDB in production) ───────────────────────── */
  // In production, fetch dynamic blog post slugs:
  // const response  = await fetch(`${BASE_URL}/api/blog/slugs`);
  // const blogPosts = await response.json();
  // const blogPages = blogPosts.map(slug => ({ url: `${BASE_URL}/blog/${slug}`, lastModified: new Date(), priority: 0.6 }));
  // return [...staticPages, ...blogPages];

  return staticPages;
}
