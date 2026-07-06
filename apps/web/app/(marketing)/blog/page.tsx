/**
 * @file app/(marketing)/blog/page.tsx
 * @description Blog listing page for LearnVeda
 * Route: /blog
 */

import type { Metadata } from "next";
import { Navbar }    from "@/components/navigation/navbar";
import { Footer }    from "@/components/navigation/footer";
import { BlogGrid }  from "@/features/blog/components/BlogGrid";

export const metadata: Metadata = {
  title:       "Blog — Study Tips, Tutorials & Career Advice | LearnVeda",
  description: "Expert study tips, CBSE guides, programming tutorials, DSA roadmaps, and career advice from the LearnVeda team.",
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
