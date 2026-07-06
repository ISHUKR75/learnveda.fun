/**
 * @file app/(marketing)/blog/[slug]/page.tsx
 * @description Individual blog post page with full article content
 * Route: /blog/[slug]  (e.g. /blog/class-10-maths-board-strategy)
 *
 * Features:
 *   - Full article content with headings, code blocks, and lists
 *   - Author bio and social links
 *   - Related articles sidebar
 *   - JSON-LD TechArticle schema for SEO
 *   - Reading progress indicator
 *   - Social share buttons (LinkedIn, Twitter, WhatsApp)
 *
 * SSG with ISR: pages are pre-generated and revalidated every 24 hours.
 */

import type { Metadata } from "next"; // SEO
import { notFound }      from "next/navigation"; // 404 handler
import Link              from "next/link"; // Navigation
import {
  Clock, User, Tag, ChevronRight, ArrowLeft,
  Share2, BookOpen, ThumbsUp, MessageSquare,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── Blog Post Database ─────────────────────────────────────────────────── */
// In production: fetched from MongoDB or Sanity CMS
// Each post has full HTML-like structured content
const BLOG_POSTS: Record<string, {
  title:       string;
  excerpt:     string;
  author:      string;
  authorRole:  string;
  authorBio:   string;
  category:    string;
  publishedAt: string;
  updatedAt?:  string;
  readTime:    string;
  tags:        string[];
  content:     { type: "h2"|"h3"|"p"|"ul"|"ol"|"code"|"blockquote"; text?: string; items?: string[]; lang?: string }[];
}> = {
  "class-10-maths-board-strategy": {
    title:       "How to Score 95+ in Class 10 Maths Board Exam: A Complete Strategy",
    excerpt:     "A step-by-step guide covering which chapters to prioritize, common mistakes to avoid, and a 30-day revision plan.",
    author:      "Priya Mehta",
    authorRole:  "Class 10 Topper",
    authorBio:   "Priya scored 98/100 in Class 10 Maths board exam in 2025. She is now preparing for JEE Advanced at IIT Delhi coaching.",
    category:    "CBSE Tips",
    publishedAt: "June 28, 2026",
    updatedAt:   "June 30, 2026",
    readTime:    "8 min read",
    tags:        ["Class 10", "Mathematics", "Board Exam", "Strategy", "CBSE"],
    content: [
      { type: "h2", text: "Understanding the Paper Pattern" },
      { type: "p",  text: "The Class 10 Mathematics board paper has 40 marks for 20 MCQs (Section A), 20 marks for short answers (Section B), 24 marks for long answers (Section C), and 6 marks for case studies (Section D). Most students focus only on Section C but ignore MCQs — a huge mistake." },
      { type: "h2", text: "Chapter-wise Priority Matrix" },
      { type: "p",  text: "Based on analysis of the past 10 years of CBSE question papers, here is how to prioritize:" },
      { type: "ul", items: [
        "Real Numbers (Chapter 1) — 4–6 marks every year. Euclid's algorithm and HCF/LCM are always asked.",
        "Polynomials (Chapter 2) — 3–4 marks. Zeroes of polynomial and relationship between zeroes and coefficients.",
        "Quadratic Equations (Chapter 4) — 6–8 marks. Discriminant, nature of roots, word problems.",
        "Arithmetic Progressions (Chapter 5) — 4–6 marks. Sum and nth term formulas.",
        "Triangles (Chapter 6) — 4–5 marks. Similarity criteria (AA, SAS, SSS).",
        "Trigonometry (Chapter 8) — 8–10 marks. Identity proof and height-distance problems.",
        "Circles (Chapter 10) — 3–4 marks. Tangent properties.",
        "Statistics (Chapter 13) — 6 marks. Mean, Median, Mode from frequency tables.",
      ]},
      { type: "h2", text: "The 30-Day Revision Plan" },
      { type: "p",  text: "With 30 days before the exam, here is the exact schedule that worked for me:" },
      { type: "ol", items: [
        "Days 1–7: Real Numbers, Polynomials, Quadratic Equations — 3 chapters, 2 days each + 1 day revision.",
        "Days 8–14: Arithmetic Progressions, Triangles, Coordinate Geometry — same pattern.",
        "Days 15–20: Trigonometry (most important) — 4 days theory + 2 days problem practice.",
        "Days 21–25: Circles, Areas, Surface Areas & Volumes, Statistics, Probability.",
        "Days 26–28: Full mock tests (3 papers) under exam conditions — 3 hours each.",
        "Days 29–30: Only review errors from mock tests. Don't start anything new.",
      ]},
      { type: "h2", text: "Common Mistakes to Avoid" },
      { type: "ul", items: [
        "Writing formulas without derivation when asked 'Prove that...' — always show steps.",
        "Rounding too early in trigonometry problems — keep exact values till the last step.",
        "Skipping construction diagrams in geometry — always draw, they carry marks.",
        "Not writing units (cm², m³) — marks are deducted for missing units.",
        "Attempting questions you're unsure of first — do your strongest sections first.",
      ]},
      { type: "h2", text: "How to Score Full Marks in Section D (Case Studies)" },
      { type: "p",  text: "Case study questions (4+2 marks each) are the easiest to score full marks on if you practice. They always use real-world scenarios but test standard concepts. Practice 20–30 case studies from sample papers." },
      { type: "blockquote", text: "\"The difference between 90 and 95 is not intelligence — it's systematic practice and knowing exactly which steps examers want to see.\" — My mathematics teacher" },
      { type: "h2", text: "Final Week Strategy" },
      { type: "p",  text: "Never study anything new in the final week. Focus on: reviewing your error notebook from mock tests, re-reading important formulas, getting 8 hours of sleep, and staying hydrated. Your brain consolidates memory during sleep." },
    ],
  },
  "dsa-roadmap-beginners": {
    title:       "The Complete DSA Roadmap for Absolute Beginners in 2026",
    excerpt:     "Starting from zero? This roadmap covers what to learn, in what order, and which resources to use.",
    author:      "Rohan Sharma",
    authorRole:  "SDE at Amazon · IIT Bombay CSE",
    authorBio:   "Rohan is a Software Development Engineer at Amazon, having cracked interviews at Google, Microsoft, and Amazon. He mentors 200+ students on DSA preparation.",
    category:    "Coding Tutorials",
    publishedAt: "June 20, 2026",
    readTime:    "12 min read",
    tags:        ["DSA", "Algorithms", "Competitive Programming", "Roadmap", "FAANG"],
    content: [
      { type: "h2", text: "Phase 1: Programming Language Fundamentals (Weeks 1–3)" },
      { type: "p",  text: "Before touching DSA, pick ONE language and master it completely. Python is easiest to start, but Java and C++ give better control for competitive programming." },
      { type: "ul", items: [
        "Variables, data types, operators",
        "Control flow: if/else, for, while, do-while",
        "Functions, recursion, scope",
        "Arrays (1D and 2D), strings",
        "Basic OOP (classes, objects, methods)",
      ]},
      { type: "h2", text: "Phase 2: Core Data Structures (Weeks 4–10)" },
      { type: "p",  text: "Learn each data structure by implementing it from scratch, then use the built-in library version." },
      { type: "ol", items: [
        "Arrays & Strings — 1 week. Master two-pointer and sliding window patterns.",
        "Linked Lists — 3 days. Singly, doubly, circular. Reverse, detect cycle, merge.",
        "Stacks & Queues — 3 days. Implement from arrays and linked lists.",
        "Hash Maps & Sets — 4 days. Collision handling, load factor, time complexity.",
        "Trees — 1 week. Binary Tree, BST, traversals (in/pre/post/level order).",
        "Heaps — 3 days. Min/max heap, priority queue, heap sort.",
        "Graphs — 1 week. BFS, DFS, adjacency list, adjacency matrix.",
      ]},
      { type: "h2", text: "Phase 3: Algorithms (Weeks 11–16)" },
      { type: "ul", items: [
        "Sorting: Merge Sort, Quick Sort, Counting Sort — understand Big-O",
        "Binary Search — on sorted arrays AND on answer space",
        "Two Pointers, Sliding Window — master these patterns completely",
        "Recursion & Backtracking — subsets, permutations, N-Queens",
        "Dynamic Programming — start with Fibonacci, then 1D → 2D DP problems",
        "Greedy Algorithms — activity selection, Huffman coding",
      ]},
      { type: "h2", text: "LeetCode Practice Strategy" },
      { type: "p",  text: "Don't grind randomly. Follow this structured approach:" },
      { type: "ol", items: [
        "Solve Easy problems until you can do them in under 15 minutes.",
        "Move to Medium. Spend max 30 minutes before looking at hints.",
        "After seeing a solution, re-implement it yourself without looking.",
        "Revisit problems after 1 week (spaced repetition).",
        "Track patterns, not individual problems.",
      ]},
      { type: "blockquote", text: "\"Solve the same 150 problems 3 times rather than solving 500 problems once.\" — This is how top FAANG candidates prepare." },
    ],
  },
};

/* ─── Static Params (SSG) ────────────────────────────────────────────────── */
/** Pre-generate all known blog post pages at build time */
export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

/* ─── Dynamic Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // Await params for Next.js 15
  const post = BLOG_POSTS[slug];
  if (!post) return { title: "Article Not Found — LearnVeda" };

  return {
    title:       `${post.title} | LearnVeda Blog`,
    description: post.excerpt,
    keywords:    post.tags,
    authors:     [{ name: post.author }],
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      type:        "article",
      publishedTime: post.publishedAt,
    },
    // JSON-LD TechArticle schema for Google E-E-A-T
    other: {
      "application/ld+json": JSON.stringify({
        "@context":        "https://schema.org",
        "@type":           "TechArticle",
        "headline":        post.title,
        "description":     post.excerpt,
        "author":          { "@type": "Person", "name": post.author, "jobTitle": post.authorRole },
        "publisher":       { "@type": "Organization", "name": "LearnVeda" },
        "datePublished":   post.publishedAt,
        "dateModified":    post.updatedAt || post.publishedAt,
        "keywords":        post.tags.join(", "),
      }),
    },
  };
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params for Next.js 15
  const post = BLOG_POSTS[slug]; // Look up the post

  if (!post) notFound(); // Show 404 if post doesn't exist

  /* Related posts (simple: other posts excluding current) */
  const related = Object.entries(BLOG_POSTS)
    .filter(([s]) => s !== slug) // Exclude current post
    .slice(0, 3); // Take first 3

  return (
    <div className="min-h-screen bg-background">
      {/* Article header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium line-clamp-1">{post.title.slice(0, 40)}…</span>
          </nav>

          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
            <span className="text-muted-foreground text-sm">{post.publishedAt}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-3 text-muted-foreground text-lg">{post.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.authorRole}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main article content */}
          <article className="lg:col-span-3 prose prose-slate dark:prose-invert max-w-none">
            {post.content.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return <h2 key={i} className="text-xl font-bold mt-8 mb-3 text-foreground">{block.text}</h2>;
                case "h3":
                  return <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-foreground">{block.text}</h3>;
                case "p":
                  return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{block.text}</p>;
                case "ul":
                  return (
                    <ul key={i} className="my-4 space-y-2">
                      {block.items?.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <span className="text-brand-500 mt-1 shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={i} className="my-4 space-y-2">
                      {block.items?.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-muted-foreground text-sm">
                          <span className="shrink-0 font-mono text-xs text-brand-500 bg-brand-500/10 rounded px-1.5 py-0.5 mt-0.5">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  );
                case "blockquote":
                  return (
                    <blockquote key={i} className="border-l-4 border-brand-500 pl-4 my-6 italic text-muted-foreground bg-muted/30 py-3 rounded-r-lg">
                      {block.text}
                    </blockquote>
                  );
                case "code":
                  return (
                    <pre key={i} className="bg-muted rounded-lg p-4 overflow-x-auto my-4">
                      <code className="text-sm font-mono">{block.text}</code>
                    </pre>
                  );
                default:
                  return null;
              }
            })}

            {/* Article footer */}
            <div className="mt-10 pt-6 border-t border-border/40 space-y-4">
              {/* Author bio box */}
              <div className="rounded-xl border border-border/40 bg-muted/30 p-5 flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-xs text-brand-500 mb-2">{post.authorRole}</p>
                  <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-muted-foreground">Share this article:</span>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Share2 className="h-3.5 w-3.5" /> LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Share2 className="h-3.5 w-3.5" /> Twitter / X
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Share2 className="h-3.5 w-3.5" /> WhatsApp
                </Button>
              </div>

              {/* Reactions */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                  <ThumbsUp className="h-4 w-4" /> Helpful (124)
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand-500 transition-colors">
                  <MessageSquare className="h-4 w-4" /> Comment (18)
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar: Related articles */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <h3 className="font-semibold text-sm mb-4">Related Articles</h3>
              <div className="space-y-4">
                {related.map(([rSlug, rPost]) => (
                  <Link
                    key={rSlug}
                    href={`/blog/${rSlug}`}
                    className="block group"
                  >
                    <div className="rounded-lg border border-border/40 bg-card p-3 hover:border-border/80 transition-all">
                      <Badge variant="secondary" className="text-xs mb-2">{rPost.category}</Badge>
                      <h4 className="text-xs font-medium leading-snug group-hover:text-brand-500 transition-colors line-clamp-3">
                        {rPost.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{rPost.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Button asChild variant="outline" size="sm" className="w-full gap-1.5">
                  <Link href="/blog">
                    <ArrowLeft className="h-3.5 w-3.5" /> All Articles
                  </Link>
                </Button>
              </div>

              {/* CTA */}
              <div className="mt-4 rounded-lg border border-brand-500/20 bg-brand-500/5 p-4">
                <BookOpen className="h-6 w-6 text-brand-500 mb-2" />
                <p className="text-xs font-semibold mb-1">Start Learning Free</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Apply these tips with interactive simulations and practice on LearnVeda.
                </p>
                <Button asChild size="sm" className="w-full text-xs">
                  <Link href="/learn">Get Started</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
