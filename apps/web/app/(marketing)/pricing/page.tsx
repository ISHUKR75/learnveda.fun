/**
 * @file app/(marketing)/pricing/page.tsx
 * @description Pricing page for LearnVeda
 * Route: /pricing
 */

import type { Metadata } from "next";
import { Navbar }              from "@/components/navigation/navbar";
import { Footer }              from "@/components/navigation/footer";
import { PricingCards }        from "@/features/pricing/components/PricingCards";
import { PricingComparison }   from "@/features/pricing/components/PricingComparison";
import { PricingFAQ }          from "@/features/pricing/components/PricingFAQ";

export const metadata: Metadata = {
  title:       "Pricing — LearnVeda",
  description: "Simple, transparent pricing. Free forever plan available. Pro from ₹299/month. School plans for institutions. No hidden fees.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingCards />      {/* Three plan cards: Free, Pro, School */}
        <PricingComparison /> {/* Full feature comparison table */}
        <PricingFAQ />        {/* Accordion FAQ with JSON-LD */}
      </main>
      <Footer />
    </>
  );
}
