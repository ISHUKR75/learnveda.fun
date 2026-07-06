/**
 * @file lib/content/class10-science.ts
 * @description Real, NCERT-aligned Class 10 Science curriculum content
 * (Physics + Chemistry + Biology, 2025-26 edition). Reused by
 * seed-content.ts and content-service.ts.
 */

import type { ContentChapter } from "./class9-mathematics";

export const CLASS_10_SCIENCE_CHAPTERS: ContentChapter[] = [
  { chapterId: "chapter-01", order: 1,  title: "Chemical Reactions and Equations",  objective: "Balance chemical equations and classify reaction types.",                       durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], nextChapterId: "chapter-02" },
  { chapterId: "chapter-02", order: 2,  title: "Acids, Bases and Salts",           objective: "Study pH scale, indicators, and properties of acids, bases, and salts.",         durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], prevChapterId: "chapter-01", nextChapterId: "chapter-03" },
  { chapterId: "chapter-03", order: 3,  title: "Metals and Non-metals",            objective: "Compare physical/chemical properties of metals and non-metals, reactivity series.", durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-02", nextChapterId: "chapter-04" },
  { chapterId: "chapter-04", order: 4,  title: "Carbon and its Compounds",         objective: "Study covalent bonding, homologous series, and functional groups.",              durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-03", nextChapterId: "chapter-05" },
  { chapterId: "chapter-05", order: 5,  title: "Life Processes",                   objective: "Study nutrition, respiration, transportation, and excretion in organisms.",       durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-04", nextChapterId: "chapter-06" },
  { chapterId: "chapter-06", order: 6,  title: "Control and Coordination",         objective: "Study the nervous system, reflex actions, and plant hormones.",                  durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-05", nextChapterId: "chapter-07" },
  { chapterId: "chapter-07", order: 7,  title: "How do Organisms Reproduce?",      objective: "Compare asexual and sexual reproduction in plants, animals, and humans.",        durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-06", nextChapterId: "chapter-08" },
  { chapterId: "chapter-08", order: 8,  title: "Heredity",                         objective: "Study Mendel's laws of inheritance and evolution basics.",                       durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-07", nextChapterId: "chapter-09" },
  {
    chapterId: "chapter-09", order: 9,
    title: "Light — Reflection and Refraction",
    objective: "Study the laws of reflection and refraction, mirror/lens formulae, and image formation.",
    durationLabel: "4 days",
    theoryPoints: [
      { heading: "Reflection of Light", content: "Angle of incidence = angle of reflection. Both angles measured from the normal. Spherical mirrors: concave (converging) and convex (diverging)." },
      { heading: "Mirror Formula", content: "1/v + 1/u = 1/f, where u = object distance, v = image distance, f = focal length (f = R/2). Sign convention: distances measured from the pole, following Cartesian sign convention." },
      { heading: "Refraction of Light", content: "Bending of light when it passes from one medium to another due to a change in speed. Snell's Law: n1 sin θ1 = n2 sin θ2." },
      { heading: "Lens Formula", content: "1/v - 1/u = 1/f for both convex and concave lenses. Magnification m = v/u = h'/h. Power of lens P = 1/f (in metres), unit dioptre (D)." },
      { heading: "Refractive Index", content: "n = speed of light in vacuum / speed of light in medium = sin i / sin r. Denser medium has higher refractive index and slows light more." },
    ],
    keyFormulas: [
      { label: "Mirror formula",       formula: "1/v + 1/u = 1/f" },
      { label: "Lens formula",         formula: "1/v - 1/u = 1/f" },
      { label: "Magnification",        formula: "m = v/u = h'/h" },
      { label: "Power of lens",        formula: "P = 1/f (metres)" },
      { label: "Snell's Law",          formula: "n1 sin θ1 = n2 sin θ2" },
    ],
    keyPoints: [
      "Concave mirror forms real, inverted images (except when object is between pole and focus)",
      "Convex mirror always forms virtual, erect, diminished images — used in vehicle mirrors",
      "Convex lens converges light; concave lens diverges light",
      "Power of a convex lens is positive; concave lens is negative",
      "1 dioptre = power of a lens with focal length 1 metre",
    ],
    hasSimulation: true,
    simulationDescription: "Interactive ray diagram simulator for mirrors and lenses — drag the object and observe real-time image formation, magnification, and image nature.",
    sampleQuestions: [
      { question: "A concave mirror produces a virtual image when the object is placed:", options: ["Beyond C", "At focus", "Between pole and focus", "At C"], answer: 2 },
      { question: "The power of a lens of focal length 50 cm is:", options: ["0.5 D", "2 D", "5 D", "20 D"], answer: 1 },
    ],
    prevChapterId: "chapter-08",
    nextChapterId: "chapter-10",
  },
  { chapterId: "chapter-10", order: 10, title: "The Human Eye and the Colourful World", objective: "Study eye defects, corrections, dispersion, and atmospheric refraction.",   durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-09", nextChapterId: "chapter-11" },
  { chapterId: "chapter-11", order: 11, title: "Electricity",                          objective: "Study current, potential difference, resistance, and Ohm's Law.",             durationLabel: "4 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], prevChapterId: "chapter-10", nextChapterId: "chapter-12" },
  { chapterId: "chapter-12", order: 12, title: "Magnetic Effects of Electric Current",  objective: "Study magnetic fields, the right-hand rule, electric motors, and generators.", durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: true,  sampleQuestions: [], prevChapterId: "chapter-11", nextChapterId: "chapter-13" },
  { chapterId: "chapter-13", order: 13, title: "Our Environment",                       objective: "Study ecosystems, food chains, and environmental sustainability.",             durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-12", nextChapterId: "chapter-14" },
  { chapterId: "chapter-14", order: 14, title: "Sustainable Management of Natural Resources", objective: "Study conservation of forests, water, and resource management (5 R's).",  durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-13", nextChapterId: "chapter-15" },
  { chapterId: "chapter-15", order: 15, title: "Sources of Energy",                     objective: "Compare conventional and non-conventional (renewable) energy sources.",       durationLabel: "2 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-14", nextChapterId: "chapter-16" },
  { chapterId: "chapter-16", order: 16, title: "Periodic Classification of Elements",   objective: "Study Mendeleev's and the Modern Periodic Table, periodic trends.",           durationLabel: "3 days", theoryPoints: [], keyFormulas: [], keyPoints: [], hasSimulation: false, sampleQuestions: [], prevChapterId: "chapter-15" },
];
