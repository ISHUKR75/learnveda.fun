/**
 * @file features/programming/python/components/PythonDayPlan.tsx
 * @description 45-Day Python Learning Plan page component
 *
 * Shows the complete day-by-day Python curriculum:
 * - Days 1-45 organized into phases (Beginner → Intermediate → Advanced → Projects)
 * - Each day has: topic, concepts, exercises count, estimated time
 * - Progress tracking (completed days highlighted)
 * - Quick-start button for each day linking to the day's lesson
 *
 * Used in: /programming/python page
 * Route: /programming/python
 */

"use client"; // Client component — uses state for progress tracking

import React, { useState } from "react"; // React + state
import Link from "next/link"; // Navigation
import { motion } from "framer-motion"; // Entry animations
import {
  CheckCircle2, Circle, Clock, Code2, BookOpen,
  ArrowRight, ChevronDown, ChevronUp, Play, Star,
  Zap, Brain, Layers,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";  // Status badges
import { Button } from "@/components/ui/button"; // CTA button

/* ─── Day Plan Data ───────────────────────────────────────────────────────── */
// Complete 45-day Python curriculum organized by phase
const PYTHON_DAYS = [
  // ── Phase 1: Python Basics (Days 1–10) ────────────────────────────
  { day: 1,  phase: 1, topic: "Introduction to Python & Setup",       concepts: ["Installation", "IDLE/VS Code", "First program", "print()"], time: 30, exercises: 3 },
  { day: 2,  phase: 1, topic: "Variables & Data Types",               concepts: ["int, float, str, bool", "type()", "Input/output", "Comments"], time: 35, exercises: 5 },
  { day: 3,  phase: 1, topic: "Operators & Expressions",              concepts: ["Arithmetic", "Comparison", "Logical", "Assignment operators"], time: 30, exercises: 6 },
  { day: 4,  phase: 1, topic: "Strings — Part 1",                     concepts: ["String methods", "Indexing", "Slicing", "f-strings"], time: 40, exercises: 7 },
  { day: 5,  phase: 1, topic: "Strings — Part 2",                     concepts: ["String formatting", "join/split", "replace", "count"], time: 35, exercises: 5 },
  { day: 6,  phase: 1, topic: "Conditionals — if / elif / else",      concepts: ["Boolean logic", "Nested conditions", "Ternary operator"], time: 40, exercises: 6 },
  { day: 7,  phase: 1, topic: "Loops — for & while",                  concepts: ["range()", "break/continue", "else in loops", "Nested loops"], time: 45, exercises: 8 },
  { day: 8,  phase: 1, topic: "Lists — Part 1",                       concepts: ["Creating lists", "Indexing", "Slicing", "list methods"], time: 40, exercises: 7 },
  { day: 9,  phase: 1, topic: "Lists — Part 2",                       concepts: ["List comprehension", "Sorting", "2D lists", "copy vs reference"], time: 40, exercises: 6 },
  { day: 10, phase: 1, topic: "Tuples & Sets",                        concepts: ["Tuple unpacking", "set operations", "frozenset", "when to use which"], time: 35, exercises: 5 },
  // ── Phase 2: Intermediate Python (Days 11–25) ───────────────────
  { day: 11, phase: 2, topic: "Dictionaries",                         concepts: ["CRUD operations", "dict methods", "Nested dicts", "dict comprehension"], time: 45, exercises: 7 },
  { day: 12, phase: 2, topic: "Functions — Part 1",                   concepts: ["def", "Parameters", "Return values", "Scope (local/global)"], time: 45, exercises: 6 },
  { day: 13, phase: 2, topic: "Functions — Part 2",                   concepts: ["*args, **kwargs", "Default params", "Lambda", "Closures"], time: 45, exercises: 7 },
  { day: 14, phase: 2, topic: "File Handling",                        concepts: ["open/read/write", "with statement", "CSV files", "JSON files"], time: 45, exercises: 5 },
  { day: 15, phase: 2, topic: "Error Handling & Exceptions",          concepts: ["try/except/finally", "raise", "Custom exceptions", "assert"], time: 40, exercises: 5 },
  { day: 16, phase: 2, topic: "Modules & Packages",                   concepts: ["import", "from...import", "math, random, os, sys", "__name__"], time: 40, exercises: 5 },
  { day: 17, phase: 2, topic: "Object-Oriented Programming — Part 1", concepts: ["class", "self", "__init__", "Methods & attributes"], time: 50, exercises: 5 },
  { day: 18, phase: 2, topic: "OOP — Part 2",                        concepts: ["Inheritance", "super()", "Method overriding", "isinstance()"], time: 50, exercises: 6 },
  { day: 19, phase: 2, topic: "OOP — Part 3",                        concepts: ["Encapsulation", "Polymorphism", "Dunder methods", "@property"], time: 50, exercises: 5 },
  { day: 20, phase: 2, topic: "Iterators & Generators",               concepts: ["__iter__/__next__", "yield", "Generator expressions", "lazy eval"], time: 45, exercises: 4 },
  { day: 21, phase: 2, topic: "Decorators",                           concepts: ["First-class functions", "@decorator", "functools.wraps", "Stacking"], time: 45, exercises: 4 },
  { day: 22, phase: 2, topic: "Comprehensions & Functional Tools",    concepts: ["List/dict/set comp", "map/filter/reduce", "zip/enumerate"], time: 40, exercises: 6 },
  { day: 23, phase: 2, topic: "Regular Expressions",                  concepts: ["re module", "match/search/findall", "Groups", "Special chars"], time: 45, exercises: 5 },
  { day: 24, phase: 2, topic: "Date & Time",                          concepts: ["datetime module", "strptime/strftime", "timedelta", "timezone"], time: 35, exercises: 4 },
  { day: 25, phase: 2, topic: "Debugging & Testing Basics",           concepts: ["pdb", "assert", "unittest", "doctest"], time: 40, exercises: 4 },
  // ── Phase 3: Advanced Python (Days 26–38) ───────────────────────
  { day: 26, phase: 3, topic: "Context Managers",                     concepts: ["with statement", "__enter__/__exit__", "contextlib"], time: 40, exercises: 3 },
  { day: 27, phase: 3, topic: "Multi-threading",                      concepts: ["threading module", "Thread", "Lock", "GIL explained"], time: 50, exercises: 3 },
  { day: 28, phase: 3, topic: "Async Programming",                    concepts: ["async/await", "asyncio", "event loop", "gather()"], time: 55, exercises: 3 },
  { day: 29, phase: 3, topic: "Data Science: NumPy Basics",           concepts: ["ndarray", "Operations", "Indexing", "Broadcasting"], time: 55, exercises: 4 },
  { day: 30, phase: 3, topic: "Data Science: Pandas Basics",          concepts: ["DataFrame", "Series", "read_csv", "groupby", "merge"], time: 60, exercises: 5 },
  { day: 31, phase: 3, topic: "Data Visualization: Matplotlib",       concepts: ["plt.plot/bar/hist", "Subplots", "Labels", "Seaborn intro"], time: 50, exercises: 4 },
  { day: 32, phase: 3, topic: "API Requests",                         concepts: ["requests lib", "GET/POST", "JSON parsing", "Error handling"], time: 45, exercises: 4 },
  { day: 33, phase: 3, topic: "Web Scraping",                         concepts: ["BeautifulSoup", "requests-html", "CSS selectors", "Ethics"], time: 50, exercises: 3 },
  { day: 34, phase: 3, topic: "Flask Web Framework",                  concepts: ["Routes", "Templates (Jinja2)", "Forms", "JSON API"], time: 60, exercises: 4 },
  { day: 35, phase: 3, topic: "Database with SQLite & SQLAlchemy",    concepts: ["sqlite3", "CRUD", "SQLAlchemy ORM", "Migrations"], time: 55, exercises: 4 },
  { day: 36, phase: 3, topic: "Design Patterns in Python",            concepts: ["Singleton", "Factory", "Observer", "Strategy"], time: 50, exercises: 3 },
  { day: 37, phase: 3, topic: "Performance & Optimization",           concepts: ["cProfile", "timeit", "Slots", "lru_cache"], time: 50, exercises: 3 },
  { day: 38, phase: 3, topic: "Python Best Practices & PEP 8",        concepts: ["Code style", "Type hints", "mypy", "docstrings"], time: 40, exercises: 2 },
  // ── Phase 4: Projects (Days 39–45) ──────────────────────────────
  { day: 39, phase: 4, topic: "Project 1: CLI Todo App",              concepts: ["argparse", "JSON storage", "CRUD", "colorama"], time: 90, exercises: 1 },
  { day: 40, phase: 4, topic: "Project 2: Weather App (API)",         concepts: ["OpenWeather API", "requests", "Data formatting", "Error UX"], time: 90, exercises: 1 },
  { day: 41, phase: 4, topic: "Project 3: Web Scraper",               concepts: ["Target site", "BeautifulSoup", "CSV export", "Scheduling"], time: 90, exercises: 1 },
  { day: 42, phase: 4, topic: "Project 4: Flask REST API",            concepts: ["CRUD endpoints", "Auth", "SQLite", "Postman testing"], time: 120, exercises: 1 },
  { day: 43, phase: 4, topic: "Project 5: Data Analysis Dashboard",   concepts: ["Pandas", "Matplotlib", "CSV data", "Insights"], time: 120, exercises: 1 },
  { day: 44, phase: 4, topic: "Interview Prep: Python DSA",           concepts: ["LeetCode easy", "Arrays", "Strings", "HashMap problems"], time: 90, exercises: 5 },
  { day: 45, phase: 4, topic: "Final Review & Next Steps",            concepts: ["Python ecosystem", "Virtual envs", "PyPI packages", "Career paths"], time: 60, exercises: 2 },
];

/* ─── Phase Config ─────────────────────────────────────────────────────── */
const PHASES = [
  { id: 1, name: "Python Basics",         days: "1–10",  color: "from-green-500 to-emerald-500",   bg: "bg-green-500/10",  border: "border-green-500/20" },
  { id: 2, name: "Intermediate Python",   days: "11–25", color: "from-blue-500 to-cyan-500",       bg: "bg-blue-500/10",   border: "border-blue-500/20"  },
  { id: 3, name: "Advanced Python",       days: "26–38", color: "from-purple-500 to-violet-500",   bg: "bg-purple-500/10", border: "border-purple-500/20"},
  { id: 4, name: "Projects",             days: "39–45", color: "from-orange-500 to-red-500",      bg: "bg-orange-500/10", border: "border-orange-500/20"},
];

/* ─── PythonDayPlan Component ────────────────────────────────────────────── */
export function PythonDayPlan() {
  // Demo: first 4 days are "completed" — in production, from user progress API
  const [completedDays] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  // Track which phases are expanded in the accordion
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));

  // Toggle a phase's expanded state
  function togglePhase(phaseId: number) {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(phaseId)) next.delete(phaseId); // Collapse
      else next.add(phaseId);                       // Expand
      return next;
    });
  }

  // Total completed days count
  const completedCount = completedDays.size;
  // Progress percentage
  const progressPct = Math.round((completedCount / 45) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">🐍</span>
          <h1 className="text-3xl font-bold text-foreground">Python — 45-Day Plan</h1>
          <Badge className="ml-2">Beginner</Badge>
        </div>
        <p className="text-muted-foreground">
          From "Hello World" to building real projects. Each day is 30–120 minutes with exercises.
        </p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Your progress</span>
            <span className="font-medium">{completedCount}/45 days ({progressPct}%)</span>
          </div>
          <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Phase Accordions ──────────────────────────────────────── */}
      <div className="space-y-4">
        {PHASES.map((phase) => {
          const phaseDays  = PYTHON_DAYS.filter(d => d.phase === phase.id); // Days in this phase
          const doneInPhase = phaseDays.filter(d => completedDays.has(d.day)).length; // Completed
          const isExpanded = expandedPhases.has(phase.id);

          return (
            <div key={phase.id} className={`rounded-2xl border ${phase.border} overflow-hidden`}>
              {/* Phase header — click to expand/collapse */}
              <button
                onClick={() => togglePhase(phase.id)}
                className={`w-full flex items-center justify-between p-4 ${phase.bg} hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-white text-xs font-bold`}>
                    Phase {phase.id}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{phase.name}</p>
                    <p className="text-xs text-muted-foreground">Days {phase.days} · {doneInPhase}/{phaseDays.length} completed</p>
                  </div>
                </div>
                {isExpanded
                  ? <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  : <ChevronDown className="h-5 w-5 text-muted-foreground" />
                }
              </button>

              {/* Day cards — shown when phase is expanded */}
              {isExpanded && (
                <div className="divide-y">
                  {phaseDays.map((dayData, i) => {
                    const isDone = completedDays.has(dayData.day); // Has user completed this day?
                    const isNext = !isDone && dayData.day === Math.min(...PYTHON_DAYS.filter(d => !completedDays.has(d.day)).map(d => d.day)); // Is this the next day?

                    return (
                      <motion.div
                        key={dayData.day}
                        initial={{ opacity: 0.01, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className={`flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors ${isDone ? "opacity-70" : ""}`}
                      >
                        {/* Completion status icon */}
                        {isDone
                          ? <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          : <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        }

                        {/* Day number badge */}
                        <div className="flex-shrink-0 w-12 text-center">
                          <span className={`text-sm font-bold ${isDone ? "text-green-600" : "text-foreground"}`}>
                            Day {dayData.day}
                          </span>
                        </div>

                        {/* Topic + concepts */}
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {dayData.topic}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {dayData.concepts.slice(0, 3).map(c => (
                              <span key={c} className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded-md">
                                {c}
                              </span>
                            ))}
                            {dayData.concepts.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{dayData.concepts.length - 3} more</span>
                            )}
                          </div>
                        </div>

                        {/* Meta: time + exercises */}
                        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {dayData.time} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Code2 className="h-3.5 w-3.5" /> {dayData.exercises} ex
                          </span>
                        </div>

                        {/* Start / Next badge */}
                        <Link
                          href={`/programming/python/day-${String(dayData.day).padStart(2, "0")}`}
                          className="flex-shrink-0"
                        >
                          {isNext ? (
                            <Button size="sm" className="gap-1 h-7 text-xs">
                              <Play className="h-3 w-3" /> Start
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
                              {isDone ? "Review" : "Begin"} <ArrowRight className="h-3 w-3" />
                            </Button>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
