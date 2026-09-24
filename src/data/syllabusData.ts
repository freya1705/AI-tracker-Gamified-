import { SyllabusModule, SwePillar } from '../types';

export const MASTER_AI_MODULES: SyllabusModule[] = [
  {
    "index": 1,
    "id": "ai-stage-1",
    "title": "1. AI Foundations",
    "category": "ai",
    "icon": "💡",
    "approxTime": "2–3 weeks",
    "minWeeks": 2,
    "maxWeeks": 3,
    "description": "Mental models of AI, LLMs, embeddings, tokens, reasoning limitations, models vs applications, and frontier tools.",
    "topics": [
      {
        "id": "ai-1-1",
        "title": "What is AI? (Heuristics vs Machine Learning)",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Compare deterministic heuristic rules with learned statistical models.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of What is AI? (Heuristics vs Machine Learning) without looking at notes.",
        "whyItMatters": "Understand when machine intelligence is appropriate vs simple code."
      },
      {
        "id": "ai-1-2",
        "title": "Machine Learning (Learning from Empirical Data)",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Demonstrate a line of best fit minimizing square residuals.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Machine Learning (Learning from Empirical Data) without looking at notes.",
        "whyItMatters": "The foundation of data-driven prediction."
      },
      {
        "id": "ai-1-3",
        "title": "Deep Learning (Hierarchical Representation Learning)",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Contrast manual feature extraction with multi-layer neural representations.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Deep Learning (Hierarchical Representation Learning) without looking at notes.",
        "whyItMatters": "Powers modern computer vision, audio, and language understanding."
      },
      {
        "id": "ai-1-4",
        "title": "Generative AI (Sampling Distributions & Synthesis)",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Explain how probability distributions generate novel text, audio, and images.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Generative AI (Sampling Distributions & Synthesis) without looking at notes.",
        "whyItMatters": "Shift from classification/regression to autonomous synthesis."
      },
      {
        "id": "ai-1-5",
        "title": "Large Language Models (LLMs & Next-Token Prediction)",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Trace autoregressive token generation probability distributions.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Large Language Models (LLMs & Next-Token Prediction) without looking at notes.",
        "whyItMatters": "The foundation model paradigm driving modern AI development."
      },
      {
        "id": "ai-1-6",
        "title": "Tokens & Tokenization Mechanics",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Tokenize text across languages and inspect subword boundary splits.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Tokens & Tokenization Mechanics without looking at notes.",
        "whyItMatters": "Tokens govern billing, context window capacity, and vocabulary coverage."
      },
      {
        "id": "ai-1-7",
        "title": "Context Window Limits & KV-Cache",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Calculate memory consumption of context windows up to 1M tokens.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Context Window Limits & KV-Cache without looking at notes.",
        "whyItMatters": "Governs model working memory, latency, and operational costs."
      },
      {
        "id": "ai-1-8",
        "title": "Embeddings (Mapping Concepts to Semantic Coordinates)",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Generate embeddings and compute cosine similarity between related concepts.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Embeddings (Mapping Concepts to Semantic Coordinates) without looking at notes.",
        "whyItMatters": "Vectors turn unstructured words into mathematical geometry."
      },
      {
        "id": "ai-1-9",
        "title": "Reasoning Limitations & Probabilistic Fallibility",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Document classic reasoning traps where LLMs fail deterministic math or logic.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Reasoning Limitations & Probabilistic Fallibility without looking at notes.",
        "whyItMatters": "Never assume an LLM is a deterministic calculator."
      },
      {
        "id": "ai-1-10",
        "title": "AI Models vs AI Applications",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Diagram raw foundation model weights vs production application wrappers.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of AI Models vs AI Applications without looking at notes.",
        "whyItMatters": "Software engineering transforms raw models into useful products."
      },
      {
        "id": "ai-1-11",
        "title": "Frontier AI Tools Landscape (ChatGPT, Claude, Gemini, DeepSeek)",
        "moduleIndex": 1,
        "moduleName": "1. AI Foundations",
        "category": "ai",
        "suggestedCodeTask": "Benchmark identical prompts across Gemini, Claude, and GPT-4o.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Frontier AI Tools Landscape (ChatGPT, Claude, Gemini, DeepSeek) without looking at notes.",
        "whyItMatters": "Know the strengths and cost profiles of modern commercial models."
      }
    ]
  },
  {
    "index": 2,
    "id": "ai-stage-2",
    "title": "2. Python + Data",
    "category": "ai",
    "icon": "🐍",
    "approxTime": "4–7 weeks",
    "minWeeks": 4,
    "maxWeeks": 7,
    "description": "Python for AI, NumPy, Pandas, Data Cleaning, Visualization, EDA, and essential Statistics, Probability, & Linear Algebra.",
    "topics": [
      {
        "id": "ai-2-1",
        "title": "Python for AI (OOP, Functions, File I/O, Generators)",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Write modular clean Python scripts streaming large files line-by-line.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Python for AI (OOP, Functions, File I/O, Generators) without looking at notes.",
        "whyItMatters": "The universal language of modern AI engineering."
      },
      {
        "id": "ai-2-2",
        "title": "NumPy (Vectorization, Broadcasting, Matrix Math)",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Benchmark vectorized Euclidean distance vs pure Python for-loops.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of NumPy (Vectorization, Broadcasting, Matrix Math) without looking at notes.",
        "whyItMatters": "50x speedup running on optimized C/BLAS routines."
      },
      {
        "id": "ai-2-3",
        "title": "Pandas (Series, DataFrames, Groupby, Joins)",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Clean and aggregate multi-table hospital or finance records with groupby().",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Pandas (Series, DataFrames, Groupby, Joins) without looking at notes.",
        "whyItMatters": "The industry-standard container for tabular data manipulation."
      },
      {
        "id": "ai-2-4",
        "title": "Data Cleaning & Handling Missing Values",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Compare imputation strategies: dropna vs median/mode/KNNImputer.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Data Cleaning & Handling Missing Values without looking at notes.",
        "whyItMatters": "Dirty data breaks downstream models; 80% of data science is cleaning."
      },
      {
        "id": "ai-2-5",
        "title": "Data Visualization (Matplotlib & Seaborn)",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Create publication-ready multi-panel plots with clean color palettes.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Data Visualization (Matplotlib & Seaborn) without looking at notes.",
        "whyItMatters": "Visual pattern discovery reveals distributions and anomalies."
      },
      {
        "id": "ai-2-6",
        "title": "Exploratory Data Analysis (EDA) Workflow",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Conduct comprehensive EDA reporting skew, correlations, and outliers.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Exploratory Data Analysis (EDA) Workflow without looking at notes.",
        "whyItMatters": "Never train a model on data you haven't thoroughly visualized."
      },
      {
        "id": "ai-2-7",
        "title": "Statistics (Mean, Median, Variance, Z-Scores, Hypothesis Testing)",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Compute summary metrics and run two-sample t-test for statistical significance.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Statistics (Mean, Median, Variance, Z-Scores, Hypothesis Testing) without looking at notes.",
        "whyItMatters": "Proves whether a 2% metric improvement is statistically real."
      },
      {
        "id": "ai-2-8",
        "title": "Probability (Conditionals, Bayes Theorem, Distributions)",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Implement Bayes rule to update disease risk probabilities with test evidence.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Probability (Conditionals, Bayes Theorem, Distributions) without looking at notes.",
        "whyItMatters": "AI models predict probability distributions, not certainties."
      },
      {
        "id": "ai-2-9",
        "title": "Linear Algebra Basics (Vectors, Matrices, Dot Products, Eigenvalues)",
        "moduleIndex": 2,
        "moduleName": "2. Python + Data",
        "category": "ai",
        "suggestedCodeTask": "Implement matrix-matrix multiplication and compute covariance eigenvalues.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Linear Algebra Basics (Vectors, Matrices, Dot Products, Eigenvalues) without looking at notes.",
        "whyItMatters": "The mathematical language of neural weights and embeddings."
      }
    ]
  },
  {
    "index": 3,
    "id": "ai-stage-3",
    "title": "3. Machine Learning",
    "category": "ai",
    "icon": "⚙️",
    "approxTime": "7–10 weeks",
    "minWeeks": 7,
    "maxWeeks": 10,
    "description": "Supervised & unsupervised learning, tree ensembles, feature engineering, evaluation, calibration, and error analysis.",
    "topics": [
      {
        "id": "ai-3-1",
        "title": "Supervised Learning (Regression vs Classification)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Structure input matrix X and target y for continuous vs discrete prediction.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Supervised Learning (Regression vs Classification) without looking at notes.",
        "whyItMatters": "The primary machine learning paradigm for historical prediction."
      },
      {
        "id": "ai-3-2",
        "title": "Unsupervised Learning (Finding Hidden Structure)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Group unlabeled patient records into risk clusters using spatial geometry.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Unsupervised Learning (Finding Hidden Structure) without looking at notes.",
        "whyItMatters": "Discovers patterns when target labels are absent."
      },
      {
        "id": "ai-3-3",
        "title": "Regression Algorithms (Linear, Ridge, Lasso)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Fit Ridge and Lasso regressions; observe weight shrinkage regularization.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Regression Algorithms (Linear, Ridge, Lasso) without looking at notes.",
        "whyItMatters": "Interpretable continuous baseline models."
      },
      {
        "id": "ai-3-4",
        "title": "Classification Algorithms (Logistic Regression, KNN, Naive Bayes)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Code sigmoid activation and log-loss cost function from scratch.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Classification Algorithms (Logistic Regression, KNN, Naive Bayes) without looking at notes.",
        "whyItMatters": "The industry-standard foundation for sorting cases into classes."
      },
      {
        "id": "ai-3-5",
        "title": "Decision Trees & Information Gain",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Calculate Gini impurity and Shannon entropy for candidate split points.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Decision Trees & Information Gain without looking at notes.",
        "whyItMatters": "Highly explainable; forms the building block of all tree ensembles."
      },
      {
        "id": "ai-3-6",
        "title": "Random Forest (Bagging & Subsampling)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Train 100 bootstrapped trees and average their probabilistic predictions.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Random Forest (Bagging & Subsampling) without looking at notes.",
        "whyItMatters": "Robust out-of-the-box performance with low variance."
      },
      {
        "id": "ai-3-7",
        "title": "Gradient Boosting (XGBoost, LightGBM, CatBoost)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Fit consecutive weak trees to the residual errors of prior trees.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Gradient Boosting (XGBoost, LightGBM, CatBoost) without looking at notes.",
        "whyItMatters": "State-of-the-art accuracy on tabular production benchmarks."
      },
      {
        "id": "ai-3-8",
        "title": "Clustering (K-Means, Hierarchical Linkage)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Implement K-Means centroid initialization, assignment, and updates.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Clustering (K-Means, Hierarchical Linkage) without looking at notes.",
        "whyItMatters": "Fast grouping of customer or patient cohorts."
      },
      {
        "id": "ai-3-9",
        "title": "Feature Engineering (Encoding, Scaling, Transformations)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Apply One-Hot Encoding, StandardScaler, and log1p transformations.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Feature Engineering (Encoding, Scaling, Transformations) without looking at notes.",
        "whyItMatters": "Transforming raw variables into predictive signals creates 90% of model lift."
      },
      {
        "id": "ai-3-10",
        "title": "Train / Validation / Test Splits (Preventing Leakage)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Enforce strict 70/15/15 stratified split; fit transformers only on train.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Train / Validation / Test Splits (Preventing Leakage) without looking at notes.",
        "whyItMatters": "Leakage produces fake high scores that collapse in production."
      },
      {
        "id": "ai-3-11",
        "title": "Overfitting vs Underfitting (Bias-Variance Trade-off)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Plot train vs validation loss curves across model capacity changes.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Overfitting vs Underfitting (Bias-Variance Trade-off) without looking at notes.",
        "whyItMatters": "The central balancing act of every machine learning engineer."
      },
      {
        "id": "ai-3-12",
        "title": "Regularization Techniques (L1, L2, Early Stopping)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Apply penalty terms to cost functions to prevent over-reliance on noisy weights.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Regularization Techniques (L1, L2, Early Stopping) without looking at notes.",
        "whyItMatters": "Keeps models simple and generalizable."
      },
      {
        "id": "ai-3-13",
        "title": "Model Evaluation (Confusion Matrix, Accuracy Limits)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Construct 2x2 confusion matrix and demonstrate accuracy paradox on imbalanced data.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Model Evaluation (Confusion Matrix, Accuracy Limits) without looking at notes.",
        "whyItMatters": "Accuracy is useless on rare events like medical emergencies or fraud."
      },
      {
        "id": "ai-3-14",
        "title": "Precision, Recall, & F1 Score Trade-offs",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Plot precision vs recall across decision thresholds; compute harmonic mean F1.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Precision, Recall, & F1 Score Trade-offs without looking at notes.",
        "whyItMatters": "Balancing false alarms against missed life-critical cases."
      },
      {
        "id": "ai-3-15",
        "title": "ROC-AUC & PR-AUC Curves",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Plot ROC and PR curves; interpret ranking capability independent of threshold.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of ROC-AUC & PR-AUC Curves without looking at notes.",
        "whyItMatters": "Evaluates ranking quality across all operating points."
      },
      {
        "id": "ai-3-16",
        "title": "Probability Calibration (Platt Scaling, Brier Score)",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Plot reliability calibration curve; ensure predicted 80% happens 80% of the time.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Probability Calibration (Platt Scaling, Brier Score) without looking at notes.",
        "whyItMatters": "Essential when predictions drive high-stakes clinical decisions."
      },
      {
        "id": "ai-3-17",
        "title": "Systematic Error Analysis & Slicing",
        "moduleIndex": 3,
        "moduleName": "3. Machine Learning",
        "category": "ai",
        "suggestedCodeTask": "Slice test set errors by subgroup and extract common failure patterns.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Systematic Error Analysis & Slicing without looking at notes.",
        "whyItMatters": "Reveals where data collection or feature engineering needs work."
      }
    ]
  },
  {
    "index": 4,
    "id": "ai-stage-4",
    "title": "4. Deep Learning",
    "category": "ai",
    "icon": "🧠",
    "approxTime": "4–6 weeks",
    "minWeeks": 4,
    "maxWeeks": 6,
    "description": "Neural networks, activations, loss functions, backprop, optimizers, training loops, PyTorch, CNNs, and transfer learning.",
    "topics": [
      {
        "id": "ai-4-1",
        "title": "Neural Networks Architecture & Perceptrons",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Chain linear layers to solve non-linear XOR boundary in pure code.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Neural Networks Architecture & Perceptrons without looking at notes.",
        "whyItMatters": "Multi-layer networks learn complex non-linear representations."
      },
      {
        "id": "ai-4-2",
        "title": "Activation Functions (ReLU, GELU, Sigmoid, Softmax)",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Plot activations and their derivatives side-by-side.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Activation Functions (ReLU, GELU, Sigmoid, Softmax) without looking at notes.",
        "whyItMatters": "Introduces non-linearity; without activations, deep nets collapse to 1 linear layer."
      },
      {
        "id": "ai-4-3",
        "title": "Loss Functions (MSE, Binary Cross-Entropy, Categorical Cross-Entropy)",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Implement cross-entropy loss with numerical log-sum-exp stabilization.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Loss Functions (MSE, Binary Cross-Entropy, Categorical Cross-Entropy) without looking at notes.",
        "whyItMatters": "Measures mathematical discrepancy between predictions and ground truth."
      },
      {
        "id": "ai-4-4",
        "title": "Gradient Descent (Batch, Mini-batch, Stochastic)",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Implement mini-batch loop and observe loss variance vs convergence speed.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Gradient Descent (Batch, Mini-batch, Stochastic) without looking at notes.",
        "whyItMatters": "Balances GPU parallel throughput with regularizing stochastic noise."
      },
      {
        "id": "ai-4-5",
        "title": "Backpropagation & Computational Graphs",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Manually trace backprop gradients through a 2-layer computational graph.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Backpropagation & Computational Graphs without looking at notes.",
        "whyItMatters": "The core algorithm enabling deep learning to train millions of weights."
      },
      {
        "id": "ai-4-6",
        "title": "Optimizers (SGD, Momentum, RMSprop, AdamW)",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Implement momentum step v = beta*v + (1-beta)*grad in NumPy.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Optimizers (SGD, Momentum, RMSprop, AdamW) without looking at notes.",
        "whyItMatters": "Adaptive learning rates accelerate convergence through loss plateaus."
      },
      {
        "id": "ai-4-7",
        "title": "Canonical Training & Validation Loops",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Write full loop: zero_grad() -> forward -> loss -> backward() -> step().",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Canonical Training & Validation Loops without looking at notes.",
        "whyItMatters": "Essential skill: you must be able to write this from a blank file."
      },
      {
        "id": "ai-4-8",
        "title": "PyTorch Mastery (Tensors, Datasets, DataLoaders, nn.Module)",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Subclass Dataset and nn.Module with clean device management (.to(device)).",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of PyTorch Mastery (Tensors, Datasets, DataLoaders, nn.Module) without looking at notes.",
        "whyItMatters": "The standard framework for modern AI research and production."
      },
      {
        "id": "ai-4-9",
        "title": "Convolutional Neural Networks (CNNs)",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Build a Conv2D + BatchNorm + ReLU + MaxPool architecture for image classification.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Convolutional Neural Networks (CNNs) without looking at notes.",
        "whyItMatters": "Spatial weight sharing extracts localized translation-invariant visual features."
      },
      {
        "id": "ai-4-10",
        "title": "Transfer Learning & Fine-tuning Vision Backbones",
        "moduleIndex": 4,
        "moduleName": "4. Deep Learning",
        "category": "ai",
        "suggestedCodeTask": "Freeze pretrained ResNet backbone weights and replace head layer for custom dataset.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Transfer Learning & Fine-tuning Vision Backbones without looking at notes.",
        "whyItMatters": "Achieve high accuracy on small datasets using pretrained features."
      }
    ]
  },
  {
    "index": 5,
    "id": "ai-stage-5",
    "title": "5. Transformers + NLP",
    "category": "ai",
    "icon": "⚡",
    "approxTime": "2–3 weeks",
    "minWeeks": 2,
    "maxWeeks": 3,
    "description": "NLP basics, subword tokenization, word embeddings, attention, self-attention, and encoder/decoder architectures.",
    "topics": [
      {
        "id": "ai-5-1",
        "title": "NLP Basics & Text Preprocessing Pipelines",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Clean unstructured text with regex, normalization, and stop-word analysis.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of NLP Basics & Text Preprocessing Pipelines without looking at notes.",
        "whyItMatters": "Prepares raw text for numerical vector representation."
      },
      {
        "id": "ai-5-2",
        "title": "Subword Tokenization (BPE, WordPiece, SentencePiece)",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Inspect Byte-Pair Encoding subword splits on technical medical vocabulary.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Subword Tokenization (BPE, WordPiece, SentencePiece) without looking at notes.",
        "whyItMatters": "Solves out-of-vocabulary words cleanly without massive dictionaries."
      },
      {
        "id": "ai-5-3",
        "title": "Word Embeddings (Word2Vec, FastText, GloVe)",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Load pretrained word vectors; verify vector math: king - man + woman = queen.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Word Embeddings (Word2Vec, FastText, GloVe) without looking at notes.",
        "whyItMatters": "Maps words into dense geometric space where semantic concepts cluster."
      },
      {
        "id": "ai-5-4",
        "title": "The Attention Mechanism Concept",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Explain Attention as a soft fuzzy lookup into a key-value memory database.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of The Attention Mechanism Concept without looking at notes.",
        "whyItMatters": "Allows tokens to dynamically focus on other relevant tokens."
      },
      {
        "id": "ai-5-5",
        "title": "Scaled Dot-Product Self-Attention Math",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Implement softmax(Q K^T / sqrt(d_k)) V in pure NumPy.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Scaled Dot-Product Self-Attention Math without looking at notes.",
        "whyItMatters": "The single most important equation in modern generative AI."
      },
      {
        "id": "ai-5-6",
        "title": "The Transformer Architecture (Why Transformers Won)",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Contrast O(1) sequential step count of Attention vs O(N) of RNNs.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of The Transformer Architecture (Why Transformers Won) without looking at notes.",
        "whyItMatters": "Parallelizes compute across GPU clusters on web-scale datasets."
      },
      {
        "id": "ai-5-7",
        "title": "Encoder vs Decoder Architectures (BERT vs GPT)",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Compare bidirectional attention masks with causal lower-triangular masks.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Encoder vs Decoder Architectures (BERT vs GPT) without looking at notes.",
        "whyItMatters": "Encoders excel at understanding; Decoders excel at generation."
      },
      {
        "id": "ai-5-8",
        "title": "Positional Encoding (Sinusoidal & RoPE)",
        "moduleIndex": 5,
        "moduleName": "5. Transformers + NLP",
        "category": "ai",
        "suggestedCodeTask": "Compute sinusoidal positional encodings and add to token embeddings.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Positional Encoding (Sinusoidal & RoPE) without looking at notes.",
        "whyItMatters": "Transformers have no inherent sense of word order without position vectors."
      }
    ]
  },
  {
    "index": 6,
    "id": "ai-stage-6",
    "title": "6. LLM Engineering",
    "category": "ai",
    "icon": "🤖",
    "approxTime": "2–3 weeks",
    "minWeeks": 2,
    "maxWeeks": 3,
    "description": "LLM APIs, prompt engineering, structured JSON outputs, function calling, hallucinations, evaluation, and latency economics.",
    "topics": [
      {
        "id": "ai-6-1",
        "title": "LLM API Integration & Robust Clients (Gemini, OpenAI, Anthropic)",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Build production API client with exponential backoff and timeout fallbacks.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of LLM API Integration & Robust Clients (Gemini, OpenAI, Anthropic) without looking at notes.",
        "whyItMatters": "Commercial APIs rate-limit and occasionally drop requests."
      },
      {
        "id": "ai-6-2",
        "title": "Prompt Engineering Principles & System Roles",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Structure prompt with role, context, constraints, few-shot examples, and format.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Prompt Engineering Principles & System Roles without looking at notes.",
        "whyItMatters": "Dramatically improves model output reliability without changing code."
      },
      {
        "id": "ai-6-3",
        "title": "Zero-Shot vs Few-Shot Prompting Patterns",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Compare zero-shot reasoning vs providing 3 domain exemplar demonstrations.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Zero-Shot vs Few-Shot Prompting Patterns without looking at notes.",
        "whyItMatters": "Few-shot in-context learning steers output style with surgical precision."
      },
      {
        "id": "ai-6-4",
        "title": "Structured Output with Schema Validation (JSON / Pydantic)",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Force LLM to respond in validated Pydantic schema with retry on parse error.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Structured Output with Schema Validation (JSON / Pydantic) without looking at notes.",
        "whyItMatters": "AI systems must produce machine-readable data, not chatty markdown."
      },
      {
        "id": "ai-6-5",
        "title": "Context Window Management & Compaction",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Implement sliding window context pruning and conversation summarization.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Context Window Management & Compaction without looking at notes.",
        "whyItMatters": "Prevents context overflow while preserving essential state."
      },
      {
        "id": "ai-6-6",
        "title": "Function Calling & Tool Declarations",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Declare JSON schema tool and parse LLM tool_call argument payloads.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Function Calling & Tool Declarations without looking at notes.",
        "whyItMatters": "Transforms language models into autonomous systems that take action."
      },
      {
        "id": "ai-6-7",
        "title": "Hallucination Detection & Mitigation Strategies",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Implement citation grounding and temperature=0 for fact-critical tasks.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Hallucination Detection & Mitigation Strategies without looking at notes.",
        "whyItMatters": "Models generate fluent untruths if unconstrained."
      },
      {
        "id": "ai-6-8",
        "title": "LLM Evaluation & Benchmarking (LLM-as-a-Judge)",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Write evaluation prompt scoring model outputs on factual accuracy 1-5.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of LLM Evaluation & Benchmarking (LLM-as-a-Judge) without looking at notes.",
        "whyItMatters": "Automates testing against regression when prompts change."
      },
      {
        "id": "ai-6-9",
        "title": "Cost, Latency, & Token Economics",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Calculate dollar cost per 10k requests and optimize token lengths.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Cost, Latency, & Token Economics without looking at notes.",
        "whyItMatters": "Engineers build high-value systems within sustainable budgets."
      },
      {
        "id": "ai-6-10",
        "title": "Model Routing (Tiered Architecture: Small vs Flagship)",
        "moduleIndex": 6,
        "moduleName": "6. LLM Engineering",
        "category": "ai",
        "suggestedCodeTask": "Route easy queries to small model (Flash/Haiku) and hard to flagship.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Model Routing (Tiered Architecture: Small vs Flagship) without looking at notes.",
        "whyItMatters": "Cuts commercial LLM API bills by 80% with zero quality loss."
      }
    ]
  },
  {
    "index": 7,
    "id": "ai-stage-7",
    "title": "7. RAG (Retrieval-Augmented Generation)",
    "category": "ai",
    "icon": "📚",
    "approxTime": "3–4 weeks",
    "minWeeks": 3,
    "maxWeeks": 4,
    "description": "Embeddings, chunking strategies, vector databases, similarity search, retrieval, reranking, citations, and evaluation.",
    "topics": [
      {
        "id": "ai-7-1",
        "title": "Why RAG? (Parametric vs Non-Parametric Memory)",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Contrast retrieval over private docs vs expensive static model weights.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Why RAG? (Parametric vs Non-Parametric Memory) without looking at notes.",
        "whyItMatters": "Prevents hallucinations and allows real-time knowledge updates."
      },
      {
        "id": "ai-7-2",
        "title": "Dense Vector Embeddings & Similarity Math",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Generate embeddings and rank document chunks using cosine similarity.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Dense Vector Embeddings & Similarity Math without looking at notes.",
        "whyItMatters": "Converts unstructured paragraphs into searchable coordinates."
      },
      {
        "id": "ai-7-3",
        "title": "Document Chunking Strategies (Recursive, Semantic, Windowed)",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Chunk PDF documents by paragraphs with 10% overlap.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Document Chunking Strategies (Recursive, Semantic, Windowed) without looking at notes.",
        "whyItMatters": "Chunk size directly controls retrieval precision vs context breadth."
      },
      {
        "id": "ai-7-4",
        "title": "Vector Databases (Chroma, Pinecone, Qdrant, FAISS)",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Index 500 document chunks into FAISS and query top-k nearest neighbors.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Vector Databases (Chroma, Pinecone, Qdrant, FAISS) without looking at notes.",
        "whyItMatters": "Specialized indexes capable of sub-millisecond approximate nearest neighbor search."
      },
      {
        "id": "ai-7-5",
        "title": "Similarity Search & Indexing (HNSW, IVFFlat)",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Benchmark exact flat search vs approximate HNSW index query latency.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Similarity Search & Indexing (HNSW, IVFFlat) without looking at notes.",
        "whyItMatters": "Scales nearest neighbor search to millions of document vectors."
      },
      {
        "id": "ai-7-6",
        "title": "Cross-Encoder Reranking",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Rerank top-20 retrieved candidates using cross-encoder to select top-5.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Cross-Encoder Reranking without looking at notes.",
        "whyItMatters": "Improves precision by scoring full query-passage interaction jointly."
      },
      {
        "id": "ai-7-7",
        "title": "Citation Extraction & Source Attribution",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Prompt LLM to attach [Source: file, Page: X] citations to every factual claim.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Citation Extraction & Source Attribution without looking at notes.",
        "whyItMatters": "Allows human experts to verify answers instantly."
      },
      {
        "id": "ai-7-8",
        "title": "RAG Evaluation Metrics (Faithfulness, Answer Relevance, Context Recall)",
        "moduleIndex": 7,
        "moduleName": "7. RAG (Retrieval-Augmented Generation)",
        "category": "ai",
        "suggestedCodeTask": "Measure whether LLM answer is faithful strictly to provided context chunks.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of RAG Evaluation Metrics (Faithfulness, Answer Relevance, Context Recall) without looking at notes.",
        "whyItMatters": "Pinpoints whether bad answers are caused by bad search or bad prompts."
      }
    ]
  },
  {
    "index": 8,
    "id": "ai-stage-8",
    "title": "8. AI Agents",
    "category": "ai",
    "icon": "🕵️",
    "approxTime": "2–3 weeks",
    "minWeeks": 2,
    "maxWeeks": 3,
    "description": "Tool calling, agent loops, ReAct (Reason+Act), planning, memory, multiple tools, evaluation, and safety guardrails.",
    "topics": [
      {
        "id": "ai-8-1",
        "title": "Agent Core Loop (Think → Act → Observe)",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Implement while-loop executing LLM thoughts, actions, and observations.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Agent Core Loop (Think → Act → Observe) without looking at notes.",
        "whyItMatters": "The fundamental loop powering all autonomous agent frameworks."
      },
      {
        "id": "ai-8-2",
        "title": "The ReAct Framework (Synergizing Reasoning and Acting)",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Prompt agent with Thought: / Action: / Observation: trace formatting.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of The ReAct Framework (Synergizing Reasoning and Acting) without looking at notes.",
        "whyItMatters": "Interleaving reasoning traces with action execution boosts success rates."
      },
      {
        "id": "ai-8-3",
        "title": "Multi-Step Planning & Goal Decomposition",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Prompt agent to decompose complex goals into discrete sequential steps.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Multi-Step Planning & Goal Decomposition without looking at notes.",
        "whyItMatters": "Prevents agent from attempting entire complex missions in one step."
      },
      {
        "id": "ai-8-4",
        "title": "Agent Memory (Working Scratchpad vs Long-Term Vector Store)",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Maintain agent state scratchpad across 5 reasoning iterations.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Agent Memory (Working Scratchpad vs Long-Term Vector Store) without looking at notes.",
        "whyItMatters": "Preserves context of previous actions and discoveries."
      },
      {
        "id": "ai-8-5",
        "title": "Multiple Tool Execution & Dynamic Dispatch",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Give agent 4 diverse tools; verify it selects the correct tool for the task.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Multiple Tool Execution & Dynamic Dispatch without looking at notes.",
        "whyItMatters": "Real agents orchestrate suites of APIs."
      },
      {
        "id": "ai-8-6",
        "title": "Agent Evaluation & Trajectory Testing",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Assert that agent completes a 3-step retrieval and calculation goal.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Agent Evaluation & Trajectory Testing without looking at notes.",
        "whyItMatters": "Unit testing agents on deterministic golden trajectories."
      },
      {
        "id": "ai-8-7",
        "title": "Safety Guardrails & Step Execution Limits",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Enforce max_steps=10 and validate tool arguments against whitelist.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Safety Guardrails & Step Execution Limits without looking at notes.",
        "whyItMatters": "Prevents infinite looping and dangerous unauthorized API calls."
      },
      {
        "id": "ai-8-8",
        "title": "When NOT to Use Agents (Deterministic Code Supremacy)",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Write benchmark showing plain Python regex is 1000x faster than an agent.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of When NOT to Use Agents (Deterministic Code Supremacy) without looking at notes.",
        "whyItMatters": "Senior AI engineers use plain code wherever possible."
      },
      {
        "id": "ai-8-9",
        "title": "Human-in-the-Loop Interventions",
        "moduleIndex": 8,
        "moduleName": "8. AI Agents",
        "category": "ai",
        "suggestedCodeTask": "Add approval interrupt when agent attempts state-mutating DB write.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Human-in-the-Loop Interventions without looking at notes.",
        "whyItMatters": "Safety requirement for production clinical and financial agents."
      }
    ]
  },
  {
    "index": 9,
    "id": "ai-stage-9",
    "title": "9. Fine-Tuning",
    "category": "ai",
    "icon": "🎛️",
    "approxTime": "2–3 weeks",
    "minWeeks": 2,
    "maxWeeks": 3,
    "description": "Fine-tuning concepts, dataset preparation, instruction tuning, LoRA, PEFT, quantization, and fine-tuning vs RAG decision matrices.",
    "topics": [
      {
        "id": "ai-9-1",
        "title": "Fine-Tuning Basics (Pretraining vs SFT vs DPO/RLHF)",
        "moduleIndex": 9,
        "moduleName": "9. Fine-Tuning",
        "category": "ai",
        "suggestedCodeTask": "Map the progression from raw base model to instruction-following assistant.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Fine-Tuning Basics (Pretraining vs SFT vs DPO/RLHF) without looking at notes.",
        "whyItMatters": "Understand where fine-tuning fits in the model lifecycle."
      },
      {
        "id": "ai-9-2",
        "title": "Dataset Preparation for SFT (Instruction-Input-Output JSONL)",
        "moduleIndex": 9,
        "moduleName": "9. Fine-Tuning",
        "category": "ai",
        "suggestedCodeTask": "Format 500 domain examples into JSONL instruction-input-output format.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Dataset Preparation for SFT (Instruction-Input-Output JSONL) without looking at notes.",
        "whyItMatters": "Quality of training data dictates 95% of fine-tuning success."
      },
      {
        "id": "ai-9-3",
        "title": "Instruction Tuning Mechanics & Loss Masking",
        "moduleIndex": 9,
        "moduleName": "9. Fine-Tuning",
        "category": "ai",
        "suggestedCodeTask": "Explain how loss is computed only on completion tokens during training.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Instruction Tuning Mechanics & Loss Masking without looking at notes.",
        "whyItMatters": "Teaches model to obey instructions rather than just predict prompts."
      },
      {
        "id": "ai-9-4",
        "title": "LoRA (Low-Rank Adaptation) Mathematics",
        "moduleIndex": 9,
        "moduleName": "9. Fine-Tuning",
        "category": "ai",
        "suggestedCodeTask": "Implement W + B*A low-rank decomposition on linear layer in PyTorch.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of LoRA (Low-Rank Adaptation) Mathematics without looking at notes.",
        "whyItMatters": "Trains <1% of parameters while matching full fine-tuning performance."
      },
      {
        "id": "ai-9-5",
        "title": "PEFT (Parameter-Efficient Fine-Tuning) Ecosystem",
        "moduleIndex": 9,
        "moduleName": "9. Fine-Tuning",
        "category": "ai",
        "suggestedCodeTask": "Configure PEFT LoraConfig with r=8, lora_alpha=16, and target_modules.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of PEFT (Parameter-Efficient Fine-Tuning) Ecosystem without looking at notes.",
        "whyItMatters": "The standard Hugging Face library for fine-tuning on consumer GPUs."
      },
      {
        "id": "ai-9-6",
        "title": "Model Quantization (4-bit, 8-bit, bitsandbytes, GGUF)",
        "moduleIndex": 9,
        "moduleName": "9. Fine-Tuning",
        "category": "ai",
        "suggestedCodeTask": "Load 7B model in 4-bit precision and verify RAM usage drops under 6GB.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Model Quantization (4-bit, 8-bit, bitsandbytes, GGUF) without looking at notes.",
        "whyItMatters": "Enables running and fine-tuning large models on inexpensive hardware."
      },
      {
        "id": "ai-9-7",
        "title": "When to Fine-Tune vs Use RAG (The Decision Framework)",
        "moduleIndex": 9,
        "moduleName": "9. Fine-Tuning",
        "category": "ai",
        "suggestedCodeTask": "Write decision framework comparing Prompting vs RAG vs Fine-tuning.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of When to Fine-Tune vs Use RAG (The Decision Framework) without looking at notes.",
        "whyItMatters": "Fine-tuning teaches style/format; RAG provides factual knowledge."
      }
    ]
  },
  {
    "index": 10,
    "id": "ai-stage-10",
    "title": "10. AI Automation",
    "category": "ai",
    "icon": "⚡",
    "approxTime": "1–2 weeks",
    "minWeeks": 1,
    "maxWeeks": 2,
    "description": "APIs, webhooks, workflow automation, n8n, Zapier / Make, connecting AI → APIs → databases, and automated workflows.",
    "topics": [
      {
        "id": "ai-10-1",
        "title": "APIs & Webhooks Fundamentals for Automation",
        "moduleIndex": 10,
        "moduleName": "10. AI Automation",
        "category": "ai",
        "suggestedCodeTask": "Build webhook listener endpoint receiving events and validating HMAC signature.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of APIs & Webhooks Fundamentals for Automation without looking at notes.",
        "whyItMatters": "The protocol of asynchronous event-driven system integration."
      },
      {
        "id": "ai-10-2",
        "title": "Workflow Automation Architecture & Trigger-Action Patterns",
        "moduleIndex": 10,
        "moduleName": "10. AI Automation",
        "category": "ai",
        "suggestedCodeTask": "Design trigger -> transform -> AI enrich -> database action pipeline.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Workflow Automation Architecture & Trigger-Action Patterns without looking at notes.",
        "whyItMatters": "Connects disjointed software tools into autonomous operations."
      },
      {
        "id": "ai-10-3",
        "title": "n8n Workflow Automation (Self-Hosted Power)",
        "moduleIndex": 10,
        "moduleName": "10. AI Automation",
        "category": "ai",
        "suggestedCodeTask": "Set up n8n workflow connecting HTTP Webhook -> AI Node -> Database.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of n8n Workflow Automation (Self-Hosted Power) without looking at notes.",
        "whyItMatters": "Open-source, self-hosted, scalable automation engine with full data privacy."
      },
      {
        "id": "ai-10-4",
        "title": "Zapier / Make Cloud Automation",
        "moduleIndex": 10,
        "moduleName": "10. AI Automation",
        "category": "ai",
        "suggestedCodeTask": "Integrate email trigger with AI text parser and Google Sheets / Notion row write.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Zapier / Make Cloud Automation without looking at notes.",
        "whyItMatters": "Fast prototyping of commercial automation workflows in minutes."
      },
      {
        "id": "ai-10-5",
        "title": "Connecting AI → APIs → Databases",
        "moduleIndex": 10,
        "moduleName": "10. AI Automation",
        "category": "ai",
        "suggestedCodeTask": "Pipe raw user message into LLM extraction node, save JSON to SQL database.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Connecting AI → APIs → Databases without looking at notes.",
        "whyItMatters": "The core business automation loop replacing manual data entry."
      },
      {
        "id": "ai-10-6",
        "title": "Automated End-to-End Business Workflows",
        "moduleIndex": 10,
        "moduleName": "10. AI Automation",
        "category": "ai",
        "suggestedCodeTask": "Build automated customer triage bot routing inquiries and updating CRM.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Automated End-to-End Business Workflows without looking at notes.",
        "whyItMatters": "Direct commercial value: saves hundreds of human operational hours."
      },
      {
        "id": "ai-10-7",
        "title": "Error Handling, Retries, & Alerting in Automation",
        "moduleIndex": 10,
        "moduleName": "10. AI Automation",
        "category": "ai",
        "suggestedCodeTask": "Implement dead-letter queues and Slack alert webhooks on step failures.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Error Handling, Retries, & Alerting in Automation without looking at notes.",
        "whyItMatters": "Automated workflows must alert engineers when external APIs fail."
      }
    ]
  },
  {
    "index": 11,
    "id": "ai-stage-11",
    "title": "11. Multimodal AI",
    "category": "ai",
    "icon": "🎨",
    "approxTime": "2–3 weeks",
    "minWeeks": 2,
    "maxWeeks": 3,
    "stageNote": "You don't need to master every tool here. The podcast lists tools like Midjourney, Runway, ElevenLabs, etc.; treat them as examples of applications/tools, not separate subjects you must learn.",
    "description": "Image generation, image understanding, computer vision, audio generation, speech-to-text, text-to-speech, video generation, and VLMs.",
    "topics": [
      {
        "id": "ai-11-1",
        "title": "Image Generation Foundations (Diffusion Models)",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Explain forward noise injection and reverse denoising U-Net steps.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Image Generation Foundations (Diffusion Models) without looking at notes.",
        "whyItMatters": "Understands how Midjourney, Stable Diffusion, and Imagen work."
      },
      {
        "id": "ai-11-2",
        "title": "Image Understanding & Vision-Language Models (VLMs)",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Pass image + prompt to Gemini API to extract medical chart data.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Image Understanding & Vision-Language Models (VLMs) without looking at notes.",
        "whyItMatters": "Allows software to analyze visual documents, diagrams, and photos."
      },
      {
        "id": "ai-11-3",
        "title": "Computer Vision Integration for Multimodal Systems",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Extract cropped bounding boxes from documents and pass crops to VLM.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Computer Vision Integration for Multimodal Systems without looking at notes.",
        "whyItMatters": "Combines fast spatial localization with semantic understanding."
      },
      {
        "id": "ai-11-4",
        "title": "Audio Generation & Music Models",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Generate sound effects and synthetic audio from descriptive text prompts.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Audio Generation & Music Models without looking at notes.",
        "whyItMatters": "Powers generative soundscapes and voice experiences."
      },
      {
        "id": "ai-11-5",
        "title": "Speech-to-Text (Whisper & Streaming Audio)",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Transcribe audio file into timestamped text segments using Whisper.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Speech-to-Text (Whisper & Streaming Audio) without looking at notes.",
        "whyItMatters": "Converts doctor-patient or voice consultations into structured text."
      },
      {
        "id": "ai-11-6",
        "title": "Text-to-Speech & Voice Synthesis (ElevenLabs / Edge TTS)",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Synthesize natural voice responses with low-latency streaming audio.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Text-to-Speech & Voice Synthesis (ElevenLabs / Edge TTS) without looking at notes.",
        "whyItMatters": "Powers conversational voice assistants."
      },
      {
        "id": "ai-11-7",
        "title": "Video Generation & Editing Mechanics (Runway / Sora concepts)",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Explain frame-by-frame temporal consistency and latent video diffusion.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Video Generation & Editing Mechanics (Runway / Sora concepts) without looking at notes.",
        "whyItMatters": "The frontier of generative video creation."
      },
      {
        "id": "ai-11-8",
        "title": "Multimodal Pipeline Orchestration",
        "moduleIndex": 11,
        "moduleName": "11. Multimodal AI",
        "category": "ai",
        "suggestedCodeTask": "Combine vision, text, and audio models into an integrated triage workflow.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Multimodal Pipeline Orchestration without looking at notes.",
        "whyItMatters": "Powers comprehensive multimodal applications."
      }
    ]
  },
  {
    "index": 12,
    "id": "ai-stage-12",
    "title": "12. AI Engineering",
    "category": "ai",
    "icon": "🚀",
    "approxTime": "3–4 weeks",
    "minWeeks": 3,
    "maxWeeks": 4,
    "description": "FastAPI, REST APIs, model serving, databases, Docker, testing, logging, monitoring, deployment, and cloud basics.",
    "topics": [
      {
        "id": "ai-12-1",
        "title": "FastAPI Framework for Machine Learning",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Build FastAPI app with /health and /predict endpoints using Pydantic.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of FastAPI Framework for Machine Learning without looking at notes.",
        "whyItMatters": "The modern Python standard for low-latency asynchronous APIs."
      },
      {
        "id": "ai-12-2",
        "title": "REST API Conventions & Schema Validation",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Return 200 on success, 422 on invalid schema, 503 on model busy.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of REST API Conventions & Schema Validation without looking at notes.",
        "whyItMatters": "Clean API contract for web and mobile frontends."
      },
      {
        "id": "ai-12-3",
        "title": "Model Serving Architecture & Lifecycle",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Load model weights once on startup in lifespan context manager.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Model Serving Architecture & Lifecycle without looking at notes.",
        "whyItMatters": "Never load model weights inside the request handler."
      },
      {
        "id": "ai-12-4",
        "title": "Database Integration (PostgreSQL / SQLite)",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Log input payloads, model predictions, and user feedback to PostgreSQL.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Database Integration (PostgreSQL / SQLite) without looking at notes.",
        "whyItMatters": "Captures data for monitoring, audit trails, and retraining."
      },
      {
        "id": "ai-12-5",
        "title": "Containerization with Docker",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Write production Dockerfile with Python base, poetry/pip, and EXPOSE 8000.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Containerization with Docker without looking at notes.",
        "whyItMatters": "Guarantees the application runs identically on any server."
      },
      {
        "id": "ai-12-6",
        "title": "Testing AI Systems (Pytest & Schema Testing)",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Write automated pytest suites asserting model output bounds and schemas.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Testing AI Systems (Pytest & Schema Testing) without looking at notes.",
        "whyItMatters": "Automated CI/CD testing catches regressions before deployment."
      },
      {
        "id": "ai-12-7",
        "title": "Structured Logging (Loguru / JSON logging)",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Configure JSON logger recording request_id, latency_ms, and token_count.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Structured Logging (Loguru / JSON logging) without looking at notes.",
        "whyItMatters": "Essential for log indexing in Datadog, CloudWatch, or ELK."
      },
      {
        "id": "ai-12-8",
        "title": "Production Monitoring & Metrics (Prometheus)",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Expose /metrics endpoint tracking request latency p50/p95/p99.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Production Monitoring & Metrics (Prometheus) without looking at notes.",
        "whyItMatters": "Real-time visibility into production health."
      },
      {
        "id": "ai-12-9",
        "title": "Deployment Strategies (Cloud Run / VPS / HuggingFace)",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Deploy container to public cloud service and verify live HTTPS URL.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Deployment Strategies (Cloud Run / VPS / HuggingFace) without looking at notes.",
        "whyItMatters": "A model is useless until users can send HTTP requests to it."
      },
      {
        "id": "ai-12-10",
        "title": "Cloud Infrastructure Basics (Compute, Storage, Networking)",
        "moduleIndex": 12,
        "moduleName": "12. AI Engineering",
        "category": "ai",
        "suggestedCodeTask": "Provision cloud bucket for model weights and configure CORS headers.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Cloud Infrastructure Basics (Compute, Storage, Networking) without looking at notes.",
        "whyItMatters": "Solid foundation for modern cloud-native systems."
      }
    ]
  },
  {
    "index": 13,
    "id": "ai-stage-13",
    "title": "13. AI System Design",
    "category": "ai",
    "icon": "🏛️",
    "approxTime": "3–4 weeks",
    "minWeeks": 3,
    "maxWeeks": 4,
    "description": "AI architecture, data pipeline, model pipeline, RAG architecture, agent architecture, scalability, latency, cost, and reliability.",
    "topics": [
      {
        "id": "ai-13-1",
        "title": "AI System Architecture Overview",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Diagram end-to-end system linking UI, API Gateway, Vector DB, and LLM.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of AI System Architecture Overview without looking at notes.",
        "whyItMatters": "Senior engineers architect complete distributed systems."
      },
      {
        "id": "ai-13-2",
        "title": "Data Pipeline Design (Batch vs Streaming ETL)",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Design ETL pipeline ingesting daily hospital records into feature store.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Data Pipeline Design (Batch vs Streaming ETL) without looking at notes.",
        "whyItMatters": "Reliable data feeds are the lifeblood of production AI."
      },
      {
        "id": "ai-13-3",
        "title": "Model Pipeline & Inference Serving Patterns",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Compare synchronous real-time serving vs asynchronous queue workers.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Model Pipeline & Inference Serving Patterns without looking at notes.",
        "whyItMatters": "Heavy models must not block user-facing HTTP connections."
      },
      {
        "id": "ai-13-4",
        "title": "Production RAG Architecture Design",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Architect multi-tier RAG with semantic cache, vector store, and reranker.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Production RAG Architecture Design without looking at notes.",
        "whyItMatters": "Minimizes latency and token costs on frequent queries."
      },
      {
        "id": "ai-13-5",
        "title": "Agent System Architecture",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Design state machine separating supervisor agents from specialist workers.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Agent System Architecture without looking at notes.",
        "whyItMatters": "Prevents autonomous agents from getting stuck in unbounded loops."
      },
      {
        "id": "ai-13-6",
        "title": "Scalability & Horizontal Load Balancing",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Configure NGINX round-robin proxy distributing load across 3 model workers.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Scalability & Horizontal Load Balancing without looking at notes.",
        "whyItMatters": "Handles traffic spikes without dropping requests."
      },
      {
        "id": "ai-13-7",
        "title": "Latency Optimization Techniques (Streaming, Caching, Quantization)",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Implement SSE (Server-Sent Events) streaming response to frontend UI.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Latency Optimization Techniques (Streaming, Caching, Quantization) without looking at notes.",
        "whyItMatters": "Time-to-first-token matters more to users than total generation time."
      },
      {
        "id": "ai-13-8",
        "title": "Cost Optimization Strategies",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Route easy queries to small model (Flash/Haiku) and hard to flagship.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Cost Optimization Strategies without looking at notes.",
        "whyItMatters": "Cuts commercial LLM API bills by 80% with zero quality loss."
      },
      {
        "id": "ai-13-9",
        "title": "Reliability & Circuit Breakers",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Implement circuit breaker pattern switching to cached baseline when API fails.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Reliability & Circuit Breakers without looking at notes.",
        "whyItMatters": "Guarantees the application degrades gracefully."
      },
      {
        "id": "ai-13-10",
        "title": "Failure Handling & Fallback Policies",
        "moduleIndex": 13,
        "moduleName": "13. AI System Design",
        "category": "ai",
        "suggestedCodeTask": "Return rule-based fallback when model confidence drops below threshold.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Failure Handling & Fallback Policies without looking at notes.",
        "whyItMatters": "Safety-first design for healthcare and financial domains."
      }
    ]
  },
  {
    "index": 14,
    "id": "ai-stage-14",
    "title": "14. AI Safety + Evaluation",
    "category": "ai",
    "icon": "🛡️",
    "approxTime": "3–4 weeks",
    "minWeeks": 3,
    "maxWeeks": 4,
    "description": "Hallucination defense, algorithmic bias, data leakage, prompt injection, guardrails, human-in-the-loop, abstention, and safety testing.",
    "topics": [
      {
        "id": "ai-14-1",
        "title": "Hallucination Detection & Mitigation",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Implement dual-pass verification checking if statements contradict context.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Hallucination Detection & Mitigation without looking at notes.",
        "whyItMatters": "Prevents factual errors from reaching end users."
      },
      {
        "id": "ai-14-2",
        "title": "Algorithmic Bias & Fairness Audits",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Compute demographic parity and equal opportunity metrics across groups.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Algorithmic Bias & Fairness Audits without looking at notes.",
        "whyItMatters": "Ensures models do not discriminate against vulnerable demographics."
      },
      {
        "id": "ai-14-3",
        "title": "Data Leakage & Privacy Protection (PII Scrubbing)",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Write regex and NER pipeline redacting patient names, SSNs, and phone numbers.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Data Leakage & Privacy Protection (PII Scrubbing) without looking at notes.",
        "whyItMatters": "Strict legal requirement under HIPAA and GDPR."
      },
      {
        "id": "ai-14-4",
        "title": "Prompt Injection Attacks (Direct & Indirect)",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Simulate prompt injection attack and verify system prompt boundary holds.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Prompt Injection Attacks (Direct & Indirect) without looking at notes.",
        "whyItMatters": "The #1 security vulnerability in LLM-powered applications."
      },
      {
        "id": "ai-14-5",
        "title": "Guardrails Engineering (NeMo / Llama Guard)",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Set up input and output guardrails filtering toxic or dangerous content.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Guardrails Engineering (NeMo / Llama Guard) without looking at notes.",
        "whyItMatters": "Automates safety enforcement before user sees output."
      },
      {
        "id": "ai-14-6",
        "title": "Human-in-the-Loop Review Interfaces",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Build queue routing borderline predictions (confidence 0.4-0.6) to doctors.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Human-in-the-Loop Review Interfaces without looking at notes.",
        "whyItMatters": "Combines machine speed with human clinical judgment."
      },
      {
        "id": "ai-14-7",
        "title": "Model Abstention (Knowing When Not to Answer)",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Configure model to reply \"I cannot determine this\" when evidence is absent.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Model Abstention (Knowing When Not to Answer) without looking at notes.",
        "whyItMatters": "A confident hallucination is 100x more dangerous than an honest refusal."
      },
      {
        "id": "ai-14-8",
        "title": "Evaluation Datasets Construction (Golden Test Sets)",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Curate a frozen suite of 100 difficult edge cases to evaluate every model release.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Evaluation Datasets Construction (Golden Test Sets) without looking at notes.",
        "whyItMatters": "Standardized evaluation prevents regression."
      },
      {
        "id": "ai-14-9",
        "title": "Model Evaluation Benchmarks",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Run standard benchmark suite (MMLU, GSM8K, or custom domain eval).",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Model Evaluation Benchmarks without looking at notes.",
        "whyItMatters": "Measures exact capabilities against state-of-the-art baselines."
      },
      {
        "id": "ai-14-10",
        "title": "LLM Evaluation & Red Teaming",
        "moduleIndex": 14,
        "moduleName": "14. AI Safety + Evaluation",
        "category": "ai",
        "suggestedCodeTask": "Execute structured red-teaming session attempting to break model rules.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of LLM Evaluation & Red Teaming without looking at notes.",
        "whyItMatters": "Finds security and safety loopholes before malicious actors do."
      }
    ]
  },
  {
    "index": 15,
    "id": "ai-stage-15",
    "title": "15. AI Internals",
    "category": "ai",
    "icon": "🔬",
    "approxTime": "4–6 weeks",
    "minWeeks": 4,
    "maxWeeks": 6,
    "description": "Building deep learning architectures from pure scratch with no high-level frameworks: neural nets, backprop, attention, transformers, and tiny GPT.",
    "topics": [
      {
        "id": "ai-15-1",
        "title": "Neural Network from Pure Scratch in NumPy",
        "moduleIndex": 15,
        "moduleName": "15. AI Internals",
        "category": "ai",
        "suggestedCodeTask": "Implement 2-layer MLP with forward pass, cross-entropy, and manual backprop.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Neural Network from Pure Scratch in NumPy without looking at notes.",
        "whyItMatters": "Proves you understand every mathematical gradient operation."
      },
      {
        "id": "ai-15-2",
        "title": "Backpropagation from Scratch",
        "moduleIndex": 15,
        "moduleName": "15. AI Internals",
        "category": "ai",
        "suggestedCodeTask": "Derive and code dL/dW2, dL/db2, dL/dW1, and dL/db1 using calculus.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Backpropagation from Scratch without looking at notes.",
        "whyItMatters": "Demystifies deep learning backprop once and for all."
      },
      {
        "id": "ai-15-3",
        "title": "Attention from Scratch",
        "moduleIndex": 15,
        "moduleName": "15. AI Internals",
        "category": "ai",
        "suggestedCodeTask": "Code attention without torch.nn.functional using only tensor matrix multiplies.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Attention from Scratch without looking at notes.",
        "whyItMatters": "You can explain every line and dimension in the attention mechanism."
      },
      {
        "id": "ai-15-4",
        "title": "Transformer from Scratch",
        "moduleIndex": 15,
        "moduleName": "15. AI Internals",
        "category": "ai",
        "suggestedCodeTask": "Assemble MultiHeadAttention, LayerNorm, and MLP into a standalone class.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Transformer from Scratch without looking at notes.",
        "whyItMatters": "No black boxes: full mastery of the building blocks."
      },
      {
        "id": "ai-15-5",
        "title": "Tiny GPT from Scratch (NanoGPT style)",
        "moduleIndex": 15,
        "moduleName": "15. AI Internals",
        "category": "ai",
        "suggestedCodeTask": "Train a character-level or token-level language model on Shakespeare.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Tiny GPT from Scratch (NanoGPT style) without looking at notes.",
        "whyItMatters": "The ultimate rite of passage for an AI builder."
      },
      {
        "id": "ai-15-6",
        "title": "Understanding Training Dynamics & Loss Landscapes",
        "moduleIndex": 15,
        "moduleName": "15. AI Internals",
        "category": "ai",
        "suggestedCodeTask": "Plot gradient norm across training steps and detect gradient starvation.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Understanding Training Dynamics & Loss Landscapes without looking at notes.",
        "whyItMatters": "Diagnoses training instability, loss plateaus, and divergences."
      }
    ]
  },
  {
    "index": 16,
    "id": "ai-stage-16",
    "title": "16. AI Research",
    "category": "ai",
    "icon": "📑",
    "approxTime": "2–4 weeks",
    "minWeeks": 2,
    "maxWeeks": 4,
    "description": "Reading papers, understanding experiments, reproducing results, experiment design, ablation studies, and benchmarking.",
    "topics": [
      {
        "id": "ai-16-1",
        "title": "How to Read AI Research Papers Efficiently",
        "moduleIndex": 16,
        "moduleName": "16. AI Research",
        "category": "ai",
        "suggestedCodeTask": "Summarize 1 landmark paper (Attention is All You Need) in 3 structured paragraphs.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of How to Read AI Research Papers Efficiently without looking at notes.",
        "whyItMatters": "Stay at the frontier by absorbing upstream papers without getting bogged down."
      },
      {
        "id": "ai-16-2",
        "title": "Understanding Published Experiments",
        "moduleIndex": 16,
        "moduleName": "16. AI Research",
        "category": "ai",
        "suggestedCodeTask": "Deconstruct experimental setup, baselines, splits, and metric claims of a paper.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Understanding Published Experiments without looking at notes.",
        "whyItMatters": "Critically analyze whether claimed gains are real or marketing hype."
      },
      {
        "id": "ai-16-3",
        "title": "Reproducing Results from Scratch",
        "moduleIndex": 16,
        "moduleName": "16. AI Research",
        "category": "ai",
        "suggestedCodeTask": "Re-implement a published paper's core algorithm and replicate reported metrics.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Reproducing Results from Scratch without looking at notes.",
        "whyItMatters": "The gold standard proof of deep scientific engineering mastery."
      },
      {
        "id": "ai-16-4",
        "title": "Experiment Design & Controlled Methodologies",
        "moduleIndex": 16,
        "moduleName": "16. AI Research",
        "category": "ai",
        "suggestedCodeTask": "Define single independent variable test while holding all seeds/splits constant.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Experiment Design & Controlled Methodologies without looking at notes.",
        "whyItMatters": "Isolates exact cause of performance improvements."
      },
      {
        "id": "ai-16-5",
        "title": "Ablation Studies (Proving What Actually Matters)",
        "moduleIndex": 16,
        "moduleName": "16. AI Research",
        "category": "ai",
        "suggestedCodeTask": "Remove one component at a time (e.g. drop LayerNorm) and measure metric drop.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Ablation Studies (Proving What Actually Matters) without looking at notes.",
        "whyItMatters": "Proves every piece of your architecture is strictly necessary."
      },
      {
        "id": "ai-16-6",
        "title": "Standardized Benchmarking Protocol",
        "moduleIndex": 16,
        "moduleName": "16. AI Research",
        "category": "ai",
        "suggestedCodeTask": "Create a frozen test harness of 50 edge cases to benchmark model iterations.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Standardized Benchmarking Protocol without looking at notes.",
        "whyItMatters": "Prevents subjective impressions from replacing hard empirical data."
      }
    ]
  },
  {
    "index": 17,
    "id": "ai-stage-17",
    "title": "17. AI Product Building",
    "category": "ai",
    "icon": "💎",
    "approxTime": "Ongoing (Parallel Flagship)",
    "minWeeks": 0,
    "maxWeeks": 0,
    "isOngoing": true,
    "description": "Find a real problem, evaluate feasibility, prepare data, build baselines, build solution, evaluate, build UI, deploy, monitor, iterate, and calculate ROI.",
    "topics": [
      {
        "id": "ai-17-1",
        "title": "Find a Real Problem (Pain Points vs Tech Toys)",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Interview clinicians or users to document concrete manual workflow bottlenecks.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Find a Real Problem (Pain Points vs Tech Toys) without looking at notes.",
        "whyItMatters": "Never build a technology looking for a problem."
      },
      {
        "id": "ai-17-2",
        "title": "Decide Whether AI is Needed (The Feasibility Test)",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Evaluate whether a rule engine, SQL query, or heuristic solves the problem better.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Decide Whether AI is Needed (The Feasibility Test) without looking at notes.",
        "whyItMatters": "Avoiding unnecessary AI saves months of engineering waste."
      },
      {
        "id": "ai-17-3",
        "title": "Find / Prepare Domain Data",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Audit available dataset for label noise, missing attributes, and legal rights.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Find / Prepare Domain Data without looking at notes.",
        "whyItMatters": "No data = no AI product."
      },
      {
        "id": "ai-17-4",
        "title": "Build the Simplest Baseline First",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Deploy rule-based or linear baseline in 24 hours to set the benchmark.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Build the Simplest Baseline First without looking at notes.",
        "whyItMatters": "Gives the team a live anchor to measure all future improvements against."
      },
      {
        "id": "ai-17-5",
        "title": "Build the Iterative AI Solution",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Develop machine learning or LLM architecture exceeding baseline by target margin.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Build the Iterative AI Solution without looking at notes.",
        "whyItMatters": "Delivers measurable tangible superiority."
      },
      {
        "id": "ai-17-6",
        "title": "Rigorous Empirical Evaluation Against Baseline",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Generate side-by-side comparison tables proving superiority on real test data.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Rigorous Empirical Evaluation Against Baseline without looking at notes.",
        "whyItMatters": "Hard data needed to convince users, doctors, and investors."
      },
      {
        "id": "ai-17-7",
        "title": "Build the User Interface (React / Web)",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Design clean frontend displaying predictions, confidence, and explanations.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Build the User Interface (React / Web) without looking at notes.",
        "whyItMatters": "Software must be intuitive for non-technical domain experts."
      },
      {
        "id": "ai-17-8",
        "title": "Deploy with Live Demo URL & Public Docs",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Ship live web app on HTTPS with interactive test cases and Swagger docs.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Deploy with Live Demo URL & Public Docs without looking at notes.",
        "whyItMatters": "Code on GitHub gets stars; live products get users, jobs, and revenue."
      },
      {
        "id": "ai-17-9",
        "title": "Production Monitoring & Telemetry",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Log user accept/reject actions to build active-learning retraining dataset.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Production Monitoring & Telemetry without looking at notes.",
        "whyItMatters": "Creates a proprietary data flywheel that strengthens the product over time."
      },
      {
        "id": "ai-17-10",
        "title": "Iterate Based on Real User Feedback",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Ship v1.1 addressing top-3 user complaints documented in telemetry.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Iterate Based on Real User Feedback without looking at notes.",
        "whyItMatters": "Great products are built through fast continuous iteration."
      },
      {
        "id": "ai-17-11",
        "title": "Calculate Cost, Unit Economics, & ROI",
        "moduleIndex": 17,
        "moduleName": "17. AI Product Building",
        "category": "ai",
        "suggestedCodeTask": "Compute compute cost per user transaction vs value delivered to hospital/customer.",
        "suggestedUnderstandPrompt": "Explain the core mechanics and trade-offs of Calculate Cost, Unit Economics, & ROI without looking at notes.",
        "whyItMatters": "Guarantees the product is commercially sustainable and profitable."
      }
    ]
  }
];

export const MASTER_SWE_PILLARS: SwePillar[] = [
  {
    "id": "swe-dsa",
    "stepNumber": 1,
    "name": "Data Structures & Algorithms",
    "shortName": "DSA",
    "icon": "⚡",
    "description": "Problem solving mastery, algorithmic thinking, space/time complexity, and LeetCode patterns.",
    "cardinalRule": "Never replace DSA with AI. Keep 3–4 sessions per week (1 Topic → 4 LeetCodes → Dry Runs → Commit).",
    "topics": [
      {
        "id": "swe-dsa-1",
        "title": "Arrays & Two Pointers Pattern",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Solve Two Sum, 3Sum, and Container With Most Water on LeetCode.",
        "suggestedUnderstandPrompt": "Explain how Arrays & Two Pointers Pattern works under the hood and its typical interview failure cases.",
        "whyItMatters": "O(N) optimal traversal technique for ordered and unordered sequences."
      },
      {
        "id": "swe-dsa-2",
        "title": "Sliding Window Pattern (Fixed & Dynamic)",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Implement Longest Substring Without Repeating Characters and Min Size Subarray.",
        "suggestedUnderstandPrompt": "Explain how Sliding Window Pattern (Fixed & Dynamic) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Avoids nested O(N^2) loops when analyzing sub-arrays and substrings."
      },
      {
        "id": "swe-dsa-3",
        "title": "Strings & Hashing Techniques",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Implement Group Anagrams and Longest Palindromic Substring.",
        "suggestedUnderstandPrompt": "Explain how Strings & Hashing Techniques works under the hood and its typical interview failure cases.",
        "whyItMatters": "Core string parsing and hash lookup fundamentals."
      },
      {
        "id": "swe-dsa-4",
        "title": "Linked Lists (Reversal, Fast & Slow Pointers)",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Reverse Linked List in-place and detect cycles with Floyd's algorithm.",
        "suggestedUnderstandPrompt": "Explain how Linked Lists (Reversal, Fast & Slow Pointers) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Pointer manipulation and memory address management."
      },
      {
        "id": "swe-dsa-5",
        "title": "Stacks & Queues (Monotonic Stack)",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Solve Daily Temperatures and Next Greater Element using Monotonic Stack.",
        "suggestedUnderstandPrompt": "Explain how Stacks & Queues (Monotonic Stack) works under the hood and its typical interview failure cases.",
        "whyItMatters": "O(N) solution for range-based visibility and calculation problems."
      },
      {
        "id": "swe-dsa-6",
        "title": "Binary Trees & Traversals (DFS / BFS)",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Implement Preorder, Inorder, Postorder, and Level-Order traversals recursively & iteratively.",
        "suggestedUnderstandPrompt": "Explain how Binary Trees & Traversals (DFS / BFS) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Hierarchical data representation and recursive tree decomposition."
      },
      {
        "id": "swe-dsa-7",
        "title": "Binary Search Trees (BST Properties & Operations)",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Validate BST, find Lowest Common Ancestor, and delete node in BST.",
        "suggestedUnderstandPrompt": "Explain how Binary Search Trees (BST Properties & Operations) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Logarithmic search and balanced partition properties."
      },
      {
        "id": "swe-dsa-8",
        "title": "Heaps & Priority Queues (Top-K Patterns)",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Solve Top K Frequent Elements and Merge K Sorted Lists using min/max heaps.",
        "suggestedUnderstandPrompt": "Explain how Heaps & Priority Queues (Top-K Patterns) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Optimal stream ranking and priority scheduling."
      },
      {
        "id": "swe-dsa-9",
        "title": "Graphs: Adjacency List & BFS / DFS Patterns",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Implement BFS shortest path, Number of Islands, and Connected Components.",
        "suggestedUnderstandPrompt": "Explain how Graphs: Adjacency List & BFS / DFS Patterns works under the hood and its typical interview failure cases.",
        "whyItMatters": "Network modeling, dependencies, and pathfinding."
      },
      {
        "id": "swe-dsa-10",
        "title": "Advanced Graphs: Topological Sort & Dijkstra",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Solve Course Schedule (Kahn's algorithm) and Dijkstra shortest path.",
        "suggestedUnderstandPrompt": "Explain how Advanced Graphs: Topological Sort & Dijkstra works under the hood and its typical interview failure cases.",
        "whyItMatters": "Dependency resolution and weighted network optimization."
      },
      {
        "id": "swe-dsa-11",
        "title": "Dynamic Programming: 1D & 2D (Memoization vs Tabulation)",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Solve Coin Change, Longest Common Subsequence, and 0/1 Knapsack.",
        "suggestedUnderstandPrompt": "Explain how Dynamic Programming: 1D & 2D (Memoization vs Tabulation) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Optimal substructure and overlapping subproblems mastery."
      },
      {
        "id": "swe-dsa-12",
        "title": "Backtracking & Combinatorial Search",
        "moduleIndex": 0,
        "moduleName": "Data Structures & Algorithms",
        "category": "swe",
        "suggestedCodeTask": "Solve Subsets, Permutations, and N-Queens with clean state restoration.",
        "suggestedUnderstandPrompt": "Explain how Backtracking & Combinatorial Search works under the hood and its typical interview failure cases.",
        "whyItMatters": "Exhaustive state space exploration with intelligent pruning."
      }
    ]
  },
  {
    "id": "swe-java",
    "stepNumber": 2,
    "name": "Java Core & Modern Features",
    "shortName": "Java",
    "icon": "☕",
    "description": "Enterprise JVM fundamentals, type safety, collections framework, and concurrency.",
    "cardinalRule": "Java builds production-grade, highly maintainable backend services and enterprise data systems.",
    "topics": [
      {
        "id": "swe-java-1",
        "title": "Core Java Syntax & Primitive vs Reference Types",
        "moduleIndex": 1,
        "moduleName": "Java Core & Modern Features",
        "category": "swe",
        "suggestedCodeTask": "Demonstrate pass-by-value semantics, stack vs heap allocation, and immutability.",
        "suggestedUnderstandPrompt": "Explain how Core Java Syntax & Primitive vs Reference Types works under the hood and its typical interview failure cases.",
        "whyItMatters": "Foundational syntax and memory semantics."
      },
      {
        "id": "swe-java-2",
        "title": "Java Collections Framework (List, Map, Set, Queue)",
        "moduleIndex": 1,
        "moduleName": "Java Core & Modern Features",
        "category": "swe",
        "suggestedCodeTask": "Benchmark HashMap vs TreeMap lookup and collision handling (red-black trees).",
        "suggestedUnderstandPrompt": "Explain how Java Collections Framework (List, Map, Set, Queue) works under the hood and its typical interview failure cases.",
        "whyItMatters": "The workhorse data structure library of backend engineering."
      },
      {
        "id": "swe-java-3",
        "title": "Generics & Type Erasure",
        "moduleIndex": 1,
        "moduleName": "Java Core & Modern Features",
        "category": "swe",
        "suggestedCodeTask": "Write a type-safe generic Repository<T, ID> with bounded type parameters.",
        "suggestedUnderstandPrompt": "Explain how Generics & Type Erasure works under the hood and its typical interview failure cases.",
        "whyItMatters": "Compile-time type safety preventing ClassCastException at runtime."
      },
      {
        "id": "swe-java-4",
        "title": "JVM Architecture & Garbage Collection",
        "moduleIndex": 1,
        "moduleName": "Java Core & Modern Features",
        "category": "swe",
        "suggestedCodeTask": "Explain Young/Old generation, Eden space, Minor vs Major GC, and G1/ZGC collectors.",
        "suggestedUnderstandPrompt": "Explain how JVM Architecture & Garbage Collection works under the hood and its typical interview failure cases.",
        "whyItMatters": "Diagnosing OutOfMemoryError and GC pause latency."
      },
      {
        "id": "swe-java-5",
        "title": "Multithreading & Concurrency (ExecutorService, Synchronized)",
        "moduleIndex": 1,
        "moduleName": "Java Core & Modern Features",
        "category": "swe",
        "suggestedCodeTask": "Build a producer-consumer queue using BlockingQueue and ThreadPoolExecutor.",
        "suggestedUnderstandPrompt": "Explain how Multithreading & Concurrency (ExecutorService, Synchronized) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Utilizes modern multi-core server processors."
      },
      {
        "id": "swe-java-6",
        "title": "Streams API & Functional Programming (Lambdas)",
        "moduleIndex": 1,
        "moduleName": "Java Core & Modern Features",
        "category": "swe",
        "suggestedCodeTask": "Filter, map, reduce, and collect large collections using parallelStream().",
        "suggestedUnderstandPrompt": "Explain how Streams API & Functional Programming (Lambdas) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Declarative, readable data processing in modern Java."
      },
      {
        "id": "swe-java-7",
        "title": "Exception Handling & Resource Management (try-with-resources)",
        "moduleIndex": 1,
        "moduleName": "Java Core & Modern Features",
        "category": "swe",
        "suggestedCodeTask": "Implement AutoCloseable database connection wrapper with custom exceptions.",
        "suggestedUnderstandPrompt": "Explain how Exception Handling & Resource Management (try-with-resources) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Guarantees sockets and file handles are never leaked."
      }
    ]
  },
  {
    "id": "swe-oop",
    "stepNumber": 3,
    "name": "Object-Oriented Programming & Design Patterns",
    "shortName": "OOP",
    "icon": "🧱",
    "description": "Clean code architecture, SOLID principles, design patterns, and maintainability.",
    "cardinalRule": "Good OOP makes complex software maintainable, testable, and extensible for years.",
    "topics": [
      {
        "id": "swe-oop-1",
        "title": "The 4 Pillars (Encapsulation, Abstraction, Inheritance, Polymorphism)",
        "moduleIndex": 2,
        "moduleName": "Object-Oriented Programming & Design Patterns",
        "category": "swe",
        "suggestedCodeTask": "Model an e-commerce payment processing hierarchy with polymorphic execute().",
        "suggestedUnderstandPrompt": "Explain how The 4 Pillars (Encapsulation, Abstraction, Inheritance, Polymorphism) works under the hood and its typical interview failure cases.",
        "whyItMatters": "The bedrock of modern software engineering."
      },
      {
        "id": "swe-oop-2",
        "title": "SOLID Principles (Single Responsibility, Open/Closed, etc.)",
        "moduleIndex": 2,
        "moduleName": "Object-Oriented Programming & Design Patterns",
        "category": "swe",
        "suggestedCodeTask": "Refactor monolithic class into single-responsibility classes adhering to Open/Closed.",
        "suggestedUnderstandPrompt": "Explain how SOLID Principles (Single Responsibility, Open/Closed, etc.) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Software design rules preventing brittle code."
      },
      {
        "id": "swe-oop-3",
        "title": "Creational Patterns (Singleton, Factory, Builder)",
        "moduleIndex": 2,
        "moduleName": "Object-Oriented Programming & Design Patterns",
        "category": "swe",
        "suggestedCodeTask": "Implement thread-safe Bill Pugh Singleton and Builder pattern for complex configs.",
        "suggestedUnderstandPrompt": "Explain how Creational Patterns (Singleton, Factory, Builder) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Clean, controlled object instantiation."
      },
      {
        "id": "swe-oop-4",
        "title": "Structural Patterns (Adapter, Decorator, Facade)",
        "moduleIndex": 2,
        "moduleName": "Object-Oriented Programming & Design Patterns",
        "category": "swe",
        "suggestedCodeTask": "Wrap legacy third-party API with an Adapter matching internal service interfaces.",
        "suggestedUnderstandPrompt": "Explain how Structural Patterns (Adapter, Decorator, Facade) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Composes classes and interfaces into larger robust structures."
      },
      {
        "id": "swe-oop-5",
        "title": "Behavioral Patterns (Strategy, Observer, Command)",
        "moduleIndex": 2,
        "moduleName": "Object-Oriented Programming & Design Patterns",
        "category": "swe",
        "suggestedCodeTask": "Implement Strategy pattern for dynamic pricing and Observer for event notifications.",
        "suggestedUnderstandPrompt": "Explain how Behavioral Patterns (Strategy, Observer, Command) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Decouples business algorithms from execution contexts."
      },
      {
        "id": "swe-oop-6",
        "title": "Composition Over Inheritance & Clean Code Principles",
        "moduleIndex": 2,
        "moduleName": "Object-Oriented Programming & Design Patterns",
        "category": "swe",
        "suggestedCodeTask": "Refactor deep fragile inheritance hierarchy into composed component delegates.",
        "suggestedUnderstandPrompt": "Explain how Composition Over Inheritance & Clean Code Principles works under the hood and its typical interview failure cases.",
        "whyItMatters": "Prevents tight coupling and combinatorial explosion of subclasses."
      }
    ]
  },
  {
    "id": "swe-dbms",
    "stepNumber": 4,
    "name": "Database Management Systems",
    "shortName": "DBMS",
    "icon": "🗄️",
    "description": "Relational data modeling, SQL optimization, transactions, indexing, and NoSQL.",
    "cardinalRule": "Data outlives code. Mastering databases is mandatory for every serious engineer.",
    "topics": [
      {
        "id": "swe-dbms-1",
        "title": "Relational Model & Relational Algebra",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Design normalized schema with primary keys, foreign keys, and unique constraints.",
        "suggestedUnderstandPrompt": "Explain how Relational Model & Relational Algebra works under the hood and its typical interview failure cases.",
        "whyItMatters": "The theoretical foundation of relational databases."
      },
      {
        "id": "swe-dbms-2",
        "title": "Advanced SQL Queries & Joins",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Write complex queries with INNER/LEFT/FULL joins, GROUP BY, and HAVING.",
        "suggestedUnderstandPrompt": "Explain how Advanced SQL Queries & Joins works under the hood and its typical interview failure cases.",
        "whyItMatters": "Daily necessity for backend and data engineering."
      },
      {
        "id": "swe-dbms-3",
        "title": "Database Normalization (1NF to BCNF)",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Decompose unnormalized table with update/deletion anomalies into 3NF schema.",
        "suggestedUnderstandPrompt": "Explain how Database Normalization (1NF to BCNF) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Eliminates data redundancy and insertion anomalies."
      },
      {
        "id": "swe-dbms-4",
        "title": "Transactions & ACID Properties",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Execute multi-statement bank transfer wrapped in BEGIN TRANSACTION and COMMIT.",
        "suggestedUnderstandPrompt": "Explain how Transactions & ACID Properties works under the hood and its typical interview failure cases.",
        "whyItMatters": "Guarantees correctness despite crashes and concurrent updates."
      },
      {
        "id": "swe-dbms-5",
        "title": "Database Indexing (B-Trees vs Hash Indexes)",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Create composite B-Tree index on (user_id, created_at) and verify EXPLAIN plan.",
        "suggestedUnderstandPrompt": "Explain how Database Indexing (B-Trees vs Hash Indexes) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Turns O(N) full table scans into O(log N) index seeks."
      },
      {
        "id": "swe-dbms-6",
        "title": "Query Optimization & EXPLAIN ANALYZE",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Analyze query plan output to eliminate sequential scans on 1M-row table.",
        "suggestedUnderstandPrompt": "Explain how Query Optimization & EXPLAIN ANALYZE works under the hood and its typical interview failure cases.",
        "whyItMatters": "Diagnoses 100x query performance bottlenecks."
      },
      {
        "id": "swe-dbms-7",
        "title": "NoSQL vs SQL (Key-Value, Document, Graph, Vector)",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Compare PostgreSQL vs MongoDB vs Redis trade-offs for patient session storage.",
        "suggestedUnderstandPrompt": "Explain how NoSQL vs SQL (Key-Value, Document, Graph, Vector) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Select the right persistence engine for each data access pattern."
      },
      {
        "id": "swe-dbms-8",
        "title": "Replication, Sharding, & Partitioning Basics",
        "moduleIndex": 3,
        "moduleName": "Database Management Systems",
        "category": "swe",
        "suggestedCodeTask": "Explain primary-replica replication lag and horizontal sharding strategies.",
        "suggestedUnderstandPrompt": "Explain how Replication, Sharding, & Partitioning Basics works under the hood and its typical interview failure cases.",
        "whyItMatters": "Scales databases beyond single-machine storage and throughput limits."
      }
    ]
  },
  {
    "id": "swe-os",
    "stepNumber": 5,
    "name": "Operating Systems",
    "shortName": "OS",
    "icon": "💻",
    "description": "Processes, concurrency, memory management, scheduling, and system calls.",
    "cardinalRule": "Understanding how the OS manages hardware is what separates script-writers from real engineers.",
    "topics": [
      {
        "id": "swe-os-1",
        "title": "Processes vs Threads & Context Switching",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Inspect process table with ps/top and measure context switch CPU overhead.",
        "suggestedUnderstandPrompt": "Explain how Processes vs Threads & Context Switching works under the hood and its typical interview failure cases.",
        "whyItMatters": "How the operating system virtualizes CPU execution."
      },
      {
        "id": "swe-os-2",
        "title": "CPU Scheduling Algorithms",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Implement Round Robin, FCFS, and Shortest Job First scheduling simulators.",
        "suggestedUnderstandPrompt": "Explain how CPU Scheduling Algorithms works under the hood and its typical interview failure cases.",
        "whyItMatters": "Controls system throughput, latency, and fairness."
      },
      {
        "id": "swe-os-3",
        "title": "Process Synchronization (Mutex, Semaphores, Monitors)",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Solve the Dining Philosophers problem preventing race conditions.",
        "suggestedUnderstandPrompt": "Explain how Process Synchronization (Mutex, Semaphores, Monitors) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Eliminates corrupt state in concurrent systems."
      },
      {
        "id": "swe-os-4",
        "title": "Deadlocks (Detection, Prevention, & Banker's Algorithm)",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Analyze Coffman conditions and implement resource request validation.",
        "suggestedUnderstandPrompt": "Explain how Deadlocks (Detection, Prevention, & Banker's Algorithm) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Prevents system freezes when processes circular-wait on shared resources."
      },
      {
        "id": "swe-os-5",
        "title": "Virtual Memory & Paging Mechanisms",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Calculate virtual-to-physical address translation via page tables and TLB.",
        "suggestedUnderstandPrompt": "Explain how Virtual Memory & Paging Mechanisms works under the hood and its typical interview failure cases.",
        "whyItMatters": "How the OS provides isolated 64-bit address spaces per process."
      },
      {
        "id": "swe-os-6",
        "title": "Page Replacement Algorithms (LRU, FIFO, Clock)",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Simulate LRU cache page faults on a synthetic memory access sequence.",
        "suggestedUnderstandPrompt": "Explain how Page Replacement Algorithms (LRU, FIFO, Clock) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Maximizes cache hits when RAM is full."
      },
      {
        "id": "swe-os-7",
        "title": "File System Architecture & Inodes",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Inspect file inodes, hard links vs soft links, and disk block allocation.",
        "suggestedUnderstandPrompt": "Explain how File System Architecture & Inodes works under the hood and its typical interview failure cases.",
        "whyItMatters": "How bytes are structured reliably on persistent physical storage."
      },
      {
        "id": "swe-os-8",
        "title": "Inter-Process Communication (IPC: Pipes, Sockets, Shared Memory)",
        "moduleIndex": 4,
        "moduleName": "Operating Systems",
        "category": "swe",
        "suggestedCodeTask": "Build a pipe and Unix domain socket communicating between two processes.",
        "suggestedUnderstandPrompt": "Explain how Inter-Process Communication (IPC: Pipes, Sockets, Shared Memory) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Enables microservices and processes on the same machine to exchange data."
      }
    ]
  },
  {
    "id": "swe-cn",
    "stepNumber": 6,
    "name": "Computer Networks",
    "shortName": "Networks",
    "icon": "🌐",
    "description": "Protocols, networking layers, TCP/IP, DNS, HTTP/HTTPS, and distributed communication.",
    "cardinalRule": "Every cloud system, API, and AI service communicates over the network. Latency is physics.",
    "topics": [
      {
        "id": "swe-networks-1",
        "title": "OSI vs TCP/IP Layered Models",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Trace packet encapsulation from Application (HTTP) down to Physical frames.",
        "suggestedUnderstandPrompt": "Explain how OSI vs TCP/IP Layered Models works under the hood and its typical interview failure cases.",
        "whyItMatters": "The universal mental model for all internet communication."
      },
      {
        "id": "swe-networks-2",
        "title": "TCP vs UDP (3-Way Handshake & Congestion Control)",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Capture TCP SYN, SYN-ACK, ACK handshake packets using tcpdump / Wireshark.",
        "suggestedUnderstandPrompt": "Explain how TCP vs UDP (3-Way Handshake & Congestion Control) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Reliable ordered byte streams vs low-latency datagrams."
      },
      {
        "id": "swe-networks-3",
        "title": "DNS Resolution Architecture",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Perform recursive DNS trace using dig +trace from root servers to authoritative.",
        "suggestedUnderstandPrompt": "Explain how DNS Resolution Architecture works under the hood and its typical interview failure cases.",
        "whyItMatters": "How human domain names map to IP addresses globally in milliseconds."
      },
      {
        "id": "swe-networks-4",
        "title": "HTTP/1.1, HTTP/2, & HTTP/3 (QUIC)",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Compare head-of-line blocking in HTTP/1.1 vs multiplexing in HTTP/2.",
        "suggestedUnderstandPrompt": "Explain how HTTP/1.1, HTTP/2, & HTTP/3 (QUIC) works under the hood and its typical interview failure cases.",
        "whyItMatters": "The protocol powering all REST APIs and web services."
      },
      {
        "id": "swe-networks-5",
        "title": "HTTPS & SSL/TLS Handshake",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Inspect TLS certificate chain, symmetric key negotiation, and asymmetric crypto.",
        "suggestedUnderstandPrompt": "Explain how HTTPS & SSL/TLS Handshake works under the hood and its typical interview failure cases.",
        "whyItMatters": "Secures all confidential web and API communications."
      },
      {
        "id": "swe-networks-6",
        "title": "WebSockets & Real-Time Bi-Directional Streaming",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Build a WebSocket echo server streaming instant bidirectional messages.",
        "suggestedUnderstandPrompt": "Explain how WebSockets & Real-Time Bi-Directional Streaming works under the hood and its typical interview failure cases.",
        "whyItMatters": "Essential for real-time AI live streaming and chat interfaces."
      },
      {
        "id": "swe-networks-7",
        "title": "IP Addressing, Subnetting, & CIDR Notation",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Calculate network address, broadcast address, and host count for 192.168.1.0/24.",
        "suggestedUnderstandPrompt": "Explain how IP Addressing, Subnetting, & CIDR Notation works under the hood and its typical interview failure cases.",
        "whyItMatters": "Required for configuring VPCs, Docker networks, and cloud subnets."
      },
      {
        "id": "swe-networks-8",
        "title": "Load Balancers & Reverse Proxies (NGINX, Envoy)",
        "moduleIndex": 5,
        "moduleName": "Computer Networks",
        "category": "swe",
        "suggestedCodeTask": "Configure NGINX reverse proxy with SSL termination and health checks.",
        "suggestedUnderstandPrompt": "Explain how Load Balancers & Reverse Proxies (NGINX, Envoy) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Directs incoming traffic across pools of backend application servers."
      }
    ]
  },
  {
    "id": "swe-sd",
    "stepNumber": 7,
    "name": "System Design & Scalability",
    "shortName": "System Design",
    "icon": "🏗️",
    "description": "Architecting distributed systems handling millions of users, high throughput, and high availability.",
    "cardinalRule": "System design turns single-server programs into planetary-scale resilient platforms.",
    "topics": [
      {
        "id": "swe-system design-1",
        "title": "Client-Server Architecture & Stateless Backends",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Design stateless session architecture storing session state in Redis.",
        "suggestedUnderstandPrompt": "Explain how Client-Server Architecture & Stateless Backends works under the hood and its typical interview failure cases.",
        "whyItMatters": "Allows auto-scaling backend server instances horizontally."
      },
      {
        "id": "swe-system design-2",
        "title": "Caching Strategies (Redis, Memcached, Cache-Aside, Write-Through)",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Implement cache-aside pattern with TTL expiration and cache invalidation.",
        "suggestedUnderstandPrompt": "Explain how Caching Strategies (Redis, Memcached, Cache-Aside, Write-Through) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Caches reduce database load by 90% and drop response latency to 2ms."
      },
      {
        "id": "swe-system design-3",
        "title": "Database Scaling (Read Replicas, Sharding, CAP Theorem)",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Explain consistency vs availability trade-offs under network partition.",
        "suggestedUnderstandPrompt": "Explain how Database Scaling (Read Replicas, Sharding, CAP Theorem) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Navigates distributed data constraints as data grows into terabytes."
      },
      {
        "id": "swe-system design-4",
        "title": "Message Queues & Asynchronous Processing (Kafka, RabbitMQ)",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Publish background AI tasks to queue; consumer processes off the main thread.",
        "suggestedUnderstandPrompt": "Explain how Message Queues & Asynchronous Processing (Kafka, RabbitMQ) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Decouples heavy compute jobs from user-facing request latency."
      },
      {
        "id": "swe-system design-5",
        "title": "Microservices vs Monolith Architecture",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Design service boundaries, domain-driven design, and database-per-service.",
        "suggestedUnderstandPrompt": "Explain how Microservices vs Monolith Architecture works under the hood and its typical interview failure cases.",
        "whyItMatters": "Allows autonomous engineering teams to ship services independently."
      },
      {
        "id": "swe-system design-6",
        "title": "Rate Limiting & Throttling (Token Bucket, Leaky Bucket)",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Implement Token Bucket rate limiter in Redis enforcing 100 requests/minute.",
        "suggestedUnderstandPrompt": "Explain how Rate Limiting & Throttling (Token Bucket, Leaky Bucket) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Protects backend servers from malicious or runaway traffic spikes."
      },
      {
        "id": "swe-system design-7",
        "title": "API Gateway & Service Discovery",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Route requests based on path prefix (/api/v1/triage) to upstream microservices.",
        "suggestedUnderstandPrompt": "Explain how API Gateway & Service Discovery works under the hood and its typical interview failure cases.",
        "whyItMatters": "Centralizes authentication, rate limiting, and request routing."
      },
      {
        "id": "swe-system design-8",
        "title": "Design a Real-World System (e.g. TinyURL, Notification Service)",
        "moduleIndex": 6,
        "moduleName": "System Design & Scalability",
        "category": "swe",
        "suggestedCodeTask": "Draft end-to-end architecture diagram: API -> Cache -> DB -> Worker -> Queue.",
        "suggestedUnderstandPrompt": "Explain how Design a Real-World System (e.g. TinyURL, Notification Service) works under the hood and its typical interview failure cases.",
        "whyItMatters": "The classic tech interview and engineering design milestone."
      }
    ]
  },
  {
    "id": "swe-se",
    "stepNumber": 8,
    "name": "Software Engineering Best Practices",
    "shortName": "Software Eng",
    "icon": "📐",
    "description": "Code quality, CI/CD, testing methodologies, observability, and team workflows.",
    "cardinalRule": "Great software is built with disciplined habits, comprehensive testing, and fast feedback loops.",
    "topics": [
      {
        "id": "swe-software eng-1",
        "title": "Git Branching Strategies (GitHub Flow & Trunk-Based)",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Create feature branch, rebase onto main, resolve conflicts, and open clean PR.",
        "suggestedUnderstandPrompt": "Explain how Git Branching Strategies (GitHub Flow & Trunk-Based) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Enables multi-developer collaboration without breaking production."
      },
      {
        "id": "swe-software eng-2",
        "title": "CI/CD Pipelines (GitHub Actions / GitLab CI)",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Write .github/workflows/ci.yml running linting, formatting, and tests on push.",
        "suggestedUnderstandPrompt": "Explain how CI/CD Pipelines (GitHub Actions / GitLab CI) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Automates verification before code can be merged."
      },
      {
        "id": "swe-software eng-3",
        "title": "Testing Pyramid (Unit, Integration, & End-to-End)",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Write unit tests with mocks and integration tests hitting test database.",
        "suggestedUnderstandPrompt": "Explain how Testing Pyramid (Unit, Integration, & End-to-End) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Catches breaking bugs in seconds before users ever see them."
      },
      {
        "id": "swe-software eng-4",
        "title": "Code Reviews & Refactoring Techniques",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Review sample pull request pointing out security, complexity, and styling issues.",
        "suggestedUnderstandPrompt": "Explain how Code Reviews & Refactoring Techniques works under the hood and its typical interview failure cases.",
        "whyItMatters": "Maintains code quality standards across the entire engineering team."
      },
      {
        "id": "swe-software eng-5",
        "title": "API Design & Versioning (RESTful conventions)",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Design clean REST endpoints using plural nouns, proper verbs, and version prefixes.",
        "suggestedUnderstandPrompt": "Explain how API Design & Versioning (RESTful conventions) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Creates intuitive APIs that external developers love integrating with."
      },
      {
        "id": "swe-software eng-6",
        "title": "Observability (Metrics, Structured Logs, Distributed Tracing)",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Propagate trace_id across microservice HTTP headers to track end-to-end latency.",
        "suggestedUnderstandPrompt": "Explain how Observability (Metrics, Structured Logs, Distributed Tracing) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Pinpoints the exact service causing a 500ms delay in a 10-service call chain."
      },
      {
        "id": "swe-software eng-7",
        "title": "Security Best Practices (OWASP Top 10)",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Sanitize SQL inputs with parameterized queries to prevent SQL injection.",
        "suggestedUnderstandPrompt": "Explain how Security Best Practices (OWASP Top 10) works under the hood and its typical interview failure cases.",
        "whyItMatters": "Protects user data and company infrastructure from catastrophic breaches."
      },
      {
        "id": "swe-software eng-8",
        "title": "Documentation & Technical Writing",
        "moduleIndex": 7,
        "moduleName": "Software Engineering Best Practices",
        "category": "swe",
        "suggestedCodeTask": "Write comprehensive README with architecture diagram, local setup, and API examples.",
        "suggestedUnderstandPrompt": "Explain how Documentation & Technical Writing works under the hood and its typical interview failure cases.",
        "whyItMatters": "Code without documentation is dead code."
      }
    ]
  },
  {
    "id": "swe-ai-bridge",
    "stepNumber": 9,
    "name": "AI Systems Software Engineering",
    "shortName": "AI Systems",
    "icon": "🤖",
    "description": "The convergence: applying deep software engineering discipline to AI and ML systems.",
    "cardinalRule": "An AI model without software engineering is just a Jupyter Notebook. SWE is what turns AI into real products.",
    "topics": [
      {
        "id": "swe-ai systems-1",
        "title": "FastAPI Production Serving for AI Models",
        "moduleIndex": 8,
        "moduleName": "AI Systems Software Engineering",
        "category": "swe",
        "suggestedCodeTask": "Wrap PyTorch or scikit-learn model in async FastAPI server with schema validation.",
        "suggestedUnderstandPrompt": "Explain how FastAPI Production Serving for AI Models works under the hood and its typical interview failure cases.",
        "whyItMatters": "Transforms offline research weights into accessible microservices."
      },
      {
        "id": "swe-ai systems-2",
        "title": "Docker Containerization for AI Systems",
        "moduleIndex": 8,
        "moduleName": "AI Systems Software Engineering",
        "category": "swe",
        "suggestedCodeTask": "Build minimal CUDA or CPU Docker image containerizing model dependencies.",
        "suggestedUnderstandPrompt": "Explain how Docker Containerization for AI Systems works under the hood and its typical interview failure cases.",
        "whyItMatters": "Runs reproducibly in Kubernetes, Cloud Run, or any server environment."
      },
      {
        "id": "swe-ai systems-3",
        "title": "Asynchronous Task Queues for Heavy LLM/ML Inference",
        "moduleIndex": 8,
        "moduleName": "AI Systems Software Engineering",
        "category": "swe",
        "suggestedCodeTask": "Queue long-running inference jobs in Celery/Redis; return polling job_id.",
        "suggestedUnderstandPrompt": "Explain how Asynchronous Task Queues for Heavy LLM/ML Inference works under the hood and its typical interview failure cases.",
        "whyItMatters": "Prevents HTTP socket timeouts on 30-second generative AI tasks."
      },
      {
        "id": "swe-ai systems-4",
        "title": "Vector Database Integration & Index Maintenance",
        "moduleIndex": 8,
        "moduleName": "AI Systems Software Engineering",
        "category": "swe",
        "suggestedCodeTask": "Build ingestion pipeline synchronizing relational DB updates into vector store.",
        "suggestedUnderstandPrompt": "Explain how Vector Database Integration & Index Maintenance works under the hood and its typical interview failure cases.",
        "whyItMatters": "Keeps RAG search index strictly fresh as user data changes."
      },
      {
        "id": "swe-ai systems-5",
        "title": "Production Model Monitoring & Data Drift Detection",
        "moduleIndex": 8,
        "moduleName": "AI Systems Software Engineering",
        "category": "swe",
        "suggestedCodeTask": "Compute Kolmogorov-Smirnov test comparing inference distribution to training split.",
        "suggestedUnderstandPrompt": "Explain how Production Model Monitoring & Data Drift Detection works under the hood and its typical interview failure cases.",
        "whyItMatters": "Alerts engineers when production reality diverges from training data."
      },
      {
        "id": "swe-ai systems-6",
        "title": "Full AI Product Architecture Integration",
        "moduleIndex": 8,
        "moduleName": "AI Systems Software Engineering",
        "category": "swe",
        "suggestedCodeTask": "Connect React frontend, FastAPI gateway, Postgres, Vector DB, and LLM provider.",
        "suggestedUnderstandPrompt": "Explain how Full AI Product Architecture Integration works under the hood and its typical interview failure cases.",
        "whyItMatters": "The complete AI-Powered Engineer milestone: build and ship end-to-end."
      }
    ]
  }
];

// Flattened helper for instant search
export const ALL_SYLLABUS_TOPICS = [
  ...MASTER_AI_MODULES.flatMap(m => m.topics),
  ...MASTER_SWE_PILLARS.flatMap(p => p.topics),
];

export const TOTAL_SYLLABUS_TOPICS_COUNT = ALL_SYLLABUS_TOPICS.length;
export const TOTAL_AI_TOPICS_COUNT = MASTER_AI_MODULES.reduce((sum, m) => sum + m.topics.length, 0);
export const TOTAL_SWE_TOPICS_COUNT = MASTER_SWE_PILLARS.reduce((sum, p) => sum + p.topics.length, 0);

// Total minimum weeks calculation
export const TOTAL_AI_MIN_WEEKS = MASTER_AI_MODULES.reduce((sum, m) => sum + (m.minWeeks || 0), 0);
