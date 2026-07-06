/**
 * @file app/(platform)/practice/assignments/page.tsx
 * @description Practice Assignments — structured problem sets by chapter
 * Route: /practice/assignments
 *
 * Provides structured assignments mapped to CBSE chapters and engineering subjects.
 * Students complete assignments to earn XP and track mastery per chapter.
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, CheckCircle2, Clock, Target, Zap, Star,
  ChevronRight, Lock, Calendar, Trophy, Brain,
} from "lucide-react";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── Assignment Sets ─────────────────────────────────────────────────────── */
const ASSIGNMENT_SETS = [
  {
    subject:     "Mathematics (Class 12)",
    emoji:       "📐",
    color:       "from-blue-500 to-cyan-500",
    totalChapters: 13,
    completedChapters: 4,
    chapters: [
      { name: "Relations and Functions",       questions: 25, due: "Jul 10", completed: true,  score: "23/25" },
      { name: "Inverse Trigonometric Functions", questions: 18, due: "Jul 12", completed: true,  score: "16/18" },
      { name: "Matrices",                      questions: 22, due: "Jul 15", completed: true,  score: "19/22" },
      { name: "Determinants",                  questions: 20, due: "Jul 18", completed: true,  score: "18/20" },
      { name: "Continuity and Differentiability", questions: 30, due: "Jul 22", completed: false, score: null  },
      { name: "Application of Derivatives",   questions: 25, due: "Jul 25", completed: false, score: null  },
    ],
  },
  {
    subject:     "Physics (Class 12)",
    emoji:       "⚡",
    color:       "from-purple-500 to-violet-500",
    totalChapters: 15,
    completedChapters: 2,
    chapters: [
      { name: "Electric Charges and Fields",   questions: 24, due: "Jul 10", completed: true,  score: "21/24" },
      { name: "Electrostatic Potential",       questions: 20, due: "Jul 13", completed: true,  score: "17/20" },
      { name: "Current Electricity",           questions: 28, due: "Jul 17", completed: false, score: null  },
      { name: "Moving Charges and Magnetism",  questions: 22, due: "Jul 21", completed: false, score: null  },
    ],
  },
  {
    subject:     "DSA",
    emoji:       "🌳",
    color:       "from-green-500 to-teal-500",
    totalChapters: 12,
    completedChapters: 6,
    chapters: [
      { name: "Arrays and Strings",            questions: 30, due: "Completed", completed: true,  score: "28/30" },
      { name: "Linked Lists",                  questions: 25, due: "Completed", completed: true,  score: "23/25" },
      { name: "Stacks and Queues",             questions: 20, due: "Completed", completed: true,  score: "19/20" },
      { name: "Trees — Binary Trees + BST",    questions: 35, due: "Completed", completed: true,  score: "31/35" },
      { name: "Heaps and Priority Queues",     questions: 20, due: "Completed", completed: true,  score: "18/20" },
      { name: "Graphs — BFS + DFS",            questions: 30, due: "Completed", completed: true,  score: "26/30" },
      { name: "Dynamic Programming",           questions: 40, due: "Jul 20",    completed: false, score: null  },
      { name: "Greedy Algorithms",             questions: 25, due: "Jul 25",    completed: false, score: null  },
    ],
  },
  {
    subject:     "Computer Networks",
    emoji:       "🌐",
    color:       "from-orange-500 to-amber-500",
    totalChapters: 8,
    completedChapters: 3,
    chapters: [
      { name: "OSI and TCP/IP Models",         questions: 20, due: "Completed", completed: true,  score: "18/20" },
      { name: "Physical Layer",                questions: 15, due: "Completed", completed: true,  score: "13/15" },
      { name: "Data Link Layer",               questions: 18, due: "Completed", completed: true,  score: "15/18" },
      { name: "Network Layer — IP + Routing",  questions: 25, due: "Jul 15",    completed: false, score: null  },
      { name: "Transport Layer — TCP + UDP",   questions: 20, due: "Jul 20",    completed: false, score: null  },
    ],
  },
];

type TabId = "all" | "pending" | "completed";

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [expanded, setExpanded]  = useState<string | null>("Mathematics (Class 12)");

  const totalCompleted = ASSIGNMENT_SETS.reduce((acc, s) => acc + s.completedChapters, 0);
  const totalChapters  = ASSIGNMENT_SETS.reduce((acc, s) => acc + s.totalChapters, 0);
  const pendingCount   = ASSIGNMENT_SETS.reduce((acc, s) => acc + (s.totalChapters - s.completedChapters), 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-amber-950/5 to-background py-14">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/practice" className="hover:text-foreground">Practice</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Assignments</span>
          </nav>
          <Badge variant="secondary" className="mb-3">Chapter-wise Problem Sets</Badge>
          <h1 className="text-3xl font-extrabold mb-4">📚 Practice Assignments</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            Structured chapter-wise problem sets aligned to CBSE, JEE, and engineering syllabi.
            Complete assignments to track mastery and earn XP.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            {[
              { label: "Subjects",   value: ASSIGNMENT_SETS.length.toString(), icon: BookOpen, color: "text-blue-500"   },
              { label: "Completed",  value: totalCompleted.toString(),          icon: CheckCircle2, color: "text-green-500" },
              { label: "Pending",    value: pendingCount.toString(),            icon: Clock, color: "text-orange-500" },
              { label: "Total XP",   value: "2,840",                           icon: Zap, color: "text-brand-500"    },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="font-bold text-foreground">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overall progress */}
      <section className="border-b py-5 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Overall Progress</span>
            <span className="font-bold text-foreground">{totalCompleted}/{totalChapters} chapters</span>
          </div>
          <Progress value={(totalCompleted / totalChapters) * 100} className="h-2.5" />
        </div>
      </section>

      {/* Tab filter */}
      <section className="border-b bg-muted/30 py-3 sticky top-0 z-10">
        <div className="container px-4 md:px-6 flex gap-2">
          {([
            { id: "all",       label: "All Subjects" },
            { id: "pending",   label: `Pending (${pendingCount})` },
            { id: "completed", label: `Completed (${totalCompleted})` },
          ] as { id: TabId; label: string }[]).map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id ? "bg-brand-500 text-white" : "hover:bg-muted"}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Assignments list */}
      <section className="py-10">
        <div className="container px-4 md:px-6 space-y-5">
          {ASSIGNMENT_SETS.map((set, si) => {
            const chapters = set.chapters.filter((ch) =>
              activeTab === "all"       ? true :
              activeTab === "pending"   ? !ch.completed :
              ch.completed
            );
            if (chapters.length === 0) return null;

            return (
              <motion.div key={set.subject} initial={{ opacity: 0.01, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.1 }}
                className="rounded-2xl border bg-card overflow-hidden">
                {/* Subject header */}
                <button className="w-full" onClick={() => setExpanded(expanded === set.subject ? null : set.subject)}>
                  <div className={`px-5 py-4 bg-gradient-to-r ${set.color} text-white flex items-center gap-4`}>
                    <span className="text-2xl">{set.emoji}</span>
                    <div className="flex-1 text-left">
                      <div className="font-bold">{set.subject}</div>
                      <div className="text-white/80 text-xs mt-0.5">
                        {set.completedChapters}/{set.totalChapters} chapters complete
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{Math.round((set.completedChapters / set.totalChapters) * 100)}%</div>
                    </div>
                  </div>
                </button>

                {/* Chapter list */}
                {expanded === set.subject && (
                  <div className="divide-y">
                    {chapters.map((chapter, ci) => (
                      <div key={ci} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
                        <div className={`h-8 w-8 shrink-0 flex items-center justify-center rounded-full ${chapter.completed ? "bg-green-500/10" : "bg-orange-500/10"}`}>
                          {chapter.completed
                            ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                            : <Clock className="h-4 w-4 text-orange-500" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{chapter.name}</div>
                          <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                            <span>{chapter.questions} questions</span>
                            <span>Due: {chapter.due}</span>
                            {chapter.score && <span className="text-green-600 font-semibold">Score: {chapter.score}</span>}
                          </div>
                        </div>
                        <Button size="sm" variant={chapter.completed ? "outline" : "gradient"} className="h-8 text-xs shrink-0" asChild>
                          <Link href="/practice/quiz">
                            {chapter.completed ? "Review" : "Start"}
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
