/**
 * @file app/(platform)/core-cs/competitive-programming/page.tsx
 * @description Competitive Programming track — 60-day plan
 * Route: /core-cs/competitive-programming
 *
 * Covers: Greedy, Dynamic Programming, Graphs, Number Theory, Segment Trees,
 *         Fenwick Trees, Flows, Game Theory — Codeforces/ICPC level.
 * Level: Expert | Duration: 60 days | Target: Competitive programmers
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown, ChevronUp, CheckCircle, Clock, BookOpen,
  Trophy, Star, Users, Target, Zap, Code2,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── 60-Day CP Phases ───────────────────────────────────────────────────── */
const PHASES = [
  {
    id: 1,
    title: "Foundations",
    days: "Day 01–10",
    color: "from-yellow-500 to-orange-500",
    topics: [
      { day: 1,  title: "Big-O Analysis, Complexity, STL Basics — vector, set, map",        xp: 35 },
      { day: 2,  title: "Sorting — Merge Sort, Quick Sort, Counting Sort",                   xp: 40 },
      { day: 3,  title: "Greedy I — Activity Selection, Fractional Knapsack",                xp: 45 },
      { day: 4,  title: "Binary Search — On answer, on index, on functions",                 xp: 45 },
      { day: 5,  title: "Two Pointers + Sliding Window — Subarray problems",                 xp: 45 },
      { day: 6,  title: "Stack & Queue — Monotonic Stack, Deque, Applications",              xp: 40 },
      { day: 7,  title: "Linked Lists + Prefix Sums — Range queries",                        xp: 40 },
      { day: 8,  title: "Bit Manipulation — AND, OR, XOR, Shifts, Subset enumeration",      xp: 45 },
      { day: 9,  title: "Number Theory I — Primes, Sieve of Eratosthenes, GCD, LCM",        xp: 50 },
      { day: 10, title: "Number Theory II — Modular Arithmetic, Fermat, Inverse",            xp: 50 },
    ],
  },
  {
    id: 2,
    title: "Dynamic Programming",
    days: "Day 11–25",
    color: "from-purple-500 to-violet-600",
    topics: [
      { day: 11, title: "DP Introduction — Fibonacci, Memoization vs Tabulation",            xp: 50 },
      { day: 12, title: "DP on Arrays — Longest Increasing Subsequence, Kadane's",           xp: 55 },
      { day: 13, title: "0/1 Knapsack + Unbounded Knapsack",                                 xp: 55 },
      { day: 14, title: "DP on Strings — LCS, Edit Distance, Palindromes",                  xp: 55 },
      { day: 15, title: "DP on Trees — Tree DP, Rerooting Technique",                        xp: 60 },
      { day: 16, title: "Bitmask DP — TSP, Subset DP",                                      xp: 65 },
      { day: 17, title: "Digit DP — Count numbers with digit constraints",                   xp: 65 },
      { day: 18, title: "DP on Intervals — Matrix Chain, Burst Balloons",                    xp: 65 },
      { day: 19, title: "DP Optimization — Divide & Conquer, Convex Hull Trick",             xp: 70 },
      { day: 20, title: "DP Practice Contest — 5 timed problems",                            xp: 80 },
      { day: 21, title: "More DP — SOS DP, Broken Profile DP",                              xp: 70 },
      { day: 22, title: "Game Theory — Sprague-Grundy, Nim, Combinatorial Games",            xp: 65 },
      { day: 23, title: "Probability + Expected Value DP",                                   xp: 65 },
      { day: 24, title: "DP Hard Problems — Competitive-level practice",                     xp: 75 },
      { day: 25, title: "DP Review + Codeforces Virtual Contest",                            xp: 80 },
    ],
  },
  {
    id: 3,
    title: "Graphs & Trees",
    days: "Day 26–40",
    color: "from-green-500 to-teal-600",
    topics: [
      { day: 26, title: "Graph Representation — Adjacency List, Matrix, Edge List",          xp: 45 },
      { day: 27, title: "BFS + DFS — Applications, Cycle Detection, Bipartite",             xp: 50 },
      { day: 28, title: "Shortest Paths — Dijkstra, Bellman-Ford, SPFA",                    xp: 55 },
      { day: 29, title: "Floyd-Warshall + Johnson's Algorithm",                              xp: 55 },
      { day: 30, title: "Minimum Spanning Tree — Kruskal, Prim, Borůvka",                  xp: 55 },
      { day: 31, title: "Topological Sort + Strongly Connected Components",                  xp: 60 },
      { day: 32, title: "Bridges, Articulation Points, 2-SAT",                              xp: 65 },
      { day: 33, title: "LCA — Binary Lifting, Sparse Table",                               xp: 65 },
      { day: 34, title: "Tree Diameter, Centroid Decomposition",                             xp: 70 },
      { day: 35, title: "Heavy-Light Decomposition",                                         xp: 75 },
      { day: 36, title: "Network Flow — Max Flow, Min Cut, Ford-Fulkerson",                 xp: 70 },
      { day: 37, title: "Bipartite Matching — Hopcroft-Karp",                               xp: 70 },
      { day: 38, title: "Euler Path + Chinese Postman Problem",                              xp: 65 },
      { day: 39, title: "Virtual Graph Contest — Timed 3-hour session",                     xp: 90 },
      { day: 40, title: "Graph Weak Areas Review",                                           xp: 70 },
    ],
  },
  {
    id: 4,
    title: "Advanced Data Structures",
    days: "Day 41–55",
    color: "from-blue-500 to-indigo-600",
    topics: [
      { day: 41, title: "Segment Trees — Range Query, Point Update, Lazy Propagation",      xp: 70 },
      { day: 42, title: "Segment Trees Advanced — Beats, Persistent, Merge Sort Tree",     xp: 80 },
      { day: 43, title: "Fenwick Tree (BIT) — 1D, 2D, Order Statistics",                   xp: 70 },
      { day: 44, title: "Sparse Table — Static RMQ in O(1)",                                xp: 60 },
      { day: 45, title: "Sqrt Decomposition + Mo's Algorithm",                              xp: 70 },
      { day: 46, title: "DSU (Union-Find) — Path Compression, Rank, Rollback",             xp: 65 },
      { day: 47, title: "Treap + Splay Tree — Implicit Key Treap",                          xp: 80 },
      { day: 48, title: "String Algorithms — KMP, Z-function, Aho-Corasick",                xp: 70 },
      { day: 49, title: "Suffix Array + Suffix Automaton",                                  xp: 80 },
      { day: 50, title: "Hashing — Polynomial, Anti-hash Tests",                            xp: 65 },
      { day: 51, title: "FFT + NTT — Polynomial Multiplication",                            xp: 85 },
      { day: 52, title: "Matrix Exponentiation — Linear Recurrences",                       xp: 75 },
      { day: 53, title: "Combinatorics — Burnside, Catalan, Inclusion-Exclusion",           xp: 70 },
      { day: 54, title: "Geometry — Convex Hull, Line Intersection, Area Formulas",         xp: 75 },
      { day: 55, title: "Advanced DS Practice Contest",                                     xp: 90 },
    ],
  },
  {
    id: 5,
    title: "Mock Contests & Review",
    days: "Day 56–60",
    color: "from-rose-500 to-red-600",
    topics: [
      { day: 56, title: "Codeforces Round Simulation — 2.5 hour timed contest",             xp: 100 },
      { day: 57, title: "ICPC-Style Problems — Team strategy, upsolving",                   xp: 100 },
      { day: 58, title: "Weak Area Targeting — Review hardest missed problems",             xp: 80  },
      { day: 59, title: "Top 100 CP Problem List — Timed practice",                         xp: 90  },
      { day: 60, title: "Final Assessment — Rate your readiness, set goals",                xp: 120 },
    ],
  },
] as const;

export default function CompetitiveProgrammingPage() {
  const [openPhase,     setOpenPhase]     = useState<number | null>(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  };

  const totalDays    = 60;
  const completedPct = Math.round((completedDays.size / totalDays) * 100);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-yellow-950/5 to-background py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Competitive Programming</span>
          </nav>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Expert</Badge>
                <Badge variant="outline" className="text-yellow-600 border-yellow-400/40">60 Days</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                🏆 Competitive Programming — 60-Day Plan
              </h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                Master greedy, DP, graphs, segment trees, FFT, and more.
                Go from beginner to Codeforces Specialist and ICPC-ready.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 60 Days · 5 Phases</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 3,100+ learners</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 4.9/5</span>
              </div>
              <div className="flex gap-3">
                <Button size="lg" variant="gradient"><Zap className="h-4 w-4" /> Start Day 1</Button>
                <Button size="lg" variant="outline" asChild><Link href="/compiler">Open Compiler</Link></Button>
              </div>
            </div>
            <div className="w-full lg:w-72 rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Target className="h-4 w-4 text-brand-500" /> Progress</h3>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Days completed</span>
                <span className="font-bold">{completedDays.size} / {totalDays}</span>
              </div>
              <Progress value={completedPct} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">{completedPct}% complete 💪</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8">60-Day Curriculum</h2>
          <div className="flex flex-col gap-5">
            {PHASES.map((phase) => (
              <motion.div key={phase.id} initial={{ opacity: 0.01, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <button className="w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors text-left"
                    onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} text-white`}>
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{phase.title}</div>
                      <div className="text-sm text-muted-foreground">{phase.days} · {phase.topics.length} lessons</div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {phase.topics.filter((t) => completedDays.has(t.day)).length}/{phase.topics.length}
                    </Badge>
                    {openPhase === phase.id ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openPhase === phase.id && (
                    <div className="border-t divide-y">
                      {phase.topics.map((topic) => {
                        const isComplete = completedDays.has(topic.day);
                        return (
                          <div key={topic.day} className={`flex items-center gap-4 px-5 py-4 transition-colors ${isComplete ? "bg-green-500/5" : "hover:bg-muted/30"}`}>
                            <span className="w-14 text-xs font-bold text-muted-foreground/50 tabular-nums shrink-0">Day {String(topic.day).padStart(2, "0")}</span>
                            <button onClick={() => toggleDay(topic.day)} className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${isComplete ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground/30 hover:border-brand-500"}`}>
                              {isComplete && <CheckCircle className="h-3 w-3" />}
                            </button>
                            <span className={`flex-1 text-sm ${isComplete ? "line-through text-muted-foreground" : ""}`}>{topic.title}</span>
                            <Badge variant="secondary" className="text-xs text-yellow-600 shrink-0">+{topic.xp} XP</Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
