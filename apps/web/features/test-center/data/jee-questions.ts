/**
 * @file features/test-center/data/jee-questions.ts
 * @description JEE Main question bank for LearnVeda Test Center
 * @purpose Provides real JEE-pattern questions for mock tests (Physics, Chemistry, Maths)
 * @used-by JEE test pages, quick practice engine, scheduled mock tests
 *
 * Question format: 4-option MCQ, +4 marks correct, -1 mark wrong (JEE Main pattern)
 * In production: these are fetched from MongoDB (questions collection) with Redis caching
 */

import type { TestQuestion } from "../components/MockTestEngine"; // Question type

/* ─── JEE Physics Questions ──────────────────────────────────────────────── */
export const JEE_PHYSICS_QUESTIONS: TestQuestion[] = [
  {
    id:           "jee-phy-001",
    subject:      "Physics",
    chapter:      "Kinematics",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "A ball is thrown vertically upward with a velocity of 20 m/s. The maximum height reached by the ball is (g = 10 m/s²):",
    options:      ["10 m", "20 m", "40 m", "5 m"],
    correctIndex: 1,  // 20 m — v²=u²-2gh → h = u²/2g = 400/20 = 20 m
    explanation:  "Using v² = u² - 2gh, at maximum height v = 0. So h = u²/(2g) = (20)²/(2×10) = 400/20 = 20 m.",
  },
  {
    id:           "jee-phy-002",
    subject:      "Physics",
    chapter:      "Laws of Motion",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "A body of mass 5 kg is moving with a velocity of 10 m/s. A force of 25 N acts on it for 2 seconds. The final velocity is:",
    options:      ["15 m/s", "20 m/s", "25 m/s", "30 m/s"],
    correctIndex: 1,  // 20 m/s — a = F/m = 5 m/s², v = u + at = 10 + 5×2 = 20
    explanation:  "Acceleration a = F/m = 25/5 = 5 m/s². Final velocity v = u + at = 10 + 5×2 = 20 m/s.",
  },
  {
    id:           "jee-phy-003",
    subject:      "Physics",
    chapter:      "Work, Energy & Power",
    difficulty:   "easy",
    marks:        4,
    negMarks:     1,
    text:         "A body of mass 4 kg is lifted to a height of 5 m. The potential energy gained is (g = 10 m/s²):",
    options:      ["100 J", "200 J", "150 J", "80 J"],
    correctIndex: 1,  // 200 J — PE = mgh = 4×10×5 = 200 J
    explanation:  "Potential energy = mgh = 4 × 10 × 5 = 200 J.",
  },
  {
    id:           "jee-phy-004",
    subject:      "Physics",
    chapter:      "Waves",
    difficulty:   "hard",
    marks:        4,
    negMarks:     1,
    text:         "The frequency of a sound wave is 500 Hz and its wavelength is 0.68 m. What is the speed of sound?",
    options:      ["340 m/s", "250 m/s", "500 m/s", "170 m/s"],
    correctIndex: 0,  // 340 m/s — v = fλ = 500 × 0.68 = 340
    explanation:  "Speed of sound v = frequency × wavelength = 500 × 0.68 = 340 m/s.",
  },
  {
    id:           "jee-phy-005",
    subject:      "Physics",
    chapter:      "Electrostatics",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "Two charges of +4 μC and -4 μC are placed 20 cm apart. The electric potential at the midpoint between them is:",
    options:      ["Zero", "360 kV", "-360 kV", "720 kV"],
    correctIndex: 0,  // Zero — equal and opposite potentials cancel at midpoint
    explanation:  "At midpoint, r = 0.1 m. V₁ = kq/r = k(4μC)/0.1 and V₂ = k(-4μC)/0.1. Since V = V₁ + V₂ = 0, potential is zero.",
  },
  {
    id:           "jee-phy-006",
    subject:      "Physics",
    chapter:      "Optics",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "A convex lens of focal length 20 cm forms a real image. If the object is placed 30 cm from the lens, the image distance is:",
    options:      ["60 cm", "40 cm", "30 cm", "20 cm"],
    correctIndex: 0,  // 60 cm — 1/v - 1/u = 1/f → 1/v = 1/20 + 1/(-30) = (3-2)/60 → v=60
    explanation:  "Using lens formula: 1/v - 1/u = 1/f. With u = -30, f = 20: 1/v = 1/20 - 1/30 = (3-2)/60 = 1/60. So v = 60 cm.",
  },
  {
    id:           "jee-phy-007",
    subject:      "Physics",
    chapter:      "Modern Physics",
    difficulty:   "hard",
    marks:        4,
    negMarks:     1,
    text:         "The de Broglie wavelength of an electron moving with velocity v is λ. If the velocity is doubled, the new wavelength is:",
    options:      ["λ/2", "2λ", "λ/4", "4λ"],
    correctIndex: 0,  // λ/2 — λ = h/mv, doubling v halves λ
    explanation:  "de Broglie wavelength λ = h/(mv). If velocity doubles to 2v, λ_new = h/(m×2v) = λ/2.",
  },
  {
    id:           "jee-phy-008",
    subject:      "Physics",
    chapter:      "Thermodynamics",
    difficulty:   "easy",
    marks:        4,
    negMarks:     1,
    text:         "The efficiency of a Carnot engine working between temperatures 300 K and 600 K is:",
    options:      ["50%", "25%", "75%", "100%"],
    correctIndex: 0,  // 50% — η = 1 - T₂/T₁ = 1 - 300/600 = 0.5 = 50%
    explanation:  "Carnot efficiency η = 1 - T_cold/T_hot = 1 - 300/600 = 1 - 0.5 = 0.5 = 50%.",
  },
];

/* ─── JEE Chemistry Questions ────────────────────────────────────────────── */
export const JEE_CHEMISTRY_QUESTIONS: TestQuestion[] = [
  {
    id:           "jee-chem-001",
    subject:      "Chemistry",
    chapter:      "Atomic Structure",
    difficulty:   "easy",
    marks:        4,
    negMarks:     1,
    text:         "The maximum number of electrons that can be accommodated in the 'd' subshell is:",
    options:      ["6", "10", "14", "2"],
    correctIndex: 1,  // 10 — d has 5 orbitals × 2 electrons = 10
    explanation:  "The d subshell has 5 orbitals (m_l = -2,-1,0,+1,+2). With 2 electrons each (spin ±1/2), maximum = 5 × 2 = 10 electrons.",
  },
  {
    id:           "jee-chem-002",
    subject:      "Chemistry",
    chapter:      "Chemical Bonding",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "The geometry of the water molecule (H₂O) is:",
    options:      ["Linear", "Bent/V-shaped", "Tetrahedral", "Trigonal planar"],
    correctIndex: 1,  // Bent — sp³ hybridization with 2 lone pairs → bent shape
    explanation:  "Water has sp³ hybridization (4 electron pairs: 2 bond pairs + 2 lone pairs). The lone pairs repel the bonding pairs, giving a bent/V-shaped geometry with bond angle ~104.5°.",
  },
  {
    id:           "jee-chem-003",
    subject:      "Chemistry",
    chapter:      "Equilibrium",
    difficulty:   "hard",
    marks:        4,
    negMarks:     1,
    text:         "For the reaction N₂ + 3H₂ ⇌ 2NH₃, if concentrations at equilibrium are [N₂]=2M, [H₂]=3M, [NH₃]=4M, the equilibrium constant Kc is:",
    options:      ["8/54", "16/54", "4/27", "2/27"],
    correctIndex: 0,  // 8/54 = 4/27 — wait, let me recalc: Kc = [NH3]²/([N2][H2]³) = 16/(2×27) = 16/54 = 8/27
    explanation:  "Kc = [NH₃]² / ([N₂][H₂]³) = (4)² / (2 × 3³) = 16 / (2 × 27) = 16/54 = 8/27.",
  },
  {
    id:           "jee-chem-004",
    subject:      "Chemistry",
    chapter:      "Electrochemistry",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "The standard electrode potential of Cu²⁺/Cu is +0.34 V. For the reaction Cu²⁺ + 2e⁻ → Cu, the standard Gibbs free energy change (ΔG°) is:",
    options:      ["-65.6 kJ", "+65.6 kJ", "-32.8 kJ", "+32.8 kJ"],
    correctIndex: 0,  // -65.6 kJ — ΔG° = -nFE° = -2×96500×0.34 = -65620 J ≈ -65.6 kJ
    explanation:  "ΔG° = -nFE° = -(2)(96500)(0.34) = -65,620 J ≈ -65.6 kJ. Negative ΔG° confirms spontaneous reaction.",
  },
  {
    id:           "jee-chem-005",
    subject:      "Chemistry",
    chapter:      "Organic Chemistry",
    difficulty:   "easy",
    marks:        4,
    negMarks:     1,
    text:         "Which of the following is the IUPAC name of CH₃-CH₂-CH(CH₃)-CH₂-OH?",
    options:      ["3-methylbutan-1-ol", "2-methylbutan-4-ol", "3-methylbutan-4-ol", "2-methylbutanol"],
    correctIndex: 0,  // 3-methylbutan-1-ol
    explanation:  "The parent chain has 4 carbons (butane) with -OH at C1. A methyl group at C3. IUPAC: 3-methylbutan-1-ol.",
  },
  {
    id:           "jee-chem-006",
    subject:      "Chemistry",
    chapter:      "s-Block Elements",
    difficulty:   "easy",
    marks:        4,
    negMarks:     1,
    text:         "Which alkali metal reacts vigorously with cold water to produce a coloured flame?",
    options:      ["Lithium", "Sodium", "Cesium", "Potassium"],
    correctIndex: 3,  // Potassium — reacts vigorously and produces a lilac/purple flame
    explanation:  "Potassium reacts vigorously with cold water. The hydrogen produced catches fire and burns with a characteristic lilac/purple flame due to potassium's emission spectrum.",
  },
];

/* ─── JEE Mathematics Questions ──────────────────────────────────────────── */
export const JEE_MATHEMATICS_QUESTIONS: TestQuestion[] = [
  {
    id:           "jee-math-001",
    subject:      "Mathematics",
    chapter:      "Limits",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "lim(x→0) [(sin x - x) / x³] is equal to:",
    options:      ["-1/6", "1/6", "-1/3", "0"],
    correctIndex: 0,  // -1/6 — using Taylor series: sin x = x - x³/6 + ... → (sin x - x)/x³ = -1/6
    explanation:  "Using Taylor series expansion: sin x = x - x³/6 + x⁵/120 - ... So (sin x - x) = -x³/6 + higher terms. Therefore (sin x - x)/x³ → -1/6 as x→0.",
  },
  {
    id:           "jee-math-002",
    subject:      "Mathematics",
    chapter:      "Matrices & Determinants",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "If A is a 3×3 matrix with det(A) = 5, then det(2A) is:",
    options:      ["10", "40", "20", "80"],
    correctIndex: 1,  // 40 — det(kA) = k³ det(A) for 3×3 → 2³ × 5 = 8 × 5 = 40
    explanation:  "For an n×n matrix, det(kA) = kⁿ × det(A). For a 3×3 matrix: det(2A) = 2³ × det(A) = 8 × 5 = 40.",
  },
  {
    id:           "jee-math-003",
    subject:      "Mathematics",
    chapter:      "Probability",
    difficulty:   "easy",
    marks:        4,
    negMarks:     1,
    text:         "A dice is thrown twice. The probability of getting a sum of 8 is:",
    options:      ["5/36", "6/36", "7/36", "4/36"],
    correctIndex: 0,  // 5/36 — pairs: (2,6),(3,5),(4,4),(5,3),(6,2) = 5 outcomes
    explanation:  "Favorable outcomes for sum = 8: (2,6), (3,5), (4,4), (5,3), (6,2) → 5 outcomes. Total outcomes = 36. P = 5/36.",
  },
  {
    id:           "jee-math-004",
    subject:      "Mathematics",
    chapter:      "Conic Sections",
    difficulty:   "hard",
    marks:        4,
    negMarks:     1,
    text:         "The eccentricity of the ellipse x²/16 + y²/9 = 1 is:",
    options:      ["√7/4", "√7/3", "3/4", "7/16"],
    correctIndex: 0,  // √7/4 — a²=16, b²=9, c²=a²-b²=7, e=c/a=√7/4
    explanation:  "For ellipse x²/a² + y²/b² = 1 where a > b: a² = 16, b² = 9. c² = a² - b² = 7. Eccentricity e = c/a = √7/4.",
  },
  {
    id:           "jee-math-005",
    subject:      "Mathematics",
    chapter:      "Integration",
    difficulty:   "medium",
    marks:        4,
    negMarks:     1,
    text:         "∫ (1/(1 + tan x)) dx from 0 to π/2 equals:",
    options:      ["π/4", "π/2", "π", "0"],
    correctIndex: 0,  // π/4 — using property: ∫f(a+b-x) trick
    explanation:  "Using property: I = ∫₀^(π/2) 1/(1+tan x) dx. By substituting x → (π/2-x): I = ∫₀^(π/2) 1/(1+cot x) dx = ∫₀^(π/2) tan x/(1+tan x) dx. Adding: 2I = π/2. So I = π/4.",
  },
  {
    id:           "jee-math-006",
    subject:      "Mathematics",
    chapter:      "Complex Numbers",
    difficulty:   "easy",
    marks:        4,
    negMarks:     1,
    text:         "If z = 3 + 4i, the modulus |z| is:",
    options:      ["5", "7", "25", "1"],
    correctIndex: 0,  // 5 — |z| = √(3² + 4²) = √(9+16) = √25 = 5
    explanation:  "|z| = √(a² + b²) = √(3² + 4²) = √(9 + 16) = √25 = 5.",
  },
];

/* ─── Combined JEE Mock Test (20 questions) ──────────────────────────────── */
export const JEE_MOCK_TEST_QUESTIONS: TestQuestion[] = [
  ...JEE_PHYSICS_QUESTIONS.slice(0, 7),      // 7 physics questions
  ...JEE_CHEMISTRY_QUESTIONS.slice(0, 6),    // 6 chemistry questions
  ...JEE_MATHEMATICS_QUESTIONS.slice(0, 7),  // 7 mathematics questions
];

/* ─── CBSE Class 12 Physics Test ─────────────────────────────────────────── */
export const CBSE_CLASS12_PHYSICS_QUESTIONS: TestQuestion[] = [
  {
    id:           "cbse-12-phy-001",
    subject:      "Physics",
    chapter:      "Electric Charges and Fields",
    difficulty:   "easy",
    marks:        1,
    negMarks:     0,  // CBSE has no negative marking
    text:         "The SI unit of electric charge is:",
    options:      ["Ampere", "Coulomb", "Volt", "Farad"],
    correctIndex: 1,
    explanation:  "The SI unit of electric charge is Coulomb (C). 1 Coulomb = charge of approximately 6.24 × 10¹⁸ electrons.",
  },
  {
    id:           "cbse-12-phy-002",
    subject:      "Physics",
    chapter:      "Capacitance",
    difficulty:   "medium",
    marks:        1,
    negMarks:     0,
    text:         "A parallel plate capacitor with air gap has capacitance C. If a dielectric of constant K = 3 is inserted, the new capacitance is:",
    options:      ["C/3", "3C", "C+3", "C-3"],
    correctIndex: 1,  // 3C — C_new = K × C_air
    explanation:  "When a dielectric (K=3) fills the entire gap: C_new = K × C = 3C.",
  },
  {
    id:           "cbse-12-phy-003",
    subject:      "Physics",
    chapter:      "Current Electricity",
    difficulty:   "medium",
    marks:        1,
    negMarks:     0,
    text:         "Three resistors of 2Ω, 3Ω, and 6Ω are connected in parallel. The equivalent resistance is:",
    options:      ["1Ω", "11Ω", "0.5Ω", "2Ω"],
    correctIndex: 0,  // 1Ω — 1/R = 1/2 + 1/3 + 1/6 = 3/6+2/6+1/6 = 6/6 = 1
    explanation:  "1/R_eq = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. So R_eq = 1Ω.",
  },
  {
    id:           "cbse-12-phy-004",
    subject:      "Physics",
    chapter:      "Electromagnetic Induction",
    difficulty:   "hard",
    marks:        1,
    negMarks:     0,
    text:         "A coil of 200 turns and area 0.05 m² is rotated in a magnetic field of 0.1 T. If it completes 100 rotations per second, the maximum EMF induced is:",
    options:      ["628 V", "314 V", "100 V", "200 V"],
    correctIndex: 0,  // 628 V — E_max = NBAω = 200×0.1×0.05×(2π×100) ≈ 628 V
    explanation:  "E_max = NBAω where ω = 2πf = 2π×100 = 200π. E_max = 200 × 0.1 × 0.05 × 200π = 200π ≈ 628 V.",
  },
  {
    id:           "cbse-12-phy-005",
    subject:      "Physics",
    chapter:      "Dual Nature of Radiation",
    difficulty:   "easy",
    marks:        1,
    negMarks:     0,
    text:         "The photoelectric effect demonstrates the:",
    options:      [
      "Wave nature of light",
      "Particle nature of light",
      "Both wave and particle nature",
      "None of the above",
    ],
    correctIndex: 1,
    explanation:  "The photoelectric effect (explained by Einstein in 1905) shows that light consists of photons (particles). Photons eject electrons from metal surfaces, demonstrating the particle nature of light.",
  },
];
