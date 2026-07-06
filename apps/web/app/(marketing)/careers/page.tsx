/**
 * @file app/(marketing)/careers/page.tsx
 * @description Careers at LearnVeda — open positions and company culture
 * Route: /careers
 *
 * Shows open roles across Engineering, Design, Content, and Growth.
 * Applicants can view role details and apply via email link.
 * No Clerk auth required — public page.
 *
 * Platform layout: N/A (marketing layout — no sidebar Navbar).
 */

import React from "react";
import Link from "next/link";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, Clock, Briefcase, Users, Heart,
  Zap, Code2, BookOpen, BarChart3, ArrowRight,
} from "lucide-react";

/* ─── Open Roles ─────────────────────────────────────────────────────────── */
const OPEN_ROLES = [
  {
    id:         "sde-backend",
    title:      "Senior Backend Engineer",
    team:       "Engineering",
    location:   "Remote (India)",
    type:       "Full-time",
    experience: "3–6 years",
    skills:     ["Node.js", "TypeScript", "MongoDB", "Redis", "System Design"],
    description: "Build and scale the core LearnVeda backend — APIs, real-time features (Socket.IO), compiler infrastructure, and AI integrations.",
  },
  {
    id:         "fe-react",
    title:      "Senior Frontend Engineer",
    team:       "Engineering",
    location:   "Remote (India)",
    type:       "Full-time",
    experience: "3–5 years",
    skills:     ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "Craft beautiful, performant UI for millions of Indian students. Contribute to our design system, animations, and accessibility.",
  },
  {
    id:         "ml-engineer",
    title:      "ML / AI Engineer",
    team:       "Engineering",
    location:   "Remote (India)",
    type:       "Full-time",
    experience: "2–5 years",
    skills:     ["Python", "PyTorch", "LLMs", "RAG", "OpenAI API", "Vector DBs"],
    description: "Build AI Tutor capabilities — fine-tuning LLMs on Indian syllabus, RAG pipelines, personalized question generation, and adaptive learning.",
  },
  {
    id:         "content-math",
    title:      "Content Creator — Mathematics",
    team:       "Content",
    location:   "Remote (India)",
    type:       "Full-time",
    experience: "2–4 years",
    skills:     ["NCERT expertise", "Class 11–12 Maths", "LaTeX", "Video scripting"],
    description: "Create NCERT-aligned chapter notes, practice questions, and video scripts for Class 11–12 Maths. JEE/NEET awareness a strong plus.",
  },
  {
    id:         "content-cs",
    title:      "Content Creator — Computer Science / DSA",
    team:       "Content",
    location:   "Remote (India)",
    type:       "Full-time",
    experience: "1–3 years",
    skills:     ["DSA", "Python", "C++", "Writing", "Video scripting"],
    description: "Create coding tutorials, DSA concept explanations, programming language courses, and competitive programming content.",
  },
  {
    id:         "ux-designer",
    title:      "Senior Product Designer (UX)",
    team:       "Design",
    location:   "Remote (India)",
    type:       "Full-time",
    experience: "3–5 years",
    skills:     ["Figma", "User Research", "Design Systems", "Accessibility", "Prototyping"],
    description: "Design the LearnVeda student experience from scratch — flows, components, gamification UI, mobile-first responsive design.",
  },
  {
    id:         "growth-manager",
    title:      "Growth Marketing Manager",
    team:       "Growth",
    location:   "Bangalore / Remote",
    type:       "Full-time",
    experience: "2–5 years",
    skills:     ["SEO", "Performance Marketing", "Analytics", "Content", "EdTech market"],
    description: "Drive student acquisition and retention through organic, paid, and partnership channels. Own key growth KPIs for the platform.",
  },
  {
    id:         "intern-dev",
    title:      "Software Development Intern",
    team:       "Engineering",
    location:   "Remote (India)",
    type:       "Internship · 6 months",
    experience: "Final year B.Tech / M.Tech",
    skills:     ["JavaScript", "React", "Node.js", "Eager to learn"],
    description: "Work alongside our engineers on real features. Opportunity for full-time conversion. Open to top engineering college students.",
  },
] as const;

const TEAM_COLORS: Record<string, string> = {
  Engineering: "text-blue-600 border-blue-400/40 bg-blue-500/5",
  Content:     "text-green-600 border-green-400/40 bg-green-500/5",
  Design:      "text-purple-600 border-purple-400/40 bg-purple-500/5",
  Growth:      "text-orange-600 border-orange-400/40 bg-orange-500/5",
};

/** Company values */
const VALUES = [
  { emoji: "🎓", title: "Learning First",   desc: "Every decision starts with: does this help students learn better?" },
  { emoji: "🚀", title: "Build Fast",       desc: "We ship weekly. Bias for action over endless planning." },
  { emoji: "🇮🇳", title: "India-Native",   desc: "Built for Bharat — 11 languages, rural-friendly, affordable." },
  { emoji: "💡", title: "AI-Augmented",    desc: "We use AI tools internally too. Work smarter, not just harder." },
  { emoji: "🔓", title: "Remote-First",    desc: "Work from anywhere in India. Async communication, deep work." },
  { emoji: "❤️", title: "Mission-Driven",  desc: "We're here to democratize quality education. That's it." },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function CareersPage() {
  const teams = Array.from(new Set(OPEN_ROLES.map((r) => r.team)));

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-brand-500/5 to-background py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">{OPEN_ROLES.length} Open Positions</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Join LearnVeda — <span className="text-brand-500">Shape the Future</span> of Indian Education
          </h1>
          <p className="text-muted-foreground text-xl mb-8">
            We're building the EdTech platform that every Indian student deserves.
            Help us make quality education accessible to 500 million learners.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 40+ Team Members</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Remote-first, India</span>
            <span className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-red-500" /> Mission-driven culture</span>
          </div>
          <Button variant="gradient" size="lg" asChild>
            <a href="#open-roles">View Open Roles <ArrowRight className="h-4 w-4" /></a>
          </Button>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-10">Why LearnVeda?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-2xl border bg-card p-5">
                <div className="text-3xl mb-3">{value.emoji}</div>
                <h3 className="font-bold mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16" id="open-roles">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-10">Open Roles</h2>
          <div className="space-y-4">
            {OPEN_ROLES.map((role) => (
              <div key={role.id} className="rounded-2xl border bg-card p-5 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{role.title}</h3>
                      <Badge variant="outline" className={`text-xs ${TEAM_COLORS[role.team] ?? ""}`}>{role.team}</Badge>
                      {role.type.includes("Internship") && (
                        <Badge variant="secondary" className="text-xs">Internship</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {role.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {role.type}</span>
                      <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {role.experience}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((skill) => (
                        <span key={skill} className="rounded-md bg-muted px-2 py-0.5 text-xs">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Button variant="gradient" asChild>
                      <a href={`mailto:careers@learnveda.in?subject=Application: ${role.title}`}>
                        Apply Now <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General application */}
          <div className="mt-10 rounded-2xl border bg-gradient-to-r from-brand-500/5 to-violet-500/5 border-brand-500/20 p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Don't see a fit?</h3>
            <p className="text-muted-foreground mb-4">
              We're always looking for exceptional people. Send us your resume and what you'd like to build.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:careers@learnveda.in?subject=General Application">
                Send Open Application
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
