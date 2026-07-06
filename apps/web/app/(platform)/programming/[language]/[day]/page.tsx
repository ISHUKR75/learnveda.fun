/**
 * @file app/(platform)/programming/[language]/[day]/page.tsx
 * @description Individual day learning page for any programming language track
 * Route: /programming/[language]/[day]  (e.g. /programming/python/day-1)
 *
 * Each "day" is a structured lesson covering:
 *   - Learning objectives for the day
 *   - Theory section with explanations and code examples
 *   - Practice problems (3 per day)
 *   - Exercise to complete before moving on
 *   - Navigation to previous/next day
 *
 * Server component — SSG at build time for performance.
 * Code examples rendered with syntax highlighting (CSS-based for SSR safety).
 */

import type { Metadata } from "next"; // SEO
import { notFound }      from "next/navigation"; // 404
import Link              from "next/link"; // Navigation
import {
  ChevronRight, ChevronLeft, BookOpen, Code2,
  Target, CheckCircle2, Play, ArrowRight, Clock,
  Lightbulb, Terminal, Star,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── Language Metadata ──────────────────────────────────────────────────── */
const LANGUAGE_META: Record<string, {
  name:       string;  // Display name
  emoji:      string;  // Language emoji
  totalDays:  number;  // Total days in the plan
  color:      string;  // Tailwind color class
}> = {
  python:     { name: "Python",     emoji: "🐍", totalDays: 45, color: "blue"   },
  javascript: { name: "JavaScript", emoji: "🟨", totalDays: 45, color: "yellow" },
  java:       { name: "Java",       emoji: "☕", totalDays: 60, color: "orange" },
  cpp:        { name: "C++",        emoji: "⚡", totalDays: 60, color: "purple" },
  c:          { name: "C",          emoji: "🔧", totalDays: 30, color: "blue"   },
  rust:       { name: "Rust",       emoji: "🦀", totalDays: 45, color: "orange" },
  golang:     { name: "Go",         emoji: "🐹", totalDays: 30, color: "cyan"   },
  typescript: { name: "TypeScript", emoji: "🔷", totalDays: 30, color: "blue"   },
  kotlin:     { name: "Kotlin",     emoji: "🎯", totalDays: 30, color: "purple" },
  swift:      { name: "Swift",      emoji: "🍎", totalDays: 30, color: "orange" },
  dart:       { name: "Dart",       emoji: "🎯", totalDays: 30, color: "blue"   },
  sql:        { name: "SQL",        emoji: "🗄️", totalDays: 30, color: "green"  },
  r:          { name: "R",          emoji: "📊", totalDays: 30, color: "blue"   },
};

/* ─── Lesson Content Type ────────────────────────────────────────────────── */
interface LessonSection {
  type:  "heading" | "p" | "code" | "ul" | "note" | "exercise";
  text?: string;          // For heading/p/note/exercise
  code?: string;          // For code blocks
  lang?: string;          // For code syntax highlighting label
  items?: string[];       // For ul
}

interface DayLesson {
  title:       string;   // Day title (e.g., "Introduction to Python & Setup")
  objectives:  string[]; // Learning objectives
  duration:    string;   // Estimated study time
  sections:    LessonSection[]; // Lesson content
  practice: {
    question: string;
    hint:     string;
    solution?: string;
  }[];
  prevDay?: number; // Previous day number
  nextDay?: number; // Next day number
}

/* ─── Lesson Database ────────────────────────────────────────────────────── */
// Key format: `${language}-day-${number}` (e.g. "python-day-1")
// In production: fetched from MongoDB content collection via content-service
const LESSONS: Record<string, DayLesson> = {
  /* ── Python Day 1 ───────────────────────────────────────────────── */
  "python-day-1": {
    title:      "Introduction to Python & Setup",
    objectives: [
      "Understand what Python is and where it's used",
      "Install Python 3.x and VS Code on your machine",
      "Run your first Python program",
      "Understand print(), variables, and basic data types",
    ],
    duration:   "2–3 hours",
    sections: [
      { type: "heading", text: "What is Python?" },
      { type: "p",       text: "Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It's known for its clean, readable syntax that feels almost like writing English. Python is used for web development (Django, FastAPI), data science (pandas, NumPy), machine learning (TensorFlow, PyTorch), automation, and more." },
      { type: "ul",      items: ["Interpreted: runs line by line, no compilation needed", "Dynamically typed: variable types are assigned at runtime", "Cross-platform: runs on Windows, macOS, Linux", "Open source: free to use and massive community"] },
      { type: "heading", text: "Your First Python Program" },
      { type: "p",       text: "After installing Python, open a terminal and type 'python3'. Then type:" },
      { type: "code",    lang: "python", code: `# This is a comment in Python — lines starting with # are ignored

# print() displays output to the terminal
print("Hello, World!")

# Variables — no need to declare types
name = "Aarav"     # This is a string
age  = 16          # This is an integer
gpa  = 9.5         # This is a float (decimal number)
active = True      # This is a boolean (True/False)

# f-strings: the modern way to embed variables in strings (Python 3.6+)
print(f"My name is {name}, I am {age} years old and my GPA is {gpa}")

# type() tells you the data type of any variable
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(gpa))     # <class 'float'>
print(type(active))  # <class 'bool'>` },
      { type: "heading", text: "Data Types in Python" },
      { type: "p",       text: "Python has 4 basic (scalar) data types you must know:" },
      { type: "ul",      items: [
        "int: whole numbers — 0, 1, -5, 1000000",
        "float: decimal numbers — 3.14, -0.5, 9.8",
        "str: text/strings — 'hello', 'LearnVeda', \"Python\"",
        "bool: True or False (capital T/F, no quotes)",
      ]},
      { type: "heading", text: "Basic Arithmetic" },
      { type: "code",    lang: "python", code: `# Arithmetic operators in Python
x = 10
y = 3

print(x + y)    # Addition:       13
print(x - y)    # Subtraction:    7
print(x * y)    # Multiplication: 30
print(x / y)    # Division:       3.3333 (always returns float)
print(x // y)   # Floor division: 3 (integer quotient)
print(x % y)    # Modulus:        1 (remainder)
print(x ** y)   # Exponentiation: 1000 (10^3)` },
      { type: "note",    text: "🔑 Key Insight: In Python, 10/3 = 3.3333 (float), but 10//3 = 3 (integer). The // operator gives you the floor division (integer quotient). This is used a LOT in DSA problems." },
      { type: "heading", text: "Input from User" },
      { type: "code",    lang: "python", code: `# input() reads a line from the terminal as a STRING
name = input("Enter your name: ")
print(f"Hello, {name}!")

# To get a number, you must convert the string to int/float
age = int(input("Enter your age: "))   # int() converts string to integer
print(f"Next year you'll be {age + 1}")

# int() will throw a ValueError if you type "abc" — we'll handle exceptions on Day 8` },
      { type: "exercise", text: "Mini Project: Write a Python program that asks the user for their name, age, and favorite subject, then prints a formatted summary. Store each input in a separate variable." },
    ],
    practice: [
      {
        question: "Write a program that takes two numbers as input and prints their sum, difference, product, and quotient.",
        hint:     "Use input(), int() to convert strings, and f-strings to format the output.",
        solution: "a = int(input())\nb = int(input())\nprint(f'{a+b} {a-b} {a*b} {a/b:.2f}')",
      },
      {
        question: "Write a program to calculate the area and perimeter of a rectangle given its length and width.",
        hint:     "Area = length × width. Perimeter = 2 × (length + width).",
      },
      {
        question: "Swap two variables WITHOUT using a third variable. Print the values before and after swapping.",
        hint:     "Python has a unique swap syntax: a, b = b, a — no temp variable needed!",
      },
    ],
    prevDay: undefined,
    nextDay:  2,
  },
  /* ── Python Day 2 ───────────────────────────────────────────────── */
  "python-day-2": {
    title:      "Control Flow: if/elif/else & Comparison Operators",
    objectives: [
      "Use comparison operators (==, !=, <, >, <=, >=)",
      "Write if, elif, and else blocks",
      "Understand boolean logic (and, or, not)",
      "Build decision-making programs",
    ],
    duration:   "2–3 hours",
    sections: [
      { type: "heading", text: "Comparison Operators" },
      { type: "code",    lang: "python", code: `# Comparison operators — always return True or False
x = 10
y = 5

print(x == y)   # False — equal to
print(x != y)   # True  — not equal to
print(x > y)    # True  — greater than
print(x < y)    # False — less than
print(x >= y)   # True  — greater than or equal
print(x <= y)   # False — less than or equal

# IMPORTANT: == compares values, = assigns values
# age = 18      # assigns 18 to age
# age == 18     # checks IF age is 18` },
      { type: "heading", text: "if / elif / else" },
      { type: "code",    lang: "python", code: `# Basic if/elif/else structure
marks = int(input("Enter your marks (0-100): "))

if marks >= 90:
    grade = "A+"
    print(f"Excellent! Grade: {grade}")
elif marks >= 80:
    grade = "A"
    print(f"Very Good! Grade: {grade}")
elif marks >= 70:
    grade = "B"
    print(f"Good! Grade: {grade}")
elif marks >= 60:
    grade = "C"
    print(f"Average. Grade: {grade}")
elif marks >= 40:
    grade = "D"
    print(f"Below Average. Grade: {grade}")
else:
    grade = "F"
    print(f"Fail. Grade: {grade}")

# IMPORTANT: Python uses INDENTATION (4 spaces) to define code blocks
# There are NO curly braces {} like in C/Java/JavaScript` },
      { type: "heading", text: "Boolean Logic: and, or, not" },
      { type: "code",    lang: "python", code: `age  = 17
marks = 85

# and: BOTH conditions must be True
if age >= 16 and marks >= 80:
    print("Eligible for scholarship")

# or: AT LEAST ONE condition must be True
if age < 16 or marks < 40:
    print("Need improvement")

# not: REVERSES the boolean value
passed = True
if not passed:
    print("Better luck next time")
else:
    print("Congratulations!")

# Chained comparisons — unique Python feature
x = 15
if 10 < x < 20:     # Equivalent to: x > 10 and x < 20
    print(f"{x} is between 10 and 20")` },
      { type: "note",    text: "⚠️ Common Error: if age = 18: will give a SyntaxError. Assignment (=) is not allowed inside if conditions. Always use == for comparison." },
    ],
    practice: [
      { question: "Write a BMI calculator — take weight (kg) and height (m) as input. Calculate BMI = weight/height². Classify: <18.5 Underweight, 18.5–24.9 Normal, 25–29.9 Overweight, >=30 Obese.", hint: "BMI = weight / (height ** 2)" },
      { question: "Write a program to check if a year is a leap year. A year is a leap year if it is divisible by 4 AND (not divisible by 100 OR divisible by 400).", hint: "Use modulus operator %: year % 4 == 0" },
      { question: "Take 3 numbers as input. Print the largest number WITHOUT using any built-in functions (no max(), no sorted()).", hint: "Use if/elif/else with comparison operators." },
    ],
    prevDay: 1,
    nextDay:  3,
  },
};

/* ─── Static Params ──────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  /* Generate routes for Python Days 1–45 only (other languages on demand) */
  const params = [];
  for (let day = 1; day <= 45; day++) {
    params.push({ language: "python", day: `day-${day}` });
  }
  for (let day = 1; day <= 45; day++) {
    params.push({ language: "javascript", day: `day-${day}` });
  }
  return params;
}

/* ─── Dynamic Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: { params: Promise<{ language: string; day: string }> }): Promise<Metadata> {
  const { language, day } = await params;
  const lang   = LANGUAGE_META[language];
  const lesson = LESSONS[`${language}-${day}`];
  if (!lang) return { title: "Not Found" };

  return {
    title: `${lang.emoji} ${lang.name} ${day.charAt(0).toUpperCase() + day.slice(1)}: ${lesson?.title || "Lesson"} — LearnVeda`,
    description: lesson?.objectives?.join(". ") ?? `Learn ${lang.name} day by day on LearnVeda.`,
  };
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default async function ProgrammingDayPage({
  params,
}: { params: Promise<{ language: string; day: string }> }) {
  const { language, day } = await params;

  const lang   = LANGUAGE_META[language]; // Language metadata
  if (!lang) notFound(); // Unknown language

  /* Parse day number from "day-1" → 1 */
  const dayNumber = parseInt(day.replace("day-", ""), 10);
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > lang.totalDays) notFound();

  const lessonKey = `${language}-day-${dayNumber}`; // Look up lesson
  const lesson    = LESSONS[lessonKey];              // Get lesson content

  /* Generic lesson template when specific content not yet written */
  const genericLesson: DayLesson = {
    title:      `Day ${dayNumber} — ${lang.name} Learning Track`,
    objectives: [`Continue building your ${lang.name} skills`, "Practice coding problems", "Apply concepts from previous days"],
    duration:   "2–3 hours",
    sections:   [
      { type: "p", text: `Day ${dayNumber} content for ${lang.name} is being finalized by our curriculum team. Check back soon!` },
      { type: "note", text: `💡 While you wait, revisit Day ${Math.max(1, dayNumber - 1)} content to solidify your understanding.` },
    ],
    practice: [
      { question: `Write a ${lang.name} program using concepts from the past ${dayNumber - 1} days.`, hint: "Practice makes permanent!" },
    ],
    prevDay: dayNumber > 1 ? dayNumber - 1 : undefined,
    nextDay: dayNumber < lang.totalDays ? dayNumber + 1 : undefined,
  };

  const currentLesson = lesson ?? genericLesson; // Use specific or generic lesson

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/programming" className="hover:text-foreground transition-colors">Programming</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/programming/${language}`} className="hover:text-foreground transition-colors capitalize">{lang.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Day {dayNumber}</span>
          </nav>

          {/* Heading */}
          <div className="flex items-start gap-4">
            <div className="text-3xl">{lang.emoji}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary">{lang.name}</Badge>
                <Badge variant="outline" className="text-xs">Day {dayNumber}/{lang.totalDays}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />{currentLesson.duration}
                </span>
              </div>
              <h1 className="text-2xl font-bold leading-tight">{currentLesson.title}</h1>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-${lang.color}-500 rounded-full`}
                style={{ width: `${(dayNumber / lang.totalDays) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {dayNumber}/{lang.totalDays} days ({Math.round((dayNumber / lang.totalDays) * 100)}% complete)
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Learning objectives */}
        <section className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-500" />
            Today&apos;s Learning Objectives
          </h2>
          <ul className="space-y-2">
            {currentLesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                {obj}
              </li>
            ))}
          </ul>
        </section>

        {/* Lesson content */}
        <section className="space-y-5">
          {currentLesson.sections.map((section, i) => {
            switch (section.type) {
              case "heading":
                return (
                  <h2 key={i} className="text-xl font-bold mt-6 mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-brand-500" />
                    {section.text}
                  </h2>
                );
              case "p":
                return <p key={i} className="text-muted-foreground leading-relaxed">{section.text}</p>;
              case "ul":
                return (
                  <ul key={i} className="space-y-2">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-brand-500 mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                );
              case "code":
                return (
                  <div key={i} className="rounded-xl border border-border/40 overflow-hidden">
                    {/* Code header */}
                    <div className="flex items-center justify-between bg-muted/60 px-4 py-2.5 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground capitalize">{section.lang}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c, idx) => (
                          <span key={idx} className={`h-2.5 w-2.5 rounded-full ${c}`} />
                        ))}
                      </div>
                    </div>
                    {/* Code content */}
                    <pre className="bg-gray-950 p-4 overflow-x-auto text-sm text-green-400 font-mono leading-relaxed">
                      <code>{section.code}</code>
                    </pre>
                  </div>
                );
              case "note":
                return (
                  <div key={i} className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{section.text}</p>
                  </div>
                );
              case "exercise":
                return (
                  <div key={i} className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                    <h3 className="font-semibold text-sm flex items-center gap-2 mb-2">
                      <Code2 className="h-4 w-4 text-green-500" />
                      Mini Exercise
                    </h3>
                    <p className="text-sm text-muted-foreground">{section.text}</p>
                  </div>
                );
              default: return null;
            }
          })}
        </section>

        {/* Practice problems */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Practice Problems
          </h2>
          <div className="space-y-4">
            {currentLesson.practice.map((prob, i) => (
              <div key={i} className="rounded-xl border border-border/40 bg-card p-5">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 font-mono text-xs text-brand-500 bg-brand-500/10 rounded px-2 py-1">
                    P{i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-3">{prob.question}</p>
                    <details className="group">
                      <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-1">
                        <Lightbulb className="h-3.5 w-3.5" /> Hint
                      </summary>
                      <p className="mt-2 text-xs text-muted-foreground bg-muted/40 rounded-lg p-3">{prob.hint}</p>
                    </details>
                    {prob.solution && (
                      <details className="mt-2 group">
                        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Solution
                        </summary>
                        <pre className="mt-2 text-xs font-mono bg-gray-950 text-green-400 rounded-lg p-3 overflow-x-auto">
                          {prob.solution}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          {currentLesson.prevDay ? (
            <Button asChild variant="outline" className="gap-1.5">
              <Link href={`/programming/${language}/day-${currentLesson.prevDay}`}>
                <ChevronLeft className="h-4 w-4" /> Day {currentLesson.prevDay}
              </Link>
            </Button>
          ) : <div />}

          <Button asChild variant="outline" className="gap-1.5">
            <Link href={`/programming/${language}`}>
              <Play className="h-4 w-4" /> All Days
            </Link>
          </Button>

          {currentLesson.nextDay ? (
            <Button asChild className="gap-1.5">
              <Link href={`/programming/${language}/day-${currentLesson.nextDay}`}>
                Day {currentLesson.nextDay} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Badge variant="outline" className="border-green-500/50 text-green-600 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 mr-2" /> Track Complete!
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
