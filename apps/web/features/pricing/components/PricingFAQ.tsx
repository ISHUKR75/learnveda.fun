/**
 * @file features/pricing/components/PricingFAQ.tsx
 * @description Pricing FAQ section with JSON-LD structured data
 *
 * Common questions about pricing, billing, and plan features.
 * Includes FAQPage JSON-LD for rich search results.
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ─── FAQ Data ───────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Is the Free plan really free forever?",
    a: "Yes! The Free plan is free forever with no credit card required. You get access to selected chapters, 5 simulations, and 10 live battles per month — no expiry.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Absolutely. You can cancel Pro at any time from your Settings page. Your Pro access continues until the end of the billing period, and you won't be charged again.",
  },
  {
    q: "Is there a student discount?",
    a: "Our yearly plan is already 40% cheaper than monthly. We also offer special discounts for students from low-income backgrounds — email us at support@learnveda.in with your student ID.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, net banking, debit/credit cards, and Razorpay Pay Later. All payments are processed securely via Razorpay and Stripe.",
  },
  {
    q: "Do you offer a money-back guarantee?",
    a: "Yes — we offer a 7-day money-back guarantee on Pro plans. If you're not satisfied, email us within 7 days of your first payment and we'll refund in full.",
  },
  {
    q: "How does the School plan work?",
    a: "The School plan is for coaching institutes, schools, and colleges. We offer bulk student licenses, a teacher dashboard, and custom analytics. Email schools@learnveda.in for pricing.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use Clerk for authentication (industry-standard OAuth 2.0), MongoDB Atlas with encryption at rest, and HTTPS everywhere. Read our Privacy Policy for details.",
  },
  {
    q: "Can I use LearnVeda on mobile?",
    a: "Yes! LearnVeda is fully responsive and works on mobile browsers. A dedicated React Native app is in development — sign up to be notified when it launches.",
  },
];

/* ─── FAQ Item Component ─────────────────────────────────────────────────── */
function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b last:border-0">
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-medium text-foreground">{q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>
      {/* Answer — animated slide down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm pb-4 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── PricingFAQ Component ───────────────────────────────────────────────── */
export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  // JSON-LD structured data for FAQ rich results
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  });

  return (
    <section className="py-16 bg-background">
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />

      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-2">Everything you need to know about LearnVeda pricing</p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)} // Toggle open/close
              />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Still have questions?{" "}
              <a href="mailto:support@learnveda.in" className="text-brand-500 hover:underline font-medium">
                Email our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
