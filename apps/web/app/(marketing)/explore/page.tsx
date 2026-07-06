/**
 * @file app/(marketing)/explore/page.tsx
 * @description Explore page — content discovery hub for all LearnVeda content
 * Route: /explore
 *
 * Sections:
 *  1. Hero — search bar + tagline
 *  2. Featured subjects grid
 *  3. Learning paths (curated journeys)
 *  4. Trending topics this week
 *  5. Browse by category (CBSE / Engineering / Programming / Core CS)
 *  6. CTA to sign up
 *
 * SEO: metadata + JSON-LD BreadcrumbList
 */

import type { Metadata } from "next";                       // Next.js page metadata type
import { Navbar }          from "@/components/navigation/navbar"; // Top navigation bar
import { Footer }          from "@/components/navigation/footer"; // Site footer
import { ExploreHub }      from "@/features/explore/components/ExploreHub"; // Main explore UI

/* ─── Page Metadata ─────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Explore LearnVeda — Browse All Subjects, Courses & Paths",
  description:
    "Discover CBSE Class 9–12 subjects, engineering tracks, programming languages, DSA, System Design, and more. Browse all learning content on LearnVeda.",
  keywords:    [
    "explore subjects", "CBSE curriculum", "engineering courses",
    "programming tutorials", "DSA", "System Design", "online learning India",
  ],
  openGraph: {
    title:       "Explore LearnVeda — Browse All Subjects, Courses & Paths",
    description: "Discover 500+ chapters, 12 programming languages, engineering tracks, and more.",
    url:         "/explore",
    type:        "website",
  },
  alternates: { canonical: "/explore" },
};

/* ─── Explore Page ───────────────────────────────────────────────────────── */
export default function ExplorePage() {
  return (
    <>
      <Navbar />                   {/* Shared navigation */}
      <main className="min-h-screen">
        <ExploreHub />             {/* Full content discovery experience */}
      </main>
      <Footer />                   {/* Shared footer */}
    </>
  );
}
