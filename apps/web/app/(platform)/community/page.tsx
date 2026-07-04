/**
 * @file app/(platform)/community/page.tsx
 * @description Community Q&A forum page for LearnVeda
 * Route: /community
 * Shows categorized posts, questions, and ability to ask and answer
 * Navbar is provided by the (platform) layout — not duplicated here
 */

import type { Metadata } from "next"; // Next.js metadata type
import { CommunityFeed } from "@/features/community/components/CommunityFeed"; // Main community feed UI
import { Footer } from "@/components/navigation/footer"; // Site footer

export const metadata: Metadata = {
  title:       "Community — LearnVeda",
  description: "Ask questions, share knowledge, and help fellow students across India. The LearnVeda community — active 24/7.",
  openGraph: { title: "Community — LearnVeda", url: "/community" },
};

/* ─── Community Page ─────────────────────────────────────────────────────── */
export default function CommunityPage() {
  return (
    <>
      <main> {/* Platform layout provides Navbar — no duplication needed */}
        <CommunityFeed /> {/* Renders Q&A feed with categories, search, and compose */}
      </main>
      <Footer /> {/* Site-wide footer */}
    </>
  );
}
