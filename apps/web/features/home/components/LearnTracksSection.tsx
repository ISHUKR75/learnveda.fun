/**
 * @file features/home/components/LearnTracksSection.tsx
 * @description Learning tracks section for LearnVeda homepage
 * Shows Class 9-12, Engineering, Programming, and Core CS tracks
 * Each track card links to its dedicated section
 */

"use client"; // Client component for hover animations

import React from "react";                           // React core
import Link from "next/link";                        // Next.js navigation
import { motion } from "framer-motion";              // Animations
import {
  BookOpen, GraduationCap, Code2, Brain, FlaskConical,
  Trophy, ChevronRight,
} from "lucide-react";                               // Icons
import { Card, CardContent } from "@/components/ui/card"; // Card component
import { Badge } from "@/components/ui/badge";       // Badge component

/* ─── Track Data ─────────────────────────────────────────────────────────── */
const tracks = [
  {
    id:          "school",
    title:       "School (Class 9–12)",
    description: "Complete CBSE curriculum — Mathematics, Science, English, Hindi, Social Science, Computer, AI.",
    icon:        <BookOpen className="h-6 w-6" />,
    color:       "from-blue-500 to-cyan-500",
    bgColor:     "from-blue-500/5 to-cyan-500/5",
    border:      "border-blue-500/20",
    href:        "/learn",
    badge:       "CBSE Aligned",
    badgeVariant: "info" as const,
    subjects: ["Class 9", "Class 10", "Class 11", "Class 12"],
    stats:   "500+ chapters · 10,000+ questions",
  },
  {
    id:          "engineering",
    title:       "Engineering",
    description: "9 branches × 8 semesters — CSE, ECE, Mechanical, Civil, Chemical, AI & ML, Data Science, IT.",
    icon:        <GraduationCap className="h-6 w-6" />,
    color:       "from-orange-500 to-red-500",
    bgColor:     "from-orange-500/5 to-red-500/5",
    border:      "border-orange-500/20",
    href:        "/learn/engineering",
    badge:       "9 Branches",
    badgeVariant: "warning" as const,
    subjects: ["CSE", "ECE", "Mechanical", "Civil", "AI & ML"],
    stats:   "9 branches · 8 semesters each",
  },
  {
    id:          "programming",
    title:       "Programming Languages",
    description: "Day-by-day structured plans for 14 languages — C, C++, Java, Python, JavaScript, Rust, Go, and more.",
    icon:        <Code2 className="h-6 w-6" />,
    color:       "from-green-500 to-teal-500",
    bgColor:     "from-green-500/5 to-teal-500/5",
    border:      "border-green-500/20",
    href:        "/learn/programming",
    badge:       "14 Languages",
    badgeVariant: "success" as const,
    subjects: ["Python", "Java", "C++", "JavaScript", "Rust"],
    stats:   "14 languages · 20–60 day plans",
  },
  {
    id:          "core-cs",
    title:       "Core CS Subjects",
    description: "DSA, OS, DBMS, CN, System Design, Git, Competitive Programming, Web Dev — everything for SDE interviews.",
    icon:        <Brain className="h-6 w-6" />,
    color:       "from-purple-500 to-pink-500",
    bgColor:     "from-purple-500/5 to-pink-500/5",
    border:      "border-purple-500/20",
    href:        "/learn/core-cs",
    badge:       "SDE Ready",
    badgeVariant: "purple" as const,
    subjects: ["DSA", "System Design", "OS", "DBMS", "CN"],
    stats:   "9 subjects · 10–60 day plans",
  },
  {
    id:          "simulations",
    title:       "Interactive Simulations",
    description: "140+ physics, chemistry, biology, CS, DSA, and circuit simulations — learn by doing, not just reading.",
    icon:        <FlaskConical className="h-6 w-6" />,
    color:       "from-cyan-500 to-blue-500",
    bgColor:     "from-cyan-500/5 to-blue-500/5",
    border:      "border-cyan-500/20",
    href:        "/simulations",
    badge:       "140+ Sims",
    badgeVariant: "info" as const,
    subjects: ["Physics", "Chemistry", "DSA", "Networks", "CPU"],
    stats:   "140+ simulations · free access",
  },
  {
    id:          "battles",
    title:       "Live Battles & Leaderboard",
    description: "Real-time 1v1 coding and quiz battles, global leaderboard, XP system, streaks, and achievement badges.",
    icon:        <Trophy className="h-6 w-6" />,
    color:       "from-yellow-500 to-orange-500",
    bgColor:     "from-yellow-500/5 to-orange-500/5",
    border:      "border-yellow-500/20",
    href:        "/live-battles",
    badge:       "Live Now",
    badgeVariant: "warning" as const,
    subjects: ["1v1 Battles", "Quiz Wars", "Rankings", "Badges", "Streaks"],
    stats:   "Real-time · global leaderboard",
  },
];

/* ─── Learn Tracks Section Component ─────────────────────────────────────── */
export function LearnTracksSection() {
  return (
    <section className="py-20 md:py-32" aria-label="Learning tracks">
      <div className="container px-4 md:px-6">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            What You&apos;ll Learn
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Everything in{" "}
            <span className="text-gradient">One Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From Class 9 to your first job — structured, progressive, and AI-powered learning for every stage.
          </p>
        </div>

        {/* ── Tracks Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <Link href={track.href} className="group block h-full">
                <Card
                  className={`
                    h-full border ${track.border} bg-gradient-to-br ${track.bgColor}
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                    group-hover:border-opacity-60
                  `}
                >
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    {/* ── Card Header ──────────────────────────────── */}
                    <div className="flex items-start justify-between">
                      {/* Icon with gradient background */}
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${track.color} text-white shadow-md`}>
                        {track.icon}
                      </div>
                      {/* Status badge */}
                      <Badge variant={track.badgeVariant}>{track.badge}</Badge>
                    </div>

                    {/* ── Title & Description ────────────────────── */}
                    <div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-brand-500 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {track.description}
                      </p>
                    </div>

                    {/* ── Subject Tags ──────────────────────────── */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {track.subjects.map((sub) => (
                        <span
                          key={sub}
                          className="text-xs px-2 py-0.5 rounded-full bg-background/60 border text-muted-foreground"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>

                    {/* ── Stats & Arrow ─────────────────────────── */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{track.stats}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
