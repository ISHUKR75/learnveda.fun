/**
 * @file scripts/seed/seed-content.ts
 * @description One-shot seed script that loads real, NCERT-aligned curriculum
 * content from `apps/web/lib/content/*` into the `chapters` MongoDB collection.
 *
 * Usage:
 *   cd apps/web && npx tsx ../../scripts/seed/seed-content.ts
 *
 * Safe to re-run: uses upsert (update-or-insert) keyed on
 * (classLevel, subject, chapterId), so running it again just refreshes
 * content instead of creating duplicates. Never deletes existing documents.
 */

import mongoose from "mongoose";
import { Chapter } from "../../apps/web/lib/mongodb/models/Chapter";
import { CLASS_9_MATHEMATICS_CHAPTERS } from "../../apps/web/lib/content/class9-mathematics";

/* ─── Seed Registry ──────────────────────────────────────────────────────── */
// Each entry describes which static content array maps to which
// (courseType, classLevel, subject) triple in the database.
const SEED_SETS: {
  courseType: "class" | "programming" | "engineering" | "core-cs";
  classLevel: string;
  subject:    string;
  chapters:   typeof CLASS_9_MATHEMATICS_CHAPTERS;
}[] = [
  {
    courseType: "class",
    classLevel: "class-9",
    subject:    "mathematics",
    chapters:   CLASS_9_MATHEMATICS_CHAPTERS,
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set — cannot seed. Configure it via the environment-secrets flow first.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("Connected. Seeding curriculum content...");

  let upserted = 0;

  for (const set of SEED_SETS) {
    for (const chapter of set.chapters) {
      await Chapter.findOneAndUpdate(
        { classLevel: set.classLevel, subject: set.subject, chapterId: chapter.chapterId },
        {
          $set: {
            courseType: set.courseType,
            classLevel: set.classLevel,
            subject:    set.subject,
            chapterId:  chapter.chapterId,
            order:      chapter.order,
            title:      chapter.title,
            objective:  chapter.objective,
            durationLabel: chapter.durationLabel,
            theoryPoints:  chapter.theoryPoints,
            keyFormulas:   chapter.keyFormulas,
            keyPoints:     chapter.keyPoints,
            hasSimulation: chapter.hasSimulation,
            simulationDescription: chapter.simulationDescription ?? "",
            sampleQuestions: chapter.sampleQuestions,
            prevChapterId: chapter.prevChapterId ?? null,
            nextChapterId: chapter.nextChapterId ?? null,
            isPublished: true,
          },
        },
        { upsert: true, new: true }
      );
      upserted += 1;
      console.log(`  ✓ ${set.classLevel}/${set.subject}/${chapter.chapterId} — ${chapter.title}`);
    }
  }

  console.log(`\nDone. Upserted ${upserted} chapter document(s).`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
