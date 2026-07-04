---
name: Clerk Auth Pattern
description: How LearnVeda handles Clerk auth in both configured and demo/placeholder-key modes
---

## Rule
Always check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` starts with `pk_` and does not include `placeholder` before calling any Clerk API. Use dynamic `import("@clerk/nextjs/server")` inside the conditional.

**Why:** The monorepo ships with placeholder keys so dev/demo mode works without real Clerk credentials. Direct top-level imports of Clerk server functions crash when keys are invalid.

**How to apply:**
- Server components: check `hasRealClerkKeys` const, then dynamic import Clerk inside `if`
- `app/(platform)/layout.tsx`: fail-closed — on Clerk error, `redirect("/sign-in")`, never `console.warn` + pass through
- Sign-in/sign-up pages: show demo UI with amber notice when keys are placeholder
- Root layout (`app/layout.tsx`): use `React.ComponentType<any>` for dynamic ClerkProvider to avoid TS2322 generic mismatch
