/**
 * @file app/(platform)/learn/class-12/page.tsx
 * @description CBSE Class 12 subjects listing page
 * Route: /learn/class-12
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, FlaskConical, Atom, Leaf, Globe, Languages, Calculator, Code2, BarChart3, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "CBSE Class 12 — LearnVeda",
  description: "Complete CBSE Class 12 study material: Physics, Chemistry, Mathematics, Biology, Computer Science, Economics, and more. Board exam focused, NCERT aligned.",
};

const SUBJECTS = [
  {
    slug:     "physics",
    title:    "Physics",
    icon:     Atom,
    chapters: 15,
    color:    "bg-blue-500/10 text-blue-500",
    border:   "hover:border-blue-500/50",
    desc:     "Electrostatics, Current Electricity, Magnetism, Optics, Atoms, Nuclei, Semiconductors",
    isBoard:  true,
  },
  {
    slug:     "chemistry",
    title:    "Chemistry",
    icon:     FlaskConical,
    chapters: 16,
    color:    "bg-green-500/10 text-green-500",
    border:   "hover:border-green-500/50",
    desc:     "Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry, Coordination Compounds",
    isBoard:  true,
  },
  {
    slug:     "mathematics",
    title:    "Mathematics",
    icon:     Calculator,
    chapters: 13,
    color:    "bg-purple-500/10 text-purple-500",
    border:   "hover:border-purple-500/50",
    desc:     "Relations & Functions, Inverse Trigonometry, Matrices, Calculus, Linear Programming, Probability",
    isBoard:  true,
  },
  {
    slug:     "biology",
    title:    "Biology",
    icon:     Leaf,
    chapters: 16,
    color:    "bg-emerald-500/10 text-emerald-500",
    border:   "hover:border-emerald-500/50",
    desc:     "Reproduction, Genetics, Evolution, Human Health, Biotechnology, Ecology",
    isBoard:  true,
  },
  {
    slug:     "computer-science",
    title:    "Computer Science",
    icon:     Code2,
    chapters: 10,
    color:    "bg-brand-500/10 text-brand-500",
    border:   "hover:border-brand-500/50",
    desc:     "Python OOP, Data Structures, Database (MySQL), Networking, Web Technologies",
    isBoard:  true,
  },
  {
    slug:     "english",
    title:    "English (Flamingo/Vistas)",
    icon:     BookOpen,
    chapters: 14,
    color:    "bg-orange-500/10 text-orange-500",
    border:   "hover:border-orange-500/50",
    desc:     "Flamingo prose and poetry, Vistas supplementary chapters",
    isBoard:  true,
  },
  {
    slug:     "economics",
    title:    "Economics",
    icon:     BarChart3,
    chapters: 12,
    color:    "bg-yellow-500/10 text-yellow-500",
    border:   "hover:border-yellow-500/50",
    desc:     "Macroeconomics (National Income, Money, Banking, Government Budget, Balance of Payments)",
    isBoard:  false,
  },
  {
    slug:     "artificial-intelligence",
    title:    "AI & Machine Learning",
    icon:     Brain,
    chapters: 10,
    color:    "bg-rose-500/10 text-rose-500",
    border:   "hover:border-rose-500/50",
    desc:     "Machine Learning models, Neural Networks, Natural Language Processing, AI Applications",
    isBoard:  false,
  },
  {
    slug:     "hindi",
    title:    "Hindi (Aroh/Vitan)",
    icon:     Languages,
    chapters: 18,
    color:    "bg-red-500/10 text-red-500",
    border:   "hover:border-red-500/50",
    desc:     "Aroh prose and poetry for Class 12, Vitan supplementary chapters",
    isBoard:  true,
  },
  {
    slug:     "geography",
    title:    "Geography",
    icon:     Globe,
    chapters: 14,
    color:    "bg-teal-500/10 text-teal-500",
    border:   "hover:border-teal-500/50",
    desc:     "Human Geography, India: People and Economy, Map Work",
    isBoard:  false,
  },
];

export default function Class12Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/learn" className="hover:text-foreground">Learn</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Class 12 (CBSE)</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-brand-500 text-white">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Class 12 — CBSE</h1>
              <p className="text-muted-foreground text-sm">NCERT-aligned · {SUBJECTS.reduce((a, s) => a + s.chapters, 0)} chapters · Board + JEE/NEET</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Class 12 is the most important year of school. Master every chapter with structured plans,
            previous year questions, full-length mock tests, and AI-powered doubt clearing.
            Board exam + JEE/NEET content in one place.
          </p>
        </div>

        {/* Subjects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.slug}
              href={`/learn/class-12/${subject.slug}`}
              className={`group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all ${subject.border}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${subject.color} flex-shrink-0`}>
                  <subject.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-foreground group-hover:text-brand-500 transition-colors text-sm">
                        {subject.title}
                      </h2>
                      {subject.isBoard && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-medium">Board</span>
                      )}
                    </div>
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

        {/* Board exam banner */}
        <div className="mt-10 p-5 rounded-2xl border bg-red-500/5 border-red-500/20">
          <p className="text-sm text-foreground font-semibold mb-1">📋 Board Exam 2025 Preparation</p>
          <p className="text-sm text-muted-foreground">
            Boards are approaching. Use our <Link href="/test-center" className="text-brand-500 hover:underline">full-length mock tests</Link>,
            chapter-wise <Link href="/practice" className="text-brand-500 hover:underline">MCQ practice</Link>,
            and <Link href="/ai-tutor" className="text-brand-500 hover:underline">AI Tutor</Link> for last-minute doubt clearing.
            All questions follow the latest CBSE pattern.
          </p>
        </div>
      </div>
    </div>
  );
}
