# Feature: Learn

The `learn` feature powers the Class 9–12 CBSE learning content delivery system.

## Architecture

```
features/learn/
├── components/          # Shared learn UI (ChapterCard, SubjectCard, ProgressRing)
├── hooks/               # useChapterProgress, useSubjectCompletion
├── types/               # Chapter, Subject, Class TypeScript types
├── utils/               # Helpers: slugify, formatChapterId, calcProgress
├── constants/           # Subject lists, chapter counts per class
└── README.md            # This file
```

## Content Pipeline

Content is served through `lib/services/content-service.ts` which:
1. Checks if MongoDB is connected (`MONGODB_URI` env var)
2. If yes: fetches from `chapters` collection
3. If no (demo mode): returns `STATIC_CONTENT` from the page file itself

### Adding a New Subject

To add a new subject (e.g., "Computer Science for Class 12"):

1. Create content file: `features/learn/class-12/computer-science/content.ts`
2. Add chapters to the `STATIC_CONTENT` map in `app/(platform)/learn/class-12/[subject]/page.tsx`
3. Add a MongoDB seed entry in `database/seeds/class-12-cs.ts`
4. The dynamic route automatically picks it up — no new route needed

### Subject Slug Format

Subject slugs follow the NCERT naming convention:
- `mathematics` (not "maths")
- `science` (for Class 9/10 combined Science)
- `physics` / `chemistry` / `biology` (for Class 11/12 separately)
- `social-science` (hyphenated)
- `english` / `hindi`

### Chapter ID Format

Chapter IDs follow `chapter-{padded-number}`:
- `chapter-01`, `chapter-02`, ..., `chapter-15`
- Always 2-digit padding for correct alphabetical sorting

## Routes

| Route Pattern | Description |
|--------------|-------------|
| `/learn` | All classes + quick access |
| `/learn/class-9` | Class 9 subjects |
| `/learn/class-9/[subject]` | Subject hub + chapter list |
| `/learn/class-9/[subject]/[chapter]` | Chapter content (theory, quiz, simulation) |

Same pattern for class-10, class-11, class-12.
