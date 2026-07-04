---
name: Platform Layout Navbar
description: The (platform) route group layout already provides the Navbar — pages must not duplicate it
---

## Rule
`apps/web/app/(platform)/layout.tsx` renders `<Navbar />` for all platform routes. Individual platform pages (leaderboard, live-battles, community, dashboard, etc.) must import and render only `<Footer />` — never `<Navbar />`.

**Why:** Duplicate imports cause a double navbar rendered on screen.

**How to apply:** When creating or editing any page under `app/(platform)/`, check for Navbar import — remove it and any `<Navbar />` JSX. Footer stays because the platform layout does not include one.
