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
import { CLASS_9_SCIENCE_CHAPTERS } from "../../apps/web/lib/content/class9-science";
import { CLASS_9_SOCIAL_SCIENCE_CHAPTERS } from "../../apps/web/lib/content/class9-social-science";
import { CLASS_9_ENGLISH_CHAPTERS } from "../../apps/web/lib/content/class9-english";
import { CLASS_9_HINDI_CHAPTERS } from "../../apps/web/lib/content/class9-hindi";
import { CLASS_10_MATHEMATICS_CHAPTERS } from "../../apps/web/lib/content/class10-mathematics";
import { CLASS_10_SCIENCE_CHAPTERS } from "../../apps/web/lib/content/class10-science";
import { CLASS_10_PHYSICS_CHAPTERS } from "../../apps/web/lib/content/class10-physics";
import { CLASS_10_CHEMISTRY_CHAPTERS } from "../../apps/web/lib/content/class10-chemistry";
import { CLASS_10_BIOLOGY_CHAPTERS } from "../../apps/web/lib/content/class10-biology";
import { CLASS_10_SOCIAL_SCIENCE_CHAPTERS } from "../../apps/web/lib/content/class10-social-science";
import { CLASS_10_ENGLISH_CHAPTERS } from "../../apps/web/lib/content/class10-english";
import { CLASS_10_HINDI_CHAPTERS } from "../../apps/web/lib/content/class10-hindi";
import { CLASS_10_COMPUTER_SCIENCE_CHAPTERS } from "../../apps/web/lib/content/class10-computer-science";
import { CLASS_10_SANSKRIT_CHAPTERS } from "../../apps/web/lib/content/class10-sanskrit";

/* ─── Seed Registry ──────────────────────────────────────────────────────── */
// Each entry describes which static content array maps to which
// (courseType, classLevel, subject) triple in the database.
const SEED_SETS: {
  courseType: "class" | "programming" | "engineering" | "core-cs";
  classLevel: string;
  subject:    string;
  chapters:   typeof CLASS_9_MATHEMATICS_CHAPTERS;
}[] = [
  { courseType: "class", classLevel: "class-9",  subject: "mathematics",       chapters: CLASS_9_MATHEMATICS_CHAPTERS },
  { courseType: "class", classLevel: "class-9",  subject: "science",           chapters: CLASS_9_SCIENCE_CHAPTERS },
  { courseType: "class", classLevel: "class-9",  subject: "social-science",    chapters: CLASS_9_SOCIAL_SCIENCE_CHAPTERS },
  { courseType: "class", classLevel: "class-9",  subject: "english",           chapters: CLASS_9_ENGLISH_CHAPTERS },
  { courseType: "class", classLevel: "class-9",  subject: "hindi",             chapters: CLASS_9_HINDI_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "mathematics",       chapters: CLASS_10_MATHEMATICS_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "science",           chapters: CLASS_10_SCIENCE_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "physics",           chapters: CLASS_10_PHYSICS_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "chemistry",         chapters: CLASS_10_CHEMISTRY_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "biology",           chapters: CLASS_10_BIOLOGY_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "social-science",    chapters: CLASS_10_SOCIAL_SCIENCE_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "english",           chapters: CLASS_10_ENGLISH_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "hindi",             chapters: CLASS_10_HINDI_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "computer-science",  chapters: CLASS_10_COMPUTER_SCIENCE_CHAPTERS },
  { courseType: "class", classLevel: "class-10", subject: "sanskrit",          chapters: CLASS_10_SANSKRIT_CHAPTERS },
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
