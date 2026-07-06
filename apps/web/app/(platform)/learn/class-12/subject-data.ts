/**
 * @file app/(platform)/learn/class-12/subject-data.ts
 * @description Shared Class 12 subject + chapter data used by both the
 * `[subject]/page.tsx` (chapter list) and `[subject]/[chapter]/page.tsx`
 * (chapter detail) routes. Chapter titles and topics reflect the real
 * NCERT/CBSE Class 12 syllabus (2025-26 edition, board-exam aligned).
 */

export interface Class12Chapter {
  id: string;
  title: string;
  topics: string[];
  duration: string;
  hasSimulation?: boolean;
  hasQuiz: boolean;
}

export interface Class12Subject {
  name: string;
  description: string;
  totalChapters: number;
  duration: string;
  hasSimulation: boolean;
  isBoard: boolean;
  color: string;
  chapters: Class12Chapter[];
}

export const CLASS_12_SUBJECT_DATA: Record<string, Class12Subject> = {
  physics: {
    name: "Physics", description: "NCERT Class 12 Physics — Electrostatics to Semiconductors. Board exam + JEE/NEET aligned.",
    totalChapters: 15, duration: "60 days", hasSimulation: true, isBoard: true, color: "blue",
    chapters: [
      { id:"chapter-01", title:"Electric Charges and Fields",         topics:["Coulomb's Law","Electric Field","Gauss's Law"],        duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-02", title:"Electrostatic Potential and Capacitance", topics:["Potential Energy","Capacitors","Dielectrics"],     duration:"4 days", hasQuiz:true },
      { id:"chapter-03", title:"Current Electricity",                topics:["Ohm's Law","Resistivity","Kirchhoff's Laws"],          duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-04", title:"Moving Charges and Magnetism",        topics:["Biot-Savart Law","Ampere's Law","Force on Charge"],    duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Magnetism and Matter",                topics:["Bar Magnet","Earth's Magnetism"],                      duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"Electromagnetic Induction",           topics:["Faraday's Law","Lenz's Law","Eddy Currents"],          duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-07", title:"Alternating Current",                 topics:["AC Circuits","Resonance","Transformers"],              duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Electromagnetic Waves",               topics:["Displacement Current","EM Spectrum"],                  duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Ray Optics and Optical Instruments",  topics:["Reflection","Refraction","Lenses","Instruments"],      duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-10", title:"Wave Optics",                         topics:["Interference","Diffraction","Polarisation"],           duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"Dual Nature of Radiation and Matter", topics:["Photoelectric Effect","de Broglie Waves"],              duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Atoms",                               topics:["Bohr Model","Hydrogen Spectrum"],                      duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"Nuclei",                              topics:["Radioactivity","Nuclear Fission and Fusion"],          duration:"3 days", hasQuiz:true },
      { id:"chapter-14", title:"Semiconductor Electronics",           topics:["p-n Junction","Diodes","Transistors"],                 duration:"4 days", hasQuiz:true },
      { id:"chapter-15", title:"Communication Systems",               topics:["Modulation","Bandwidth"],                              duration:"2 days", hasQuiz:true },
    ],
  },
  chemistry: {
    name: "Chemistry", description: "NCERT Class 12 Chemistry — Solutions to Biomolecules. Board exam + JEE/NEET aligned.",
    totalChapters: 16, duration: "60 days", hasSimulation: false, isBoard: true, color: "green",
    chapters: [
      { id:"chapter-01", title:"Solutions",                          topics:["Concentration","Colligative Properties","Raoult's Law"], duration:"4 days", hasQuiz:true },
      { id:"chapter-02", title:"Electrochemistry",                   topics:["Electrochemical Cells","Nernst Equation","Kohlrausch's Law"], duration:"4 days", hasQuiz:true },
      { id:"chapter-03", title:"Chemical Kinetics",                  topics:["Rate of Reaction","Order","Arrhenius Equation"],        duration:"4 days", hasQuiz:true },
      { id:"chapter-04", title:"The d and f Block Elements",         topics:["Transition Elements","Lanthanoids","Actinoids"],         duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"Coordination Compounds",             topics:["Werner's Theory","Nomenclature","Isomerism"],            duration:"4 days", hasQuiz:true },
      { id:"chapter-06", title:"Haloalkanes and Haloarenes",         topics:["Nomenclature","Nucleophilic Substitution"],              duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Alcohols, Phenols and Ethers",       topics:["Preparation","Properties","Reactions"],                  duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Aldehydes, Ketones and Carboxylic Acids", topics:["Nomenclature","Reactions"],                        duration:"4 days", hasQuiz:true },
      { id:"chapter-09", title:"Amines",                             topics:["Classification","Preparation","Basicity"],               duration:"3 days", hasQuiz:true },
      { id:"chapter-10", title:"Biomolecules",                       topics:["Carbohydrates","Proteins","Nucleic Acids"],              duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"The Solid State",                    topics:["Crystal Lattices","Unit Cells","Packing"],               duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Surface Chemistry",                  topics:["Adsorption","Catalysis","Colloids"],                     duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"General Principles of Isolation of Elements", topics:["Metallurgy","Extraction Methods"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-14", title:"The p-Block Elements (Class 12)",    topics:["Group 15-18 Elements"],                                  duration:"3 days", hasQuiz:true },
      { id:"chapter-15", title:"Polymers",                           topics:["Classification","Types of Polymerisation"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-16", title:"Chemistry in Everyday Life",         topics:["Drugs","Food Chemistry","Cleansing Agents"],             duration:"2 days", hasQuiz:true },
    ],
  },
  mathematics: {
    name: "Mathematics", description: "NCERT Class 12 Mathematics — Relations & Functions to Probability. Full Calculus and board exam focus.",
    totalChapters: 13, duration: "55 days", hasSimulation: false, isBoard: true, color: "purple",
    chapters: [
      { id:"chapter-01", title:"Relations and Functions",             topics:["Types of Relations","Types of Functions"],            duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Inverse Trigonometric Functions",     topics:["Domain and Range","Properties"],                       duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Matrices",                            topics:["Types","Operations","Transpose"],                      duration:"4 days", hasQuiz:true },
      { id:"chapter-04", title:"Determinants",                        topics:["Properties","Adjoint","Inverse","Cramer's Rule"],      duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Continuity and Differentiability",    topics:["Continuity","Chain Rule","Implicit Differentiation"],  duration:"5 days", hasQuiz:true },
      { id:"chapter-06", title:"Application of Derivatives",          topics:["Rate of Change","Maxima and Minima","Tangents"],       duration:"4 days", hasQuiz:true },
      { id:"chapter-07", title:"Integrals",                           topics:["Indefinite Integrals","Definite Integrals","Methods"], duration:"6 days", hasQuiz:true },
      { id:"chapter-08", title:"Application of Integrals",            topics:["Area Under Curves"],                                   duration:"3 days", hasQuiz:true },
      { id:"chapter-09", title:"Differential Equations",              topics:["Order and Degree","Variable Separable","Linear DE"],   duration:"4 days", hasQuiz:true },
      { id:"chapter-10", title:"Vector Algebra",                      topics:["Vectors","Dot Product","Cross Product"],               duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"Three Dimensional Geometry",          topics:["Direction Cosines","Lines and Planes"],                duration:"4 days", hasQuiz:true },
      { id:"chapter-12", title:"Linear Programming",                  topics:["Feasible Region","Optimization"],                      duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"Probability",                         topics:["Conditional Probability","Bayes' Theorem","Distributions"], duration:"4 days", hasQuiz:true },
    ],
  },
  biology: {
    name: "Biology", description: "NCERT Class 12 Biology — Reproduction to Ecology. Board exam + NEET focused with real diagrams.",
    totalChapters: 16, duration: "60 days", hasSimulation: false, isBoard: true, color: "emerald",
    chapters: [
      { id:"chapter-01", title:"Sexual Reproduction in Flowering Plants", topics:["Pollination","Fertilization","Seed Formation"],   duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Human Reproduction",                  topics:["Male/Female Reproductive System","Gametogenesis"],     duration:"4 days", hasQuiz:true },
      { id:"chapter-03", title:"Reproductive Health",                 topics:["Contraception","STDs","Infertility"],                  duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"Principles of Inheritance and Variation", topics:["Mendelian Genetics","Chromosomal Theory"],         duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Molecular Basis of Inheritance",      topics:["DNA Structure","Replication","Transcription"],         duration:"5 days", hasQuiz:true },
      { id:"chapter-06", title:"Evolution",                           topics:["Origin of Life","Natural Selection","Human Evolution"], duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Human Health and Disease",            topics:["Immunity","Common Diseases","AIDS","Cancer"],           duration:"4 days", hasQuiz:true },
      { id:"chapter-08", title:"Microbes in Human Welfare",           topics:["Fermentation","Antibiotics","Biogas"],                  duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Biotechnology: Principles and Processes", topics:["Genetic Engineering","rDNA Technology"],           duration:"4 days", hasQuiz:true },
      { id:"chapter-10", title:"Biotechnology and its Applications",  topics:["GM Crops","Gene Therapy","Biopiracy"],                  duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"Organisms and Populations",           topics:["Population Interactions","Growth Models"],              duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Ecosystem",                           topics:["Energy Flow","Ecological Pyramids","Nutrient Cycling"], duration:"3 days", hasQuiz:true },
      { id:"chapter-13", title:"Biodiversity and Conservation",       topics:["Biodiversity Patterns","Conservation Strategies"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-14", title:"Ecology and Environment (Rev.)",      topics:["Environmental Issues","Global Warming"],                duration:"2 days", hasQuiz:true },
      { id:"chapter-15", title:"Molecular Biology Techniques",        topics:["PCR","Electrophoresis"],                                duration:"2 days", hasQuiz:true },
      { id:"chapter-16", title:"Applications of Biotechnology in Agriculture", topics:["Bt Cotton","Golden Rice"],                    duration:"2 days", hasQuiz:true },
    ],
  },
  "computer-science": {
    name: "Computer Science", description: "CBSE Class 12 Computer Science — Python OOP, Data Structures, MySQL Database, and Networking.",
    totalChapters: 10, duration: "40 days", hasSimulation: false, isBoard: true, color: "indigo",
    chapters: [
      { id:"chapter-01", title:"Revision of Python Basics",  topics:["Data Types","Operators","Control Flow"],      duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"Functions in Python",         topics:["User-defined Functions","Modules","Scope"],   duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"File Handling in Python",      topics:["Text Files","Binary Files","CSV Files"],     duration:"4 days", hasQuiz:true },
      { id:"chapter-04", title:"Data Structures — Stack and Queue", topics:["Stack Implementation","Queue Implementation"], duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Data Structures — Sorting and Searching", topics:["Bubble Sort","Insertion Sort","Linear/Binary Search"], duration:"4 days", hasQuiz:true },
      { id:"chapter-06", title:"Database Concepts",           topics:["DBMS","RDBMS","Keys"],                        duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Structured Query Language (SQL)", topics:["DDL","DML","Joins","Aggregate Functions"], duration:"5 days", hasQuiz:true },
      { id:"chapter-08", title:"Interface Python with SQL",    topics:["MySQL Connector","CRUD Operations"],          duration:"3 days", hasQuiz:true },
      { id:"chapter-09", title:"Computer Networks",            topics:["Network Types","Topologies","Protocols"],     duration:"3 days", hasQuiz:true },
      { id:"chapter-10", title:"Data Communication and Society","topics":["Cyber Safety","IPR","E-waste"] as string[], duration:"2 days", hasQuiz:true },
    ],
  },
  english: {
    name: "English (Flamingo/Vistas)", description: "NCERT Class 12 English — Flamingo prose and poetry, Vistas supplementary reader.",
    totalChapters: 14, duration: "40 days", hasSimulation: false, isBoard: true, color: "orange",
    chapters: [
      { id:"chapter-01", title:"The Last Lesson (Flamingo)",              topics:["Theme","Character Study"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"Lost Spring (Flamingo)",                  topics:["Child Labour","Poverty"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"Deep Water (Flamingo)",                   topics:["Fear","Overcoming Challenges"],  duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"The Rattrap (Flamingo)",                  topics:["Transformation","Redemption"],   duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"Indigo (Flamingo)",                       topics:["Gandhi","Freedom Struggle"],     duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"Poets and Pancakes (Flamingo)",           topics:["Satire","Film Industry"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"The Interview (Flamingo)",                topics:["Media","Celebrity Culture"],     duration:"2 days", hasQuiz:true },
      { id:"chapter-08", title:"Going Places (Flamingo)",                 topics:["Dreams","Reality"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"The Third Level (Vistas)",                topics:["Escapism","Fantasy"],            duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"The Tiger King (Vistas)",                 topics:["Satire","Colonialism"],          duration:"2 days", hasQuiz:true },
      { id:"chapter-11", title:"Journey to the End of the Earth (Vistas)",topics:["Antarctica","Environment"],      duration:"2 days", hasQuiz:true },
      { id:"chapter-12", title:"Poetry — My Mother at Sixty-six & others",topics:["Poetic Devices","Themes"],       duration:"3 days", hasQuiz:true },
      { id:"chapter-13", title:"Grammar and Vocabulary",                  topics:["Determiners","Transformation"],  duration:"3 days", hasQuiz:true },
      { id:"chapter-14", title:"Writing Skills — Report and Notice",      topics:["Report Writing","Notice Writing"],duration:"3 days", hasQuiz:true },
    ],
  },
  economics: {
    name: "Economics", description: "NCERT Class 12 Economics — Macroeconomics: National Income, Money, Banking, Government Budget.",
    totalChapters: 12, duration: "40 days", hasSimulation: false, isBoard: false, color: "yellow",
    chapters: [
      { id:"chapter-01", title:"Introduction to Macroeconomics",  topics:["Circular Flow of Income"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"National Income Accounting",      topics:["GDP","GNP","NNP","Methods"],            duration:"4 days", hasQuiz:true },
      { id:"chapter-03", title:"Money and Banking",               topics:["Functions of Money","Central Bank"],    duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Determination of Income and Employment", topics:["Aggregate Demand","Multiplier"], duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Government Budget and the Economy", topics:["Budget Components","Fiscal Deficit"], duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Balance of Payments",             topics:["BoP Components","Foreign Exchange Rate"], duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Development Experience of India", topics:["Economic Reforms","Planning"],           duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Indian Economy: Sectors",         topics:["Agriculture","Industry","Services"],     duration:"4 days", hasQuiz:true },
      { id:"chapter-09", title:"Poverty",                         topics:["Poverty Line","Programmes"],             duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"Human Capital Formation in India", topics:["Education","Health"],                   duration:"2 days", hasQuiz:true },
      { id:"chapter-11", title:"Rural Development",                topics:["Credit","Marketing","Diversification"], duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Comparative Development Experiences", topics:["India","China","Pakistan"],          duration:"2 days", hasQuiz:true },
    ],
  },
  "artificial-intelligence": {
    name: "AI & Machine Learning", description: "CBSE Class 12 AI — Machine Learning models, Neural Networks, NLP, and AI Applications.",
    totalChapters: 10, duration: "35 days", hasSimulation: false, isBoard: false, color: "rose",
    chapters: [
      { id:"chapter-01", title:"Recap: AI Project Cycle",       topics:["Problem Scoping","Data Acquisition"],   duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"Advanced Statistics for AI",     topics:["Correlation","Regression Basics"],       duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Neural Networks",                topics:["Perceptron","Activation Functions"],     duration:"4 days", hasQuiz:true },
      { id:"chapter-04", title:"Machine Learning Models",        topics:["Regression","Classification","Clustering"], duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"Model Evaluation",               topics:["Accuracy","Precision","Recall","F1 Score"], duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Natural Language Processing",    topics:["Tokenization","Text Normalization"],     duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Computer Vision Applications",   topics:["Image Classification","OpenCV Basics"],  duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"AI in Industry",                 topics:["Healthcare","Finance","Agriculture"],    duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Capstone Project Guidelines",    topics:["Project Planning","Documentation"],      duration:"3 days", hasQuiz:true },
      { id:"chapter-10", title:"Advanced Ethics and Bias in AI", topics:["Fairness","Transparency","Accountability"], duration:"2 days", hasQuiz:true },
    ],
  },
  hindi: {
    name: "Hindi (Aroh/Vitan)", description: "NCERT Class 12 Hindi — Aroh prose and poetry, Vitan supplementary reader.",
    totalChapters: 18, duration: "45 days", hasSimulation: false, isBoard: true, color: "red",
    chapters: Array.from({ length: 18 }, (_, i) => ({
      id: `chapter-${String(i + 1).padStart(2, "0")}`,
      title: `Aroh/Vitan — Pathya ${i + 1}`,
      topics: ["गद्यांश विश्लेषण", "भाषा शैली", "काव्य सौंदर्य"],
      duration: "2 days",
      hasQuiz: true,
    })),
  },
  geography: {
    name: "Geography", description: "NCERT Class 12 Geography — Human Geography, India: People and Economy, Map Work.",
    totalChapters: 14, duration: "40 days", hasSimulation: false, isBoard: false, color: "teal",
    chapters: [
      { id:"chapter-01", title:"Human Geography: Nature and Scope",  topics:["Approaches","Fields"],                duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"The World Population",                topics:["Distribution","Density","Growth"],   duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Population Composition",              topics:["Age-Sex Structure","Literacy"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"Human Development",                   topics:["HDI","Indicators"],                  duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"Primary Activities",                  topics:["Agriculture","Mining"],               duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"Secondary Activities",                topics:["Manufacturing","Industry Types"],     duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"Tertiary and Quaternary Activities",  topics:["Services","Trade","Tourism"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-08", title:"Transport and Communication",         topics:["Land","Water","Air Transport"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"International Trade",                 topics:["Trade Patterns","WTO"],               duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"Population and Settlement (India)",   topics:["Distribution","Density"],             duration:"2 days", hasQuiz:true },
      { id:"chapter-11", title:"Land Resources and Agriculture",      topics:["Land Use","Cropping Pattern"],        duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Water Resources",                     topics:["Irrigation","Water Scarcity"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"Mineral and Energy Resources (India)",topics:["Minerals","Conventional/Non-conventional Energy"], duration:"3 days", hasQuiz:true },
      { id:"chapter-14", title:"Geographical Perspective on Selected Issues", topics:["Environmental Issues","Urban Waste"], duration:"2 days", hasQuiz:true },
    ],
  },
};
