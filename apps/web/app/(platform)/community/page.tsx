/**
 * @file app/(platform)/community/page.tsx
 * @description Community forum main page
 * Route: /community
 */

import type { Metadata } from "next";
import { CommunityFeed } from "@/features/community/components/CommunityFeed";

export const metadata: Metadata = {
  title:       "Community — LearnVeda",
  description: "Ask questions, share resources, and connect with 10,000+ students on LearnVeda's community forum.",
};

export default function CommunityPage() {
  return <CommunityFeed />; // Platform layout provides Navbar
}
