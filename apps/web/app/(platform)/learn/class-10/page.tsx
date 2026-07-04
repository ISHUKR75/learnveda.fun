/**
 * @file app/(platform)/learn/class-10/page.tsx
 * @description Class 10 subjects listing page — CBSE Board exam preparation
 * Route: /learn/class-10
 * Focuses on board exam readiness with subject-wise chapters and mock test links
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, FlaskConical, Globe, Languages, Calculator,
  ArrowRight, Clock, ChevronRight, Target,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";

/* ─── Page-level SEO Metadata ─────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Class 10 — CBSE Board Preparation | LearnVeda",
  description:
    "Master CBSE Class 10 with LearnVeda. Board exam preparation for Mathematics, " +
    "Science, Social Science, English, and Hindi with 2,000+ practice questions, " +
    "mock tests, and chapter-wise notes.",
  keywords: ["Class 10 CBSE", "NCERT Class 10", "Class 10 Board Exam", "Class 10 Maths", "Class 10 Science"],
};

/* ─── Class 10 Subjects ──────────────────────────────────────────────────── */
// CBSE Class 10 subjects aligned to Board exam pattern
const CLASS_10_SUBJECTS = [
  {
    id:       "mathematics",
    slug:     "mathematics",
    name:     "Mathematics (Standard)",
    icon:     Calculator,
    chapters: 15,
    color:    "from-blue-500 to-cyan-500",
    bg:       "bg-blue-500/10",
    border:   "border-blue-500/20",
    textColor:"text-blue-600 dark:text-blue-400",
    topics:   ["Real Numbers", "Polynomials", "Triangles", "Trigonometry", "Probability"],
    duration: "50 days",
    hasSimulation: false,
    boardWeight: "High",
    description: "Complete Maths Standard preparation with theorems, proofs, and extensive practice sets.",
  },
  {
    id:       "mathematics-basic",
    slug:     "mathematics-basic",
    name:     "Mathematics (Basic)",
    icon:     Calculator,
    chapters: 15,
    color:    "from-sky-500 to-blue-400",
    bg:       "bg-sky-500/10",
    border:   "border-sky-500/20",
    textColor:"text-sky-600 dark:text-sky-400",
    topics:   ["Real Numbers", "Polynomials", "Quadratics", "Statistics", "Probability"],
    duration: "40 days",
    hasSimulation: false,
    boardWeight: "High",
    description: "Simplified Mathematics for students opting Basic level — board-exam focused.",
  },
  {
    id:       "science",
    slug:     "science",
    name:     "Science",
    icon:     FlaskConical,
    chapters: 16,
    color:    "from-green-500 to-emerald-500",
    bg:       "bg-green-500/10",
    border:   "border-green-500/20",
    textColor:"text-green-600 dark:text-green-400",
    topics:   ["Chemical Reactions", "Life Processes", "Electricity", "Light — Reflection & Refraction"],
    duration: "55 days",
    hasSimulation: true,
    boardWeight: "High",
    description: "Physics, Chemistry, Biology — 16 chapters with simulations, diagrams, and 2,000+ MCQs.",
  },
  {
    id:       "social-science",
    slug:     "social-science",
    name:     "Social Science",
    icon:     Globe,
    chapters: 20,
    color:    "from-orange-500 to-amber-500",
    bg:       "bg-orange-500/10",
    border:   "border-orange-500/20",
    textColor:"text-orange-600 dark:text-orange-400",
    topics:   ["Resources & Development", "Money & Credit", "Nationalism in India", "Democratic Politics"],
    duration: "40 days",
    hasSimulation: false,
    boardWeight: "High",
    description: "History, Geography, Economics, Civics — map-based questions and board-style answer formats.",
  },
  {
    id:       "english",
    slug:     "english",
    name:     "English",
    icon:     BookOpen,
    chapters: 12,
    color:    "from-purple-500 to-violet-500",
    bg:       "bg-purple-500/10",
    border:   "border-purple-500/20",
    textColor:"text-purple-600 dark:text-purple-400",
    topics:   ["First Flight", "Footprints Without Feet", "Writing Formats", "Grammar"],
    duration: "30 days",
    hasSimulation: false,
    boardWeight: "Medium",
    description: "First Flight + Footprints literature, grammar, formal writing — board question patterns.",
  },
  {
    id:       "hindi",
    slug:     "hindi",
    name:     "Hindi",
    icon:     Languages,
    chapters: 12,
    color:    "from-rose-500 to-pink-500",
    bg:       "bg-rose-500/10",
    border:   "border-rose-500/20",
    textColor:"text-rose-600 dark:text-rose-400",
    topics:   ["Kshitij II", "Kritika", "Sparsh II", "Sanchayan II"],
    duration: "30 days",
    hasSimulation: false,
    boardWeight: "Medium",
    description: "All four Hindi textbooks for Class 10 — chapter summaries, extracts, and grammar exercises.",
  },
];

/* ─── Board Exam Stats ───────────────────────────────────────────────────── */
const STATS = [
  { label: "Subjects",    value: "6"    },
  { label: "Chapters",   value: "90+"  },
  { label: "MCQs",       value: "3K+"  },
  { label: "Mock Tests", value: "15"   },
];

/* ─── Class 10 Page Component ────────────────────────────────────────────── */
export default function Class10Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-green-500/5 via-background to-emerald-500/5">
        <div className="container px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/learn" className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Class 10</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-2xl font-bold text-green-600 dark:text-green-400 shrink-0">
              10
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl sm:text-4xl font-bold">Class 10</h1>
                <Badge variant="secondary" className="text-xs">CBSE Board Prep</Badge>
                <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                  <Target className="h-3 w-3 mr-1" />
                  Board Year
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Board exam preparation — all 6 subjects with structured plans, mock tests,
                PYQs, and chapter-wise notes aligned to CBSE marking scheme.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card/50 p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Subjects Grid ────────────────────────────────────────────────── */}
      <div className="container px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All Subjects</h2>
          <Badge variant="outline" className="text-xs">{CLASS_10_SUBJECTS.length} subjects</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLASS_10_SUBJECTS.map((subject) => {
            const Icon = subject.icon;
            return (
              <Link
                key={subject.id}
                href={`/learn/class-10/${subject.slug}`}
                className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${subject.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-10 w-10 rounded-xl ${subject.bg} border ${subject.border} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${subject.textColor}`} />
                    </div>
                    {subject.hasSimulation && (
                      <Badge className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                        ⚡ Simulations
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {subject.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {subject.topics.slice(0, 3).map((topic) => (
                      <span key={topic} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {subject.chapters} chapters
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {subject.duration}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Board exam tips */}
        <div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <h3 className="font-semibold text-lg mb-2 text-amber-700 dark:text-amber-400">
            🎯 Board Exam Tips
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Class 10 boards are your first major milestone. Focus on these strategies:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              "Complete NCERT thoroughly — 80% of board questions come from NCERT",
              "Practice previous year papers — last 5 years are essential",
              "Focus on diagram-based questions in Science",
              "Solve sample papers under timed conditions",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                <span className="text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other class navigation */}
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="text-sm text-muted-foreground self-center">Also explore:</span>
          {["class-9", "class-11", "class-12"].map((cls) => (
            <Link
              key={cls}
              href={`/learn/${cls}`}
              className="text-sm font-medium px-4 py-1.5 rounded-full border hover:bg-accent transition-colors"
            >
              {cls.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
