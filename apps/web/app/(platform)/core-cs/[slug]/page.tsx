/**
 * @file app/(platform)/core-cs/[slug]/page.tsx
 * @description Dynamic Core CS subject page
 * Route: /core-cs/[slug] — e.g. /core-cs/dsa, /core-cs/os
 *
 * Shows structured topic list for each Core CS subject with:
 *  - Topic cards (difficulty, XP, estimated time)
 *  - Progress tracking (Demo: random %, real: from MongoDB)
 *  - Quick access to AI Tutor for this subject
 *  - Related simulations
 */

import type { Metadata } from "next";
import { notFound }      from "next/navigation";
import Link              from "next/link";
import {
  ChevronRight, Brain, Server, Database, Network,
  Layers, Globe2, Code2, Trophy, GitBranch, Play,
  BookOpen, CheckCircle2, Clock, Star, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Subject Data ───────────────────────────────────────────────────────── */
type Topic = {
  id:         string;
  title:      string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  xp:         number;    // XP earned on completion
  minutes:    number;    // Estimated study time
};

type SubjectConfig = {
  slug:       string;
  title:      string;
  icon:       React.ComponentType<{ className?: string }>;
  color:      string;    // Tailwind bg+text class
  tagline:    string;
  description: string;
  topics:     Topic[];
};

const SUBJECTS: Record<string, SubjectConfig> = {
  dsa: {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    icon: Brain,
    color: "bg-purple-500/10 text-purple-500",
    tagline: "The foundation of software engineering interviews",
    description: "Master every data structure and algorithm needed for FAANG-level interviews. From arrays and strings to dynamic programming and graphs — fully covered with 500+ problems.",
    topics: [
      { id: "arrays",         title: "Arrays & Strings",           difficulty: "Beginner",     xp: 60,  minutes: 45  },
      { id: "linked-list",    title: "Linked Lists",               difficulty: "Beginner",     xp: 60,  minutes: 40  },
      { id: "stacks-queues",  title: "Stacks & Queues",            difficulty: "Beginner",     xp: 50,  minutes: 35  },
      { id: "trees",          title: "Binary Trees & BST",         difficulty: "Intermediate", xp: 80,  minutes: 60  },
      { id: "heaps",          title: "Heaps & Priority Queues",    difficulty: "Intermediate", xp: 70,  minutes: 50  },
      { id: "hashing",        title: "Hashing & Hash Maps",        difficulty: "Intermediate", xp: 70,  minutes: 45  },
      { id: "graphs",         title: "Graphs: BFS, DFS, Dijkstra", difficulty: "Advanced",     xp: 100, minutes: 90  },
      { id: "sorting",        title: "Sorting Algorithms",         difficulty: "Intermediate", xp: 60,  minutes: 50  },
      { id: "binary-search",  title: "Binary Search",              difficulty: "Intermediate", xp: 70,  minutes: 40  },
      { id: "recursion",      title: "Recursion & Backtracking",   difficulty: "Intermediate", xp: 80,  minutes: 60  },
      { id: "dp",             title: "Dynamic Programming",        difficulty: "Advanced",     xp: 120, minutes: 120 },
      { id: "greedy",         title: "Greedy Algorithms",          difficulty: "Advanced",     xp: 90,  minutes: 70  },
      { id: "sliding-window", title: "Sliding Window & Two Pointers", difficulty: "Intermediate", xp: 70, minutes: 50 },
      { id: "trie",           title: "Tries & Segment Trees",      difficulty: "Advanced",     xp: 100, minutes: 80  },
      { id: "bit-manipulation",title: "Bit Manipulation",          difficulty: "Intermediate", xp: 60,  minutes: 40  },
    ],
  },
  os: {
    slug: "os",
    title: "Operating Systems",
    icon: Server,
    color: "bg-blue-500/10 text-blue-500",
    tagline: "How computers really work — under the hood",
    description: "Deep dive into process management, memory management, file systems, CPU scheduling, deadlock handling, and concurrency. Essential for systems programming and interviews.",
    topics: [
      { id: "intro",           title: "Introduction to OS",               difficulty: "Beginner",     xp: 40,  minutes: 30  },
      { id: "processes",       title: "Processes & Threads",              difficulty: "Beginner",     xp: 50,  minutes: 40  },
      { id: "cpu-scheduling",  title: "CPU Scheduling Algorithms",        difficulty: "Intermediate", xp: 70,  minutes: 55  },
      { id: "synchronization", title: "Process Synchronization",          difficulty: "Intermediate", xp: 80,  minutes: 60  },
      { id: "deadlock",        title: "Deadlock Detection & Prevention",  difficulty: "Intermediate", xp: 70,  minutes: 50  },
      { id: "memory",          title: "Memory Management",                difficulty: "Intermediate", xp: 80,  minutes: 60  },
      { id: "virtual-memory",  title: "Virtual Memory & Paging",          difficulty: "Advanced",     xp: 90,  minutes: 70  },
      { id: "file-systems",    title: "File Systems",                     difficulty: "Intermediate", xp: 70,  minutes: 55  },
      { id: "io",              title: "I/O Management",                   difficulty: "Intermediate", xp: 60,  minutes: 45  },
    ],
  },
  dbms: {
    slug: "dbms",
    title: "Database Management Systems",
    icon: Database,
    color: "bg-green-500/10 text-green-500",
    tagline: "Master SQL, normalization, and database design",
    description: "Relational databases, SQL mastery, normalization, transactions (ACID), indexing, query optimization, NoSQL databases, and database design patterns.",
    topics: [
      { id: "er-model",      title: "ER Model & Relational Model",   difficulty: "Beginner",     xp: 50,  minutes: 40  },
      { id: "sql-basics",    title: "SQL: SELECT, INSERT, UPDATE",   difficulty: "Beginner",     xp: 50,  minutes: 45  },
      { id: "joins",         title: "SQL Joins & Subqueries",        difficulty: "Intermediate", xp: 70,  minutes: 50  },
      { id: "normalization", title: "Normalization (1NF–BCNF)",      difficulty: "Intermediate", xp: 80,  minutes: 60  },
      { id: "transactions",  title: "Transactions & ACID Properties",difficulty: "Intermediate", xp: 80,  minutes: 55  },
      { id: "indexing",      title: "Indexing & Query Optimization",  difficulty: "Advanced",     xp: 90,  minutes: 65  },
      { id: "concurrency",   title: "Concurrency Control",           difficulty: "Advanced",     xp: 80,  minutes: 60  },
      { id: "nosql",         title: "NoSQL Databases (MongoDB, Redis)",difficulty: "Intermediate",xp: 70,  minutes: 50  },
    ],
  },
  "computer-networks": {
    slug: "computer-networks",
    title: "Computer Networks",
    icon: Network,
    color: "bg-cyan-500/10 text-cyan-500",
    tagline: "How data travels across the internet",
    description: "OSI and TCP/IP models, HTTP/HTTPS, DNS, routing protocols, TCP vs UDP, IP addressing, subnetting, firewalls, and network security. Essential for backend and cloud engineering.",
    topics: [
      { id: "osi-model",    title: "OSI Model & Layers",            difficulty: "Beginner",     xp: 50,  minutes: 40  },
      { id: "tcp-ip",       title: "TCP/IP Model",                  difficulty: "Beginner",     xp: 50,  minutes: 40  },
      { id: "http",         title: "HTTP/HTTPS & REST",             difficulty: "Intermediate", xp: 60,  minutes: 45  },
      { id: "dns",          title: "DNS & Domain Resolution",       difficulty: "Intermediate", xp: 60,  minutes: 40  },
      { id: "tcp-udp",      title: "TCP vs UDP",                    difficulty: "Intermediate", xp: 70,  minutes: 50  },
      { id: "ip-subnetting",title: "IP Addressing & Subnetting",   difficulty: "Intermediate", xp: 70,  minutes: 55  },
      { id: "routing",      title: "Routing Protocols (OSPF, BGP)", difficulty: "Advanced",     xp: 80,  minutes: 60  },
      { id: "security",     title: "Network Security & Firewalls",  difficulty: "Advanced",     xp: 80,  minutes: 60  },
    ],
  },
  "system-design": {
    slug: "system-design",
    title: "System Design",
    icon: Layers,
    color: "bg-orange-500/10 text-orange-500",
    tagline: "Design systems that scale to millions of users",
    description: "Learn to design scalable, reliable, and maintainable systems. Covers load balancing, caching, databases, microservices, message queues, CDNs, and real-world system case studies.",
    topics: [
      { id: "fundamentals",    title: "System Design Fundamentals",        difficulty: "Beginner",     xp: 50,  minutes: 45  },
      { id: "load-balancing",  title: "Load Balancing & Reverse Proxies",  difficulty: "Intermediate", xp: 70,  minutes: 50  },
      { id: "caching",         title: "Caching Strategies (Redis, CDN)",   difficulty: "Intermediate", xp: 80,  minutes: 55  },
      { id: "databases-sd",    title: "Database Choices & Sharding",       difficulty: "Intermediate", xp: 80,  minutes: 60  },
      { id: "microservices",   title: "Microservices Architecture",        difficulty: "Advanced",     xp: 100, minutes: 75  },
      { id: "message-queues",  title: "Message Queues (Kafka, RabbitMQ)",  difficulty: "Advanced",     xp: 90,  minutes: 65  },
      { id: "api-design",      title: "API Design: REST & GraphQL",        difficulty: "Intermediate", xp: 70,  minutes: 50  },
      { id: "case-studies",    title: "Case Studies: Twitter, YouTube, Uber", difficulty: "Advanced",  xp: 120, minutes: 90  },
    ],
  },
  "web-development": {
    slug: "web-development",
    title: "Web Development",
    icon: Globe2,
    color: "bg-brand-500/10 text-brand-500",
    tagline: "Build modern full-stack web applications",
    description: "HTML, CSS, JavaScript, TypeScript, React, Node.js, databases, authentication, deployment. From fundamentals to full-stack. Build real projects every week.",
    topics: [
      { id: "html-css",    title: "HTML5 & CSS3 Fundamentals",    difficulty: "Beginner",     xp: 40,  minutes: 40  },
      { id: "javascript",  title: "JavaScript ES6+ Deep Dive",    difficulty: "Intermediate", xp: 70,  minutes: 60  },
      { id: "typescript",  title: "TypeScript for JavaScript Devs",difficulty: "Intermediate",xp: 70,  minutes: 55  },
      { id: "react",       title: "React 19 & Next.js 15",        difficulty: "Intermediate", xp: 80,  minutes: 70  },
      { id: "nodejs",      title: "Node.js & Express",             difficulty: "Intermediate", xp: 70,  minutes: 60  },
      { id: "databases-wd",title: "SQL & NoSQL Databases",         difficulty: "Intermediate", xp: 70,  minutes: 55  },
      { id: "auth",        title: "Authentication & Security",     difficulty: "Intermediate", xp: 80,  minutes: 60  },
      { id: "deployment",  title: "CI/CD & Cloud Deployment",      difficulty: "Advanced",     xp: 90,  minutes: 65  },
    ],
  },
  "competitive-programming": {
    slug: "competitive-programming",
    title: "Competitive Programming",
    icon: Trophy,
    color: "bg-red-500/10 text-red-500",
    tagline: "Compete on Codeforces, LeetCode, and CodeChef",
    description: "Structured competitive programming track covering all algorithm categories. From Div 3 to Div 1 level on Codeforces. Includes practice contests and editorial explanations.",
    topics: [
      { id: "basics",       title: "CP Basics & I/O Optimization",  difficulty: "Beginner",     xp: 40,  minutes: 30  },
      { id: "math",         title: "Number Theory & Math",           difficulty: "Intermediate", xp: 70,  minutes: 55  },
      { id: "sorting-cp",   title: "Sorting Techniques",             difficulty: "Beginner",     xp: 50,  minutes: 40  },
      { id: "graphs-cp",    title: "Graph Algorithms in CP",         difficulty: "Advanced",     xp: 100, minutes: 90  },
      { id: "dp-cp",        title: "DP in Competitive Programming",  difficulty: "Advanced",     xp: 120, minutes: 120 },
      { id: "trees-cp",     title: "Trees & Advanced Structures",    difficulty: "Advanced",     xp: 100, minutes: 90  },
      { id: "strings-cp",   title: "String Algorithms (KMP, Trie)",  difficulty: "Advanced",     xp: 90,  minutes: 75  },
    ],
  },
  "interview-preparation": {
    slug: "interview-preparation",
    title: "Interview Preparation",
    icon: Code2,
    color: "bg-teal-500/10 text-teal-500",
    tagline: "Land offers at FAANG and top Indian tech companies",
    description: "Complete interview preparation roadmap. Covers DSA, system design, behavioral questions, HR rounds, resume building, and mock interview practice for top companies.",
    topics: [
      { id: "resume",       title: "Resume Building & ATS Optimization", difficulty: "Beginner",    xp: 30,  minutes: 30  },
      { id: "dsa-interview",title: "DSA Problem Patterns (Top 75)",      difficulty: "Intermediate",xp: 80,  minutes: 70  },
      { id: "sd-interview", title: "System Design Interview Guide",       difficulty: "Advanced",    xp: 100, minutes: 90  },
      { id: "behavioral",   title: "Behavioral & HR Questions",           difficulty: "Beginner",    xp: 40,  minutes: 35  },
      { id: "sql-interview",title: "SQL Interview Questions",             difficulty: "Intermediate",xp: 60,  minutes: 45  },
      { id: "mock-interview",title: "Mock Interview Practice",            difficulty: "Intermediate",xp: 90,  minutes: 60  },
    ],
  },
  git: {
    slug: "git",
    title: "Git & Version Control",
    icon: GitBranch,
    color: "bg-amber-500/10 text-amber-500",
    tagline: "Essential for every software engineer",
    description: "Git from zero to advanced. Covers commit, branch, merge, rebase, pull requests, GitHub workflow, CI/CD integration, and team collaboration best practices.",
    topics: [
      { id: "basics-git",  title: "Git Basics: init, commit, push",  difficulty: "Beginner",     xp: 30,  minutes: 25  },
      { id: "branching",   title: "Branching & Merging",              difficulty: "Beginner",     xp: 40,  minutes: 30  },
      { id: "rebase",      title: "Rebase & Cherry-Pick",             difficulty: "Intermediate", xp: 60,  minutes: 45  },
      { id: "github",      title: "GitHub: PRs, Issues, Actions",     difficulty: "Intermediate", xp: 60,  minutes: 45  },
      { id: "git-flow",    title: "Git Flow & Team Workflow",         difficulty: "Intermediate", xp: 60,  minutes: 40  },
      { id: "advanced-git",title: "Advanced Git (stash, bisect, hooks)",difficulty: "Advanced",   xp: 70,  minutes: 50  },
    ],
  },
};

/* ─── Difficulty badge colors ────────────────────────────────────────────── */
const DIFF_COLOR: Record<string, string> = {
  Beginner:     "bg-green-500/10 text-green-600 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Advanced:     "bg-red-500/10 text-red-600 border-red-500/20",
};

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const subject = SUBJECTS[slug];
  if (!subject) return { title: "Not Found" };
  return {
    title:       `${subject.title} — LearnVeda Core CS`,
    description: subject.description,
  };
}

/* ─── Generate static paths ──────────────────────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(SUBJECTS).map((slug) => ({ slug }));
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default async function CoreCSSubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject  = SUBJECTS[slug];

  if (!subject) notFound(); // Return 404 for unknown slugs

  const totalXP   = subject.topics.reduce((a, t) => a + t.xp, 0);
  const totalMins = subject.topics.reduce((a, t) => a + t.minutes, 0);
  const SubjectIcon = subject.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/core-cs/dsa" className="hover:text-foreground">Core CS</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{subject.title}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-2xl ${subject.color} flex-shrink-0`}>
            <SubjectIcon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{subject.title}</h1>
            <p className="text-brand-500 font-medium text-sm mt-0.5">{subject.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">{subject.description}</p>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
          <div className="rounded-xl border bg-card p-3 text-center">
            <BookOpen className="h-5 w-5 text-brand-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{subject.topics.length}</p>
            <p className="text-xs text-muted-foreground">Topics</p>
          </div>
          <div className="rounded-xl border bg-card p-3 text-center">
            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{totalXP}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="rounded-xl border bg-card p-3 text-center">
            <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{Math.round(totalMins / 60)}h</p>
            <p className="text-xs text-muted-foreground">Study Time</p>
          </div>
        </div>

        {/* Topic list */}
        <div className="space-y-3">
          {subject.topics.map((topic, i) => (
            <div
              key={topic.id}
              className="flex items-center gap-4 p-4 rounded-2xl border bg-card hover:shadow-sm hover:border-brand-500/30 transition-all cursor-pointer group"
            >
              {/* Topic number */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
              </div>

              {/* Topic info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-brand-500 transition-colors">
                    {topic.title}
                  </h3>
                  <Badge variant="outline" className={`text-xs ${DIFF_COLOR[topic.difficulty]}`}>
                    {topic.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Topic meta */}
              <div className="flex items-center gap-4 flex-shrink-0 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-brand-500" />
                  +{topic.xp} XP
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {topic.minutes} min
                </span>
                <Play className="h-4 w-4 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* AI Tutor CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/ai-tutor" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors">
            <Zap className="h-4 w-4" />
            Ask AI Tutor about {subject.title}
          </Link>
          <Link href="/simulations" className="flex items-center gap-2 px-6 py-3 rounded-xl border bg-card font-semibold hover:border-brand-500/50 transition-colors">
            <Play className="h-4 w-4" />
            View Simulations
          </Link>
        </div>
      </div>
    </div>
  );
}
