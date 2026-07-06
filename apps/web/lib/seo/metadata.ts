/**
 * @file lib/seo/metadata.ts
 * @description SEO metadata helpers for LearnVeda
 *
 * Centralises all metadata generation so every page has consistent,
 * rich Open Graph, Twitter Card, and JSON-LD structured data.
 *
 * Usage:
 *   export const metadata = buildMetadata({ title: "Class 9 CBSE", ... });
 */

import type { Metadata } from "next"; // Next.js metadata type

/* ─── Base URL ───────────────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://learnveda.in";
const OG_IMAGE = `${BASE_URL}/og-image.png`; // Default Open Graph image (1200×630)

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface MetadataOptions {
  title:       string;         // Page title (appended with " | LearnVeda")
  description: string;         // Meta description (150–160 chars ideal)
  keywords?:   string[];       // SEO keywords
  path?:       string;         // Canonical URL path (e.g. "/class-9")
  image?:      string;         // Custom OG image URL
  type?:       "website" | "article" | "profile"; // OG type
  noIndex?:    boolean;        // True for private/auth pages
}

/* ─── buildMetadata ──────────────────────────────────────────────────────── */
/**
 * Generate a complete Next.js Metadata object for a page.
 * Automatically fills in Open Graph, Twitter Card, and canonical URL.
 *
 * @param opts - Page-specific metadata options
 * @returns    - Next.js Metadata object ready for export
 */
export function buildMetadata(opts: MetadataOptions): Metadata {
  const {
    title,
    description,
    keywords       = [],
    path           = "/",
    image          = OG_IMAGE,
    type           = "website",
    noIndex        = false,
  } = opts;

  const canonicalUrl = `${BASE_URL}${path}`; // Full canonical URL

  return {
    title:       `${title} | LearnVeda`,       // Appended site name
    description,                               // Meta description
    keywords:    [
      "LearnVeda", "online education India", "CBSE", "Class 9", "Class 10",
      "Class 11", "Class 12", "engineering", "programming", "AI tutor",
      ...keywords,                             // Page-specific keywords
    ],
    authors:     [{ name: "LearnVeda", url: BASE_URL }],
    creator:     "LearnVeda",
    publisher:   "LearnVeda",

    // ── Canonical URL ──────────────────────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,                 // Prevent duplicate content penalties
    },

    // ── Open Graph ─────────────────────────────────────────────────────────
    openGraph: {
      type,
      url:         canonicalUrl,
      title:       `${title} | LearnVeda`,
      description,
      siteName:    "LearnVeda",
      locale:      "en_IN",
      images: [
        {
          url:    image,
          width:  1200,
          height: 630,
          alt:    `${title} — LearnVeda`,
        },
      ],
    },

    // ── Twitter Card ────────────────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      title:       `${title} | LearnVeda`,
      description,
      images:      [image],
      creator:     "@learnveda",
      site:        "@learnveda",
    },

    // ── Robots ──────────────────────────────────────────────────────────────
    robots: noIndex
      ? { index: false, follow: false }         // Private pages excluded from crawl
      : {
          index:     true,
          follow:    true,
          googleBot: {
            index:               true,
            follow:              true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet":       -1,
          },
        },
  };
}

/* ─── JSON-LD Structured Data Generators ─────────────────────────────────── */

/**
 * Generate JSON-LD Course schema for learning content pages.
 * @param name        - Course or subject name
 * @param description - Course description
 * @param url         - Full course URL
 */
export function courseLd(name: string, description: string, url: string): string {
  return JSON.stringify({
    "@context":    "https://schema.org",
    "@type":       "Course",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name:    "LearnVeda",
      url:     BASE_URL,
    },
    isAccessibleForFree: true,           // Free tier is available
    inLanguage:          "en-IN",        // Primary language
    educationalLevel:    "Secondary",    // Class 9-12 level
  });
}

/**
 * Generate JSON-LD BreadcrumbList schema for navigation context.
 * @param crumbs - Array of { name, url } breadcrumb items
 */
export function breadcrumbLd(crumbs: { name: string; url: string }[]): string {
  return JSON.stringify({
    "@context":        "https://schema.org",
    "@type":           "BreadcrumbList",
    itemListElement:   crumbs.map((crumb, idx) => ({
      "@type":    "ListItem",
      position:   idx + 1,          // 1-based position
      name:       crumb.name,       // Display name
      item:       crumb.url,        // Full URL
    })),
  });
}

/**
 * Generate JSON-LD Organization schema for the homepage/about page.
 */
export function organizationLd(): string {
  return JSON.stringify({
    "@context":   "https://schema.org",
    "@type":      "Organization",
    name:         "LearnVeda",
    url:          BASE_URL,
    logo:         `${BASE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/learnveda",
      "https://github.com/ISHUKR75/LearnVeda",
    ],
    contactPoint: {
      "@type":           "ContactPoint",
      contactType:       "customer support",
      availableLanguage: ["English", "Hindi"],
    },
  });
}

/**
 * Generate JSON-LD FAQPage schema for FAQ sections.
 * @param items - Array of { question, answer } pairs
 */
export function faqLd(items: { question: string; answer: string }[]): string {
  return JSON.stringify({
    "@context":    "https://schema.org",
    "@type":       "FAQPage",
    mainEntity:    items.map((item) => ({
      "@type":          "Question",
      name:             item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    item.answer,
      },
    })),
  });
}

/**
 * Generate JSON-LD WebSite schema with SearchAction for the root page.
 */
export function websiteLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type":    "WebSite",
    name:       "LearnVeda",
    url:        BASE_URL,
    potentialAction: {
      "@type":       "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}
