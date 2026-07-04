/**
 * @file features/home/components/TestimonialsSection.tsx
 * @description Student testimonials section for LearnVeda homepage
 * Social proof from real students across India using the platform
 */

"use client"; // Client component for animations

import React from "react";                          // React core
import { motion } from "framer-motion";             // Animations
import { Star, Quote } from "lucide-react";         // Icons
import { Badge } from "@/components/ui/badge";      // Badge component

/* ─── Testimonial Data ───────────────────────────────────────────────────── */
const testimonials = [
  {
    name:     "Priya Sharma",
    role:     "Class 12 Student",
    location: "Jaipur, Rajasthan",
    avatar:   "PS",
    color:    "from-purple-500 to-pink-500",
    stars:    5,
    streak:   "14-day streak",
    quote:    "LearnVeda changed how I study for boards. The AI tutor explains everything like a real teacher. I went from 71% to 89% in Physics in just 4 weeks! The simulation for Newton's Laws made mechanics click instantly.",
    highlight: "71% → 89% in Physics",
  },
  {
    name:     "Arjun Nair",
    role:     "Engineering Student",
    location: "Kochi, Kerala",
    avatar:   "AN",
    color:    "from-blue-500 to-cyan-500",
    stars:    5,
    streak:   "DSA 60-Day Plan",
    quote:    "I followed the 45-day Java plan end-to-end and completed the DSA 60-day plan. Got placed at a product startup! The structured approach with daily goals was exactly what I needed for placement prep.",
    highlight: "Got placed at a startup",
  },
  {
    name:     "Sneha Gupta",
    role:     "Class 10 Student",
    location: "Delhi",
    avatar:   "SG",
    color:    "from-green-500 to-teal-500",
    stars:    5,
    streak:   "21-day streak",
    quote:    "The CBSE chapters are perfectly aligned with NCERT. I went from 65% to 82% in my unit test after just three weeks. The XP system keeps me motivated every day — it's like a game but for studying!",
    highlight: "65% → 82% in unit test",
  },
  {
    name:     "Rahul Verma",
    role:     "B.Tech CSE Student",
    location: "Pune, Maharashtra",
    avatar:   "RV",
    color:    "from-orange-500 to-red-500",
    stars:    5,
    streak:   "System Design path",
    quote:    "The System Design 25-day plan is gold! Each day builds on the previous concept. The simulations for distributed systems are incredible — I could actually see how load balancers work.",
    highlight: "Cracked System Design interviews",
  },
  {
    name:     "Ananya Singh",
    role:     "Class 11 Student",
    location: "Bengaluru, Karnataka",
    avatar:   "AS",
    color:    "from-cyan-500 to-blue-500",
    stars:    5,
    streak:   "Chemistry champion",
    quote:    "The Chemistry molecular bonding simulation is mind-blowing! I could never visualize electron orbitals from the textbook but the 3D simulation made everything clear. My Chemistry marks jumped by 18 points.",
    highlight: "+18 points in Chemistry",
  },
  {
    name:     "Karthik Reddy",
    role:     "Engineering Final Year",
    location: "Hyderabad, Telangana",
    avatar:   "KR",
    color:    "from-yellow-500 to-orange-500",
    stars:    5,
    streak:   "Python 45-Day Plan",
    quote:    "Finished the Python 45-day plan and built 3 real projects. The live battle mode for coding is insanely competitive and fun. Won 2 tournament battles this month. This platform is unlike any other.",
    highlight: "Built 3 real projects",
  },
];

/* ─── Testimonials Section Component ─────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20" aria-label="Student testimonials">
      <div className="container px-4 md:px-6">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            Student Stories
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Real Results from{" "}
            <span className="text-gradient">Real Students</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join 10,000+ students who improved their grades, skills, and career prospects.
          </p>
        </div>

        {/* ── Testimonials Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col rounded-xl border bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <Quote className="h-6 w-6 text-brand-500/30 mb-3" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Highlight badge */}
              <div className="mb-4">
                <Badge variant="success" className="text-xs">
                  ✨ {t.highlight}
                </Badge>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-3 pt-4 border-t">
                {/* Avatar */}
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-white text-sm font-bold`}>
                  {t.avatar}
                </div>
                {/* Name, role, location */}
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
                </div>
                {/* Streak badge */}
                <div className="ml-auto text-xs text-brand-500 font-medium whitespace-nowrap">
                  🔥 {t.streak}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
