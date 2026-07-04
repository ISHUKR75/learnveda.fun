/**
 * @file components/navigation/footer.tsx
 * @description Site-wide footer for LearnVeda
 * Contains navigation links, social links, legal links, and newsletter signup
 * Fully responsive with 4-column grid collapsing to 2 → 1 on mobile
 */

import React from "react";        // React core
import Link from "next/link";     // Next.js Link
import { Sparkles, Github, Twitter, Youtube, Instagram, Linkedin, Heart } from "lucide-react"; // Icons

/* ─── Footer Link Sections ───────────────────────────────────────────────── */
const footerLinks = [
  {
    heading: "Learn",
    links: [
      { label: "Class 9",      href: "/learn/class-9" },
      { label: "Class 10",     href: "/learn/class-10" },
      { label: "Class 11",     href: "/learn/class-11" },
      { label: "Class 12",     href: "/learn/class-12" },
      { label: "Engineering",  href: "/learn/engineering" },
      { label: "Programming",  href: "/learn/programming" },
      { label: "Core CS",      href: "/learn/core-cs" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Dashboard",    href: "/dashboard" },
      { label: "Live Battles", href: "/live-battles" },
      { label: "Leaderboard",  href: "/leaderboard" },
      { label: "Community",    href: "/community" },
      { label: "Events",       href: "/events" },
      { label: "Simulations",  href: "/simulations" },
      { label: "Test Center",  href: "/test-center" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog",         href: "/blog" },
      { label: "Docs",         href: "/docs" },
      { label: "Practice",     href: "/practice" },
      { label: "Explore",      href: "/explore" },
      { label: "Cheatsheets",  href: "/cheatsheets" },
      { label: "AI Tutor",     href: "/ai-tutor" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",        href: "/about" },
      { label: "Features",     href: "/features" },
      { label: "Pricing",      href: "/pricing" },
      { label: "Contact",      href: "/contact" },
      { label: "Privacy",      href: "/privacy-policy" },
      { label: "Terms",        href: "/terms-of-service" },
    ],
  },
];

/* ─── Social Links ───────────────────────────────────────────────────────── */
const socialLinks = [
  { label: "GitHub",    href: "https://github.com/learnveda",    icon: <Github    className="h-5 w-5" /> },
  { label: "Twitter",   href: "https://twitter.com/learnveda",   icon: <Twitter   className="h-5 w-5" /> },
  { label: "YouTube",   href: "https://youtube.com/@learnveda",  icon: <Youtube   className="h-5 w-5" /> },
  { label: "Instagram", href: "https://instagram.com/learnveda", icon: <Instagram className="h-5 w-5" /> },
  { label: "LinkedIn",  href: "https://linkedin.com/company/learnveda", icon: <Linkedin className="h-5 w-5" /> },
];

/* ─── Footer Component ───────────────────────────────────────────────────── */
export function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamic year for copyright

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6">

        {/* ── Main Footer Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-gradient font-extrabold">LearnVeda</span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              One platform for complete learning — from Class 9 to Graduation, with AI, simulations, and live battles.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation link columns */}
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">{section.heading}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Footer Bottom Bar ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t py-6 gap-4">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {currentYear} LearnVeda. All rights reserved.{" "}
            {/* Made with love in India */}
            Made with <Heart className="inline h-3 w-3 text-red-500 fill-red-500" /> in India 🇮🇳
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy-policy"   className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/sitemap.xml"      className="hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
