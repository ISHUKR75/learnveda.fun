/**
 * @file features/pricing/components/PricingFAQ.tsx
 * @description Frequently Asked Questions section for the Pricing page
 * Uses accordion UI pattern for expandable answers
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── FAQ Data ───────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Is LearnVeda really free?",
    a: "Yes! The Free plan is genuinely free forever. You get access to Class 9–12 CBSE content, 30+ simulations, 3 programming day-plans, community access, and basic AI tutor. No credit card required to sign up.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Absolutely. You can cancel at any time from your account settings. If you cancel, you'll keep Pro access until the end of your billing period. No cancellation fees.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes — we offer a 7-day full refund, no questions asked, for any new Pro subscription. If you're not satisfied within 7 days, contact support@learnveda.in and we'll process your refund immediately.",
  },
  {
    q: "Are there discounts for students?",
    a: "Yes. Students with a valid .edu email or student ID can get an additional 20% discount on Pro. Contact us at support@learnveda.in with proof of enrollment.",
  },
  {
    q: "Does the yearly plan save money?",
    a: "The yearly plan is billed at ₹2,508/year (₹209/month) compared to ₹299/month on monthly billing — that's a saving of ₹1,080 per year, roughly 30% off.",
  },
  {
    q: "What is the Team / School plan?",
    a: "The Team plan is for coaching institutes, schools, and study groups. It includes teacher dashboards, bulk student licenses, custom branding, detailed analytics, and a dedicated account manager. Contact us for custom pricing.",
  },
  {
    q: "Can I switch between plans?",
    a: "Yes. You can upgrade from Free to Pro anytime. If you downgrade from Pro to Free, your content access returns to the Free tier from your next billing date.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. LearnVeda is built with enterprise-grade security — HTTPS everywhere, encrypted data at rest, Clerk authentication, and no selling of user data to third parties. See our Privacy Policy for full details.",
  },
];

/* ─── Pricing FAQ Component ──────────────────────────────────────────────── */
export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which item is open

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card overflow-hidden"
            >
              {/* Question button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium hover:bg-muted/40 transition-colors"
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180" // Rotate when open
                  )}
                />
              </button>

              {/* Answer — animated expand/collapse */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-10 p-6 rounded-2xl bg-muted/40 border">
          <p className="text-muted-foreground mb-2">Still have questions?</p>
          <a
            href="mailto:support@learnveda.in"
            className="font-semibold text-brand-500 hover:underline"
          >
            support@learnveda.in →
          </a>
        </div>
      </div>
    </section>
  );
}
