/**
 * @file features/about/components/TeamSection.tsx
 * @description Team members section for the About page
 * Shows team cards + join-the-team CTA
 * Used in: app/(marketing)/about/page.tsx
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ─── Team members data ──────────────────────────────────────────────────── */
const TEAM = [
  { name: "Ishu Kumar",    role: "Founder & CEO",          avatar: "IK", color: "from-brand-500 to-purple-500",  location: "Bhilai, CG",   bio: "IIT grad. Passionate about making elite education accessible to every Indian student." },
  { name: "Priya Sharma",  role: "Head of Curriculum",     avatar: "PS", color: "from-blue-500 to-cyan-500",     location: "Jaipur, RJ",   bio: "CBSE topper, 6 years teaching experience. Designs every structured day-plan." },
  { name: "Rahul Nair",    role: "Lead Engineer",          avatar: "RN", color: "from-green-500 to-teal-500",    location: "Kochi, KL",    bio: "Full-stack engineer who previously built learning apps for 500K+ students." },
  { name: "Anjali Gupta",  role: "Product Design Lead",    avatar: "AG", color: "from-pink-500 to-rose-500",     location: "Pune, MH",     bio: "UX designer focused on student cognitive load and mobile-first learning flows." },
  { name: "Vikram Singh",  role: "AI/ML Engineer",         avatar: "VS", color: "from-orange-500 to-amber-500",  location: "Bangalore, KA",bio: "NLP researcher building the AI Tutor and adaptive learning recommendation engine." },
  { name: "Sneha Patel",   role: "Content Strategy",       avatar: "SP", color: "from-purple-500 to-violet-500", location: "Ahmedabad, GJ",bio: "EdTech content strategist. Leads vernacular translation and accessibility initiatives." },
];

export function TeamSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">The Team Behind LearnVeda</h2>
          <p className="text-muted-foreground">A small team. Big mission. All from India's best colleges and EdTech companies.</p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0.01, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border bg-card p-5 shadow-sm"
            >
              {/* Avatar */}
              <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                {member.avatar}
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-brand-500 font-medium mb-1">{member.role}</p>
              <Badge variant="outline" className="text-xs mb-2">{member.location}</Badge>
              <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* Join the team CTA */}
        <div className="text-center p-8 rounded-2xl border bg-brand-500/5 border-brand-500/20 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-2">Join the Team</h3>
          <p className="text-muted-foreground text-sm mb-4">
            We're hiring engineers, educators, designers, and growth hackers who care about education.
          </p>
          <Link href="/careers">
            <Button className="gap-1.5">View Open Roles <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
