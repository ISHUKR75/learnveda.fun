/**
 * @file app/(platform)/practice/playground/page.tsx
 * @description Free Coding Playground — quick code execution environment
 * Route: /practice/playground
 *
 * Redirect wrapper: sends users to the full-featured compiler at /compiler.
 * Also shows quick-start templates for popular languages.
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useEffect } from "react";
import { useRouter }        from "next/navigation";
import Link                 from "next/link";
import { motion }           from "framer-motion";
import {
  Terminal, Zap, ArrowRight, Code2,
  ChevronRight,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Quick-start language templates ─────────────────────────────────────── */
const TEMPLATES = [
  { lang: "Python",     emoji: "🐍", slug: "python",     starter: "print('Hello, LearnVeda!')" },
  { lang: "JavaScript", emoji: "⚡", slug: "javascript",  starter: "console.log('Hello, LearnVeda!');" },
  { lang: "Java",       emoji: "☕", slug: "java",        starter: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, LearnVeda!");\n  }\n}' },
  { lang: "C++",        emoji: "⚙️", slug: "cpp",         starter: '#include<iostream>\nusing namespace std;\nint main(){\n  cout<<"Hello, LearnVeda!";\n  return 0;\n}' },
  { lang: "Go",         emoji: "🐹", slug: "go",          starter: 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, LearnVeda!")\n}' },
  { lang: "Rust",       emoji: "🦀", slug: "rust",        starter: 'fn main() {\n    println!("Hello, LearnVeda!");\n}' },
] as const;

export default function PlaygroundPage() {
  const router = useRouter();

  // Auto-redirect to full compiler after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/compiler");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pb-20">
      <div className="container px-4 md:px-6 max-w-2xl py-16">
        <motion.div
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white mx-auto mb-4">
            <Terminal className="h-8 w-8" />
          </div>
          <Badge variant="secondary" className="mb-3">Redirecting to Full Compiler…</Badge>
          <h1 className="text-3xl font-extrabold mb-4">🖥️ Code Playground</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Taking you to the LearnVeda Compiler — 13 languages, Monaco Editor, and real execution.
            Or jump straight to a language below.
          </p>

          <div className="flex gap-3 justify-center mb-12">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/compiler">
                <Zap className="h-4 w-4" /> Open Full Compiler
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/practice">
                <ArrowRight className="h-4 w-4" /> Back to Practice
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Quick-start templates */}
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Start — Choose a Language</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TEMPLATES.map((tmpl, i) => (
              <motion.div
                key={tmpl.lang}
                initial={{ opacity: 0.01, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <Link
                  href={`/compiler?lang=${tmpl.slug}`}
                  className="group flex items-center gap-2.5 rounded-xl border bg-card p-3.5 hover:border-brand-500/40 hover:shadow-md transition-all"
                >
                  <span className="text-2xl">{tmpl.emoji}</span>
                  <span className="font-semibold text-sm group-hover:text-brand-500 transition-colors flex-1">
                    {tmpl.lang}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Also try */}
        <div className="mt-10 rounded-2xl border bg-muted/30 p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Looking for coding challenges?{" "}
            <Link href="/practice/coding-playground" className="text-brand-500 hover:underline font-medium">
              Try the Coding Playground
            </Link>{" "}
            with 12+ curated problems.
          </p>
        </div>
      </div>
    </div>
  );
}
