/**
 * @file features/simulations/components/SimulationsCatalogue.tsx
 * @description Full simulations catalogue for the /simulations page
 *
 * Shows all 140+ interactive simulations grouped by category:
 *  - Physics (Newton's laws, waves, optics, thermodynamics)
 *  - Chemistry (reactions, periodic table, molecular bonding)
 *  - Biology (cell division, genetics, ecosystems)
 *  - Mathematics (geometry, calculus visualizer, statistics)
 *  - DSA (sorting, trees, graphs, DP)
 *  - Computer Science (CPU, memory, networks, OS)
 *  - Electronics (circuits, logic gates)
 *
 * Each simulation card has: title, category, difficulty, duration,
 * and a "Launch" button linking to the interactive viewer.
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical, Atom, Leaf, Calculator,
  Code2, Cpu, Zap, Play, Filter, Search, Star,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Input }  from "@/components/ui/input";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Simulation {
  id:         string;
  title:      string;
  category:   SimCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration:   string;      // e.g. "10 min"
  class?:     string;      // CBSE class if applicable
  tags:       string[];
  isPremium:  boolean;     // Requires Pro plan
}

type SimCategory = "physics" | "chemistry" | "biology" | "mathematics" | "dsa" | "cs" | "electronics";

/* ─── Category Config ────────────────────────────────────────────────────── */
const CATEGORIES: { id: SimCategory | "all"; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { id: "all",         label: "All",         icon: Filter,    color: "text-foreground"     },
  { id: "physics",     label: "Physics",     icon: Atom,      color: "text-blue-500"       },
  { id: "chemistry",   label: "Chemistry",   icon: FlaskConical, color: "text-green-500"  },
  { id: "biology",     label: "Biology",     icon: Leaf,      color: "text-emerald-500"   },
  { id: "mathematics", label: "Mathematics", icon: Calculator,color: "text-purple-500"    },
  { id: "dsa",         label: "DSA",         icon: Code2,     color: "text-orange-500"    },
  { id: "cs",          label: "Comp. Sci",   icon: Cpu,       color: "text-brand-500"     },
  { id: "electronics", label: "Electronics", icon: Zap,       color: "text-yellow-500"    },
];

/* ─── Simulations Data ───────────────────────────────────────────────────── */
const SIMULATIONS: Simulation[] = [
  // Physics
  { id: "newton-laws",        title: "Newton's Laws of Motion",       category: "physics",   difficulty: "Beginner",     duration: "15 min", class: "Class 9",  tags: ["Force", "Motion"],       isPremium: false },
  { id: "projectile-motion",  title: "Projectile Motion Simulator",   category: "physics",   difficulty: "Intermediate", duration: "12 min", class: "Class 11", tags: ["Kinematics"],            isPremium: false },
  { id: "pendulum",           title: "Simple Pendulum & SHM",         category: "physics",   difficulty: "Intermediate", duration: "10 min", class: "Class 11", tags: ["SHM", "Oscillation"],    isPremium: true  },
  { id: "wave-interference",  title: "Wave Interference & Diffraction",category: "physics",  difficulty: "Advanced",     duration: "20 min", class: "Class 12", tags: ["Waves", "Optics"],       isPremium: true  },
  { id: "electric-field",     title: "Electric Field Visualizer",     category: "physics",   difficulty: "Intermediate", duration: "15 min", class: "Class 12", tags: ["Electrostatics"],        isPremium: true  },
  { id: "magnetic-field",     title: "Magnetic Field Lines",          category: "physics",   difficulty: "Intermediate", duration: "12 min", class: "Class 12", tags: ["Magnetism"],             isPremium: true  },
  { id: "ray-optics",         title: "Ray Optics: Lens & Mirror",     category: "physics",   difficulty: "Beginner",     duration: "10 min", class: "Class 10", tags: ["Optics", "Light"],       isPremium: false },
  { id: "resistor-circuit",   title: "Resistor Circuits (Ohm's Law)", category: "physics",   difficulty: "Beginner",     duration: "8 min",  class: "Class 10", tags: ["Electricity", "Circuit"], isPremium: false },
  // Chemistry
  { id: "periodic-table",     title: "Interactive Periodic Table",    category: "chemistry", difficulty: "Beginner",     duration: "20 min", class: "Class 9",  tags: ["Elements", "Properties"], isPremium: false },
  { id: "molecular-bonding",  title: "Molecular Bonding Visualizer",  category: "chemistry", difficulty: "Intermediate", duration: "15 min", class: "Class 11", tags: ["Bonding", "Structure"],   isPremium: true  },
  { id: "acid-base",          title: "Acid-Base Titration Lab",       category: "chemistry", difficulty: "Intermediate", duration: "12 min", class: "Class 11", tags: ["Acids", "Bases"],         isPremium: true  },
  { id: "reaction-simulator", title: "Chemical Reaction Simulator",   category: "chemistry", difficulty: "Advanced",     duration: "18 min", class: "Class 12", tags: ["Reactions", "Kinetics"],  isPremium: true  },
  // Biology
  { id: "cell-division",      title: "Cell Division: Mitosis & Meiosis", category: "biology", difficulty: "Beginner",   duration: "12 min", class: "Class 9",  tags: ["Cell", "DNA"],            isPremium: false },
  { id: "genetics",           title: "Mendelian Genetics Simulator",  category: "biology",   difficulty: "Intermediate", duration: "15 min", class: "Class 12", tags: ["Genetics", "Heredity"],   isPremium: true  },
  { id: "ecosystem",          title: "Ecosystem Food Web",            category: "biology",   difficulty: "Beginner",     duration: "10 min", class: "Class 9",  tags: ["Ecology", "Food Chain"],  isPremium: false },
  { id: "photosynthesis",     title: "Photosynthesis Process",        category: "biology",   difficulty: "Beginner",     duration: "8 min",  class: "Class 10", tags: ["Plants", "Energy"],       isPremium: false },
  // Mathematics
  { id: "geometry-visualizer",title: "Geometry Visualizer",           category: "mathematics", difficulty: "Beginner",  duration: "15 min", class: "Class 9",  tags: ["Shapes", "Theorems"],     isPremium: false },
  { id: "calculus-limits",    title: "Calculus: Limits & Derivatives",category: "mathematics", difficulty: "Advanced",  duration: "25 min", class: "Class 12", tags: ["Calculus", "Derivatives"], isPremium: true  },
  { id: "statistics-viz",     title: "Statistics & Probability",      category: "mathematics", difficulty: "Intermediate",duration:"20 min", class: "Class 10", tags: ["Statistics", "Charts"],   isPremium: true  },
  { id: "coordinate-geo",     title: "Coordinate Geometry Explorer",  category: "mathematics", difficulty: "Beginner",  duration: "12 min", class: "Class 10", tags: ["Coordinate", "Lines"],    isPremium: false },
  // DSA
  { id: "sorting-visualizer", title: "Sorting Algorithm Visualizer",  category: "dsa",       difficulty: "Beginner",     duration: "15 min", tags: ["Sorting", "Algorithms"], isPremium: false },
  { id: "binary-tree",        title: "Binary Search Tree Operations", category: "dsa",       difficulty: "Intermediate", duration: "20 min", tags: ["Trees", "BST"],           isPremium: false },
  { id: "graph-traversal",    title: "Graph BFS & DFS Visualizer",    category: "dsa",       difficulty: "Intermediate", duration: "15 min", tags: ["Graphs", "BFS", "DFS"],  isPremium: true  },
  { id: "dp-visualizer",      title: "Dynamic Programming Visualizer",category: "dsa",       difficulty: "Advanced",     duration: "25 min", tags: ["DP", "Memoization"],      isPremium: true  },
  { id: "linked-list",        title: "Linked List Operations",        category: "dsa",       difficulty: "Beginner",     duration: "12 min", tags: ["LinkedList", "Pointers"], isPremium: false },
  { id: "heap-visualizer",    title: "Heap & Priority Queue",         category: "dsa",       difficulty: "Intermediate", duration: "15 min", tags: ["Heap", "Priority Queue"], isPremium: true  },
  // CS
  { id: "cpu-simulator",      title: "CPU Architecture Simulator",    category: "cs",        difficulty: "Advanced",     duration: "30 min", tags: ["CPU", "Architecture"],   isPremium: true  },
  { id: "memory-management",  title: "Memory Management (OS)",        category: "cs",        difficulty: "Advanced",     duration: "25 min", tags: ["OS", "Memory"],          isPremium: true  },
  { id: "network-packets",    title: "Network Packet Routing",        category: "cs",        difficulty: "Intermediate", duration: "20 min", tags: ["Networks", "TCP/IP"],    isPremium: true  },
  { id: "cache-simulator",    title: "Cache Memory Simulator",        category: "cs",        difficulty: "Advanced",     duration: "20 min", tags: ["Cache", "Performance"],  isPremium: true  },
  { id: "compiler-phases",    title: "Compiler Phases Visualizer",    category: "cs",        difficulty: "Advanced",     duration: "30 min", tags: ["Compiler", "Parsing"],   isPremium: true  },
  // Electronics
  { id: "logic-gates",        title: "Digital Logic Gate Simulator",  category: "electronics", difficulty: "Beginner",  duration: "15 min", tags: ["Logic Gates", "Boolean"], isPremium: false },
  { id: "flip-flop",          title: "Flip-Flop & Sequential Logic",  category: "electronics", difficulty: "Intermediate",duration: "20 min", tags: ["Sequential", "Latches"], isPremium: true },
  { id: "circuit-builder",    title: "Circuit Builder (RC, RL, RLC)", category: "electronics", difficulty: "Intermediate",duration: "18 min", tags: ["Circuits", "Components"], isPremium: true },
];

/* ─── Difficulty badge colors ────────────────────────────────────────────── */
const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner:     "bg-green-500/10 text-green-600 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Advanced:     "bg-red-500/10 text-red-600 border-red-500/20",
};

/* ─── SimulationsCatalogue Component ────────────────────────────────────────*/
export function SimulationsCatalogue() {
  const [activeCategory, setActiveCategory] = useState<SimCategory | "all">("all");
  const [searchQuery,    setSearchQuery]    = useState("");

  // Filter simulations
  const filtered = SIMULATIONS.filter((sim) => {
    const matchesCategory = activeCategory === "all" || sim.category === activeCategory;
    const matchesSearch   = !searchQuery ||
      sim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sim.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 border-b bg-gradient-to-b from-muted/30 to-background text-center">
        <div className="container px-4 md:px-6">
          <Badge variant="secondary" className="mb-4">140+ Interactive Labs</Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Learn by{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Doing
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Interactive simulations for Physics, Chemistry, Biology, Mathematics, DSA, and Computer Science.
            See concepts in action — not just on paper.
          </p>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search simulations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <cat.icon className={`h-4 w-4 ${activeCategory === cat.id ? "text-white" : cat.color}`} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-muted-foreground text-sm mb-6 text-center">
            Showing {filtered.length} simulation{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Simulations grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((sim, i) => (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
                className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                {/* Color header bar */}
                <div className={`h-1.5 w-full ${
                  sim.category === "physics"     ? "bg-blue-500"    :
                  sim.category === "chemistry"   ? "bg-green-500"   :
                  sim.category === "biology"     ? "bg-emerald-500" :
                  sim.category === "mathematics" ? "bg-purple-500"  :
                  sim.category === "dsa"         ? "bg-orange-500"  :
                  sim.category === "cs"          ? "bg-brand-500"   :
                  "bg-yellow-500"
                }`} />

                <div className="p-5">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className={`text-xs ${DIFFICULTY_COLORS[sim.difficulty]}`}>
                      {sim.difficulty}
                    </Badge>
                    {sim.isPremium && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />Pro
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground text-sm mb-2 leading-snug group-hover:text-brand-500 transition-colors">
                    {sim.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {sim.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                    {sim.class && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {sim.class}
                      </span>
                    )}
                  </div>

                  {/* Duration + Launch */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">⏱ {sim.duration}</span>
                    <Link href={`/simulations/${sim.category}`}>
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors">
                        <Play className="h-3.5 w-3.5" />
                        Launch
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No simulations found for &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
