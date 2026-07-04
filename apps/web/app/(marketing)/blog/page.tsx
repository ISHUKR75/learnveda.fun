/**
 * @file app/(marketing)/blog/page.tsx
 * @description Blog page for LearnVeda
 * Route: /blog
 * Study tips, subject guides, career advice, and platform updates
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { BlogGrid } from "@/features/blog/components/BlogGrid";

export const metadata: Metadata = {
  title:       "Blog — LearnVeda",
  description: "Study tips, subject deep-dives, programming guides, exam strategies, and updates from the LearnVeda team.",
  openGraph: { title: "Blog — LearnVeda", url: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogGrid />
      </main>
      <Footer />
    </>
  );
}
