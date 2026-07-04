/**
 * @file features/home/components/PricingPreview.tsx
 * @description Pricing preview section for LearnVeda homepage
 * Shows the Free and Pro plans with key feature comparison
 */

"use client"; // Client component for animations

import React, { useState } from "react";           // React core + state
import Link from "next/link";                      // Next.js navigation
import { motion } from "framer-motion";            // Animations
import { Check, X, Sparkles, ArrowRight } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";  // Button component
import { Badge }  from "@/components/ui/badge";   // Badge component

/* ─── Plan Data ──────────────────────────────────────────────────────────── */
const plans = [
  {
    name:        "Free",
    price:       "₹0",
    period:      "forever",
    description: "Everything you need to get started",
    badge:       null,
    featured:    false,
    cta:         "Start for Free",
    ctaHref:     "/sign-up",
    ctaVariant:  "outline" as const,
    features: [
      { text: "Class 9–12 CBSE content",     included: true  },
      { text: "30+ Simulations",             included: true  },
      { text: "Programming Day Plans (3 languages)", included: true  },
      { text: "Community access",            included: true  },
      { text: "Basic dashboard & progress",  included: true  },
      { text: "10 Practice tests/month",     included: true  },
      { text: "AI Tutor (10 queries/day)",   included: true  },
      { text: "Live Battles (3/day)",        included: true  },
      { text: "All 140+ Simulations",        included: false },
      { text: "Unlimited AI Tutor",          included: false },
      { text: "All 14 Programming Languages",included: false },
      { text: "Offline Mode & Downloads",    included: false },
      { text: "Priority support",            included: false },
    ],
  },
  {
    name:        "Pro",
    price:       "₹299",
    period:      "per month",
    description: "Unlock the full LearnVeda experience",
    badge:       "Most Popular",
    featured:    true,
    cta:         "Go Pro",
    ctaHref:     "/pricing",
    ctaVariant:  "gradient" as const,
    features: [
      { text: "Everything in Free",          included: true },
      { text: "All 140+ Simulations",        included: true },
      { text: "Unlimited AI Tutor",          included: true },
      { text: "All 14 Programming Languages",included: true },
      { text: "Offline Mode & Downloads",    included: true },
      { text: "Unlimited Practice tests",    included: true },
      { text: "Unlimited Live Battles",      included: true },
      { text: "Engineering full content",    included: true },
      { text: "Certificates",               included: true },
      { text: "Priority support",            included: true },
      { text: "Parent dashboard",            included: true },
      { text: "Ad-free experience",          included: true },
    ],
  },
];

/* ─── Pricing Preview Component ───────────────────────────────────────────── */
export function PricingPreview() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly"); // Billing toggle

  return (
    <section className="py-20 md:py-32 bg-muted/20" aria-label="Pricing">
      <div className="container px-4 md:px-6">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Simple,{" "}
            <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start free — upgrade when you need more. No hidden fees, no tricks.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                billing === "monthly" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                billing === "yearly" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs text-green-500 font-bold">Save 30%</span>
            </button>
          </div>
        </div>

        {/* ── Pricing Cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-7 ${
                plan.featured
                  ? "border-brand-500 shadow-xl shadow-brand-500/10 bg-gradient-to-br from-brand-500/5 to-purple-500/5"
                  : "bg-background"
              }`}
            >
              {/* Most popular badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="gradient" className="px-4 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold">
                    {billing === "yearly" && plan.price !== "₹0"
                      ? `₹${Math.floor(parseInt(plan.price.replace("₹", "")) * 0.7)}`
                      : plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* CTA */}
              <Button
                variant={plan.ctaVariant}
                size="lg"
                className="w-full mb-6"
                asChild
              >
                <Link href={plan.ctaHref}>{plan.cta}</Link>
              </Button>

              {/* Feature list */}
              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-2 text-sm">
                    {feature.included
                      ? <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                      : <X     className="h-4 w-4 flex-shrink-0 text-muted-foreground/40" />
                    }
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground/60"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* See full pricing link */}
        <div className="text-center mt-8">
          <Button variant="ghost" asChild>
            <Link href="/pricing">
              View Full Pricing Details <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
