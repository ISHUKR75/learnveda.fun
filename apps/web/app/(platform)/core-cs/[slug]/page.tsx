/**
 * @file app/(platform)/core-cs/[slug]/page.tsx
 * @description Core CS topic deep-dive page — focused guides for DSA, OS, DBMS, CN, etc.
 * Route: /core-cs/[slug]  (e.g. /core-cs/binary-search, /core-cs/dynamic-programming)
 * Shows: Theory, time/space complexity, code in multiple languages, common interview Q&A
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2, ChevronRight, Clock, Target, Star, BookOpen,
  Zap, ArrowRight, CheckCircle2, Lightbulb,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Core CS Topic Data ─────────────────────────────────────────────────── */
// Deep-dive topic articles — in production fetched from MongoDB topic-content collection
const CORE_CS_TOPICS: Record<string, {
  title:        string;
  category:     string;
  difficulty:   "Beginner" | "Intermediate" | "Advanced";
  readTime:     string;
  tags:         string[];
  intro:        string;
  sections:     { heading: string; content: string; codeExample?: string; language?: string }[];
  complexity:   { time: string; space: string; notation: string; desc: string }[];
  interviewQA:  { q: string; a: string }[];
  relatedTopics:{ slug: string; title: string }[];
  practiceLinks:{ title: string; href: string; difficulty: string }[];
}> = {
  "binary-search": {
    title:      "Binary Search",
    category:   "Searching Algorithms",
    difficulty: "Beginner",
    readTime:   "8 min read",
    tags:       ["Algorithms", "Searching", "Array", "O(log n)", "FAANG"],
    intro:
      "Binary search is an efficient algorithm for finding an element in a sorted array. " +
      "It works by repeatedly halving the search space — eliminating half the remaining elements " +
      "with each comparison. Time complexity: O(log n) — far superior to linear search O(n) for large arrays.",
    sections: [
      {
        heading: "How Binary Search Works",
        content:
          "Binary search requires the array to be sorted. It maintains two pointers — low and high — " +
          "representing the current search range. In each step:\n" +
          "1. Find the middle element: mid = (low + high) // 2\n" +
          "2. If target == arr[mid], return mid\n" +
          "3. If target < arr[mid], search the left half (high = mid - 1)\n" +
          "4. If target > arr[mid], search the right half (low = mid + 1)\n" +
          "5. If low > high, the element is not in the array (return -1)",
        codeExample:
`# Python — Iterative Binary Search
def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2    # Avoid integer overflow

        if arr[mid] == target:
            return mid             # Found — return index
        elif arr[mid] < target:
            low = mid + 1          # Search right half
        else:
            high = mid - 1         # Search left half

    return -1                      # Not found

# Example
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(arr, 7))    # Output: 3 (index of 7)
print(binary_search(arr, 6))    # Output: -1 (not found)`,
        language: "python",
      },
      {
        heading: "Recursive Variant",
        content: "Binary search can also be implemented recursively. The recursive version uses the call stack instead of explicit low/high variables, but is otherwise identical in logic.",
        codeExample:
`# Python — Recursive Binary Search
def binary_search_recursive(arr, target, low, high):
    if low > high:
        return -1                  # Base case: not found

    mid = (low + high) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, high)
    else:
        return binary_search_recursive(arr, target, low, mid - 1)

arr = [2, 4, 6, 8, 10, 12]
result = binary_search_recursive(arr, 8, 0, len(arr) - 1)
print(result)  # Output: 3`,
        language: "python",
      },
      {
        heading: "JavaScript Implementation",
        content: "Same algorithm in JavaScript — the most common language for web developer interviews at companies like Google, Meta, and Amazon.",
        codeExample:
`// JavaScript — Binary Search
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2); // Integer division

    if (arr[mid] === target) return mid;       // Found
    if (arr[mid] < target) low = mid + 1;      // Search right
    else high = mid - 1;                       // Search left
  }

  return -1; // Not found
}

const arr = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(arr, 7));   // 3
console.log(binarySearch(arr, 4));   // -1`,
        language: "javascript",
      },
    ],
    complexity: [
      { time:"O(log n)", space:"O(1)",      notation:"Iterative",  desc:"Halves the search space each iteration" },
      { time:"O(log n)", space:"O(log n)",  notation:"Recursive",  desc:"Call stack depth equals log n"          },
      { time:"O(n)",     space:"O(1)",      notation:"Worst (Linear)", desc:"Linear search for comparison"       },
    ],
    interviewQA: [
      {
        q: "Why does binary search require a sorted array?",
        a: "Binary search works by eliminating half the search space based on whether the target is greater or smaller than the middle element. This comparison only makes sense if elements are in a known order. On an unsorted array, you cannot determine which half contains the target.",
      },
      {
        q: "What is the potential integer overflow issue in mid = (low + high) / 2?",
        a: "If low and high are both large integers (e.g., near INT_MAX), their sum can overflow. The safe alternative is: mid = low + (high - low) / 2 — this never overflows since (high - low) is always ≤ high.",
      },
      {
        q: "When would you prefer linear search over binary search?",
        a: "When the array is unsorted and sorting it first would be too expensive, when the array is very small (overhead of binary search isn't worth it), or when searching a linked list (binary search on a linked list requires O(n) to reach the middle).",
      },
      {
        q: "Can binary search be applied to non-array data structures?",
        a: "Yes — binary search can be applied to any monotonic function. For example: finding a square root, minimizing/maximizing a value, or searching in a rotated sorted array.",
      },
    ],
    relatedTopics: [
      { slug:"linear-search",      title:"Linear Search"       },
      { slug:"two-pointers",       title:"Two Pointers"        },
      { slug:"divide-and-conquer", title:"Divide and Conquer"  },
      { slug:"sorting-algorithms", title:"Sorting Algorithms"  },
    ],
    practiceLinks: [
      { title:"Search in Sorted Array",         href:"/practice", difficulty:"Easy"   },
      { title:"First and Last Position",        href:"/practice", difficulty:"Medium" },
      { title:"Search in Rotated Sorted Array", href:"/practice", difficulty:"Medium" },
      { title:"Median of Two Sorted Arrays",    href:"/practice", difficulty:"Hard"   },
    ],
  },

  "dynamic-programming": {
    title:      "Dynamic Programming",
    category:   "Algorithm Paradigm",
    difficulty: "Advanced",
    readTime:   "15 min read",
    tags:       ["DP", "Memoization", "Tabulation", "FAANG", "Hard"],
    intro:
      "Dynamic Programming (DP) is a technique that solves complex problems by breaking them into " +
      "overlapping sub-problems and storing results to avoid redundant computation. " +
      "DP is used in ~40% of FAANG interview problems.",
    sections: [
      {
        heading: "Two Approaches: Top-Down vs Bottom-Up",
        content:
          "Top-Down (Memoization): Start with the original problem, recursively solve sub-problems, " +
          "and cache (memoize) results. Uses recursion + a hash map.\n\n" +
          "Bottom-Up (Tabulation): Start from the smallest sub-problems, fill a table iteratively " +
          "until the original problem is solved. More memory efficient (no recursion overhead).",
        codeExample:
`# Classic DP Problem: Fibonacci
# Naive recursive — O(2^n) — extremely slow
def fib_naive(n):
    if n <= 1: return n
    return fib_naive(n-1) + fib_naive(n-2)

# Top-Down DP (Memoization) — O(n)
def fib_memo(n, memo={}):
    if n in memo: return memo[n]          # Return cached result
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Bottom-Up DP (Tabulation) — O(n) time, O(1) space
def fib_tab(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b           # Only store last 2 values
    return b

print(fib_tab(10))   # 55
print(fib_tab(50))   # 12586269025`,
        language: "python",
      },
    ],
    complexity: [
      { time:"O(n)",    space:"O(n)",  notation:"Memoization",   desc:"N unique sub-problems, each solved once" },
      { time:"O(n)",    space:"O(1)",  notation:"Tabulation (optimized)", desc:"Space optimization for 1D DP" },
      { time:"O(n²)",   space:"O(n²)", notation:"2D DP (LCS/LIS)", desc:"For 2-sequence problems" },
    ],
    interviewQA: [
      {
        q: "How do you identify if a problem can be solved with DP?",
        a: "Two key properties: (1) Optimal Substructure — optimal solution can be built from optimal solutions to sub-problems. (2) Overlapping Sub-problems — the same sub-problems are solved multiple times in a naive recursive approach.",
      },
      {
        q: "What are common DP patterns?",
        a: "1. 0/1 Knapsack, 2. Unbounded Knapsack, 3. Longest Common Subsequence (LCS), 4. Longest Increasing Subsequence (LIS), 5. Matrix Chain Multiplication, 6. Coin Change, 7. Edit Distance. Recognizing which pattern applies is the key skill.",
      },
    ],
    relatedTopics: [
      { slug:"recursion",           title:"Recursion"          },
      { slug:"greedy-algorithms",   title:"Greedy Algorithms"  },
      { slug:"binary-search",       title:"Binary Search"      },
    ],
    practiceLinks: [
      { title:"Climbing Stairs",     href:"/practice", difficulty:"Easy"   },
      { title:"Coin Change",         href:"/practice", difficulty:"Medium" },
      { title:"Longest Common Subsequence", href:"/practice", difficulty:"Medium" },
      { title:"Edit Distance",       href:"/practice", difficulty:"Hard"   },
    ],
  },
};

/* ─── Fallback for unknown slugs ─────────────────────────────────────────── */
function getTopicData(slug: string) {
  return CORE_CS_TOPICS[slug] ?? {
    title:      slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    category:   "Computer Science",
    difficulty: "Intermediate" as const,
    readTime:   "5 min read",
    tags:       ["CS", "Algorithms"],
    intro:      "Detailed topic guide coming soon. In the meantime, explore related topics below.",
    sections:   [],
    complexity: [],
    interviewQA:[{ q:"How is this topic used in interviews?", a:"It appears in technical interviews at top tech companies. Mastering it gives you a competitive edge." }],
    relatedTopics:[{ slug:"binary-search", title:"Binary Search" }],
    practiceLinks:[{ title:"Practice Problems", href:"/practice", difficulty:"Mixed" }],
  };
}

/* ─── generateMetadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getTopicData(slug);
  return {
    title:       `${data.title} — Core CS | LearnVeda`,
    description: data.intro.slice(0, 150) + "...",
    keywords:    data.tags,
  };
}

/* ─── Difficulty Color ───────────────────────────────────────────────────── */
const DIFF_COLOR = {
  Beginner:     "bg-green-500/10 text-green-600 border-green-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Advanced:     "bg-red-500/10 text-red-600 border-red-500/20",
};

/* ─── Core CS Topic Page ─────────────────────────────────────────────────── */
export default async function CoreCSTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data      = getTopicData(slug);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="border-b">
        <div className="container px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/learn/engineering" className="hover:text-foreground transition-colors">Engineering</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/programming/dsa" className="hover:text-foreground transition-colors">DSA</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{data.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ─── Article Content ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Article header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">{data.category}</Badge>
                <Badge className={`text-xs ${DIFF_COLOR[data.difficulty]}`}>{data.difficulty}</Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Clock className="h-3.5 w-3.5" />
                  {data.readTime}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{data.title}</h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {data.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                ))}
              </div>

              {/* Intro */}
              <p className="text-muted-foreground leading-relaxed">{data.intro}</p>
            </div>

            {/* Theory Sections */}
            {data.sections.map((section, i) => (
              <div key={i} className="space-y-3">
                <h2 className="text-xl font-bold">{section.heading}</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{section.content}</p>

                {section.codeExample && (
                  <div className="rounded-xl border bg-zinc-950 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500"    />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"  />
                      </div>
                      <Badge variant="outline" className="text-[10px] border-white/20 text-white/40">
                        {section.language ?? "python"}
                      </Badge>
                    </div>
                    <pre className="p-4 text-sm text-green-400 font-mono overflow-x-auto">
                      <code>{section.codeExample}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}

            {/* Complexity Table */}
            {data.complexity.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Time & Space Complexity</h2>
                <div className="rounded-xl border overflow-hidden">
                  <div className="grid grid-cols-4 bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground">
                    <span>Variant</span><span>Time</span><span>Space</span><span>Notes</span>
                  </div>
                  {data.complexity.map((c, i) => (
                    <div key={i} className={`grid grid-cols-4 px-4 py-3 text-sm border-t ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                      <span className="font-medium">{c.notation}</span>
                      <span className="font-mono text-primary">{c.time}</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{c.space}</span>
                      <span className="text-muted-foreground text-xs">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Q&A */}
            {data.interviewQA.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Interview Questions
                </h2>
                <div className="space-y-4">
                  {data.interviewQA.map((qa, i) => (
                    <div key={i} className="rounded-xl border bg-card p-5">
                      <div className="font-semibold text-sm mb-2 flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">Q</span>
                        {qa.q}
                      </div>
                      <div className="text-sm text-muted-foreground pl-7">{qa.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Sidebar ─────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Practice problems */}
            <div className="rounded-2xl border bg-card p-5 sticky top-4">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Practice Problems
              </h3>
              <div className="space-y-2">
                {data.practiceLinks.map((p) => (
                  <Link
                    key={p.title}
                    href={p.href}
                    className="group flex items-center gap-2 rounded-lg border bg-muted/20 hover:bg-muted/50 p-2.5 transition-colors"
                  >
                    <Code2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium line-clamp-1">{p.title}</div>
                    </div>
                    <Badge className={`text-[9px] py-0 shrink-0 ${
                      p.difficulty === "Easy"   ? "bg-green-500/10 text-green-600 border-green-500/20" :
                      p.difficulty === "Medium" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                      p.difficulty === "Hard"   ? "bg-red-500/10 text-red-600 border-red-500/20" :
                                                  "bg-muted text-muted-foreground"
                    }`}>
                      {p.difficulty}
                    </Badge>
                  </Link>
                ))}
              </div>

              <div className="mt-4">
                <Button asChild className="w-full" size="sm">
                  <Link href="/practice">View All Problems</Link>
                </Button>
              </div>
            </div>

            {/* Related topics */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Related Topics
              </h3>
              <div className="space-y-1">
                {data.relatedTopics.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/core-cs/${t.slug}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
