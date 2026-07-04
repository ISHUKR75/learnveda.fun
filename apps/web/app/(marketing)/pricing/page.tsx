/**
 * @file app/(marketing)/pricing/page.tsx
 * @description Full pricing page for LearnVeda
 * Route: /pricing
 * Shows all plans, feature comparison table, FAQ, and CTA
 */

import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { PricingHero }       from "@/features/pricing/components/PricingHero";
import { PricingCards }      from "@/features/pricing/components/PricingCards";
import { PricingComparison } from "@/features/pricing/components/PricingComparison";
import { PricingFAQ }        from "@/features/pricing/components/PricingFAQ";

export const metadata: Metadata = {
  title:       "Pricing — LearnVeda",
  description: "Simple, transparent pricing for LearnVeda. Start free forever. Upgrade to Pro for full access to all 140+ simulations, AI tutor, and premium content.",
  openGraph: { title: "Pricing — LearnVeda", url: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingHero />       {/* Headline + billing toggle */}
        <PricingCards />      {/* Plan cards grid */}
        <PricingComparison /> {/* Full feature comparison table */}
        <PricingFAQ />        {/* Frequently asked questions */}
      </main>
      <Footer />
    </>
  );
}
