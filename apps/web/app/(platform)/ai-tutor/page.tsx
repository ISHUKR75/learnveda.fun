/**
 * @file app/(platform)/ai-tutor/page.tsx
 * @description AI Tutor page — full-screen chat interface
 * Route: /ai-tutor
 */

import type { Metadata } from "next";
import { AITutorInterface } from "@/features/ai-tutor/components/AITutorInterface";

export const metadata: Metadata = {
  title:       "AI Tutor — LearnVeda",
  description: "Get instant answers to any question from our GPT-4 powered AI Tutor. Ask about Mathematics, Science, Programming, DSA, and more.",
  robots:      { index: false, follow: false }, // Platform feature, not for indexing
};

export default function AITutorPage() {
  return <AITutorInterface />; // Platform layout provides Navbar; AI tutor is full-screen
}
