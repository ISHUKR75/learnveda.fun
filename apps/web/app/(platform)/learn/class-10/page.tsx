/**
 * @file app/(platform)/learn/class-10/page.tsx
 * @description CBSE Class 10 subjects listing page
 * Route: /learn/class-10
 *
 * Shows all Class 10 subjects with:
 *  - Subject icon and color
 *  - Chapter count
 *  - Progress indicator (if user is logged in)
 *  - Link to subject page
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, FlaskConical, Leaf, Globe, Languages, Calculator, Code2, Music, Palette, Book } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "CBSE Class 10 — LearnVeda",
  description: "Complete CBSE Class 10 study material: Mathematics, Science (Physics, Chemistry, Biology), English, Hindi, Social Science, and more. NCERT aligned.",
};

/* ─── Class 10 Subjects ──────────────────────────────────────────────────── */
const SUBJECTS = [
  {
    slug:     "mathematics",
    title:    "Mathematics",
    icon:     Calculator,
    chapters: 15,
    color:    "bg-blue-500/10 text-blue-500",
    border:   "hover:border-blue-500/50",
    desc:     "Real Numbers, Polynomials, Quadratic Equations, Trigonometry, Statistics",
  },
  {
    slug:     "science",
    title:    "Science",
    icon:     FlaskConical,
    chapters: 16,
    color:    "bg-green-500/10 text-green-500",
    border:   "hover:border-green-500/50",
    desc:     "Chemical Reactions, Electricity, Light, Life Processes, Heredity",
  },
  {
    slug:     "physics",
    title:    "Physics",
    icon:     FlaskConical,
    chapters: 5,
    color:    "bg-cyan-500/10 text-cyan-500",
    border:   "hover:border-cyan-500/50",
    desc:     "Light, Electricity, Magnetic Effects, Energy Sources",
  },
  {
    slug:     "chemistry",
    title:    "Chemistry",
    icon:     FlaskConical,
    chapters: 5,
    color:    "bg-purple-500/10 text-purple-500",
    border:   "hover:border-purple-500/50",
    desc:     "Chemical Reactions, Acids Bases Salts, Metals, Carbon Compounds",
  },
  {
    slug:     "biology",
    title:    "Biology",
    icon:     Leaf,
    chapters: 6,
    color:    "bg-emerald-500/10 text-emerald-500",
    border:   "hover:border-emerald-500/50",
    desc:     "Life Processes, Control and Coordination, Reproduction, Ecosystems",
  },
  {
    slug:     "english",
    title:    "English (First Flight)",
    icon:     BookOpen,
    chapters: 11,
    color:    "bg-orange-500/10 text-orange-500",
    border:   "hover:border-orange-500/50",
    desc:     "Prose and poetry chapters from the NCERT First Flight textbook",
  },
  {
    slug:     "hindi",
    title:    "Hindi (Kshitij/Kritika)",
    icon:     Languages,
    chapters: 17,
    color:    "bg-red-500/10 text-red-500",
    border:   "hover:border-red-500/50",
    desc:     "Kshitij and Kritika prose, poetry, and grammar for Class 10",
  },
  {
    slug:     "social-science",
    title:    "Social Science",
    icon:     Globe,
    chapters: 20,
    color:    "bg-amber-500/10 text-amber-500",
    border:   "hover:border-amber-500/50",
    desc:     "History, Geography, Political Science (Civics), Economics",
  },
  {
    slug:     "computer-science",
    title:    "Computer Science",
    icon:     Code2,
    chapters: 8,
    color:    "bg-brand-500/10 text-brand-500",
    border:   "hover:border-brand-500/50",
    desc:     "HTML, CSS, JavaScript basics, Database fundamentals, Networking",
  },
  {
    slug:     "sanskrit",
    title:    "Sanskrit",
    icon:     Book,
    chapters: 9,
    color:    "bg-yellow-500/10 text-yellow-500",
    border:   "hover:border-yellow-500/50",
    desc:     "Shemushi Sanskrit textbook chapters and grammar for Class 10",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Class10Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/learn" className="hover:text-foreground">Learn</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Class 10 (CBSE)</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-brand-500 text-white">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Class 10 — CBSE</h1>
              <p className="text-muted-foreground text-sm">NCERT-aligned · {SUBJECTS.reduce((a, s) => a + s.chapters, 0)} chapters · Board exam focused</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Complete study material for CBSE Class 10 board exams. All subjects covered with
            chapter notes, video explanations, practice questions, and interactive simulations.
            Aligned with the latest NCERT syllabus.
          </p>
        </div>

        {/* Subjects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.slug}
              href={`/learn/class-10/${subject.slug}`}
              className={`group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all ${subject.border}`}
            >
              <div className="flex items-start gap-4">
                {/* Subject icon */}
                <div className={`p-3 rounded-xl ${subject.color} flex-shrink-0`}>
                  <subject.icon className="h-6 w-6" />
                </div>
                {/* Subject info */}
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
                  <Badge variant="secondary" className="text-xs">
                    {subject.chapters} chapters
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Board exam tip */}
        <div className="mt-10 p-5 rounded-2xl border bg-brand-500/5 border-brand-500/20">
          <p className="text-sm text-foreground font-semibold mb-1">🎯 Board Exam Preparation</p>
          <p className="text-sm text-muted-foreground">
            Class 10 board exams are critical. Use our <Link href="/test-center" className="text-brand-500 hover:underline">Test Center</Link> for
            full-length mock tests, <Link href="/simulations" className="text-brand-500 hover:underline">simulations</Link> for Science concepts,
            and <Link href="/ai-tutor" className="text-brand-500 hover:underline">AI Tutor</Link> for instant doubt solving.
          </p>
        </div>
      </div>
    </div>
  );
}
