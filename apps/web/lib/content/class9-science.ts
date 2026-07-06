/**
 * @file lib/content/class9-science.ts
 * @description Single source of truth for real, NCERT-aligned Class 9 Science
 * curriculum content (Physics + Chemistry + Biology, 2025-26 edition).
 *
 * Reused by `scripts/seed/seed-content.ts` (writes into MongoDB) and by
 * `lib/services/content-service.ts` (demo-mode fallback when DB is offline).
 */

import type { ContentChapter } from "./class9-mathematics";

/* ─── Class 9 Science — Full Chapter List (NCERT 2025-26) ───────────────── */
// Chapter 7 (Motion) carries full theory content. The remaining chapters
// carry real NCERT titles/topics/duration/simulation flags for the subject
// overview list; deep-dive theory for them is queued for the next
// content-authoring phase (tracked in work_progress.md Phase 3).
export const CLASS_9_SCIENCE_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1,  title: "Matter in Our Surroundings",    objective: "Understand states of matter, evaporation, and latent heat.",                  durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2,  title: "Is Matter Around Us Pure?",     objective: "Differentiate mixtures, solutions, and separation techniques.",               durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3,  title: "Atoms and Molecules",           objective: "Learn the laws of chemical combination and the mole concept.",               durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4,  title: "Structure of the Atom",         objective: "Study Thomson and Bohr atomic models, electrons, protons, and shells.",       durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5,  title: "The Fundamental Unit of Life",  objective: "Explore cell theory, plant vs animal cells, and organelles.",                 durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6,  title: "Tissues",                       objective: "Classify plant and animal tissues and their functions.",                     durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  {
    chapterId: "chapter-07", order: 7,
    title: "Motion",
    objective: "Understand distance, displacement, speed, velocity, acceleration, and interpret motion graphs.",
    durationLabel: "4 days",
    theoryPoints: [
      { heading: "Distance and Displacement", content: "Distance is the total path length covered. Displacement is the shortest straight-line distance from start to end point, with direction. Distance is a scalar; displacement is a vector." },
      { heading: "Speed and Velocity", content: "Speed = Distance / Time (scalar). Velocity = Displacement / Time (vector). Average speed may differ from average velocity if the path is not straight. SI unit: m/s." },
      { heading: "Acceleration", content: "Acceleration = Change in velocity / Time = (v - u) / t. It is a vector. Positive acceleration means speeding up in the direction of motion; negative (deceleration/retardation) means slowing down. SI unit: m/s²." },
      { heading: "Equations of Uniformly Accelerated Motion", content: "Three kinematic equations for constant acceleration: v = u + at, s = ut + ½at², v² = u² + 2as. Here u = initial velocity, v = final velocity, a = acceleration, s = displacement, t = time." },
      { heading: "Graphical Representation", content: "Distance-Time (d-t) graph: slope = speed. Velocity-Time (v-t) graph: slope = acceleration, area under curve = displacement. Uniform motion → straight line on d-t. Uniformly accelerated → straight line on v-t (parabola on d-t)." },
    ],
    keyFormulas: [
      { label: "First equation",   formula: "v = u + at" },
      { label: "Second equation",  formula: "s = ut + ½at²" },
      { label: "Third equation",   formula: "v² = u² + 2as" },
      { label: "Average velocity", formula: "(u + v) / 2" },
      { label: "Acceleration",     formula: "a = (v - u) / t" },
    ],
    keyPoints: [
      "Displacement can be zero even when distance is not (circular motion)",
      "Slope of v-t graph = acceleration",
      "Area under v-t graph = displacement",
      "Uniform circular motion has constant speed but changing velocity (direction changes)",
      "For free fall under gravity: a = g ≈ 9.8 m/s² downward",
    ],
    hasSimulation: true,
    simulationDescription: "Interactive motion simulation — set initial velocity and acceleration, observe position-time and velocity-time graphs in real time. Visualize uniform and non-uniform motion.",
    sampleQuestions: [
      { question: "A car moves 60 km in 1 hour then 40 km in next hour. Its average speed is:", options: ["40 km/h", "50 km/h", "60 km/h", "100 km/h"], answer: 1 },
      { question: "Slope of a distance-time graph gives:", options: ["Acceleration", "Speed", "Displacement", "Force"], answer: 1 },
    ],
    prevChapterId: "chapter-06",
    nextChapterId: "chapter-08",
  },
  { chapterId: "chapter-08", order: 8,  title: "Force and Laws of Motion",         objective: "Study Newton's three laws of motion and conservation of momentum.",         durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true, sampleQuestions: [], prevChapterId: "chapter-07", nextChapterId: "chapter-09" },
  { chapterId: "chapter-09", order: 9,  title: "Gravitation",                      objective: "Learn the universal law of gravitation, weight, and Archimedes' Principle.", durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true, sampleQuestions: [], prevChapterId: "chapter-08", nextChapterId: "chapter-10" },
  { chapterId: "chapter-10", order: 10, title: "Work and Energy",                  objective: "Understand work, kinetic energy, potential energy, and power.",              durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true, sampleQuestions: [], prevChapterId: "chapter-09", nextChapterId: "chapter-11" },
  { chapterId: "chapter-11", order: 11, title: "Sound",                            objective: "Study wave properties, reflection, echo, and SONAR.",                        durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true, sampleQuestions: [], prevChapterId: "chapter-10", nextChapterId: "chapter-12" },
  { chapterId: "chapter-12", order: 12, title: "Improvement in Food Resources",    objective: "Learn about crop production, manure, and animal husbandry.",                 durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-11" },
];
