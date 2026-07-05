/**
 * @file app/(platform)/live/page.tsx
 * @description Live Classes hub — scheduled and on-demand live sessions
 * Route: /live
 * Features: Upcoming live classes, join ongoing sessions, recordings library
 * Auth: Protected by (platform) layout — requires sign-in
 * Navbar is provided by (platform) layout — not duplicated here
 */

import type { Metadata } from "next"; // Next.js SEO metadata type
import { Footer }         from "@/components/navigation/footer"; // Site-wide footer
import { LiveClassesHub } from "@/features/live/components/LiveClassesHub"; // Main live UI

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Live Classes — LearnVeda | Interactive Live Learning Sessions",
  description:
    "Join live interactive classes on LearnVeda. Expert teachers, real-time Q&A, " +
    "doubt resolution, and recordings available after class. " +
    "Classes for Class 9–12, JEE, NEET, and Programming.",
  keywords: [
    "live classes online India", "JEE live class", "NEET live coaching",
    "CBSE live tuition", "programming live class", "online teaching India",
  ],
  openGraph: {
    title:       "Live Classes — LearnVeda",
    description: "Interactive live classes with expert teachers, real-time Q&A, and recordings.",
    url:         "/live",
    type:        "website",
  },
  robots: { index: false, follow: false }, // Private platform page
};

/* ─── Live Classes Page ───────────────────────────────────────────────────── */
export default function LiveClassesPage() {
  return (
    <>
      {/* Main live classes interface — schedule, join, and recordings */}
      <main className="flex-1">
        <LiveClassesHub />
      </main>

      {/* Site-wide footer */}
      <Footer />
    </>
  );
}
