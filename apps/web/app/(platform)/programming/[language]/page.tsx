/**
 * @file app/(platform)/programming/[language]/page.tsx
 * @description Individual programming language track page
 * Route: /programming/[language]  (e.g. /programming/python)
 * Shows: Language overview, day-wise plan, syllabus, and start button
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock, ArrowRight, ChevronRight, Code2, Play, Star,
  CheckCircle2, BookOpen, Target, Zap,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Language Track Data ────────────────────────────────────────────────── */
// Complete language data — in production this comes from the course-service MongoDB API
const LANGUAGE_DATA: Record<string, {
  name:       string;
  emoji:      string;
  tagline:    string;
  description:string;
  days:       number;
  level:      string;
  color:      string;
  bgClass:    string;
  prerequisites: string[];
  jobRoles:   string[];
  curriculum: { phase: string; days: string; topics: string[] }[];
  features:   string[];
}> = {
  python: {
    name:        "Python",
    emoji:       "🐍",
    tagline:     "The most beginner-friendly programming language",
    description: "Python is the world's most popular language for data science, AI/ML, web development, automation, and scripting. Its clean syntax makes it ideal for beginners, while its powerful libraries make it essential for professionals.",
    days:        45,
    level:       "Beginner",
    color:       "blue",
    bgClass:     "from-blue-500/10 to-cyan-500/10",
    prerequisites: ["Basic computer usage", "No prior coding experience needed"],
    jobRoles:    ["Data Scientist", "ML Engineer", "Backend Developer", "Automation Engineer", "Data Analyst"],
    curriculum: [
      { phase:"Phase 1 — Python Basics",      days:"Day 01–07", topics:["Variables & Data Types","Input/Output","Operators","String Methods","Lists & Tuples"]             },
      { phase:"Phase 2 — Control Flow",       days:"Day 08–14", topics:["if/elif/else","for loops","while loops","break/continue","Nested loops"]                         },
      { phase:"Phase 3 — Functions",          days:"Day 15–21", topics:["Defining Functions","Arguments & Returns","Lambda Functions","Recursion","Decorators"]           },
      { phase:"Phase 4 — OOP",                days:"Day 22–28", topics:["Classes & Objects","Inheritance","Polymorphism","Encapsulation","Magic Methods"]                 },
      { phase:"Phase 5 — Advanced Python",    days:"Day 29–36", topics:["File I/O","Exception Handling","Generators","Iterators","Context Managers","Comprehensions"]    },
      { phase:"Phase 6 — Libraries & Project",days:"Day 37–45", topics:["NumPy & Pandas basics","Web scraping with requests","REST APIs","Final Project: CLI App/Web Scraper"] },
    ],
    features: [
      "45 structured daily lessons",
      "Interactive online Python compiler",
      "100+ exercises with solutions",
      "Final capstone project",
      "FAANG-style Python interview questions",
    ],
  },

  javascript: {
    name:        "JavaScript",
    emoji:       "⚡",
    tagline:     "The language that powers the entire web",
    description: "JavaScript is the only programming language that runs natively in browsers, making it essential for frontend development. With Node.js, it also powers the backend. Full-stack JavaScript (React + Node) is the most in-demand skill in web development.",
    days:        30,
    level:       "Beginner",
    color:       "yellow",
    bgClass:     "from-yellow-500/10 to-amber-500/10",
    prerequisites: ["Basic HTML & CSS (helpful but not required)"],
    jobRoles:    ["Frontend Developer", "Full-Stack Developer", "React Developer", "Node.js Engineer"],
    curriculum: [
      { phase:"Phase 1 — JS Fundamentals",  days:"Day 01–07", topics:["Variables (let/const/var)","Data Types","Operators","Control Flow","Functions","Arrays & Objects"] },
      { phase:"Phase 2 — DOM & Browser",    days:"Day 08–14", topics:["DOM Manipulation","Event Listeners","Fetch API","Local Storage","ES6 Classes","Modules"]          },
      { phase:"Phase 3 — Async JavaScript", days:"Day 15–21", topics:["Callbacks","Promises","async/await","Error Handling","Closures","Prototype Chain"]                },
      { phase:"Phase 4 — Modern JS & Node", days:"Day 22–30", topics:["Node.js Basics","Express API","npm","REST APIs","React Intro","Final Project"]                     },
    ],
    features: [
      "30-day structured curriculum",
      "In-browser JS playground",
      "Build real interactive projects",
      "React.js introduction included",
      "Node.js and APIs coverage",
    ],
  },

  java: {
    name:        "Java",
    emoji:       "☕",
    tagline:     "Enterprise-grade OOP for software engineers",
    description: "Java is the most popular language for FAANG SDE interviews and Android development. Its strict OOP model builds strong programming fundamentals. Companies like Google, Amazon, Microsoft, and Flipkart extensively use Java in production.",
    days:        45,
    level:       "Intermediate",
    color:       "orange",
    bgClass:     "from-orange-500/10 to-amber-500/10",
    prerequisites: ["Basic programming concepts (any language helps)", "Understanding of variables and functions"],
    jobRoles:    ["Software Development Engineer", "Backend Developer", "Android Developer", "DevOps Engineer"],
    curriculum: [
      { phase:"Phase 1 — Java Basics",         days:"Day 01–08", topics:["Setup & Hello World","Variables & Types","Operators","Control Flow","Arrays","Methods"]         },
      { phase:"Phase 2 — OOP",                 days:"Day 09–18", topics:["Classes & Objects","Constructors","Inheritance","Polymorphism","Abstraction","Interfaces"]      },
      { phase:"Phase 3 — Java Advanced",       days:"Day 19–28", topics:["Collections (List, Map, Set)","Generics","Exception Handling","File I/O","Streams API"]         },
      { phase:"Phase 4 — Concurrency",         days:"Day 29–36", topics:["Threads","Runnable","ExecutorService","Synchronized","CompletableFuture"]                      },
      { phase:"Phase 5 — Interview Prep",      days:"Day 37–45", topics:["FAANG Java Problems","System Design Basics","Spring Boot Intro","Final Project"]                },
    ],
    features: [
      "45-day interview-focused curriculum",
      "Online Java compiler (JDK 21)",
      "150+ FAANG-style problems",
      "Spring Boot introduction",
      "Mock interview questions",
    ],
  },

  cpp: {
    name:        "C++",
    emoji:       "🔧",
    tagline:     "High-performance systems and competitive programming",
    description: "C++ is the standard language for Competitive Programming (Codeforces, LeetCode, ICPC). It gives you full control over memory, making it essential for game engines, operating systems, and performance-critical applications.",
    days:        30,
    level:       "Intermediate",
    color:       "indigo",
    bgClass:     "from-indigo-500/10 to-blue-500/10",
    prerequisites: ["Knowledge of C basics helps", "Understanding of variables and functions"],
    jobRoles:    ["Competitive Programmer", "Game Developer", "Systems Engineer", "Quant Developer"],
    curriculum: [
      { phase:"Phase 1 — C++ Basics",  days:"Day 01–07", topics:["C++ Syntax","Input/Output","Pointers","References","Arrays","Strings"]             },
      { phase:"Phase 2 — OOP in C++", days:"Day 08–14", topics:["Classes","Inheritance","Virtual Functions","Templates","STL Containers"]            },
      { phase:"Phase 3 — STL Mastery",days:"Day 15–22", topics:["vector, map, set, queue","Algorithms (sort, binary_search)","Iterators","Lambda"]    },
      { phase:"Phase 4 — CP Focus",   days:"Day 23–30", topics:["Complexity Analysis","Greedy","DP Patterns","Graph Algorithms","CP Problem Sets"]    },
    ],
    features: [
      "30-day curriculum with CP focus",
      "C++17/20 features covered",
      "Competitive programming patterns",
      "Codeforces-style problem sets",
      "Memory management deep dive",
    ],
  },
};

/* ─── Fallback for unlisted languages ───────────────────────────────────── */
function getLanguageData(slug: string) {
  return LANGUAGE_DATA[slug] ?? {
    name:        slug.charAt(0).toUpperCase() + slug.slice(1),
    emoji:       "💻",
    tagline:     "Structured programming track",
    description: "Learn this programming language with a structured day-by-day plan from basics to advanced concepts.",
    days:        30,
    level:       "Beginner",
    color:       "indigo",
    bgClass:     "from-indigo-500/10 to-blue-500/10",
    prerequisites: ["No prerequisites"],
    jobRoles:    ["Software Developer"],
    curriculum:  [
      { phase:"Phase 1 — Basics",    days:"Day 01–10", topics:["Syntax","Variables","Control Flow","Functions"] },
      { phase:"Phase 2 — OOP",       days:"Day 11–20", topics:["Classes","Objects","Inheritance","Polymorphism"] },
      { phase:"Phase 3 — Projects",  days:"Day 21–30", topics:["Real Projects","Best Practices","Career Tips"]  },
    ],
    features: ["Structured daily lessons","Online compiler","Practice exercises","Final project"],
  };
}

/* ─── generateMetadata — per language ───────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string }>;
}): Promise<Metadata> {
  const { language } = await params;
  const data = getLanguageData(language);

  return {
    title:       `Learn ${data.name} — ${data.days}-Day Plan | LearnVeda`,
    description: `${data.tagline}. Structured ${data.days}-day learning plan — ${data.level} level. Join 10,000+ students learning ${data.name} on LearnVeda.`,
    keywords:    [`Learn ${data.name}`, `${data.name} tutorial`, `${data.name} for beginners`],
  };
}

/* ─── Level Badge Color ──────────────────────────────────────────────────── */
const LEVEL_COLORS: Record<string, string> = {
  Beginner:     "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Advanced:     "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

/* ─── Language Track Page Component ─────────────────────────────────────── */
export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;        // Await params per Next.js 15
  const data = getLanguageData(language);   // Get language-specific data

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className={`border-b bg-gradient-to-br ${data.bgClass} via-background`}>
        <div className="container px-4 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/programming" className="hover:text-foreground transition-colors">Programming</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{data.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left — info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${data.bgClass} border flex items-center justify-center text-3xl`}>
                  {data.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold">{data.name}</h1>
                    <Badge className={`text-[10px] ${LEVEL_COLORS[data.level]}`}>{data.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{data.tagline}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{data.description}</p>

              {/* Prerequisites */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Prerequisites</h3>
                <ul className="space-y-1">
                  {data.prerequisites.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career paths */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Career Paths</h3>
                <div className="flex flex-wrap gap-2">
                  {data.jobRoles.map((role) => (
                    <Badge key={role} variant="outline" className="text-xs">{role}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — CTA card */}
            <div className="rounded-2xl border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">{data.days}</div>
                  <div className="text-sm text-muted-foreground">Day Structured Plan</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">Free</div>
                  <div className="text-xs text-muted-foreground">No credit card</div>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {data.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Start button links to Day 1 */}
              <Button asChild className="w-full" size="lg">
                <Link href={`/programming/${language}/day-01`}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Day 1 — Free
                </Link>
              </Button>

              <div className="mt-3 text-center text-xs text-muted-foreground">
                🔥 Join 10,000+ students learning {data.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Curriculum Breakdown ─────────────────────────────────────────── */}
      <div className="container px-4 py-10">
        <h2 className="text-xl font-semibold mb-6">
          <Target className="inline h-5 w-5 text-primary mr-2" />
          {data.days}-Day Curriculum
        </h2>

        <div className="space-y-4">
          {data.curriculum.map((phase, idx) => (
            <div key={idx} className="rounded-2xl border bg-card overflow-hidden">
              {/* Phase header */}
              <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{phase.phase}</div>
                    <div className="text-xs text-muted-foreground">{phase.days}</div>
                  </div>
                </div>
                <Link
                  href={`/programming/${language}/day-${String((idx * 7) + 1).padStart(2, "0")}`}
                  className="text-xs text-primary flex items-center gap-1 hover:underline"
                >
                  Start Phase <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Topics */}
              <div className="p-4 flex flex-wrap gap-2">
                {phase.topics.map((topic) => (
                  <span key={topic} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl border bg-gradient-to-br from-primary/5 to-background p-6 text-center">
          <h3 className="font-bold text-lg mb-2">Ready to start your {data.name} journey?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Join thousands of students who started with Day 1 and made it to Day {data.days}.
          </p>
          <Button asChild size="lg">
            <Link href={`/programming/${language}/day-01`}>
              <Zap className="h-4 w-4 mr-2" />
              Begin Day 1 Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
