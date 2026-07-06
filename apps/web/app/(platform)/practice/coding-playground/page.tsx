/**
 * @file app/(platform)/practice/coding-playground/page.tsx
 * @description Coding Playground — quick code practice with pre-loaded challenges
 * Route: /practice/coding-playground
 *
 * Light-weight practice environment (not the full compiler).
 * Shows curated coding challenges with difficulty levels.
 * "Solve in Compiler" button redirects to /compiler with the challenge pre-loaded.
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2, Terminal, Zap, Star, Clock, Target,
  ArrowRight, Filter, Search, Bookmark, Check,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

/* ─── Challenge catalogue ─────────────────────────────────────────────────── */
/**
 * CHALLENGES
 * Curated coding challenges across difficulty levels and topics.
 * Each challenge links to /compiler with a pre-loaded template.
 */
const CHALLENGES = [
  {
    id:         "reverse-string",
    title:      "Reverse a String",
    topic:      "Strings",
    difficulty: "Easy"   as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         20,
    solved:     false,
    description: "Write a function that takes a string and returns it reversed. Handle edge cases: empty string, single character, palindromes.",
    example:    "Input: 'hello' → Output: 'olleh'",
    hint:       "Consider using two pointers or the built-in reverse methods.",
  },
  {
    id:         "fibonacci",
    title:      "Fibonacci Sequence",
    topic:      "Recursion / DP",
    difficulty: "Easy"   as const,
    languages:  ["Python", "JavaScript", "Java", "C"],
    xp:         20,
    solved:     true,
    description: "Return the n-th Fibonacci number. Implement both recursive and iterative solutions and compare their time complexities.",
    example:    "Input: 7 → Output: 13 (0,1,1,2,3,5,8,13...)",
    hint:       "Start with recursion, then optimize with memoization or bottom-up DP.",
  },
  {
    id:         "two-sum",
    title:      "Two Sum",
    topic:      "Hash Map",
    difficulty: "Easy"   as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         25,
    solved:     false,
    description: "Given an array of integers and a target, return indices of two numbers that add up to target. Assume exactly one solution exists.",
    example:    "Input: [2,7,11,15], target=9 → Output: [0,1]",
    hint:       "Use a hash map to achieve O(n) time complexity.",
  },
  {
    id:         "valid-parentheses",
    title:      "Valid Parentheses",
    topic:      "Stack",
    difficulty: "Easy"   as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         25,
    solved:     false,
    description: "Given a string containing '(', ')', '{', '}', '[', ']', determine if the input string is valid. Open brackets must be closed in the correct order.",
    example:    "Input: '({[]})' → true | Input: '({)}' → false",
    hint:       "Use a stack — push open brackets, pop on close.",
  },
  {
    id:         "binary-search",
    title:      "Binary Search",
    topic:      "Searching",
    difficulty: "Easy"   as const,
    languages:  ["Python", "JavaScript", "Java", "C"],
    xp:         20,
    solved:     true,
    description: "Implement binary search on a sorted array. Return the index of the target, or -1 if not found.",
    example:    "Input: [-1,0,3,5,9,12], target=9 → Output: 4",
    hint:       "Maintain low and high pointers and find the midpoint each iteration.",
  },
  {
    id:         "merge-sort",
    title:      "Merge Sort",
    topic:      "Sorting",
    difficulty: "Medium" as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         40,
    solved:     false,
    description: "Implement the merge sort algorithm. It should sort an array of integers in ascending order using divide and conquer.",
    example:    "Input: [38,27,43,3,9,82,10] → Output: [3,9,10,27,38,43,82]",
    hint:       "Divide into halves, recursively sort each half, then merge.",
  },
  {
    id:         "linked-list-reverse",
    title:      "Reverse Linked List",
    topic:      "Linked Lists",
    difficulty: "Medium" as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         40,
    solved:     false,
    description: "Reverse a singly linked list. Implement both iterative and recursive solutions.",
    example:    "Input: 1→2→3→4→5 → Output: 5→4→3→2→1",
    hint:       "Iterative: use three pointers (prev, curr, next). Recursive: think base case.",
  },
  {
    id:         "lcs",
    title:      "Longest Common Subsequence",
    topic:      "Dynamic Programming",
    difficulty: "Hard"   as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         60,
    solved:     false,
    description: "Given two strings, find the length of their longest common subsequence. A subsequence doesn't need to be contiguous.",
    example:    "Input: 'abcde', 'ace' → Output: 3 ('ace')",
    hint:       "Build a 2D DP table where dp[i][j] = LCS length of s1[0..i] and s2[0..j].",
  },
  {
    id:         "matrix-multiply",
    title:      "Matrix Multiplication",
    topic:      "Arrays / Math",
    difficulty: "Medium" as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         35,
    solved:     false,
    description: "Multiply two matrices A (m×n) and B (n×p). Return the resulting m×p matrix.",
    example:    "A=[[1,2],[3,4]], B=[[5,6],[7,8]] → [[19,22],[43,50]]",
    hint:       "Use three nested loops. The middle dimension must match: A cols = B rows.",
  },
  {
    id:         "anagram-check",
    title:      "Check Anagram",
    topic:      "Strings / Hashing",
    difficulty: "Easy"   as const,
    languages:  ["Python", "JavaScript", "Java", "C"],
    xp:         20,
    solved:     false,
    description: "Given two strings, determine if one is an anagram of the other. An anagram uses the same characters with the same frequency.",
    example:    "Input: 'listen', 'silent' → true | 'hello', 'world' → false",
    hint:       "Sort both strings and compare, or use a frequency map.",
  },
  {
    id:         "prime-sieve",
    title:      "Sieve of Eratosthenes",
    topic:      "Math / Algorithms",
    difficulty: "Medium" as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         40,
    solved:     false,
    description: "Implement the Sieve of Eratosthenes to find all prime numbers up to a given limit n.",
    example:    "Input: 30 → Output: [2,3,5,7,11,13,17,19,23,29]",
    hint:       "Mark composites by crossing out multiples of each prime starting from p².",
  },
  {
    id:         "bfs-graph",
    title:      "BFS — Graph Traversal",
    topic:      "Graphs / BFS",
    difficulty: "Medium" as const,
    languages:  ["Python", "JavaScript", "Java", "C++"],
    xp:         45,
    solved:     false,
    description: "Implement Breadth-First Search on an undirected graph. Print nodes in BFS order starting from a given source node.",
    example:    "Graph: 0-1, 0-2, 1-3, 2-3. Start: 0 → Output: 0 1 2 3",
    hint:       "Use a queue and a visited set. Enqueue neighbors of each dequeued node.",
  },
] as const;

type Difficulty = "Easy" | "Medium" | "Hard" | "All";
const DIFFICULTY_COLORS = {
  Easy:   "text-green-600 border-green-400/40 bg-green-500/5",
  Medium: "text-yellow-600 border-yellow-400/40 bg-yellow-500/5",
  Hard:   "text-red-600 border-red-400/40 bg-red-500/5",
} as const;

export default function CodingPlaygroundPage() {
  const [search,     setSearch]     = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("All");
  const [topic,      setTopic]      = useState("All");

  const topics = ["All", ...Array.from(new Set(CHALLENGES.map((c) => c.topic)))];

  const filtered = CHALLENGES.filter((c) => {
    const matchDiff    = difficulty === "All" || c.difficulty === difficulty;
    const matchTopic   = topic === "All"       || c.topic === topic;
    const matchSearch  = search === ""         || c.title.toLowerCase().includes(search.toLowerCase()) || c.topic.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchTopic && matchSearch;
  });

  const solvedCount = CHALLENGES.filter((c) => c.solved).length;
  const totalXp     = CHALLENGES.reduce((acc, c) => acc + c.xp, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-green-950/5 to-background py-14">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/practice" className="hover:text-foreground">Practice</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Coding Playground</span>
          </nav>
          <Badge variant="secondary" className="mb-3">{CHALLENGES.length} Challenges · All Levels</Badge>
          <h1 className="text-3xl font-extrabold mb-4">🖥️ Coding Playground</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            Curated coding challenges across arrays, strings, graphs, DP, and more.
            Solve directly in the LearnVeda compiler with 13 languages.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><Code2 className="h-4 w-4" /> {CHALLENGES.length} Challenges</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-green-500" /> {solvedCount} Solved</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> {totalXp} total XP</span>
          </div>
          <Button variant="gradient" size="lg" asChild>
            <Link href="/compiler"><Terminal className="h-4 w-4" /> Open Full Compiler</Link>
          </Button>
        </div>
      </section>

      {/* Filter row */}
      <section className="border-b bg-muted/30 py-4 sticky top-0 z-10">
        <div className="container px-4 md:px-6 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-44 max-w-xs">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search challenges…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
          </div>
          {(["All","Easy","Medium","Hard"] as Difficulty[]).map((d) => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${difficulty === d ? "bg-brand-500 text-white border-brand-500" : "hover:bg-muted"}`}>
              {d}
            </button>
          ))}
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-lg border bg-background px-3 h-9 text-sm">
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </section>

      {/* Challenge grid */}
      <section className="py-10">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-5 text-sm text-muted-foreground">
            <span>Showing {filtered.length} of {CHALLENGES.length} challenges</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((challenge, i) => (
              <motion.div key={challenge.id} initial={{ opacity: 0.01, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className={`rounded-2xl border bg-card p-5 hover:shadow-md transition-all ${challenge.solved ? "border-green-500/20 bg-green-500/5" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{challenge.title}</h3>
                      {challenge.solved && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-xs">{challenge.topic}</Badge>
                      <Badge variant="outline" className={`text-xs ${DIFFICULTY_COLORS[challenge.difficulty]}`}>{challenge.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs text-brand-500 border-brand-400/40">+{challenge.xp} XP</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{challenge.description}</p>
                <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs font-mono text-muted-foreground mb-4">
                  <span className="text-foreground font-semibold">Example: </span>{challenge.example}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {challenge.languages.slice(0, 3).map((lang) => (
                      <span key={lang} className="rounded-md bg-muted px-2 py-0.5 text-xs">{lang}</span>
                    ))}
                    {challenge.languages.length > 3 && <span className="rounded-md bg-muted px-2 py-0.5 text-xs">+{challenge.languages.length - 3}</span>}
                  </div>
                  <Button size="sm" variant="gradient" className="h-8 text-xs gap-1.5" asChild>
                    <Link href={`/compiler?challenge=${challenge.id}`}>
                      <Terminal className="h-3 w-3" />
                      {challenge.solved ? "Revisit" : "Solve"}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
