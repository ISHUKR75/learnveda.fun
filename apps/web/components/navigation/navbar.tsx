/**
 * @file components/navigation/navbar.tsx
 * @description Main navigation bar for LearnVeda
 * Fully responsive with mobile hamburger, dark mode toggle, and auth state
 * Auth-aware: shows Sign In/Sign Up links when Clerk is not configured (dev mode)
 * When Clerk IS configured, renders SignedIn/SignedOut + UserButton
 */

"use client"; // Client component — uses hooks and browser APIs

import React, { useState, useEffect }   from "react"; // React core + hooks
import Link                              from "next/link"; // Next.js navigation
import { usePathname }                   from "next/navigation"; // Current route
import { motion, AnimatePresence }       from "framer-motion"; // Animations
import {
  BookOpen, Code2, Brain, FlaskConical, Trophy, Users, Menu, X,
  ChevronDown, Sun, Moon, Zap, GraduationCap,
} from "lucide-react";                   // Icons
import { useTheme }                      from "next-themes"; // Dark mode
import { Button }                        from "@/components/ui/button"; // Button
import { Badge }                         from "@/components/ui/badge";  // Badge
import { cn }                            from "@/lib/utils"; // Class name utility
import { LanguageSwitcher }              from "@/components/shared/LanguageSwitcher"; // i18n language picker

/* ─── Detect Clerk availability at the module level ──────────────────────── */
// We check for the publishable key. This variable is inlined by Next.js at build time.
const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const HAS_CLERK =
  !!CLERK_KEY &&
  !CLERK_KEY.includes("placeholder") &&
  CLERK_KEY.startsWith("pk_") &&
  CLERK_KEY.length > 20;

/* ─── Learn Dropdown Items ───────────────────────────────────────────────── */
const learnLinks = [
  { href: "/learn/class-9",     icon: <BookOpen     className="h-4 w-4" />, label: "Class 9",         desc: "CBSE NCERT full curriculum"     },
  { href: "/learn/class-10",    icon: <BookOpen     className="h-4 w-4" />, label: "Class 10",        desc: "Board exam preparation"         },
  { href: "/learn/class-11",    icon: <BookOpen     className="h-4 w-4" />, label: "Class 11",        desc: "Physics, Chem, Math, Bio"       },
  { href: "/learn/class-12",    icon: <BookOpen     className="h-4 w-4" />, label: "Class 12",        desc: "Board + JEE/NEET prep"          },
  { href: "/learn/engineering", icon: <GraduationCap className="h-4 w-4" />, label: "Engineering",    desc: "9 branches × 8 semesters"       },
  { href: "/learn/programming", icon: <Code2        className="h-4 w-4" />, label: "Programming",     desc: "14 languages with day plans"    },
  { href: "/learn/core-cs",     icon: <Brain        className="h-4 w-4" />, label: "Core CS",         desc: "DSA, System Design, OS, DBMS"   },
];

/* ─── Platform Dropdown Items ────────────────────────────────────────────── */
const platformLinks = [
  { href: "/simulations",  icon: <FlaskConical className="h-4 w-4" />, label: "Simulations",  desc: "140+ interactive physics & CS sims" },
  { href: "/live-battles", icon: <Zap         className="h-4 w-4" />, label: "Live Battles", desc: "1v1 real-time quiz & coding battles"  },
  { href: "/leaderboard",  icon: <Trophy       className="h-4 w-4" />, label: "Leaderboard", desc: "Global & subject-wise rankings"       },
  { href: "/community",    icon: <Users        className="h-4 w-4" />, label: "Community",   desc: "Q&A, study groups, mentors"           },
  { href: "/practice",     icon: <Brain        className="h-4 w-4" />, label: "Practice",    desc: "10K+ MCQs, mock tests, coding drills" },
];

/* ─── Top-level navigation links ─────────────────────────────────────────── */
const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing",  label: "Pricing"  },
  { href: "/events",   label: "Events"   },
];

/* ─── Dropdown Menu Component ────────────────────────────────────────────── */
function NavDropdown({
  label,
  items,
  isOpen,
  onToggle,
}: {
  label:    string;
  items:    { href: string; icon: React.ReactNode; label: string; desc: string }[];
  isOpen:   boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/60"
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0,    y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-72 rounded-2xl border bg-background/95 backdrop-blur-sm shadow-xl p-2 z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onToggle}
                className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted/60 transition-colors group"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold group-hover:text-brand-500 transition-colors">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Auth Section (no Clerk) ────────────────────────────────────────────── */
function AuthLinks() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button variant="gradient" size="sm" asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
}

/* ─── Clerk Auth Section (lazy-loaded only when keys present) ────────────── */
function ClerkAuthSection() {
  const [ClerkComponents, setClerkComponents] = React.useState<{
    SignedIn: React.ComponentType<{children: React.ReactNode}>;
    SignedOut: React.ComponentType<{children: React.ReactNode}>;
    UserButton: React.ComponentType<{afterSignOutUrl?: string}>;
  } | null>(null);

  React.useEffect(() => {
    if (HAS_CLERK) {
      import("@clerk/nextjs").then((mod) => {
        setClerkComponents({
          SignedIn:   mod.SignedIn,
          SignedOut:  mod.SignedOut,
          UserButton: mod.UserButton,
        });
      }).catch(() => {
        // If Clerk fails to load, fall back to plain links
        setClerkComponents(null);
      });
    }
  }, []);

  if (!HAS_CLERK || !ClerkComponents) {
    return <AuthLinks />;
  }

  const { SignedIn, SignedOut, UserButton } = ClerkComponents;

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <AuthLinks />
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  );
}

/* ─── Main Navbar Component ──────────────────────────────────────────────── */
export function Navbar() {
  const pathname             = usePathname();
  const { theme, setTheme }  = useTheme();
  const [openMenu,   setOpenMenu]   = useState<"learn" | "platform" | "mobile" | null>(null);
  const [scrolled,   setScrolled]   = useState(false);

  // Add shadow when user scrolls down
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpenMenu(null); }, [pathname]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        {/* ── Logo ──────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 text-white font-bold text-lg shadow-sm group-hover:shadow-brand-500/30 group-hover:scale-105 transition-all">
            L
          </div>
          <span className="text-xl font-extrabold tracking-tight hidden sm:block">
            Learn<span className="text-gradient">Veda</span>
          </span>
          <Badge variant="outline" className="hidden md:flex text-xs text-brand-500 border-brand-500/30 py-0">
            Beta
          </Badge>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Dropdowns */}
          <NavDropdown
            label="Learn"
            items={learnLinks}
            isOpen={openMenu === "learn"}
            onToggle={() => setOpenMenu(openMenu === "learn" ? null : "learn")}
          />
          <NavDropdown
            label="Platform"
            items={platformLinks}
            isOpen={openMenu === "platform"}
            onToggle={() => setOpenMenu(openMenu === "platform" ? null : "platform")}
          />

          {/* Static links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                pathname === link.href
                  ? "text-brand-500 bg-brand-500/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Right Actions ──────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          {/* Language switcher — 11 Indian languages */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun  className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* Auth buttons — desktop only */}
          <div className="hidden lg:block">
            <ClerkAuthSection />
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/60 transition-colors"
            onClick={() => setOpenMenu(openMenu === "mobile" ? null : "mobile")}
            aria-label="Toggle mobile menu"
          >
            {openMenu === "mobile" ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {openMenu === "mobile" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container px-4 py-4 space-y-4">
              {/* Learn section */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Learn</p>
                <div className="grid grid-cols-2 gap-1">
                  {learnLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted/60 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-brand-500">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Platform section */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Platform</p>
                <div className="grid grid-cols-2 gap-1">
                  {platformLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted/60 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-brand-500">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Static links */}
              <div className="border-t pt-3 flex flex-wrap gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Auth buttons in mobile */}
              <div className="border-t pt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button variant="gradient" size="sm" className="flex-1" asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown when clicking outside */}
      {(openMenu === "learn" || openMenu === "platform") && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpenMenu(null)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
