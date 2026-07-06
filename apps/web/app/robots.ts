/**
 * @file app/robots.ts
 * @description Dynamic robots.txt for LearnVeda
 *
 * Next.js serves this file at /robots.txt automatically.
 *
 * Rules:
 *  - All public learning content is crawlable (good for SEO)
 *  - Dashboard, profile settings, admin, and auth routes are blocked
 *  - API routes are blocked (no value for crawlers)
 */

import type { MetadataRoute } from "next"; // Next.js robots type

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://learnveda.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",           // Apply to all crawlers by default

        // ── Allow: public learning and marketing content ──────────────────
        allow: [
          "/",                   // Homepage
          "/about",              // About page
          "/features",           // Features page
          "/pricing",            // Pricing page
          "/contact",            // Contact page
          "/blog",               // Blog articles
          "/events",             // Events page
          "/learn",              // Learn hub
          "/learn/class-",       // All class pages (class-9, class-10, etc.)
          "/programming",        // Programming hub
          "/learn/engineering",  // Engineering hub
          "/core-cs",            // Core CS subjects
          "/simulations",        // Public simulation showcase
          "/test-center",        // Test center
          "/practice",           // Practice page
          "/explore",            // Explore page
          "/leaderboard",        // Public leaderboard
          "/community",          // Community feed (public posts)
          "/sitemap.xml",        // Sitemap itself
        ],

        // ── Disallow: private, auth, and API routes ───────────────────────
        disallow: [
          "/dashboard",          // Student dashboard (requires auth)
          "/dashboard/*",        // All dashboard sub-pages
          "/profile/*/settings", // Profile settings (private)
          "/ai-tutor",           // Platform feature (requires auth)
          "/compiler",           // Code compiler (platform feature)
          "/live-battles",       // Live battle arena
          "/live",               // Live classes
          "/mentorship",         // Mentorship platform
          "/sign-in",            // Auth pages
          "/sign-up",            // Auth pages
          "/api/*",              // All API routes
          "/admin/*",            // Admin panel
        ],
      },
      {
        // Allow Google's image crawler on all pages for image SEO
        userAgent:  "Googlebot-Image",
        allow:      ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`, // Point crawlers to the sitemap
    host:    BASE_URL,                  // Canonical host declaration
  };
}
