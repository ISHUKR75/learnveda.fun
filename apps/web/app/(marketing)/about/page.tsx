/**
 * @file app/(marketing)/about/page.tsx
 * @description About page for LearnVeda
 * Route: /about
 */

import type { Metadata } from "next";
import { Navbar }          from "@/components/navigation/navbar";
import { Footer }          from "@/components/navigation/footer";
import { AboutHero }       from "@/features/about/components/AboutHero";
import { MissionSection }  from "@/features/about/components/MissionSection";
import { ValuesSection }   from "@/features/about/components/ValuesSection";
import { TeamSection }     from "@/features/about/components/TeamSection";

export const metadata: Metadata = {
  title:       "About LearnVeda — Our Mission & Story",
  description: "Learn about LearnVeda's mission to democratize quality education for every student in India. Meet our team and understand what drives us.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />      {/* Hero with mission statement and impact stats */}
        <MissionSection /> {/* Mission, vision, approach, values, and founding story */}
        <ValuesSection />  {/* 6 core values grid */}
        <TeamSection />    {/* Team members + join CTA */}
      </main>
      <Footer />
    </>
  );
}
