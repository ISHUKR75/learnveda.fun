/**
 * @file app/(platform)/compiler/page.tsx
 * @description Online code compiler page — embedded coding environment
 * Route: /compiler
 * Accepts: ?lang=python&code=... query params to pre-fill language and code
 * Shows: Language selector, code editor area, output panel, and run button
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2, Play, RotateCcw, Copy, ChevronDown,
  Terminal, Zap, BookOpen, ArrowRight,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Online Compiler — LearnVeda",
  description: "Free online code compiler for Python, JavaScript, Java, C++, and more. Write and run code in your browser.",
  keywords: ["online compiler", "Python online", "JavaScript compiler", "code runner", "LearnVeda"],
};

/* ─── Supported Languages ────────────────────────────────────────────────── */
// Languages supported by the compiler — in production uses Judge0 API
const LANGUAGES = [
  { id: "python",     name: "Python 3.11",      emoji: "🐍", template: 'print("Hello, LearnVeda!")\n\n# Your Python code here\n' },
  { id: "javascript", name: "JavaScript (Node)", emoji: "⚡", template: 'console.log("Hello, LearnVeda!");\n\n// Your JavaScript code here\n' },
  { id: "java",       name: "Java 17",           emoji: "☕", template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, LearnVeda!");\n    }\n}\n' },
  { id: "c",          name: "C (GCC)",           emoji: "⚙️", template: '#include <stdio.h>\n\nint main() {\n    printf("Hello, LearnVeda!\\n");\n    return 0;\n}\n' },
  { id: "cpp",        name: "C++ (GCC)",         emoji: "🔧", template: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, LearnVeda!" << std::endl;\n    return 0;\n}\n' },
  { id: "sql",        name: "SQL (SQLite)",      emoji: "🗃️", template: '-- SQL Query\nSELECT "Hello, LearnVeda!" AS message;\n' },
];

/* ─── Compiler Examples ──────────────────────────────────────────────────── */
// Pre-made examples to quickly populate the editor
const EXAMPLES = [
  { lang:"python",     title:"Fibonacci Series",    desc:"Generate first N Fibonacci numbers"    },
  { lang:"python",     title:"Palindrome Check",    desc:"Check if a string is a palindrome"     },
  { lang:"javascript", title:"Array Operations",    desc:"Filter, map, and reduce an array"      },
  { lang:"java",       title:"OOP Example",         desc:"Classes, constructors, and methods"    },
  { lang:"cpp",        title:"STL Vector",          desc:"Using vectors and algorithms in C++"   },
  { lang:"sql",        title:"JOIN Query",          desc:"Inner join across two tables"          },
];

/* ─── Compiler Page Component ────────────────────────────────────────────── */
export default function CompilerPage() {
  // Default to Python if no query param
  const defaultLang = LANGUAGES[0];
  const defaultCode = defaultLang.template;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Compiler Header ───────────────────────────────────────────────── */}
      <div className="border-b bg-card">
        <div className="container px-4 py-3 flex items-center gap-4 flex-wrap">
          {/* Language selector */}
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm">LearnVeda Compiler</span>
            <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">
              Free
            </Badge>
          </div>

          {/* Language dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm hover:bg-muted transition-colors">
              <span>{defaultLang.emoji}</span>
              <span>{defaultLang.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="sm" className="text-xs">
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Play className="h-3.5 w-3.5 mr-1 fill-white" />
              Run Code
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main Editor Area ──────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">

        {/* ─── Code Editor Panel ─────────────────────────────────────────── */}
        <div className="flex flex-col">
          <div className="px-4 py-2 border-b bg-muted/20 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"    />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"  />
            </div>
            <span className="text-xs text-muted-foreground ml-2">main.py</span>
          </div>

          {/* Code textarea — in production replaced with Monaco Editor */}
          <div className="flex-1 relative bg-zinc-950 min-h-[350px] lg:min-h-0">
            {/* Line numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-white/10 flex flex-col pt-4 text-right pr-2">
              {defaultCode.split("\n").map((_, i) => (
                <span key={i} className="text-[11px] text-white/20 leading-6 font-mono select-none">
                  {i + 1}
                </span>
              ))}
            </div>

            {/* Code content */}
            <pre className="pl-12 pr-4 pt-4 text-sm text-green-400 font-mono min-h-full">
              <code>{defaultCode}</code>
            </pre>

            {/* Editor integration note */}
            <div className="absolute bottom-4 right-4">
              <Badge className="text-[10px] bg-primary/20 text-primary border-primary/30">
                Monaco Editor (production)
              </Badge>
            </div>
          </div>
        </div>

        {/* ─── Output Panel ──────────────────────────────────────────────── */}
        <div className="flex flex-col">
          {/* Output header */}
          <div className="px-4 py-2 border-b bg-muted/20 flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Output</span>
            <Badge className="text-[9px] ml-auto bg-green-500/10 text-green-600 border-green-500/20">
              Ready
            </Badge>
          </div>

          {/* Output area */}
          <div className="flex-1 bg-zinc-900 p-4 font-mono text-sm text-green-400 min-h-[200px] lg:min-h-0">
            <span className="text-muted-foreground text-xs block mb-4">
              Click Run Code (▶) to execute your program...
            </span>

            {/* Sample output display */}
            <div className="text-green-400">
              <span className="text-white/40 text-xs">$ python main.py</span>
              <br />
              Hello, LearnVeda!
            </div>
          </div>

          {/* Input section */}
          <div className="border-t">
            <div className="px-4 py-2 border-b bg-muted/20">
              <span className="text-xs text-muted-foreground">Standard Input (stdin)</span>
            </div>
            <textarea
              rows={3}
              placeholder="Enter program input here..."
              className="w-full bg-zinc-900 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ── Quick Examples ─────────────────────────────────────────────────── */}
      <div className="border-t bg-muted/20">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground">Quick Examples:</span>
            {EXAMPLES.slice(0, 4).map((ex) => (
              <button
                key={ex.title}
                className="text-xs px-3 py-1.5 rounded-lg border bg-card hover:bg-muted transition-colors flex items-center gap-1.5"
              >
                <Zap className="h-3 w-3 text-primary" />
                {ex.title}
              </button>
            ))}
            <Link
              href="/programming"
              className="text-xs text-primary hover:underline flex items-center gap-1 ml-auto"
            >
              <BookOpen className="h-3 w-3" />
              Browse structured courses
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
