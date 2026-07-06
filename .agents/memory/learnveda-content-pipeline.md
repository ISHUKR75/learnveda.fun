---
name: LearnVeda Subject Content Pipeline
description: How new class/subject curriculum content is wired end-to-end (DB + demo-mode static fallback) without touching page code.
---

## Pattern
`lib/services/content-service.ts` exposes generic `getChapterList(classLevel, subject)` /
`getChapterDetail(classLevel, subject, chapterId)`. It tries MongoDB (`Chapter` model)
first, then falls back to a `STATIC_CONTENT` registry keyed by `"classLevel:subject"`.

The subject overview page and chapter detail page under
`app/(platform)/learn/[classLevel]/[subject]/` call these generic functions with the
route params — they are **not** hardcoded per-subject. This means once a subject is
registered in `STATIC_CONTENT`, its pages work automatically with zero page-code changes.

## Adding a new subject
1. Create `lib/content/<classLevel>-<subject>.ts` exporting a `ContentChapter[]`
   (reuse the type from `class9-mathematics.ts`). Use real chapter titles/topics —
   many subject pages already have a static `SUBJECT_DATA` list with real NCERT
   chapter names/durations that can be reused directly instead of inventing new ones.
2. Register the array in `STATIC_CONTENT` in `content-service.ts`.
3. Add an entry to `SEED_SETS` in `scripts/seed/seed-content.ts` so it gets upserted
   into MongoDB once `MONGODB_URI` is available (seed script is upsert-based/idempotent,
   safe to re-run, never deletes).

**Why:** Keeps the "no fake data, real production content" requirement scalable across
dozens of class/subject/chapter combinations without duplicating page logic per subject.

## Variant: per-class-level route files (Class 9-12 today)
Class 9-12 each have their own `[subject]/page.tsx` + `[subject]/[chapter]/page.tsx`
route pair (not shared across class levels). Classes 9-10 pull chapter data through the
`content-service.ts` STATIC_CONTENT registry described above. Classes 11-12 instead use a
colocated `subject-data.ts` file (e.g. `class-11/subject-data.ts`) exporting a
`Record<subjectSlug, SubjectData>` with real NCERT chapter titles/topics, imported directly
by that class level's `[subject]/page.tsx` and `[subject]/[chapter]/page.tsx` — chapter body
copy is a structured study-skeleton (objective/topics/practice) rather than fully authored
theory, consistent with the generic-fallback pattern already used for unregistered subjects.
**Why:** Empty `[subject]` route folders (only `.gitkeep`) 404 silently — always verify with
`ls` that class-level route folders actually contain `page.tsx`, not just that the overview
page links to them.
