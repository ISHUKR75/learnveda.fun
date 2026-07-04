/**
 * @file app/(marketing)/about/page.tsx
 * @description About LearnVeda page
 * Route: /about
 * Covers: Mission, Vision, Team, Story, Values, Impact
 */

import type { Metadata } from "next";                   // SEO metadata type
import { Navbar }  from "@/components/navigation/navbar"; // Navigation bar
import { Footer }  from "@/components/navigation/footer"; // Footer
import { AboutHero }   from "@/features/about/components/AboutHero";   // Hero section
import { MissionSection } from "@/features/about/components/MissionSection"; // Mission
import { ValuesSection }  from "@/features/about/components/ValuesSection";  // Core values
import { TeamSection }    from "@/features/about/components/TeamSection";     // Team

/* ─── Page SEO Metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "About LearnVeda — Our Mission & Story",
  description: "Learn about LearnVeda's mission to make quality education accessible to every student in India — from Class 9 to Graduation. Meet the team and learn our story.",
  openGraph: {
    title:       "About LearnVeda — Our Mission & Story",
    description: "Making quality education accessible to every student in India.",
    url:         "/about",
  },
};

/* ─── About Page Component ───────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />     {/* Full-width hero with mission statement */}
        <MissionSection /> {/* Detailed mission and vision */}
        <ValuesSection />  {/* Core values grid */}
        <TeamSection />    {/* Team members */}
      </main>
      <Footer />
    </>
  );
}
