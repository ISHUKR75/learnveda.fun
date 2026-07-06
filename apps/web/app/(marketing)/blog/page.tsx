/**
 * @file app/(marketing)/blog/page.tsx
 * @description LearnVeda Blog — articles on education, coding, CBSE, careers
 * Route: /blog
 *
 * Categories:
 *   - CBSE Tips & Strategies
 *   - Coding Tutorials
 *   - Career Guidance
 *   - Engineering & College
 *   - Platform Updates
 *
 * SEO: Each article has full JSON-LD TechArticle schema for Google indexing.
 * Server component — SSG with ISR for fresh content.
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import {
  BookOpen, Code2, Briefcase, GraduationCap,
  Bell, ChevronRight, Clock, ArrowRight, User,
  TrendingUp, Tag,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Blog — CBSE Tips, Coding Guides & Career Advice | LearnVeda",
  description:
    "Read expert articles on CBSE board preparation, programming tutorials, career roadmaps, " +
    "and engineering guides from LearnVeda educators and student contributors.",
  keywords: [
    "CBSE study tips", "coding tutorial India", "Class 10 board exam strategy",
    "programming career guide", "DSA preparation", "LearnVeda blog",
  ],
  openGraph: {
    title:       "LearnVeda Blog — Study Smart, Code Better",
    description: "Articles on CBSE, programming, careers, and education for Indian students.",
    type:        "website",
  },
};

/* ─── Blog Post Type ─────────────────────────────────────────────────────── */
interface BlogPost {
  slug:        string;  // URL slug
  title:       string;  // Post title
  excerpt:     string;  // Summary
  author:      string;  // Author name
  authorRole:  string;  // Author's role
  category:    string;  // Category name
  categorySlug: string; // Category slug for filtering
  publishedAt: string;  // Display date
  readTime:    string;  // Estimated read time
  tags:        string[]; // Content tags
  featured:    boolean; // Is this a featured post?
  icon:        React.ComponentType<{ className?: string }>; // Category icon
}

/* ─── Blog Posts Data ─────────────────────────────────────────────────────── */
// In production: fetched from MongoDB or Sanity CMS via /api/blog
const POSTS: BlogPost[] = [
  {
    slug:        "class-10-maths-board-strategy",
    title:       "How to Score 95+ in Class 10 Maths Board Exam: A Complete Strategy",
    excerpt:     "A step-by-step guide covering which chapters to prioritize, common mistakes to avoid, and a 30-day revision plan that helped students score above 95%.",
    author:      "Priya Mehta",
    authorRole:  "Class 10 Topper · IIT Delhi aspirant",
    category:    "CBSE Tips",
    categorySlug:"cbse",
    publishedAt: "Jun 28, 2026",
    readTime:    "8 min read",
    tags:        ["Class 10", "Mathematics", "Board Exam", "Strategy"],
    featured:    true,
    icon:        BookOpen,
  },
  {
    slug:        "dsa-roadmap-beginners",
    title:       "The Complete DSA Roadmap for Absolute Beginners in 2026",
    excerpt:     "Starting from zero? This roadmap covers what to learn, in what order, which resources to use, and how to practice for FAANG-level interviews.",
    author:      "Rohan Sharma",
    authorRole:  "SDE at Amazon · IIT Bombay CSE",
    category:    "Coding Tutorials",
    categorySlug:"coding",
    publishedAt: "Jun 20, 2026",
    readTime:    "12 min read",
    tags:        ["DSA", "Algorithms", "Competitive Programming", "Roadmap"],
    featured:    true,
    icon:        Code2,
  },
  {
    slug:        "python-vs-java-2026",
    title:       "Python vs Java in 2026: Which Language Should You Learn First?",
    excerpt:     "A detailed comparison covering syntax, performance, job market, use cases, and what the top Indian companies actually hire for.",
    author:      "Ananya Singh",
    authorRole:  "Full Stack Developer · 3 years experience",
    category:    "Coding Tutorials",
    categorySlug:"coding",
    publishedAt: "Jun 15, 2026",
    readTime:    "7 min read",
    tags:        ["Python", "Java", "Career", "Programming Languages"],
    featured:    false,
    icon:        Code2,
  },
  {
    slug:        "cbse-class-11-stream-selection",
    title:       "Science, Commerce, or Arts? How to Choose Your Class 11 Stream",
    excerpt:     "A data-driven guide to choosing the right stream after Class 10 — based on aptitude, career goals, salary potential, and market demand.",
    author:      "Dr. Kavita Rao",
    authorRole:  "Educational Counselor · 15 years experience",
    category:    "CBSE Tips",
    categorySlug:"cbse",
    publishedAt: "Jun 10, 2026",
    readTime:    "10 min read",
    tags:        ["Class 11", "Stream Selection", "Science", "Commerce", "Career"],
    featured:    false,
    icon:        BookOpen,
  },
  {
    slug:        "software-engineer-salary-india-2026",
    title:       "Software Engineer Salary in India 2026: Complete Company-Wise Guide",
    excerpt:     "Current salary data for freshers and experienced engineers at FAANG, unicorns, service companies, and startups — with skills that command premium pay.",
    author:      "LearnVeda Research",
    authorRole:  "Data-driven article",
    category:    "Career Guidance",
    categorySlug:"career",
    publishedAt: "Jun 5, 2026",
    readTime:    "15 min read",
    tags:        ["Salary", "Software Engineer", "India", "Career", "FAANG"],
    featured:    true,
    icon:        Briefcase,
  },
  {
    slug:        "cbse-physics-class-12-tips",
    title:       "Class 12 Physics: The Topics That Actually Come in Board Exams",
    excerpt:     "A chapter-wise analysis of the last 10 years of CBSE Physics board papers — which topics are asked most, which are skippable, and how to score full marks in numericals.",
    author:      "Prof. Suresh Nair",
    authorRole:  "Physics Teacher · 12 years teaching CBSE",
    category:    "CBSE Tips",
    categorySlug:"cbse",
    publishedAt: "May 30, 2026",
    readTime:    "9 min read",
    tags:        ["Class 12", "Physics", "Board Exam", "CBSE", "Numericals"],
    featured:    false,
    icon:        BookOpen,
  },
  {
    slug:        "btech-cse-survival-guide",
    title:       "BTech CSE Survival Guide: How to Ace Your First Year",
    excerpt:     "From C programming to discrete math — what actually matters in BTech CSE's first year, what to focus on, and how to get placed at a good company.",
    author:      "Aditya Verma",
    authorRole:  "Final year CSE · Placed at Google",
    category:    "Engineering & College",
    categorySlug:"engineering",
    publishedAt: "May 22, 2026",
    readTime:    "11 min read",
    tags:        ["BTech", "CSE", "First Year", "Engineering", "Placement"],
    featured:    false,
    icon:        GraduationCap,
  },
  {
    slug:        "learnveda-simulations-launch",
    title:       "New: 25+ Interactive Physics, Chemistry & DSA Simulations",
    excerpt:     "We just launched a full simulation library — Force & Motion, Chemical Reactions, Sorting Algorithm Visualizers, and more. Here's what's available and what's coming.",
    author:      "LearnVeda Team",
    authorRole:  "Product Update",
    category:    "Platform Updates",
    categorySlug:"updates",
    publishedAt: "May 15, 2026",
    readTime:    "4 min read",
    tags:        ["Simulations", "Physics", "DSA", "New Feature"],
    featured:    false,
    icon:        Bell,
  },
];

/* ─── Category Config ────────────────────────────────────────────────────── */
const CATEGORIES = [
  { slug: "all",         label: "All Articles",        icon: TrendingUp },
  { slug: "cbse",        label: "CBSE Tips",           icon: BookOpen },
  { slug: "coding",      label: "Coding Tutorials",    icon: Code2 },
  { slug: "career",      label: "Career Guidance",     icon: Briefcase },
  { slug: "engineering", label: "Engineering",         icon: GraduationCap },
  { slug: "updates",     label: "Platform Updates",    icon: Bell },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function BlogPage() {
  const featured = POSTS.filter((p) => p.featured); // Featured posts
  const rest     = POSTS.filter((p) => !p.featured); // Other posts

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold tracking-tight">LearnVeda Blog</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Expert articles on CBSE board preparation, coding tutorials, career guidance,
            and engineering tips — written for Indian students.
          </p>

          {/* Category filter pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-sm hover:border-brand-500/50 hover:text-brand-500 transition-colors"
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Featured posts */}
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="text-xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group rounded-xl border border-border/40 bg-card overflow-hidden hover:border-border/80 hover:shadow-md transition-all ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                {/* Card color accent */}
                <div className="h-2 bg-gradient-to-r from-brand-500 to-purple-600" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className={`font-bold group-hover:text-brand-500 transition-colors leading-snug ${
                    i === 0 ? "text-lg" : "text-sm"
                  }`}>
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.publishedAt}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto group-hover:text-brand-500 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All posts */}
        <section aria-labelledby="all-posts-heading">
          <h2 id="all-posts-heading" className="text-xl font-bold mb-6">More Articles</h2>
          <div className="space-y-4">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-5 rounded-xl border border-border/40 bg-card p-5 hover:border-border/80 hover:shadow-md transition-all"
              >
                {/* Category icon */}
                <div className="p-2.5 rounded-lg bg-muted/60 shrink-0">
                  <post.icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-brand-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{post.author}</span>
                    <div className="flex flex-wrap gap-1 ml-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground flex items-center gap-0.5">
                          <Tag className="h-2.5 w-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-brand-500 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter signup */}
        <section className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-8 text-center">
          <Bell className="h-10 w-10 text-brand-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Get new articles in your inbox</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Weekly digest of the best CBSE tips, coding tutorials, and career guides for Indian students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
            <Button size="sm">
              Subscribe <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
