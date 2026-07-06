/**
 * @file app/(platform)/learn/class-11/subject-data.ts
 * @description Shared Class 11 subject + chapter data used by both the
 * `[subject]/page.tsx` (chapter list) and `[subject]/[chapter]/page.tsx`
 * (chapter detail) routes. Chapter titles and topics reflect the real
 * NCERT/CBSE Class 11 syllabus (2025-26 edition).
 */

export interface Class11Chapter {
  id: string;
  title: string;
  topics: string[];
  duration: string;
  hasSimulation?: boolean;
  hasQuiz: boolean;
}

export interface Class11Subject {
  name: string;
  description: string;
  totalChapters: number;
  duration: string;
  hasSimulation: boolean;
  color: string;
  chapters: Class11Chapter[];
}

export const CLASS_11_SUBJECT_DATA: Record<string, Class11Subject> = {
  physics: {
    name: "Physics", description: "NCERT Class 11 Physics — Mechanics, Thermodynamics, and Waves. JEE/NEET foundation with derivations and numerical practice.",
    totalChapters: 15, duration: "60 days", hasSimulation: true, color: "blue",
    chapters: [
      { id:"chapter-01", title:"Physical World",                          topics:["Nature of Physics","Scope","Fundamental Forces"],           duration:"1 day",  hasQuiz:true },
      { id:"chapter-02", title:"Units and Measurements",                  topics:["SI Units","Dimensional Analysis","Errors"],                 duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Motion in a Straight Line",               topics:["Speed","Velocity","Acceleration","Kinematic Equations"],   duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-04", title:"Motion in a Plane",                       topics:["Vectors","Projectile Motion","Circular Motion"],            duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-05", title:"Laws of Motion",                          topics:["Newton's Laws","Friction","Circular Motion Dynamics"],      duration:"4 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-06", title:"Work, Energy and Power",                  topics:["Work-Energy Theorem","Conservation of Energy","Collisions"], duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"System of Particles and Rotational Motion", topics:["Centre of Mass","Torque","Angular Momentum","Moment of Inertia"], duration:"4 days", hasQuiz:true },
      { id:"chapter-08", title:"Gravitation",                             topics:["Kepler's Laws","Universal Law of Gravitation","Satellites"], duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-09", title:"Mechanical Properties of Solids",         topics:["Stress-Strain","Elastic Moduli","Hooke's Law"],             duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"Mechanical Properties of Fluids",         topics:["Pressure","Bernoulli's Principle","Viscosity"],             duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"Thermal Properties of Matter",            topics:["Heat","Temperature Scales","Calorimetry","Thermal Expansion"], duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Thermodynamics",                          topics:["Laws of Thermodynamics","Heat Engines","Entropy"],          duration:"4 days", hasQuiz:true },
      { id:"chapter-13", title:"Kinetic Theory",                          topics:["Kinetic Theory of Gases","Degrees of Freedom","Mean Free Path"], duration:"2 days", hasQuiz:true },
      { id:"chapter-14", title:"Oscillations",                            topics:["SHM","Pendulum","Damped Oscillations"],                     duration:"3 days", hasSimulation:true, hasQuiz:true },
      { id:"chapter-15", title:"Waves",                                   topics:["Wave Motion","Superposition","Doppler Effect"],             duration:"3 days", hasSimulation:true, hasQuiz:true },
    ],
  },
  chemistry: {
    name: "Chemistry", description: "NCERT Class 11 Chemistry — Physical, Organic, and Inorganic Chemistry foundations for board exams and JEE/NEET.",
    totalChapters: 14, duration: "55 days", hasSimulation: false, color: "green",
    chapters: [
      { id:"chapter-01", title:"Some Basic Concepts of Chemistry",    topics:["Mole Concept","Stoichiometry","Laws of Chemical Combination"], duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Structure of Atom",                   topics:["Bohr Model","Quantum Numbers","Electronic Configuration"],     duration:"4 days", hasQuiz:true },
      { id:"chapter-03", title:"Classification of Elements and Periodicity", topics:["Modern Periodic Law","Periodic Trends"],                 duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Chemical Bonding and Molecular Structure", topics:["Ionic Bond","Covalent Bond","VSEPR Theory","Hybridisation"], duration:"4 days", hasQuiz:true },
      { id:"chapter-05", title:"States of Matter",                    topics:["Gas Laws","Kinetic Theory","Liquid State"],                    duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Thermodynamics",                      topics:["Enthalpy","Entropy","Gibbs Free Energy"],                      duration:"4 days", hasQuiz:true },
      { id:"chapter-07", title:"Equilibrium",                         topics:["Chemical Equilibrium","Le Chatelier's Principle","Acid-Base Equilibrium"], duration:"4 days", hasQuiz:true },
      { id:"chapter-08", title:"Redox Reactions",                     topics:["Oxidation Number","Balancing Redox Reactions"],                duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Hydrogen",                            topics:["Position in Periodic Table","Hydrides","Water"],               duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"The s-Block Elements",                topics:["Alkali Metals","Alkaline Earth Metals"],                       duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"The p-Block Elements",                topics:["Group 13","Group 14 Elements"],                                duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Organic Chemistry — Basic Principles",topics:["IUPAC Nomenclature","Isomerism","Reaction Mechanisms"],        duration:"4 days", hasQuiz:true },
      { id:"chapter-13", title:"Hydrocarbons",                        topics:["Alkanes","Alkenes","Alkynes","Aromatic Compounds"],            duration:"4 days", hasQuiz:true },
      { id:"chapter-14", title:"Environmental Chemistry",             topics:["Pollution","Ozone Depletion","Green Chemistry"],               duration:"2 days", hasQuiz:true },
    ],
  },
  mathematics: {
    name: "Mathematics", description: "NCERT Class 11 Mathematics — Sets to Probability. Strong algebra and calculus foundation for Class 12 and competitive exams.",
    totalChapters: 16, duration: "60 days", hasSimulation: false, color: "purple",
    chapters: [
      { id:"chapter-01", title:"Sets",                                    topics:["Set Operations","Venn Diagrams","Subsets"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"Relations and Functions",                 topics:["Cartesian Product","Domain and Range","Types of Functions"], duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Trigonometric Functions",                 topics:["Trigonometric Identities","Graphs","Compound Angles"],  duration:"4 days", hasQuiz:true },
      { id:"chapter-04", title:"Principle of Mathematical Induction",     topics:["Induction Proofs"],                                     duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"Complex Numbers and Quadratic Equations", topics:["Imaginary Numbers","Argand Plane","Roots"],             duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Linear Inequalities",                     topics:["Algebraic Solutions","Graphical Solutions"],            duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"Permutations and Combinations",           topics:["Fundamental Counting Principle","nPr","nCr"],           duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Binomial Theorem",                        topics:["Binomial Expansion","General Term","Pascal's Triangle"], duration:"3 days", hasQuiz:true },
      { id:"chapter-09", title:"Sequences and Series",                    topics:["AP","GP","Special Series"],                             duration:"3 days", hasQuiz:true },
      { id:"chapter-10", title:"Straight Lines",                          topics:["Slope","Line Equations","Distance"],                    duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"Conic Sections",                          topics:["Circle","Parabola","Ellipse","Hyperbola"],              duration:"4 days", hasQuiz:true },
      { id:"chapter-12", title:"Introduction to Three Dimensional Geometry", topics:["Coordinate Axes","Distance Formula 3D"],             duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"Limits and Derivatives",                  topics:["Limits","Derivatives","Rules of Differentiation"],      duration:"4 days", hasQuiz:true },
      { id:"chapter-14", title:"Mathematical Reasoning",                  topics:["Statements","Logical Connectives"],                     duration:"2 days", hasQuiz:true },
      { id:"chapter-15", title:"Statistics",                              topics:["Mean Deviation","Variance","Standard Deviation"],       duration:"3 days", hasQuiz:true },
      { id:"chapter-16", title:"Probability",                             topics:["Random Experiments","Events","Axiomatic Probability"], duration:"3 days", hasQuiz:true },
    ],
  },
  biology: {
    name: "Biology", description: "NCERT Class 11 Biology — Diversity, Structural Organisation, Cell Biology, and Plant/Human Physiology for NEET foundation.",
    totalChapters: 22, duration: "70 days", hasSimulation: false, color: "emerald",
    chapters: [
      { id:"chapter-01", title:"The Living World",                    topics:["Diversity","Taxonomy","Classification"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"Biological Classification",           topics:["Five Kingdom Classification","Viruses"],           duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Plant Kingdom",                       topics:["Algae","Bryophytes","Pteridophytes","Gymnosperms"], duration:"3 days", hasQuiz:true },
      { id:"chapter-04", title:"Animal Kingdom",                      topics:["Classification","Phyla"],                          duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"Morphology of Flowering Plants",      topics:["Root","Stem","Leaf","Flower"],                     duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Anatomy of Flowering Plants",         topics:["Tissue Systems","Secondary Growth"],               duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Structural Organisation in Animals",  topics:["Animal Tissues","Frog"],                           duration:"2 days", hasQuiz:true },
      { id:"chapter-08", title:"Cell: The Unit of Life",              topics:["Cell Theory","Cell Organelles"],                   duration:"4 days", hasQuiz:true },
      { id:"chapter-09", title:"Biomolecules",                        topics:["Carbohydrates","Proteins","Enzymes"],              duration:"4 days", hasQuiz:true },
      { id:"chapter-10", title:"Cell Cycle and Cell Division",        topics:["Mitosis","Meiosis"],                               duration:"3 days", hasQuiz:true },
      { id:"chapter-11", title:"Transport in Plants",                 topics:["Diffusion","Osmosis","Transpiration"],             duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Mineral Nutrition",                   topics:["Essential Elements","Nitrogen Fixation"],          duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"Photosynthesis in Higher Plants",     topics:["Light Reaction","Calvin Cycle"],                   duration:"4 days", hasQuiz:true },
      { id:"chapter-14", title:"Respiration in Plants",               topics:["Glycolysis","Krebs Cycle","ETC"],                  duration:"3 days", hasQuiz:true },
      { id:"chapter-15", title:"Plant Growth and Development",        topics:["Growth Hormones","Photoperiodism"],                duration:"2 days", hasQuiz:true },
      { id:"chapter-16", title:"Digestion and Absorption",            topics:["Digestive System","Enzymes"],                      duration:"3 days", hasQuiz:true },
      { id:"chapter-17", title:"Breathing and Exchange of Gases",     topics:["Respiratory System","Gas Exchange"],               duration:"3 days", hasQuiz:true },
      { id:"chapter-18", title:"Body Fluids and Circulation",         topics:["Blood","Heart","Circulatory System"],              duration:"3 days", hasQuiz:true },
      { id:"chapter-19", title:"Excretory Products and their Elimination", topics:["Nephron","Kidney Function"],                 duration:"3 days", hasQuiz:true },
      { id:"chapter-20", title:"Locomotion and Movement",             topics:["Muscles","Skeletal System"],                       duration:"2 days", hasQuiz:true },
      { id:"chapter-21", title:"Neural Control and Coordination",     topics:["Neuron","Reflex Arc","Brain"],                     duration:"3 days", hasQuiz:true },
      { id:"chapter-22", title:"Chemical Coordination and Integration", topics:["Endocrine Glands","Hormones"],                   duration:"3 days", hasQuiz:true },
    ],
  },
  "computer-science": {
    name: "Computer Science", description: "CBSE Class 11 Computer Science — Python programming, functions, file handling, databases, and networking basics.",
    totalChapters: 9, duration: "35 days", hasSimulation: false, color: "indigo",
    chapters: [
      { id:"chapter-01", title:"Computer Systems and Organisation",  topics:["Basics of Computer","Memory","Software"],       duration:"3 days", hasQuiz:true },
      { id:"chapter-02", title:"Encoding Schemes and Number System", topics:["Binary","ASCII","Unicode"],                     duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"Emerging Trends",                    topics:["AI","IoT","Cloud Computing"],                   duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"Introduction to Problem Solving",     topics:["Algorithms","Flowcharts","Pseudocode"],         duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"Getting Started with Python",         topics:["Python Basics","Variables","Data Types"],       duration:"4 days", hasQuiz:true },
      { id:"chapter-06", title:"Flow of Control",                     topics:["Conditionals","Loops"],                        duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Functions",                           topics:["Function Definition","Parameters","Scope"],     duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Strings",                             topics:["String Operations","Methods"],                 duration:"3 days", hasQuiz:true },
      { id:"chapter-09", title:"Lists, Tuples and Dictionaries",       topics:["Lists","Tuples","Dictionaries"],               duration:"4 days", hasQuiz:true },
    ],
  },
  english: {
    name: "English (Hornbill/Snapshots)", description: "NCERT Class 11 English — Hornbill prose and poetry, Snapshots supplementary reader.",
    totalChapters: 12, duration: "35 days", hasSimulation: false, color: "orange",
    chapters: [
      { id:"chapter-01", title:"The Portrait of a Lady (Hornbill)",           topics:["Character Sketch","Themes"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"We're Not Afraid to Die (Hornbill)",          topics:["Adventure","Survival"],            duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"Discovering Tut: The Saga Continues (Hornbill)", topics:["Archaeology","History"],        duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"Landscape of the Soul (Hornbill)",            topics:["Art Appreciation","Philosophy"],   duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"The Ailing Planet (Hornbill)",                topics:["Environment","Global Warming"],    duration:"2 days", hasQuiz:true },
      { id:"chapter-06", title:"The Browning Version (Hornbill)",             topics:["Drama Extract","Character Study"], duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"The Adventure (Hornbill)",                    topics:["Science Fiction","Parallel Worlds"], duration:"2 days", hasQuiz:true },
      { id:"chapter-08", title:"Silk Road (Hornbill)",                       topics:["Travelogue","Tibet"],              duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"The Summer of the Beautiful White Horse (Snapshots)", topics:["Honesty","Family"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"The Address (Snapshots)",                    topics:["War","Loss"],                      duration:"2 days", hasQuiz:true },
      { id:"chapter-11", title:"Grammar — Tenses & Modals",                  topics:["Modal Verbs","Tense Forms"],       duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Writing Skills",                             topics:["Notice","Article","Letter"],       duration:"3 days", hasQuiz:true },
    ],
  },
  economics: {
    name: "Economics", description: "NCERT Class 11 Economics — Statistics for Economics and Indian Economic Development.",
    totalChapters: 10, duration: "30 days", hasSimulation: false, color: "yellow",
    chapters: [
      { id:"chapter-01", title:"Indian Economy on the Eve of Independence", topics:["Colonial Economy","Agriculture"],      duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"Introduction to Statistics",               topics:["Scope","Importance"],                 duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"Collection of Data",                       topics:["Primary Data","Secondary Data"],      duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"Organisation of Data",                     topics:["Classification","Frequency Distribution"], duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"Presentation of Data",                     topics:["Tables","Diagrams","Graphs"],         duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Measures of Central Tendency",             topics:["Mean","Median","Mode"],               duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Measures of Dispersion",                   topics:["Range","Standard Deviation"],         duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Correlation",                              topics:["Karl Pearson's Coefficient"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-09", title:"Index Numbers",                            topics:["Price Index","Construction"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"Use of Statistical Tools",                 topics:["Applications","Case Studies"],        duration:"2 days", hasQuiz:true },
    ],
  },
  "artificial-intelligence": {
    name: "Artificial Intelligence", description: "CBSE Class 11 AI — Introduction to AI, Machine Learning concepts, Ethics, and Data Science basics.",
    totalChapters: 8, duration: "25 days", hasSimulation: false, color: "rose",
    chapters: [
      { id:"chapter-01", title:"Introduction to AI",         topics:["AI Domains","History of AI"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-02", title:"AI Project Cycle",           topics:["Problem Scoping","Data Acquisition"],   duration:"3 days", hasQuiz:true },
      { id:"chapter-03", title:"Introduction to Machine Learning", topics:["Supervised","Unsupervised"],       duration:"4 days", hasQuiz:true },
      { id:"chapter-04", title:"Statistics for AI",          topics:["Mean","Variance","Probability Basics"], duration:"3 days", hasQuiz:true },
      { id:"chapter-05", title:"Introduction to Data Science", topics:["Data Collection","Data Cleaning"],     duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Computer Vision Basics",      topics:["Image Processing","Applications"],      duration:"3 days", hasQuiz:true },
      { id:"chapter-07", title:"Natural Language Processing", topics:["Text Processing","Chatbots"],           duration:"3 days", hasQuiz:true },
      { id:"chapter-08", title:"Ethics in AI",                topics:["Bias","Privacy","Responsible AI"],      duration:"2 days", hasQuiz:true },
    ],
  },
  hindi: {
    name: "Hindi (Aroh/Vitan)", description: "NCERT Class 11 Hindi — Aroh prose and poetry, Vitan supplementary reader.",
    totalChapters: 18, duration: "45 days", hasSimulation: false, color: "red",
    chapters: Array.from({ length: 18 }, (_, i) => ({
      id: `chapter-${String(i + 1).padStart(2, "0")}`,
      title: `Aroh/Vitan — Pathya ${i + 1}`,
      topics: ["गद्यांश विश्लेषण", "भाषा शैली", "काव्य सौंदर्य"],
      duration: "2 days",
      hasQuiz: true,
    })),
  },
  geography: {
    name: "Geography", description: "NCERT Class 11 Geography — Physical Geography (Geomorphology, Climatology, Oceanography) and Indian Geography.",
    totalChapters: 16, duration: "40 days", hasSimulation: false, color: "teal",
    chapters: [
      { id:"chapter-01", title:"Geography as a Discipline",             topics:["Branches of Geography"],             duration:"1 day",  hasQuiz:true },
      { id:"chapter-02", title:"The Origin and Evolution of the Earth", topics:["Big Bang Theory","Earth's Layers"],   duration:"2 days", hasQuiz:true },
      { id:"chapter-03", title:"Interior of the Earth",                 topics:["Earthquakes","Volcanoes"],           duration:"2 days", hasQuiz:true },
      { id:"chapter-04", title:"Distribution of Oceans and Continents", topics:["Continental Drift","Plate Tectonics"], duration:"2 days", hasQuiz:true },
      { id:"chapter-05", title:"Landforms",                             topics:["Weathering","Erosion"],              duration:"3 days", hasQuiz:true },
      { id:"chapter-06", title:"Composition and Structure of Atmosphere", topics:["Atmospheric Layers","Composition"], duration:"2 days", hasQuiz:true },
      { id:"chapter-07", title:"Solar Radiation, Heat Balance and Temperature", topics:["Insolation","Heat Budget"],  duration:"2 days", hasQuiz:true },
      { id:"chapter-08", title:"Atmospheric Circulation and Weather Systems", topics:["Pressure Belts","Winds"],     duration:"3 days", hasQuiz:true },
      { id:"chapter-09", title:"Water (Oceans)",                        topics:["Ocean Currents","Salinity"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-10", title:"India: Location",                       topics:["Latitude","Longitude","Boundaries"], duration:"2 days", hasQuiz:true },
      { id:"chapter-11", title:"Structure and Physiography of India",   topics:["Himalayas","Plains","Plateau"],      duration:"3 days", hasQuiz:true },
      { id:"chapter-12", title:"Climate of India",                      topics:["Monsoon","Seasons"],                 duration:"2 days", hasQuiz:true },
      { id:"chapter-13", title:"Natural Vegetation of India",           topics:["Forest Types","Biodiversity"],       duration:"2 days", hasQuiz:true },
      { id:"chapter-14", title:"Soils of India",                        topics:["Soil Types","Soil Erosion"],         duration:"2 days", hasQuiz:true },
      { id:"chapter-15", title:"Natural Hazards and Disasters",         topics:["Floods","Cyclones","Droughts"],      duration:"2 days", hasQuiz:true },
      { id:"chapter-16", title:"Map Work and Practicals",               topics:["Map Reading","Location Skills"],     duration:"2 days", hasQuiz:true },
    ],
  },
};
