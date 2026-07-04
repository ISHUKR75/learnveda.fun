/**
 * @file app/(marketing)/learn/page.tsx
 * @description Main Learning Hub page for LearnVeda
 * Route: /learn
 * Overview of all learning tracks — Class 9-12, Engineering, Programming, Core CS
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { LearnHubPage } from "@/features/learn/components/LearnHubPage";

export const metadata: Metadata = {
  title:       "Learn — LearnVeda | Class 9 to Graduation",
  description: "Explore all learning tracks on LearnVeda — CBSE Class 9-12, Engineering branches, 14 Programming languages, Core CS subjects like DSA, OS, DBMS, and System Design.",
  openGraph: {
    title:       "Learn — LearnVeda | Class 9 to Graduation",
    description: "Complete learning paths from Class 9 to Graduation.",
    url:         "/learn",
  },
};

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <main>
        <LearnHubPage />
      </main>
      <Footer />
    </>
  );
}
