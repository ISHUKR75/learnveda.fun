/**
 * @file app/(platform)/learn/class-9/[subject]/[chapter]/page.tsx
 * @description Individual chapter learning page for Class 9
 * Route: /learn/class-9/[subject]/[chapter]
 * Shows: Theory content, key concepts, simulation (if applicable), quiz link, navigation
 * This is the core learning experience — production-ready content delivery
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, ChevronLeft, BookOpen, Star, Clock,
  Play, FlaskConical, CheckCircle2, ArrowRight, Lightbulb,
  Target, FileText, HelpCircle,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Chapter Content Data ───────────────────────────────────────────────── */
// Chapter content with theory, key points, formulas, and example questions
// In production this data comes from MongoDB via the course-service API
const CHAPTER_CONTENT: Record<string, Record<string, {
  title:       string;
  objective:   string;
  theoryPoints: { heading: string; content: string }[];
  keyFormulas?: { label: string; formula: string }[];
  keyPoints:   string[];
  hasSimulation: boolean;
  simulationDesc?: string;
  sampleQuestions: { question: string; options: string[]; answer: number }[];
  prevChapter?: { id: string; title: string };
  nextChapter?: { id: string; title: string };
}>> = {
  mathematics: {
    "chapter-01": {
      title:     "Number Systems",
      objective: "Understand rational and irrational numbers, real numbers on the number line, and decimal expansions.",
      theoryPoints: [
        {
          heading: "Natural and Whole Numbers",
          content:  "Natural numbers are counting numbers: 1, 2, 3, … Whole numbers include 0: 0, 1, 2, 3, … Integers include negatives: …, -2, -1, 0, 1, 2, …",
        },
        {
          heading: "Rational Numbers",
          content:  "A rational number is a number that can be written as p/q where p and q are integers and q ≠ 0. Examples: 1/2, -3/4, 5. Every integer is a rational number. Rational numbers have either terminating or repeating decimal expansions.",
        },
        {
          heading: "Irrational Numbers",
          content:  "Numbers that cannot be written as p/q. Examples: √2, √3, π. Their decimal expansions are non-terminating and non-repeating. √2 = 1.41421356… never repeats or terminates.",
        },
        {
          heading: "Real Numbers",
          content:  "The set of all rational and irrational numbers together form the Real Numbers (ℝ). Every point on the number line corresponds to a unique real number.",
        },
        {
          heading: "Laws of Exponents for Real Numbers",
          content:  "For positive real bases: aᵐ · aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ, (ab)ⁿ = aⁿbⁿ. These extend to fractional exponents: a^(1/n) = ⁿ√a.",
        },
      ],
      keyFormulas: [
        { label: "Rational + Irrational",  formula: "p/q form (q ≠ 0) → Rational; else → Irrational" },
        { label: "Terminating Decimal",    formula: "p/q terminates if q = 2ᵃ × 5ᵇ"                  },
        { label: "Power Rule",             formula: "a^(m/n) = ⁿ√(aᵐ)"                               },
        { label: "Product of Surds",       formula: "√a × √b = √(ab)"                                 },
      ],
      keyPoints: [
        "Every rational number can be represented as a terminating or repeating decimal",
        "√p is irrational for any prime p",
        "Between any two distinct real numbers, there are infinitely many real numbers",
        "The decimal expansion of π is 3.14159265…, non-terminating and non-repeating",
        "To represent √n on number line: use Pythagoras theorem (right triangle method)",
      ],
      hasSimulation: false,
      sampleQuestions: [
        {
          question: "Which of the following is an irrational number?",
          options:  ["4/5", "√9", "√7", "0.333..."],
          answer:   2, // √7 (0-indexed)
        },
        {
          question: "The decimal expansion of 1/7 is:",
          options:  ["Terminating", "Non-terminating, non-repeating", "Non-terminating, repeating", "None of these"],
          answer:   2,
        },
        {
          question: "Which statement is FALSE about real numbers?",
          options:  ["Every integer is rational", "√2 is irrational", "π is rational", "0 is a whole number"],
          answer:   2, // π is rational — FALSE
        },
      ],
      nextChapter: { id: "chapter-02", title: "Polynomials" },
    },

    "chapter-02": {
      title:     "Polynomials",
      objective: "Define polynomials, understand the Remainder Theorem and Factor Theorem, and factorise algebraic expressions.",
      theoryPoints: [
        {
          heading: "What is a Polynomial?",
          content:  "A polynomial p(x) is an expression of the form aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀, where the exponents are whole numbers and the coefficients aᵢ are real numbers. The degree is the highest power of x.",
        },
        {
          heading: "Types of Polynomials",
          content:  "Monomial (1 term): 5x². Binomial (2 terms): x² + 3. Trinomial (3 terms): x² + 2x + 1. By degree — Constant (0), Linear (1), Quadratic (2), Cubic (3).",
        },
        {
          heading: "Zeros of a Polynomial",
          content:  "A value of x for which p(x) = 0 is called a zero (or root). A polynomial of degree n has at most n zeros. For p(x) = 2x - 6, the zero is x = 3 since p(3) = 0.",
        },
        {
          heading: "Remainder Theorem",
          content:  "When polynomial p(x) is divided by (x - a), the remainder is p(a). Example: divide p(x) = x³ - 3x + 5 by (x - 1): remainder = p(1) = 1 - 3 + 5 = 3.",
        },
        {
          heading: "Factor Theorem",
          content:  "A polynomial p(x) has (x - a) as a factor if and only if p(a) = 0. This allows us to factorise by finding zeros.",
        },
        {
          heading: "Algebraic Identities",
          content:  "(a + b)² = a² + 2ab + b², (a - b)² = a² - 2ab + b², a² - b² = (a+b)(a-b), (a+b+c)² = a²+b²+c²+2ab+2bc+2ca, (a+b)³ = a³+3a²b+3ab²+b³.",
        },
      ],
      keyFormulas: [
        { label: "(a+b)²",   formula: "a² + 2ab + b²"         },
        { label: "(a-b)²",   formula: "a² - 2ab + b²"         },
        { label: "a²-b²",    formula: "(a+b)(a-b)"            },
        { label: "(a+b)³",   formula: "a³ + 3a²b + 3ab² + b³" },
        { label: "(a-b)³",   formula: "a³ - 3a²b + 3ab² - b³" },
        { label: "a³+b³",    formula: "(a+b)(a²-ab+b²)"       },
        { label: "a³-b³",    formula: "(a-b)(a²+ab+b²)"       },
      ],
      keyPoints: [
        "Degree of zero polynomial is not defined",
        "A polynomial of degree 1 is called linear, degree 2 is quadratic, degree 3 is cubic",
        "Factor Theorem: p(a)=0 ⟺ (x-a) is a factor of p(x)",
        "Every linear polynomial has exactly one zero",
        "Sum of zeros of ax² + bx + c is -b/a; product is c/a",
      ],
      hasSimulation: false,
      sampleQuestions: [
        {
          question: "If p(x) = x³ - 3x² + 4x - 12, then p(3) is:",
          options:  ["0", "6", "-6", "12"],
          answer:   0, // p(3)=27-27+12-12=0
        },
        {
          question: "Which is NOT an identity?",
          options:  ["(a+b)² = a²+2ab+b²", "a²-b² = (a-b)²", "a²-b² = (a+b)(a-b)", "(a+b)³ = a³+3a²b+3ab²+b³"],
          answer:   1,
        },
      ],
      prevChapter: { id: "chapter-01", title: "Number Systems" },
      nextChapter: { id: "chapter-03", title: "Coordinate Geometry" },
    },
  },

  science: {
    "chapter-07": {
      title:     "Motion",
      objective: "Understand distance, displacement, speed, velocity, acceleration, and interpret motion graphs.",
      theoryPoints: [
        {
          heading: "Distance and Displacement",
          content:  "Distance is the total path length covered. Displacement is the shortest straight-line distance from start to end point, with direction. Distance is a scalar; displacement is a vector.",
        },
        {
          heading: "Speed and Velocity",
          content:  "Speed = Distance / Time (scalar). Velocity = Displacement / Time (vector). Average speed may differ from average velocity if the path is not straight. SI unit: m/s.",
        },
        {
          heading: "Acceleration",
          content:  "Acceleration = Change in velocity / Time = (v - u) / t. It is a vector. Positive acceleration means speeding up in the direction of motion; negative (deceleration/retardation) means slowing down. SI unit: m/s².",
        },
        {
          heading: "Equations of Uniformly Accelerated Motion",
          content:  "Three kinematic equations for constant acceleration: v = u + at, s = ut + ½at², v² = u² + 2as. Here u = initial velocity, v = final velocity, a = acceleration, s = displacement, t = time.",
        },
        {
          heading: "Graphical Representation",
          content:  "Distance-Time (d-t) graph: slope = speed. Velocity-Time (v-t) graph: slope = acceleration, area under curve = displacement. Uniform motion → straight line on d-t. Uniformly accelerated → straight line on v-t (parabola on d-t).",
        },
      ],
      keyFormulas: [
        { label: "First equation",  formula: "v = u + at"         },
        { label: "Second equation", formula: "s = ut + ½at²"      },
        { label: "Third equation",  formula: "v² = u² + 2as"      },
        { label: "Average velocity",formula: "(u + v) / 2"        },
        { label: "Acceleration",    formula: "a = (v - u) / t"    },
      ],
      keyPoints: [
        "Displacement can be zero even when distance is not (circular motion)",
        "Slope of v-t graph = acceleration",
        "Area under v-t graph = displacement",
        "Uniform circular motion has constant speed but changing velocity (direction changes)",
        "For free fall under gravity: a = g ≈ 9.8 m/s² downward",
      ],
      hasSimulation: true,
      simulationDesc: "Interactive motion simulation — set initial velocity and acceleration, observe position-time and velocity-time graphs in real time. Visualize uniform and non-uniform motion.",
      sampleQuestions: [
        {
          question: "A car moves 60 km in 1 hour then 40 km in next hour. Its average speed is:",
          options:  ["40 km/h", "50 km/h", "60 km/h", "100 km/h"],
          answer:   1, // (60+40)/2h = 50
        },
        {
          question: "Slope of a distance-time graph gives:",
          options:  ["Acceleration", "Speed", "Displacement", "Force"],
          answer:   1,
        },
      ],
      prevChapter: { id: "chapter-06", title: "Tissues" },
      nextChapter: { id: "chapter-08", title: "Force and Laws of Motion" },
    },
  },
};

/* ─── Default Chapter Content ────────────────────────────────────────────── */
// Returns generic content when specific chapter isn't in the local data
function getChapterContent(subject: string, chapter: string) {
  const subjectData = CHAPTER_CONTENT[subject];
  if (subjectData?.[chapter]) return subjectData[chapter];

  // Generic fallback
  const chapterNum = parseInt(chapter.replace("chapter-", "") || "1");
  return {
    title:          `Chapter ${chapterNum}`,
    objective:      "Master this chapter with structured lessons, key concepts, and practice questions.",
    theoryPoints:   [
      { heading: "Introduction",    content: "This chapter covers the fundamental concepts of this topic. Read carefully and take notes." },
      { heading: "Key Concepts",    content: "Understand the core definitions and principles before moving to solved examples." },
      { heading: "Applications",    content: "Real-world applications help solidify understanding. Practice with examples." },
    ],
    keyPoints:      ["Study NCERT theory thoroughly", "Solve all examples", "Practice exercise questions", "Revise formulas daily"],
    hasSimulation:  false,
    sampleQuestions: [
      { question: "Which of the following is the correct statement?", options: ["Option A", "Option B", "Option C", "Option D"], answer: 0 },
    ],
  };
}

/* ─── generateMetadata — per chapter SEO ────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}): Promise<Metadata> {
  const { subject, chapter } = await params;
  const data = getChapterContent(subject, chapter);

  return {
    title:       `${data.title} — Class 9 ${subject.replace(/-/g," ")} | LearnVeda`,
    description: data.objective,
    keywords:    [`Class 9 ${data.title}`, `NCERT ${data.title}`, "CBSE Class 9"],
  };
}

/* ─── Chapter Page Component ─────────────────────────────────────────────── */
export default async function Class9ChapterPage({
  params,
}: {
  params: Promise<{ subject: string; chapter: string }>;
}) {
  const { subject, chapter } = await params;
  const data = getChapterContent(subject, chapter);

  const subjectLabel = subject.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const chapterNum   = parseInt(chapter.replace("chapter-", "") || "1");

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <Link href="/learn"                          className="hover:text-foreground transition-colors">Learn</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/learn/class-9"                  className="hover:text-foreground transition-colors">Class 9</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/learn/class-9/${subject}`}     className="hover:text-foreground transition-colors capitalize">{subjectLabel}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Chapter {chapterNum}</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── Article / Theory Content ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Chapter title */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Chapter {chapterNum}</span>
                {data.hasSimulation && (
                  <Badge className="text-[9px] py-0 bg-green-500/10 text-green-600 border-green-500/20">
                    ⚡ Simulation Available
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{data.title}</h1>

              {/* Learning objective */}
              <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">Learning Objective</div>
                  <p className="text-sm text-muted-foreground">{data.objective}</p>
                </div>
              </div>
            </div>

            {/* Theory sections */}
            <div className="space-y-6">
              {data.theoryPoints.map((point, i) => (
                <div key={i} className="space-y-2">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {point.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed pl-8">{point.content}</p>
                </div>
              ))}
            </div>

            {/* Key Formulas (if any) */}
            {"keyFormulas" in data && data.keyFormulas && data.keyFormulas.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                  Key Formulas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyFormulas.map((f) => (
                    <div key={f.label} className="rounded-xl border bg-card p-3">
                      <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                      <div className="font-mono text-sm font-semibold text-foreground">{f.formula}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Simulation section */}
            {data.hasSimulation && (
              <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h2 className="font-semibold text-green-700 dark:text-green-300">Interactive Simulation</h2>
                </div>
                {data.simulationDesc && (
                  <p className="text-sm text-muted-foreground mb-4">{data.simulationDesc}</p>
                )}
                <Button asChild variant="outline" size="sm" className="border-green-500/30 text-green-700 dark:text-green-300">
                  <Link href={`/simulations/physics?topic=${subject}-${chapter}`}>
                    <Play className="h-3.5 w-3.5 mr-1" />
                    Launch Simulation
                  </Link>
                </Button>
              </div>
            )}

            {/* Sample Questions */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-primary" />
                Sample Questions
              </h2>
              <div className="space-y-4">
                {data.sampleQuestions.map((q, qi) => (
                  <div key={qi} className="rounded-xl border bg-card p-4">
                    <p className="font-medium text-sm mb-3">Q{qi + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className={`rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                            oi === q.answer
                              ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300"
                              : "border-border bg-muted/30 text-muted-foreground"
                          }`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                          {oi === q.answer && <CheckCircle2 className="inline h-3.5 w-3.5 ml-1 text-green-600" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Link to full practice */}
              <div className="mt-4 flex justify-center">
                <Button asChild variant="outline" size="sm">
                  <Link href="/practice">
                    <Star className="h-3.5 w-3.5 mr-1" />
                    Take Full Chapter Quiz
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* ─── Sidebar ──────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Chapter progress card */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4">Your Progress</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-primary rounded-full" /> {/* 0% — not started */}
                </div>
                <span className="text-xs text-muted-foreground">0%</span>
              </div>
              <Button className="w-full" size="sm">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Mark as Complete
              </Button>
            </div>

            {/* Key Points card */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Key Points to Remember
              </h3>
              <ul className="space-y-2">
                {data.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="h-4 w-4 rounded-full bg-primary/10 text-primary text-[9px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapter resources */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3">Resources</h3>
              <div className="space-y-2">
                {[
                  { label: "NCERT Solutions",  href: "/practice", icon: BookOpen },
                  { label: "Practice Quiz",    href: "/practice", icon: Star     },
                  { label: "Simulations",      href: "/simulations", icon: FlaskConical },
                ].map((r) => {
                  const RIcon = r.icon;
                  return (
                    <Link
                      key={r.label}
                      href={r.href}
                      className="flex items-center gap-2 text-sm py-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <RIcon className="h-3.5 w-3.5" />
                      {r.label}
                      <ArrowRight className="h-3 w-3 ml-auto" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Chapter Navigation ────────────────────────────────────────── */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t pt-6">
          {/* Previous chapter */}
          {data.prevChapter ? (
            <Link
              href={`/learn/class-9/${subject}/${data.prevChapter.id}`}
              className="group flex items-center gap-2 rounded-xl border bg-card px-4 py-3 hover:shadow-md transition-all"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground">Previous</div>
                <div className="text-sm font-medium">{data.prevChapter.title}</div>
              </div>
            </Link>
          ) : (
            <div /> // Spacer when no previous
          )}

          {/* Next chapter */}
          {data.nextChapter ? (
            <Link
              href={`/learn/class-9/${subject}/${data.nextChapter.id}`}
              className="group flex items-center gap-2 rounded-xl border bg-card px-4 py-3 hover:shadow-md transition-all text-right ml-auto"
            >
              <div>
                <div className="text-[10px] text-muted-foreground">Next</div>
                <div className="text-sm font-medium">{data.nextChapter.title}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ) : (
            <div /> // Spacer
          )}
        </div>
      </div>
    </div>
  );
}
