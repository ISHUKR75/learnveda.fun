/**
 * @file app/(platform)/core-cs/interview-preparation/page.tsx
 * @description Interview Preparation Track — FAANG + MAANG + Startup interviews
 * Route: /core-cs/interview-preparation
 *
 * Covers:
 *  - DSA patterns for interviews (top 20 patterns)
 *  - System Design interview guide
 *  - Behavioural & HR rounds
 *  - Mock interview resources
 *  - Company-specific preparation (Google, Microsoft, Amazon, Flipkart, etc.)
 *
 * Platform layout (Navbar) is provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";                // React core + hooks
import Link from "next/link";                           // Navigation
import { motion } from "framer-motion";                 // Animations
import {
  Briefcase, Code2, Brain, MessageSquare, Star,
  Clock, CheckCircle2, ArrowRight, ChevronRight,
  Building2, Users, Target, Zap, BookOpen, Trophy,
} from "lucide-react";                                  // Icons
import { Badge }  from "@/components/ui/badge";         // Label badge
import { Button } from "@/components/ui/button";        // CTA button
import { Progress } from "@/components/ui/progress";   // Progress bars

/* ─── DSA Patterns for Interviews ────────────────────────────────────────── */
/**
 * TOP_PATTERNS
 * The 20 most frequently asked DSA patterns in coding interviews.
 * Knowing these patterns covers ~90% of interview questions.
 */
const TOP_PATTERNS = [
  { name: "Two Pointers",        freq: 95, examples: "3Sum, Container With Water, Trapping Rain", emoji: "👆", difficulty: "Easy"     },
  { name: "Sliding Window",      freq: 92, examples: "Maximum Subarray, Longest Substring",        emoji: "🪟", difficulty: "Easy"     },
  { name: "BFS / DFS",           freq: 98, examples: "Level Order, Number of Islands, Word Ladder",emoji: "🌊", difficulty: "Medium"   },
  { name: "Binary Search",       freq: 90, examples: "Search in Rotated Array, Kth Smallest",      emoji: "🔍", difficulty: "Medium"   },
  { name: "Dynamic Programming", freq: 88, examples: "Knapsack, LCS, Coin Change, Climbing Stairs",emoji: "⚡", difficulty: "Hard"     },
  { name: "Backtracking",        freq: 85, examples: "N-Queens, Sudoku Solver, Permutations",       emoji: "↩️", difficulty: "Hard"    },
  { name: "Heap / Priority Queue",freq: 87, examples: "K Largest, Merge K Lists, Median Stream",   emoji: "⛰️", difficulty: "Medium"  },
  { name: "Graph Algorithms",    freq: 82, examples: "Dijkstra, Bellman-Ford, Topological Sort",   emoji: "🕸️", difficulty: "Hard"    },
  { name: "Tree Traversals",     freq: 91, examples: "Inorder, LCA, Path Sum, Diameter",           emoji: "🌲", difficulty: "Medium"   },
  { name: "Stack / Monotonic Stack",freq: 83, examples: "Valid Parentheses, Next Greater Element", emoji: "📚", difficulty: "Medium"  },
  { name: "Tries",               freq: 72, examples: "Word Search II, AutoComplete, Prefix Match", emoji: "🔤", difficulty: "Medium"   },
  { name: "Union Find (DSU)",    freq: 76, examples: "Number of Provinces, Redundant Connection",  emoji: "🔗", difficulty: "Medium"   },
  { name: "Bit Manipulation",    freq: 70, examples: "Single Number, Power of Two, Counting Bits", emoji: "💡", difficulty: "Medium"   },
  { name: "Divide & Conquer",    freq: 74, examples: "Merge Sort, Quick Sort, Majority Element",   emoji: "✂️", difficulty: "Medium"  },
  { name: "Greedy Algorithms",   freq: 80, examples: "Activity Selection, Jump Game, Gas Station", emoji: "💰", difficulty: "Medium"   },
] as const;

/* ─── Company-wise Preparation ────────────────────────────────────────────── */
const COMPANIES = [
  { name: "Google",      logo: "🔵", level: "L4–L7",  focus: "Algorithms + System Design + Scalability",     rounds: 5, leetcode: "Hard", tip: "Google loves graph problems — master Dijkstra, BFS, DFS deeply." },
  { name: "Microsoft",   logo: "🪟", level: "SDE-1/2", focus: "OOP + DSA + Low-level Design",               rounds: 4, leetcode: "Medium", tip: "Class design questions are common — practice OOP modelling." },
  { name: "Amazon",      logo: "🟠", level: "SDE-1/2", focus: "Leadership Principles + DSA + System Design", rounds: 5, leetcode: "Medium", tip: "Know all 16 Leadership Principles and have STAR stories ready." },
  { name: "Flipkart",    logo: "🛒", level: "SDE-1/2", focus: "DSA + Product sense + System Design",        rounds: 4, leetcode: "Medium", tip: "High-frequency: Trees, Graphs, DP. Read about Flipkart's tech blog." },
  { name: "Atlassian",   logo: "🔵", level: "SWE",    focus: "DSA + Collaboration-focused behavioural",     rounds: 3, leetcode: "Medium", tip: "Culture fit is very important — emphasize teamwork and empathy." },
  { name: "Adobe",       logo: "🔴", level: "MTS-1/2", focus: "DSA + System Design + Creativity",           rounds: 4, leetcode: "Medium", tip: "Adobe loves hash maps and string manipulation problems." },
] as const;

/* ─── Interview Round Types ────────────────────────────────────────────────── */
const ROUNDS = [
  {
    type:     "Coding Round",
    emoji:    "💻",
    color:    "from-blue-500 to-cyan-500",
    desc:     "2–4 LeetCode-style questions in 60–90 min on a shared editor",
    tips:     ["Think aloud before coding", "Start with brute force + optimize", "Test with edge cases", "Ask clarifying questions"],
  },
  {
    type:     "System Design",
    emoji:    "🏗️",
    color:    "from-purple-500 to-violet-500",
    desc:     "Design scalable systems: URL shortener, chat app, video streaming, etc.",
    tips:     ["Clarify scale requirements", "Start with high-level design", "Deep-dive on one component", "Discuss trade-offs"],
  },
  {
    type:     "Behavioural / HR",
    emoji:    "🤝",
    color:    "from-green-500 to-teal-500",
    desc:     "STAR format questions about past experience, leadership, failure, conflict",
    tips:     ["Prepare 5–8 STAR stories", "Be honest about failures", "Show growth mindset", "Research company values"],
  },
  {
    type:     "Technical Discussion",
    emoji:    "📋",
    color:    "from-orange-500 to-amber-500",
    desc:     "Resume deep-dive, project walkthrough, tech stack discussion",
    tips:     ["Know your resume inside-out", "Quantify your project impact", "Discuss challenges overcome", "Prepare to whiteboard architecture"],
  },
] as const;

type TabId = "patterns" | "companies" | "rounds" | "timeline";

export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState<TabId>("patterns");

  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-orange-950/5 to-background py-14 md:py-18">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-foreground">Core CS</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Interview Prep</span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">Core CS Track</Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-400/40">FAANG · MAANG · Product Companies</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            💼 Interview Preparation — Complete Guide
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
            Master the top 20 DSA patterns, system design, behavioural rounds, and
            company-specific strategies. Used by 12,000+ students who got placed at
            Google, Microsoft, Amazon, Flipkart, and 200+ other companies.
          </p>

          {/* Impact stats */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm">
            {[
              { label: "Students Placed",    value: "12,400+", icon: Users,     color: "text-green-500"  },
              { label: "DSA Patterns",       value: "20",      icon: Code2,     color: "text-blue-500"   },
              { label: "Mock Interviews",    value: "8,000+",  icon: MessageSquare, color: "text-purple-500" },
              { label: "Avg Salary Hike",    value: "3.2×",    icon: Trophy,    color: "text-yellow-500" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="font-bold text-foreground">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/practice/quiz"><Zap className="h-4 w-4" /> Start Practice</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/live-battles"><MessageSquare className="h-4 w-4" /> Mock Interview Battle</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ────────────────────────────────────────── */}
      <section className="border-b bg-muted/30 sticky top-0 z-10">
        <div className="container px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {([
              { id: "patterns",   label: "DSA Patterns",      emoji: "💡" },
              { id: "companies",  label: "Company Guides",     emoji: "🏢" },
              { id: "rounds",     label: "Interview Rounds",   emoji: "🎯" },
              { id: "timeline",   label: "30-Day Plan",        emoji: "📅" },
            ] as { id: TabId; label: string; emoji: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-500 text-white"
                    : "hover:bg-muted"
                }`}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-10">

        {/* ── DSA Patterns Tab ──────────────────────────────────────── */}
        {activeTab === "patterns" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top 20 DSA Patterns for Interviews</h2>
              <Badge variant="secondary">Covers 90% of questions</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOP_PATTERNS.map((pattern, i) => (
                <motion.div
                  key={pattern.name}
                  initial={{ opacity: 0.01, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border bg-card p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pattern.emoji}</span>
                      <div>
                        <h3 className="font-bold text-sm">{pattern.name}</h3>
                        <Badge
                          variant="outline"
                          className={`text-xs mt-0.5 ${
                            pattern.difficulty === "Easy"   ? "text-green-600 border-green-400/40" :
                            pattern.difficulty === "Medium" ? "text-yellow-600 border-yellow-400/40" :
                            "text-red-600 border-red-400/40"
                          }`}
                        >
                          {pattern.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Asked in</p>
                      <p className="font-bold text-brand-500">{pattern.freq}%</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <Progress value={pattern.freq} className="h-1.5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong className="text-foreground">Examples:</strong> {pattern.examples}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Company Guides Tab ────────────────────────────────────── */}
        {activeTab === "companies" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Company-Specific Preparation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {COMPANIES.map((company, i) => (
                <motion.div key={company.name} initial={{ opacity: 0.01, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="rounded-2xl border bg-card p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{company.logo}</span>
                    <div>
                      <h3 className="font-bold text-lg">{company.name}</h3>
                      <p className="text-xs text-muted-foreground">{company.level} · {company.rounds} rounds</p>
                    </div>
                    <Badge variant="outline" className="ml-auto text-xs">{company.leetcode}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong className="text-foreground">Focus:</strong> {company.focus}
                  </p>
                  <div className="rounded-xl bg-muted/50 border border-dashed p-3 flex items-start gap-2">
                    <Brain className="h-3.5 w-3.5 text-brand-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground italic">{company.tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Interview Rounds Tab ──────────────────────────────────── */}
        {activeTab === "rounds" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Interview Round Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ROUNDS.map((round, i) => (
                <motion.div key={round.type} initial={{ opacity: 0.01, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${round.color}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{round.emoji}</span>
                      <h3 className="font-bold">{round.type}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{round.desc}</p>
                    <ul className="space-y-2">
                      {round.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── 30-Day Plan Tab ───────────────────────────────────────── */}
        {activeTab === "timeline" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">30-Day Intensive Interview Plan</h2>
            <p className="text-muted-foreground mb-8">4 weeks. Structured daily schedule. Used by students who cracked FAANG.</p>
            <div className="space-y-6">
              {[
                { week: "Week 1 (Days 1–7)",   theme: "DSA Foundations Revival",       color: "from-blue-500 to-cyan-500",   tasks: ["Revise Arrays, Strings, Hashing (3 days)", "Two Pointers + Sliding Window (2 days)", "Sorting + Binary Search (2 days)", "Solve 20 LeetCode Easy problems"] },
                { week: "Week 2 (Days 8–15)",  theme: "Trees, Graphs & Recursion",    color: "from-green-500 to-teal-500",  tasks: ["Binary Trees + BST (3 days)", "Graphs: BFS, DFS, Topological Sort (3 days)", "Recursion + Backtracking (2 days)", "Solve 15 LeetCode Medium problems"] },
                { week: "Week 3 (Days 16–22)", theme: "DP, Heaps & Advanced DSA",    color: "from-purple-500 to-violet-500",tasks: ["Dynamic Programming patterns (4 days)", "Heap, Priority Queue, Tries (2 days)", "Advanced Graph: Dijkstra, Bellman-Ford (1 day)", "Solve 10 LeetCode Medium + 5 Hard"] },
                { week: "Week 4 (Days 23–30)", theme: "System Design + Mock Rounds",  color: "from-orange-500 to-red-500",  tasks: ["System Design fundamentals: CAP, consistent hashing (2 days)", "Design URL shortener, Chat app, Ride-sharing (2 days)", "4 mock interviews (1 per day)", "Behavioural STAR story practice"] },
              ].map((week, i) => (
                <motion.div key={week.week} initial={{ opacity: 0.01, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="rounded-2xl border bg-card overflow-hidden">
                    <div className={`px-6 py-4 bg-gradient-to-r ${week.color} text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{week.week}</h3>
                          <p className="text-white/80 text-sm">{week.theme}</p>
                        </div>
                        <div className="text-4xl font-black opacity-20">{i + 1}</div>
                      </div>
                    </div>
                    <div className="p-5">
                      <ul className="space-y-2">
                        {week.tasks.map((task) => (
                          <li key={task} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
