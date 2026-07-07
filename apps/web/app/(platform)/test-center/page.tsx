/**
 * @file app/(platform)/test-center/page.tsx
 * @description Test Center hub page route for LearnVeda
 * Route: /test-center
 * @purpose Entry point for all exam prep categories
 * Server component for SSR + SEO; TestCenterHub handles all client interactions
 */

import type { Metadata }     from "next";             // Next.js SEO metadata
import { TestCenterHub }     from "@/features/test-center/components/TestCenterHub"; // Main hub

/* ─── Page-level SEO Metadata ─────────────────────────────────────────────── */
// Rich metadata for test center — optimized for "JEE mock test online", "NEET practice test" etc.
export const metadata: Metadata = {
  title:       "Test Center — JEE, NEET, CBSE Mock Tests | LearnVeda",
  description:
    "Practice with 910+ mock tests on LearnVeda. JEE Main & Advanced, NEET UG, " +
    "CBSE board exams, GATE CS/EC, programming tests, and company recruitment tests. " +
    "Timed tests with instant detailed results and explanations.",
  keywords: [
    "JEE mock test", "NEET practice test", "CBSE board mock", "online test series",
    "JEE Main 2026", "NEET 2026", "GATE CS preparation", "engineering entrance test",
  ],
  openGraph: {
    title:       "Test Center | LearnVeda — 910+ Mock Tests",
    description: "JEE, NEET, CBSE, GATE, Programming, Company tests with instant AI analysis.",
    type:        "website",
  },
  // JSON-LD structured data for SEO
  other: {
    "schema:type": "Course",
  },
};

/* ─── Test Center Page Component ──────────────────────────────────────────── */
// Server component — renders TestCenterHub which contains all client interactions
export default function TestCenterPage() {
  return <TestCenterHub />;
}
