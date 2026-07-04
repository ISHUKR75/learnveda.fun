/**
 * @file features/pricing/components/PricingHero.tsx
 * @description Hero section for the Pricing page
 * Displays the page title, subtitle, and billing toggle (monthly/yearly)
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Export billing state so child components can share it
// In a real app this would be in Zustand or React context
export function PricingHero() {
  return (
    <section className="py-20 md:py-28 text-center bg-gradient-to-b from-muted/40 to-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-5 max-w-2xl mx-auto"
        >
          <Badge variant="outline" className="text-brand-500 border-brand-500/30">
            Pricing
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Simple,{" "}
            <span className="text-gradient">Honest Pricing</span>
          </h1>

          <p className="text-lg text-muted-foreground">
            Start free — no credit card needed. Upgrade only when you need more. No hidden fees, no tricky trials.
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {["✅ Free forever plan", "✅ Cancel anytime", "✅ 7-day refund policy", "✅ Student discounts available"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
