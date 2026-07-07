/**
 * @file features/home/components/FeaturesSection.tsx
 * @description Features section for LearnVeda homepage
 * Highlights the key differentiators vs. other EdTech platforms
 * Uses alternating left/right layout with animated entry
 */

"use client"; // Client component for animations

import React from "react";                       // React core
import { motion } from "framer-motion";          // Animations
import {
  Brain, Zap, Shield, Globe, Smartphone,
  BarChart3, Users, Award, BookOpen,
} from "lucide-react";                           // Icons
import { Badge } from "@/components/ui/badge";  // Badge component

/* ─── Feature Data ───────────────────────────────────────────────────────── */
const features = [
  {
    icon:        <Brain className="h-5 w-5" />,
    title:       "AI-Powered Tutor",
    description: "24/7 personal AI tutor that explains concepts, solves doubts, generates practice questions, and adapts to your learning pace.",
    color:       "text-purple-500",
    bg:          "bg-purple-500/10",
  },
  {
    icon:        <Zap className="h-5 w-5" />,
    title:       "Live Coding Battles",
    description: "Real-time 1v1 and tournament coding battles with Elo matchmaking, XP rewards, and live leaderboard.",
    color:       "text-yellow-500",
    bg:          "bg-yellow-500/10",
  },
  {
    icon:        <BookOpen className="h-5 w-5" />,
    title:       "CBSE + Engineering Aligned",
    description: "Content strictly aligned to CBSE NCERT 2025–26 curriculum and engineering university syllabi.",
    color:       "text-blue-500",
    bg:          "bg-blue-500/10",
  },
  {
    icon:        <BarChart3 className="h-5 w-5" />,
    title:       "Progress Analytics",
    description: "Detailed dashboard showing your XP, streaks, completion %, time spent, weak areas, and improvement trends.",
    color:       "text-green-500",
    bg:          "bg-green-500/10",
  },
  {
    icon:        <Globe className="h-5 w-5" />,
    title:       "Multi-Language Support",
    description: "Platform available in English, Hindi, and 10+ regional Indian languages with full translation on every page.",
    color:       "text-cyan-500",
    bg:          "bg-cyan-500/10",
  },
  {
    icon:        <Smartphone className="h-5 w-5" />,
    title:       "Works on Any Device",
    description: "Fully responsive PWA — study on phone, tablet, or desktop. Offline mode for uninterrupted learning.",
    color:       "text-orange-500",
    bg:          "bg-orange-500/10",
  },
  {
    icon:        <Shield className="h-5 w-5" />,
    title:       "Safe & Ad-Free",
    description: "Zero ads, zero distractions. Safe environment for students with parent dashboard and content moderation.",
    color:       "text-red-500",
    bg:          "bg-red-500/10",
  },
  {
    icon:        <Users className="h-5 w-5" />,
    title:       "Active Community",
    description: "Ask doubts, share solutions, join study groups, follow mentors, and collaborate with 10,000+ students.",
    color:       "text-pink-500",
    bg:          "bg-pink-500/10",
  },
  {
    icon:        <Award className="h-5 w-5" />,
    title:       "Certificates & Badges",
    description: "Earn verifiable certificates for completed courses and achievement badges for milestones.",
    color:       "text-brand-500",
    bg:          "bg-brand-500/10",
  },
];

/* ─── Features Section Component ─────────────────────────────────────────── */
export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20" aria-label="Platform features">
      <div className="container px-4 md:px-6">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            Why LearnVeda?
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Built for the{" "}
            <span className="text-gradient">Next Generation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combined the best of Coursera, Khan Academy, LeetCode, Physics Wallah, and GeeksforGeeks — into one free platform.
          </p>
        </div>

        {/* ── Features Bento Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0.01, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group flex gap-4 rounded-xl border bg-background p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Feature icon */}
              <div className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg} ${feature.color}`}>
                {feature.icon}
              </div>

              {/* Feature text */}
              <div>
                <h3 className="font-semibold text-sm mb-1.5 group-hover:text-brand-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
