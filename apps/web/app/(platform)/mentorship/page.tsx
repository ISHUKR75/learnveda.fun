/**
 * @file app/(platform)/mentorship/page.tsx
 * @description Mentorship hub — browse mentors, book 1:1 sessions, track upcoming calls
 * Route: /mentorship
 * Features: Mentor profiles, filter by subject/level, booking calendar, session history
 * Auth: Protected by (platform) layout — requires sign-in
 * Navbar is provided by (platform) layout — not duplicated here
 */

import type { Metadata } from "next"; // Next.js SEO metadata type
import { Footer }         from "@/components/navigation/footer"; // Site-wide footer
import { MentorshipHub }  from "@/features/mentorship/components/MentorshipHub"; // Main mentorship UI

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Mentorship — LearnVeda | 1:1 Sessions with Expert Mentors",
  description:
    "Book personalized 1:1 mentorship sessions with expert mentors on LearnVeda. " +
    "Get guidance on JEE, NEET, GATE, DSA, System Design, college applications, " +
    "and career paths. Mentors from IITs, NITs, and top tech companies.",
  keywords: [
    "1:1 mentorship India", "JEE mentor", "coding mentor",
    "IIT mentor", "study guidance", "career mentorship",
  ],
  openGraph: {
    title:       "Mentorship — LearnVeda",
    description: "1:1 sessions with expert mentors from IITs, NITs, and top companies.",
    url:         "/mentorship",
    type:        "website",
  },
  robots: { index: false, follow: false }, // Private platform page — exclude from index
};

/* ─── Mentorship Page ─────────────────────────────────────────────────────── */
export default function MentorshipPage() {
  return (
    <>
      {/* Main mentorship hub — mentor browser, booking, and session tracker */}
      <main className="flex-1">
        <MentorshipHub />
      </main>

      {/* Site-wide footer */}
      <Footer />
    </>
  );
}
