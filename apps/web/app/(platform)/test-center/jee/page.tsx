/**
 * @file app/(platform)/test-center/jee/page.tsx
 * @description JEE Main & Advanced test preparation page
 * Route: /test-center/jee
 * @purpose Shows JEE-specific mock tests, chapter-wise practice, and PYQs
 * Server component with embedded client MockTestEngine
 */

import type { Metadata }              from "next";
import { JEETestHub }                 from "@/features/test-center/components/JEETestHub";

/* ─── JEE Page SEO Metadata ────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "JEE Main & Advanced Mock Tests 2026 | LearnVeda Test Center",
  description:
    "Practice JEE Main and Advanced with 180+ full mock tests, chapter-wise MCQs, " +
    "and previous year papers (2015–2026). Physics, Chemistry, Mathematics. " +
    "Timed tests with detailed solutions and performance analysis.",
  keywords: [
    "JEE Main mock test 2026", "JEE Advanced practice", "JEE online test series",
    "JEE Physics mock", "JEE Chemistry test", "JEE Mathematics practice",
    "JEE previous year papers", "IIT JEE preparation",
  ],
  openGraph: {
    title:       "JEE Main & Advanced Test Center | LearnVeda",
    description: "180+ JEE mock tests with instant AI analysis. Physics, Chemistry, Maths. Free to practice.",
    type:        "website",
  },
};

export default function JEETestPage() {
  return <JEETestHub />;
}
