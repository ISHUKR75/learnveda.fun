/**
 * @file features/about/components/ValuesSection.tsx
 * @description 6 core values grid for the About page
 * Used in: app/(marketing)/about/page.tsx
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Heart, Users, BookOpen, Globe } from "lucide-react";

const VALUES = [
  { icon: Zap,      title: "Speed of Learning",    color: "text-yellow-500", bg: "bg-yellow-500/10", desc: "Structured day-plans replace aimless exploration. Every minute spent on LearnVeda counts toward a defined goal." },
  { icon: Shield,   title: "Trust & Accuracy",     color: "text-blue-500",   bg: "bg-blue-500/10",   desc: "Every chapter is reviewed against NCERT syllabi. Simulations are validated by subject-matter experts." },
  { icon: Heart,    title: "Student-First Design",  color: "text-red-500",    bg: "bg-red-500/10",    desc: "We design for students who study at midnight, on mobile, with patchy internet. Offline-first, dark mode, fast." },
  { icon: Users,    title: "Community Learning",    color: "text-green-500",  bg: "bg-green-500/10",  desc: "Learning happens best with peers. Live battles, forums, and group challenges create the social layer that solo study lacks." },
  { icon: BookOpen, title: "Depth Over Breadth",    color: "text-purple-500", bg: "bg-purple-500/10", desc: "We don't try to cover everything. We cover what matters — CBSE syllabus, core CS, and placement-critical tracks — deeply." },
  { icon: Globe,    title: "Vernacular Commitment", color: "text-orange-500", bg: "bg-orange-500/10", desc: "11 Indian languages supported. Because a student who understands in Hindi shouldn't be disadvantaged vs one who reads in English." },
];

export function ValuesSection() {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">What We Stand For</h2>
          <p className="text-muted-foreground">6 values that guide every product decision we make.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0.01, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-2.5 rounded-xl ${v.bg} ${v.color} mb-3`}>
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
