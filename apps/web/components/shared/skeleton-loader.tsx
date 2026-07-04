/**
 * @file components/shared/skeleton-loader.tsx
 * @description Skeleton loading components for LearnVeda
 * Used to show placeholder UI while content is loading
 * Prevents layout shift and improves perceived performance
 */

import React from "react";    // React core
import { cn } from "@/lib/utils"; // Class merger utility

/* ─── Base Skeleton ──────────────────────────────────────────────────────── */
/**
 * Base skeleton element — animated shimmer rectangle
 * Use this as a building block for more specific skeletons
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted", // Pulse animation + muted background
        className
      )}
      {...props}
    />
  );
}

/* ─── Card Skeleton ──────────────────────────────────────────────────────── */
/**
 * Skeleton for course/feature cards
 * Mimics the layout of actual card components
 */
function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4"> {/* Card container */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />  {/* Icon placeholder */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />           {/* Title placeholder */}
          <Skeleton className="h-3 w-1/2" />           {/* Subtitle placeholder */}
        </div>
      </div>
      <Skeleton className="h-3 w-full" />              {/* Description line 1 */}
      <Skeleton className="h-3 w-4/5" />              {/* Description line 2 */}
      <Skeleton className="h-9 w-full rounded-lg" />  {/* Button placeholder */}
    </div>
  );
}

/* ─── Course Card Grid Skeleton ──────────────────────────────────────────── */
/**
 * Skeleton for a grid of course cards
 * @param count - Number of skeleton cards to show
 */
function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => ( // Create `count` skeleton cards
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ─── Table Skeleton ─────────────────────────────────────────────────────── */
/**
 * Skeleton for data tables (leaderboard, test results, etc.)
 * @param rows - Number of table rows to show
 */
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {/* Table header */}
      <div className="flex gap-4 pb-2 border-b">
        {[40, 120, 80, 60, 80].map((w, i) => ( // Column widths
          <Skeleton key={i} className="h-4" style={{ width: w }} />
        ))}
      </div>
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3">
          {[40, 120, 80, 60, 80].map((w, j) => (
            <Skeleton key={j} className="h-4" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Hero Skeleton ──────────────────────────────────────────────────────── */
/**
 * Skeleton for the hero section while page is loading
 */
function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-20">
      <Skeleton className="h-6 w-40 rounded-full" />   {/* Badge */}
      <Skeleton className="h-12 w-3/4 max-w-2xl" />    {/* Headline line 1 */}
      <Skeleton className="h-12 w-2/3 max-w-xl" />     {/* Headline line 2 */}
      <Skeleton className="h-5 w-1/2 max-w-md" />      {/* Subheadline */}
      <div className="flex gap-4">
        <Skeleton className="h-12 w-36 rounded-xl" />  {/* CTA button 1 */}
        <Skeleton className="h-12 w-36 rounded-xl" />  {/* CTA button 2 */}
      </div>
    </div>
  );
}

/* ─── Profile Skeleton ───────────────────────────────────────────────────── */
/**
 * Skeleton for user profile cards
 */
function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />  {/* Avatar */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />              {/* Name */}
        <Skeleton className="h-3 w-24" />              {/* Username/role */}
      </div>
    </div>
  );
}

/* ─── Exports ────────────────────────────────────────────────────────────── */
export { Skeleton, CardSkeleton, CourseGridSkeleton, TableSkeleton, HeroSkeleton, ProfileSkeleton };
