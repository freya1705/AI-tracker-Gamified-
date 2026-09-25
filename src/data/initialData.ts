import { Task, Accessory, RoadmapStep, RealWorldProblem, MasterDailyState, AiJournalEntry } from '../types';
import { INITIAL_DAY_1_MISSION } from './heroData';

export const DEFAULT_MASTER_DAILY: MasterDailyState = {
  date: new Date().toISOString().split('T')[0],
  dayNumber: 1,
  morning: {
    darshanAarti: false,
    lemonWater: false,
    poojaAudio: false,
    prapti: false,
    vachanabook: false,
    cleanDesh: false,
    planDay: false,
  },
  dsa: {
    topic: 'Arrays & Two Pointers / Graph BFS',
    concept: false,
    videoLecture: false,
    codingBook: false,
    makeNotes: false,
    lc1: false,
    lc2: false,
    lc3: false,
    lc4: false,
    dryRuns: false,
    commitCode: false,
  },
  aiMission: INITIAL_DAY_1_MISSION,
  project: {
    milestone: 'PatientTriage: clean & benchmark 1 real ED triage dataset',
    implement: false,
    test: false,
    commit: false,
    push: false,
  },
  life: {
    selected: ['Flute', 'Gym', 'Mansi Cheshta'],
    completed: [],
  },
  evening: {
    completedText: '',
    learnedText: '',
    builtText: '',
    githubCommitted: false,
    tomorrowTop1: 'Implement logistic regression from scratch in NumPy',
    weeklyGrowth: 'Starting my AI Hero journey from Day 1 with strong engineering foundations.',
    isClosed: false,
  }
};

export const LIFE_ROTATION_OPTIONS = [
  { id: 'Read book', icon: '📚', label: 'Read Book' },
  { id: 'Mansi Cheshta', icon: '🙏', label: 'Mansi Cheshta' },
  { id: 'BAPS task', icon: '🏛️', label: 'BAPS Task' },
  { id: 'Flute', icon: '🪈', label: 'Flute' },
  { id: 'Harmonium', icon: '🎹', label: 'Harmonium' },
  { id: 'Drive car', icon: '🚗', label: 'Drive Car' },
  { id: 'Crochet', icon: '🧶', label: 'Crochet' },
  { id: 'ISR', icon: '🤝', label: 'ISR Seva' },
  { id: 'Gym', icon: '🏋️‍♀️', label: 'Gym / Fitness' },
  { id: 'Artwork', icon: '🎨', label: 'Artwork' },
];

export const INITIAL_TASKS: Task[] = [
  // --- MORNING FOUNDATION (7/7) ---
  {
    id: 'm-1',
    title: 'Darshan / Aarti 🙏',
    category: 'routine',
    topic: 'Morning Foundation',
    xp: 25,
    completed: false,
    priority: 'high',
    notes: 'Start the day with calm mindfulness and gratitude',
    estimatedMinutes: 15,
    isCompulsory: true,
  },
  {
    id: 'm-2',
    title: 'Lemon Water 🍋',
    category: 'routine',
    topic: 'Morning Foundation',
    xp: 15,
    completed: false,
    priority: 'medium',
    notes: 'Hydrate and kickstart digestion',
    estimatedMinutes: 5,
    isCompulsory: true,
  },
  {
    id: 'm-3',
    title: 'Pooja + Audio 🎧',
    category: 'routine',
    topic: 'Morning Foundation',
    xp: 30,
    completed: false,
    priority: 'high',
    notes: 'Daily spiritual center and devotion',
    estimatedMinutes: 20,
    isCompulsory: true,
  },
  {
    id: 'm-4',
    title: 'Write Prapti ✍️',
    category: 'routine',
    topic: 'Morning Foundation',
    xp: 20,
    completed: false,
    priority: 'medium',
    notes: 'Record gratitude and mindset achievements',
    estimatedMinutes: 10,
    isCompulsory: true,
  },
  {
    id: 'm-5',
    title: 'Ahnik Vachanabook 📖',
    category: 'routine',
    topic: 'Morning Foundation',
    xp: 25,
    completed: false,
    priority: 'medium',
    notes: 'Spiritual contemplation and reading',
    estimatedMinutes: 15,
    isCompulsory: true,
  },
  {
    id: 'm-6',
    title: 'Clean Desh & Study Area 🧹',
    category: 'routine',
    topic: 'Environment',
    xp: 20,
    completed: false,
    priority: 'low',
    notes: 'Clean space = clear engineering focus',
    estimatedMinutes: 10,
    isCompulsory: true,
  },
  {
    id: 'm-7',
    title: 'Plan the Day 📝',
    category: 'routine',
    topic: 'Strategy',
    xp: 20,
    completed: false,
    priority: 'high',
    notes: 'Set today top priorities before opening distractions',
    estimatedMinutes: 10,
    isCompulsory: true,
  },

  // --- CORE ENGINEERING: DSA ---
  {
    id: 'dsa-stack',
    title: 'DSA Full Stack: Topic → Lecture → Book → Notes → 4 LCs → Commit ⚡',
    category: 'dsa',
    topic: 'Graphs (BFS/DFS) or DP',
    xp: 80,
    completed: false,
    priority: 'high',
    notes: 'Understand → Solve → Explain → Recognize Pattern. Do dry runs and push commit to GitHub.',
    resourceLink: 'https://leetcode.com',
    estimatedMinutes: 90,
  },

  // --- AI LEARNING + BUILDING ---
  {
    id: 'ai-loop',
    title: 'AI Loop: Learn → Understand → Code → Build → Notes → GitHub Commit 🤖',
    category: 'aiml',
    topic: 'Data & ML Foundations',
    xp: 90,
    completed: false,
    priority: 'high',
    notes: 'Every AI session must move the project forward. Code from scratch in NumPy, benchmark against sklearn.',
    resourceLink: 'https://www.deeplearning.ai',
    estimatedMinutes: 90,
  },

  // --- BUILD & GITHUB DAILY ---
  {
    id: 'proj-patienttriage',
    title: 'PatientTriage.ai: Real Triage Data + Hybrid Baseline Model 🏥',
    category: 'project',
    topic: 'Flagship Project v2',
    xp: 100,
    completed: false,
    priority: 'high',
    notes: 'Train risk model on real emergency data, optimize high-acuity recall, implement clinical safety rules.',
    estimatedMinutes: 75,
  },

  // --- COLLEGE & IITM WORK ---
  {
    id: 'clg-1',
    title: 'IITM BS Degree Modules & Quiz 🎓',
    category: 'college',
    topic: 'IITM Degree',
    xp: 45,
    completed: false,
    priority: 'high',
    notes: 'Keep coursework clear with zero backlog.',
    estimatedMinutes: 45,
  }
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'acc-yellow-bow',
    name: 'Yellow Ribbon Scrunchie',
    icon: '🎀',
    minLevel: 1,
    description: 'Freya\'s signature cheerful hair tie that boosts focus!',
    type: 'head'
  },
  {
    id: 'acc-goggles',
    name: 'AI Researcher Visor',
    icon: '🥽',
    minLevel: 2,
    description: 'High-tech optics for spotting data patterns & overfitting.',
    type: 'head'
  },
  {
    id: 'acc-headband',
    name: 'LeetCode Ninja Band',
    icon: '🥋',
    minLevel: 3,
    description: 'Grants +10% mental clarity during Dynamic Programming challenges.',
    type: 'head'
  },
  {
    id: 'acc-sparkle-aura',
    name: 'Golden Sparkle Halo',
    icon: '✨',
    minLevel: 4,
    description: 'A radiant aura that shines brighter with every completed streak.',
    type: 'aura'
  },
  {
    id: 'acc-scholar-hat',
    name: 'IITM Scholar Mortarboard',
    icon: '🎓',
    minLevel: 5,
    description: 'Proof of deep academic dedication and relentless learning.',
    type: 'head'
  },
  {
    id: 'acc-grandmaster-crown',
    name: 'Grandmaster AI Crown',
    icon: '👑',
    minLevel: 7,
    description: 'Worn by true architects who ship full-stack AI flagships to real users!',
    type: 'head'
  },
];

export const SPEECH_MESSAGES = {
  idle: [
    "Engineer Freya is online. 🤖",
    "One small step today. Start?",
    "Only 20 minutes. Start?",
    "Don't break the streak 👀",
    "Remember: SWE first, AI as your superpower!",
    "One main resource → Learn → Practice → Build → Move on!",
    "Have you had your morning lemon water yet? 🍋",
  ],
  happy: [
    "You did it! That feels so good ✨",
    "Look at you go! Keep this momentum!",
    "Task crushed! +XP in the bank!",
    "Another brick laid in your AI flagship!",
    "Consistency is your secret weapon!",
  ],
  excited: [
    "WOOHOO! LEVEL UP!! 🎉 You are unstoppable!",
    "Incredible achievement unlocked! Proud of you!",
    "That was a major milestone! High five! ✋",
    "Look at this streak! You're on fire! 🔥",
    "SHIP IT! 🚀",
  ],
  sleepy: [
    "Minimum day is enough. We continue tomorrow. 💤",
    "Haven't seen you yet today... need a gentle 15m start?",
    "Even 1 LeetCode problem or 1 page counts. Never zero days!",
    "Rest is sacred, but let's log 1 tiny win first?",
  ],
  proud: [
    "4 problems done! Pattern unlocked. ⚡",
    "You didn't just learn AI today. You BUILT with it. 💻",
    "Standing tall! Your consistency is truly inspiring.",
    "Look at this discipline. PatientTriage v2 is getting closer every day.",
  ],
  encouraging: [
    "Feeling overwhelmed? Shrink the task! Just 20 minutes.",
    "Don't worry about perfection. Code it dirty, refine it tomorrow.",
    "Stuck 45+ min? Write the problem in 3 lines and take a breath.",
    "You have everything it takes. Let's do just one small task now!",
  ]
};

export const CAREER_TIERS = [
  {
    id: 'student',
    year: '2026',
    title: 'Student → AI/CS Foundation + Builder',
    tagline: 'Target: ₹20–50L+ Placement as Stage 1 Leverage',
    badge: '🎓 Stage 1',
    description: 'Master core CS, interview-ready DSA (Graphs + DP), ML fundamentals from scratch, and 5 small + 1 serious project (PatientTriage).',
    quote: '"I can build."'
  },
  {
    id: 'swe_builder',
    year: '2027',
    title: 'Engineer → AI Practitioner + Internships',
    tagline: 'Deepening DL, RAG, and Tool-Calling Agents',
    badge: '⚡ Stage 2',
    description: 'High-impact internships, contribution to real production systems, evaluations, and shipping reliable modern AI software.',
    quote: '"I can build difficult things."'
  },
  {
    id: 'ai_engineer',
    year: '2028',
    title: 'Graduate → High-Value AI Engineer + Network',
    tagline: 'Top-tier Placement & Industry Reputation',
    badge: '🚀 Stage 3',
    description: 'End-to-end full stack AI ownership from data pipeline to low-latency cloud inference, active network of founders & researchers.',
    quote: '"I can build things people genuinely want."'
  },
  {
    id: 'ai_powered_eng',
    year: '2029–2032+',
    title: 'AI-Powered Engineer → Founder & Operator',
    tagline: 'Products, Capital, Team & Your Chosen Arena',
    badge: '👑 Stage 4',
    description: 'Transforming technical mastery and customer problem discovery into an enduring AI company in healthcare, education, or enterprise.',
    quote: '"I can identify opportunities and build a company."'
  }
];

export const AI_FOUNDER_PHASES = [
  {
    num: 1,
    title: 'Build Your AI Foundation (NOW)',
    focus: 'Python, Math (LinAlg/Prob/Stats/Opt), ML algorithms from scratch, small PyTorch neural nets.',
    rule: 'Understand how AI systems work under the hood. Never be just an API wrapper caller.'
  },
  {
    num: 2,
    title: 'Modern AI Stack Mastery',
    focus: 'Transformers, Embeddings, RAG, Agents, Tool calling, Multimodal, AI Evaluation & Safety.',
    rule: 'Understand the mechanics beneath the API (chunking, vector math, hallucination guardrails).'
  },
  {
    num: 3,
    title: 'Build, Build, Build (5 Small → 3 Serious → 1 BIG)',
    focus: '5 small projects + 3 serious (PatientTriage.ai) + 1 flagship end-to-end deployed system.',
    rule: 'Learn → Build → Publish → Get feedback → Improve.'
  },
  {
    num: 4,
    title: 'Stop Thinking Like a Student',
    focus: 'Shift from "What should I learn?" to "What expensive, frustrating problem exists for users?"',
    rule: 'Founder thinking starts with identifying real pain points, not tech demos.'
  },
  {
    num: 5,
    title: 'Weekly AI Research Habit',
    focus: 'Read 1 major AI paper / technical article every week (arXiv, conference, research blogs).',
    rule: 'Understand what problem they solved, what limitations exist, and reproduce a toy version.'
  },
  {
    num: 6,
    title: 'Personal AI Intelligence Database',
    focus: 'Maintain structured notes: Fundamentals, News, Papers, Tools, Startup Ideas, India, Business Models.',
    rule: 'Your compounding intelligence archive over 2–3 years.'
  },
  {
    num: 7,
    title: 'Develop Founder Capabilities',
    focus: 'Technology + Product + Research + Customer understanding + Marketing + Sales + Communication.',
    rule: 'Learn business and communication alongside engineering.'
  },
  {
    num: 8,
    title: 'Start Public Identity (AI Builder in Public)',
    focus: '"I learned → I built → I discovered → I failed → I understood".',
    rule: 'Document your genuine evolution into an AI expert on LinkedIn/X.'
  },
  {
    num: 9,
    title: 'Enter the Ecosystem & Network',
    focus: 'Hackathons, open-source, developer meetups, internships, student founder circles.',
    rule: 'Collect people: engineers, researchers, founders, designers. Your future co-founder is there.'
  },
  {
    num: 10,
    title: 'Your First AI Money',
    focus: '₹1 → ₹1,000 → ₹10,000 → ₹1L → ₹10L.',
    rule: 'Freelancing, micro-SaaS, automations. Learn: Problem → Solution → Value → Paid.'
  },
  {
    num: 11,
    title: 'Find Your Eventual Arena',
    focus: 'Healthcare AI, Education AI, Enterprise AI, Developer Tools, or Indian Languages.',
    rule: 'You will discover your arena through hands-on exposure, not pure imagination.'
  }
];

export const INITIAL_JOURNAL_ENTRIES: AiJournalEntry[] = [
  {
    id: 'j-1',
    category: 'startup_ideas',
    title: 'PatientTriage: Hospital Emergency Undertriage Alerting',
    content: 'Emergency triage nurses face extreme cognitive load. A hybrid rule-engine + calibrated gradient-boosted tree that abstains on ambiguous cases and flags subtle vital deteriorations.',
    date: '2026-09-24',
  },
  {
    id: 'j-2',
    category: 'paper',
    title: 'Weekly Paper Habit #1: Retrieval Augmented Generation (Lewis et al.)',
    content: 'Core takeaway: Dense vector embeddings with cosine similarity provide grounded context to mitigate hallucinations. Chunking size and overlap directly dictate precision vs context trade-offs.',
    date: '2026-09-23',
  },
  {
    id: 'j-3',
    category: 'india',
    title: 'Indian Regional Clinical & Education Data Opportunity',
    content: 'Huge underserved demographic needing plain-spoken vernacular explanations of medical tests and government welfare schemes.',
    date: '2026-09-20',
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    stepNum: 1,
    title: 'Python + Data',
    duration: 'About 1 week',
    simpleWords: 'Get data into your notebook and understand it.',
    why: 'Every ML project starts with messy data. You must inspect, clean, and visualize before modeling.',
    learnFrom: [
      { source: 'Kaggle Learn: Pandas', study: 'Load, clean, filter, group, basic plots', dontStudyYet: 'Advanced Pandas, massive SQL tricks' }
    ],
    checklist: [
      'Load a CSV into a DataFrame',
      'Handle and fix missing values (imputation/drop)',
      'Filter and group data with groupby()',
      'Generate 3 meaningful exploratory charts',
      'Know what a "feature" vs "label" is'
    ],
    practice: 'Explore one small Kaggle tabular dataset.',
    build: 'An EDA notebook with a short "what is this data for?" note.',
    moveOnWhen: 'You can clean and describe a new dataset in about 30 minutes. Then stop.'
  },
  {
    stepNum: 2,
    title: 'Machine Learning Fundamentals',
    duration: 'About 4–6 weeks',
    simpleWords: 'Teaching a model to predict from historical examples.',
    why: 'This is the predictive core of your PatientTriage risk model.',
    learnFrom: [
      { source: 'Andrew Ng ML (Courses 1–2)', study: 'Regression, classification, decision trees, evaluation', dontStudyYet: 'SVM math, Course 3, heavy theory' },
      { source: 'Kaggle: Intro + Intermediate ML', study: 'Train real baseline models, handle categorical features', dontStudyYet: 'Competitions, complex ensembles' },
      { source: 'StatQuest', study: 'Only unclear concepts (Gradient Descent, ROC-AUC)', dontStudyYet: 'Full statistical proofs' }
    ],
    checklist: [
      'What is ML? Features and labels',
      'Regression vs Classification differences',
      'Train/val/test split and why data leakage happens',
      'Overfitting vs Underfitting (regularization)',
      'Linear regression & Logistic regression from scratch (NumPy)',
      'Decision Trees & Random Forests',
      'Gradient Boosting intuition',
      'Precision, Recall, F1, ROC-AUC (Why recall matters for medical triage)',
      'Class imbalance techniques',
      'Calibration + decision thresholds (abstaining when unsure)'
    ],
    practice: 'Write linear + logistic regression from scratch in NumPy, then benchmark against scikit-learn.',
    build: 'Kaggle prediction project with 3 models and a side-by-side comparison table.',
    moveOnWhen: 'You can explain why your model overfit and why you picked your metric (for triage: recall over accuracy).',
    patientTriageConnection: 'Train a risk model on real triage data. Compare rule-only vs model-only vs hybrid.'
  },
  {
    stepNum: 3,
    title: 'Deep Learning (Small & Targeted)',
    duration: 'About 3–4 weeks',
    simpleWords: 'Neural networks that learn their own feature representations.',
    why: 'Necessary for unstructured medical notes and image/text classifiers.',
    learnFrom: [
      { source: 'PyTorch Tutorials', study: 'Tensors, training loop, one small model, transfer learning', dontStudyYet: 'RNN/LSTM math, GANs, esoteric architectures' },
      { source: 'Karpathy micrograd (optional)', study: 'How backprop works under the hood', dontStudyYet: 'Rest of LLM series until later' }
    ],
    checklist: [
      'What a neural network is (layers, activations, weights)',
      'Loss functions (CrossEntropy, MSE)',
      'Backpropagation concept and gradient calculation',
      'Writing the standard PyTorch training & validation loop',
      'Fine-tuning a pretrained model (Transfer Learning)'
    ],
    build: 'Fine-tune a small pretrained vision/text classifier on a tiny dataset.',
    moveOnWhen: 'You can write a clean PyTorch training loop from a blank file and explain every single line.'
  },
  {
    stepNum: 4,
    title: 'LLM Apps & Structured Output',
    duration: 'About 2 weeks',
    simpleWords: 'Using language models inside software reliably.',
    why: 'PatientTriage plain-English "Why?" explanations for nurses and doctors.',
    learnFrom: [
      { source: 'DeepLearning.AI LLM Short Course', study: 'Tokens, context windows, prompts, JSON output, hallucination mitigation', dontStudyYet: 'Fine-tuning, LoRA, pre-training weights' }
    ],
    checklist: [
      'Tokens and context window limits',
      'Prompt engineering with clear system instructions',
      'Structured (JSON) output with Pydantic/Zod validation',
      'Defensive retry logic when schema parsing fails',
      'Why models hallucinate and grounding techniques'
    ],
    build: 'An app that turns free unstructured patient notes into validated JSON with auto-retries.',
    moveOnWhen: 'Output rarely breaks, and you can explain exactly why it occasionally fails.',
    patientTriageConnection: 'Generate plain-English "Why?" clinical explanations, strictly verified against the model features.'
  },
  {
    stepNum: 5,
    title: 'RAG (Retrieval Augmented Generation)',
    duration: 'About 3–4 weeks',
    simpleWords: 'Search relevant documents first, then let the LLM answer from citations.',
    why: 'Q&A over clinical guidelines, hospital protocols, or your IITM notes.',
    learnFrom: [
      { source: 'DeepLearning.AI RAG Course', study: 'Embeddings, chunking strategies, vector retrieval, citations', dontStudyYet: 'Complex framework bloat before manual code' }
    ],
    checklist: [
      'Dense vector embeddings & cosine similarity',
      'Chunking strategies (size vs overlap trade-offs)',
      'Retrieve top-k chunks + augment prompt with citations',
      'Measuring retrieval quality (Recall@k, faithfulness)'
    ],
    build: 'Q&A engine over your college & IITM notes, evaluated with a 30-question test set.',
    moveOnWhen: 'You can show a concrete table of chunk size vs retrieval accuracy.'
  },
  {
    stepNum: 6,
    title: 'Agents (Tool Use & Decision Loops)',
    duration: 'About 2 weeks',
    simpleWords: 'An LLM that selects and invokes tools autonomously.',
    why: 'A smart assistant that queries database, calculates risk score, and alerts doctor.',
    learnFrom: [
      { source: 'DeepLearning.AI Agents Course', study: 'Tool calling, think→act→observe loop, execution limits', dontStudyYet: 'Huge autonomous swarms' }
    ],
    checklist: [
      'Function calling / Tool declaration schemas',
      'The reasoning loop (Thought -> Action -> Observation)',
      'Safety limits, timeouts, and fallback policies',
      'When NOT to use an agent (Deterministic code is often better!)'
    ],
    build: 'A tiny agent equipped with 2 discrete tools (e.g. calculator + patient lookup).',
    moveOnWhen: 'You can clearly defend when a plain Python rule is superior to an agent.'
  },
  {
    stepNum: 7,
    title: 'Production Deployment',
    duration: 'About 3–4 weeks',
    simpleWords: 'Make it fast, reliable, and usable by real people on the internet.',
    why: 'Flagship PatientTriage v2 live URL to show interviewers and clinicians.',
    learnFrom: [
      { source: 'FastAPI + Docker Docs', study: 'Model serving, Dockerfile, latency/error logging, cloud hosting', dontStudyYet: 'Kubernetes, multi-region clusters' }
    ],
    checklist: [
      'FastAPI /predict endpoint with automated tests',
      'Containerized with Docker',
      'Basic logging (latency, input validation, error rates)',
      'One live public HTTPS URL with documentation'
    ],
    build: 'Deploy PatientTriage.ai v2 live with demo video and architecture diagram.',
    moveOnWhen: 'A stranger or interviewer can open your link, run a test case, and get an instant result!'
  }
];

export const REAL_WORLD_PROBLEMS: RealWorldProblem[] = [
  {
    domain: 'Healthcare',
    example: 'Clinic no-show prediction',
    likelyVerdict: 'Machine Learning',
    whyVerdict: 'Tabular historical data with demographic, weather, and appointment history features. Clear binary classification problem.'
  },
  {
    domain: 'Education',
    example: 'Answers from university syllabus & notes',
    likelyVerdict: 'RAG (Retrieval Augmented Generation)',
    whyVerdict: 'Static authoritative text. Embeddings + semantic search provide grounded answers with exact citations.'
  },
  {
    domain: 'Finance',
    example: 'Loan default risk scoring',
    likelyVerdict: 'ML + Fairness & Calibration check',
    whyVerdict: 'Tabular credit history. Strict regulatory need for calibrated probability and bias audits.'
  },
  {
    domain: 'Agriculture',
    example: 'Leaf disease identification from camera photos',
    likelyVerdict: 'Vision Model (Transfer Learning)',
    whyVerdict: 'Unstructured visual patterns. ResNet/MobileNet fine-tuned on crop disease images.'
  },
  {
    domain: 'Climate & City',
    example: 'Urban flood-risk emergency alerts',
    likelyVerdict: 'Existing Weather Forecast + Hard Rules',
    whyVerdict: 'Deterministic safety-critical physics. Rule-based triggers (e.g. >50mm rain in 2h) are safer and explainable.'
  },
  {
    domain: 'Public Services',
    example: 'Citizen welfare scheme eligibility finder',
    likelyVerdict: 'RAG + Deterministic Eligibility Rules',
    whyVerdict: 'Rules determine legal qualifications; RAG explains criteria in plain regional language.'
  },
  {
    domain: 'Community',
    example: 'Volunteer & hospital shift scheduling',
    likelyVerdict: 'Constraint Optimization (Not AI)',
    whyVerdict: 'Mathematical linear programming or constraint satisfaction algorithm, where constraints must never be violated.'
  }
];
