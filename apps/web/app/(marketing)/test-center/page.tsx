/**
 * @file app/(marketing)/test-center/page.tsx
 * @description Test Center page — CBSE, JEE, NEET, GATE, company placement tests
 * Route: /test-center
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { TestCenterPage } from "@/features/test-center/components/TestCenterPage";

export const metadata: Metadata = {
  title:       "Test Center — LearnVeda",
  description: "Full-length mock tests for CBSE board exams, JEE, NEET, GATE, and company placement assessments on LearnVeda.",
  openGraph: { title: "Test Center — LearnVeda", url: "/test-center" },
};

export default function TestCenter() {
  return (
    <>
      <Navbar />
      <main>
        <TestCenterPage />
      </main>
      <Footer />
    </>
  );
}
