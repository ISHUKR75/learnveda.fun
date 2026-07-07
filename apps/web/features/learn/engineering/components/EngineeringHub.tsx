/**
 * @file features/learn/engineering/components/EngineeringHub.tsx
 * @description Engineering branch and semester navigation hub for LearnVeda
 * @purpose Lists all 8 engineering branches with semester-wise navigation
 * @used-by app/(platform)/learn/engineering/page.tsx
 *
 * Branches:
 *  CSE (Computer Science), ECE (Electronics), EEE (Electrical),
 *  Civil, Mechanical, Chemical, AI/ML, Data Science, IT
 *
 * Each branch has 8 semesters × subjects with notes, videos, PYQs
 */

"use client";

import React, { useState } from "react";
import { motion }          from "framer-motion";
import Link                from "next/link";
import {
  Code2, Cpu, Zap, Building2, Cog, FlaskConical,
  Brain, BarChart2, Globe, ChevronRight, BookOpen,
  Clock, Star, Target, Users, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { cn }     from "@/lib/utils";

/* ─── Engineering Branch Definitions ────────────────────────────────────── */
const BRANCHES = [
  {
    id:          "cse",
    label:       "Computer Science",
    short:       "CSE",
    icon:        Code2,
    color:       "from-blue-500 to-cyan-500",
    bg:          "bg-blue-500/10",
    border:      "border-blue-500/20",
    text:        "text-blue-600 dark:text-blue-400",
    description: "Algorithms, OS, DBMS, Networks, AI, Software Engineering",
    semesters:   8,
    students:    12400,
    isPopular:   true,
    href:        "/learn/engineering/cse",
    keySubjects: ["Data Structures", "DBMS", "Operating Systems", "Computer Networks", "AI/ML"],
  },
  {
    id:          "ece",
    label:       "Electronics & Communication",
    short:       "ECE",
    icon:        Cpu,
    color:       "from-purple-500 to-violet-500",
    bg:          "bg-purple-500/10",
    border:      "border-purple-500/20",
    text:        "text-purple-600 dark:text-purple-400",
    description: "Signals, VLSI, Embedded Systems, Communication, Control Systems",
    semesters:   8,
    students:    8200,
    isPopular:   true,
    href:        "/learn/engineering/ece",
    keySubjects: ["Signals & Systems", "VLSI Design", "Microprocessors", "Digital Communication"],
  },
  {
    id:          "eee",
    label:       "Electrical Engineering",
    short:       "EEE",
    icon:        Zap,
    color:       "from-yellow-500 to-amber-500",
    bg:          "bg-yellow-500/10",
    border:      "border-yellow-500/20",
    text:        "text-yellow-600 dark:text-yellow-400",
    description: "Power Systems, Machines, Control, Power Electronics",
    semesters:   8,
    students:    5800,
    isPopular:   false,
    href:        "/learn/engineering/eee",
    keySubjects: ["Power Systems", "Electrical Machines", "Control Systems", "Power Electronics"],
  },
  {
    id:          "civil",
    label:       "Civil Engineering",
    short:       "Civil",
    icon:        Building2,
    color:       "from-stone-500 to-slate-500",
    bg:          "bg-stone-500/10",
    border:      "border-stone-500/20",
    text:        "text-stone-600 dark:text-stone-400",
    description: "Structural, Geotechnical, Transportation, Environmental",
    semesters:   8,
    students:    4200,
    isPopular:   false,
    href:        "/learn/engineering/civil",
    keySubjects: ["Structural Analysis", "Fluid Mechanics", "Soil Mechanics", "RCC Design"],
  },
  {
    id:          "mech",
    label:       "Mechanical Engineering",
    short:       "Mech",
    icon:        Cog,
    color:       "from-orange-500 to-red-500",
    bg:          "bg-orange-500/10",
    border:      "border-orange-500/20",
    text:        "text-orange-600 dark:text-orange-400",
    description: "Thermodynamics, Manufacturing, Design, Fluid Mechanics",
    semesters:   8,
    students:    6100,
    isPopular:   false,
    href:        "/learn/engineering/mech",
    keySubjects: ["Thermodynamics", "Fluid Mechanics", "Manufacturing Processes", "CAD/CAM"],
  },
  {
    id:          "chemical",
    label:       "Chemical Engineering",
    short:       "Chem E",
    icon:        FlaskConical,
    color:       "from-green-500 to-teal-500",
    bg:          "bg-green-500/10",
    border:      "border-green-500/20",
    text:        "text-green-600 dark:text-green-400",
    description: "Process Design, Reaction Engineering, Transport Phenomena",
    semesters:   8,
    students:    2800,
    isPopular:   false,
    href:        "/learn/engineering/chemical",
    keySubjects: ["Chemical Thermodynamics", "Mass Transfer", "Reaction Engineering", "Process Control"],
  },
  {
    id:          "aiml",
    label:       "Artificial Intelligence & ML",
    short:       "AI/ML",
    icon:        Brain,
    color:       "from-pink-500 to-rose-500",
    bg:          "bg-pink-500/10",
    border:      "border-pink-500/20",
    text:        "text-pink-600 dark:text-pink-400",
    description: "Machine Learning, Deep Learning, NLP, Computer Vision",
    semesters:   8,
    students:    9800,
    isPopular:   true,
    href:        "/learn/engineering/aiml",
    keySubjects: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps"],
  },
  {
    id:          "ds",
    label:       "Data Science",
    short:       "DS",
    icon:        BarChart2,
    color:       "from-cyan-500 to-blue-500",
    bg:          "bg-cyan-500/10",
    border:      "border-cyan-500/20",
    text:        "text-cyan-600 dark:text-cyan-400",
    description: "Statistics, Python/R, ML, Big Data, Visualization",
    semesters:   8,
    students:    7400,
    isPopular:   true,
    href:        "/learn/engineering/ds",
    keySubjects: ["Statistics", "Python for Data Science", "Machine Learning", "Big Data", "Tableau"],
  },
  {
    id:          "it",
    label:       "Information Technology",
    short:       "IT",
    icon:        Globe,
    color:       "from-indigo-500 to-blue-500",
    bg:          "bg-indigo-500/10",
    border:      "border-indigo-500/20",
    text:        "text-indigo-600 dark:text-indigo-400",
    description: "Web Dev, Cloud, Cybersecurity, DevOps, Networks",
    semesters:   8,
    students:    8900,
    isPopular:   false,
    href:        "/learn/engineering/it",
    keySubjects: ["Web Technologies", "Cloud Computing", "Cybersecurity", "DevOps", "IoT"],
  },
] as const;

/* ─── Common Semester Subjects (CSE as reference) ─────────────────────────── */
const CSE_SEMESTERS = [
  { sem: 1, subjects: ["Engineering Mathematics I", "Physics", "Chemistry", "Programming in C", "English & Communication"] },
  { sem: 2, subjects: ["Engineering Mathematics II", "Basic Electronics", "Data Structures", "Object-Oriented Programming", "Engineering Drawing"] },
  { sem: 3, subjects: ["Mathematics III", "Digital Electronics", "Computer Architecture", "DBMS", "Operating Systems"] },
  { sem: 4, subjects: ["Mathematics IV", "Algorithms", "Computer Networks", "Software Engineering", "Microprocessors"] },
  { sem: 5, subjects: ["Compiler Design", "AI/ML Basics", "Web Technologies", "Information Security", "Elective I"] },
  { sem: 6, subjects: ["Cloud Computing", "Machine Learning", "Mobile App Development", "Data Analytics", "Elective II"] },
  { sem: 7, subjects: ["Distributed Systems", "Natural Language Processing", "Blockchain", "IoT", "Major Project I"] },
  { sem: 8, subjects: ["Advanced Topics in CS", "DevOps & CI/CD", "Research Methods", "Major Project II", "Industry Internship"] },
];

/* ─── EngineeringHub Component ───────────────────────────────────────────── */
export function EngineeringHub() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  /* ── Branch selected: show semester view ─────────────────────── */
  if (selectedBranch) {
    const branch = BRANCHES.find((b) => b.id === selectedBranch)!;

    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">
          {/* Back */}
          <button
            onClick={() => setSelectedBranch(null)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            All Engineering Branches
          </button>

          {/* Branch header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl border", branch.bg, branch.border)}>
                <branch.icon className={cn("h-6 w-6", branch.text)} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{branch.label} ({branch.short})</h1>
                <p className="text-muted-foreground text-sm">{branch.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {branch.keySubjects.map((s) => (
                <span key={s} className={cn("rounded-full border px-2.5 py-0.5 text-xs font-medium", branch.bg, branch.border, branch.text)}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Semester grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {CSE_SEMESTERS.map((semData, i) => (
              <motion.div
                key={semData.sem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={cn("rounded-xl border p-5 hover:shadow-sm transition-all cursor-pointer", branch.bg, branch.border)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={cn("font-bold text-base", branch.text)}>Semester {semData.sem}</h3>
                  <Badge className={cn("text-xs", branch.bg, branch.border, branch.text)}>
                    {semData.subjects.length} subjects
                  </Badge>
                </div>
                <ul className="space-y-1">
                  {semData.subjects.map((subj) => (
                    <li key={subj} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-3 w-3 text-muted-foreground shrink-0" />
                      {subj}
                    </li>
                  ))}
                </ul>
                <Button size="sm" variant="outline" className={cn("w-full mt-3 gap-1 border", branch.border, branch.text)}>
                  Study Semester {semData.sem} <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Main branch listing ──────────────────────────────────────── */
  const popular = BRANCHES.filter((b) => b.isPopular);
  const others  = BRANCHES.filter((b) => !b.isPopular);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-500 mb-3">
            <Award className="h-3.5 w-3.5" />
            Engineering Track — 8 Branches, 8 Semesters Each
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Engineering Learning Hub</h1>
          <p className="text-muted-foreground max-w-2xl">
            Semester-wise notes, previous year papers, and video lectures for all major engineering branches.
            GATE-aligned content for placement and exam preparation.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Branches",    value: "9",    icon: Code2  },
            { label: "Semesters",   value: "8",    icon: Clock  },
            { label: "Subjects",    value: "300+", icon: BookOpen },
            { label: "Students",    value: "65K+", icon: Users  },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-3 flex items-center gap-3">
              <s.icon className="h-5 w-5 text-brand-500 shrink-0" />
              <div>
                <div className="font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular branches */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" /> Most Popular
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((branch, i) => (
              <motion.button
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelectedBranch(branch.id)}
                className={cn("group rounded-2xl border p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all", branch.bg, branch.border)}
              >
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border mb-3", branch.bg, branch.border)}>
                  <branch.icon className={cn("h-5 w-5", branch.text)} />
                </div>
                <div className={cn("font-bold text-sm mb-1", branch.text)}>{branch.short}</div>
                <div className="text-sm text-foreground font-medium mb-1">{branch.label}</div>
                <div className="text-xs text-muted-foreground mb-3 line-clamp-2">{branch.description}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {branch.students.toLocaleString()} students
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* All branches */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">All Branches</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {others.map((branch, i) => (
              <motion.button
                key={branch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedBranch(branch.id)}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted/20 hover:border-brand-500/30 transition-all text-left"
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border", branch.bg, branch.border)}>
                  <branch.icon className={cn("h-5 w-5", branch.text)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground text-sm">{branch.label}</div>
                  <div className="text-xs text-muted-foreground">{branch.short} · {branch.semesters} semesters</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
