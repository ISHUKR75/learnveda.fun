/**
 * @file features/pricing/components/PricingCards.tsx
 * @description Pricing cards for the full Pricing page
 * Shows Free, Pro, and Team plans with all features listed
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";

/* ─── Plan Configuration ─────────────────────────────────────────────────── */
const plans = [
  {
    name:        "Free",
    monthlyPrice: 0,
    yearlyPrice:  0,
    description: "Perfect for getting started",
    icon:        <Zap className="h-5 w-5" />,
    color:       "text-blue-500",
    bg:          "bg-blue-500/10",
    featured:    false,
    cta:         "Start for Free",
    href:        "/sign-up",
    features: [
      "Class 9–12 CBSE core content",
      "30+ interactive simulations",
      "3 programming day-plans",
      "10 practice tests per month",
      "Community access & Q&A",
      "Basic progress dashboard",
      "AI Tutor (10 queries/day)",
      "Live Battles (3 per day)",
      "Mobile responsive access",
    ],
    notIncluded: [
      "All 140+ simulations",
      "All 14 programming languages",
      "Unlimited AI Tutor",
      "Offline mode & downloads",
      "Full Engineering content",
      "Priority support",
      "Parent dashboard",
      "Certificates",
    ],
  },
  {
    name:        "Pro",
    monthlyPrice: 299,
    yearlyPrice:  209,
    description: "For serious learners",
    icon:        <Sparkles className="h-5 w-5" />,
    color:       "text-brand-500",
    bg:          "bg-brand-500/10",
    featured:    true,
    cta:         "Start Pro — 7 Days Free",
    href:        "/sign-up?plan=pro",
    features: [
      "Everything in Free",
      "All 140+ simulations",
      "All 14 programming day-plans",
      "Unlimited AI Tutor queries",
      "Unlimited practice tests",
      "Unlimited Live Battles",
      "Full Engineering content (9 branches)",
      "Offline mode & PDF downloads",
      "Certificates of completion",
      "Parent dashboard & reports",
      "Priority email support",
      "Ad-free experience",
      "Early access to new features",
    ],
    notIncluded: [],
  },
  {
    name:        "Team / School",
    monthlyPrice: null, // Custom pricing
    yearlyPrice:  null,
    description: "For schools & coaching institutes",
    icon:        <Users className="h-5 w-5" />,
    color:       "text-green-500",
    bg:          "bg-green-500/10",
    featured:    false,
    cta:         "Contact Us",
    href:        "/contact",
    features: [
      "Everything in Pro",
      "Bulk student licenses",
      "Teacher dashboard & analytics",
      "Custom branding options",
      "Bulk assessment creation",
      "Student progress reports",
      "Dedicated account manager",
      "API access",
      "SLA & uptime guarantee",
      "Custom content integration",
    ],
    notIncluded: [],
  },
];

/* ─── Pricing Cards Component ─────────────────────────────────────────────── */
export function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background p-1">
            {(["monthly", "yearly"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setBilling(opt)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all capitalize ${
                  billing === opt ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt}
                {opt === "yearly" && <span className="ml-2 text-xs text-green-500 font-bold">−30%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.featured
                  ? "border-brand-500 shadow-2xl shadow-brand-500/10 bg-gradient-to-b from-brand-500/5 to-transparent"
                  : "bg-card"
              }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="gradient" className="px-5 py-1.5 text-sm font-semibold">
                    <Sparkles className="h-3 w-3 mr-1" /> Most Popular
                  </Badge>
                </div>
              )}

              {/* Plan header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.bg} ${plan.color}`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.monthlyPrice !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">
                      ₹{billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold">Custom Pricing</div>
                )}
                {billing === "yearly" && plan.yearlyPrice && (
                  <p className="text-xs text-green-500 mt-1">
                    Billed ₹{plan.yearlyPrice * 12}/year · Save ₹{(plan.monthlyPrice! - plan.yearlyPrice) * 12}
                  </p>
                )}
              </div>

              {/* CTA */}
              <Button
                variant={plan.featured ? "gradient" : "outline"}
                size="lg"
                className="w-full mb-6"
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>

              {/* Included features */}
              <div className="flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 flex-shrink-0 text-green-500 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm opacity-40">
                    <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
