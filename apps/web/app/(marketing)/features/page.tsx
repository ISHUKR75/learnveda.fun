/**
 * @file app/(marketing)/features/page.tsx
 * @description Platform Features page for LearnVeda
 * Route: /features
 */

import type { Metadata } from "next";
import { Navbar }            from "@/components/navigation/navbar";
import { Footer }            from "@/components/navigation/footer";
import { FeaturesFullPage }  from "@/features/features-page/components/FeaturesFullPage";

export const metadata: Metadata = {
  title:       "Platform Features — LearnVeda",
  description: "Explore all LearnVeda features: AI Tutor, 140+ simulations, live battles, CBSE & engineering curriculum, code compiler, and community forum.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeaturesFullPage /> {/* Full features showcase with interactive explorer */}
      </main>
      <Footer />
    </>
  );
}
