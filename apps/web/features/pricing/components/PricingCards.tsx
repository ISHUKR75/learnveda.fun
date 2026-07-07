/**
 * @file features/pricing/components/PricingCards.tsx
 * @description Pricing plan cards for the Pricing page
 *
 * Three plans:
 *  1. Free  — forever free, selected chapters
 *  2. Pro   — full access, AI tutor, all simulations
 *  3. School — team licenses for schools and coaching institutes
 *
 * The monthly/yearly toggle adjusts Pro pricing.
 */

"use client"; // Client component — billing state and interactions

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, XCircle, Sparkles, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";

/* ─── Plan Feature Item ──────────────────────────────────────────────────── */
function Feature({ included, text }: { included: boolean; text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      {included ? (
        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
      )}
      <span className={included ? "text-foreground" : "text-muted-foreground/60 line-through"}>
        {text}
      </span>
    </li>
  );
}

/* ─── PricingCards Component ─────────────────────────────────────────────── */
export function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  // Pro plan prices
  const proPrice = billing === "yearly" ? 299 : 499; // ₹/month (yearly is cheaper)

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        {/* Billing toggle (duplicate here for the cards section) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 rounded-full border bg-muted p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billing === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >Monthly</button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billing === "yearly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Yearly
              <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">-40%</span>
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* ── Free Plan ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0.01, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border bg-card p-7 shadow-sm flex flex-col"
          >
            <div className="mb-6">
              <div className="p-2.5 rounded-xl bg-muted inline-flex mb-4">
                <Zap className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Free</h3>
              <p className="text-muted-foreground text-sm mt-1">Perfect for getting started</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">₹0</span>
                <span className="text-muted-foreground text-sm ml-1">/ forever</span>
              </div>
            </div>

            <ul className="space-y-2.5 flex-1 mb-8">
              <Feature included text="Class 9–12 selected chapters (3 per subject)" />
              <Feature included text="5 interactive simulations" />
              <Feature included text="Community forum access" />
              <Feature included text="10 live battles per month" />
              <Feature included text="Code compiler (5 languages)" />
              <Feature included={false} text="Full AI Tutor" />
              <Feature included={false} text="All 140+ simulations" />
              <Feature included={false} text="Unlimited battles" />
              <Feature included={false} text="Mock tests & PYQs" />
              <Feature included={false} text="Certificates" />
            </ul>

            <Link href="/sign-up" className="w-full">
              <Button variant="outline" className="w-full">Get Started Free</Button>
            </Link>
          </motion.div>

          {/* ── Pro Plan (highlighted) ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0.01, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl border-2 border-brand-500 bg-card p-7 shadow-lg flex flex-col relative"
          >
            {/* Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-brand-500 text-white px-4">Most Popular</Badge>
            </div>

            <div className="mb-6">
              <div className="p-2.5 rounded-xl bg-brand-500/10 inline-flex mb-4">
                <Sparkles className="h-5 w-5 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Pro</h3>
              <p className="text-muted-foreground text-sm mt-1">Full platform access</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-bold text-foreground">₹{proPrice}</span>
                <span className="text-muted-foreground text-sm mb-1">/ month</span>
              </div>
              {billing === "yearly" && (
                <p className="text-xs text-green-500 mt-1">
                  Billed annually (₹{proPrice * 12}/year — save ₹{(499 - proPrice) * 12})
                </p>
              )}
            </div>

            <ul className="space-y-2.5 flex-1 mb-8">
              <Feature included text="Everything in Free" />
              <Feature included text="All CBSE Class 9–12 chapters" />
              <Feature included text="All 140+ interactive simulations" />
              <Feature included text="Full AI Tutor (GPT-4 powered)" />
              <Feature included text="Unlimited live battles" />
              <Feature included text="All mock tests & PYQs" />
              <Feature included text="Engineering curriculum" />
              <Feature included text="Code compiler (16 languages)" />
              <Feature included text="Completion certificates" />
              <Feature included text="Priority support" />
            </ul>

            <Link href="/sign-up" className="w-full">
              <Button className="w-full gap-2">
                <Sparkles className="h-4 w-4" />
                Get Pro — ₹{proPrice}/mo
              </Button>
            </Link>
          </motion.div>

          {/* ── School Plan ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0.01, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl border bg-card p-7 shadow-sm flex flex-col"
          >
            <div className="mb-6">
              <div className="p-2.5 rounded-xl bg-orange-500/10 inline-flex mb-4">
                <Building2 className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground">School</h3>
              <p className="text-muted-foreground text-sm mt-1">For institutions & coaching centres</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">Custom</span>
              </div>
              <p className="text-muted-foreground text-sm mt-1">Contact us for pricing</p>
            </div>

            <ul className="space-y-2.5 flex-1 mb-8">
              <Feature included text="Everything in Pro" />
              <Feature included text="Bulk student licenses" />
              <Feature included text="Teacher dashboard" />
              <Feature included text="Class progress analytics" />
              <Feature included text="Custom assignment creation" />
              <Feature included text="White-label option" />
              <Feature included text="Dedicated account manager" />
              <Feature included text="SLA & uptime guarantee" />
              <Feature included text="On-site training" />
              <Feature included text="Custom integrations" />
            </ul>

            <a href="mailto:schools@learnveda.in" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <Building2 className="h-4 w-4" />
                Contact Sales
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Trust footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          💳 No credit card required for Free plan · Cancel Pro anytime · 7-day money-back guarantee
        </p>
      </div>
    </section>
  );
}
