/**
 * @file app/(platform)/ai-tutor/page.tsx
 * @description AI Tutor page — 24/7 AI-powered personalized tutoring
 * Route: /ai-tutor
 * Features: Multi-subject chat, math solving, code help, study plans, voice input
 * Navbar is provided by (platform) layout — not duplicated here
 * Auth: Protected by platform layout — requires sign-in
 */

import type { Metadata } from "next"; // Next.js metadata type for SEO
import { Footer } from "@/components/navigation/footer"; // Site-wide footer component
import { AITutorMain } from "@/features/ai-tutor/components/AITutorMain"; // Main AI Tutor UI

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "AI Tutor — LearnVeda | 24/7 Personalized Learning Assistant",
  description:
    "Get instant help from LearnVeda's AI Tutor — powered by GPT-4 & Gemini. " +
    "Solve math problems, understand physics concepts, debug code, and get " +
    "personalized study plans. Available 24/7 for Class 9–12 and Engineering students.",
  keywords: [
    "AI tutor India", "online AI tutor", "math problem solver",
    "physics AI help", "coding assistant", "CBSE AI tutor",
  ],
  openGraph: {
    title:       "AI Tutor — LearnVeda",
    description: "24/7 AI-powered tutoring for Class 9–12 and Engineering. Instant doubt resolution.",
    url:         "/ai-tutor",
    type:        "website",
  },
  // Private page — exclude from search index
  robots: { index: false, follow: false },
};

/* ─── AI Tutor Page ───────────────────────────────────────────────────────── */
// Server component wrapper — renders the interactive client-side AITutorMain
export default function AITutorPage() {
  return (
    <>
      {/* Main AI Tutor chat interface — client component for interactivity */}
      <main className="flex-1">
        <AITutorMain />
      </main>

      {/* Site-wide footer */}
      <Footer />
    </>
  );
}
