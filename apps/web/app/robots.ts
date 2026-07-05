/**
 * @file app/robots.ts
 * @description robots.txt generator for LearnVeda
 * Controls search engine crawler access to pages
 * Next.js automatically serves this at /robots.txt
 * Rules: Index all marketing pages, block all authenticated platform routes
 */

import { MetadataRoute } from "next"; // Next.js robots type

/* ─── Base URL ────────────────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnveda.in";

/* ─── Robots.txt Generator ────────────────────────────────────────────────── */
/**
 * Generates robots.txt rules.
 * - Googlebot and all crawlers: allow marketing, block platform (login-required) pages
 * - Sitemap location is included for full crawl discoverability
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",        // Apply to all crawlers (Google, Bing, etc.)
        allow: [
          "/",                  // Homepage
          "/about",             // About page
          "/blog",              // Blog listing
          "/blog/",             // All blog posts
          "/contact",           // Contact page
          "/events",            // Events listing
          "/features",          // Features page
          "/pricing",           // Pricing page
          "/practice",          // Practice hub
          "/simulations",       // Simulations catalogue
          "/test-center",       // Test center
          "/learn/",            // All class/subject pages (public)
          "/programming/",      // All programming track pages
          "/community",         // Community (public view)
          "/privacy-policy",    // Legal
          "/terms-of-service",  // Legal
          "/api/og",            // OG image generation
          "/api/health",        // Health check (harmless)
        ],
        disallow: [
          "/dashboard/",        // All dashboard sub-pages (private)
          "/ai-tutor",          // AI Tutor (platform-only)
          "/mentorship",        // Mentorship (platform-only)
          "/live",              // Live Classes (platform-only)
          "/live-battles/",     // Live Battles (platform-only)
          "/leaderboard",       // Leaderboard (platform-only)
          "/compiler",          // Compiler (platform-only)
          "/search",            // Search (internal)
          "/notifications/",    // Notifications (private)
          "/profile/",          // User profiles (private)
          "/semester/",         // Semester pages (platform-only)
          "/core-cs/",          // Core CS deep-dives (platform-only)
          "/community/chat",    // Live chat (platform-only)
          "/api/auth",          // Auth API (private)
          "/api/ai",            // AI API (private)
          "/api/analytics",     // Analytics API (private)
          "/api/webhooks/",     // Webhook endpoints (private)
        ],
      },
      {
        userAgent: "GPTBot",   // Block OpenAI crawler from content scraping
        disallow: ["/"],        // Block all routes from GPTBot
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`, // Point crawlers to the sitemap
  };
}
