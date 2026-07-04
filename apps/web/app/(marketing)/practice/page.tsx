/**
 * @file app/(marketing)/practice/page.tsx
 * @description Practice hub page — quizzes, mock tests, coding playground
 * Route: /practice
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { PracticeHub } from "@/features/practice/components/PracticeHub";

export const metadata: Metadata = {
  title:       "Practice — LearnVeda",
  description: "Practice with 10,000+ MCQs, mock tests, coding challenges, and previous year papers for CBSE Class 9-12, JEE, NEET, and engineering subjects.",
  openGraph: { title: "Practice — LearnVeda", url: "/practice" },
};

export default function PracticePage() {
  return (
    <>
      <Navbar />
      <main>
        <PracticeHub />
      </main>
      <Footer />
    </>
  );
}
