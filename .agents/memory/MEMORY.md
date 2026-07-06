# LearnVeda Agent Memory Index

- [Clerk Auth Pattern](clerk-auth-pattern.md) — Clerk is optional; always check for real keys before importing; platform layout must be fail-closed on Clerk errors.
- [Framer Motion SSR](framer-motion-ssr.md) — Initial opacity:0 causes blank screenshots; use 0.01 as floor for hero animations above the fold.
- [Platform Layout Navbar](platform-layout-navbar.md) — (platform)/layout.tsx provides the Navbar; individual platform pages must NOT import or render their own Navbar.
- [TypeScript Strict Indexing](ts-strict-indexing.md) — Union type + Record<K,V> pattern required for level variant lookups; avoid string indexing on const objects.
- [LearnVeda Setup Notes](learnveda-setup-notes.md) — Build quirks (npm run build deletes .next), demo mode pattern, middleware auth, webhook fail-closed security, AI rate limiting.
- [Subject Content Pipeline](learnveda-content-pipeline.md) — content-service + subject pages are class/subject-agnostic; new subjects need only a content file + STATIC_CONTENT + seed registry entry.
