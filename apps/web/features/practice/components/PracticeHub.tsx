/**
 * @file features/practice/components/PracticeHub.tsx
 * @description Practice hub component — links to all practice modes
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code2, FileText, Target, Clock, Brain, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge }  from "@/components/ui/badge";

const practiceCategories = [
  { title: "Subject-wise Quizzes",    desc: "MCQs for every chapter across Class 9-12 and CS subjects.",     icon: <Brain     className="h-6 w-6" />, color: "from-blue-500 to-cyan-500",   href: "/practice/quiz",     emoji: "🧠" },
  { title: "Mock Tests",              desc: "Full-length CBSE, JEE, NEET, GATE mock tests with timer.",      icon: <FileText  className="h-6 w-6" />, color: "from-purple-500 to-pink-500", href: "/practice/mock",     emoji: "📋" },
  { title: "Coding Playground",       desc: "In-browser IDE supporting 14 languages with test cases.",       icon: <Code2     className="h-6 w-6" />, color: "from-green-500 to-teal-500",  href: "/practice/code",     emoji: "💻" },
  { title: "Previous Year Papers",    desc: "CBSE board, JEE, and NEET previous year questions with solutions.", icon: <BookOpen className="h-6 w-6" />, color: "from-orange-500 to-red-500",  href: "/practice/pyq",      emoji: "📚" },
  { title: "Daily Challenge",         desc: "One new problem every day — build a daily learning habit.",      icon: <Target    className="h-6 w-6" />, color: "from-yellow-500 to-orange-500", href: "/practice/daily",   emoji: "🎯" },
  { title: "Timed Drills",            desc: "Speed-practice under time pressure to build exam confidence.",   icon: <Clock     className="h-6 w-6" />, color: "from-cyan-500 to-blue-500",   href: "/practice/timed",    emoji: "⏱" },
  { title: "Flashcards",              desc: "Spaced repetition flashcards for formulas, definitions, and concepts.", icon: <Zap className="h-6 w-6" />, color: "from-pink-500 to-rose-500",  href: "/practice/flashcards", emoji: "🃏" },
  { title: "Assignment Tracker",      desc: "Create and track custom assignments. Review progress.",         icon: <FileText  className="h-6 w-6" />, color: "from-indigo-500 to-violet-500",href: "/practice/assignments", emoji: "✅" },
];

export function PracticeHub() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">Practice</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Practice Makes <span className="text-gradient">Perfect</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            10,000+ MCQs, mock tests, coding challenges, and PYQs — everything you need to ace your exams and interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {practiceCategories.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link href={cat.href} className="group block h-full">
                <div className="h-full rounded-2xl border bg-card p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                  <div className="text-3xl">{cat.emoji}</div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2 group-hover:text-brand-500 transition-colors">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                    Start <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
