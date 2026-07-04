/**
 * @file features/home/components/CTASection.tsx
 * @description Bottom Call-to-Action section for LearnVeda homepage
 * Final conversion push before the footer — bold headline + signup CTA
 */

"use client"; // Client component for animations

import React from "react";                       // React core
import Link from "next/link";                    // Next.js navigation
import { motion } from "framer-motion";          // Animations
import { ArrowRight, Sparkles } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // Button component

/* ─── CTA Section Component ──────────────────────────────────────────────── */
export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden" aria-label="Call to action">
      {/* ── Background gradient + pattern ──────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-purple-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />

      <div className="relative container px-4 md:px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Free forever for students
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Your Learning Journey
            <br />
            Starts Today
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            Join 10,000+ students from across India who are learning smarter with LearnVeda. No credit card required — start free, upgrade when ready.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              size="xl"
              className="bg-white text-brand-600 hover:bg-white/90 shadow-xl w-full sm:w-auto font-bold"
              asChild
            >
              <Link href="/sign-up">
                Create Free Account
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto"
              asChild
            >
              <Link href="/explore">
                Explore First
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className="text-sm text-white/60">
            ✅ No ads · ✅ No spam · ✅ Data privacy · ✅ Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
