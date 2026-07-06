/**
 * @file app/(marketing)/simulations/page.tsx
 * @description Interactive Simulations catalogue page
 * Route: /simulations
 */

import type { Metadata } from "next";
import { Navbar }                  from "@/components/navigation/navbar";
import { Footer }                  from "@/components/navigation/footer";
import { SimulationsCatalogue }    from "@/features/simulations/components/SimulationsCatalogue";

export const metadata: Metadata = {
  title:       "Interactive Simulations — LearnVeda",
  description: "140+ interactive simulations for Physics, Chemistry, Biology, Mathematics, DSA, and Computer Science. Learn by doing, not just reading.",
};

export default function SimulationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SimulationsCatalogue /> {/* Full simulation catalogue with filters */}
      </main>
      <Footer />
    </>
  );
}
