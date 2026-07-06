/**
 * @file app/(platform)/practice/pyqs/page.tsx
 * @description Previous Year Questions (PYQ) Bank — CBSE Board + JEE + NEET
 * Route: /practice/pyqs
 *
 * Features:
 *  - Year filter (2015–2024)
 *  - Exam type filter (CBSE Class 10, 12, JEE Main, NEET)
 *  - Subject filter
 *  - Question format: original board paper questions with solutions
 *  - Download PDF option (Pro feature)
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Calendar, Download, Filter, Search,
  ChevronRight, Lock, Star, Clock, FileText,
  CheckCircle2, ArrowRight, Zap,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

/* ─── PYQ Exam Categories ─────────────────────────────────────────────────── */
const EXAM_CATEGORIES = [
  {
    exam:     "CBSE Class 12",
    emoji:    "📚",
    color:    "from-blue-500 to-cyan-500",
    years:    ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science", "Economics"],
    totalQ:   1840,
  },
  {
    exam:     "CBSE Class 10",
    emoji:    "📖",
    color:    "from-green-500 to-teal-500",
    years:    ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"],
    subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi"],
    totalQ:   1240,
  },
  {
    exam:     "JEE Main",
    emoji:    "🏆",
    color:    "from-orange-500 to-red-500",
    years:    ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"],
    subjects: ["Physics", "Chemistry", "Mathematics"],
    totalQ:   2880,
  },
  {
    exam:     "NEET",
    emoji:    "🔬",
    color:    "from-purple-500 to-violet-500",
    years:    ["2024", "2023", "2022", "2021", "2020", "2019", "2018"],
    subjects: ["Physics", "Chemistry", "Biology"],
    totalQ:   2520,
  },
] as const;

/** Sample PYQ questions for display */
const SAMPLE_PYQS = [
  { year: "2024", exam: "JEE Main",    subject: "Mathematics", topic: "Calculus",    text: "If f(x) = x³ – 3x + 2, find the critical points of f.", marks: 4, solved: true  },
  { year: "2024", exam: "CBSE 12",     subject: "Physics",     topic: "Optics",      text: "A concave mirror has a focal length of 20 cm. An object is placed 60 cm in front of it. Find the image position.", marks: 5, solved: true  },
  { year: "2023", exam: "NEET",        subject: "Biology",     topic: "Genetics",    text: "In a dihybrid cross, what is the ratio of phenotypes in F₂ generation?", marks: 4, solved: false },
  { year: "2023", exam: "JEE Main",    subject: "Chemistry",   topic: "Equilibrium", text: "For the reaction N₂ + 3H₂ ⇌ 2NH₃, if Kp is given, find Kc at temperature T.", marks: 4, solved: false },
  { year: "2022", exam: "CBSE 12",     subject: "Mathematics", topic: "Matrices",    text: "If A is a 3×3 matrix with |A| = 5, find |adj A|.", marks: 3, solved: true  },
  { year: "2022", exam: "CBSE 10",     subject: "Science",     topic: "Electricity", text: "Two resistors of 4Ω and 6Ω are connected in parallel. Find the equivalent resistance.", marks: 2, solved: true  },
];

export default function PYQsPage() {
  const [searchQuery,      setSearchQuery]      = useState("");
  const [selectedExam,     setSelectedExam]     = useState<string>("all");
  const [selectedYear,     setSelectedYear]     = useState<string>("all");
  const [selectedSubject,  setSelectedSubject]  = useState<string>("all");

  const filteredPYQs = SAMPLE_PYQS.filter((q) => {
    const matchExam    = selectedExam === "all"    || q.exam.includes(selectedExam);
    const matchYear    = selectedYear === "all"    || q.year === selectedYear;
    const matchSubject = selectedSubject === "all" || q.subject === selectedSubject;
    const matchSearch  = searchQuery === ""        || q.text.toLowerCase().includes(searchQuery.toLowerCase()) || q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchExam && matchYear && matchSubject && matchSearch;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-purple-950/5 to-background py-14">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/practice" className="hover:text-foreground">Practice</Link>
            <span>/</span>
            <span className="text-foreground font-medium">PYQ Bank</span>
          </nav>
          <Badge variant="secondary" className="mb-3">2015–2024 · 8,480+ Questions</Badge>
          <h1 className="text-3xl font-extrabold mb-4">📋 Previous Year Question Bank</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            10 years of CBSE Board (Class 10 & 12), JEE Main, and NEET previous year questions
            with official solutions. The most effective exam preparation resource.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> 8,480+ Questions</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 2015–2024</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> Official solutions</span>
          </div>
        </div>
      </section>

      {/* Exam category overview */}
      <section className="py-10">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Browse by Exam</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {EXAM_CATEGORIES.map((cat, i) => (
              <motion.div key={cat.exam} initial={{ opacity: 0.01, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border bg-card overflow-hidden hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedExam(cat.exam.split(" ").slice(0, 2).join(" "))}>
                <div className={`h-1.5 w-full bg-gradient-to-r ${cat.color}`} />
                <div className="p-5">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="font-bold mt-2">{cat.exam}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cat.years.length} years · {cat.subjects.length} subjects
                  </p>
                  <div className="mt-3 font-bold text-brand-500 text-sm">{cat.totalQ.toLocaleString()} questions</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-xl border bg-muted/30">
            <Filter className="h-4 w-4 text-muted-foreground mt-2.5" />
            <div className="relative flex-1 min-w-40">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search questions or topics…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9 text-sm" />
            </div>
            <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="rounded-lg border bg-background px-3 h-9 text-sm">
              <option value="all">All Exams</option>
              {EXAM_CATEGORIES.map((c) => <option key={c.exam} value={c.exam}>{c.exam}</option>)}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="rounded-lg border bg-background px-3 h-9 text-sm">
              <option value="all">All Years</option>
              {["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"].map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>

          {/* Question list */}
          <div className="space-y-4">
            {filteredPYQs.length === 0 ? (
              <div className="rounded-2xl border bg-muted/30 p-10 text-center text-muted-foreground">
                No questions found. Try adjusting your filters.
              </div>
            ) : filteredPYQs.map((q, i) => (
              <motion.div key={i} initial={{ opacity: 0.01, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border bg-card p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-8 w-8 shrink-0 flex items-center justify-center rounded-lg ${q.solved ? "bg-green-500/10" : "bg-orange-500/10"}`}>
                    {q.solved ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <BookOpen className="h-4 w-4 text-orange-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{q.year}</Badge>
                      <Badge variant="outline" className="text-xs">{q.exam}</Badge>
                      <Badge variant="outline" className="text-xs">{q.subject}</Badge>
                      <Badge variant="outline" className="text-xs">{q.topic}</Badge>
                      <Badge variant="outline" className="text-xs">{q.marks} marks</Badge>
                    </div>
                    <p className="text-sm font-medium">{q.text}</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 gap-1.5 text-xs h-8" asChild>
                    <Link href="/practice/quiz">
                      {q.solved ? "Revise" : "Solve"} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pro CTA */}
          <div className="mt-10 rounded-2xl border bg-gradient-to-r from-brand-500/5 to-purple-500/5 border-brand-500/20 p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-bold">Download Full PYQ PDFs</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Pro users can download complete year-wise PDFs for offline exam preparation.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button variant="gradient" asChild>
                <Link href="/pricing"><Zap className="h-4 w-4" /> Upgrade to Pro</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
