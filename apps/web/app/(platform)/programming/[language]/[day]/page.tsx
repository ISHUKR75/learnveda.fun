/**
 * @file app/(platform)/programming/[language]/[day]/page.tsx
 * @description Daily programming lesson page — the core learning unit
 * Route: /programming/[language]/[day]  (e.g. /programming/python/day-01)
 * Shows: Day objective, theory content, code examples, exercises, next day CTA
 * This is where students spend most of their programming track time
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight, ChevronLeft, Code2, Play, CheckCircle2,
  Clock, Target, Lightbulb, ArrowRight, BookOpen,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Daily Lesson Content ───────────────────────────────────────────────── */
// Sample daily lesson content for the first few days of Python
// In production this is fetched from MongoDB course-service
const DAILY_LESSONS: Record<string, Record<string, {
  dayNumber: number;
  title:     string;
  objective: string;
  timeEstimate: string;
  theory:    { heading: string; content: string; codeExample?: string }[];
  keyPoints: string[];
  exercises: { title: string; description: string; difficulty: "Easy" | "Medium" | "Hard"; hint?: string }[];
  prevDay?:  { id: string; title: string };
  nextDay?:  { id: string; title: string };
}>> = {
  python: {
    "day-01": {
      dayNumber:    1,
      title:        "Welcome to Python — Setup & Your First Program",
      objective:    "Install Python, understand the interpreter, write your first Python program, and understand variables and basic output.",
      timeEstimate: "45–60 min",
      theory: [
        {
          heading:    "What is Python?",
          content:    "Python is a high-level, interpreted, dynamically typed programming language created by Guido van Rossum in 1991. It emphasizes code readability — Python code reads almost like English. It runs on Windows, macOS, and Linux without modification.",
          codeExample:
`# Your very first Python program
print("Hello, LearnVeda!")   # print() outputs text to the screen

# Python is case-sensitive
# Print and print are NOT the same`,
        },
        {
          heading:    "Variables and Data Types",
          content:    "A variable is a named container for data. Python automatically determines the type based on the value you assign. The four basic types are: int (integers), float (decimal numbers), str (text), and bool (True/False).",
          codeExample:
`# Integer
age = 17
print(age)           # Output: 17

# Float (decimal)
height = 5.8
print(height)        # Output: 5.8

# String (text)
name = "Arjun"
print(name)          # Output: Arjun

# Boolean
is_student = True
print(is_student)    # Output: True

# Check the type of any variable
print(type(age))     # Output: <class 'int'>`,
        },
        {
          heading:    "Basic Input and Output",
          content:    "The input() function reads a string from the user. The print() function displays output. You can format output using f-strings — strings that start with f\" and allow you to embed variable values directly.",
          codeExample:
`# Reading user input
name = input("Enter your name: ")   # Waits for user to type

# f-string formatting
print(f"Hello, {name}! Welcome to Python.")

# Multiple values in print
score = 95
print(f"Your score is {score} out of 100")

# Arithmetic inside f-strings
a = 10
b = 3
print(f"{a} + {b} = {a + b}")   # Output: 10 + 3 = 13`,
        },
        {
          heading:    "Python Arithmetic Operators",
          content:    "Python supports all standard mathematical operations. The // operator is integer division (floor division), ** is exponentiation (power), and % is modulo (remainder).",
          codeExample:
`x = 15
y = 4

print(x + y)    # 19  — Addition
print(x - y)    # 11  — Subtraction
print(x * y)    # 60  — Multiplication
print(x / y)    # 3.75 — Division (always returns float)
print(x // y)   # 3  — Integer division (floor)
print(x % y)    # 3  — Modulo (remainder)
print(x ** y)   # 50625 — Power (15^4)`,
        },
      ],
      keyPoints: [
        "Python uses indentation (4 spaces) instead of curly braces to define code blocks",
        "Variables don't need type declarations — Python infers them",
        "print() can take multiple comma-separated values and joins them with space",
        "input() always returns a string — use int() or float() to convert to numbers",
        "Python is case-sensitive: name and Name are different variables",
        "Single-line comments start with # and are ignored by Python",
      ],
      exercises: [
        {
          title:       "Hello World Variation",
          description: "Write a Python program that asks the user for their name and class (e.g., 'Class 9') and prints: 'Welcome [name]! You are in [class].'\nExample: if name is 'Priya' and class is 'Class 9', print: 'Welcome Priya! You are in Class 9.'",
          difficulty:  "Easy",
          hint:        "Use input() twice — once for name, once for class. Use an f-string for the output.",
        },
        {
          title:       "Simple Calculator",
          description: "Ask the user for two numbers and print their sum, difference, product, quotient, and remainder on separate lines.\nLabel each result clearly.",
          difficulty:  "Easy",
          hint:        "Remember to convert input to int or float using int() or float().",
        },
        {
          title:       "Circle Area",
          description: "Ask the user for the radius of a circle. Calculate and print the area.\nUse π = 3.14159. Format to 2 decimal places using f'{area:.2f}'.",
          difficulty:  "Medium",
          hint:        "Area of circle = π × r². Use float() to convert the input.",
        },
      ],
      nextDay: { id: "day-02", title: "Strings and String Methods" },
    },

    "day-02": {
      dayNumber:    2,
      title:        "Strings and String Methods",
      objective:    "Master Python strings — creation, indexing, slicing, and the 20 most useful string methods.",
      timeEstimate: "50–70 min",
      theory: [
        {
          heading: "String Basics",
          content: "A string is a sequence of characters enclosed in single quotes (''), double quotes (\"\"), or triple quotes (\"\"\" \"\"\"). Strings are immutable — you cannot change individual characters after creation.",
          codeExample:
`s1 = 'Hello'
s2 = "World"
s3 = """This is a
multi-line string"""

# String concatenation
full = s1 + " " + s2
print(full)    # Hello World

# String repetition
print("abc" * 3)  # abcabcabc

# Length of string
print(len(full))   # 11`,
        },
        {
          heading: "Indexing and Slicing",
          content: "Each character in a string has an index starting from 0. Negative indices count from the end. Slicing lets you extract a portion: s[start:end:step].",
          codeExample:
`s = "LearnVeda"

# Positive indexing (0-based)
print(s[0])     # L
print(s[4])     # n

# Negative indexing (from the end)
print(s[-1])    # a (last character)
print(s[-4])    # V

# Slicing s[start:end] — end is exclusive
print(s[0:5])   # Learn
print(s[5:])    # Veda  (from index 5 to end)
print(s[:5])    # Learn (from start to index 5)
print(s[::-1])  # adeVnraeL (reverse the string)`,
        },
        {
          heading: "Essential String Methods",
          content: "String methods return new strings — they don't modify the original. Always assign the result if you need it.",
          codeExample:
`s = "  Hello, Python World!  "

print(s.upper())          # "  HELLO, PYTHON WORLD!  "
print(s.lower())          # "  hello, python world!  "
print(s.strip())          # "Hello, Python World!"   (removes leading/trailing spaces)
print(s.strip().title())  # "Hello, Python World!"

# replace(old, new)
print(s.replace("Python", "LearnVeda"))

# split — converts string to list
words = "apple,banana,mango"
print(words.split(","))   # ['apple', 'banana', 'mango']

# join — converts list to string
fruits = ["apple", "banana", "mango"]
print(", ".join(fruits))  # apple, banana, mango

# find — returns index of first occurrence (-1 if not found)
print(s.find("Python"))   # 9

# startswith / endswith
print(s.strip().startswith("Hello"))  # True
print(s.strip().endswith("!"))        # True

# count
print("banana".count("a"))  # 3`,
        },
      ],
      keyPoints: [
        "String indices start at 0; negative indices start at -1 (last character)",
        "Slicing s[start:end] — start is inclusive, end is exclusive",
        "s[::-1] reverses a string (very common interview question)",
        "String methods don't modify the original — they return a new string",
        "strip() removes whitespace from both ends; lstrip()/rstrip() from one end",
        "f-strings are the modern way to format strings — prefer them over .format()",
      ],
      exercises: [
        {
          title:       "Palindrome Checker",
          description: "Ask the user for a word and check if it is a palindrome (reads the same forwards and backwards). Print 'Yes, it is a palindrome!' or 'No, it is not a palindrome.' (case-insensitive check).",
          difficulty:  "Easy",
          hint:        "Convert to lowercase first. Compare the string with its reverse using [::-1].",
        },
        {
          title:       "Word Count",
          description: "Ask the user for a sentence. Print the number of words, the longest word, and the sentence in reverse word order.",
          difficulty:  "Medium",
          hint:        "Use split() to get a list of words. Use len() for count. Use max(words, key=len) for the longest word.",
        },
        {
          title:       "Username Generator",
          description: "Ask the user for their first name, last name, and birth year. Generate a username in the format: firstlast_yy (e.g. Arjun Sharma 2007 → arjunsharma_07). Handle names with leading/trailing spaces.",
          difficulty:  "Medium",
          hint:        "Use .strip().lower() on names, then slice the last 2 digits of the birth year with str(year)[-2:].",
        },
      ],
      prevDay: { id: "day-01", title: "Welcome to Python" },
      nextDay: { id: "day-03", title: "Lists and Tuples" },
    },
  },

  javascript: {
    "day-01": {
      dayNumber:    1,
      title:        "JavaScript Fundamentals — Variables, Types & Operators",
      objective:    "Understand JavaScript variables (let, const, var), primitive data types, and arithmetic/comparison operators.",
      timeEstimate: "45–60 min",
      theory: [
        {
          heading: "Variables in JavaScript",
          content: "JavaScript has three ways to declare variables: var (old, function-scoped), let (block-scoped, can be reassigned), and const (block-scoped, cannot be reassigned). Always prefer const, use let when you need to reassign, and avoid var.",
          codeExample:
`// const — value cannot be changed
const name = "Arjun";
const PI = 3.14159;

// let — can be reassigned
let score = 0;
score = 95;   // OK — reassignment allowed

// var — old way, avoid in modern JS
var age = 17;

// Try to reassign a const:
// name = "Priya"; // ❌ TypeError: Assignment to constant variable`,
        },
        {
          heading: "Data Types",
          content: "JavaScript has 7 primitive types: string, number, boolean, null, undefined, BigInt, and Symbol. The typeof operator tells you what type a value is.",
          codeExample:
`const str    = "Hello World";   // string
const num    = 42;              // number (integers AND floats are 'number')
const pi     = 3.14;            // number
const bool   = true;            // boolean
const empty  = null;            // null (intentionally empty)
let unknown;                    // undefined (declared but not assigned)

console.log(typeof str);        // "string"
console.log(typeof num);        // "number"
console.log(typeof bool);       // "boolean"
console.log(typeof null);       // "object" ← JS quirk/bug
console.log(typeof unknown);    // "undefined"`,
        },
        {
          heading: "Template Literals",
          content: "Template literals (backtick strings) allow embedding expressions directly in strings, multi-line strings, and expression evaluation.",
          codeExample:
`const name  = "Priya";
const score = 98;

// Old way (string concatenation)
console.log("Hello, " + name + "! Score: " + score);

// Modern way — template literal (backticks)
console.log(\`Hello, \${name}! Score: \${score}\`);

// Expression inside template literal
console.log(\`Percentage: \${score}%\`);
console.log(\`10 + 5 = \${10 + 5}\`);

// Multi-line string
const msg = \`
  Welcome to LearnVeda!
  Today is your Day 1.
\`;`,
        },
      ],
      keyPoints: [
        "Use const by default, let when reassignment needed, never var in modern JS",
        "JavaScript has only one numeric type — number (for both integers and floats)",
        "typeof null returns 'object' — this is a famous JavaScript bug, not a feature",
        "Template literals use backticks (`) not quotes and ${} for interpolation",
        "=== (strict equality) checks value AND type; == (loose equality) coerces types",
        "JavaScript is case-sensitive: name and Name are different variables",
      ],
      exercises: [
        {
          title:       "Personal Intro Card",
          description: "Create variables for your name, age, city, and favorite subject. Use template literals to print a formatted introduction like: 'Hi! I am Arjun, 16 years old from Delhi. My favorite subject is Mathematics.'",
          difficulty:  "Easy",
          hint:        "Use const for all variables since none of them change. Use a template literal for the output.",
        },
        {
          title:       "BMI Calculator",
          description: "Declare variables for weight (in kg) and height (in metres). Calculate BMI = weight / (height * height). Use console.log to print: 'Your BMI is X.XX' (round to 2 decimal places using .toFixed(2)).",
          difficulty:  "Easy",
          hint:        "BMI = weight / (height ** 2). Use .toFixed(2) to format the decimal.",
        },
      ],
      nextDay: { id: "day-02", title: "Control Flow — if/else and Loops" },
    },
  },
};

/* ─── Get Lesson Content ─────────────────────────────────────────────────── */
function getLessonContent(language: string, day: string) {
  const langData = DAILY_LESSONS[language];
  if (langData?.[day]) return langData[day];

  // Generic fallback for any day/language not in local data
  const dayNum  = parseInt(day.replace("day-", "") || "1");
  const langCap = language.charAt(0).toUpperCase() + language.slice(1);
  const prevDayNum = dayNum - 1;
  const nextDayNum = dayNum + 1;

  return {
    dayNumber:    dayNum,
    title:        `${langCap} — Day ${dayNum}`,
    objective:    `Continue building your ${langCap} skills with today's structured lesson.`,
    timeEstimate: "45–60 min",
    theory: [
      {
        heading:     "Today's Core Concept",
        content:     `Master today's key ${langCap} concept with examples and practice exercises.`,
        codeExample: `// Day ${dayNum} ${langCap} example\n// Add your code here`,
      },
    ],
    keyPoints:    ["Study the theory section", "Run all code examples", "Complete the exercises", "Review before moving to next day"],
    exercises: [
      {
        title:       "Practice Exercise",
        description: "Apply today's concepts with a hands-on coding exercise.",
        difficulty:  "Easy" as const,
        hint:        "Review the theory examples above before attempting.",
      },
    ],
    prevDay: dayNum > 1 ? { id: `day-${String(prevDayNum).padStart(2, "0")}`, title: `Day ${prevDayNum}` } : undefined,
    nextDay: { id: `day-${String(nextDayNum).padStart(2, "0")}`, title: `Day ${nextDayNum}` },
  };
}

/* ─── generateMetadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string; day: string }>;
}): Promise<Metadata> {
  const { language, day } = await params;
  const data    = getLessonContent(language, day);
  const langCap = language.charAt(0).toUpperCase() + language.slice(1);

  return {
    title:       `${langCap} Day ${data.dayNumber} — ${data.title} | LearnVeda`,
    description: data.objective,
    keywords:    [`Learn ${langCap}`, `${langCap} tutorial day ${data.dayNumber}`, `${langCap} beginner`],
  };
}

/* ─── Difficulty Color ───────────────────────────────────────────────────── */
const DIFFICULTY_COLORS = {
  Easy:   "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard:   "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

/* ─── Day Page Component ─────────────────────────────────────────────────── */
export default async function DayLessonPage({
  params,
}: {
  params: Promise<{ language: string; day: string }>;
}) {
  const { language, day } = await params;   // Await params
  const data    = getLessonContent(language, day);
  const langCap = language.charAt(0).toUpperCase() + language.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top progress bar ─────────────────────────────────────────────── */}
      <div className="h-1 bg-muted">
        <div className="h-full bg-primary" style={{ width: `${Math.min((data.dayNumber / 45) * 100, 100)}%` }} />
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="border-b">
        <div className="container px-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/programming"               className="hover:text-foreground transition-colors">Programming</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/programming/${language}`} className="hover:text-foreground capitalize transition-colors">{langCap}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Day {data.dayNumber}</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── Left — Main Lesson Content ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Day header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  <Code2 className="h-3 w-3 mr-1" />
                  Day {data.dayNumber}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {data.timeEstimate}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{data.title}</h1>

              {/* Objective */}
              <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">Today's Objective</div>
                  <p className="text-sm text-muted-foreground">{data.objective}</p>
                </div>
              </div>
            </div>

            {/* Theory sections with code examples */}
            {data.theory.map((section, i) => (
              <div key={i} className="space-y-3">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {section.heading}
                </h2>
                <p className="text-muted-foreground leading-relaxed pl-8">{section.content}</p>

                {/* Code example */}
                {section.codeExample && (
                  <div className="pl-8">
                    <div className="rounded-xl border bg-zinc-950 dark:bg-zinc-900 overflow-hidden">
                      {/* Code block header */}
                      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500"   />
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"/>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="text-[10px] text-white/40">{langCap} — example</span>
                      </div>
                      {/* Code content */}
                      <pre className="p-4 text-sm text-green-400 font-mono overflow-x-auto">
                        <code>{section.codeExample}</code>
                      </pre>
                    </div>

                    {/* Run in Compiler CTA */}
                    <div className="mt-2 flex items-center gap-2">
                      <Button asChild variant="outline" size="sm" className="text-xs">
                        <Link href={`/compiler?lang=${language}&code=${encodeURIComponent(section.codeExample)}`}>
                          <Play className="h-3 w-3 mr-1 text-green-500" />
                          Run in Compiler
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* ── Exercises ────────────────────────────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Practice Exercises
              </h2>
              <div className="space-y-4">
                {data.exercises.map((ex, i) => (
                  <div key={i} className="rounded-xl border bg-card p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-medium text-sm">
                        Exercise {i + 1} — {ex.title}
                      </h3>
                      <Badge className={`text-[9px] py-0 shrink-0 ${DIFFICULTY_COLORS[ex.difficulty]}`}>
                        {ex.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-line mb-3">{ex.description}</p>
                    {ex.hint && (
                      <div className="flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3 text-xs">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground"><strong className="text-amber-600 dark:text-amber-400">Hint:</strong> {ex.hint}</span>
                      </div>
                    )}
                    <div className="mt-3">
                      <Button asChild variant="outline" size="sm" className="text-xs">
                        <Link href={`/compiler?lang=${language}`}>
                          <Code2 className="h-3 w-3 mr-1" />
                          Solve in Compiler
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right Sidebar ────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Progress */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3">Day Progress</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-primary rounded-full" />
                </div>
                <span className="text-xs text-muted-foreground">0%</span>
              </div>
              <Button className="w-full" size="sm">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Mark Day Complete
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                +50 XP earned upon completion
              </p>
            </div>

            {/* Key Points */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Key Takeaways
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

            {/* Quick resources */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3">Resources</h3>
              <div className="space-y-2">
                {[
                  { label: "Online Compiler",  href: `/compiler?lang=${language}`, icon: Code2    },
                  { label: "Documentation",    href: "#",                           icon: BookOpen },
                  { label: "Practice MCQs",    href: "/practice",                  icon: BookOpen },
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
          {data.prevDay ? (
            <Link
              href={`/programming/${language}/${data.prevDay.id}`}
              className="group flex items-center gap-2 rounded-xl border bg-card px-4 py-3 hover:shadow-md transition-all"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground">Previous</div>
                <div className="text-sm font-medium">{data.prevDay.title}</div>
              </div>
            </Link>
          ) : <div />}

          {data.nextDay ? (
            <Link
              href={`/programming/${language}/${data.nextDay.id}`}
              className="group flex items-center gap-2 rounded-xl border bg-card px-4 py-3 hover:shadow-md transition-all text-right ml-auto"
            >
              <div>
                <div className="text-[10px] text-muted-foreground">Next Day</div>
                <div className="text-sm font-medium">{data.nextDay.title}</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
