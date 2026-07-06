/**
 * @file app/(platform)/learn/class-11/page.tsx
 * @description CBSE Class 11 subjects hub — Science + Commerce + Humanities
 * Route: /learn/class-11
 *
 * The critical transition year from Class 10 to senior secondary.
 * Shows streams (Science/Commerce/Humanities) with subject cards.
 * Strong JEE/NEET foundation-building emphasis.
 *
 * Platform layout (Navbar) is provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Atom, FlaskConical, Calculator, BookOpen, Languages,
  Globe, Code2, ArrowRight, Clock, Star, Brain, Trophy,
  Zap, ChevronRight, BarChart3, Heart,
} from "lucide-react";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── Stream Data ─────────────────────────────────────────────────────────── */
type Stream = "science" | "commerce" | "humanities";

const STREAMS: { id: Stream; label: string; emoji: string; desc: string; color: string }[] = [
  { id: "science",    label: "Science (PCM/PCB)", emoji: "🔬", desc: "For JEE, NEET, Engineering, Medicine",      color: "from-purple-500 to-violet-500" },
  { id: "commerce",   label: "Commerce",          emoji: "📊", desc: "For CA, MBA, Finance, Business careers",    color: "from-emerald-500 to-green-600"  },
  { id: "humanities", label: "Humanities",        emoji: "🌍", desc: "For UPSC, Law, Journalism, Psychology",     color: "from-orange-500 to-amber-500"   },
];

const SUBJECTS: Record<Stream, {
  slug: string; title: string; emoji: string; chapters: number;
  color: string; bg: string; relevance: string; keyTopics: string[];
}[]> = {
  science: [
    { slug: "physics",          title: "Physics",           emoji: "⚡", chapters: 14, color: "from-purple-500 to-violet-600", bg: "bg-purple-500/10 text-purple-500", relevance: "JEE/NEET", keyTopics: ["Kinematics", "Laws of Motion", "Work & Energy", "Gravitation", "Thermodynamics", "Oscillations"] },
    { slug: "chemistry",        title: "Chemistry",         emoji: "🧪", chapters: 14, color: "from-orange-500 to-amber-500",  bg: "bg-orange-500/10 text-orange-500", relevance: "JEE/NEET", keyTopics: ["Atomic Structure", "Chemical Bonding", "Organic Basics", "Equilibrium", "Thermodynamics", "Redox"] },
    { slug: "mathematics",      title: "Mathematics",       emoji: "📐", chapters: 16, color: "from-blue-500 to-cyan-500",     bg: "bg-blue-500/10 text-blue-500",     relevance: "JEE",      keyTopics: ["Sets & Functions", "Trigonometry", "Coordinate Geometry", "Sequences", "Straight Lines", "Limits"] },
    { slug: "biology",          title: "Biology",           emoji: "🌱", chapters: 22, color: "from-green-500 to-teal-500",    bg: "bg-green-500/10 text-green-500",   relevance: "NEET",     keyTopics: ["Cell Biology", "Biomolecules", "Plant Physiology", "Animal Kingdom", "Digestion", "Breathing"] },
    { slug: "computer-science", title: "Computer Science",  emoji: "💻", chapters: 12, color: "from-slate-500 to-gray-600",    bg: "bg-slate-500/10 text-slate-500",   relevance: "Programming", keyTopics: ["Python Basics", "OOP", "SQL Intro", "Networks Intro", "Society & Technology", "Web Dev"] },
  ],
  commerce: [
    { slug: "accountancy",   title: "Accountancy",         emoji: "📒", chapters: 15, color: "from-emerald-500 to-green-600", bg: "bg-emerald-500/10 text-emerald-500", relevance: "CA",    keyTopics: ["Journal Entries", "Ledger", "Trial Balance", "Financial Statements", "Depreciation"] },
    { slug: "economics",     title: "Economics",           emoji: "📈", chapters: 14, color: "from-blue-500 to-indigo-600",   bg: "bg-blue-500/10 text-blue-500",       relevance: "CUET",  keyTopics: ["Microeconomics", "Demand & Supply", "Production", "Market Structures", "Indian Economy"] },
    { slug: "business",      title: "Business Studies",   emoji: "🏢", chapters: 11, color: "from-orange-500 to-red-500",    bg: "bg-orange-500/10 text-orange-500",   relevance: "MBA",   keyTopics: ["Nature of Business", "Forms of Business", "Private & Public Sectors", "Social Responsibility"] },
    { slug: "mathematics",   title: "Maths (Commerce)",   emoji: "📐", chapters: 14, color: "from-cyan-500 to-teal-500",     bg: "bg-cyan-500/10 text-cyan-500",       relevance: "Optional", keyTopics: ["Statistics", "Probability", "Linear Programming", "Matrices", "Calculus Intro"] },
  ],
  humanities: [
    { slug: "history",       title: "History",              emoji: "📜", chapters: 11, color: "from-amber-500 to-orange-500", bg: "bg-amber-500/10 text-amber-500",  relevance: "UPSC",  keyTopics: ["Writing & City Life", "Empire & Kingdom", "Changing Traditions", "Modern Period"] },
    { slug: "pol-sci",       title: "Political Science",    emoji: "⚖️", chapters: 18, color: "from-blue-500 to-indigo-500", bg: "bg-blue-500/10 text-blue-500",    relevance: "UPSC",  keyTopics: ["Political Theory", "Rights", "Citizenship", "Nationalism", "Constitution Basics"] },
    { slug: "geography",     title: "Geography",            emoji: "🗺️", chapters: 12, color: "from-green-500 to-teal-500",  bg: "bg-green-500/10 text-green-500",  relevance: "CUET",  keyTopics: ["Human Geography", "Physical Geography", "India Resources", "Population", "Migration"] },
    { slug: "psychology",    title: "Psychology",           emoji: "🧠", chapters: 10, color: "from-pink-500 to-rose-500",   bg: "bg-pink-500/10 text-pink-500",    relevance: "CUET",  keyTopics: ["What is Psychology", "Sensory Processes", "Learning", "Memory", "Motivation & Emotion"] },
    { slug: "sociology",     title: "Sociology",            emoji: "👥", chapters: 8,  color: "from-violet-500 to-purple-500", bg: "bg-violet-500/10 text-violet-500", relevance: "CUET", keyTopics: ["Understanding Society", "Social Institutions", "Environment & Society", "Caste in India"] },
  ],
};

/** Class 11 success tips */
const CLASS_11_TIPS = [
  { emoji: "⚠️", tip: "Class 11 is the hardest academic transition — concepts jump sharply from Class 10. Start strong from Day 1." },
  { emoji: "🏗️", tip: "Build a rock-solid foundation now — Class 11 topics form 40–50% of JEE/NEET questions." },
  { emoji: "🔁", tip: "Don't skip Class 11 in Class 12 — entrance papers test both years equally." },
  { emoji: "📖", tip: "Read every NCERT line for Chemistry and Biology — directly asked in boards and NEET." },
];

export default function Class11Page() {
  const [activeStream, setActiveStream] = useState<Stream>("science");
  const subjects = SUBJECTS[activeStream];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-purple-950/5 to-background py-14">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-foreground">CBSE Classes</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Class 11</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">CBSE Class 11</Badge>
            <Badge variant="outline" className="text-purple-600 border-purple-400/40">JEE · NEET · CUET Foundation</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            🔬 CBSE Class 11 — Complete Study Hub
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            Science, Commerce, and Humanities — NCERT-aligned material for all streams.
            Build the foundation for JEE, NEET, CUET, and board exams.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 3 Streams · 18+ Subjects</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> NCERT Aligned</span>
            <span className="flex items-center gap-1.5"><Trophy className="h-4 w-4 text-yellow-500" /> JEE/NEET foundation</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/learn/class-11/physics"><Zap className="h-4 w-4" /> Start Physics</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/practice/quiz">Practice Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stream selector */}
      <section className="border-b bg-muted/30 py-4 sticky top-0 z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap gap-3">
            {STREAMS.map((stream) => (
              <button key={stream.id} onClick={() => setActiveStream(stream.id)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  activeStream === stream.id ? "bg-brand-500 text-white border-brand-500" : "bg-background hover:bg-muted"
                }`}>
                <span>{stream.emoji}</span> {stream.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 ml-1">
            {STREAMS.find((s) => s.id === activeStream)?.desc}
          </p>
        </div>
      </section>

      {/* Subject cards */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((subject, i) => (
              <motion.div key={subject.slug} initial={{ opacity: 0.01, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={`/learn/class-11/${subject.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`h-1.5 w-full bg-gradient-to-r ${subject.color}`} />
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{subject.emoji}</span>
                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-400/40">{subject.relevance}</Badge>
                      </div>
                      <div>
                        <h3 className="font-bold group-hover:text-brand-500 transition-colors">{subject.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{subject.chapters} Chapters</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {subject.keyTopics.slice(0, 3).map((t) => (
                          <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
                        ))}
                        {subject.keyTopics.length > 3 && (
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">+{subject.keyTopics.length - 3}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all mt-auto">
                        Start Chapter 1 <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Class 11 tips */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Brain className="h-5 w-5 text-brand-500" /> Class 11 Success Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {CLASS_11_TIPS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <span className="text-xl shrink-0">{item.emoji}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
