/**
 * @file app/sitemap.ts
 * @description Dynamic XML sitemap generator for LearnVeda
 * Generated at build time (or on-demand with ISR) for all public pages
 * Critical for SEO — helps search engines discover and index all pages
 */

import type { MetadataRoute } from "next"; // Next.js sitemap type

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnveda.in"; // Base URL for all entries

/* ─── Static Pages ───────────────────────────────────────────────────────── */
const staticPages: MetadataRoute.Sitemap = [
  // Home
  { url: baseUrl, lastModified: new Date(), changeFrequency: "daily",   priority: 1.0   },

  // Marketing pages
  { url: `${baseUrl}/about`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${baseUrl}/features`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
  { url: `${baseUrl}/pricing`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${baseUrl}/contact`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${baseUrl}/privacy-policy`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  { url: `${baseUrl}/blog`,             lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },

  // Learn section
  { url: `${baseUrl}/learn`,             lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
  { url: `${baseUrl}/learn/class-9`,     lastModified: new Date(), changeFrequency: "weekly", priority: 0.9  },
  { url: `${baseUrl}/learn/class-10`,    lastModified: new Date(), changeFrequency: "weekly", priority: 0.9  },
  { url: `${baseUrl}/learn/class-11`,    lastModified: new Date(), changeFrequency: "weekly", priority: 0.9  },
  { url: `${baseUrl}/learn/class-12`,    lastModified: new Date(), changeFrequency: "weekly", priority: 0.9  },
  { url: `${baseUrl}/learn/engineering`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  { url: `${baseUrl}/learn/programming`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  { url: `${baseUrl}/learn/core-cs`,     lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },

  // Programming languages
  ...["c", "cpp", "java", "python", "javascript", "typescript", "rust", "go", "kotlin", "swift", "sql", "dart", "ruby"].map(
    (lang) => ({
      url:             `${baseUrl}/learn/programming/${lang}`,
      lastModified:    new Date(),
      changeFrequency: "weekly" as const,
      priority:        0.8,
    })
  ),

  // Core CS subjects
  ...["dsa", "system-design", "web-development", "dbms", "os", "cn", "git", "cp", "interview-prep"].map(
    (subject) => ({
      url:             `${baseUrl}/learn/core-cs/${subject}`,
      lastModified:    new Date(),
      changeFrequency: "weekly" as const,
      priority:        0.8,
    })
  ),

  // Platform pages
  { url: `${baseUrl}/practice`,     lastModified: new Date(), changeFrequency: "daily",  priority: 0.8 },
  { url: `${baseUrl}/test-center`,  lastModified: new Date(), changeFrequency: "daily",  priority: 0.8 },
  { url: `${baseUrl}/simulations`,  lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  { url: `${baseUrl}/leaderboard`,  lastModified: new Date(), changeFrequency: "hourly", priority: 0.7 },
  { url: `${baseUrl}/community`,    lastModified: new Date(), changeFrequency: "hourly", priority: 0.7 },
  { url: `${baseUrl}/events`,       lastModified: new Date(), changeFrequency: "daily",  priority: 0.75 },
  { url: `${baseUrl}/live-battles`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.7 },
  { url: `${baseUrl}/explore`,      lastModified: new Date(), changeFrequency: "daily",  priority: 0.7 },
];

/**
 * Next.js sitemap function
 * Returns an array of URL entries that Next.js converts to sitemap.xml
 * In production: extend this to also fetch dynamic URLs from MongoDB
 * (courses, blog posts, community posts, user profiles, etc.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages; // Return all static page entries
}
