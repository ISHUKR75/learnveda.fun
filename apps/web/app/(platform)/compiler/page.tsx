/**
 * @file app/(platform)/compiler/page.tsx
 * @description Online Code Compiler page — routes to CodeCompiler feature component
 *
 * Route: /compiler
 *
 * This page is a thin wrapper that:
 *  1. Sets the page metadata for SEO
 *  2. Lazily imports the CodeCompiler feature component (Monaco Editor is heavy)
 *  3. Shows a skeleton while Monaco loads
 *
 * Monaco Editor is ~2MB and is dynamically imported inside CodeCompiler.tsx.
 * This page itself is server-rendered — only the editor is client-side.
 */

import type { Metadata }  from "next";                              // Next.js metadata type
import { CodeCompiler }   from "@/features/compiler/components/CodeCompiler"; // Feature component
import { Suspense }       from "react";                             // For streaming skeleton
import { Terminal, Loader2 } from "lucide-react";                  // Icons

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Online Code Compiler — LearnVeda | Run Code in 13 Languages",
  description: "Free online compiler for Python, JavaScript, Java, C, C++, TypeScript, Rust, Kotlin, Swift, SQL, Dart, Ruby, and Go. Write and run code directly in your browser.",
  keywords:    ["online compiler", "code runner", "python compiler", "javascript playground", "java online", "free ide"],
  openGraph: {
    title:       "Online Code Compiler — LearnVeda",
    description: "Run code in 13 programming languages directly in your browser. Free, fast, and no installation required.",
    type:        "website",
  },
};

/* ─── Compiler Loading Skeleton ──────────────────────────────────────────── */
/**
 * Shown while the CodeCompiler component hydrates and Monaco loads.
 * Gives users immediate visual feedback instead of a blank page.
 */
function CompilerSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* Loading indicator */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto">
          <Terminal className="h-8 w-8 text-brand-500" />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading compiler...
        </div>
      </div>
    </div>
  );
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
/**
 * Compiler page — wraps CodeCompiler in Suspense for streaming SSR.
 * The Suspense boundary shows CompilerSkeleton until the client component mounts.
 */
export default function CompilerPage() {
  return (
    <Suspense fallback={<CompilerSkeleton />}>  {/* Show skeleton while loading */}
      <CodeCompiler
        initialLanguage="python" // Default language: Python (most popular for beginners)
        initialCode=""           // No pre-filled code — use template from CodeCompiler
      />
    </Suspense>
  );
}
