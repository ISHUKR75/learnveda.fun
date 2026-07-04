/**
 * @file app/(marketing)/page.tsx
 * @description Home page — Main landing page for LearnVeda
 * Route: /
 * Sections: Hero → Stats → Features → Learn Tracks → Simulations → Pricing → CTA → Footer
 * Server component for fast SSR + SEO, with "use client" sections for animations
 */

import type { Metadata } from "next";                           // SEO metadata type
import { HeroSection }         from "@/features/home/components/HeroSection";
import { StatsSection }        from "@/features/home/components/StatsSection";
import { LearnTracksSection }  from "@/features/home/components/LearnTracksSection";
import { FeaturesSection }     from "@/features/home/components/FeaturesSection";
import { SimulationsSection }  from "@/features/home/components/SimulationsSection";
import { ProgrammingSection }  from "@/features/home/components/ProgrammingSection";
import { CommunitySection }    from "@/features/home/components/CommunitySection";
import { PricingPreview }      from "@/features/home/components/PricingPreview";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";
import { CTASection }          from "@/features/home/components/CTASection";
import { Navbar }              from "@/components/navigation/navbar";
import { Footer }              from "@/components/navigation/footer";

/* ─── Page-level SEO Metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "LearnVeda — AI-Powered Learning from Class 9 to Graduation",
  description:
    "India's most complete EdTech platform. Learn CBSE Class 9–12, Engineering, " +
    "Programming, DSA, System Design with AI tutor, interactive simulations, " +
    "live coding battles, and a global leaderboard. Start free today!",
  keywords: ["CBSE learning", "online education India", "coding platform", "class 9 10 11 12"],
  openGraph: {
    title:       "LearnVeda — Learn Smarter from Class 9 to Graduation",
    description: "AI-powered EdTech platform for Indian students. CBSE, Engineering, Programming, Simulations, Live Battles.",
    url:         "/",
    type:        "website",
  },
};

/* ─── Home Page Component ─────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />    {/* Fixed top navigation */}

      <main>
        {/* 1. Hero — above-the-fold impact section */}
        <HeroSection />

        {/* 2. Stats — social proof numbers (students, chapters, questions) */}
        <StatsSection />

        {/* 3. Learn tracks — Class 9-12, Engineering, Programming overview */}
        <LearnTracksSection />

        {/* 4. Features — what makes LearnVeda unique */}
        <FeaturesSection />

        {/* 5. Interactive simulations showcase */}
        <SimulationsSection />

        {/* 6. Programming languages section */}
        <ProgrammingSection />

        {/* 7. Community / social proof section */}
        <CommunitySection />

        {/* 8. Testimonials from real students */}
        <TestimonialsSection />

        {/* 9. Pricing preview */}
        <PricingPreview />

        {/* 10. Bottom CTA — final conversion push */}
        <CTASection />
      </main>

      <Footer />    {/* Site-wide footer */}
    </>
  );
}
