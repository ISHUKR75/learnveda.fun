/**
 * @file app/(platform)/programming/[language]/page.tsx
 * @description Programming language overview page with day-wise plan
 * Route: /programming/[language] — e.g. /programming/python
 *
 * Shows:
 *  - Language overview (tagline, use cases, why learn it)
 *  - 30-day structured plan with daily topics
 *  - Live code examples in Monaco editor
 *  - Career paths and salary range
 */

import type { Metadata } from "next";
import { notFound }      from "next/navigation";
import Link              from "next/link";
import {
  ChevronRight, Clock, Star, Zap, Play, Code2,
  BookOpen, TrendingUp, CheckCircle2, Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Language Config ────────────────────────────────────────────────────── */
type DayPlan = {
  day:     number;
  title:   string;
  topics:  string[];  // Key topics covered that day
  xp:      number;    // XP on completion
  isPro:   boolean;   // Requires Pro plan
};

type LanguageConfig = {
  slug:       string;
  name:       string;
  emoji:      string;       // Display emoji
  tagline:    string;
  color:      string;       // Tailwind gradient classes
  description: string;
  useCases:   string[];
  careers:    string[];
  days:       DayPlan[];    // 30-day plan
};

const LANGUAGES: Record<string, LanguageConfig> = {
  python: {
    slug: "python", name: "Python", emoji: "🐍",
    tagline: "The #1 language for AI, ML, and Data Science",
    color: "from-yellow-400 to-green-500",
    description: "Python is the most beginner-friendly and versatile language available. Used in AI, web development, automation, data science, and scientific computing.",
    useCases: ["Machine Learning & AI", "Web Development (Django, Flask, FastAPI)", "Data Science & Analytics", "Automation & Scripting", "Scientific Computing"],
    careers: ["Python Developer", "Data Scientist", "ML Engineer", "Backend Developer", "DevOps Engineer"],
    days: [
      { day:  1, title: "Introduction & Setup",        topics: ["What is Python?", "Install Python & VS Code", "Hello World", "Variables & Data Types"],      xp: 30, isPro: false },
      { day:  2, title: "Operators & Expressions",     topics: ["Arithmetic operators", "Comparison operators", "Logical operators", "Type conversion"],       xp: 30, isPro: false },
      { day:  3, title: "Control Flow",                topics: ["if/elif/else", "while loop", "for loop", "range()"],                                          xp: 35, isPro: false },
      { day:  4, title: "Functions",                   topics: ["Defining functions", "Parameters & return values", "Default args", "Lambda functions"],        xp: 40, isPro: false },
      { day:  5, title: "Lists & Tuples",              topics: ["Creating lists", "List methods", "Tuples vs Lists", "List comprehension"],                     xp: 40, isPro: false },
      { day:  6, title: "Dictionaries & Sets",         topics: ["Dict creation", "Dict methods", "Sets operations", "Nested dicts"],                           xp: 40, isPro: true  },
      { day:  7, title: "Strings Deep Dive",           topics: ["String methods", "f-strings", "String slicing", "Regular expressions basics"],                xp: 40, isPro: true  },
      { day:  8, title: "File I/O",                    topics: ["Reading files", "Writing files", "with statement", "CSV handling"],                            xp: 45, isPro: true  },
      { day:  9, title: "Error Handling",              topics: ["try/except/finally", "Custom exceptions", "Raising exceptions", "Assertion"],                  xp: 45, isPro: true  },
      { day: 10, title: "Modules & Packages",          topics: ["import statement", "Built-in modules (os, sys, math)", "Creating modules", "pip"],             xp: 45, isPro: true  },
      { day: 11, title: "Object-Oriented Python",      topics: ["Classes & Objects", "__init__", "Instance methods", "self"],                                   xp: 50, isPro: true  },
      { day: 12, title: "OOP: Inheritance & Polymorphism",topics: ["Inheritance", "super()", "Method overriding", "Multiple inheritance"],                     xp: 50, isPro: true  },
      { day: 13, title: "Decorators & Generators",     topics: ["Function decorators", "@property", "yield keyword", "Generator functions"],                   xp: 55, isPro: true  },
      { day: 14, title: "Iterators & Context Managers",topics: ["__iter__ & __next__", "Context managers", "__enter__ & __exit__", "contextlib"],              xp: 55, isPro: true  },
      { day: 15, title: "Week 2 Project: CLI To-Do App",topics: ["Build a full CLI app", "File persistence", "OOP design", "Code review"],                    xp: 100, isPro: true },
      { day: 16, title: "NumPy Fundamentals",          topics: ["Arrays", "Broadcasting", "Linear algebra ops", "Array slicing"],                              xp: 60, isPro: true  },
      { day: 17, title: "Pandas for Data Analysis",    topics: ["DataFrames", "Reading CSV/Excel", "groupby", "Merging DataFrames"],                           xp: 60, isPro: true  },
      { day: 18, title: "Matplotlib & Seaborn",        topics: ["Line/bar/scatter plots", "Subplots", "Seaborn statistical charts", "Plot customization"],     xp: 55, isPro: true  },
      { day: 19, title: "Web Scraping",                topics: ["requests library", "BeautifulSoup", "Handling pagination", "Scraping ethics"],                xp: 55, isPro: true  },
      { day: 20, title: "REST APIs with FastAPI",       topics: ["Creating API routes", "Pydantic models", "Query params", "Swagger docs"],                    xp: 65, isPro: true  },
      { day: 21, title: "SQLite & SQLAlchemy",          topics: ["SQLite basics", "SQLAlchemy ORM", "Models & migrations", "CRUD operations"],                xp: 65, isPro: true  },
      { day: 22, title: "Async Python",                topics: ["async/await", "asyncio", "aiohttp", "Concurrent tasks"],                                       xp: 65, isPro: true  },
      { day: 23, title: "Testing with pytest",          topics: ["Writing unit tests", "pytest fixtures", "mocking", "Test coverage"],                         xp: 55, isPro: true  },
      { day: 24, title: "Python Packaging",             topics: ["setup.py / pyproject.toml", "Virtual environments", "Publishing to PyPI", "Dependency management"], xp: 50, isPro: true },
      { day: 25, title: "Machine Learning Intro",      topics: ["scikit-learn basics", "Train/test split", "Linear regression", "Evaluating models"],          xp: 70, isPro: true  },
      { day: 26, title: "Neural Networks with TensorFlow",topics: ["Keras Sequential API", "Layers", "Training a model", "MNIST digit classification"],       xp: 80, isPro: true  },
      { day: 27, title: "Natural Language Processing", topics: ["NLTK / spaCy basics", "Tokenization", "Sentiment analysis", "Text classification"],           xp: 75, isPro: true  },
      { day: 28, title: "Docker & Deployment",         topics: ["Dockerfile for Python apps", "docker-compose", "Deploy to Render/Railway", "Environment variables"], xp: 70, isPro: true },
      { day: 29, title: "Final Project: Build a Real App",topics: ["Plan your project", "Implement feature by feature", "Add tests", "Deploy it"],             xp: 150, isPro: true },
      { day: 30, title: "Python Career Roadmap",        topics: ["Job roles overview", "Portfolio tips", "Interview prep resources", "Next steps"],             xp: 50, isPro: true  },
    ],
  },
  javascript: {
    slug: "javascript", name: "JavaScript", emoji: "⚡",
    tagline: "The language of the web — frontend to backend",
    color: "from-yellow-400 to-orange-400",
    description: "JavaScript powers every website on the internet. Learn modern ES6+ JS, async programming, DOM manipulation, and full-stack development with Node.js.",
    useCases: ["Frontend Web Development", "Backend Development (Node.js)", "Mobile Apps (React Native)", "Browser Extensions", "Game Development"],
    careers: ["Frontend Developer", "Full Stack Developer", "React Developer", "Node.js Developer", "TypeScript Engineer"],
    days: [
      { day:  1, title: "JavaScript Basics",           topics: ["Variables: var, let, const", "Data types", "console.log()", "Strict mode"], xp: 30, isPro: false },
      { day:  2, title: "Operators & Comparisons",     topics: ["Arithmetic ops", "== vs ===", "Logical operators", "Ternary operator"],     xp: 30, isPro: false },
      { day:  3, title: "Control Flow",                topics: ["if/else", "switch", "while", "for loops"],                                   xp: 35, isPro: false },
      { day:  4, title: "Functions",                   topics: ["Function declarations", "Arrow functions", "Closures", "Scope"],              xp: 40, isPro: false },
      { day:  5, title: "Arrays & Array Methods",      topics: ["map/filter/reduce", "find/includes", "spread operator", "Destructuring"],    xp: 45, isPro: false },
      { day:  6, title: "Objects & Prototypes",        topics: ["Object literals", "Prototype chain", "Object.keys/values", "Destructuring"], xp: 45, isPro: true  },
      { day:  7, title: "DOM Manipulation",            topics: ["querySelector", "addEventListener", "classList", "innerHTML"],                xp: 50, isPro: true  },
      { day:  8, title: "Events & Event Delegation",   topics: ["Event bubbling", "Event delegation", "preventDefault", "Custom events"],     xp: 50, isPro: true  },
      { day:  9, title: "Async JS: Promises",          topics: ["Promise syntax", "then/catch", "Promise.all", "Promise.race"],               xp: 55, isPro: true  },
      { day: 10, title: "Async/Await & Fetch API",     topics: ["async/await syntax", "Error handling with try/catch", "fetch()", "REST API calls"], xp: 55, isPro: true },
      { day: 11, title: "ES6+ Modern JavaScript",      topics: ["Template literals", "Optional chaining", "Nullish coalescing", "Symbols"],   xp: 50, isPro: true  },
      { day: 12, title: "Classes & OOP",               topics: ["class keyword", "Constructor", "Inheritance", "Private fields"],             xp: 55, isPro: true  },
      { day: 13, title: "Modules & Bundlers",          topics: ["import/export", "ESM vs CJS", "Webpack basics", "Vite"],                     xp: 50, isPro: true  },
      { day: 14, title: "Error Handling & Debugging",  topics: ["try/catch/finally", "Custom Error classes", "Chrome DevTools", "Source maps"], xp: 45, isPro: true },
      { day: 15, title: "Project: Interactive To-Do App", topics: ["DOM + events + local storage", "Full UI build", "Mobile responsive", "Deploy to Netlify"], xp: 100, isPro: true },
    ],
  },
  typescript: {
    slug: "typescript", name: "TypeScript", emoji: "🔷",
    tagline: "JavaScript with types — production-grade code",
    color: "from-blue-500 to-blue-700",
    description: "TypeScript is the industry standard for large JavaScript codebases. Catch errors at compile time, write self-documenting code, and build maintainable applications.",
    useCases: ["Frontend (React, Vue, Angular)", "Backend (Node.js, Deno)", "Full Stack (Next.js)", "SDKs & Libraries", "Enterprise Apps"],
    careers: ["TypeScript Developer", "Frontend Engineer", "Full Stack Developer", "Framework Author"],
    days: [
      { day: 1, title: "TypeScript Setup & Basics",   topics: ["What is TypeScript?", "tsc compiler", "tsconfig.json", "Basic types"],       xp: 30, isPro: false },
      { day: 2, title: "Types & Interfaces",           topics: ["Primitive types", "Interfaces", "Type aliases", "Type vs Interface"],        xp: 35, isPro: false },
      { day: 3, title: "Functions & Generics",         topics: ["Function type annotations", "Optional params", "Generics T", "Constraints"], xp: 40, isPro: false },
      { day: 4, title: "Classes & Access Modifiers",   topics: ["class with types", "public/private/readonly", "Abstract classes", "Implements"], xp: 45, isPro: false },
      { day: 5, title: "Advanced Types",               topics: ["Union & Intersection", "Mapped types", "Conditional types", "Infer"],        xp: 50, isPro: false },
    ],
  },
  java: {
    slug: "java", name: "Java", emoji: "☕",
    tagline: "Enterprise-grade, write once run anywhere",
    color: "from-orange-500 to-red-500",
    description: "Java is the backbone of enterprise software, Android development, and backend systems at scale. Used at Google, Amazon, Netflix, and thousands of enterprises globally.",
    useCases: ["Android Development", "Enterprise Backend (Spring)", "Big Data (Hadoop, Spark)", "Banking & Finance Systems", "Microservices"],
    careers: ["Java Developer", "Android Developer", "Spring Boot Engineer", "Backend Engineer", "Enterprise Architect"],
    days: [
      { day: 1, title: "Java Setup & Hello World",      topics: ["Install JDK", "javac & java commands", "Main method", "System.out.println"], xp: 30, isPro: false },
      { day: 2, title: "Variables & Data Types",        topics: ["Primitive types", "Reference types", "Type casting", "Scanner class"],       xp: 30, isPro: false },
      { day: 3, title: "Control Flow",                  topics: ["if/else", "switch", "for/while/do-while", "break/continue"],                  xp: 35, isPro: false },
      { day: 4, title: "Methods",                       topics: ["Method definition", "Parameters & return types", "Method overloading", "static methods"], xp: 40, isPro: false },
      { day: 5, title: "Arrays",                        topics: ["1D & 2D arrays", "Array methods", "ArrayList vs Array", "Enhanced for loop"], xp: 40, isPro: false },
    ],
  },
  c: {
    slug: "c", name: "C", emoji: "🔧",
    tagline: "The mother of all languages — system programming",
    color: "from-gray-600 to-gray-800",
    description: "C is the language that powers operating systems, embedded systems, and performance-critical software. Understanding C gives you deep insight into how computers actually work.",
    useCases: ["Operating Systems (Linux, Windows)", "Embedded Systems & Firmware", "Compilers & Interpreters", "Game Engines", "Performance-critical applications"],
    careers: ["Embedded Systems Engineer", "Systems Programmer", "Firmware Developer", "Low-level Game Dev"],
    days: [
      { day: 1, title: "C Setup & First Program",       topics: ["Install GCC", "Compile & run", "printf/scanf", "#include"],                  xp: 30, isPro: false },
      { day: 2, title: "Variables & Data Types",        topics: ["int, char, float, double", "sizeof()", "Format specifiers", "Constants"],    xp: 30, isPro: false },
      { day: 3, title: "Operators",                     topics: ["Arithmetic, Relational, Logical", "Bitwise operators", "Assignment", "Precedence"], xp: 35, isPro: false },
      { day: 4, title: "Control Flow",                  topics: ["if/else", "switch", "Loops: for/while/do-while", "break/continue"],           xp: 35, isPro: false },
      { day: 5, title: "Functions",                     topics: ["Function definition", "Call by value", "Recursion", "Prototypes"],            xp: 40, isPro: false },
    ],
  },
  cpp: {
    slug: "cpp", name: "C++", emoji: "⚙️",
    tagline: "Performance + OOP — the competitive programmer's choice",
    color: "from-blue-600 to-purple-600",
    description: "C++ combines the power of C with object-oriented programming. Used in game development, competitive programming, system software, and performance-critical applications.",
    useCases: ["Competitive Programming", "Game Development (Unreal Engine)", "Systems Programming", "Embedded Systems", "Financial Trading Systems"],
    careers: ["C++ Developer", "Game Developer", "Competitive Programmer", "Systems Engineer", "Graphics Programmer"],
    days: [
      { day: 1, title: "C++ Basics",                    topics: ["cout/cin", "Namespaces", "Compilation", "First program"],                    xp: 30, isPro: false },
      { day: 2, title: "Variables & Types",             topics: ["int, float, string, bool", "auto keyword", "Type casting", "References"],   xp: 30, isPro: false },
      { day: 3, title: "Control Flow",                  topics: ["if/else", "switch", "Loops", "Range-based for"],                            xp: 35, isPro: false },
      { day: 4, title: "Functions",                     topics: ["Function overloading", "Default parameters", "Inline functions", "Pass by ref"], xp: 40, isPro: false },
      { day: 5, title: "STL: vectors & strings",        topics: ["vector operations", "string methods", "pair & tuple", "Auto iteration"],    xp: 45, isPro: false },
    ],
  },
};

// Generate stub entries for all other languages
const OTHER_LANGUAGES = ["rust", "kotlin", "swift", "sql", "dart", "ruby", "go"];
for (const lang of OTHER_LANGUAGES) {
  if (!LANGUAGES[lang]) {
    LANGUAGES[lang] = {
      slug:    lang,
      name:    lang.charAt(0).toUpperCase() + lang.slice(1),
      emoji:   "💻",
      tagline: `Learn ${lang.charAt(0).toUpperCase() + lang.slice(1)} from scratch to advanced`,
      color:   "from-brand-500 to-purple-500",
      description: `Comprehensive ${lang.charAt(0).toUpperCase() + lang.slice(1)} curriculum with a structured 30-day plan. From fundamentals to real-world projects.`,
      useCases: ["Web Development", "Mobile Development", "Backend Systems", "Open Source Projects"],
      careers:  ["Software Engineer", "Backend Developer", "Full Stack Developer"],
      days: Array.from({ length: 30 }, (_, i) => ({
        day:    i + 1,
        title:  `Day ${i + 1}: ${i < 5 ? "Fundamentals" : i < 15 ? "Core Concepts" : "Advanced Topics"}`,
        topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
        xp:     30 + Math.min(i * 3, 90),
        isPro:  i >= 5,
      })),
    };
  }
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> {
  const { language } = await params;
  const lang = LANGUAGES[language];
  if (!lang) return { title: "Not Found" };
  return {
    title:       `Learn ${lang.name} — 30-Day Plan on LearnVeda`,
    description: lang.description,
  };
}

export function generateStaticParams() {
  return Object.keys(LANGUAGES).map((language) => ({ language }));
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default async function ProgrammingLanguagePage({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params;
  const lang = LANGUAGES[language];
  if (!lang) notFound();

  const freedays = lang.days.filter((d) => !d.isPro).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`bg-gradient-to-r ${lang.color} text-white py-16`}>
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/programming" className="hover:text-white">Programming</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{lang.name}</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{lang.emoji}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Learn {lang.name}</h1>
              <p className="text-white/80 mt-1">{lang.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge className="bg-white/20 text-white border-white/30">{lang.days.length} days</Badge>
            <Badge className="bg-white/20 text-white border-white/30">{freedays} free days</Badge>
            <Badge className="bg-white/20 text-white border-white/30">{lang.careers.length} career paths</Badge>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── Day-wise plan ─────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-foreground mb-6">
              {lang.days.length}-Day Structured Plan
            </h2>
            <div className="space-y-2.5">
              {lang.days.map((day) => (
                <div
                  key={day.day}
                  className={`flex items-center gap-4 p-4 rounded-2xl border bg-card transition-all ${
                    day.isPro
                      ? "opacity-80 hover:opacity-100"
                      : "hover:border-brand-500/30 hover:shadow-sm"
                  }`}
                >
                  {/* Day number */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                    day.isPro ? "bg-muted text-muted-foreground" : "bg-brand-500/10 text-brand-500"
                  }`}>
                    {day.day}
                  </div>

                  {/* Day content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{day.title}</h3>
                      {day.isPro && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{day.topics.slice(0, 3).join(" · ")}</p>
                  </div>

                  {/* XP + action */}
                  <div className="flex items-center gap-3 flex-shrink-0 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 text-brand-500 font-medium">
                      <Zap className="h-3.5 w-3.5" />+{day.xp} XP
                    </span>
                    {day.isPro ? (
                      <Link href="/pricing">
                        <Badge variant="secondary" className="text-xs cursor-pointer">Pro</Badge>
                      </Link>
                    ) : (
                      <Link href={`/programming/${language}/day-${String(day.day).padStart(2, "0")}`}>
                        <Play className="h-4 w-4 text-brand-500 hover:text-brand-600" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-bold text-foreground mb-3">Start Learning</h3>
              <Link
                href={`/programming/${language}/day-01`}
                className="flex items-center gap-2 w-full justify-center py-3 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
              >
                <Play className="h-4 w-4" />
                Begin Day 1
              </Link>
              <Link
                href="/ai-tutor"
                className="flex items-center gap-2 w-full justify-center py-3 rounded-xl border mt-3 font-medium hover:border-brand-500/50 transition-colors text-sm"
              >
                Ask AI Tutor
              </Link>
            </div>

            {/* Use cases */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-500" />
                Use Cases
              </h3>
              <ul className="space-y-2">
                {lang.useCases.map((uc) => (
                  <li key={uc} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                    {uc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Careers */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Career Paths
              </h3>
              <div className="flex flex-wrap gap-2">
                {lang.careers.map((c) => (
                  <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
