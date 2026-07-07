/**
 * @file app/(platform)/test-center/neet/page.tsx
 * @description NEET UG test preparation page
 * Route: /test-center/neet
 * @purpose NEET-specific mock tests: Biology (Zoology + Botany), Physics, Chemistry
 */

import type { Metadata } from "next";

/* ─── NEET Page SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "NEET UG Mock Tests 2026 | LearnVeda Test Center",
  description:
    "Practice NEET UG with 120+ mock tests. Biology (Zoology + Botany), Physics, " +
    "Chemistry. Previous year papers 2015–2025. NCERT-based MCQs with explanations. " +
    "Timed tests matching exact NEET exam pattern.",
  keywords: [
    "NEET mock test 2026", "NEET UG practice", "NEET biology test", "NEET physics chemistry",
    "NEET previous year papers", "medical entrance test online",
  ],
  openGraph: {
    title:       "NEET UG Test Center | LearnVeda",
    description: "120+ NEET mock tests — Biology, Physics, Chemistry with instant explanations.",
    type:        "website",
  },
};

/* ─── NEET questions data ────────────────────────────────────────────────── */
// Full NEET question bank is in features/test-center/data/neet-questions.ts
// This page uses the NEETTestHub component (pattern same as JEETestHub)
import { NEETTestHub } from "@/features/test-center/components/NEETTestHub";

export default function NEETTestPage() {
  return <NEETTestHub />;
}
