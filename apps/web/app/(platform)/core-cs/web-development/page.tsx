/**
 * @file app/(platform)/core-cs/web-development/page.tsx
 * @description Web Development Track — Full-Stack mastery roadmap
 * Route: /core-cs/web-development
 *
 * Covers:
 *  - HTML5, CSS3, JavaScript fundamentals
 *  - React / Next.js (modern frontend)
 *  - Node.js + Express (backend)
 *  - Databases: MongoDB + PostgreSQL
 *  - DevOps basics: Docker, CI/CD, cloud deployment
 *  - Full projects: portfolio, e-commerce, SaaS
 *
 * Platform layout (Navbar) is provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe, Code2, Database, Server, Cloud,
  Layout, Zap, CheckCircle2, ArrowRight,
  Smartphone, Lock, Terminal, Brain, Star,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Learning Phases ────────────────────────────────────────────────────── */
/**
 * PHASES
 * 5-phase structured roadmap from HTML basics to full-stack deployment.
 * Each phase builds on the previous.
 */
const PHASES = [
  {
    num:    1,
    title:  "Frontend Foundations",
    emoji:  "🎨",
    color:  "from-blue-500 to-cyan-500",
    weeks:  "2 Weeks",
    topics: [
      { name: "HTML5 Semantics",          desc: "Semantic elements, forms, accessibility, SEO tags",        done: false },
      { name: "CSS3 & Flexbox/Grid",      desc: "Layouts, animations, custom properties, responsive design",done: false },
      { name: "JavaScript Fundamentals",  desc: "DOM, events, fetch API, promises, ES2024 features",        done: false },
      { name: "Browser DevTools",         desc: "Debugging, performance profiling, network inspection",     done: false },
    ],
    project: "Portfolio website + Weather app with API",
  },
  {
    num:    2,
    title:  "React & Modern Frontend",
    emoji:  "⚛️",
    color:  "from-cyan-500 to-teal-500",
    weeks:  "3 Weeks",
    topics: [
      { name: "React 19 Fundamentals",   desc: "JSX, components, hooks, state, effects, refs",             done: false },
      { name: "React Router v7",         desc: "Client-side routing, nested routes, loaders",              done: false },
      { name: "State Management",        desc: "Context API, Zustand, React Query for server state",       done: false },
      { name: "Next.js 15 App Router",   desc: "SSR, SSG, ISR, Server Components, API routes",            done: false },
      { name: "TypeScript for React",    desc: "Strict typing, generics, utility types",                   done: false },
    ],
    project: "Full Next.js blog with MDX, dark mode, and Vercel deployment",
  },
  {
    num:    3,
    title:  "Backend & APIs",
    emoji:  "⚙️",
    color:  "from-green-500 to-emerald-600",
    weeks:  "3 Weeks",
    topics: [
      { name: "Node.js Runtime",         desc: "Event loop, streams, modules, process management",         done: false },
      { name: "Express.js REST APIs",    desc: "Routing, middleware, authentication, error handling",       done: false },
      { name: "MongoDB + Mongoose",      desc: "Schema design, aggregation, indexes, transactions",         done: false },
      { name: "PostgreSQL + Prisma",     desc: "Relational design, ORM, migrations, query optimization",   done: false },
      { name: "Auth: JWT + OAuth",       desc: "Session management, refresh tokens, Clerk, NextAuth",      done: false },
    ],
    project: "RESTful API for an e-commerce platform with auth and payments",
  },
  {
    num:    4,
    title:  "Advanced Full-Stack",
    emoji:  "🚀",
    color:  "from-purple-500 to-violet-600",
    weeks:  "2 Weeks",
    topics: [
      { name: "WebSockets & Socket.IO",  desc: "Real-time apps, chat, live notifications, presence",       done: false },
      { name: "File Uploads & CDN",      desc: "Multer, Cloudinary, S3, presigned URLs",                  done: false },
      { name: "Search & Caching",        desc: "Redis, Elasticsearch, full-text search, cache patterns",   done: false },
      { name: "Web Performance",         desc: "Core Web Vitals, image optimization, bundle size, lazy loading", done: false },
    ],
    project: "Real-time collaborative todo app with Socket.IO + Redis",
  },
  {
    num:    5,
    title:  "DevOps & Deployment",
    emoji:  "🛠️",
    color:  "from-orange-500 to-red-500",
    weeks:  "2 Weeks",
    topics: [
      { name: "Docker & Containers",     desc: "Dockerfile, docker-compose, multi-stage builds",           done: false },
      { name: "CI/CD Pipelines",         desc: "GitHub Actions, automated testing, deployment workflows",  done: false },
      { name: "Cloud Platforms",         desc: "AWS EC2/S3, Vercel, Railway, Render deployment",           done: false },
      { name: "Monitoring & Logging",    desc: "Sentry, Datadog basics, uptime monitoring, alerting",      done: false },
    ],
    project: "Dockerized full-stack SaaS app deployed on AWS with CI/CD",
  },
] as const;

/* ─── Tech Stack Cards ────────────────────────────────────────────────────── */
const TECH_STACK = [
  { name: "HTML/CSS",    icon: Layout,   color: "text-orange-500 bg-orange-500/10",   level: "Foundation" },
  { name: "JavaScript", icon: Code2,     color: "text-yellow-500 bg-yellow-500/10",   level: "Core" },
  { name: "TypeScript", icon: Code2,     color: "text-blue-500 bg-blue-500/10",       level: "Core" },
  { name: "React 19",   icon: Zap,       color: "text-cyan-500 bg-cyan-500/10",       level: "Frontend" },
  { name: "Next.js 15", icon: Globe,     color: "text-foreground bg-muted",           level: "Fullstack" },
  { name: "Node.js",    icon: Terminal,  color: "text-green-500 bg-green-500/10",     level: "Backend" },
  { name: "MongoDB",    icon: Database,  color: "text-green-600 bg-green-600/10",     level: "Database" },
  { name: "PostgreSQL", icon: Database,  color: "text-indigo-500 bg-indigo-500/10",   level: "Database" },
  { name: "Redis",      icon: Server,    color: "text-red-500 bg-red-500/10",         level: "Cache" },
  { name: "Docker",     icon: Cloud,     color: "text-blue-600 bg-blue-600/10",       level: "DevOps" },
  { name: "AWS",        icon: Cloud,     color: "text-orange-600 bg-orange-600/10",   level: "Cloud" },
  { name: "Vercel",     icon: Zap,       color: "text-foreground bg-muted",           level: "Deploy" },
] as const;

type TabId = "roadmap" | "stack" | "projects";

export default function WebDevelopmentPage() {
  const [activeTab, setActiveTab] = useState<TabId>("roadmap");

  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-cyan-950/5 to-background py-14 md:py-18">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-foreground">Core CS</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Web Development</span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">Core CS Track</Badge>
            <Badge variant="outline" className="text-cyan-600 border-cyan-400/40">12-Week · Beginner to Deployed</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            🌐 Full-Stack Web Development — Complete Roadmap
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
            Go from zero to deployed full-stack developer in 12 weeks.
            Cover HTML/CSS → JavaScript → React + Next.js → Node.js + MongoDB → Docker + AWS.
            Build 5 production-grade projects along the way.
          </p>

          <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> 5 Learning Phases</span>
            <span className="flex items-center gap-1.5"><Code2 className="h-4 w-4" /> 12+ Technologies</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 5 Real Projects</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/compiler"><Terminal className="h-4 w-4" /> Open Code Editor</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/practice/quiz">Practice Questions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Tab navigation ────────────────────────────────────────── */}
      <section className="border-b bg-muted/30 sticky top-0 z-10">
        <div className="container px-4 md:px-6">
          <div className="flex gap-1 py-3">
            {([
              { id: "roadmap",   label: "📅 Roadmap"    },
              { id: "stack",     label: "⚙️ Tech Stack"  },
              { id: "projects",  label: "🚀 Projects"    },
            ] as { id: TabId; label: string }[]).map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id ? "bg-brand-500 text-white" : "hover:bg-muted"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-10">

        {/* Roadmap */}
        {activeTab === "roadmap" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">12-Week Learning Roadmap</h2>
              <Badge variant="secondary">5 Phases · 5 Projects</Badge>
            </div>
            {PHASES.map((phase, i) => (
              <motion.div key={phase.num} initial={{ opacity: 0.01, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl border bg-card overflow-hidden">
                <div className={`px-6 py-4 bg-gradient-to-r ${phase.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{phase.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg">Phase {phase.num}: {phase.title}</h3>
                        <p className="text-white/80 text-sm">{phase.weeks}</p>
                      </div>
                    </div>
                    <div className="text-4xl font-black opacity-20">{phase.num}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {phase.topics.map((topic) => (
                      <div key={topic.name} className="flex items-start gap-2 rounded-xl border bg-muted/30 p-3">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-sm">{topic.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{topic.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-brand-500/5 border border-brand-500/20 p-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-brand-500 shrink-0" />
                    <p className="text-sm"><strong>Phase Project:</strong> {phase.project}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {activeTab === "stack" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Technologies You'll Master</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {TECH_STACK.map((tech, i) => (
                <motion.div key={tech.name} initial={{ opacity: 0.01, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border bg-card p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tech.color} mb-3`}>
                    <tech.icon className="h-6 w-6" />
                  </div>
                  <div className="font-bold">{tech.name}</div>
                  <Badge variant="secondary" className="text-xs mt-1">{tech.level}</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">5 Production-Grade Projects</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { num: 1, name: "Developer Portfolio",        stack: "HTML · CSS · JavaScript · GitHub Pages", difficulty: "Beginner", emoji: "🎨", desc: "Responsive personal portfolio with dark mode, animations, and contact form." },
                { num: 2, name: "Weather App",               stack: "React · API Integration · Tailwind",      difficulty: "Beginner", emoji: "🌤️", desc: "Real-time weather app using OpenWeatherMap API with 7-day forecast." },
                { num: 3, name: "Full-Stack Blog",           stack: "Next.js 15 · MongoDB · MDX · Vercel",     difficulty: "Intermediate", emoji: "📝", desc: "Admin CMS, markdown blog, SEO, RSS feed, deployed on Vercel." },
                { num: 4, name: "E-Commerce API",            stack: "Node.js · Express · PostgreSQL · Stripe", difficulty: "Intermediate", emoji: "🛒", desc: "REST API for an e-commerce platform — auth, products, cart, orders, payments." },
                { num: 5, name: "Real-Time SaaS App",        stack: "Next.js · Socket.IO · Redis · Docker",    difficulty: "Advanced",    emoji: "🚀", desc: "Deployed SaaS with live collaboration, subscriptions, and Docker deployment." },
              ].map((project, i) => (
                <motion.div key={project.num} initial={{ opacity: 0.01, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border bg-card p-5 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{project.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{project.name}</h3>
                        <Badge variant="outline" className={`text-xs ${project.difficulty === "Advanced" ? "text-red-600 border-red-400/40" : project.difficulty === "Intermediate" ? "text-yellow-600 border-yellow-400/40" : "text-green-600 border-green-400/40"}`}>
                          {project.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-brand-500 font-medium mt-0.5">{project.stack}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
