/**
 * @file features/about/components/TeamSection.tsx
 * @description Team section for the About page
 *
 * Shows the core team members with their:
 *  - Avatar placeholder (initials-based until real photos are uploaded)
 *  - Name and role
 *  - Short bio
 *  - LinkedIn / GitHub links
 *
 * NOTE: Replace the TEAM_MEMBERS array with real team data.
 */

"use client"; // Client component for motion animations

import React from "react";
import { motion } from "framer-motion"; // Entry animations
import { Github, Linkedin } from "lucide-react"; // Social icons

/* ─── Team Members Data ──────────────────────────────────────────────────── */
// Replace with actual team members and their photos
const TEAM_MEMBERS = [
  {
    name:     "Ishu Kumar",
    role:     "Founder & CEO",
    initials: "IK",
    color:    "from-brand-500 to-purple-500",
    bio:      "Built LearnVeda to make quality education accessible to every student in India. Passionate about EdTech and AI.",
    github:   "https://github.com/ISHUKR75",
    linkedin: null,
  },
  {
    name:     "Content Team",
    role:     "Curriculum & Pedagogy",
    initials: "CT",
    color:    "from-blue-500 to-cyan-500",
    bio:      "Expert educators from IITs and top colleges crafting every chapter, simulation, and quiz with care.",
    github:   null,
    linkedin: null,
  },
  {
    name:     "Engineering Team",
    role:     "Platform & Infrastructure",
    initials: "ET",
    color:    "from-green-500 to-teal-500",
    bio:      "Full-stack developers building a scalable, fast, and secure platform for 10,000+ concurrent students.",
    github:   null,
    linkedin: null,
  },
  {
    name:     "AI Team",
    role:     "AI Research & Tutor",
    initials: "AI",
    color:    "from-orange-500 to-amber-500",
    bio:      "AI engineers training models to provide accurate, helpful, and encouraging tutoring in every subject.",
    github:   null,
    linkedin: null,
  },
];

/* ─── TeamSection Component ──────────────────────────────────────────────── */
export function TeamSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Team</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            LearnVeda is built by a passionate team of educators, engineers, and lifelong learners.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border bg-card p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Avatar — gradient circle with initials */}
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4`}
              >
                <span className="text-white font-bold text-lg">{member.initials}</span>
              </div>

              {/* Name and role */}
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-brand-500 font-medium mt-0.5">{member.role}</p>

              {/* Bio */}
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>

              {/* Social links */}
              {(member.github || member.linkedin) && (
                <div className="flex items-center justify-center gap-3 mt-4">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Join the team CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl border bg-muted/30 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-2">Join Our Team</h3>
          <p className="text-muted-foreground mb-4">
            We are always looking for passionate educators, engineers, and designers.
          </p>
          <a
            href="mailto:careers@learnveda.in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
