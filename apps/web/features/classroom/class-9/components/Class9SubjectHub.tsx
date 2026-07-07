/**
 * @file features/classroom/class-9/components/Class9SubjectHub.tsx
 * @description Class 9 subject hub — full NCERT-aligned subject listing
 * @purpose Renders all 13 Class 9 subjects with chapter counts, progress tracking, and navigation
 * @used-by app/(platform)/learn/class-9/page.tsx
 *
 * Subjects follow NCERT Class 9 syllabus:
 *  Mathematics, Science (Physics/Chemistry/Biology), Social Science (History/Geography/Civics/Economics),
 *  English (Beehive/Moments), Hindi (Kshitij/Kritika/Sparsh/Sanchayan), Sanskrit (Shemushi)
 *  + Computer Science, Physical Education
 */

"use client";

import React, { useState }    from "react";
import { motion }             from "framer-motion";
import Link                   from "next/link";
import {
  BookOpen, Calculator, Atom, Globe, Users, Code2,
  ChevronRight, Star, Clock, Target, TrendingUp,
  FlaskConical, Leaf, MapPin, History, Landmark,
  Languages, Music, PenTool, Dumbbell, BarChart2,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn }     from "@/lib/utils";

/* ─── Class 9 Subject Definitions ───────────────────────────────────────── */
// All 13 subjects covered in NCERT Class 9 curriculum
const CLASS9_SUBJECTS = [
  {
    id:          "mathematics",
    label:       "Mathematics",
    icon:        Calculator,
    color:       "from-blue-500 to-cyan-500",
    bg:          "bg-blue-500/10",
    border:      "border-blue-500/20",
    text:        "text-blue-600 dark:text-blue-400",
    chapters:    15,
    description: "Number Systems, Algebra, Geometry, Statistics, Probability — NCERT Class 9 Maths",
    topics:      ["Number Systems", "Polynomials", "Coordinate Geometry", "Triangles", "Circles", "Statistics"],
    isImportant: true,
    href:        "/learn/class-9/mathematics",
  },
  {
    id:          "science",
    label:       "Science",
    icon:        Atom,
    color:       "from-green-500 to-emerald-500",
    bg:          "bg-green-500/10",
    border:      "border-green-500/20",
    text:        "text-green-600 dark:text-green-400",
    chapters:    15,
    description: "Physics, Chemistry, and Biology — integrated NCERT Class 9 Science",
    topics:      ["Matter in Our Surroundings", "Atoms & Molecules", "Cell", "Motion", "Force & Laws"],
    isImportant: true,
    href:        "/learn/class-9/science",
  },
  {
    id:          "social-science",
    label:       "Social Science",
    icon:        Globe,
    color:       "from-orange-500 to-amber-500",
    bg:          "bg-orange-500/10",
    border:      "border-orange-500/20",
    text:        "text-orange-600 dark:text-orange-400",
    chapters:    20,
    description: "History, Geography, Political Science, Economics — NCERT Class 9 SST",
    topics:      ["French Revolution", "India & Contemporary World", "Climate", "Democratic Politics", "Poverty"],
    isImportant: true,
    href:        "/learn/class-9/social-science",
  },
  {
    id:          "english",
    label:       "English",
    icon:        BookOpen,
    color:       "from-purple-500 to-violet-500",
    bg:          "bg-purple-500/10",
    border:      "border-purple-500/20",
    text:        "text-purple-600 dark:text-purple-400",
    chapters:    11,
    description: "Beehive (prose & poetry) + Moments (supplementary reader)",
    topics:      ["The Fun They Had", "The Road Not Taken", "The Snake & Mirror", "My Childhood"],
    isImportant: false,
    href:        "/learn/class-9/english",
  },
  {
    id:          "hindi",
    label:       "Hindi",
    icon:        Languages,
    color:       "from-rose-500 to-pink-500",
    bg:          "bg-rose-500/10",
    border:      "border-rose-500/20",
    text:        "text-rose-600 dark:text-rose-400",
    chapters:    18,
    description: "Kshitij, Kritika, Sparsh, Sanchayan — all 4 Hindi books",
    topics:      ["Doh Bailon Ki Katha", "Sakhiyan", "Mere Sang Ki Auraten", "Is Jal Pralay Mein"],
    isImportant: false,
    href:        "/learn/class-9/hindi",
  },
  {
    id:          "sanskrit",
    label:       "Sanskrit",
    icon:        PenTool,
    color:       "from-yellow-500 to-orange-500",
    bg:          "bg-yellow-500/10",
    border:      "border-yellow-500/20",
    text:        "text-yellow-600 dark:text-yellow-400",
    chapters:    12,
    description: "Shemushi Part 1 — Class 9 Sanskrit NCERT",
    topics:      ["Bhadram No Apivaataya", "Svanascha Suratashcha", "Karun Kar Karunam"],
    isImportant: false,
    href:        "/learn/class-9/sanskrit",
  },
  {
    id:          "computer-science",
    label:       "Computer Science",
    icon:        Code2,
    color:       "from-cyan-500 to-blue-500",
    bg:          "bg-cyan-500/10",
    border:      "border-cyan-500/20",
    text:        "text-cyan-600 dark:text-cyan-400",
    chapters:    8,
    description: "Fundamentals of computers, software, internet, and basic programming",
    topics:      ["Introduction to Computers", "Windows OS", "MS Office", "Internet Basics", "HTML"],
    isImportant: false,
    href:        "/learn/class-9/computer-science",
  },
  {
    id:          "economics",
    label:       "Economics",
    icon:        BarChart2,
    color:       "from-teal-500 to-green-500",
    bg:          "bg-teal-500/10",
    border:      "border-teal-500/20",
    text:        "text-teal-600 dark:text-teal-400",
    chapters:    5,
    description: "Economics for Class 9 — Poverty, Village Life, Food Security, India Resources",
    topics:      ["Palamu Village", "Palampur Story", "Food Security", "Poverty as Challenge"],
    isImportant: false,
    href:        "/learn/class-9/economics",
  },
  {
    id:          "geography",
    label:       "Geography",
    icon:        MapPin,
    color:       "from-green-500 to-teal-500",
    bg:          "bg-green-500/10",
    border:      "border-green-500/20",
    text:        "text-green-600 dark:text-green-400",
    chapters:    6,
    description: "Contemporary India 1 — India size, location, drainage, climate, natural vegetation",
    topics:      ["India Size & Location", "Physical Features", "Drainage", "Climate", "Natural Vegetation"],
    isImportant: false,
    href:        "/learn/class-9/geography",
  },
  {
    id:          "history",
    label:       "History",
    icon:        History,
    color:       "from-amber-600 to-yellow-500",
    bg:          "bg-amber-500/10",
    border:      "border-amber-500/20",
    text:        "text-amber-600 dark:text-amber-400",
    chapters:    5,
    description: "India and the Contemporary World 1 — French Revolution, Nazism, Pastoralists, Forest",
    topics:      ["French Revolution", "Socialism in Europe", "Nazism & Hitler", "Pastoralists"],
    isImportant: false,
    href:        "/learn/class-9/history",
  },
  {
    id:          "political-science",
    label:       "Political Science",
    icon:        Landmark,
    color:       "from-indigo-500 to-blue-500",
    bg:          "bg-indigo-500/10",
    border:      "border-indigo-500/20",
    text:        "text-indigo-600 dark:text-indigo-400",
    chapters:    5,
    description: "Democratic Politics 1 — What is Democracy, Electoral Politics, Rights",
    topics:      ["What is Democracy?", "Constitutional Design", "Electoral Politics", "Working of Institutions"],
    isImportant: false,
    href:        "/learn/class-9/political-science",
  },
  {
    id:          "physical-education",
    label:       "Physical Education",
    icon:        Dumbbell,
    color:       "from-red-500 to-orange-500",
    bg:          "bg-red-500/10",
    border:      "border-red-500/20",
    text:        "text-red-600 dark:text-red-400",
    chapters:    10,
    description: "Sports, fitness, yoga, first aid, and physical wellness for Class 9",
    topics:      ["Physical Fitness", "Yoga for Beginners", "Athletics", "Team Sports", "First Aid"],
    isImportant: false,
    href:        "/learn/class-9/physical-education",
  },
] as const;

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "13",   label: "Subjects",         icon: BookOpen   },
  { value: "125+", label: "Chapters",         icon: Target     },
  { value: "960+", label: "Practice Problems",icon: BarChart2  },
  { value: "100%", label: "NCERT Aligned",    icon: Star       },
];

/* ─── Class9SubjectHub Component ─────────────────────────────────────────── */
export function Class9SubjectHub() {
  const [searchQuery, setSearchQuery] = useState(""); // Search filter

  /* ── Filter subjects by search ─────────────────────────────────── */
  const filtered = CLASS9_SUBJECTS.filter((s) =>
    !searchQuery ||
    s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const important = filtered.filter((s) => s.isImportant);   // Core 3 subjects
  const others    = filtered.filter((s) => !s.isImportant);  // Other subjects

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0.01, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/learn" className="hover:text-foreground">Learn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Class 9</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-500 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            CBSE Class 9 — NCERT Syllabus 2025–26
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Class 9 — All Subjects
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Complete NCERT Class 9 syllabus with chapter-wise notes, NCERT solutions,
            formula sheets, and practice questions. Board exam pattern throughout.
          </p>
        </motion.div>

        {/* ── Stats row ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-3 flex items-center gap-3">
              <s.icon className="h-5 w-5 text-brand-500 shrink-0" />
              <div>
                <div className="font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search ──────────────────────────────────────────────── */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search subjects or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>

        {/* ── Core Subjects (Maths, Science, SST) ─────────────────── */}
        {important.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Core Subjects
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {important.map((subject, i) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0.01, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={subject.href}
                    className={cn(
                      "group flex flex-col h-full rounded-2xl border p-6 transition-all hover:shadow-md hover:-translate-y-0.5",
                      subject.bg, subject.border,
                    )}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl border",
                        subject.bg, subject.border,
                      )}>
                        <subject.icon className={cn("h-6 w-6", subject.text)} />
                      </div>
                      <Badge className={cn("text-xs", subject.bg, subject.border, subject.text)}>
                        {subject.chapters} chapters
                      </Badge>
                    </div>

                    <h3 className={cn("font-bold text-lg mb-1.5", subject.text)}>{subject.label}</h3>
                    <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">
                      {subject.description}
                    </p>

                    {/* Topic tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {subject.topics.slice(0, 3).map((t) => (
                        <span key={t} className={cn(
                          "rounded-full px-2 py-0.5 text-xs border",
                          subject.bg, subject.border, subject.text,
                        )}>
                          {t}
                        </span>
                      ))}
                      {subject.topics.length > 3 && (
                        <span className="rounded-full px-2 py-0.5 text-xs border border-border text-muted-foreground">
                          +{subject.topics.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all",
                      subject.text,
                    )}>
                      Start Learning <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── Other Subjects ───────────────────────────────────────── */}
        {others.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-500" />
              All Subjects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {others.map((subject, i) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0.01, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={subject.href}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted/20 hover:border-brand-500/30 transition-all"
                  >
                    <div className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                      subject.bg, subject.border,
                    )}>
                      <subject.icon className={cn("h-5 w-5", subject.text)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-sm">{subject.label}</div>
                      <div className="text-xs text-muted-foreground">{subject.chapters} chapters</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
