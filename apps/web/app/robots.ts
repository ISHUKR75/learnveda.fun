/**
 * @file app/robots.ts
 * @description Dynamic robots.txt generator for LearnVeda
 * Controls which pages search engine crawlers can access
 * Blocks private/auth pages while allowing all public content
 */

import type { MetadataRoute } from "next"; // Next.js robots type

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnveda.in"; // Production base URL

/**
 * Generates the robots.txt content
 * Disallows: admin, dashboard (private), API routes, auth pages
 * Allows: all public-facing pages for maximum SEO indexing
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",                      // Rules for all crawlers
        allow:     "/",                      // Allow all pages by default
        disallow: [
          "/dashboard/",                     // Private student dashboard
          "/admin/",                         // Admin panel
          "/api/",                           // Backend API routes
          "/sign-in",                        // Auth pages (no indexing value)
          "/sign-up",
          "/_next/",                         // Next.js internal files
          "/profile/settings",              // Private profile settings
        ],
      },
      {
        userAgent: "Googlebot",              // Google-specific rules
        allow:     "/",
        disallow:  ["/dashboard/", "/admin/", "/api/"],
      },
    ],
    sitemap:  `${baseUrl}/sitemap.xml`,      // Point to our dynamic sitemap
    host:     baseUrl,                       // Canonical host declaration
  };
}
