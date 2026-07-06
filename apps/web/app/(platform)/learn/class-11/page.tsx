/**
 * @file app/(platform)/learn/class-11/page.tsx
 * @description CBSE Class 11 subjects listing page
 * Route: /learn/class-11
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, FlaskConical, Atom, Leaf, Globe, Languages, Calculator, Code2, BarChart3, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "CBSE Class 11 — LearnVeda",
  description: "Complete CBSE Class 11 study material: Physics, Chemistry, Mathematics, Biology, Computer Science, Accountancy, Economics, and more. NCERT aligned.",
};

const SUBJECTS = [
  {
    slug:     "physics",
    title:    "Physics",
    icon:     Atom,
    chapters: 15,
    color:    "bg-blue-500/10 text-blue-500",
    border:   "hover:border-blue-500/50",
    desc:     "Units, Kinematics, Laws of Motion, Work-Energy, Gravitation, Thermodynamics, Waves",
  },
  {
    slug:     "chemistry",
    title:    "Chemistry",
    icon:     FlaskConical,
    chapters: 14,
    color:    "bg-green-500/10 text-green-500",
    border:   "hover:border-green-500/50",
    desc:     "Atomic Structure, Periodic Table, Chemical Bonding, Equilibrium, Hydrocarbons",
  },
  {
    slug:     "mathematics",
    title:    "Mathematics",
    icon:     Calculator,
    chapters: 16,
    color:    "bg-purple-500/10 text-purple-500",
    border:   "hover:border-purple-500/50",
    desc:     "Sets, Relations, Trigonometry, Complex Numbers, Sequences, Limits, Statistics",
  },
  {
    slug:     "biology",
    title:    "Biology",
    icon:     Leaf,
    chapters: 22,
    color:    "bg-emerald-500/10 text-emerald-500",
    border:   "hover:border-emerald-500/50",
    desc:     "Diversity of Life, Structural Organization, Cell Biology, Plant Physiology, Human Physiology",
  },
  {
    slug:     "computer-science",
    title:    "Computer Science",
    icon:     Code2,
    chapters: 9,
    color:    "bg-brand-500/10 text-brand-500",
    border:   "hover:border-brand-500/50",
    desc:     "Python programming, Functions, File Handling, Databases, Networking basics",
  },
  {
    slug:     "english",
    title:    "English (Hornbill/Snapshots)",
    icon:     BookOpen,
    chapters: 12,
    color:    "bg-orange-500/10 text-orange-500",
    border:   "hover:border-orange-500/50",
    desc:     "Hornbill prose and poetry, Snapshots supplementary reader chapters",
  },
  {
    slug:     "economics",
    title:    "Economics",
    icon:     BarChart3,
    chapters: 10,
    color:    "bg-yellow-500/10 text-yellow-500",
    border:   "hover:border-yellow-500/50",
    desc:     "Introduction to Statistics, Data Collection, Measures of Central Tendency",
  },
  {
    slug:     "artificial-intelligence",
    title:    "Artificial Intelligence",
    icon:     Brain,
    chapters: 8,
    color:    "bg-rose-500/10 text-rose-500",
    border:   "hover:border-rose-500/50",
    desc:     "Introduction to AI, Machine Learning concepts, Ethics, Data Science basics",
  },
  {
    slug:     "hindi",
    title:    "Hindi (Aroh/Vitan)",
    icon:     Languages,
    chapters: 18,
    color:    "bg-red-500/10 text-red-500",
    border:   "hover:border-red-500/50",
    desc:     "Aroh prose and poetry, Vitan supplementary reader for Class 11",
  },
  {
    slug:     "geography",
    title:    "Geography",
    icon:     Globe,
    chapters: 16,
    color:    "bg-teal-500/10 text-teal-500",
    border:   "hover:border-teal-500/50",
    desc:     "Physical Geography (Geomorphology, Climatology) and Indian Geography",
  },
];

export default function Class11Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/learn" className="hover:text-foreground">Learn</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Class 11 (CBSE)</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-brand-500 text-white">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Class 11 — CBSE</h1>
              <p className="text-muted-foreground text-sm">NCERT-aligned · {SUBJECTS.reduce((a, s) => a + s.chapters, 0)} chapters · JEE/NEET foundation</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Class 11 is where concepts deepen significantly. This year forms the foundation for
            Class 12 boards, JEE, and NEET. Use our structured chapter plans, AI tutor, and
            simulations to build a rock-solid foundation.
          </p>
        </div>

        {/* Subjects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.slug}
              href={`/learn/class-11/${subject.slug}`}
              className={`group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all ${subject.border}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${subject.color} flex-shrink-0`}>
                  <subject.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h2 className="font-semibold text-foreground group-hover:text-brand-500 transition-colors text-sm">
                      {subject.title}
                    </h2>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 flex-shrink-0 transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                    {subject.desc}
                  </p>
                  <Badge variant="secondary" className="text-xs">{subject.chapters} chapters</Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* JEE/NEET tip */}
        <div className="mt-10 p-5 rounded-2xl border bg-blue-500/5 border-blue-500/20">
          <p className="text-sm text-foreground font-semibold mb-1">🚀 JEE / NEET Preparation</p>
          <p className="text-sm text-muted-foreground">
            Class 11 is critical for JEE and NEET. Our Physics, Chemistry, and Mathematics chapters
            include JEE-level problems. Use the <Link href="/practice" className="text-brand-500 hover:underline">Practice</Link> section
            and <Link href="/simulations" className="text-brand-500 hover:underline">simulations</Link> for conceptual clarity.
          </p>
        </div>
      </div>
    </div>
  );
}
