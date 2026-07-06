/**
 * @file app/(platform)/core-cs/dsa/page.tsx
 * @description DSA (Data Structures & Algorithms) track hub page
 * Route: /core-cs/dsa
 *
 * Complete 60-day DSA structured learning plan:
 *   Phase 1 (Days 1–15):  Arrays, Strings, Hashing
 *   Phase 2 (Days 16–30): Linked Lists, Stacks, Queues, Recursion
 *   Phase 3 (Days 31–45): Trees, Heaps, Graphs
 *   Phase 4 (Days 46–60): Dynamic Programming, Greedy, Divide & Conquer
 *
 * Every day: theory section, 3–5 practice problems (LeetCode-style), simulation link.
 * Server component for SSR + SEO.
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import {
  BarChart2, ChevronRight, Clock, Star, CheckCircle2,
  Lock, Play, ArrowRight, Zap, Target, BookOpen,
  TrendingUp, Award,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "DSA 60-Day Plan — Data Structures & Algorithms | LearnVeda",
  description:
    "Structured 60-day DSA course from scratch to FAANG-ready. Arrays, Trees, Graphs, Dynamic Programming — with practice problems and visualizations.",
  keywords: ["DSA roadmap", "Data Structures India", "Algorithms for placements", "FAANG DSA prep", "LeetCode guide"],
  openGraph: {
    title: "DSA 60-Day Plan — LearnVeda",
    description: "Master DSA in 60 days — structured plan from Arrays to Dynamic Programming with simulations.",
    type: "website",
  },
};

/* ─── Phase Type ─────────────────────────────────────────────────────────── */
interface DSADay {
  day:       number;   // Day number
  title:     string;   // Lesson title
  topics:    string[]; // Topics covered
  difficulty: "Easy" | "Medium" | "Hard"; // Difficulty level
  hasSimulation: boolean; // Is there a visualization?
  isCompleted?: boolean;  // Demo progress state
}

interface DSAPhase {
  number:    number;   // Phase number (1–4)
  title:     string;   // Phase title
  duration:  string;   // Duration (e.g., "Days 1–15")
  focus:     string;   // Primary focus area
  color:     string;   // Tailwind color
  days:      DSADay[]; // Days in this phase
}

/* ─── DSA Plan Data ──────────────────────────────────────────────────────── */
const DSA_PHASES: DSAPhase[] = [
  {
    number:   1,
    title:    "Phase 1: Linear Data Structures",
    duration: "Days 1–15",
    focus:    "Arrays, Strings, Hashing, Two Pointers",
    color:    "blue",
    days: [
      { day:1,  title:"Arrays & Big-O Notation",          topics:["Arrays","Time Complexity","Big-O","O(n)","O(log n)"], difficulty:"Easy",   hasSimulation:false, isCompleted:true },
      { day:2,  title:"Array Operations & Patterns",      topics:["Insertion","Deletion","Search","Prefix Sum"],         difficulty:"Easy",   hasSimulation:false, isCompleted:true },
      { day:3,  title:"Two Pointer Technique",            topics:["Two Pointers","Sorted Array","Pair Sum","Remove Duplicates"], difficulty:"Easy", hasSimulation:false, isCompleted:true },
      { day:4,  title:"Sliding Window",                   topics:["Sliding Window","Max Subarray","Anagram Check"],      difficulty:"Medium", hasSimulation:false, isCompleted:false },
      { day:5,  title:"Strings — Basics & Patterns",      topics:["Strings","charAt","substring","Palindrome","Anagram"], difficulty:"Easy",  hasSimulation:false, isCompleted:false },
      { day:6,  title:"String Manipulation",              topics:["Reversal","Pattern Matching","Brute Force KMP"],      difficulty:"Medium", hasSimulation:false },
      { day:7,  title:"Hashing — HashMap & HashSet",      topics:["HashMap","HashSet","Frequency Count","Collision"],   difficulty:"Easy",   hasSimulation:false },
      { day:8,  title:"HashMap Problems",                 topics:["Two Sum","Group Anagrams","LRU Cache idea"],          difficulty:"Medium", hasSimulation:false },
      { day:9,  title:"Prefix Sum & Difference Array",    topics:["Prefix Sum","Range Query","Subarray Sum"],           difficulty:"Medium", hasSimulation:false },
      { day:10, title:"Sorting Algorithms",               topics:["Bubble","Selection","Insertion","Merge","Quick Sort"], difficulty:"Medium", hasSimulation:true },
      { day:11, title:"Binary Search",                    topics:["Binary Search","Search in Rotated Array","Lower Bound"], difficulty:"Medium", hasSimulation:false },
      { day:12, title:"Binary Search on Answer Space",    topics:["Minimum Maximum","Aggressive Cows","Painter Partition"], difficulty:"Hard", hasSimulation:false },
      { day:13, title:"Matrix — 2D Arrays",               topics:["Matrix Traversal","Rotation","Spiral Order","Search in Matrix"], difficulty:"Medium", hasSimulation:false },
      { day:14, title:"Bit Manipulation",                 topics:["AND","OR","XOR","Left Shift","Right Shift","Single Number"], difficulty:"Medium", hasSimulation:false },
      { day:15, title:"Phase 1 Revision & Contest",       topics:["Arrays","Strings","Hashing","Binary Search","Sorting"], difficulty:"Hard", hasSimulation:false },
    ],
  },
  {
    number:   2,
    title:    "Phase 2: Linked Lists, Stacks & Queues",
    duration: "Days 16–30",
    focus:    "Pointer-based structures and recursion",
    color:    "green",
    days: [
      { day:16, title:"Linked Lists — Introduction",      topics:["Singly Linked List","Node","Head","Traversal"],    difficulty:"Easy",   hasSimulation:false },
      { day:17, title:"Linked List Operations",           topics:["Insertion","Deletion","Reversal","Middle Node"],  difficulty:"Medium", hasSimulation:false },
      { day:18, title:"Doubly & Circular Linked Lists",   topics:["DLL","Circular LL","LRU Cache (full)"],          difficulty:"Medium", hasSimulation:false },
      { day:19, title:"Fast & Slow Pointer",              topics:["Floyd's Algorithm","Cycle Detection","Find Cycle Node"], difficulty:"Medium", hasSimulation:false },
      { day:20, title:"Stack — LIFO Structure",           topics:["Stack","Push","Pop","Peek","Valid Parentheses"], difficulty:"Easy",   hasSimulation:false },
      { day:21, title:"Monotonic Stack",                  topics:["Monotonic Stack","Next Greater Element","Stock Span"], difficulty:"Hard", hasSimulation:false },
      { day:22, title:"Queue — FIFO Structure",           topics:["Queue","Enqueue","Dequeue","BFS Queue"],         difficulty:"Easy",   hasSimulation:false },
      { day:23, title:"Deque & Priority Queue (Heap)",    topics:["Deque","Min Heap","Max Heap","K-th Largest"],   difficulty:"Medium", hasSimulation:false },
      { day:24, title:"Recursion Fundamentals",           topics:["Base Case","Recursive Case","Call Stack","Tree Recursion"], difficulty:"Medium", hasSimulation:false },
      { day:25, title:"Recursion — Classic Problems",     topics:["Fibonacci","Power of Two","Print Patterns","Tower of Hanoi"], difficulty:"Medium", hasSimulation:false },
      { day:26, title:"Backtracking",                     topics:["Backtracking","Subsets","Permutations","N-Queens"], difficulty:"Hard", hasSimulation:false },
      { day:27, title:"Backtracking — Word Search",       topics:["Word Search","Sudoku Solver","Rat in Maze"],    difficulty:"Hard",   hasSimulation:false },
      { day:28, title:"Divide and Conquer",               topics:["Merge Sort","Quick Sort","Closest Pair","Karatsuba"], difficulty:"Hard", hasSimulation:true },
      { day:29, title:"Binary Search Tree",               topics:["BST","Insert","Delete","Search","Inorder Successor"], difficulty:"Medium", hasSimulation:true },
      { day:30, title:"Phase 2 Revision & Contest",       topics:["Linked Lists","Stacks","Queues","Recursion","Backtracking"], difficulty:"Hard", hasSimulation:false },
    ],
  },
  {
    number:   3,
    title:    "Phase 3: Trees & Graphs",
    duration: "Days 31–45",
    focus:    "Hierarchical and network data structures",
    color:    "purple",
    days: [
      { day:31, title:"Binary Trees — Introduction",      topics:["Binary Tree","Height","Depth","Full","Complete","Perfect"], difficulty:"Easy",   hasSimulation:false },
      { day:32, title:"Tree Traversals",                  topics:["Inorder","Preorder","Postorder","Level Order (BFS)"], difficulty:"Medium", hasSimulation:true },
      { day:33, title:"Tree Problems — Views & Paths",    topics:["Left View","Right View","Path Sum","Diameter"],   difficulty:"Medium", hasSimulation:false },
      { day:34, title:"AVL Trees & Balanced BST",         topics:["AVL Tree","Balancing","Rotation","Height Balance"], difficulty:"Hard", hasSimulation:false },
      { day:35, title:"Heap & Priority Queue (deep)",     topics:["Heap Implementation","Heapify","Heap Sort","K-way merge"], difficulty:"Hard", hasSimulation:false },
      { day:36, title:"Tries (Prefix Trees)",             topics:["Trie","Insert","Search","Delete","Autocomplete"], difficulty:"Hard",   hasSimulation:false },
      { day:37, title:"Graphs — Introduction",            topics:["Graph","Vertices","Edges","Directed","Undirected","Adjacency List"], difficulty:"Easy", hasSimulation:false },
      { day:38, title:"Graph BFS & DFS",                  topics:["BFS","DFS","Level Order","Visited Array","Connected Components"], difficulty:"Medium", hasSimulation:true },
      { day:39, title:"Topological Sort",                 topics:["DAG","Topological Sort","Kahn's Algorithm","DFS Topo"], difficulty:"Hard", hasSimulation:false },
      { day:40, title:"Shortest Path — Dijkstra",         topics:["Dijkstra","Priority Queue","SSSP","Weighted Graph"], difficulty:"Hard", hasSimulation:false },
      { day:41, title:"Shortest Path — Bellman-Ford",     topics:["Bellman-Ford","Negative Weights","SPFA"],          difficulty:"Hard", hasSimulation:false },
      { day:42, title:"Minimum Spanning Tree",            topics:["MST","Kruskal","Prim","Union-Find","Greedy"],      difficulty:"Hard", hasSimulation:false },
      { day:43, title:"Union-Find (Disjoint Set Union)",  topics:["DSU","Union","Find","Path Compression","Rank"],   difficulty:"Hard",   hasSimulation:false },
      { day:44, title:"Graph Cycles & Bipartite Check",   topics:["Cycle Detection","Bipartite","2-Coloring","DFS Cycle"], difficulty:"Hard", hasSimulation:false },
      { day:45, title:"Phase 3 Revision & Contest",       topics:["Trees","Graphs","Heaps","Tries","Shortest Path"], difficulty:"Hard", hasSimulation:false },
    ],
  },
  {
    number:   4,
    title:    "Phase 4: Dynamic Programming & Advanced",
    duration: "Days 46–60",
    focus:    "Optimization algorithms for FAANG interviews",
    color:    "orange",
    days: [
      { day:46, title:"DP Introduction — Fibonacci Optimization", topics:["Memoization","Tabulation","Top-down","Bottom-up"], difficulty:"Medium", hasSimulation:true },
      { day:47, title:"1D DP Problems",                  topics:["Climbing Stairs","House Robber","Jump Game","Coin Change"], difficulty:"Medium", hasSimulation:false },
      { day:48, title:"2D DP — Grid Problems",           topics:["Unique Paths","Min Path Sum","Grid DP"],            difficulty:"Hard",   hasSimulation:false },
      { day:49, title:"0/1 Knapsack",                    topics:["Knapsack","Subset Sum","Equal Partition","Count Partitions"], difficulty:"Hard", hasSimulation:true },
      { day:50, title:"Unbounded Knapsack",              topics:["Unbounded Knapsack","Coin Change 2","Rod Cutting","Minimum Coins"], difficulty:"Hard", hasSimulation:false },
      { day:51, title:"Subsequence DP — LCS, LIS",       topics:["LCS","LIS","Edit Distance","Print LCS"],           difficulty:"Hard",   hasSimulation:false },
      { day:52, title:"DP on Strings",                   topics:["Palindrome DP","Palindrome Partitioning","Distinct Subsequences"], difficulty:"Hard", hasSimulation:false },
      { day:53, title:"DP on Trees",                     topics:["Tree DP","Max Independent Set","Diameter with DP"], difficulty:"Hard",   hasSimulation:false },
      { day:54, title:"Greedy Algorithms",               topics:["Activity Selection","Job Scheduling","Fractional Knapsack","Huffman"], difficulty:"Hard", hasSimulation:false },
      { day:55, title:"Greedy — Interval Problems",      topics:["Merge Intervals","Non-overlapping Intervals","Meeting Rooms"], difficulty:"Hard", hasSimulation:false },
      { day:56, title:"Segment Trees",                   topics:["Segment Tree","Range Min","Range Sum","Lazy Propagation"], difficulty:"Hard", hasSimulation:false },
      { day:57, title:"Fenwick Tree (BIT)",              topics:["Fenwick Tree","BIT","Point Update","Prefix Query"], difficulty:"Hard",   hasSimulation:false },
      { day:58, title:"Advanced Hashing & String Algorithms", topics:["Rabin-Karp","KMP","Z-function","Rolling Hash"], difficulty:"Hard",  hasSimulation:false },
      { day:59, title:"System Design for Interviews",    topics:["URL Shortener","Rate Limiting","Consistent Hashing","Sharding"], difficulty:"Hard", hasSimulation:false },
      { day:60, title:"Final Mock Interview & Review",   topics:["Full Review","Mock Interview","Behavioral","STAR Method"], difficulty:"Hard", hasSimulation:false },
    ],
  },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function DSATrackPage() {
  /* Calculate progress from demo completion state */
  const allDays     = DSA_PHASES.flatMap((p) => p.days);
  const completed   = allDays.filter((d) => d.isCompleted).length;
  const totalDays   = allDays.length;
  const progressPct = Math.round((completed / totalDays) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/core-cs" className="hover:text-foreground transition-colors">Core CS</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">DSA 60-Day Plan</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <BarChart2 className="h-7 w-7 text-blue-500" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">DSA 60-Day Plan</h1>
              <p className="text-muted-foreground mt-1">
                From absolute zero to FAANG-ready — structured daily lessons, practice problems, and simulations.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">60 Days</Badge>
                <Badge variant="secondary">250+ Problems</Badge>
                <Badge variant="secondary">4 Phases</Badge>
                <Badge variant="outline" className="border-green-500/50 text-green-600">Free</Badge>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-6 rounded-xl border border-border/40 bg-card p-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">{completed}/{totalDays} days ({progressPct}%)</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Days Completed", value: completed,          icon: CheckCircle2, color: "text-green-500" },
              { label: "Days Remaining", value: totalDays - completed, icon: Clock,        color: "text-blue-500" },
              { label: "Practice Probs", value: "240+",             icon: Target,       color: "text-orange-500" },
              { label: "Simulations",    value: "8",                icon: Play,         color: "text-purple-500" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/40 bg-card p-3 text-center">
                <stat.icon className={`h-4 w-4 ${stat.color} mx-auto mb-1`} />
                <p className="font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {DSA_PHASES.map((phase) => (
          <section key={phase.number} aria-labelledby={`phase-${phase.number}-heading`}>
            {/* Phase header */}
            <div className={`rounded-xl border border-${phase.color}-500/20 bg-${phase.color}-500/5 p-5 mb-6`}>
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-${phase.color}-500 flex items-center justify-center text-white font-bold text-lg`}>
                  {phase.number}
                </div>
                <div>
                  <h2 id={`phase-${phase.number}-heading`} className="font-bold text-lg">{phase.title}</h2>
                  <p className="text-sm text-muted-foreground">{phase.duration} · {phase.focus}</p>
                </div>
              </div>
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {phase.days.map((day) => (
                <Link
                  key={day.day}
                  href={`/core-cs/dsa/day-${day.day}`}
                  className={`group rounded-xl border bg-card p-4 hover:border-border/80 hover:shadow-sm transition-all ${
                    day.isCompleted ? "border-green-500/30" : "border-border/40"
                  }`}
                >
                  {/* Day header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {day.isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      ) : (
                        <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center text-xs font-bold border-${phase.color}-500/40 text-${phase.color}-500`}>
                          {day.day}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">Day {day.day}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {day.hasSimulation && (
                        <Badge variant="outline" className="text-xs border-purple-500/40 text-purple-600 px-1.5 py-0">
                          <Play className="h-2.5 w-2.5 mr-0.5" />Sim
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          day.difficulty === "Easy"   ? "border-green-500/40 text-green-600" :
                          day.difficulty === "Medium" ? "border-yellow-500/40 text-yellow-600" :
                          "border-red-500/40 text-red-600"
                        }`}
                      >
                        {day.difficulty}
                      </Badge>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold leading-tight group-hover:text-brand-500 transition-colors mb-2">
                    {day.title}
                  </h3>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1">
                    {day.topics.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs bg-muted/60 rounded px-1.5 py-0.5 text-muted-foreground">{t}</span>
                    ))}
                    {day.topics.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{day.topics.length - 3}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-8 text-center">
          <Award className="h-10 w-10 text-brand-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Complete all 60 days to earn your DSA Certificate</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Share it on LinkedIn and prove your algorithmic skills to potential employers.
          </p>
          <Button asChild>
            <Link href="/core-cs/dsa/day-1">
              Start from Day 1 <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
