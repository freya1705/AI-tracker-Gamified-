export interface FreeResourceItem {
  id: string;
  sectionNum: string;
  sectionTitle: string;
  name: string;
  url: string;
  whyUseIt: string;
  type: 'Course' | 'Video' | 'Docs' | 'Book' | 'Paper' | 'Guide' | 'Tool';
  isStarterSet?: boolean;
  tag: string;
  stageIds: string[]; // Maps directly to ai-stage-1..17 or swe-dsa..swe-ai-bridge
  relevantKeywords?: string[];
}

export const FREE_RESOURCE_LIST: FreeResourceItem[] = [
  // 0. Programming
  {
    id: 'res-py-official',
    sectionNum: '0',
    sectionTitle: 'Programming',
    name: 'Python Official Tutorial',
    url: 'https://docs.python.org/3/tutorial/',
    whyUseIt: 'Solid base for functions, OOP, exceptions, and core Python data structures.',
    type: 'Docs',
    tag: 'Python',
    stageIds: ['ai-stage-2', 'swe-oop'],
    relevantKeywords: ['python', 'oop', 'exceptions', 'functions', 'generators']
  },
  {
    id: 'res-automate-boring',
    sectionNum: '0',
    sectionTitle: 'Programming',
    name: 'Automate the Boring Stuff with Python',
    url: 'https://automatetheboringstuff.com/',
    whyUseIt: 'File handling, regex, practical scripting, and web scraping essentials.',
    type: 'Book',
    tag: 'Practical Python',
    stageIds: ['ai-stage-2', 'ai-stage-10'],
    relevantKeywords: ['scripting', 'file', 'automation', 'scraping']
  },
  {
    id: 'res-pro-git',
    sectionNum: '0',
    sectionTitle: 'Programming & Version Control',
    name: 'Pro Git Book (Chacon & Straub)',
    url: 'https://git-scm.com/book/en/v2',
    whyUseIt: 'Git & GitHub, branch workflows, commits, remotes — 100% free & authoritative.',
    type: 'Book',
    tag: 'Git',
    stageIds: ['ai-stage-2', 'swe-se'],
    relevantKeywords: ['git', 'github', 'version control', 'commits', 'branches']
  },
  {
    id: 'res-kaggle-python',
    sectionNum: '0',
    sectionTitle: 'Programming',
    name: 'Kaggle Python Course',
    url: 'https://www.kaggle.com/learn/python',
    whyUseIt: 'Short, interactive, browser-based hands-on refresher.',
    type: 'Course',
    isStarterSet: true,
    tag: 'Kaggle',
    stageIds: ['ai-stage-2'],
    relevantKeywords: ['python', 'basics', 'syntax']
  },

  // 1. Math for AI
  {
    id: 'res-3b1b-linalg',
    sectionNum: '1',
    sectionTitle: 'Math for AI',
    name: '3Blue1Brown: Essence of Linear Algebra',
    url: 'https://www.3blue1brown.com/topics/linear-algebra',
    whyUseIt: 'Unmatched visual intuition for vectors, matrices, dot products, spans, and linear transformations.',
    type: 'Video',
    tag: 'Linear Algebra',
    stageIds: ['ai-stage-2', 'ai-stage-4', 'ai-stage-15'],
    relevantKeywords: ['linear algebra', 'vector', 'matrix', 'dot product', 'eigenvalues', 'matrices']
  },
  {
    id: 'res-statquest',
    sectionNum: '1',
    sectionTitle: 'Math for AI',
    name: 'StatQuest with Josh Starmer',
    url: 'https://www.youtube.com/@statquest',
    whyUseIt: 'Crystal-clear step-by-step breakdowns of statistics, probability, p-values, distributions, and ML basics.',
    type: 'Video',
    isStarterSet: true,
    tag: 'Statistics',
    stageIds: ['ai-stage-2', 'ai-stage-3', 'ai-stage-14'],
    relevantKeywords: ['statistics', 'probability', 'distribution', 'bayes', 'variance', 'hypothesis testing', 'p-value']
  },
  {
    id: 'res-khan-stats',
    sectionNum: '1',
    sectionTitle: 'Math for AI',
    name: 'Khan Academy: Statistics & Probability',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    whyUseIt: 'Structured practice problems on mean, variance, distributions, and Bayes Theorem.',
    type: 'Course',
    tag: 'Probability',
    stageIds: ['ai-stage-2'],
    relevantKeywords: ['statistics', 'probability', 'mean', 'median', 'bayes']
  },
  {
    id: 'res-3b1b-calc',
    sectionNum: '1',
    sectionTitle: 'Math for AI',
    name: '3Blue1Brown: Essence of Calculus',
    url: 'https://www.3blue1brown.com/topics/calculus',
    whyUseIt: 'Derivatives, gradients, and chain rule with geometrical clarity before training neural nets.',
    type: 'Video',
    tag: 'Calculus',
    stageIds: ['ai-stage-2', 'ai-stage-4', 'ai-stage-15'],
    relevantKeywords: ['calculus', 'gradient', 'derivative', 'chain rule', 'gradient descent']
  },

  // 2. AI Foundations
  {
    id: 'res-anthropic-agents',
    sectionNum: '2',
    sectionTitle: 'AI Foundations & Architecture',
    name: "Anthropic: Building Effective Agents",
    url: 'https://www.anthropic.com/engineering/building-effective-agents',
    whyUseIt: 'Practical engineering architecture of agents, workflow orchestration, and knowing when NOT to use them.',
    type: 'Guide',
    tag: 'Architecture',
    stageIds: ['ai-stage-1', 'ai-stage-8', 'ai-stage-13', 'ai-stage-17', 'swe-ai-bridge'],
    relevantKeywords: ['agent', 'architecture', 'heuristics', 'workflow', 'orchestration', 'react']
  },
  {
    id: 'res-karpathy-intro-llm',
    sectionNum: '2',
    sectionTitle: 'AI Foundations',
    name: 'Andrej Karpathy: Intro to Large Language Models',
    url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    whyUseIt: 'The single best 1-hour overview of how ChatGPT/Claude-style models are trained, tokenized, and operate.',
    type: 'Video',
    isStarterSet: true,
    tag: 'LLMs',
    stageIds: ['ai-stage-1', 'ai-stage-6'],
    relevantKeywords: ['llm', 'token', 'tokenization', 'context window', 'chatgpt', 'pretraining', 'generative ai']
  },

  // 3–4. NumPy & Pandas
  {
    id: 'res-kaggle-pandas',
    sectionNum: '3–4',
    sectionTitle: 'NumPy & Pandas',
    name: 'Kaggle Pandas Course',
    url: 'https://www.kaggle.com/learn/pandas',
    whyUseIt: 'Loading DataFrames, filtering, grouping, merging, and cleaning dirty tabular data.',
    type: 'Course',
    isStarterSet: true,
    tag: 'Pandas',
    stageIds: ['ai-stage-2'],
    relevantKeywords: ['pandas', 'dataframe', 'cleaning', 'missing values', 'filtering', 'groupby']
  },
  {
    id: 'res-numpy-pandas-docs',
    sectionNum: '3–4',
    sectionTitle: 'NumPy & Pandas',
    name: 'NumPy & Pandas Official Documentation',
    url: 'https://numpy.org/doc/stable/',
    whyUseIt: 'Quick API lookup for array slicing, vector broadcasting, aggregations, and reshaping.',
    type: 'Docs',
    tag: 'Reference',
    stageIds: ['ai-stage-2'],
    relevantKeywords: ['numpy', 'array', 'broadcasting', 'vectorization', 'matrix']
  },

  // 5. Visualization & EDA
  {
    id: 'res-kaggle-viz',
    sectionNum: '5',
    sectionTitle: 'Visualization & EDA',
    name: 'Kaggle Data Visualization Course',
    url: 'https://www.kaggle.com/learn/data-visualization',
    whyUseIt: 'Seaborn & Matplotlib charts: distributions, heatmaps, scatter plots, and spotting outliers.',
    type: 'Course',
    isStarterSet: true,
    tag: 'EDA',
    stageIds: ['ai-stage-2'],
    relevantKeywords: ['visualization', 'eda', 'matplotlib', 'seaborn', 'outliers', 'distribution']
  },

  // 6–9. ML Fundamentals & Evaluation
  {
    id: 'res-kaggle-ml',
    sectionNum: '6–9',
    sectionTitle: 'ML Fundamentals & Evaluation',
    name: 'Kaggle Intro & Intermediate Machine Learning',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    whyUseIt: 'End-to-end practical ML pipelines with Decision Trees, Random Forests, XGBoost, and validation splits.',
    type: 'Course',
    isStarterSet: true,
    tag: 'Kaggle',
    stageIds: ['ai-stage-3'],
    relevantKeywords: ['machine learning', 'decision trees', 'random forest', 'xgboost', 'gradient boosting', 'cross validation', 'overfitting']
  },
  {
    id: 'res-andrew-ng-ml',
    sectionNum: '6–9',
    sectionTitle: 'ML Fundamentals & Evaluation',
    name: "Andrew Ng's Machine Learning Specialization",
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    whyUseIt: 'Foundational mathematical theory behind linear/logistic regression, cost functions, and regularizations (audit free).',
    type: 'Course',
    isStarterSet: true,
    tag: 'Coursera',
    stageIds: ['ai-stage-3'],
    relevantKeywords: ['supervised learning', 'regression', 'logistic regression', 'cost function', 'regularization', 'lasso', 'ridge']
  },
  {
    id: 'res-sklearn-guide',
    sectionNum: '6–9',
    sectionTitle: 'ML Fundamentals & Evaluation',
    name: 'scikit-learn User Guide',
    url: 'https://scikit-learn.org/stable/user_guide.html',
    whyUseIt: 'Precision, Recall, ROC-AUC, PR-curves, calibration displays, and classification thresholds.',
    type: 'Docs',
    tag: 'Evaluation',
    stageIds: ['ai-stage-3', 'ai-stage-14'],
    relevantKeywords: ['precision', 'recall', 'f1', 'roc-auc', 'calibration', 'metrics', 'threshold', 'evaluation']
  },

  // 11–12. Deep Learning & PyTorch
  {
    id: 'res-fastai-dl',
    sectionNum: '11–12',
    sectionTitle: 'Deep Learning & PyTorch',
    name: 'fast.ai: Practical Deep Learning for Coders',
    url: 'https://course.fast.ai/',
    whyUseIt: 'Top-down, project-first deep learning curriculum with immediate hands-on results.',
    type: 'Course',
    isStarterSet: true,
    tag: 'Deep Learning',
    stageIds: ['ai-stage-4', 'ai-stage-11'],
    relevantKeywords: ['deep learning', 'neural network', 'cnn', 'transfer learning', 'fastai']
  },
  {
    id: 'res-pytorch-tutorials',
    sectionNum: '11–12',
    sectionTitle: 'Deep Learning & PyTorch',
    name: 'PyTorch Official Tutorials',
    url: 'https://docs.pytorch.org/tutorials/',
    whyUseIt: 'Tensors, autograd, nn.Module, DataLoaders, and writing clean custom training loops.',
    type: 'Docs',
    tag: 'PyTorch',
    stageIds: ['ai-stage-4'],
    relevantKeywords: ['pytorch', 'tensor', 'autograd', 'dataloader', 'training loop', 'optimizer']
  },
  {
    id: 'res-karpathy-nn-zero-to-hero',
    sectionNum: '11–12',
    sectionTitle: 'Deep Learning & PyTorch',
    name: 'Karpathy: Neural Networks: Zero to Hero',
    url: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
    whyUseIt: 'Writing micrograd & backpropagation from a blank python file. Unbeatable mental model.',
    type: 'Video',
    isStarterSet: true,
    tag: 'Internals',
    stageIds: ['ai-stage-4', 'ai-stage-15'],
    relevantKeywords: ['micrograd', 'backpropagation', 'derivatives', 'autograd', 'loss', 'internals']
  },

  // 13. Computer Vision
  {
    id: 'res-fastai-cv',
    sectionNum: '13',
    sectionTitle: 'Computer Vision',
    name: 'fast.ai Computer Vision Track',
    url: 'https://course.fast.ai/',
    whyUseIt: 'Covers Convolutional Neural Networks (CNNs), data augmentations, and transfer learning for vision.',
    type: 'Course',
    tag: 'Vision',
    stageIds: ['ai-stage-4', 'ai-stage-11'],
    relevantKeywords: ['computer vision', 'cnn', 'convolutional', 'image classification', 'transfer learning']
  },

  // 14–15. NLP & Transformers
  {
    id: 'res-hf-nlp',
    sectionNum: '14–15',
    sectionTitle: 'NLP & Transformers',
    name: 'Hugging Face NLP Course',
    url: 'https://huggingface.co/learn/nlp-course',
    whyUseIt: 'Tokenization, pretrained transformer pipelines, dataset tokenizers, and PyTorch fine-tuning.',
    type: 'Course',
    isStarterSet: true,
    tag: 'Hugging Face',
    stageIds: ['ai-stage-5', 'ai-stage-6'],
    relevantKeywords: ['nlp', 'transformers', 'tokenization', 'hugging face', 'bert', 'gpt']
  },
  {
    id: 'res-jay-alammar',
    sectionNum: '14–15',
    sectionTitle: 'NLP & Transformers',
    name: 'Jay Alammar: The Illustrated Transformer',
    url: 'https://jalammar.github.io/illustrated-transformer/',
    whyUseIt: 'The gold-standard visual walkthrough of Self-Attention, Encoders, Decoders, and QKV matrices.',
    type: 'Guide',
    tag: 'Visual',
    stageIds: ['ai-stage-5', 'ai-stage-15'],
    relevantKeywords: ['attention', 'self-attention', 'encoder', 'decoder', 'qkv', 'transformer']
  },
  {
    id: 'res-karpathy-gpt',
    sectionNum: '14–15',
    sectionTitle: 'NLP & Transformers',
    name: "Karpathy: Let's build GPT: from scratch, in code",
    url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
    whyUseIt: 'Building a nano-GPT transformer character-by-character in PyTorch with multi-head attention.',
    type: 'Video',
    isStarterSet: true,
    tag: 'PyTorch',
    stageIds: ['ai-stage-5', 'ai-stage-15'],
    relevantKeywords: ['gpt', 'transformer', 'multi-head attention', 'from scratch', 'pytorch']
  },
  {
    id: 'res-attention-paper',
    sectionNum: '14–15',
    sectionTitle: 'NLP & Transformers',
    name: '"Attention Is All You Need" (Vaswani et al.)',
    url: 'https://arxiv.org/abs/1706.03762',
    whyUseIt: 'The foundational 2017 paper that created modern AI. Read after gaining visual intuition.',
    type: 'Paper',
    tag: 'Original Paper',
    stageIds: ['ai-stage-5', 'ai-stage-15', 'ai-stage-16'],
    relevantKeywords: ['attention is all you need', 'vaswani', 'positional encoding', 'paper']
  },

  // 16–17. LLM Fundamentals & Engineering
  {
    id: 'res-deeplearning-short',
    sectionNum: '16–17',
    sectionTitle: 'LLM Fundamentals & Engineering',
    name: 'DeepLearning.AI Short Courses (Andrew Ng)',
    url: 'https://www.deeplearning.ai/short-courses/',
    whyUseIt: 'Free, 1-hour courses on Prompt Engineering, Structured JSON outputs, Function Calling, and LLM Evals.',
    type: 'Course',
    isStarterSet: true,
    tag: 'LLM Engineering',
    stageIds: ['ai-stage-6', 'ai-stage-14'],
    relevantKeywords: ['prompting', 'structured output', 'json', 'evals', 'llm api', 'guardrails', 'context management']
  },
  {
    id: 'res-anthropic-prompting',
    sectionNum: '16–17',
    sectionTitle: 'LLM Fundamentals & Engineering',
    name: 'Anthropic Prompt Engineering Interactive Docs',
    url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview',
    whyUseIt: 'System prompts, zero-shot, few-shot XML tagging, chain-of-thought, and deterministic output schemas.',
    type: 'Docs',
    isStarterSet: true,
    tag: 'Prompting',
    stageIds: ['ai-stage-6', 'ai-stage-14'],
    relevantKeywords: ['prompt engineering', 'few-shot', 'system prompt', 'chain of thought', 'structured output']
  },

  // 18. RAG
  {
    id: 'res-deeplearning-rag',
    sectionNum: '18',
    sectionTitle: 'RAG (Retrieval-Augmented Generation)',
    name: 'DeepLearning.AI RAG Short Courses',
    url: 'https://www.deeplearning.ai/short-courses/',
    whyUseIt: 'Chunking strategies, dense embeddings, vector search, reranking, and synthetic evaluation sets.',
    type: 'Course',
    isStarterSet: true,
    tag: 'RAG',
    stageIds: ['ai-stage-7'],
    relevantKeywords: ['rag', 'retrieval', 'chunking', 'embeddings', 'vector search', 'reranking', 'citations']
  },
  {
    id: 'res-llamaindex-docs',
    sectionNum: '18',
    sectionTitle: 'RAG (Retrieval-Augmented Generation)',
    name: 'LlamaIndex Documentation',
    url: 'https://docs.llamaindex.ai/',
    whyUseIt: 'Production data indexing, retrieval engines, citations, and evaluation benchmarks.',
    type: 'Docs',
    tag: 'Vector Search',
    stageIds: ['ai-stage-7'],
    relevantKeywords: ['llamaindex', 'vector database', 'indexing', 'retrieval', 'hybrid search']
  },
  {
    id: 'res-langchain-docs',
    sectionNum: '18',
    sectionTitle: 'RAG (Retrieval-Augmented Generation)',
    name: 'LangChain Documentation',
    url: 'https://python.langchain.com/',
    whyUseIt: 'Chain composability, document loaders, vector stores, and prompt templates.',
    type: 'Docs',
    tag: 'Framework',
    stageIds: ['ai-stage-7'],
    relevantKeywords: ['langchain', 'vector store', 'document loader', 'chains']
  },

  // 19. AI Agents
  {
    id: 'res-anthropic-tools',
    sectionNum: '19',
    sectionTitle: 'AI Agents',
    name: 'Anthropic Tool Use & Function Calling Guide',
    url: 'https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview',
    whyUseIt: 'Declaring tool schemas, handling tool inputs, executing external code, and error recovery in the agent loop.',
    type: 'Docs',
    tag: 'Function Calling',
    stageIds: ['ai-stage-8'],
    relevantKeywords: ['tool use', 'function calling', 'agent', 'react loop', 'memory', 'planning', 'tools']
  },

  // 20. Fine-Tuning
  {
    id: 'res-hf-peft',
    sectionNum: '20',
    sectionTitle: 'Fine-Tuning',
    name: 'Hugging Face PEFT Documentation (LoRA & QLoRA)',
    url: 'https://huggingface.co/docs/peft',
    whyUseIt: 'Parameter-Efficient Fine-Tuning: LoRA adapters, rank matrices, and training LLMs on consumer GPUs.',
    type: 'Docs',
    tag: 'LoRA',
    stageIds: ['ai-stage-9'],
    relevantKeywords: ['fine-tuning', 'peft', 'lora', 'qlora', 'sft', 'dpo', 'rlhf', 'adapters']
  },

  // 21. AI Automation
  {
    id: 'res-n8n-docs',
    sectionNum: '21',
    sectionTitle: 'AI Automation',
    name: 'n8n Workflow Automation Docs',
    url: 'https://docs.n8n.io/',
    whyUseIt: 'Self-hosted workflow automation connecting webhooks, LLMs, emails, and databases without lock-in.',
    type: 'Docs',
    tag: 'Automation',
    stageIds: ['ai-stage-10'],
    relevantKeywords: ['automation', 'n8n', 'workflow', 'webhooks', 'bots', 'integration']
  },

  // 22. Multimodal
  {
    id: 'res-hf-multimodal',
    sectionNum: '22',
    sectionTitle: 'Multimodal AI',
    name: 'Hugging Face Multimodal Tasks Guide',
    url: 'https://huggingface.co/docs/transformers/tasks/image_text_to_text',
    whyUseIt: 'Vision-Language Models (VLMs), image-to-text inference, and document understanding.',
    type: 'Docs',
    tag: 'Vision-Language',
    stageIds: ['ai-stage-11'],
    relevantKeywords: ['multimodal', 'vision-language', 'vlm', 'clip', 'speech', 'image generation', 'audio']
  },

  // 23. AI Engineering
  {
    id: 'res-fastapi-tutorial',
    sectionNum: '23',
    sectionTitle: 'AI Engineering & Production',
    name: 'FastAPI Official Tutorial',
    url: 'https://fastapi.tiangolo.com/tutorial/',
    whyUseIt: 'Building high-performance async API endpoints to serve your PyTorch and scikit-learn models.',
    type: 'Docs',
    tag: 'API Backend',
    stageIds: ['ai-stage-12', 'ai-stage-13', 'ai-stage-17', 'swe-ai-bridge'],
    relevantKeywords: ['fastapi', 'api', 'serving', 'inference', 'async', 'endpoints', 'deployment']
  },
  {
    id: 'res-docker-getting-started',
    sectionNum: '23',
    sectionTitle: 'AI Engineering & Production',
    name: 'Docker Getting Started Guide',
    url: 'https://docs.docker.com/get-started/',
    whyUseIt: 'Containerizing Python environments, CUDA runtimes, and dependencies into reproducible containers.',
    type: 'Docs',
    tag: 'Containers',
    stageIds: ['ai-stage-12', 'ai-stage-13', 'ai-stage-17', 'swe-se', 'swe-ai-bridge'],
    relevantKeywords: ['docker', 'container', 'dockerfile', 'cuda', 'reproducibility', 'deployment']
  },

  // 27. Advanced AI & Local Models
  {
    id: 'res-ollama-docs',
    sectionNum: '27',
    sectionTitle: 'Advanced AI & Local Models',
    name: 'Ollama Documentation',
    url: 'https://docs.ollama.com/',
    whyUseIt: 'Running open-weights models (Llama 3, Mistral, Qwen, DeepSeek) locally on your own machine.',
    type: 'Docs',
    tag: 'Local Models',
    stageIds: ['ai-stage-12'],
    relevantKeywords: ['ollama', 'local models', 'open weights', 'quantization', 'vllm']
  },

  // 28. Research
  {
    id: 'res-arxiv',
    sectionNum: '28',
    sectionTitle: 'AI Research & Papers',
    name: 'arXiv.org (Computer Science / AI)',
    url: 'https://arxiv.org/',
    whyUseIt: 'Finding cutting-edge preprints before conference publication.',
    type: 'Paper',
    tag: 'Preprints',
    stageIds: ['ai-stage-16'],
    relevantKeywords: ['arxiv', 'papers', 'literature', 'preprints', 'research']
  },
  {
    id: 'res-paperswithcode',
    sectionNum: '28',
    sectionTitle: 'AI Research & Papers',
    name: 'Papers With Code',
    url: 'https://paperswithcode.com/',
    whyUseIt: 'Finding academic papers paired with official GitHub implementations and SOTA leaderboards.',
    type: 'Tool',
    tag: 'Benchmarks',
    stageIds: ['ai-stage-16'],
    relevantKeywords: ['papers with code', 'benchmarks', 'reproducibility', 'sota', 'ablation']
  },

  // SWE Track Mapped Resources
  {
    id: 'res-leetcode',
    sectionNum: 'SWE',
    sectionTitle: 'DSA Practice',
    name: 'LeetCode Practice Arena',
    url: 'https://leetcode.com/problemset/',
    whyUseIt: 'The ultimate industry standard for coding patterns, arrays, graphs, and dynamic programming.',
    type: 'Tool',
    tag: 'DSA',
    isStarterSet: true,
    stageIds: ['swe-dsa'],
    relevantKeywords: ['leetcode', 'dsa', 'arrays', 'graphs', 'two pointers', 'dp', 'linked list', 'trees']
  },
  {
    id: 'res-neetcode',
    sectionNum: 'SWE',
    sectionTitle: 'DSA Practice',
    name: 'NeetCode 150 Roadmap',
    url: 'https://neetcode.io/roadmap',
    whyUseIt: 'Curated 150 essential DSA problems grouped by pattern with video explanations.',
    type: 'Course',
    tag: 'DSA',
    isStarterSet: true,
    stageIds: ['swe-dsa'],
    relevantKeywords: ['neetcode', 'roadmap', 'patterns', 'dsa']
  },
  {
    id: 'res-system-design-primer',
    sectionNum: 'SWE',
    sectionTitle: 'System Design',
    name: 'The System Design Primer (Donne Martin)',
    url: 'https://github.com/donnemartin/system-design-primer',
    whyUseIt: 'Scalability, microservices, caches, load balancing, message queues, and DB sharding.',
    type: 'Guide',
    tag: 'System Design',
    isStarterSet: true,
    stageIds: ['swe-sd', 'ai-stage-13'],
    relevantKeywords: ['system design', 'scalability', 'cache', 'sharding', 'microservices', 'load balancing']
  },
  {
    id: 'res-postgres-tutorial',
    sectionNum: 'SWE',
    sectionTitle: 'Database & SQL',
    name: 'PostgreSQL Official Documentation & Tutorial',
    url: 'https://www.postgresql.org/docs/current/tutorial.html',
    whyUseIt: 'Relational data modeling, indexes, ACID transactions, schema normalization, and SQL joins.',
    type: 'Docs',
    tag: 'SQL & DBMS',
    stageIds: ['swe-dbms'],
    relevantKeywords: ['sql', 'database', 'dbms', 'postgres', 'indexes', 'transactions', 'normalization']
  },
  {
    id: 'res-ostep',
    sectionNum: 'SWE',
    sectionTitle: 'Operating Systems',
    name: 'Operating Systems: Three Easy Pieces (OSTEP)',
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    whyUseIt: 'Virtualization, concurrency, threads, locks, memory management, and file systems (100% free).',
    type: 'Book',
    tag: 'Operating Systems',
    stageIds: ['swe-os'],
    relevantKeywords: ['operating system', 'concurrency', 'threads', 'processes', 'memory', 'virtualization']
  },
  {
    id: 'res-mooc-java',
    sectionNum: 'SWE',
    sectionTitle: 'Java & OOP',
    name: 'University of Helsinki: Java Programming MOOC',
    url: 'https://java-programming.mooc.fi/',
    whyUseIt: 'World-renowned hands-on free course for Core Java, OOP principles, collections, and streams.',
    type: 'Course',
    tag: 'Java & OOP',
    stageIds: ['swe-java', 'swe-oop'],
    relevantKeywords: ['java', 'oop', 'collections', 'polymorphism', 'inheritance', 'interfaces']
  }
];

export const STARTER_SET_SUMMARY = {
  title: 'Recommended Starter Set',
  description: 'Most of these are enough on their own — you do NOT need to study everything at once!',
  steps: [
    { name: 'Kaggle Courses', focus: 'Python, Pandas, Data Viz, Intro to ML', link: 'https://www.kaggle.com/learn' },
    { name: 'fast.ai', focus: 'Practical Deep Learning for Coders', link: 'https://course.fast.ai/' },
    { name: "Karpathy's Zero to Hero", focus: 'Neural networks, micrograd, and GPT from scratch', link: 'https://www.youtube.com/@AndrejKarpathy' },
    { name: 'DeepLearning.AI + Anthropic Docs', focus: 'LLMs, Prompt Engineering, RAG & Agents (once you reach World 6)', link: 'https://www.deeplearning.ai/short-courses/' },
  ]
};

// Helper: Get all mapped resources for a specific stage or pillar ID
export function getResourcesForStage(stageId: string): FreeResourceItem[] {
  return FREE_RESOURCE_LIST.filter(item => item.stageIds.includes(stageId));
}

// Helper: Get best matching resource for a specific topic
export function getBestResourceForTopic(topicTitle: string, stageId?: string): FreeResourceItem | null {
  const q = topicTitle.toLowerCase();

  // 1. Direct keyword match
  const keywordMatch = FREE_RESOURCE_LIST.find(item => {
    if (!item.relevantKeywords) return false;
    return item.relevantKeywords.some(kw => q.includes(kw.toLowerCase()));
  });
  if (keywordMatch) return keywordMatch;

  // 2. Stage fallback
  if (stageId) {
    const stageResources = getResourcesForStage(stageId);
    if (stageResources.length > 0) return stageResources[0];
  }

  return null;
}
