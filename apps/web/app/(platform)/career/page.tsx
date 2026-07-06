/**
 * @file app/(platform)/career/page.tsx
 * @description Career Guidance & Roadmaps page for LearnVeda
 * Route: /career
 *
 * Features:
 *  - Career tracks: Software Engineer, Data Scientist, ML Engineer, etc.
 *  - Step-by-step roadmaps with required skills
 *  - Salary benchmarks (India & global)
 *  - Resume tips and interview prep links
 *  - Job market insights for Indian students
 *
 * Server component — SEO-optimized, fully static
 */

import type { Metadata } from "next"; // Next.js metadata for SEO
import Link from "next/link";         // Client-side navigation
import {
  Briefcase, TrendingUp, Star, ChevronRight, Code2,
  Database, Brain, Shield, Smartphone, Globe, BarChart3,
  Award, Clock, DollarSign, Users, Target, BookOpen,
  ArrowRight, CheckCircle2, Zap,
} from "lucide-react"; // Icon library
import { Badge } from "@/components/ui/badge";   // Reusable badge component
import { Button } from "@/components/ui/button"; // Reusable button component

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Career Roadmaps & Guidance — LearnVeda",
  description:
    "Explore career paths in Software Engineering, Data Science, AI/ML, Cybersecurity, and more. " +
    "Step-by-step roadmaps, salary guides, and skill requirements for Indian students.",
  keywords: [
    "career roadmap India", "software engineer career", "data science career",
    "ML engineer salary India", "IT career path", "coding career guide",
  ],
  openGraph: {
    title: "Career Roadmaps for Indian Students — LearnVeda",
    description: "Detailed career paths with skills, salaries, and learning plans from Class 9 to placement.",
    type: "website",
  },
};

/* ─── Career Track Type Definitions ─────────────────────────────────────────*/
/** Individual career track with full metadata */
type CareerTrack = {
  id:            string;         // Unique identifier
  title:         string;         // Career title
  icon:          React.ComponentType<{ className?: string }>; // Icon component
  color:         string;         // Tailwind gradient class
  bg:            string;         // Background color class
  description:   string;         // Short description
  avgSalaryIndia: string;        // Average LPA in India
  avgSalaryGlobal: string;       // Average USD in global market
  demandLevel:   "High" | "Very High" | "Extreme"; // Market demand
  yearsToEntry:  string;         // Time from Class 12 to first job
  topCompanies:  string[];       // Top hiring companies
  requiredSkills: {
    name:     string;            // Skill name
    href:     string;            // Link to learn this skill
  }[];
  roadmapSteps: string[];        // High-level career roadmap steps
  learningPath: string;          // LearnVeda path to follow
};

/* ─── Career Tracks Data ─────────────────────────────────────────────────── */
// Complete list of in-demand tech careers for Indian students
const CAREER_TRACKS: CareerTrack[] = [
  {
    id:           "software-engineer",
    title:        "Software Development Engineer (SDE)",
    icon:         Code2,
    color:        "from-blue-500 to-cyan-500",
    bg:           "bg-blue-500/10",
    description:  "Build scalable applications at top product companies (FAANG, unicorns). The highest-demand role in India's tech ecosystem with excellent growth.",
    avgSalaryIndia:  "₹8–45 LPA",
    avgSalaryGlobal: "$90K–$200K/year",
    demandLevel:  "Extreme",
    yearsToEntry: "4 years (B.Tech → Campus Placement)",
    topCompanies: ["Google", "Microsoft", "Amazon", "Flipkart", "Swiggy", "Zepto", "PhonePe"],
    requiredSkills: [
      { name: "DSA (Data Structures & Algorithms)", href: "/core-cs/dsa" },
      { name: "System Design",                     href: "/core-cs/system-design" },
      { name: "At least one language: Java / C++ / Python", href: "/programming/java" },
      { name: "Operating Systems",                 href: "/core-cs/operating-systems" },
      { name: "Database Management (DBMS)",        href: "/core-cs/database-management" },
      { name: "Computer Networks",                 href: "/core-cs/computer-networks" },
      { name: "Git & GitHub",                      href: "/core-cs/git-github" },
    ],
    roadmapSteps: [
      "Master a programming language (Python/Java/C++)",
      "Build strong DSA fundamentals — solve 300+ LeetCode problems",
      "Understand OS, DBMS, CN, System Design",
      "Build 3–5 real projects with GitHub repos",
      "Crack interviews through mock sessions and competitive programming",
      "Land internships → convert to full-time offer",
    ],
    learningPath: "/learn/engineering/cse",
  },
  {
    id:           "data-scientist",
    title:        "Data Scientist / ML Engineer",
    icon:         Brain,
    color:        "from-purple-500 to-pink-500",
    bg:           "bg-purple-500/10",
    description:  "Analyze data and build ML models that drive business decisions. One of the fastest-growing fields with massive industry demand in India.",
    avgSalaryIndia:  "₹10–60 LPA",
    avgSalaryGlobal: "$110K–$250K/year",
    demandLevel:  "Very High",
    yearsToEntry: "4–5 years (B.Tech/M.Tech → Industry role)",
    topCompanies: ["Google DeepMind", "Meta AI", "Amazon", "Flipkart", "Meesho", "startups"],
    requiredSkills: [
      { name: "Python (pandas, numpy, scikit-learn)", href: "/programming/python" },
      { name: "Mathematics (Linear Algebra, Probability, Statistics)", href: "/learn/class-11/mathematics" },
      { name: "Machine Learning Algorithms",          href: "/core-cs/dsa" },
      { name: "Deep Learning (PyTorch / TensorFlow)", href: "/programming/python" },
      { name: "SQL & Databases",                      href: "/programming/sql" },
      { name: "Data Visualization",                   href: "/core-cs/web-development" },
    ],
    roadmapSteps: [
      "Master Python (pandas, numpy, matplotlib, scikit-learn)",
      "Learn Statistics and Linear Algebra deeply",
      "Understand ML algorithms from scratch",
      "Build end-to-end ML projects (prediction, classification, NLP, CV)",
      "Publish Kaggle notebooks and GitHub projects",
      "Land research internship or data analyst → data scientist path",
    ],
    learningPath: "/programming/python",
  },
  {
    id:           "full-stack-developer",
    title:        "Full Stack Web Developer",
    icon:         Globe,
    color:        "from-green-500 to-emerald-500",
    bg:           "bg-green-500/10",
    description:  "Build complete web applications — frontend to backend to database. Most versatile tech career with great freelance and startup opportunities.",
    avgSalaryIndia:  "₹6–35 LPA",
    avgSalaryGlobal: "$80K–$180K/year",
    demandLevel:  "High",
    yearsToEntry: "1–3 years (can start with a diploma or bootcamp)",
    topCompanies: ["Startups", "Agencies", "TCS", "Infosys", "Wipro", "Remote global companies"],
    requiredSkills: [
      { name: "JavaScript / TypeScript",     href: "/programming/javascript" },
      { name: "React / Next.js (Frontend)",  href: "/core-cs/web-development" },
      { name: "Node.js / Express (Backend)", href: "/core-cs/web-development" },
      { name: "Databases (SQL + MongoDB)",   href: "/programming/sql" },
      { name: "Git & Deployment",            href: "/core-cs/git-github" },
      { name: "REST APIs & System Design",   href: "/core-cs/system-design" },
    ],
    roadmapSteps: [
      "Learn HTML, CSS fundamentals",
      "Master JavaScript — DOM, ES6+, async/await",
      "Build React projects (Todo, Weather, E-commerce)",
      "Learn Node.js + Express for backend",
      "Database: SQL + MongoDB",
      "Deploy projects on Vercel, Render, or Railway",
      "Apply for junior developer roles or freelance",
    ],
    learningPath: "/core-cs/web-development",
  },
  {
    id:           "cybersecurity",
    title:        "Cybersecurity Engineer",
    icon:         Shield,
    color:        "from-red-500 to-orange-500",
    bg:           "bg-red-500/10",
    description:  "Protect systems, networks, and data from cyber threats. One of the most critical and well-paying tech careers globally with massive shortfall of talent.",
    avgSalaryIndia:  "₹8–50 LPA",
    avgSalaryGlobal: "$100K–$220K/year",
    demandLevel:  "Very High",
    yearsToEntry: "3–5 years (with certifications)",
    topCompanies: ["Palo Alto Networks", "CrowdStrike", "IBM", "Infosys BPM", "Wipro", "Government"],
    requiredSkills: [
      { name: "Networking fundamentals (TCP/IP, DNS)", href: "/core-cs/computer-networks" },
      { name: "Linux & Operating Systems",             href: "/core-cs/operating-systems" },
      { name: "Python for scripting/automation",       href: "/programming/python" },
      { name: "Ethical Hacking concepts",              href: "/core-cs/system-design" },
      { name: "Cryptography basics",                   href: "/core-cs/system-design" },
    ],
    roadmapSteps: [
      "Learn networking fundamentals (OSI model, TCP/IP, HTTP/S)",
      "Master Linux command line",
      "Get CompTIA Security+ or CEH certification",
      "Practice on TryHackMe / HackTheBox",
      "Specialize: Penetration Testing, SOC Analyst, Cloud Security",
      "Build CTF (Capture the Flag) portfolio",
    ],
    learningPath: "/core-cs/computer-networks",
  },
  {
    id:           "mobile-developer",
    title:        "Mobile App Developer",
    icon:         Smartphone,
    color:        "from-yellow-500 to-amber-500",
    bg:           "bg-yellow-500/10",
    description:  "Build iOS and Android apps used by millions. India's startup ecosystem is booming with mobile-first products — high demand and great salaries.",
    avgSalaryIndia:  "₹6–30 LPA",
    avgSalaryGlobal: "$85K–$170K/year",
    demandLevel:  "High",
    yearsToEntry: "2–4 years",
    topCompanies: ["Swiggy", "Zomato", "CRED", "Paytm", "PhonePe", "startups"],
    requiredSkills: [
      { name: "Kotlin (Android development)", href: "/programming/kotlin" },
      { name: "Swift (iOS development)",      href: "/programming/swift" },
      { name: "Dart / Flutter (cross-platform)", href: "/programming/dart" },
      { name: "REST APIs & JSON",             href: "/core-cs/web-development" },
      { name: "Git & App deployment",         href: "/core-cs/git-github" },
    ],
    roadmapSteps: [
      "Choose your path: Android (Kotlin) or iOS (Swift) or Cross-platform (Flutter/Dart)",
      "Learn fundamentals of your chosen language",
      "Build 3–5 apps (calculator, weather, todo, social app)",
      "Publish on Google Play / App Store",
      "Learn backend integration (Firebase / REST APIs)",
      "Join startups as mobile developer intern",
    ],
    learningPath: "/programming/kotlin",
  },
  {
    id:           "database-engineer",
    title:        "Database / Backend Engineer",
    icon:         Database,
    color:        "from-teal-500 to-green-500",
    bg:           "bg-teal-500/10",
    description:  "Design, optimize, and manage the data infrastructure that powers applications. Critical role at every large company dealing with millions of records.",
    avgSalaryIndia:  "₹7–40 LPA",
    avgSalaryGlobal: "$90K–$185K/year",
    demandLevel:  "High",
    yearsToEntry: "3–4 years",
    topCompanies: ["Oracle", "MongoDB Inc.", "Amazon RDS", "Google Cloud", "Snowflake"],
    requiredSkills: [
      { name: "SQL (PostgreSQL / MySQL)",    href: "/programming/sql" },
      { name: "Database Design & Schema",   href: "/core-cs/database-management" },
      { name: "Indexing & Query Optimization", href: "/core-cs/database-management" },
      { name: "Redis / Caching strategies", href: "/core-cs/system-design" },
      { name: "System Design for scale",    href: "/core-cs/system-design" },
    ],
    roadmapSteps: [
      "Master SQL — JOINs, indexes, transactions, stored procedures",
      "Learn NoSQL (MongoDB) and when to use each",
      "Understand database design (normalization, ERD)",
      "Study caching (Redis) and search (Elasticsearch)",
      "Practice query optimization and execution plan analysis",
      "Learn replication, sharding, and backup strategies",
    ],
    learningPath: "/programming/sql",
  },
];

/* ─── Salary Benchmarks by Experience ───────────────────────────────────────*/
const SALARY_BANDS = [
  { level: "Fresher (0–1 year)",     range: "₹3–10 LPA",  color: "bg-green-500/10 text-green-600 border-green-500/20" },
  { level: "Junior (1–3 years)",     range: "₹8–20 LPA",  color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { level: "Mid-level (3–6 years)",  range: "₹18–40 LPA", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  { level: "Senior (6–10 years)",    range: "₹35–80 LPA", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  { level: "Lead / Principal (10+)", range: "₹70–200 LPA", color: "bg-red-500/10 text-red-600 border-red-500/20" },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function CareerPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Career Roadmaps</span>
          </nav>

          {/* Header text */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20">
              <Briefcase className="h-8 w-8 text-brand-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Career Roadmaps</h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Detailed career paths for Indian students — from Class 12 to your dream job at a
                product company, startup, or research lab. Every roadmap includes required skills,
                salary data, and direct links to LearnVeda courses.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Career Tracks",    value: `${CAREER_TRACKS.length}`,  icon: Target },
              { label: "Avg Fresher LPA",  value: "₹6–10 LPA",                icon: DollarSign },
              { label: "Placement Rate",   value: "87%+",                      icon: TrendingUp },
              { label: "Hiring Partners",  value: "50+",                       icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/40 bg-card p-4 flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Career tracks grid */}
        <section aria-labelledby="career-tracks-heading">
          <h2 id="career-tracks-heading" className="text-2xl font-bold mb-8">
            Choose Your Career Path
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CAREER_TRACKS.map((track) => (
              <article
                key={track.id}
                className="rounded-xl border border-border/40 bg-card overflow-hidden hover:border-border/80 transition-all hover:shadow-md group"
              >
                {/* Card header */}
                <div className={`p-6 ${track.bg} border-b border-border/20`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Career icon */}
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${track.color} text-white`}>
                        <track.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{track.title}</h3>
                        {/* Demand badge */}
                        <Badge
                          variant="outline"
                          className={`mt-1 text-xs ${
                            track.demandLevel === "Extreme" ? "border-red-500/50 text-red-600" :
                            track.demandLevel === "Very High" ? "border-orange-500/50 text-orange-600" :
                            "border-yellow-500/50 text-yellow-600"
                          }`}
                        >
                          {track.demandLevel} Demand
                        </Badge>
                      </div>
                    </div>
                    {/* Salary info */}
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-foreground">{track.avgSalaryIndia}</p>
                      <p className="text-xs text-muted-foreground">India avg LPA</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{track.description}</p>
                </div>

                {/* Card body */}
                <div className="p-6 space-y-5">
                  {/* Required skills */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Required Skills
                    </h4>
                    <ul className="space-y-1.5">
                      {track.requiredSkills.map((skill) => (
                        <li key={skill.name}>
                          <Link
                            href={skill.href}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-500 transition-colors group/skill"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                            <span className="group-hover/skill:underline underline-offset-2">{skill.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Roadmap steps */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      Roadmap Steps
                    </h4>
                    <ol className="space-y-1.5">
                      {track.roadmapSteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="shrink-0 font-mono text-xs text-brand-500 bg-brand-500/10 rounded px-1.5 py-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/30">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {track.yearsToEntry}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Globe className="h-3.5 w-3.5" />
                      {track.avgSalaryGlobal} global
                    </span>
                  </div>

                  {/* Top companies */}
                  <div className="flex flex-wrap gap-1.5">
                    {track.topCompanies.slice(0, 4).map((company) => (
                      <Badge key={company} variant="secondary" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                    {track.topCompanies.length > 4 && (
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        +{track.topCompanies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* CTA button */}
                  <Button asChild size="sm" className="w-full mt-2">
                    <Link href={track.learningPath}>
                      Start Learning Path
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Salary bands by experience */}
        <section aria-labelledby="salary-heading" className="rounded-xl border border-border/40 bg-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-6 w-6 text-green-500" />
            <h2 id="salary-heading" className="text-2xl font-bold">Salary by Experience — India Tech Market</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Salary ranges across experience levels in India's tech industry (2025–26 data).
            Product companies (Google, Amazon, Flipkart) pay 2–4× compared to service companies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SALARY_BANDS.map((band) => (
              <div key={band.level} className={`rounded-lg border p-4 text-center ${band.color}`}>
                <p className="text-lg font-bold">{band.range}</p>
                <p className="text-xs mt-1 opacity-80">{band.level}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interview prep CTA */}
        <section className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-8 text-center">
          <Zap className="h-10 w-10 text-brand-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ready to Start Your Career Journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Follow your chosen career roadmap on LearnVeda — structured day-wise plans,
            practice problems, interview prep, and a community of 10,000+ students.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">Go to My Dashboard <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/core-cs/interview-preparation">Interview Preparation</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
