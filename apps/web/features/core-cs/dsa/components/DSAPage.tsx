/**
 * @file features/core-cs/dsa/components/DSAPage.tsx
 * @description DSA 60-Day learning plan full page component
 *
 * Complete Data Structures & Algorithms curriculum:
 *  Phase 1 (Days 1–15):  Arrays, Strings, Hashing, Two Pointers, Sliding Window
 *  Phase 2 (Days 16–30): Linked Lists, Stacks, Queues, Recursion, Backtracking
 *  Phase 3 (Days 31–45): Trees, Heaps, Graphs, Union-Find, Tries
 *  Phase 4 (Days 46–60): Dynamic Programming, Greedy, Divide & Conquer, Bit Manipulation
 *
 * Used in: app/(platform)/core-cs/dsa/page.tsx
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2, Circle, Clock, Code2, Play, ArrowRight,
  ChevronDown, ChevronUp, Star, Zap, Target, Brain,
  GitBranch, Layers, BarChart3,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── DSA Day Plan ───────────────────────────────────────────────────────── */
const DSA_DAYS = [
  // Phase 1: Arrays, Strings, Hashing (Days 1–15)
  { day:1,  phase:1, topic:"Arrays — Basics",                 difficulty:"Easy",   concepts:["Declaration","Traversal","Insert/Delete","2D arrays"],        problems:["Two Sum","Best Time to Buy Stock","Contains Duplicate"],  time:45  },
  { day:2,  phase:1, topic:"Arrays — Kadane's Algorithm",     difficulty:"Medium", concepts:["Max subarray","Prefix sums","Running max"],                   problems:["Maximum Subarray","Subarray Sum Equals K"],               time:50  },
  { day:3,  phase:1, topic:"Two Pointers",                    difficulty:"Medium", concepts:["Left/right pointers","Fast/slow","Sorted arrays"],            problems:["Valid Palindrome","3Sum","Container With Most Water"],     time:55  },
  { day:4,  phase:1, topic:"Sliding Window",                  difficulty:"Medium", concepts:["Fixed window","Variable window","Window shrinking"],          problems:["Longest Substring Without Repeating","Min Size Subarray"], time:55  },
  { day:5,  phase:1, topic:"Binary Search",                   difficulty:"Medium", concepts:["Template 1/2/3","Rotated arrays","Search space"],             problems:["Binary Search","Search in Rotated Array","Kth Smallest"],  time:50  },
  { day:6,  phase:1, topic:"Sorting Algorithms",              difficulty:"Easy",   concepts:["Bubble/Selection/Insertion","Merge Sort","Quick Sort","Heap"], problems:["Sort an Array","Merge Intervals","Largest Number"],        time:60  },
  { day:7,  phase:1, topic:"Strings — Basics",                difficulty:"Easy",   concepts:["Manipulation","Anagrams","Palindromes","Reverse"],            problems:["Valid Anagram","Longest Common Prefix","Reverse Words"],   time:45  },
  { day:8,  phase:1, topic:"Strings — Advanced",              difficulty:"Medium", concepts:["KMP","Z-algorithm","Rabin-Karp","String hashing"],            problems:["Find All Anagrams","Minimum Window Substring"],           time:60  },
  { day:9,  phase:1, topic:"Hash Maps & Hash Sets",           difficulty:"Medium", concepts:["HashMap ops","Collision handling","Custom hash","groupBy"],   problems:["Group Anagrams","Top K Frequent","Two Sum (hashmap)"],     time:50  },
  { day:10, phase:1, topic:"Matrix Problems",                 difficulty:"Medium", concepts:["DFS on matrix","Spiral traversal","Rotation","Flood fill"],   problems:["Number of Islands","Spiral Matrix","Rotate Image"],        time:55  },
  { day:11, phase:1, topic:"Bit Manipulation Basics",         difficulty:"Easy",   concepts:["AND/OR/XOR","Left/right shift","Power of 2","Count bits"],    problems:["Single Number","Number of 1 Bits","Counting Bits"],        time:45  },
  { day:12, phase:1, topic:"Prefix Sums & Difference Arrays", difficulty:"Medium", concepts:["Range sum query","2D prefix","Difference array"],             problems:["Range Sum Query","Subarray Sum Divisible by K"],          time:50  },
  { day:13, phase:1, topic:"Math for DSA",                    difficulty:"Easy",   concepts:["GCD/LCM","Prime sieve","Modular arithmetic","Combinatorics"], problems:["Count Primes","Pow(x,n)","Excel Sheet Column"],            time:45  },
  { day:14, phase:1, topic:"Practice Day 1",                  difficulty:"Medium", concepts:["Mixed: Arrays + Strings","Timed practice","Review"],          problems:["5 LeetCode Medium problems from Phase 1"],                 time:90  },
  { day:15, phase:1, topic:"Phase 1 Review",                  difficulty:"Easy",   concepts:["Concept review","Common patterns","Time/space complexity"],   problems:["Revise all Phase 1 problem types"],                       time:60  },
  // Phase 2: Linked Lists, Stacks, Queues, Recursion (Days 16–30)
  { day:16, phase:2, topic:"Linked Lists — Singly",           difficulty:"Easy",   concepts:["Node structure","Insert/Delete","Traversal","Reverse"],       problems:["Reverse Linked List","Middle of Linked List","Merge Two Sorted Lists"],time:50 },
  { day:17, phase:2, topic:"Linked Lists — Advanced",         difficulty:"Medium", concepts:["Cycle detection","Floyd's algo","Nth from end","Intersection"],problems:["Linked List Cycle","Reorder List","LRU Cache"],           time:55  },
  { day:18, phase:2, topic:"Stacks",                          difficulty:"Medium", concepts:["LIFO","Monotonic stack","Expression eval","Min stack"],        problems:["Valid Parentheses","Daily Temperatures","Largest Rectangle in Histogram"],time:55 },
  { day:19, phase:2, topic:"Queues & Deques",                 difficulty:"Medium", concepts:["FIFO","Circular queue","Deque","Sliding window max"],         problems:["Implement Queue using Stacks","Sliding Window Maximum"],  time:50  },
  { day:20, phase:2, topic:"Recursion — Basics",              difficulty:"Medium", concepts:["Base case","Recursive tree","Memoization intro","Call stack"],problems:["Fibonacci","Climbing Stairs","Power of Three"],           time:50  },
  { day:21, phase:2, topic:"Recursion — Backtracking",        difficulty:"Hard",   concepts:["Decision tree","Prune early","Permutations","Subsets"],       problems:["Subsets","Permutations","Combination Sum","N-Queens"],     time:70  },
  { day:22, phase:2, topic:"Divide & Conquer",                difficulty:"Medium", concepts:["Merge sort","Quick select","Count inversions","Binary D&C"],  problems:["Sort Colors","Kth Largest Element","Median of Two Sorted Arrays"],time:60 },
  { day:23, phase:2, topic:"Heaps & Priority Queues",         difficulty:"Medium", concepts:["Min-heap","Max-heap","Heapify","K-way merge"],                problems:["Kth Largest","Top K Frequent","Merge K Sorted Lists"],     time:55  },
  { day:24, phase:2, topic:"Monotonic Stack — Advanced",      difficulty:"Hard",   concepts:["Next greater element","Stock span","Trapping rain water"],     problems:["Largest Rectangle","Trapping Rain Water","Remove K Digits"],time:65 },
  { day:25, phase:2, topic:"Two-pointer + Sliding Window Mix",difficulty:"Medium", concepts:["Pattern identification","When to use which","Practice"],       problems:["Minimum Window Substring","Max Consecutive Ones III"],      time:60  },
  { day:26, phase:2, topic:"String + Stack problems",         difficulty:"Medium", concepts:["Balanced brackets","Decode string","Expression parsing"],      problems:["Decode String","Remove Duplicate Letters"],               time:55  },
  { day:27, phase:2, topic:"Practice Day 2",                  difficulty:"Hard",   concepts:["Phase 2 timed contest","3 Medium + 1 Hard"],                  problems:["4 problems from Phase 2 topics"],                         time:90  },
  { day:28, phase:2, topic:"Review & Complexity Analysis",    difficulty:"Easy",   concepts:["Big-O review","Space vs time","Common patterns","Amortized"], problems:["Re-solve 5 problems with optimal solutions"],              time:60  },
  { day:29, phase:2, topic:"System Design Intro for Coding",  difficulty:"Medium", concepts:["HashMap internals","Stack memory","Queue in OS","Buffer"],     problems:["LRU Cache","LFU Cache"],                                  time:60  },
  { day:30, phase:2, topic:"Phase 1+2 Mock Test",             difficulty:"Hard",   concepts:["Timed 3-hour test","Phase 1+2 combined","Submission"],         problems:["5 problems in 180 minutes"],                              time:180 },
  // Phase 3: Trees, Heaps, Graphs (Days 31–45)
  { day:31, phase:3, topic:"Binary Trees — Basics",           difficulty:"Easy",   concepts:["Tree nodes","BFS/DFS","Inorder/Preorder/Postorder"],           problems:["Maximum Depth","Inorder Traversal","Symmetric Tree"],      time:50  },
  { day:32, phase:3, topic:"Binary Trees — Advanced",         difficulty:"Medium", concepts:["Level order","Diameter","Path sum","Lowest common ancestor"],  problems:["Binary Tree Level Order","Diameter of Binary Tree","LCA"],  time:60  },
  { day:33, phase:3, topic:"Binary Search Trees",             difficulty:"Medium", concepts:["BST property","Insert/delete","Inorder = sorted","Validate"], problems:["Validate BST","Kth Smallest","BST Iterator"],              time:55  },
  { day:34, phase:3, topic:"AVL Trees & Red-Black Trees",     difficulty:"Hard",   concepts:["Rotations","Balance factor","Self-balancing","Why they matter"],problems:["Conceptual: draw AVL rotations","Library use cases"],      time:60  },
  { day:35, phase:3, topic:"Tries",                           difficulty:"Medium", concepts:["Prefix tree","Insert/Search","Autocomplete","Word Dictionary"],problems:["Implement Trie","Search Suggestions","Word Search II"],    time:60  },
  { day:36, phase:3, topic:"Graphs — Basics",                 difficulty:"Medium", concepts:["Adjacency list/matrix","BFS","DFS","Connected components"],    problems:["Number of Islands","Clone Graph","Course Schedule"],        time:65  },
  { day:37, phase:3, topic:"Graph — Shortest Paths",          difficulty:"Hard",   concepts:["Dijkstra","Bellman-Ford","Floyd-Warshall","SSSP vs APSP"],     problems:["Network Delay Time","Cheapest Flight","Path with Min Effort"],time:70 },
  { day:38, phase:3, topic:"Graph — Topological Sort",        difficulty:"Medium", concepts:["DFS-based","Kahn's BFS","DAG detection","Dependencies"],       problems:["Course Schedule","Alien Dictionary","Sequence Reconstruction"],time:60 },
  { day:39, phase:3, topic:"Union-Find (Disjoint Set Union)", difficulty:"Medium", concepts:["find/union","Path compression","Rank","Cycle detection"],      problems:["Number of Connected Components","Redundant Connection"],    time:55  },
  { day:40, phase:3, topic:"Minimum Spanning Tree",           difficulty:"Medium", concepts:["Kruskal's","Prim's","Greedy choice","Edge weights"],           problems:["Min Cost to Connect All Points","Kruskal implementation"],  time:60  },
  { day:41, phase:3, topic:"Graph — Advanced (SCC, Bridges)", difficulty:"Hard",   concepts:["Tarjan's","Kosaraju's","Bridges","Articulation points"],        problems:["Critical Connections in Network","Find Eventual Safe States"],time:70},
  { day:42, phase:3, topic:"Heap Problems Deep Dive",         difficulty:"Hard",   concepts:["K-way merge","Median finder","Task scheduler","Custom comparator"],problems:["Find Median from Data Stream","Task Scheduler"],        time:65  },
  { day:43, phase:3, topic:"Tree DP",                         difficulty:"Hard",   concepts:["DP on trees","Subtree states","Rerooting technique"],          problems:["Binary Tree Cameras","Diameter","Maximum Path Sum"],        time:70  },
  { day:44, phase:3, topic:"Practice Day 3 — Trees + Graphs", difficulty:"Hard",   concepts:["Timed practice","Mixed tree+graph","Phase 3 patterns"],        problems:["4 Medium/Hard problems"],                                  time:90  },
  { day:45, phase:3, topic:"Phase 3 Review",                  difficulty:"Medium", concepts:["Tree vs Graph patterns","BFS vs DFS heuristics","When to use Trie"],problems:["Re-solve 5 key problems"],                          time:60  },
  // Phase 4: Dynamic Programming (Days 46–60)
  { day:46, phase:4, topic:"DP Fundamentals",                 difficulty:"Medium", concepts:["Top-down","Bottom-up","Memoization","Tabulation","State definition"],problems:["Climbing Stairs","Min Cost Climbing","House Robber"], time:60  },
  { day:47, phase:4, topic:"1D DP",                           difficulty:"Medium", concepts:["Fibonacci variants","Jump Game","Decode Ways","Coin Change"],   problems:["Coin Change","Jump Game","Decode Ways"],                   time:65  },
  { day:48, phase:4, topic:"2D DP — Grid",                    difficulty:"Medium", concepts:["Unique Paths","Grid DP","Min path sum","Obstacle grid"],        problems:["Unique Paths","Minimum Path Sum","Dungeon Game"],          time:65  },
  { day:49, phase:4, topic:"DP on Strings",                   difficulty:"Hard",   concepts:["LCS","LIS","Edit distance","Longest Palindromic Subsequence"], problems:["Longest Common Subsequence","Edit Distance","LIS"],        time:70  },
  { day:50, phase:4, topic:"Knapsack Problems",               difficulty:"Hard",   concepts:["0/1 Knapsack","Unbounded","Subset sum","Partition"],            problems:["Partition Equal Subset Sum","Target Sum","Knapsack"],     time:70  },
  { day:51, phase:4, topic:"Interval DP",                     difficulty:"Hard",   concepts:["Matrix chain mult","Burst balloons","Palindrome partitioning"],  problems:["Burst Balloons","Palindrome Partitioning","Strange Printer"],time:70},
  { day:52, phase:4, topic:"DP with Bitmask",                 difficulty:"Hard",   concepts:["Subset enumeration","TSP","Bitmask states","Assignment problem"],problems:["Shortest Path Visiting All Nodes","Maximum Students"],    time:70  },
  { day:53, phase:4, topic:"Greedy Algorithms",               difficulty:"Medium", concepts:["Activity selection","Huffman","Fractional knapsack","Intervals"],problems:["Jump Game II","Gas Station","Non-overlapping Intervals"], time:60  },
  { day:54, phase:4, topic:"Math & Number Theory",            difficulty:"Medium", concepts:["Sieve","Euler's totient","Fast exponentiation","Chinese RT"],   problems:["Count Primes","Excel Sheet","Happy Number","Reverse Integer"],time:55},
  { day:55, phase:4, topic:"Advanced Bit Manipulation",       difficulty:"Hard",   concepts:["XOR tricks","Popcount","Brian Kernighan","Bit DP"],             problems:["Counting Bits","Maximum XOR","Subset XOR Sum"],           time:60  },
  { day:56, phase:4, topic:"Segment Tree & BIT (Fenwick)",    difficulty:"Hard",   concepts:["Range queries","Point updates","BIT construction","Lazy prop"], problems:["Range Sum Query Mutable","Count Smaller Numbers After Self"],time:75},
  { day:57, phase:4, topic:"Practice Day 4 — DP Focus",       difficulty:"Hard",   concepts:["5 DP problems in 3 hours","Time pressure","Pattern ID"],        problems:["5 DP problems"],                                          time:180 },
  { day:58, phase:4, topic:"FAANG Mock Interview 1",          difficulty:"Hard",   concepts:["30-min coding problem","Explain + code","Time + space analysis"],problems:["1 FAANG-style interview problem with explanation"],       time:60  },
  { day:59, phase:4, topic:"FAANG Mock Interview 2",          difficulty:"Hard",   concepts:["System design intuition","Behavioral","Coding + explanation"],   problems:["1 FAANG-style problem + system discussion"],              time:60  },
  { day:60, phase:4, topic:"Final Review & Next Steps",       difficulty:"Medium", concepts:["Pattern library","Cheat sheet","What to do after 60 days"],     problems:["Re-solve 10 all-time favorite problems"],                  time:120 },
];

const DSA_PHASES = [
  { id:1, name:"Arrays, Strings & Hashing",         days:"1–15",  color:"from-blue-500 to-cyan-500",     bg:"bg-blue-500/10",   border:"border-blue-500/20"   },
  { id:2, name:"Linked Lists, Stacks & Recursion",  days:"16–30", color:"from-green-500 to-teal-500",    bg:"bg-green-500/10",  border:"border-green-500/20"  },
  { id:3, name:"Trees, Heaps & Graphs",             days:"31–45", color:"from-purple-500 to-violet-500", bg:"bg-purple-500/10", border:"border-purple-500/20" },
  { id:4, name:"Dynamic Programming & Advanced",    days:"46–60", color:"from-orange-500 to-red-500",    bg:"bg-orange-500/10", border:"border-orange-500/20" },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy:   "border-green-500/40 text-green-600",
  Medium: "border-yellow-500/40 text-yellow-600",
  Hard:   "border-red-500/40 text-red-600",
};

export function DSAPage() {
  const [completedDays] = useState<Set<number>>(new Set([1, 2, 3]));
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));

  function togglePhase(id: number) {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const progressPct = Math.round((completedDays.size / 60) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">🌳</span>
        <div>
          <h1 className="text-3xl font-bold text-foreground">DSA — 60-Day FAANG Plan</h1>
          <p className="text-muted-foreground text-sm">Arrays to DP. Zero to interview-ready.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 my-6">
        {[
          { icon: Target,   label:"60 Days",       sub:"Complete curriculum" },
          { icon: Code2,    label:"200+ Problems",  sub:"LeetCode-style"     },
          { icon: Zap,      label:"FAANG Ready",    sub:"Interview prepared"  },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border bg-card p-3 text-center">
            <div className="flex justify-center mb-1 text-brand-500"><stat.icon className="h-4 w-4" /></div>
            <p className="font-bold text-sm text-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{completedDays.size}/60 days ({progressPct}%)</span>
        </div>
        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Phase accordions */}
      <div className="space-y-4">
        {DSA_PHASES.map(phase => {
          const phaseDays   = DSA_DAYS.filter(d => d.phase === phase.id);
          const doneInPhase = phaseDays.filter(d => completedDays.has(d.day)).length;
          const isExpanded  = expandedPhases.has(phase.id);
          return (
            <div key={phase.id} className={`rounded-2xl border ${phase.border} overflow-hidden`}>
              <button onClick={() => togglePhase(phase.id)} className={`w-full flex items-center justify-between p-4 ${phase.bg} hover:opacity-90 transition-opacity`}>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-white text-xs font-bold whitespace-nowrap`}>Phase {phase.id}</div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm">{phase.name}</p>
                    <p className="text-xs text-muted-foreground">Days {phase.days} · {doneInPhase}/{phaseDays.length} done</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
              </button>

              {isExpanded && (
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {phaseDays.map((d, i) => {
                    const isDone = completedDays.has(d.day);
                    const isNext = !isDone && d.day === Math.min(...DSA_DAYS.filter(x => !completedDays.has(x.day)).map(x => x.day));
                    return (
                      <motion.div key={d.day} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.025 }}
                        className={`flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors ${isDone ? "opacity-70" : ""}`}>
                        {isDone ? <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" /> : <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />}

                        {/* Day number */}
                        <div className="flex-shrink-0 w-8 mt-0.5">
                          <span className="text-xs font-bold text-muted-foreground">D{d.day}</span>
                        </div>

                        {/* Topic + difficulty + problems */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={`font-medium text-sm ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>{d.topic}</p>
                            <Badge variant="outline" className={`text-xs h-4 ${DIFFICULTY_COLORS[d.difficulty]}`}>{d.difficulty}</Badge>
                          </div>
                          {/* Sample problems */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {d.problems.slice(0, 2).map(p => (
                              <span key={p} className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded-md">{p}</span>
                            ))}
                          </div>
                        </div>

                        {/* Time + CTA */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {d.time}m
                          </span>
                          <Link href={`/core-cs/dsa/day-${String(d.day).padStart(2,"0")}`}>
                            {isNext ? (
                              <Button size="sm" className="gap-1 h-7 text-xs"><Play className="h-3 w-3" /> Start</Button>
                            ) : (
                              <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">{isDone ? "Review" : "Open"} <ArrowRight className="h-3 w-3" /></Button>
                            )}
                          </Link>
                        </div>
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
