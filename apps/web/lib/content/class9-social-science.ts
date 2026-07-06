/**
 * @file lib/content/class9-social-science.ts
 * @description Real, NCERT-aligned Class 9 Social Science curriculum content
 * (History, Geography, Civics, Economics — 2025-26 edition).
 *
 * Reused by `scripts/seed/seed-content.ts` (writes into MongoDB) and by
 * `lib/services/content-service.ts` (demo-mode fallback when DB is offline).
 */

import type { ContentChapter } from "./class9-mathematics";

/* ─── Class 9 Social Science — Full Chapter List (NCERT 2025-26) ────────── */
// Real NCERT titles/topics/durations for the subject overview list;
// deep-dive theory content is queued for the next content-authoring phase.
export const CLASS_9_SOCIAL_SCIENCE_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1,  title: "The French Revolution",              objective: "Study the causes, key events, and lasting impact of the French Revolution.",   durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2,  title: "Socialism in Europe and the Russian Revolution", objective: "Understand capitalism, Marxism, and the Russian Revolution.",         durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3,  title: "Nazism and the Rise of Hitler",       objective: "Study the Weimar Republic, Hitler's rise, and the Holocaust.",                durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4,  title: "Forest Society and Colonialism",      objective: "Learn about forest acts, shifting cultivation, and peasant movements.",       durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5,  title: "Pastoralists in the Modern World",    objective: "Study nomadic communities and the colonial impact on pastoralism.",           durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6,  title: "India — Size and Location",           objective: "Understand India's latitudinal/longitudinal extent and standard meridian.",   durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7,  title: "Physical Features of India",          objective: "Study the Himalayas, Indo-Gangetic Plain, and the Peninsular Plateau.",        durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8,  title: "Drainage",                            objective: "Learn about Himalayan and Peninsular river systems of India.",                durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07", nextChapterId: "chapter-09" },
  { chapterId: "chapter-09", order: 9,  title: "Climate",                             objective: "Understand India's monsoon system, temperature, seasons, and rainfall.",      durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-08", nextChapterId: "chapter-10" },
  { chapterId: "chapter-10", order: 10, title: "Natural Vegetation and Wildlife",     objective: "Study India's biomes, forests, grasslands, and wildlife.",                    durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-09" },
];
