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
    tag: 'Python'
  },
  {
    id: 'res-automate-boring',
    sectionNum: '0',
    sectionTitle: 'Programming',
    name: 'Automate the Boring Stuff with Python',
    url: 'https://automatetheboringstuff.com/',
    whyUseIt: 'File handling, regex, practical scripting, and web scraping essentials.',
    type: 'Book',
    tag: 'Practical Python'
  },
  {
    id: 'res-pro-git',
    sectionNum: '0',
    sectionTitle: 'Programming',
    name: 'Pro Git Book (Chacon & Straub)',
    url: 'https://git-scm.com/book/en/v2',
    whyUseIt: 'Git & GitHub, branch workflows, commits, remotes — 100% free & authoritative.',
    type: 'Book',
    tag: 'Git'
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
    tag: 'Kaggle'
  },

  // 1. Math
  {
    id: 'res-3b1b-linalg',
    sectionNum: '1',
    sectionTitle: 'Math for AI',
    name: '3Blue1Brown: Essence of Linear Algebra',
    url: 'https://www.3blue1brown.com/topics/linear-algebra',
    whyUseIt: 'Unmatched visual intuition for vectors, matrices, dot products, spans, and linear transformations.',
    type: 'Video',
    tag: 'Linear Algebra'
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
    tag: 'Statistics'
  },
  {
    id: 'res-khan-stats',
    sectionNum: '1',
    sectionTitle: 'Math for AI',
    name: 'Khan Academy: Statistics & Probability',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    whyUseIt: 'Structured practice problems on mean, variance, distributions, and Bayes Theorem.',
    type: 'Course',
    tag: 'Probability'
  },
  {
    id: 'res-3b1b-calc',
    sectionNum: '1',
    sectionTitle: 'Math for AI',
    name: '3Blue1Brown: Essence of Calculus',
    url: 'https://www.3blue1brown.com/topics/calculus',
    whyUseIt: 'Derivatives, gradients, and chain rule with geometrical clarity before training neural nets.',
    type: 'Video',
    tag: 'Calculus'
  },

  // 2. AI Foundations
  {
    id: 'res-anthropic-agents',
    sectionNum: '2',
    sectionTitle: 'AI Foundations',
    name: "Anthropic: Building Effective Agents",
    url: 'https://www.anthropic.com/engineering/building-effective-agents',
    whyUseIt: 'Practical engineering architecture of agents, workflow orchestration, and knowing when NOT to use them.',
    type: 'Guide',
    tag: 'Architecture'
  },
  {
    id: 'res-karpathy-intro-llm',
    sectionNum: '2',
    sectionTitle: 'AI Foundations',
    name: 'Andrej Karpathy: Intro to Large Language Models',
    url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    whyUseIt: 'The single best 1-hour overview of how ChatGPT/Claude-style models are trained and operate.',
    type: 'Video',
    isStarterSet: true,
    tag: 'LLMs'
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
    tag: 'Pandas'
  },
  {
    id: 'res-numpy-pandas-docs',
    sectionNum: '3–4',
    sectionTitle: 'NumPy & Pandas',
    name: 'NumPy & Pandas Official Documentation',
    url: 'https://numpy.org/doc/stable/',
    whyUseIt: 'Quick API lookup for array slicing, vector broadcasting, aggregations, and reshaping.',
    type: 'Docs',
    tag: 'Reference'
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
    tag: 'EDA'
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
    tag: 'Kaggle'
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
    tag: 'Coursera'
  },
  {
    id: 'res-sklearn-guide',
    sectionNum: '6–9',
    sectionTitle: 'ML Fundamentals & Evaluation',
    name: 'scikit-learn User Guide',
    url: 'https://scikit-learn.org/stable/user_guide.html',
    whyUseIt: 'Precision, Recall, ROC-AUC, PR-curves, calibration displays, and classification thresholds.',
    type: 'Docs',
    tag: 'Evaluation'
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
    tag: 'Deep Learning'
  },
  {
    id: 'res-pytorch-tutorials',
    sectionNum: '11–12',
    sectionTitle: 'Deep Learning & PyTorch',
    name: 'PyTorch Official Tutorials',
    url: 'https://docs.pytorch.org/tutorials/',
    whyUseIt: 'Tensors, autograd, nn.Module, DataLoaders, and writing clean custom training loops.',
    type: 'Docs',
    tag: 'PyTorch'
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
    tag: 'Internals'
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
    tag: 'Vision'
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
    tag: 'Hugging Face'
  },
  {
    id: 'res-jay-alammar',
    sectionNum: '14–15',
    sectionTitle: 'NLP & Transformers',
    name: 'Jay Alammar: The Illustrated Transformer',
    url: 'https://jalammar.github.io/illustrated-transformer/',
    whyUseIt: 'The gold-standard visual walkthrough of Self-Attention, Encoders, Decoders, and QKV matrices.',
    type: 'Guide',
    tag: 'Visual'
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
    tag: 'PyTorch'
  },
  {
    id: 'res-attention-paper',
    sectionNum: '14–15',
    sectionTitle: 'NLP & Transformers',
    name: '"Attention Is All You Need" (Vaswani et al.)',
    url: 'https://arxiv.org/abs/1706.03762',
    whyUseIt: 'The foundational 2017 paper that created modern AI. Read after gaining visual intuition.',
    type: 'Paper',
    tag: 'Original Paper'
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
    tag: 'LLM Engineering'
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
    tag: 'Prompting'
  },

  // 18. RAG
  {
    id: 'res-deeplearning-rag',
    sectionNum: '18',
    sectionTitle: 'RAG (Retrieval Augmented Generation)',
    name: 'DeepLearning.AI RAG Short Courses',
    url: 'https://www.deeplearning.ai/short-courses/',
    whyUseIt: 'Chunking strategies, dense embeddings, vector search, reranking, and synthetic evaluation sets.',
    type: 'Course',
    isStarterSet: true,
    tag: 'RAG'
  },
  {
    id: 'res-llamaindex-docs',
    sectionNum: '18',
    sectionTitle: 'RAG (Retrieval Augmented Generation)',
    name: 'LlamaIndex Documentation',
    url: 'https://docs.llamaindex.ai/',
    whyUseIt: 'Production data indexing, retrieval engines, citations, and evaluation benchmarks.',
    type: 'Docs',
    tag: 'Vector Search'
  },
  {
    id: 'res-langchain-docs',
    sectionNum: '18',
    sectionTitle: 'RAG (Retrieval Augmented Generation)',
    name: 'LangChain Documentation',
    url: 'https://python.langchain.com/',
    whyUseIt: 'Chain composability, document loaders, vector stores, and prompt templates.',
    type: 'Docs',
    tag: 'Framework'
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
    tag: 'Function Calling'
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
    tag: 'LoRA'
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
    tag: 'Automation'
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
    tag: 'Vision-Language'
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
    tag: 'API Backend'
  },
  {
    id: 'res-docker-getting-started',
    sectionNum: '23',
    sectionTitle: 'AI Engineering & Production',
    name: 'Docker Getting Started Guide',
    url: 'https://docs.docker.com/get-started/',
    whyUseIt: 'Containerizing Python environments, CUDA runtimes, and dependencies into reproducible containers.',
    type: 'Docs',
    tag: 'Containers'
  },

  // 27. Advanced AI
  {
    id: 'res-ollama-docs',
    sectionNum: '27',
    sectionTitle: 'Advanced AI & Local Models',
    name: 'Ollama Documentation',
    url: 'https://docs.ollama.com/',
    whyUseIt: 'Running open-weights models (Llama 3, Mistral, Qwen, DeepSeek) locally on your own machine.',
    type: 'Docs',
    tag: 'Local Models'
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
    tag: 'Preprints'
  },
  {
    id: 'res-paperswithcode',
    sectionNum: '28',
    sectionTitle: 'AI Research & Papers',
    name: 'Papers With Code',
    url: 'https://paperswithcode.com/',
    whyUseIt: 'Finding academic papers paired with official GitHub implementations and SOTA leaderboards.',
    type: 'Tool',
    tag: 'Benchmarks'
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
