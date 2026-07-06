/**
 * @file app/(platform)/practice/page.tsx
 * @description Practice MCQ page for LearnVeda
 * Route: /practice
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, FlaskConical, Atom, Leaf, Calculator, Code2, Brain,
  Trophy, Clock, Star, ChevronRight, Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "Practice MCQs — LearnVeda",
  description: "Practice chapter-wise MCQs for CBSE Class 9–12, Engineering, Programming, and DSA. Track your performance and identify weak areas.",
};

/* ─── Practice Categories ────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    title:    "CBSE Class 9",
    icon:     BookOpen,
    color:    "bg-blue-500/10 text-blue-500",
    border:   "hover:border-blue-500/50",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Science"],
    href:     "/learn/class-9",
    qCount:   850,
  },
  {
    title:    "CBSE Class 10",
    icon:     BookOpen,
    color:    "bg-cyan-500/10 text-cyan-500",
    border:   "hover:border-cyan-500/50",
    subjects: ["Mathematics", "Science", "English", "Hindi", "Social Science"],
    href:     "/learn/class-10",
    qCount:   1200,
  },
  {
    title:    "CBSE Class 11",
    icon:     BookOpen,
    color:    "bg-green-500/10 text-green-500",
    border:   "hover:border-green-500/50",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
    href:     "/learn/class-11",
    qCount:   1800,
  },
  {
    title:    "CBSE Class 12",
    icon:     BookOpen,
    color:    "bg-purple-500/10 text-purple-500",
    border:   "hover:border-purple-500/50",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
    href:     "/learn/class-12",
    qCount:   2100,
  },
  {
    title:    "Physics (All Classes)",
    icon:     Atom,
    color:    "bg-blue-600/10 text-blue-600",
    border:   "hover:border-blue-600/50",
    subjects: ["Mechanics", "Electrostatics", "Optics", "Modern Physics", "Thermodynamics"],
    href:     "/learn/class-12/physics",
    qCount:   1500,
  },
  {
    title:    "Chemistry",
    icon:     FlaskConical,
    color:    "bg-emerald-500/10 text-emerald-500",
    border:   "hover:border-emerald-500/50",
    subjects: ["Organic", "Inorganic", "Physical", "Periodic Table", "Reactions"],
    href:     "/learn/class-12/chemistry",
    qCount:   1400,
  },
  {
    title:    "Data Structures & Algorithms",
    icon:     Brain,
    color:    "bg-orange-500/10 text-orange-500",
    border:   "hover:border-orange-500/50",
    subjects: ["Arrays", "Graphs", "DP", "Trees", "Sorting"],
    href:     "/core-cs/dsa",
    qCount:   2500,
  },
  {
    title:    "Python Programming",
    icon:     Code2,
    color:    "bg-yellow-500/10 text-yellow-500",
    border:   "hover:border-yellow-500/50",
    subjects: ["Basics", "OOP", "Data Structures", "Libraries", "Algorithms"],
    href:     "/programming/python",
    qCount:   900,
  },
];

/* ─── Practice Stats ─────────────────────────────────────────────────────── */
const PRACTICE_STATS = [
  { icon: Target,  value: "12,000+", label: "Questions" },
  { icon: Star,    value: "98%",     label: "Accuracy Tracked" },
  { icon: Clock,   value: "3 min",   label: "Avg Quiz Time"  },
  { icon: Trophy,  value: "XP",      label: "On Every Correct Answer" },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function PracticePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">12,000+ MCQs</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Practice Makes Perfect
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Chapter-wise multiple choice questions for all subjects.
            Track your accuracy, earn XP, and identify weak areas instantly.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          {PRACTICE_STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-4 text-center">
              <stat.icon className="h-5 w-5 text-brand-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all ${cat.border}`}
            >
              {/* Icon + title */}
              <div className={`inline-flex p-3 rounded-xl ${cat.color} mb-4`}>
                <cat.icon className="h-6 w-6" />
              </div>
              <h2 className="font-bold text-foreground text-sm group-hover:text-brand-500 transition-colors mb-2">
                {cat.title}
              </h2>

              {/* Subjects */}
              <div className="flex flex-wrap gap-1 mb-4">
                {cat.subjects.slice(0, 3).map((subject) => (
                  <span key={subject} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {subject}
                  </span>
                ))}
                {cat.subjects.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{cat.subjects.length - 3} more</span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{cat.qCount.toLocaleString()} questions</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:text-brand-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Pro hint */}
        <div className="mt-10 text-center p-6 rounded-2xl border bg-brand-500/5 border-brand-500/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Free plan:</strong> 3 practice sets per day per subject.{" "}
            <Link href="/pricing" className="text-brand-500 hover:underline">Upgrade to Pro</Link>{" "}
            for unlimited practice, detailed analytics, and AI-powered weak-area identification.
          </p>
        </div>
      </div>
    </div>
  );
}
