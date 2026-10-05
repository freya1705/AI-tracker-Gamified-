// Detailed AI / ML Engineer Roadmap 2026 Data
// Based on "AI Roadmap for Technical People (For engineers and founders)"

export interface SystemComparison {
  system: string;
  whatItDoes: string;
  coreTech: string;
  example: string;
}

export interface RoadmapPhaseDetail {
  id: string;
  phaseNum: string;
  track?: 'shared' | 'ml' | 'ai' | 'advanced';
  title: string;
  duration: string;
  tagline: string;
  description: string;
  subsections: {
    title: string;
    items: string[];
    tools?: string[];
  }[];
  buildProjects: string[];
  exitCondition: string;
}

export interface MonthPlanItem {
  month: number;
  focus: string;
  output: string;
  keyMilestone: string;
}

export interface ProjectLadderLevel {
  level: number;
  name: string;
  coreSkills: string;
  deliverable: string;
  badge: string;
}

export interface AiStackLayer {
  layer: string;
  tools: string[];
  importance: string;
}

export interface JobReadyCriteria {
  role: 'ML Engineer' | 'AI Engineer';
  badge: string;
  criteria: string[];
}

// 1. Phase 0: System Comparison Matrix
export const PHASE_0_SYSTEMS: SystemComparison[] = [
  {
    system: 'Traditional Software',
    whatItDoes: 'Follows explicitly written rules and deterministic branching logic.',
    coreTech: 'Python, TypeScript, SQL, Algorithms, Heuristics',
    example: 'Rule-based patient BMI calculator or triage score thresholds'
  },
  {
    system: 'Machine Learning Model',
    whatItDoes: 'Learns statistical patterns from structured or tabular data to predict outcomes.',
    coreTech: 'scikit-learn, XGBoost, LightGBM, Logistic Regression',
    example: 'Emergency hospital readmission & clinic no-show risk predictor'
  },
  {
    system: 'Deep Learning Model',
    whatItDoes: 'Learns complex representations directly from raw unstructured data using neural networks.',
    coreTech: 'PyTorch, CNNs, Transformers, Embeddings, Autograd',
    example: 'X-ray abnormality classifier or clinical audio phoneme detector'
  },
  {
    system: 'LLM Application',
    whatItDoes: 'Uses a pretrained foundation model to perform reasoning, synthesis, or extraction tasks.',
    coreTech: 'OpenAI API, Claude, Gemini, Structured JSON, Pydantic',
    example: 'Doctor clinical note summarizer and ICD-10 diagnostic code extractor'
  },
  {
    system: 'RAG System',
    whatItDoes: 'Retrieves relevant external information from a knowledge base and supplies it to a model with citations.',
    coreTech: 'Embeddings, Vector DBs (Qdrant, Chroma, Supabase), Hybrid Search, Rerankers',
    example: 'Verified Q&A search over hospital clinical guidelines and medical journals'
  },
  {
    system: 'AI Agent',
    whatItDoes: 'Uses an LLM to dynamically decide actions, execute tools, observe feedback, and loop toward a goal.',
    coreTech: 'LangGraph, ReAct loop, Function calling, Memory, Guardrails, State Machines',
    example: 'Autonomous lab report investigator that queries DB, computes risk, and pages physician'
  },
  {
    system: 'ML Production System',
    whatItDoes: 'Continuously collects data, trains models, tracks experiments, serves predictions at scale, and monitors drift.',
    coreTech: 'FastAPI, Docker, MLflow, Airflow, dbt, Prometheus, CI/CD',
    example: 'End-to-end customer churn prediction pipeline retraining weekly with alerting'
  }
];

// 2. Detailed Roadmap Phases (Phase 0 to 7)
export const DETAILED_ROADMAP_PHASES: RoadmapPhaseDetail[] = [
  {
    id: 'phase-0',
    phaseNum: 'Phase 0',
    track: 'shared',
    title: "Understand What You're Building",
    duration: '1 week',
    tagline: 'Draw the line between the model and the surrounding engineering system',
    description: 'Before writing tool-specific code, understand the architectural distinction between traditional software, ML, DL, LLM apps, RAG, agents, and production systems.',
    subsections: [
      {
        title: 'Core System Mental Models',
        items: [
          'Deterministic code vs statistical learning vs representation learning',
          'Where the foundation model ends and the surrounding software begins',
          'Evaluating when to use simple code, classical ML, or generative AI',
          'Understanding latency, compute costs, and reliability failure modes'
        ]
      }
    ],
    buildProjects: [
      'Write a 1-page architectural breakdown analyzing which problem in your domain needs ML, RAG, an Agent, or just a Python script.'
    ],
    exitCondition: 'You can clearly explain where the model ends and the surrounding engineering system begins.'
  },
  {
    id: 'phase-1',
    phaseNum: 'Phase 1',
    track: 'shared',
    title: 'Programming Foundations',
    duration: '4 to 8 weeks',
    tagline: 'Master Python and software craft so engineering does not hold you back',
    description: 'The bedrock for both ML Engineers and AI Engineers. If your Python is weak, everything downstream becomes exponentially harder.',
    subsections: [
      {
        title: 'Python Mastery',
        items: ['Syntax, functions, classes, modules', 'Exceptions & robust file handling', 'OOP (Encapsulation, Polymorphism, Composition)', 'Iterators, generators, decorators, dataclasses'],
        tools: ['Python 3.12+', 'uv or venv', 'VS Code', 'Jupyter']
      },
      {
        title: 'Software Engineering & Clean Code',
        items: ['Data structures & algorithmic complexity (Big-O)', 'Unit testing with pytest, mocking, coverage', 'Clean code conventions, typing / mypy, formatting with ruff'],
        tools: ['pytest', 'mypy', 'ruff', 'black']
      },
      {
        title: 'Developer Tools & Web/APIs',
        items: ['Git branching, GitHub PRs, terminal CLI workflows', 'Virtual environments & modern package management', 'HTTP, REST APIs, JSON parsing, API authentication', 'Async / await (asyncio) for concurrent API requests'],
        tools: ['Git', 'GitHub', 'curl', 'httpx', 'aiohttp']
      }
    ],
    buildProjects: [
      'CLI expense tracker with file persistence and error handling',
      'REST API client that fetches, parses, and cleans external data',
      'Small FastAPI microservice with input validation (Pydantic)',
      'Tested open-source Python library with pytest suite and clear README'
    ],
    exitCondition: 'You can build a small, robust application without following a tutorial line by line.'
  },
  {
    id: 'phase-2',
    phaseNum: 'Phase 2',
    track: 'shared',
    title: 'Data + Mathematics',
    duration: '4 to 6 weeks',
    tagline: 'Learn the applied mathematics alongside implementation',
    description: 'You do not need to become a pure mathematician before writing ML code. Learn the linear algebra, probability, calculus, and tabular data manipulation alongside code.',
    subsections: [
      {
        title: 'Applied Mathematics for AI',
        items: [
          'Linear Algebra: Vectors, matrices, dot products, transformations, embeddings',
          'Probability: Uncertainty, distributions, Bayes theorem, expected values',
          'Statistics: Mean, variance, sampling, confidence intervals, hypothesis testing',
          'Calculus & Optimization: Derivatives, gradients, chain rule, loss functions, learning rates'
        ]
      },
      {
        title: 'Data Wrangling & Tabular Analysis',
        items: [
          'NumPy: N-dimensional arrays, vectorization, broadcasting, matrix operations',
          'Pandas: DataFrames, filtering, groupby, aggregations, missing values, outliers',
          'Data Visualization: Matplotlib, Seaborn, distributions, correlations',
          'SQL: SELECT, JOINs, GROUP BY, aggregations, CTEs, subqueries',
          'Data Integrity: Data leakage pitfalls, train / val / test splitting'
        ],
        tools: ['NumPy', 'Pandas', 'Matplotlib', 'DuckDB', 'PostgreSQL']
      }
    ],
    buildProjects: [
      'Take a messy, real-world CSV dataset, clean it, handle nulls/outliers, perform Exploratory Data Analysis (EDA), and generate a report with charts and SQL queries.'
    ],
    exitCondition: 'You can inspect a dataset, diagnose its anomalies, and explain how those data flaws degrade model training.'
  },
  {
    id: 'phase-3',
    phaseNum: 'Phase 3',
    track: 'shared',
    title: 'Classical Machine Learning',
    duration: '6 to 10 weeks',
    tagline: 'Learn how algorithms learn, how to evaluate them, and why they fail',
    description: 'Essential even if your destination is AI Engineering. It teaches you how models optimize, how to prevent overfitting, and how to reason rigorously about metrics.',
    subsections: [
      {
        title: 'Supervised & Unsupervised Algorithms',
        items: [
          'Linear Regression & Logistic Regression (from scratch in NumPy & with scikit-learn)',
          'Decision Trees, Random Forests, and Gradient Boosting (XGBoost, LightGBM)',
          'Unsupervised: K-Means clustering, PCA dimensionality reduction'
        ],
        tools: ['scikit-learn', 'XGBoost', 'LightGBM']
      },
      {
        title: 'Evaluation Metrics & Model Improvement',
        items: [
          'Regression: MAE, MSE, RMSE, R²',
          'Classification: Accuracy, Precision, Recall, F1, ROC-AUC, PR-AUC, Confusion Matrix',
          'Feature engineering: One-hot/ordinal encoding, scaling, imputation, feature creation',
          'Cross-validation (K-Fold, Stratified), hyperparameter tuning (Grid/Random/Optuna)',
          'Regularization (L1/L2), class imbalance handling (SMOTE, class weights, threshold tuning)'
        ],
        tools: ['Optuna', 'scikit-learn']
      }
    ],
    buildProjects: [
      'Customer churn prediction or hospital triage risk model with: baseline model, preprocessing pipeline, train/val/test splits, 2+ model comparisons, metric trade-off analysis (Recall vs Precision), error analysis, and README.'
    ],
    exitCondition: 'You can train a model, evaluate it with the correct business metric, and prove whether it is actually useful.'
  },
  {
    id: 'phase-4',
    phaseNum: 'Phase 4',
    track: 'shared',
    title: 'Deep Learning',
    duration: '8 to 12 weeks',
    tagline: 'Understand what neural networks are doing internally',
    description: 'Transition from tabular feature engineering to representation learning. Master backpropagation, tensors, CNNs, attention mechanics, and PyTorch.',
    subsections: [
      {
        title: 'Neural Network Fundamentals & PyTorch',
        items: [
          'Tensors, computational graphs, forward propagation, autograd & backpropagation',
          'Loss functions (CrossEntropy, MSE), optimizers (SGD, Adam, AdamW), learning rate schedules',
          'Overfitting mitigation: Dropout, Batch Normalization, Layer Normalization, early stopping',
          'Standard PyTorch training, validation, and checkpointing loop'
        ],
        tools: ['PyTorch', 'torchvision', 'CUDA / GPU']
      },
      {
        title: 'Architectures: Vision to Transformers',
        items: [
          'Convolutional Neural Networks (CNNs) for image classification and feature maps',
          'Sequence models and embeddings (Word2Vec intuition)',
          'Attention mechanism: Query, Key, Value dot-product attention',
          'The Transformer architecture: Multi-head attention, positional encoding, encoder/decoder'
        ]
      }
    ],
    buildProjects: [
      'Neural network from scratch using pure NumPy (forward pass, backprop, SGD)',
      'PyTorch image classifier with transfer learning (ResNet/ViT)',
      'Text sentiment classifier using PyTorch embeddings',
      'Small Transformer self-attention block implemented by hand'
    ],
    exitCondition: 'You can explain how a neural network learns, write a PyTorch training loop from memory, and debug gradient issues.'
  },
  {
    id: 'phase-5a',
    phaseNum: 'Phase 5A',
    track: 'ml',
    title: 'ML Engineer Track: Production MLOps',
    duration: '8 to 12 weeks',
    tagline: 'Move from training models in notebooks to operating models in production',
    description: 'For engineers focusing on model training, data engineering pipelines, feature stores, experiment tracking, and production inference serving.',
    subsections: [
      {
        title: '5A.1 Data Engineering for ML',
        items: [
          'Data ingestion: Batch vs streaming paradigms',
          'ETL / ELT pipelines & data validation checks (Great Expectations)',
          'Feature engineering pipelines and feature stores (Feast)',
          'Data versioning (DVC) and training-serving skew prevention'
        ],
        tools: ['Airflow', 'Prefect', 'dbt', 'DVC', 'SQL', 'DuckDB']
      },
      {
        title: '5A.2 MLOps & Experiment Tracking',
        items: [
          'Experiment tracking: Parameters, metrics, artifacts with MLflow',
          'Model versioning, model registry, and lifecycle stage transitions',
          'Reproducible containerized training runs with Docker',
          'CI/CD testing for data schemas and model performance regressions',
          'Model monitoring: Data drift and concept drift detection (Evidently AI)'
        ],
        tools: ['MLflow', 'Docker', 'GitHub Actions', 'Evidently AI']
      },
      {
        title: '5A.3 Model Serving & Inference API',
        items: [
          'FastAPI low-latency inference endpoint with input schema validation',
          'Inference architecture: Request → Preprocessing → Model → Prediction → Metrics',
          'Batch scoring vs real-time REST prediction trade-offs',
          'Latency optimization and metric instrumentation (Prometheus)'
        ],
        tools: ['FastAPI', 'Uvicorn', 'Docker', 'Prometheus']
      }
    ],
    buildProjects: [
      'ML Engineer Capstone: An end-to-end Customer Churn Prediction system that ingests data, validates quality, trains and registers models in MLflow, serves predictions via FastAPI, logs requests, detects drift, and triggers retraining.'
    ],
    exitCondition: 'You can explain and demonstrate the complete lifecycle from raw incoming data to reliable production inference and monitoring.'
  },
  {
    id: 'phase-5b',
    phaseNum: 'Phase 5B',
    track: 'ai',
    title: 'AI Engineer Track: LLMs, RAG & Agents',
    duration: '8 to 12 weeks',
    tagline: 'Build reliable products using foundation models, retrieval, tools, and agents',
    description: 'For engineers building product applications around LLMs. Focuses on structured outputs, retrieval systems, autonomous agent workflows, evals, and production reliability.',
    subsections: [
      {
        title: '5B.1 LLM Fundamentals & Context Engineering',
        items: [
          'Tokens, tokenizers, KV-cache, and context window mechanics',
          'Sampling parameters: Temperature, Top-P, Top-K, frequency/presence penalties',
          'Prompt Engineering (improving instructions) vs Context Engineering (structuring information)',
          'Structured outputs: Guaranteed JSON schema validation with Pydantic / Instructor',
          'Streaming responses, function calling, tool use schemas, and prompt injection defense'
        ],
        tools: ['OpenAI API', 'Anthropic Claude', 'Google Gemini', 'Pydantic', 'Instructor']
      },
      {
        title: '5B.3 Production RAG (Retrieval-Augmented Generation)',
        items: [
          'Document ingestion, parsing (PDFs/HTML), and semantic chunking strategies',
          'Dense vector embeddings & Vector DBs: Chroma, Qdrant, Supabase pgvector',
          'Metadata filtering, hybrid search (BM25 keyword + dense semantic vector)',
          'Reranking models (Cohere Rerank) and query rewriting / multi-query expansion',
          'Context assembly, strict source citations, and hallucination guardrails'
        ],
        tools: ['Qdrant', 'Chroma', 'pgvector', 'Cohere Rerank', 'LangChain', 'LlamaIndex']
      },
      {
        title: '5B.4 AI Agents & Tool Calling',
        items: [
          'The ReAct loop: Thought → Action → Tool Call → Observation → Synthesis',
          'Stateful agent graphs: Node routing, cyclic loops, and state management (LangGraph)',
          'Workflow automation: Integrating APIs, webhooks, and agents (n8n)',
          'Human-in-the-loop approvals, defensive retry policies, and termination limits'
        ],
        tools: ['LangGraph', 'n8n', 'FastAPI', 'Pydantic']
      },
      {
        title: '5B.5 Evaluation, Observability & Reliability',
        items: [
          'Golden evaluation datasets (50–100 curated test cases with ground truth)',
          'Retrieval metrics: Hit Rate, MRR, Context Recall; Generation metrics: Faithfulness',
          'LLM-as-a-judge patterns and their limitations',
          'Tracing every LLM call, latency, cost per request, and error logging',
          'Prompt version control and regression test suites'
        ],
        tools: ['LangSmith', 'OpenTelemetry', 'MLflow Tracing', 'pytest']
      },
      {
        title: '5B.6 Production AI Engineering',
        items: [
          'FastAPI async backend, rate limiting, authentication, secrets management',
          'Redis caching for semantic queries and frequent prompt responses',
          'Background worker queues (Celery/ARQ) for heavy LLM operations',
          'Docker containerization and cloud hosting deployment'
        ],
        tools: ['FastAPI', 'Docker', 'Redis', 'PostgreSQL', 'Cloud Deploy']
      }
    ],
    buildProjects: [
      'Document Analysis Assistant: Ingests PDFs/webpages, returns validated JSON insights with citations',
      'Production Research Assistant (RAG): Answers questions over technical papers, shows sources, handles "I don\'t know", with benchmarked retrieval quality',
      'Autonomous Research Agent: Searches approved sources, compares findings, runs tool checks, asks human approval, and outputs a cited report',
      'AI Evaluation Harness: A 100-question test suite with LangSmith tracing proving Version 2 improves over Version 1'
    ],
    exitCondition: 'You can build a reliable production AI app and quantitatively prove that version 2 outperforms version 1 with an evaluation dataset.'
  },
  {
    id: 'phase-6',
    phaseNum: 'Phase 6',
    track: 'advanced',
    title: 'Fine-Tuning & Open-Source Models',
    duration: '4 to 8 weeks',
    tagline: 'Specialize models when prompt engineering and RAG reach their limits',
    description: 'Fine-tuning is powerful for latency reduction, specialized tone, or structured output compliance, but should be chosen when prompt/RAG is insufficient.',
    subsections: [
      {
        title: 'Techniques & Tooling',
        items: [
          'Pretraining vs Supervised Fine-Tuning (SFT) vs Instruction Tuning',
          'Parameter-Efficient Fine-Tuning (PEFT): LoRA (Low-Rank Adaptation) & QLoRA',
          'Dataset curation, cleaning, token balancing, and train/eval splits',
          'Quantization (4-bit, 8-bit / GGUF, AWQ, EXL2) for efficient local inference',
          'Local model runners: Ollama, vLLM, LM Studio, Transformers.js',
          'Rigorous evaluation: Comparing fine-tuned model against baseline on held-out benchmarks'
        ],
        tools: ['Hugging Face Transformers', 'PEFT', 'TRL', 'Ollama', 'vLLM', 'LM Studio']
      }
    ],
    buildProjects: [
      'Fine-tune a small open-source model (Llama-3 / Mistral 7B) using LoRA for a narrow domain: structured medical entity extraction or specific classification, benchmarked against GPT-4o-mini.'
    ],
    exitCondition: 'You can fine-tune a model with LoRA, measure its held-out test set accuracy against a prompt baseline, and explain the latency/cost trade-off.'
  },
  {
    id: 'phase-7',
    phaseNum: 'Phase 7',
    track: 'advanced',
    title: 'Advanced Specializations',
    duration: 'Ongoing',
    tagline: 'Specialize according to your long-term founder and engineering arena',
    description: 'Deepen into one or two frontier domains based on your long-term technical and venture ambition.',
    subsections: [
      {
        title: 'Specialization Arenas',
        items: [
          'ML / Deep Learning: Computer vision, speech, multimodal representations, reinforcement learning',
          'AI Systems: Advanced agent orchestration, compound AI systems, Model Context Protocol (MCP), inference engines',
          'Infrastructure: GPU cluster serving (vLLM, TensorRT-LLM), Kubernetes, distributed training',
          'Applied Research: Paper reproduction, novel architecture experimentation, ablation studies'
        ]
      }
    ],
    buildProjects: [
      'Reproduce a modern AI research paper or build a distributed high-throughput inference serving cluster.'
    ],
    exitCondition: 'You have deep domain mastery in your chosen arena and can build novel systems from first principles.'
  }
];

// 3. Realistic 12-Month Plan
export const TWELVE_MONTH_PLAN: MonthPlanItem[] = [
  { month: 1, focus: 'Python, Git, APIs, Terminal & Linux basics', output: '2 small Python projects (CLI tool + REST client)', keyMilestone: 'Solid coding velocity without tutorial hand-holding' },
  { month: 2, focus: 'NumPy, Pandas, SQL, Linear Algebra & Probability', output: 'Real-world data analysis project with EDA report', keyMilestone: 'Explain data anomalies and feature distributions' },
  { month: 3, focus: 'Classical ML algorithms & scikit-learn', output: 'End-to-end ML model with baseline & preprocessing', keyMilestone: 'Train & compare linear vs tree-based models' },
  { month: 4, focus: 'ML evaluation, metrics & model improvement', output: 'Model comparison & detailed error analysis notebook', keyMilestone: 'Explain why you chose Precision/Recall over Accuracy' },
  { month: 5, focus: 'Deep learning fundamentals & PyTorch', output: 'Neural network from scratch in NumPy + PyTorch classifier', keyMilestone: 'Debug a training loop and explain backpropagation' },
  { month: 6, focus: 'Transformers & LLM fundamentals', output: 'LLM API application with structured JSON output', keyMilestone: 'Mitigate hallucinations with strict schema validation' },
  { month: 7, focus: 'RAG, embeddings & vector databases', output: 'Document Q&A system with citations over custom papers', keyMilestone: 'Quantitatively benchmark retrieval precision (Recall@K)' },
  { month: 8, focus: 'AI agents, tool calling & state graphs', output: 'Multi-step tool-using agent with LangGraph / ReAct', keyMilestone: 'Implement safe retry logic and know when NOT to use an agent' },
  { month: 9, focus: 'Evals, observability & reliability', output: 'Evaluation harness with 50-100 questions & LangSmith traces', keyMilestone: 'Prove Version 2 is quantitatively better than Version 1' },
  { month: 10, focus: 'FastAPI, Docker & cloud deployment', output: 'Production-style deployed AI application with live URL', keyMilestone: 'Containerized service with authentication & latency logs' },
  { month: 11, focus: 'Fine-tuning or specialized MLOps', output: 'LoRA fine-tuned model or production MLOps pipeline', keyMilestone: 'Compare fine-tuned weights against prompt baseline' },
  { month: 12, focus: 'Capstone polish, portfolio & technical writing', output: '2 to 3 flagship systems with live URLs, video demos & code', keyMilestone: 'Job-ready & founder-ready: able to defend all architecture choices' }
];

// 4. The 5-Level Project Ladder
export const PROJECT_LADDER: ProjectLadderLevel[] = [
  {
    level: 1,
    name: 'Python + API Project',
    coreSkills: 'Clean code, error handling, JSON parsing, API authentication, Git',
    deliverable: 'CLI Expense Tracker or Data Ingestion Micro-Client',
    badge: 'Level 1: Builder'
  },
  {
    level: 2,
    name: 'Classical ML Project',
    coreSkills: 'Data cleaning, feature engineering, cross-validation, baseline comparison, metric trade-offs',
    deliverable: 'Patient Triage Risk Predictor or Customer Churn Model with Error Analysis',
    badge: 'Level 2: Modeler'
  },
  {
    level: 3,
    name: 'RAG Research Assistant',
    coreSkills: 'Semantic chunking, vector embeddings, similarity search, reranking, citation synthesis',
    deliverable: 'Knowledge Q&A Engine over Medical Guidelines or IITM Syllabus with Source Citations',
    badge: 'Level 3: Retriever'
  },
  {
    level: 4,
    name: 'Tool-Using AI Agent',
    coreSkills: 'ReAct loop, function calling, state management (LangGraph), memory, guardrails, human approval',
    deliverable: 'Autonomous Clinical Investigation Agent with Calculator & DB Tools',
    badge: 'Level 4: Orchestrator'
  },
  {
    level: 5,
    name: 'Production AI System',
    coreSkills: 'FastAPI, Docker, rate limiting, caching, evaluation harness, observability tracing, live deployment',
    deliverable: 'Flagship PatientTriage v2 Live Deployed Web App with 100-Question Evaluation Suite',
    badge: 'Level 5: Sovereign Engineer'
  }
];

// 5. The 2026 AI Stack (Tool Matrix)
export const AI_STACK_2026: AiStackLayer[] = [
  { layer: 'Programming', tools: ['Python 3.12+', 'SQL', 'Git / GitHub', 'uv / venv'], importance: 'Core daily foundation' },
  { layer: 'Data Processing', tools: ['NumPy', 'Pandas', 'DuckDB', 'dbt'], importance: 'Tabular manipulation & feature pipelines' },
  { layer: 'Classical ML', tools: ['scikit-learn', 'XGBoost', 'LightGBM'], importance: 'Predictive modeling on tabular data' },
  { layer: 'Deep Learning', tools: ['PyTorch', 'torchvision', 'CUDA'], importance: 'Neural network training & fine-tuning' },
  { layer: 'ML Tracking & Registry', tools: ['MLflow', 'Weights & Biases'], importance: 'Experiment tracking & model versioning' },
  { layer: 'LLM APIs', tools: ['OpenAI (GPT-4o/o3)', 'Anthropic (Claude 3.7)', 'Google (Gemini 2.0)'], importance: 'Frontier reasoning & synthesis' },
  { layer: 'Open-Source & Local Models', tools: ['Hugging Face Hub', 'Ollama', 'vLLM', 'LM Studio'], importance: 'Private, low-cost local model serving' },
  { layer: 'RAG & Retrieval', tools: ['Embeddings', 'Qdrant', 'Chroma', 'Supabase pgvector', 'Cohere Rerank'], importance: 'Grounded retrieval with citations' },
  { layer: 'Agent Workflows', tools: ['LangGraph', 'LangChain', 'Model Context Protocol (MCP)'], importance: 'Multi-step stateful reasoning loops' },
  { layer: 'Workflow Automation', tools: ['n8n', 'Zapier / Webhooks'], importance: 'Connecting AI triggers with existing software' },
  { layer: 'Backend Framework', tools: ['FastAPI', 'Pydantic', 'Uvicorn'], importance: 'High-performance typed async APIs' },
  { layer: 'Database & Storage', tools: ['PostgreSQL', 'Supabase', 'Redis (Caching)'], importance: 'State, user data, and semantic caching' },
  { layer: 'Deployment & Containers', tools: ['Docker', 'Render', 'AWS / GCP', 'GitHub Actions CI/CD'], importance: 'Packaging, CI/CD, and live hosting' },
  { layer: 'Observability & Evals', tools: ['LangSmith', 'OpenTelemetry', 'Prometheus', 'pytest'], importance: 'Tracing latency, cost, and output quality' }
];

// 6. Learn Early vs Later & Anti-Goals
export const LEARN_FIRST_VS_LATER = {
  learnEarly: [
    'Python & Clean Code', 'Git & GitHub workflows', 'SQL & Relational DBs',
    'NumPy, Pandas & EDA', 'Applied Statistics & ML Fundamentals',
    'Evaluation Metrics (Precision/Recall/F1/ROC-AUC)',
    'PyTorch basics & training loops', 'LLM APIs & Structured JSON Output',
    'Manual RAG (Chunking, Vector Search, Citations)', 'FastAPI & Docker basics'
  ],
  learnAfterYouCanBuild: [
    'Advanced Agent Frameworks (LangGraph multi-agent swarms)',
    'Fine-tuning with LoRA & QLoRA', 'Kubernetes & distributed training',
    'GPU inference optimization (vLLM, TensorRT-LLM)',
    'Advanced MLOps & automated retraining pipelines'
  ],
  antiGoals: [
    '❌ Collecting certificates instead of building working systems',
    '❌ Chasing every new hype framework of the week',
    '❌ Memorizing API parameter names instead of conceptual mechanics',
    '❌ Building ONLY basic chatbots without retrieval or evaluation',
    '❌ Training models without rigorous evaluation against baselines',
    '❌ Copying agent tutorials without understanding error handling or state'
  ]
};

// 7. Job-Ready Criteria for ML Engineer vs AI Engineer
export const JOB_READY_CRITERIA: JobReadyCriteria[] = [
  {
    role: 'ML Engineer',
    badge: 'Model & Data Lifecycle',
    criteria: [
      'Can clean, validate, and preprocess messy raw tabular data without data leakage',
      'Can train and compare multiple ML models (scikit-learn, XGBoost) against a baseline',
      'Can clearly articulate metric trade-offs (e.g. why Recall is critical in triage vs Accuracy)',
      'Can track experiments, hyperparameters, and artifacts systematically using MLflow',
      'Can package a model into a containerized FastAPI endpoint with input schema validation',
      'Can monitor data drift, concept drift, and performance degradation in production',
      'Can explain the entire end-to-end lifecycle from raw data ingestion to live prediction'
    ]
  },
  {
    role: 'AI Engineer',
    badge: 'Systems & LLM Reliability',
    criteria: [
      'Can integrate frontier LLM APIs with robust structured JSON outputs (Pydantic)',
      'Can implement an end-to-end RAG system with chunking, hybrid search, and citations',
      'Can build tool-using agents with defensive error handling and execution boundaries',
      'Can design prompts and context architectures that resist prompt injection attacks',
      'Can construct a golden evaluation dataset (50-100 questions) and run regression tests',
      'Can deploy an AI service in Docker with authentication, rate limiting, and caching',
      'Can trace latency, token cost, and failure rates with observability tooling (LangSmith)',
      'Can quantitatively prove that system version 2 outperforms version 1'
    ]
  }
];

// 8. The 6-Step Study Loop
export const STUDY_LOOP_STEPS = [
  { step: 1, title: 'Learn the Concept', desc: 'Read the core mental model without touching complex frameworks.' },
  { step: 2, title: 'Implement a Tiny Version', desc: 'Code a toy version from scratch (e.g., linear regression in NumPy, vector search with dot product).' },
  { step: 3, title: 'Use a Real Library', desc: 'Implement the production-grade standard (e.g., scikit-learn, PyTorch, Qdrant).' },
  { step: 4, title: 'Build a Practical Project', desc: 'Anchor it to a real user problem (e.g., PatientTriage risk model or paper Q&A assistant).' },
  { step: 5, title: 'Measure and Debug It', desc: 'Intentionally break it, inspect edge cases, measure metrics, and fix errors.' },
  { step: 6, title: 'Explain What You Learned', desc: 'Write a technical summary or README defending every key engineering choice.' }
];
