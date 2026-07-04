/**
 * @file features/about/components/TeamSection.tsx
 * @description Team section for the About page
 * Shows the founding team and core contributors
 */

"use client"; // Client component for animations

import React from "react";                       // React core
import { motion } from "framer-motion";          // Animations
import { Github, Twitter, Linkedin } from "lucide-react"; // Social icons

/* ─── Team Members Data ──────────────────────────────────────────────────── */
const team = [
  {
    name:     "ISHUKR75",
    role:     "Founder & Lead Developer",
    bio:      "Passionate about making quality education accessible to every Indian student. Full-stack developer with a vision for EdTech.",
    avatar:   "IV",
    color:    "from-brand-500 to-purple-600",
    github:   "https://github.com/ISHUKR75",
    twitter:  null,
    linkedin: null,
  },
  {
    name:     "You Could Be Here",
    role:     "Contributor",
    bio:      "LearnVeda is open-source! We welcome educators, developers, designers, and content creators. Join us and help build the future of education.",
    avatar:   "+",
    color:    "from-green-500 to-teal-600",
    github:   "https://github.com/ISHUKR75/LearnVeda",
    twitter:  null,
    linkedin: null,
  },
];

/* ─── Team Section Component ──────────────────────────────────────────────── */
export function TeamSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Meet the Team
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            LearnVeda is open-source and community-driven. Anyone can contribute — educators, developers, designers, or students.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center rounded-2xl border bg-card p-8 gap-4"
            >
              {/* Avatar */}
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${member.color} text-white text-2xl font-bold shadow-lg`}>
                {member.avatar}
              </div>

              {/* Name & role */}
              <div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-brand-500 font-medium">{member.role}</p>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open source CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-muted/40 border max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Want to Contribute?</h3>
          <p className="text-muted-foreground mb-4">
            LearnVeda is MIT-licensed and open-source. Whether you write code, create content, or report bugs — every contribution matters.
          </p>
          <a
            href="https://github.com/ISHUKR75/LearnVeda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:underline"
          >
            <Github className="h-4 w-4" />
            Star on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
