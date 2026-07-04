/**
 * @file app/not-found.tsx
 * @description Custom 404 Not Found page for LearnVeda
 * Shown when a user navigates to a URL that doesn't exist
 */

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      {/* Animated number */}
      <div className="mb-8">
        <span className="text-9xl font-extrabold text-gradient select-none">404</span>
      </div>

      <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>

      {/* Quick links */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button variant="gradient" asChild>
          <Link href="/"><ArrowLeft className="h-4 w-4" /> Go to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/learn"><Search className="h-4 w-4" /> Explore Courses</Link>
        </Button>
      </div>

      {/* Helpful links */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        {["Simulations", "Leaderboard", "Community", "Pricing", "Contact"].map((link) => (
          <Link key={link} href={`/${link.toLowerCase()}`} className="hover:text-brand-500 transition-colors">
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}
