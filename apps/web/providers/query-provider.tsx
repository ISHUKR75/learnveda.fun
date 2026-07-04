/**
 * @file providers/query-provider.tsx
 * @description TanStack Query (React Query) provider for LearnVeda
 * Provides global data fetching, caching, and synchronization
 * Used in root layout to enable server state management across all pages
 */

"use client"; // TanStack Query requires client-side context

import React, { useState } from "react";                      // React core
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // TanStack Query

/**
 * QueryProvider component
 * Creates a QueryClient instance and provides it to the component tree
 * The QueryClient is created inside useState to avoid sharing state between
 * different users and requests in a server-rendered environment
 *
 * @param children - Child components that can use useQuery, useMutation, etc.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create QueryClient in state so it's stable across re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime:            60 * 1000, // Data stays fresh for 1 minute before re-fetching
            refetchOnWindowFocus: false,     // Don't re-fetch when tab regains focus
            retry:                1,         // Retry failed requests once before showing error
          },
        },
      })
  );

  return (
    // Provide the QueryClient instance to the entire component tree
    <QueryClientProvider client={queryClient}>
      {children} {/* All child components can now use TanStack Query hooks */}
    </QueryClientProvider>
  );
}
