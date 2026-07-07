/**
 * @file features/programming/python/components/PythonDayLesson.tsx
 * @description Individual day lesson page for the Python 45-day plan
 *
 * Shows:
 * - Day title + phase badge
 * - Theory content (markdown with syntax highlighting)
 * - Embedded code editor (Monaco) for live practice
 * - Exercises panel with test cases
 * - Navigation: Previous day / Next day
 * - XP reward on completion
 *
 * Used in: /programming/python/day-[n] pages
 * Route pattern: /programming/python/day-01 through day-45
 */

"use client"; // Client component — Monaco editor + state

import React, { useState } from "react"; // React + state
import Link from "next/link"; // Navigation
import { motion } from "framer-motion"; // Animations
import {
  ChevronLeft, ChevronRight, Play, CheckCircle2,
  BookOpen, Code2, Star, Lightbulb, Terminal,
} from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // CTA button
import { Badge }  from "@/components/ui/badge";  // Status badge

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Structure of one day's lesson content */
interface DayContent {
  day:        number;   // Day number (1–45)
  title:      string;   // Lesson title
  phase:      number;   // Phase (1–4)
  phaseName:  string;   // Phase display name
  theory:     string;   // HTML or markdown theory content
  starterCode:string;   // Starter code in the editor
  exercises:  Exercise[];// Practice exercises
  xp:         number;   // XP earned for completing this day
}

/** A single coding exercise for the day */
interface Exercise {
  id:          string;   // Unique ID
  title:       string;   // Exercise title
  description: string;   // What to implement
  hint:        string;   // Hint text (shown on request)
  expectedOutput: string;// Expected output for self-checking
}

/* ─── Demo Day 1 Content ─────────────────────────────────────────────────── */
// In production: fetched from /api/learn/programming/python/day/1
const DAY_1_CONTENT: DayContent = {
  day:       1,
  title:     "Introduction to Python & Setup",
  phase:     1,
  phaseName: "Python Basics",
  xp:        40,
  theory:    `
<h2>What is Python?</h2>
<p>Python is a high-level, interpreted programming language known for its simplicity and readability. 
Created by Guido van Rossum in 1991, Python powers everything from websites to AI/ML models.</p>

<h3>Why Python?</h3>
<ul>
  <li><strong>Beginner-friendly:</strong> Clean syntax that reads like English</li>
  <li><strong>Versatile:</strong> Web dev, data science, AI, automation, scripting</li>
  <li><strong>Huge ecosystem:</strong> 300,000+ packages on PyPI</li>
  <li><strong>Job market:</strong> Consistently in top 3 most demanded languages</li>
</ul>

<h3>Your First Python Program</h3>
<pre><code>print("Hello, World!")  # This prints text to the screen</code></pre>
<p>The <code>print()</code> function displays output. Simple as that!</p>

<h3>Python Variables</h3>
<pre><code>name = "LearnVeda"    # String variable
age  = 3              # Integer variable
rating = 4.9          # Float variable
is_cool = True        # Boolean variable

print(name)   # Output: LearnVeda
print(type(age))  # Output: &lt;class 'int'&gt;
</code></pre>

<h3>Comments</h3>
<pre><code># This is a single-line comment
# Python ignores everything after the #

"""
This is a multi-line comment (docstring).
Used for documentation.
"""
</code></pre>
  `.trim(),
  starterCode: `# Day 1: Introduction to Python
# Run this code and see the output!

# Your first Python program
print("Hello, World!")

# Variables
name = "Your Name Here"  # Change this!
age = 16

# Print with f-string (formatted string)
print(f"My name is {name} and I am {age} years old.")

# Exercise: Create variables for your city and favorite subject
# city = ???
# subject = ???
# print(f"I live in {city} and love studying {subject}!")
`,
  exercises: [
    {
      id: "e1",
      title: "Hello, LearnVeda!",
      description: `Write a Python program that prints exactly:
Hello, LearnVeda!
Welcome to Day 1!`,
      hint: "Use print() twice, once for each line.",
      expectedOutput: "Hello, LearnVeda!\nWelcome to Day 1!",
    },
    {
      id: "e2",
      title: "Your Info Card",
      description: "Create variables for your name, city, and favorite subject. Then print them in one formatted sentence using an f-string.",
      hint: 'Use f"..." to embed variables: f"My name is {name}"',
      expectedOutput: "(varies based on your name/city/subject)",
    },
    {
      id: "e3",
      title: "Type Detective",
      description: "Create one variable of each type: int, float, str, bool. Print each variable AND its type using type().",
      hint: "type(42) returns <class 'int'>",
      expectedOutput: "(four variables + four type() outputs)",
    },
  ],
};

/* ─── Phase badge color ──────────────────────────────────────────────────── */
const PHASE_COLORS: Record<number, string> = {
  1: "bg-green-500/10 text-green-600 border-green-500/40",
  2: "bg-blue-500/10 text-blue-600 border-blue-500/40",
  3: "bg-purple-500/10 text-purple-600 border-purple-500/40",
  4: "bg-orange-500/10 text-orange-600 border-orange-500/40",
};

/* ─── PythonDayLesson Component ──────────────────────────────────────────── */

/**
 * Renders a single Python day lesson with theory, code editor, and exercises.
 *
 * @param dayNumber - Which day (1–45) to render
 */
export function PythonDayLesson({ dayNumber = 1 }: { dayNumber?: number }) {
  // In production: fetch day content from API based on dayNumber
  const content = DAY_1_CONTENT; // Use demo content for now

  const [code, setCode]         = useState(content.starterCode); // Editor code state
  const [output, setOutput]     = useState("");                   // Simulated output
  const [activeHint, setActiveHint] = useState<string | null>(null); // Active hint ID
  const [completed, setCompleted]   = useState(false);            // Day completion state
  const [activeTab, setActiveTab]   = useState<"theory" | "exercises">("theory"); // Tab state

  /** Simulate code execution — in production, calls /api/compiler */
  function handleRun() {
    // Simple demo output simulation — real version uses Judge0 API
    const lines = code.split("\n").filter(l => l.includes("print("));
    const simulated = lines.map(l => {
      const match = l.match(/print\("(.+?)"\)/);
      return match ? match[1] : "[output from print()]";
    }).join("\n");
    setOutput(simulated || "Code executed successfully (no print statements found)");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* ── Navigation breadcrumb ────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/programming/python" className="hover:text-brand-500 transition-colors">Python</Link>
        <span>›</span>
        <span>Day {content.day}</span>
      </div>

      {/* ── Day header ───────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={`text-xs ${PHASE_COLORS[content.phase]}`}>
              Phase {content.phase}: {content.phaseName}
            </Badge>
            <Badge variant="outline" className="text-xs gap-1 border-yellow-500/40 text-yellow-600">
              <Star className="h-3 w-3" /> +{content.xp} XP
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Day {content.day}: {content.title}
          </h1>
        </div>

        {/* Mark complete button */}
        <Button
          onClick={() => setCompleted(true)}
          variant={completed ? "outline" : "default"}
          className="gap-1.5 flex-shrink-0"
        >
          <CheckCircle2 className={`h-4 w-4 ${completed ? "text-green-500" : ""}`} />
          {completed ? "Completed!" : "Mark Complete"}
        </Button>
      </div>

      {/* ── Main content tabs ─────────────────────────────────────── */}
      <div className="flex gap-2 mb-4 border-b">
        {[
          { id: "theory" as const,    label: "Theory",     icon: <BookOpen className="h-4 w-4" /> },
          { id: "exercises" as const, label: "Exercises",  icon: <Code2 className="h-4 w-4" />   },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.id
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Theory / Exercises ──────────────────────────── */}
        <div>
          {activeTab === "theory" && (
            <div
              className="prose prose-sm dark:prose-invert max-w-none rounded-2xl border bg-card p-5"
              dangerouslySetInnerHTML={{ __html: content.theory }}
            />
          )}
          {activeTab === "exercises" && (
            <div className="space-y-3">
              {content.exercises.map((ex, i) => (
                <div key={ex.id} className="rounded-2xl border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 text-xs font-bold">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">{ex.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">{ex.description}</p>
                  <button
                    onClick={() => setActiveHint(activeHint === ex.id ? null : ex.id)}
                    className="flex items-center gap-1 text-xs text-brand-500 hover:underline"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    {activeHint === ex.id ? "Hide hint" : "Show hint"}
                  </button>
                  {activeHint === ex.id && (
                    <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded-lg">
                      💡 {ex.hint}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Code Editor + Output ───────────────────────── */}
        <div className="space-y-3">
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Code Editor</span>
              </div>
              <Button size="sm" onClick={handleRun} className="gap-1 h-7 text-xs">
                <Play className="h-3 w-3" /> Run
              </Button>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm bg-transparent resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>

          {/* Output panel */}
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/30">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Output</span>
            </div>
            <pre className="p-4 font-mono text-sm text-foreground min-h-[80px]">
              {output || <span className="text-muted-foreground italic">Click "Run" to see output</span>}
            </pre>
          </div>
        </div>
      </div>

      {/* ── Day navigation ────────────────────────────────────────── */}
      <div className="flex justify-between mt-6 pt-4 border-t">
        <Link href={`/programming/python/day-${String(Math.max(1, content.day - 1)).padStart(2, "0")}`}>
          <Button variant="outline" disabled={content.day === 1} className="gap-1">
            <ChevronLeft className="h-4 w-4" /> Day {content.day - 1}
          </Button>
        </Link>
        <Link href={`/programming/python/day-${String(Math.min(45, content.day + 1)).padStart(2, "0")}`}>
          <Button className="gap-1">
            Day {content.day + 1} <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
