/**
 * @file features/home/components/SimulationsSection.tsx
 * @description Interactive simulations showcase section for LearnVeda homepage
 * Highlights the 140+ interactive simulations available on the platform
 */

"use client"; // Client component for animations

import React, { useState } from "react";                  // React core + state
import Link from "next/link";                             // Next.js navigation
import { motion, AnimatePresence } from "framer-motion"; // Animations
import { FlaskConical, ArrowRight, Play } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";          // Button component
import { Badge }  from "@/components/ui/badge";           // Badge component

/* ─── Simulation Categories ──────────────────────────────────────────────── */
const simCategories = [
  { id: "physics",   label: "Physics",  emoji: "⚡", count: 35 },
  { id: "chemistry", label: "Chemistry",emoji: "🧪", count: 20 },
  { id: "biology",   label: "Biology",  emoji: "🧬", count: 15 },
  { id: "dsa",       label: "DSA",      emoji: "🌳", count: 25 },
  { id: "networks",  label: "Networks", emoji: "🌐", count: 12 },
  { id: "cpu",       label: "CPU/OS",   emoji: "💾", count: 18 },
  { id: "math",      label: "Math",     emoji: "📐", count: 10 },
  { id: "circuits",  label: "Circuits", emoji: "🔌", count: 15 },
];

/* ─── Simulation Cards ───────────────────────────────────────────────────── */
const featuredSims = [
  {
    title:       "Newton's Laws of Motion",
    category:    "Physics",
    subject:     "Class 9 Science",
    description: "Interactive force, mass, acceleration simulator with real-time telemetry",
    href:        "/simulations/physics/newtons-laws",
    color:       "from-blue-500 to-cyan-500",
    emoji:       "⚡",
  },
  {
    title:       "Binary Search Tree",
    category:    "DSA",
    subject:     "Data Structures",
    description: "Insert, delete, and traverse a BST step-by-step with visual animations",
    href:        "/simulations/dsa/binary-search-tree",
    color:       "from-green-500 to-teal-500",
    emoji:       "🌳",
  },
  {
    title:       "Sorting Algorithm Race",
    category:    "DSA",
    subject:     "Algorithms",
    description: "Watch Bubble, Merge, Quick Sort race side-by-side with complexity comparison",
    href:        "/simulations/dsa/sorting-race",
    color:       "from-purple-500 to-pink-500",
    emoji:       "🏎️",
  },
  {
    title:       "TCP/IP Packet Journey",
    category:    "Networks",
    subject:     "Computer Networks",
    description: "Visualize how a packet travels from browser to server through the OSI layers",
    href:        "/simulations/networks/tcp-ip-journey",
    color:       "from-orange-500 to-red-500",
    emoji:       "🌐",
  },
  {
    title:       "Molecular Bonding Lab",
    category:    "Chemistry",
    subject:     "Class 11 Chemistry",
    description: "Build molecules, visualize electron sharing, and understand bond angles",
    href:        "/simulations/chemistry/molecular-bonding",
    color:       "from-cyan-500 to-blue-500",
    emoji:       "🧪",
  },
  {
    title:       "CPU Execution Cycle",
    category:    "CPU/OS",
    subject:     "Operating Systems",
    description: "Watch Fetch-Decode-Execute cycle step-by-step in a simulated processor",
    href:        "/simulations/cpu/execution-cycle",
    color:       "from-yellow-500 to-orange-500",
    emoji:       "💾",
  },
];

/* ─── Simulations Section Component ──────────────────────────────────────── */
export function SimulationsSection() {
  const [activeCategory, setActiveCategory] = useState("all"); // Active filter tab

  return (
    <section className="py-20 md:py-32" aria-label="Interactive simulations">
      <div className="container px-4 md:px-6">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
              <FlaskConical className="h-3 w-3 mr-1" />
              Interactive Simulations
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Learn by{" "}
              <span className="text-gradient">Doing</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              140+ physics, chemistry, DSA, OS, and circuit simulations — no textbook can match hands-on learning.
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/simulations">
              View All Simulations <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* ── Category Filter Tabs ──────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-brand-500 text-white shadow-md"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            All ({simCategories.reduce((sum, c) => sum + c.count, 0)})
          </button>
          {simCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-brand-500 text-white shadow-md"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {cat.emoji} {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* ── Simulation Cards Grid ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSims.map((sim, index) => (
              <motion.div
                key={sim.title}
                initial={{ opacity: 0.01, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
              >
                <Link href={sim.href} className="group block h-full">
                  <div className="relative h-full rounded-xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Gradient header */}
                    <div className={`h-28 bg-gradient-to-br ${sim.color} flex items-center justify-center text-5xl`}>
                      {sim.emoji}
                    </div>

                    {/* Card body */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{sim.category}</Badge>
                        <span className="text-xs text-muted-foreground">{sim.subject}</span>
                      </div>

                      <h3 className="font-bold mb-1.5 group-hover:text-brand-500 transition-colors">
                        {sim.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {sim.description}
                      </p>

                      {/* Launch button */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-brand-500 group-hover:gap-3 transition-all">
                        <Play className="h-3 w-3 fill-current" />
                        Launch Simulation
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
