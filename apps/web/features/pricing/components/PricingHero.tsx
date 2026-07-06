/**
 * @file features/pricing/components/PricingHero.tsx
 * @description Hero section for the Pricing page
 *
 * Shows a headline and billing toggle (monthly/yearly).
 * The toggle state is lifted to parent via callback so all pricing
 * components can react to the same billing period.
 *
 * NOTE: billing state is managed locally here for simplicity.
 * If PricingCards needs to read it, lift state to page.tsx.
 */

"use client"; // Client component — billing toggle state

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

/* ─── PricingHero Component ──────────────────────────────────────────────── */
export function PricingHero() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly"); // Default monthly

  return (
    <section className="py-20 text-center border-b bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0.01, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Savings badge */}
          <Badge variant="secondary" className="mb-4 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
            💰 Save 40% with yearly billing
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Start free, upgrade when you&apos;re ready. No hidden fees. No surprise charges.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 rounded-full border bg-muted p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billing === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billing === "yearly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              {billing === "yearly" && (
                <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                  -40%
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
