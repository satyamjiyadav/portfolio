import { PortfolioData, Project } from '../types/portfolio';

const STORAGE_KEY = 'satyam_portfolio_data_v4';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Satyam Yadav',
    title: 'Backend & Distributed Systems Developer',
    subtitle: 'Production-Grade Systems • Scalable Architectures • AI Platforms Enthusiast',
    bio: 'Backend Developer passionate about designing robust, production-grade systems and exploring modern AI architectures. Driven by scalable event pipelines, clean system design, and high-performance backend engineering.',
    location: 'Bangalore, India',
    email: 'satyamjiyadav12345@gmail.com',
    phone: '+91-9140848072',
    linkedin: 'https://linkedin.com/in/satyam-yadav-40b898250',
    github: 'https://github.com/satyamjiyadav',
    leetcode: 'https://leetcode.com/u/satyamyadav1414',
    resumeUrl: '/resume.pdf',
    resumeName: 'Satyam_Yadav_SDE1_Resume.pdf',
    resumeUpdatedAt: 'Sept 2026',
    education: {
      degree: 'B.Tech — Computer Science and Engineering',
      college: 'Lovely Professional University',
      period: '2022 – 2026',
      cgpa: '8.26 CGPA'
    }
  },
  systemMetrics: [
    {
      id: 'throughput',
      label: 'Settlement Pipeline Throughput',
      value: '100K+',
      subtext: 'Daily Transactions Processed at Razorpay',
      iconName: 'Zap'
    },
    {
      id: 'latency',
      label: 'p99 Checkout Response Time',
      value: '<200ms',
      subtext: 'Decoupled Go & Apache Kafka Architecture',
      iconName: 'Activity'
    },
    {
      id: 'recovery',
      label: 'Reconciliation Recovery Speedup',
      value: '99.8%',
      subtext: 'Slashed from 5 days to 15 minutes',
      iconName: 'ShieldCheck'
    },
    {
      id: 'cdc',
      label: 'Kafka CDC Partition Scale',
      value: '30 Partitions',
      subtext: 'Zero Event Loss with 2-Tier Retries & DLQ',
      iconName: 'Layers'
    }
  ],
  experience: [
    {
      id: 'razorpay-sde',
      company: 'Razorpay',
      role: 'Software Development Engineer Intern',
      team: 'Payments Platform (Settlements)',
      location: 'Bangalore, India',
      period: 'Aug 2025 – Jun 2026',
      highlights: [
        {
          title: 'High-Throughput Settlement Pipeline',
          points: 'Engineered an async, event-driven pipeline (Golang, AWS SQS) to process transaction settlements post-hold releases. Achieved exact-once execution semantics, reliably processing 100K+ daily transactions with automated retries and high fault tolerance.',
          tag: 'Golang • AWS SQS',
          metricsGlow: '100K+ Txns/Day'
        },
        {
          title: 'Automated Reconciliation Engine',
          points: 'Implemented a pull-based reconciliation cron-service to recover missed webhook status updates from downstream Payout APIs. Slashed recovery time by 99.8% (from 5 days to 15 minutes) and eliminated 20+ monthly merchant escalations.',
          tag: 'Cron-Service • Webhooks',
          metricsGlow: '99.8% Time Slashed'
        },
        {
          title: 'Self-Healing Recovery Framework',
          points: 'Designed a resilient recovery system to prevent settlement drops during downstream outages. Reduced manual engineering interventions (PSE tickets) by 60% and prevented 3-hour SLA breaches via graceful degradation and DLQ processing.',
          tag: 'DLQ • Resiliency',
          metricsGlow: '60% PSE Reduction'
        },
        {
          title: 'Fault-Tolerant CDC Pipeline',
          points: 'Architected a highly available Kafka CDC pipeline for bank account synchronization across 30 partitions. Integrated two-tier retries and DLQ isolation, ensuring zero event loss during network or database anomalies.',
          tag: 'Kafka CDC • 30 Partitions',
          metricsGlow: 'Zero Event Loss'
        },
        {
          title: 'Microservices Migration & Observability',
          points: 'Decoupled 6 core settlement APIs from a legacy monolith into independent microservices with zero downtime using shadow deployments. Instrumented comprehensive telemetry (Grafana, Coralogix) across 48 API routes, eliminating system blind spots.',
          tag: 'Grafana • Coralogix • gRPC',
          metricsGlow: '48 Instrumented Routes'
        }
      ]
    }
  ],
  projects: [
    {
      id: 'payfast',
      title: 'PayFast',
      subtitle: 'Distributed Event-Driven Payment Processor',
      badge: 'Distributed Systems & FinTech',
      description: 'A production-ready distributed payment gateway engineered in Go and Apache Kafka. Features strict double-entry ledger accounting, sub-millisecond fraud velocity interception, and dynamic multi-tier batch settlements.',
      highlights: [
        'Decoupled synchronous checkout APIs from background processing with Apache Kafka, achieving <200ms p99 latency.',
        'Strict API Idempotency via PostgreSQL row-level locks and an ACID-compliant double-entry ledger guaranteeing zero financial discrepancies.',
        'Sub-millisecond Redis velocity engine intercepting carding attacks alongside an isolated AES-256-GCM encrypted PCI-compliant Vault.',
        'Dynamic cron engine handling multi-tier batch payouts (Instant / T+1 / T+24) deployed on Oracle Cloud with Nginx and React dashboard.'
      ],
      techStack: ['Go (Golang)', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Oracle Cloud', 'Nginx', 'React'],
      githubUrl: 'https://github.com/satyamjiyadav/PayFast-Processor',
      liveUrl: 'https://payfast-payment-app.duckdns.org/',
      metrics: [
        { label: 'p99 Response', value: '<200ms' },
        { label: 'Ledger Accuracy', value: '100% ACID' },
        { label: 'Fraud Intercept', value: '<1ms Redis' }
      ],
      architecture: {
        type: 'event-driven',
        flow: [
          'Client POST /checkout',
          'Redis Velocity & Fraud Check (<1ms)',
          'Postgres Idempotency Row-Lock',
          'Publish to Kafka Events Bus',
          'Worker Pool Batch Payouts (Instant/T+1)',
          'Double-Entry Ledger ACID Commit'
        ],
        deepDiveText: 'PayFast uses an event-driven architecture with Go goroutines listening on Kafka consumer groups. Idempotency keys are hashed and validated against a fast Redis cluster before falling back to PostgreSQL advisory locks. The Vault service operates in total isolation, decrypting sensitive tokens only in memory with AES-256-GCM.'
      }
    },
    {
      id: 'vaultmind',
      title: 'VaultMind',
      subtitle: 'Enterprise RAG & Knowledge Platform',
      badge: 'AI Systems & Vector Search',
      description: 'Multi-tenant Enterprise Knowledge Assistant built with Python, FastAPI, and PGVector. Enforces strict Role-Based Access Control (RBAC) inside 384-dimensional HNSW vector index queries with direct HTTP/2 Gemini 3.1 orchestration.',
      highlights: [
        'Secure RAG enforcing RBAC directly inside 384-dimensional HNSW vector similarity queries for strict department-level data isolation.',
        'Celery/Redis asynchronous ingestion pipeline offloading complex PDF/document chunking and embedding generation.',
        'Frameworkless direct HTTP/2 integration with Gemini 3.1 featuring exponential backoff retries for high availability.',
        'Zero-friction guest sandbox with automated 10-minute TTL cache pruning, Prometheus metrics, and SOC2-inspired audit logs.'
      ],
      techStack: ['Python', 'FastAPI', 'PGVector', 'PostgreSQL', 'Celery', 'Redis', 'Gemini 3.1', 'Docker', 'Prometheus'],
      githubUrl: 'https://github.com/satyamjiyadav/VaultMind',
      liveUrl: 'https://vaultmind-ai.duckdns.org/',
      metrics: [
        { label: 'Vector Index', value: '384-dim HNSW' },
        { label: 'Protocol', value: 'HTTP/2 Gemini' },
        { label: 'Security', value: 'RBAC Isolated' }
      ],
      architecture: {
        type: 'rag-vector',
        flow: [
          'Document Upload / Ingestion',
          'Celery Async Chunking Pipeline',
          'Embedding Generation (384-dim)',
          'PGVector HNSW Index + RBAC Clause',
          'Context Synthesis Engine',
          'Direct HTTP/2 Gemini 3.1 Stream'
        ],
        deepDiveText: 'VaultMind eliminates common RAG security vulnerabilities by embedding the security tenant and role filter directly into the vector cosine distance query in PostgreSQL using PGVector HNSW indexing. This guarantees zero cross-department data leakage.'
      }
    }
  ],
  skillCategories: [
    {
      id: 'backend-distributed',
      title: 'Distributed Systems & Architecture',
      description: 'Designing fault-tolerant, high-throughput scalable services',
      skills: [
        { name: 'Distributed Systems', highlight: true, tag: 'High-Throughput' },
        { name: 'Event-Driven Architecture', highlight: true, tag: 'Kafka/SQS' },
        { name: 'Microservices', highlight: true },
        { name: 'gRPC & Protobuf', highlight: true },
        { name: 'REST APIs & Webhooks' },
        { name: 'Idempotency & Double-Entry Ledger' },
        { name: 'CDC Pipelines (Debezium/Kafka)' },
        { name: 'Dead Letter Queues (DLQ)' }
      ]
    },
    {
      id: 'languages',
      title: 'Languages & Core Stack',
      description: 'Primary programming languages and core runtimes',
      skills: [
        { name: 'Go (Golang)', highlight: true, tag: 'Production at Razorpay' },
        { name: 'Python', highlight: true, tag: 'FastAPI / AI' },
        { name: 'C++', highlight: true, tag: 'Algorithms / Systems' },
        { name: 'JavaScript / TypeScript', highlight: true },
        { name: 'React', highlight: false },
        { name: 'FastAPI', highlight: true }
      ]
    },
    {
      id: 'databases-messaging',
      title: 'Databases & Message Brokers',
      description: 'ACID transaction stores, caching layers, and event brokers',
      skills: [
        { name: 'Apache Kafka', highlight: true, tag: '30 Partitions' },
        { name: 'PostgreSQL', highlight: true, tag: 'ACID & Locks' },
        { name: 'Redis', highlight: true, tag: 'Sub-ms Velocity' },
        { name: 'PGVector', highlight: true, tag: '384-dim HNSW' },
        { name: 'AWS SQS', highlight: true, tag: '100K+ txns' },
        { name: 'Celery' },
        { name: 'MySQL' }
      ]
    },
    {
      id: 'ai-engineering',
      title: 'AI Engineering & LLM Systems',
      description: 'Production RAG, agents, vector databases, and evaluation',
      skills: [
        { name: 'RAG (Vector & Vectorless)', highlight: true },
        { name: 'LangChain & LangGraph', highlight: true },
        { name: 'AI Agents & Orchestration', highlight: true },
        { name: 'LLM Gateways & Guardrails' },
        { name: 'HNSW Vector Indexes' },
        { name: 'LLM Evaluation & Benchmarking' }
      ]
    },
    {
      id: 'devops-observability',
      title: 'Cloud, DevOps & Observability',
      description: 'Containers, instrumentation, and infrastructure as code',
      skills: [
        { name: 'Docker', highlight: true },
        { name: 'Kubernetes', highlight: true },
        { name: 'Grafana & Coralogix', highlight: true, tag: '48 Routes Telemetry' },
        { name: 'Prometheus', highlight: true },
        { name: 'AWS (SQS, EC2, S3)' },
        { name: 'CI/CD Pipelines' },
        { name: 'GoMock & Table Testing' },
        { name: 'Cursor & AI-Assisted Dev' }
      ]
    }
  ],
  adminPasscodeHash: 'b3de7f090d21eddfcee98e798996f84c0f645d4320340af79cef206dd759a238' // SHA-256 hash of secret key
};

// Store helpers
export function getStoredPortfolioData(): PortfolioData {
  if (typeof window === 'undefined') return initialPortfolioData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPortfolioData));
      return initialPortfolioData;
    }
    const parsed = JSON.parse(raw);
    return { ...initialPortfolioData, ...parsed };
  } catch {
    return initialPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('portfolio-data-updated'));
  } catch (err) {
    console.error('Failed to save portfolio data:', err);
  }
}

export function resetPortfolioData(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('portfolio-data-updated'));
  } catch (err) {
    console.error('Failed to reset portfolio data:', err);
  }
}
