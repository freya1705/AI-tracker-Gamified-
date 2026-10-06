// 36-Week Placement Roadmap & Weekly Engine Data
// Software Engineer first. AI-powered engineer second.

export interface WeeklyTrackSplit {
  track: string;
  hours: number;
  icon: string;
  focus: string;
  color: string;
}

export interface PhaseWeek {
  weekNum: number;
  title: string;
  learn: string[];
  build: string[];
  dsa: string[];
  output: string;
  architecture?: string[];
  milestone?: string;
}

export interface PlacementPhase {
  phaseNum: number;
  weeksRange: string;
  title: string;
  icon: string;
  tagline: string;
  weeks: PhaseWeek[];
  milestoneTitle?: string;
  badge: string;
}

export interface ContinuousTrack {
  name: string;
  icon: string;
  description: string;
  schedule: {
    period: string;
    topics: string;
    rule?: string;
  }[];
}

export interface PriorityTier {
  tierNum: number;
  label: string;
  color: string;
  tagline: string;
  items: string[];
}

export const WEEKLY_SPLIT_DATA: WeeklyTrackSplit[] = [
  { track: 'DSA (Java)', hours: 6, icon: '🧠', focus: 'Problem solving, patterns & dry runs (Arrays → DP)', color: 'amber' },
  { track: 'Backend / Cloud / Systems', hours: 7, icon: '💻', focus: 'Spring Boot, DBs, Docker, AWS, Distributed Systems', color: 'indigo' },
  { track: 'Project Application', hours: 4, icon: '🚀', focus: 'Real repository commits & PatientTriage.ai flagship', color: 'emerald' },
  { track: 'CS Fundamentals', hours: 2, icon: '📚', focus: 'OOP → DBMS → OS → CN (connected to real project code)', color: 'purple' },
  { track: 'AI Power Layer', hours: 1, icon: '🤖', focus: 'LLM APIs, Structured JSON, Embeddings, RAG & Agents', color: 'cyan' },
];

export const PRIORITY_TIERS_DATA: PriorityTier[] = [
  {
    tierNum: 1,
    label: '🔴 Tier 1 — MUST Become Strong',
    color: 'rose',
    tagline: 'Non-negotiable core for technical interviews & daily work',
    items: ['DSA (Java)', 'Java OOP', 'DBMS & SQL', 'Operating Systems (OS)', 'Computer Networks (CN)', 'Backend Engineering', 'Testing', 'Real Projects']
  },
  {
    tierNum: 2,
    label: '🟠 Tier 2 — Strong Working Knowledge',
    color: 'amber',
    tagline: 'Operational confidence to deploy and debug',
    items: ['Linux & Bash CLI', 'Docker Containerization', 'AWS Cloud (EC2, RDS, S3, ALB)', 'CI/CD Pipelines (GitHub Actions)', 'Security Basics', 'Production Debugging', 'LLD', 'System Design']
  },
  {
    tierNum: 3,
    label: '🟡 Tier 3 — Important Specialization',
    color: 'yellow',
    tagline: 'Systems depth to stand out in senior/systems rounds',
    items: ['Redis Caching', 'Message Queues', 'Kafka Basics', 'Distributed Systems', 'Kubernetes Deployment', 'Terraform Basics']
  },
  {
    tierNum: 4,
    label: '🟢 Tier 4 — AI Power Layer',
    color: 'emerald',
    tagline: 'Amplifier on top of strong SWE foundations',
    items: ['LLM APIs', 'Prompt & Context Design', 'RAG (Embeddings + Vector Search)', 'AI Agents & Tool Calling', 'Evaluation & Observability', 'AI Security']
  },
  {
    tierNum: 5,
    label: '🔵 Later — Post-Placement Depth',
    color: 'blue',
    tagline: 'Learn after landing the job or during advanced specialization',
    items: ['Advanced Kubernetes Administration', 'Multi-Region Terraform', 'Fine-Tuning & LoRA', 'Model Quantization', 'Deep AI Research Reproductions']
  }
];

export const CONTINUOUS_TRACKS_DATA: ContinuousTrack[] = [
  {
    name: 'DSA Continuous Engine (Week 1 → Week 36)',
    icon: '🧠',
    description: 'Do not wait until Week 29. DSA runs uninterrupted from Day 1 to Placement Day.',
    schedule: [
      { period: 'Weeks 1–4', topics: 'Arrays → Strings → HashMap → Two pointers → Sliding window' },
      { period: 'Weeks 5–8', topics: 'Linked List → Stack → Queue → Binary Search → Recursion' },
      { period: 'Weeks 9–12', topics: 'Trees → BST → Heap → Trie' },
      { period: 'Weeks 13–16', topics: 'Graphs → BFS → DFS → Topological Sort' },
      { period: 'Weeks 17–20', topics: 'Union Find → Greedy → Backtracking' },
      { period: 'Weeks 21–24', topics: 'Dynamic Programming (DP)' },
      { period: 'Weeks 25–28', topics: 'Mixed DSA + Timed problem sets' },
      { period: 'Weeks 29–36', topics: 'Interview DSA + Re-solving past failures + Mock evaluations' }
    ]
  },
  {
    name: 'CS Fundamentals Continuous Engine (2–3 Hours/Week)',
    icon: '📚',
    description: 'Do not spend 2 months only reading OS theory. Connect concepts directly to your backend project code.',
    schedule: [
      { period: 'Month 1', topics: 'OOP: Classes, Interfaces, Inheritance, Polymorphism, SOLID principles' },
      { period: 'Month 2', topics: 'DBMS: Transactions, ACID, Indexing, Connection pooling, Normalization ("Why connection pool?")' },
      { period: 'Month 3', topics: 'OS: Processes, Threads, Concurrency, Deadlocks, Memory management ("Why multithread bug?")' },
      { period: 'Month 4', topics: 'CN: TCP/IP, HTTP/HTTPS, DNS, Sockets, Latency, Timeouts ("Why does API timeout?")' },
      { period: 'Month 5', topics: 'Advanced DBMS, OS & Networking deep dives' },
      { period: 'Month 6', topics: 'Interview rapid-fire revision & viva simulation' }
    ]
  },
  {
    name: 'AI Continuous Power Layer',
    icon: '🤖',
    description: 'Software Engineer first. AI-powered engineer second.',
    schedule: [
      { period: 'Weeks 1–12', topics: 'Maintain AI learning: LLM APIs, Prompting, Structured JSON output, Embeddings, RAG basics' },
      { period: 'Weeks 13–24', topics: 'Use AI inside projects: Document analysis, automated tagging, contextual search' },
      { period: 'Weeks 25–28', topics: 'Deepen AI inside PatientTriage.ai flagship: Clinical triage risk explainability, citations & human override' },
      { period: 'After Week 28', topics: 'Advanced AI systems: Stateful agents (LangGraph), Evals (LangSmith), AI Security & System Design' }
    ]
  }
];

export const PLACEMENT_PHASES_DATA: PlacementPhase[] = [
  {
    phaseNum: 1,
    weeksRange: 'Weeks 1–4',
    title: 'Backend Foundation',
    icon: '🛠️',
    badge: 'Phase 1: Foundation',
    tagline: 'Understand what happens when a frontend calls a backend API',
    weeks: [
      {
        weekNum: 1,
        title: 'Java + HTTP + REST',
        learn: ['Java revision & syntax', 'OOP (Classes, Inheritance, Polymorphism)', 'Java Collections Framework', 'Exceptions & error handling', 'Big-O algorithmic notation', 'HTTP methods & status codes', 'REST API principles', 'JSON payload structures', 'Request/Response lifecycle'],
        build: ['Start a small Spring Boot service with basic endpoints'],
        dsa: ['Arrays', 'Strings', 'HashMap', 'Big-O complexity calculations'],
        output: 'You understand what happens when a frontend calls a backend API.'
      },
      {
        weekNum: 2,
        title: 'Spring Boot Architecture',
        learn: ['Controller layer', 'Service layer (business logic)', 'Repository layer (data access)', 'Dependency Injection (IoC)', 'Data Transfer Objects (DTOs)', 'Application configuration (application.properties/yml)'],
        build: ['Controller → Service → Repository → Database data flow pipeline'],
        dsa: ['Two pointers', 'Sliding window', 'Prefix sum'],
        output: 'Basic REST backend working with clean layered architecture.'
      },
      {
        weekNum: 3,
        title: 'PostgreSQL + JPA / Hibernate',
        learn: ['SQL queries & Joins (INNER, LEFT, RIGHT)', 'Primary & Foreign Keys', 'Entity relationships (@OneToMany, @ManyToOne)', 'Database normalization (1NF, 2NF, 3NF)', 'B-Tree indexes intuition', 'ACID transactions basics', 'Spring Data JPA & Hibernate ORM'],
        build: ['Proper PostgreSQL database integration with repository methods'],
        dsa: ['Linked List', 'Stack', 'Queue'],
        output: 'Backend connected to a real relational database with schema integrity.'
      },
      {
        weekNum: 4,
        title: 'Authentication + Automated Testing',
        learn: ['Authentication vs Authorization', 'JWT (JSON Web Tokens) stateless flow', 'Password hashing (BCrypt)', 'Input validation (@Valid, Pydantic/BeanValidation)', 'Unit testing (JUnit, Mockito)', 'Integration testing with test database', 'API testing with Postman / curl'],
        build: ['Apply authentication & tests to one of your existing backend projects'],
        dsa: ['Linked List cycles', 'Monotonic Stack', 'Queue BFS queueing'],
        output: '"I can build a proper, secured, tested backend."'
      }
    ]
  },
  {
    phaseNum: 2,
    weeksRange: 'Weeks 5–8',
    title: 'Production Backend',
    icon: '🚀',
    badge: 'Phase 2: Production',
    tagline: 'Stop learning isolated concepts. Build production-grade reliability.',
    milestoneTitle: 'MILESTONE 1: BACKEND ENGINEER',
    weeks: [
      {
        weekNum: 5,
        title: 'Resilience, Logging & Clean APIs',
        learn: ['Global exception handling (@ControllerAdvice)', 'Structured logging (SLF4J / Logback / Python logging)', 'Environment variables & config management', 'API documentation with Swagger / OpenAPI', 'Pagination & slicing', 'Filtering and dynamic sorting'],
        build: ['Add pagination, global exception handlers, and OpenAPI docs to backend'],
        dsa: ['Binary search', 'Sorting algorithms', 'Recursion basics'],
        output: 'Robust APIs with clean error responses and interactive Swagger docs.'
      },
      {
        weekNum: 6,
        title: 'Database Optimization & Concurrency',
        learn: ['Database indexing strategies (composite, unique, partial)', 'EXPLAIN ANALYZE query optimization', 'Connection pooling (HikariCP mechanics)', 'Transaction isolation levels & dirty reads', 'Concurrency basics & thread safety'],
        build: ['Benchmark and index heavy query endpoints; tune connection pool'],
        dsa: ['Binary Trees', 'Binary Search Trees (BST)', 'Tree Traversals (Inorder, Preorder, Postorder, Level-order)'],
        output: 'Fast queries with connection pool sizing and transaction safety.'
      },
      {
        weekNum: 7,
        title: 'Backend Security & Hardening',
        learn: ['Security fundamentals (OWASP Top 10)', 'SQL Injection mitigation (prepared statements)', 'Cross-Site Scripting (XSS) prevention', 'Cross-Site Request Forgery (CSRF)', 'Rate limiting algorithms (Token bucket / Leaky bucket)', 'HTTPS, SSL/TLS certificates & headers'],
        build: ['Implement rate limiter middleware and security headers on endpoints'],
        dsa: ['Heap / Priority Queue', 'Trie (Prefix Tree)'],
        output: 'Hardened backend resisting injection, abusive traffic, and unauthorized access.'
      },
      {
        weekNum: 8,
        title: 'Backend Project Milestone',
        learn: ['Code reviews', 'End-to-end integration verification', 'Refactoring code smells', 'Writing clear architectural READMEs'],
        build: ['Verify backend checklist: REST API + PostgreSQL + Auth + Validation + Error Handling + Logging + Tests + Docs'],
        dsa: ['Mixed Tree & Heap problems', 'Timed problem sets'],
        output: '🎯 MILESTONE 1: BACKEND ENGINEER. A fully documented, tested, production-grade backend.',
        milestone: 'Milestone 1: Backend Engineer'
      }
    ]
  },
  {
    phaseNum: 3,
    weeksRange: 'Weeks 9–12',
    title: 'Linux + Docker',
    icon: '🐳',
    badge: 'Phase 3: Containerization',
    tagline: 'Learn how your application actually runs underneath the runtime',
    milestoneTitle: 'MILESTONE 2: CONTAINER & DEBUG MASTER',
    weeks: [
      {
        weekNum: 9,
        title: 'Linux CLI & Systems Mastery',
        learn: ['Core terminal commands: cd, ls, mkdir, rm, cp, mv, grep, find', 'Process management: ps, top, kill, systemctl', 'Networking CLI: curl, ss, netstat, ping, ssh', 'File permissions & ownership: chmod, chown', 'Processes, ports, file descriptors, logs, env vars'],
        build: ['Navigate, inspect processes, trace logs, and manage ports via terminal'],
        dsa: ['Graphs basics', 'Adjacency list / matrix', 'Breadth-First Search (BFS)'],
        output: 'Complete comfort in a headless Linux environment.'
      },
      {
        weekNum: 10,
        title: 'Docker Fundamentals',
        learn: ['Docker Image vs Container', 'Writing multi-stage Dockerfiles', 'Port mapping (-p)', 'Named volumes for data persistence', 'Docker bridge networks', 'Passing environment variables safely'],
        build: ['Containerize your Spring Boot / FastAPI backend into a lean Docker image'],
        dsa: ['Depth-First Search (DFS)', 'Cycle detection in directed & undirected graphs'],
        output: 'Containerized backend running portably on any machine.'
      },
      {
        weekNum: 11,
        title: 'Docker Compose Multi-Container Systems',
        learn: ['Docker Compose syntax & orchestration', 'Co-locating Backend + PostgreSQL container', 'Container health checks & dependency order (depends_on)', 'Network isolation between services', 'Persistent volume mounting for PostgreSQL data'],
        build: ['Docker Compose setup spinning up Backend + PostgreSQL with 1 command (docker compose up)'],
        dsa: ['Topological Sort (Kahn algorithm / DFS)', 'Bipartite Graphs'],
        output: 'Single-command local multi-service orchestration with persistent storage.'
      },
      {
        weekNum: 12,
        title: 'Production Debugging & Code Reading',
        learn: ['Production debugging playbook: App broke → inspect logs → reproduce → root cause → fix → test', 'Interpreting stack traces across container boundaries', 'Reading open-source production code repositories'],
        build: ['Intentionally break configuration/database connection, diagnose via logs, and patch'],
        dsa: ['Shortest Path (Dijkstra algorithm)', 'Graph practice'],
        output: '🎯 MILESTONE 2: I can build + containerize + debug a backend application.',
        milestone: 'Milestone 2: Container & Debug Master'
      }
    ]
  },
  {
    phaseNum: 4,
    weeksRange: 'Weeks 13–16',
    title: 'AWS + Deployment + CI/CD',
    icon: '☁️',
    badge: 'Phase 4: Cloud & Deployment',
    tagline: 'Now your application leaves your laptop and lives in the cloud',
    milestoneTitle: 'MILESTONE 3: CLOUD-DEPLOYED ENGINEER',
    weeks: [
      {
        weekNum: 13,
        title: 'AWS Fundamentals & EC2 Deployment',
        learn: ['AWS Global Infrastructure: Regions & Availability Zones (AZs)', 'EC2 instances & AMI selection', 'IAM users, roles, and least-privilege policies', 'Security Groups & inbound/outbound firewall rules'],
        build: ['Provision an EC2 instance, SSH into it, install Docker, and deploy backend'],
        dsa: ['Disjoint Set / Union Find (DSU)', 'Kruskal Minimum Spanning Tree'],
        output: 'Live public IP running your containerized backend on AWS.'
      },
      {
        weekNum: 14,
        title: 'VPC Networking & Managed Databases (RDS)',
        learn: ['Virtual Private Cloud (VPC), public vs private subnets', 'Route tables & Internet Gateway (IGW)', 'AWS RDS (Relational Database Service) managed PostgreSQL', 'AWS S3 (Simple Storage Service) for assets and backups'],
        build: ['Architecture: Internet → EC2 (Docker Backend) → RDS PostgreSQL in private subnet'],
        dsa: ['Greedy algorithms', 'Interval scheduling', 'Gas Station / Jump Game patterns'],
        output: 'Production architecture separating compute (EC2) from managed data (RDS).'
      },
      {
        weekNum: 15,
        title: 'Load Balancing & CloudWatch Monitoring',
        learn: ['Application Load Balancer (ALB) & health check target groups', 'Route 53 DNS routing & custom domains', 'AWS CloudWatch metrics, log groups, and alerting alarms'],
        build: ['Architecture: Internet → ALB → EC2 (Docker Backend) → RDS; configure CloudWatch alarms'],
        dsa: ['Backtracking fundamentals', 'Subsets, Permutations, Combinations'],
        output: 'High-availability deployment with load balancer and real-time operational metrics.'
      },
      {
        weekNum: 16,
        title: 'Automated CI/CD with GitHub Actions',
        learn: ['GitHub Actions workflows (.github/workflows)', 'Pipeline stages: git push → tests → build → Docker image → deploy', 'Storing AWS credentials securely in GitHub Secrets'],
        build: ['Automated pipeline: push to main triggers test suite, builds image, and updates EC2 deployment'],
        dsa: ['Sudoku solver / N-Queens backtracking', 'Mixed graph & greedy review'],
        output: '🎯 MILESTONE 3: CLOUD-DEPLOYED ENGINEER. Zero-downtime automated deployment on every commit.',
        milestone: 'Milestone 3: Cloud-Deployed Engineer'
      }
    ]
  },
  {
    phaseNum: 5,
    weeksRange: 'Weeks 17–20',
    title: 'Distributed Systems',
    icon: '🌐',
    badge: 'Phase 5: Distributed Systems',
    tagline: 'Start thinking like a systems engineer: scaling, caching, reliability, and async queues',
    milestoneTitle: 'MILESTONE 4: SYSTEMS FOUNDATION',
    weeks: [
      {
        weekNum: 17,
        title: 'Scaling Paradigms & Statelessness',
        learn: ['Vertical scaling vs Horizontal scaling trade-offs', 'Stateless services vs stateful sessions', 'Load balancing algorithms (Round Robin, Least Connections, IP Hash)', 'Core question: "Why cannot we just buy one bigger server forever?"'],
        build: ['Spin up multiple stateless backend instances behind a load balancer with shared session/DB'],
        dsa: ['Dynamic Programming (1D DP)', 'Climbing Stairs, House Robber, Coin Change'],
        output: 'Deep intuition on horizontal scale limits and stateless backend design.'
      },
      {
        weekNum: 18,
        title: 'Redis Caching & Invalidation Patterns',
        learn: ['Why caching is essential for low latency', 'Redis in-memory key-value data structures', 'Cache-Aside (Lazy loading) pattern', 'Cache Invalidation strategies & TTL (Time To Live)', 'Cache stampede / cache penetration mitigation'],
        build: ['Architecture: User → Backend → Redis (Cache hit) / PostgreSQL (Cache miss + write to Redis)'],
        dsa: ['2D Dynamic Programming', 'Unique Paths, Longest Common Subsequence (LCS)'],
        output: 'Sub-10ms response times for high-volume reads using Redis Cache-Aside.'
      },
      {
        weekNum: 19,
        title: 'Distributed Reliability & Fault Tolerance',
        learn: ['Network timeouts & retry storms', 'Exponential backoff with jitter', 'Circuit Breaker pattern (Resilience4j / tenacity)', 'Idempotency keys for payment & mutation APIs', 'Failure handling: "What happens if this server/database/API suddenly fails?"'],
        build: ['Wrap external API calls in circuit breaker with exponential backoff and idempotency keys'],
        dsa: ['0/1 Knapsack pattern', 'Partition Equal Subset Sum', 'Coin Change 2'],
        output: 'Resilient services that gracefully degrade rather than cascading into system outages.'
      },
      {
        weekNum: 20,
        title: 'Asynchronous Systems & Message Queues',
        learn: ['Synchronous vs Asynchronous request handling', 'Message Queues (RabbitMQ / SQS / Redis Streams)', 'Producer-Consumer architectural pattern', 'Apache Kafka core fundamentals (Topics, Partitions, Offsets, Consumer Groups)'],
        build: ['Architecture: Service A → Queue / Topic → Service B (decoupling slow tasks like emails/reports)'],
        dsa: ['Longest Increasing Subsequence (LIS)', 'DP on strings (Edit Distance)'],
        output: '🎯 MILESTONE 4: SYSTEMS FOUNDATION. Decoupled async architecture using queues and caching.',
        milestone: 'Milestone 4: Systems Foundation'
      }
    ]
  },
  {
    phaseNum: 6,
    weeksRange: 'Weeks 21–24',
    title: 'System Design + Kubernetes',
    icon: '🏗️',
    badge: 'Phase 6: High-Scale Architecture',
    tagline: 'Understand how large-scale consumer applications are designed, deployed, and partitioned',
    milestoneTitle: 'MILESTONE 5: LARGE-SCALE ARCHITECT',
    weeks: [
      {
        weekNum: 21,
        title: 'System Design Framework & Core Primitives',
        learn: ['7-Step System Design Framework: Requirements → API → Database → Architecture → Scaling → Failures → Trade-offs', 'High-level vs Low-level design boundaries'],
        build: ['End-to-end designs for URL Shortener (TinyURL) and Distributed Rate Limiter'],
        dsa: ['DP on Trees', 'House Robber III / Binary Tree Maximum Path Sum'],
        output: 'Structured, confident whiteboard system design communication framework.'
      },
      {
        weekNum: 22,
        title: 'High-Scale Storage, Partitioning & CAP Theorem',
        learn: ['Database replication (Primary-Replica)', 'Database partitioning and horizontal sharding', 'CAP Theorem (Consistency, Availability, Partition Tolerance)', 'PACELC theorem & eventual consistency models'],
        build: ['Designs for Real-time Chat System (WebSockets), Notification System, and Distributed File Storage (S3-like)'],
        dsa: ['Bit Manipulation', 'Single Number, Counting Bits, Reverse Bits'],
        output: 'Clear architectural reasoning across sharding, consistency models, and CAP trade-offs.'
      },
      {
        weekNum: 23,
        title: 'Kubernetes (K8s) Core Architecture',
        learn: ['Kubernetes architecture: Control Plane vs Worker Nodes', 'K8s primitives: Pod, Deployment, Service (ClusterIP, NodePort, LoadBalancer)', 'Ingress controllers & routing rules', 'Namespaces, ConfigMaps, and Secrets', 'Rule: Do not get lost in cluster admin; focus on deployment manifests'],
        build: ['Write Kubernetes YAML manifests (Deployment + Service + ConfigMap) for your containerized backend'],
        dsa: ['Trie practice', 'Word Search II / Maximum XOR of Two Numbers'],
        output: 'Declarative K8s deployment manifests ready for cluster rollouts.'
      },
      {
        weekNum: 24,
        title: 'Kubernetes Cluster Deployment',
        learn: ['Deploying multi-tier application on local or managed K8s (Minikube / Kind / EKS)', 'Self-healing containers (liveness & readiness probes)', 'Rolling updates and zero-downtime deployments'],
        build: ['Architecture: User → Ingress → Service → Pods (Backend) → Database; verify rolling update'],
        dsa: ['Sliding Window Maximum', 'Trapping Rain Water / Monotonic Queue'],
        output: '🎯 MILESTONE 5: I understand how large applications are designed, deployed and scaled on K8s.',
        milestone: 'Milestone 5: Large-Scale Architect'
      }
    ]
  },
  {
    phaseNum: 7,
    weeksRange: 'Weeks 25–28',
    title: 'PatientTriage.ai Flagship Project',
    icon: '🏆',
    badge: 'Phase 7: Flagship Project',
    tagline: 'Combine everything: FastAPI + AI + PostgreSQL + Systems + Cloud. Do NOT rewrite to Java!',
    milestoneTitle: 'FLAGSHIP PROJECT READY',
    weeks: [
      {
        weekNum: 25,
        title: 'PatientTriage: Clean Backend & Data Schema',
        learn: ['Keep FastAPI backend: demonstrates Python + AI + Systems strength', 'Clean API routing, Pydantic schemas, PostgreSQL relational triage data model', 'JWT clinical authentication and role-based permissions (Nurse vs Doctor)'],
        build: ['Refactor PatientTriage core backend with structured database migrations and validated endpoints'],
        dsa: ['Mixed LeetCode Mediums', 'Timed 45-minute mock sessions'],
        output: 'Rock-solid clinical backend with strict data contracts and auth.'
      },
      {
        weekNum: 26,
        title: 'PatientTriage: Reliability, Redis & Queues',
        learn: ['Automated test suite (pytest + HTTP client)', 'Structured clinical audit logging', 'Security hardening & rate limiting', 'Redis caching for frequent triage reference scores', 'Background queues for heavy report exports / alerts'],
        build: ['Integrate Redis caching + background worker into PatientTriage'],
        dsa: ['Graph + DP mixed sets', 'Recognizing subtle DP vs Greedy patterns'],
        output: 'Fast, tested, resilient hospital emergency alert service.'
      },
      {
        weekNum: 27,
        title: 'PatientTriage: Container, Cloud & CI/CD',
        learn: ['Multi-stage Docker build for FastAPI + ML inference runtime', 'AWS deployment (EC2/ECS + RDS PostgreSQL)', 'GitHub Actions CI/CD pipeline running tests and pushing container', 'CloudWatch / Prometheus latency & error rate monitoring'],
        build: ['Deploy PatientTriage live to a public URL with automated CI/CD pipeline'],
        dsa: ['Interview speed drills: 2 Mediums in 40 minutes'],
        output: 'Public live HTTPS URL of PatientTriage running in the cloud with automated builds.'
      },
      {
        weekNum: 28,
        title: 'PatientTriage: AI Depth, Audits & Presentation',
        learn: ['AI explainability layer: Plain-English "Why?" clinical justifications grounded in vital signs', 'Strict schema validation preventing hallucination of medical dosages', 'Human-in-the-loop override & audit trail for clinician decisions', 'Preparing architecture diagrams, database schema diagrams, and interactive Swagger docs'],
        build: ['Complete Flagship Artifact: Live Web App + Demo Video + Architecture Diagram + Comprehensive GitHub README'],
        dsa: ['Company-specific problem sets (Amazon, Google, Microsoft tagged Mediums)'],
        output: '🎯 FLAGSHIP PROJECT READY. A portfolio piece interviewers can inspect, test, and discuss deeply.',
        milestone: 'Flagship Project Ready'
      }
    ]
  },
  {
    phaseNum: 8,
    weeksRange: 'Weeks 29–32',
    title: 'LLD + Interview Engine',
    icon: '🎤',
    badge: 'Phase 8: Interview Engine',
    tagline: 'Shift from learning to proving. Master object-oriented design and project grilling.',
    milestoneTitle: 'MILESTONE 6: INTERVIEW READY FOUNDATION',
    weeks: [
      {
        weekNum: 29,
        title: 'Low-Level Design (LLD) & SOLID Principles',
        learn: ['Classes, Interfaces, Abstract Classes', 'SOLID design principles in real Java/Python code', 'Composition over Inheritance', 'Essential Design Patterns: Factory, Strategy, Observer, Singleton, Decorator'],
        build: ['Code implementations for: Parking Lot System, Library Management System, ATM Machine'],
        dsa: ['Advanced Trees & Graphs revision', 'Binary Tree cameras / Word Ladder II'],
        output: 'Modular, extensible object-oriented code adhering to clean design patterns.'
      },
      {
        weekNum: 30,
        title: 'Complex LLD & Verbal Articulation',
        learn: ['Speaking code aloud: Clarify requirements → Design classes → Define relationships → Implement methods', 'Handling concurrency in LLD (thread-safe queues, locks)'],
        build: ['Code & explain aloud: Elevator System, Food Ordering System (Swiggy/Zomato), Tic-Tac-Toe Game'],
        dsa: ['Dynamic Programming revision', 'Harder 2D DP & knapsack variants'],
        output: 'Confidence walking interviewers through OOP class diagrams and clean implementations.'
      },
      {
        weekNum: 31,
        title: 'Project Grilling Defense Session',
        learn: ['Defending every single architectural choice in PatientTriage: Why FastAPI over Spring Boot? Why PostgreSQL? Why Redis? Why AI? What happens if DB fails? How to handle 10x traffic? Hardest bug faced? How tested? What would you change in v2?'],
        build: ['Write a 2-page "Project Defense Sheet" with answers to all 10 grilling questions'],
        dsa: ['Weak-area targeting: Re-solving every problem failed in past 3 months'],
        output: 'Unshakeable project defense: able to justify every trade-off and failure case.'
      },
      {
        weekNum: 32,
        title: 'System Design Full Simulations',
        learn: ['45-minute timed system design whiteboard practice', 'Back-of-the-envelope capacity estimations (QPS, storage, bandwidth)', 'Synthesizing caches, queues, databases, and microservices'],
        build: ['Complete timed design walkthroughs: URL Shortener, Instagram Photo Feed, Food Delivery Tracking, PatientTriage Scaled'],
        dsa: ['Top 50 Most Frequently Asked Interview Problems'],
        output: '🎯 MILESTONE 6: INTERVIEW READY FOUNDATION. Fluent in LLD, HLD, and project defense.',
        milestone: 'Milestone 6: Interview Ready Foundation'
      }
    ]
  },
  {
    phaseNum: 9,
    weeksRange: 'Weeks 33–36',
    title: 'Placement Mode',
    icon: '🎯',
    badge: 'Phase 9: Placement Mode',
    tagline: 'Stop adding technologies endlessly. Enter execution & interview conversion mode.',
    milestoneTitle: 'PLACEMENT READY → OFFER RECEIVED',
    weeks: [
      {
        weekNum: 33,
        title: 'Placement Pipeline & Resume Polish',
        learn: ['Single-page ATS-optimized engineering resume highlighting PatientTriage & Spring Boot', 'GitHub profile clean-up (pinned repos, professional READMEs, test coverage badges)', 'LinkedIn profile & cold outreach messaging to tech recruiters/engineers'],
        build: ['Polished Resume + GitHub + LinkedIn live; send first batch of 15 targeted applications'],
        dsa: ['Timed Online Assessment (OA) simulation: 3 problems in 75 minutes'],
        output: 'Active candidate profile in recruitment pipelines with high-response resume.'
      },
      {
        weekNum: 34,
        title: 'Behavioral Stories & Thoughtworks Pair Programming',
        learn: ['STAR method for behavioral questions (Situation, Task, Action, Result)', 'Handling "Tell me about a conflict", "Failure story", "Leadership without authority"', 'Thoughtworks pair-programming interview practice: clean code, test-driven development (TDD), vocal collaboration'],
        build: ['Script and practice 6 core STAR behavioral stories from college & project history'],
        dsa: ['Mixed sets: 1 Easy (10 min) + 2 Medium (20 min each) without IDE assistance'],
        output: 'Vocal, collaborative pair-programming maturity and compelling behavioral delivery.'
      },
      {
        weekNum: 35,
        title: 'MAANG Online Assessments & Mock Interviews',
        learn: ['MAANG OA patterns & edge cases (integer overflow, large inputs, recursion limits)', 'Full 60-minute mock technical interviews with peers / senior engineers', 'Post-interview retro: documenting every stumbling block and patching gaps immediately'],
        build: ['Complete 3 peer mock technical interviews with live coding & system design'],
        dsa: ['Fast pattern recognition: identifying algorithm within 90 seconds of reading prompt'],
        output: 'Peak exam conditioning with minimal interview anxiety.'
      },
      {
        weekNum: 36,
        title: 'Interview Conversion & Offer Negotiation',
        learn: ['Interview day stamina & mental centering', 'Questions to ask interviewers that demonstrate engineering depth', 'Offer evaluation: base salary, stock, growth trajectory, engineering culture'],
        build: ['Attend final interview rounds; convert technical preparation into strong offers!'],
        dsa: ['Light warm-up problems on interview mornings to prime problem-solving state'],
        output: '🎯 OFFER SECURED! Full transition from Student Builder to High-Value Software Engineer.',
        milestone: 'Offer Secured'
      }
    ]
  }
];

export const ACTUAL_ROADMAP_STAIRS = [
  { step: 'NOW', icon: '📍', label: 'Starting Line', desc: 'Consistency over perfection' },
  { step: 'DSA + JAVA + CS', icon: '🧠', label: 'Core Bedrock', desc: 'Java OOP, Big-O, DBMS, OS, CN' },
  { step: 'BACKEND', icon: '🛠️', label: 'Spring Boot + PostgreSQL', desc: 'REST, Auth, Testing, Validation' },
  { step: 'LINUX', icon: '🐧', label: 'Operating Environment', desc: 'Processes, Ports, CLI, Logs' },
  { step: 'DOCKER', icon: '🐳', label: 'Containerization', desc: 'Images, Compose, Portability' },
  { step: 'AWS', icon: '☁️', label: 'Cloud Infrastructure', desc: 'EC2, RDS, VPC, ALB, S3' },
  { step: 'CI/CD', icon: '🔄', label: 'Automated Delivery', desc: 'GitHub Actions, automated tests' },
  { step: 'DISTRIBUTED SYSTEMS', icon: '🌐', label: 'Scale & Caching', desc: 'Redis, Queues, Circuit Breakers' },
  { step: 'KUBERNETES', icon: '☸️', label: 'Container Orchestration', desc: 'Pods, Deployments, Ingress' },
  { step: 'SYSTEM DESIGN', icon: '🏗️', label: 'High-Scale Architecture', desc: 'Sharding, CAP, Rate Limiters' },
  { step: 'PATIENTTRIAGE.AI', icon: '🏆', label: 'Flagship Portfolio Piece', desc: 'FastAPI, AI, Cloud, Systems' },
  { step: 'LLD', icon: '🎤', label: 'Low-Level Design', desc: 'SOLID, Patterns, Parking Lot' },
  { step: 'INTERVIEW PREP', icon: '🎯', label: 'Mock Grilling & OAs', desc: 'Pair programming, STAR stories' },
  { step: 'APPLICATIONS', icon: '🚀', label: 'Pipeline Execution', desc: 'Targeted outreach & interviews' },
  { step: 'OFFER', icon: '🏁', label: 'Placement Won', desc: 'High-value Software Engineer' }
];

export const TOTAL_PLACEMENT_WEEKS = 36;
