/**
 * @file app/(platform)/community/page.tsx
 * @description Community Q&A forum page for LearnVeda
 * Route: /community
 * Shows categorized posts, questions, and ability to ask and answer
 */

import type { Metadata } from "next";
import { CommunityFeed } from "@/features/community/components/CommunityFeed";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title:       "Community — LearnVeda",
  description: "Ask questions, share knowledge, and help fellow students across India. The LearnVeda community — active 24/7.",
  openGraph: { title: "Community — LearnVeda", url: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main>
        <CommunityFeed />
      </main>
      <Footer />
    </>
  );
}
