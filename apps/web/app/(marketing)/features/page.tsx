/**
 * @file app/(marketing)/features/page.tsx
 * @description Features page — deep dive into all LearnVeda platform features
 * Route: /features
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { FeaturesFullPage } from "@/features/features-page/components/FeaturesFullPage";

export const metadata: Metadata = {
  title:       "Features — LearnVeda",
  description: "Explore all LearnVeda features: AI Tutor, 140+ Simulations, Live Battles, CBSE content, Engineering tracks, Programming plans, Leaderboard, and more.",
  openGraph: { title: "Features — LearnVeda", url: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeaturesFullPage />
      </main>
      <Footer />
    </>
  );
}
