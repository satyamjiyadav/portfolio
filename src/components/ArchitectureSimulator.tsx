import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, Server, Cpu, Database, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { sound } from '../audio/soundEffects';

interface Step {
  id: string;
  name: string;
  sub: string;
  tech: string;
  icon: typeof Server;
  durationMs: number;
  log: string;
}

const PAYMENT_STEPS: Step[] = [
  {
    id: 'ingress',
    name: 'API Ingress & Idempotency',
    sub: 'POST /v1/checkout/settle',
    tech: 'Go / Fiber',
    icon: Server,
    durationMs: 400,
    log: '[INGRESS] Received settlement payload. Generated SHA-256 Idempotency Key.'
  },
  {
    id: 'velocity',
    name: 'Sub-ms Velocity Check',
    sub: 'Anti-Carding Engine',
    tech: 'Redis Memory',
    icon: Zap,
    durationMs: 350,
    log: '[REDIS] Velocity check executed in 0.8ms. Threshold 10 tx/sec: PASSED.'
  },
  {
    id: 'kafka',
    name: 'Kafka Partition Bus',
    sub: '30 Partitions Event Stream',
    tech: 'Apache Kafka',
    icon: Cpu,
    durationMs: 500,
    log: '[KAFKA] Event dispatched to partition #14. Zero event loss guarantee active.'
  },
  {
    id: 'worker',
    name: 'Go Settlement Worker',
    sub: 'AWS SQS Post-Hold Execution',
    tech: 'Golang / SQS',
    icon: Cpu,
    durationMs: 600,
    log: '[WORKER] Exact-once execution consumer spawned. Holding state unlocked.'
  },
  {
    id: 'ledger',
    name: 'Double-Entry Ledger',
    sub: 'ACID Financial Balance',
    tech: 'PostgreSQL Locks',
    icon: Database,
    durationMs: 450,
    log: '[LEDGER] Debit Merchant Escrow / Credit Bank. Discrepancy: $0.00 (ACID OK).'
  },
  {
    id: 'vault',
    name: 'Encrypted Vault & Payout',
    sub: 'AES-256-GCM Tokenization',
    tech: 'Vault Security',
    icon: ShieldCheck,
    durationMs: 400,
    log: '[VAULT] Payout confirmed. Zero-knowledge token cleared. p99: 184ms.'
  }
];

const RAG_STEPS: Step[] = [
  {
    id: 'rag-ingress',
    name: 'HTTP/2 Query Ingress',
    sub: 'FastAPI + Tenant RBAC',
    tech: 'FastAPI',
    icon: Server,
    durationMs: 400,
    log: '[FASTAPI] Query received with Dept RBAC token: "Security-Engineering".'
  },
  {
    id: 'celery',
    name: 'Async Task Ingestion',
    sub: 'Celery Distributed Queue',
    tech: 'Celery / Redis',
    icon: Cpu,
    durationMs: 450,
    log: '[CELERY] Offloaded parsing payload to worker queue. Redis broker ACK.'
  },
  {
    id: 'vector',
    name: '384-dim HNSW Vector Search',
    sub: 'PGVector Distance Query',
    tech: 'PGVector',
    icon: Database,
    durationMs: 550,
    log: '[PGVECTOR] 384-dimensional cosine distance computed. 5 nearest chunks found.'
  },
  {
    id: 'rbac',
    name: 'Data Isolation & Guardrails',
    sub: 'Department Filter Enforcement',
    tech: 'Python Core',
    icon: ShieldCheck,
    durationMs: 400,
    log: '[GUARDRAILS] RBAC Department Boundary enforced: 0 leaked cross-tenant tokens.'
  },
  {
    id: 'llm',
    name: 'Gemini 3.1 LLM Stream',
    sub: 'Exponential Backoff Retries',
    tech: 'Gemini HTTP/2',
    icon: Zap,
    durationMs: 650,
    log: '[GEMINI 3.1] Streaming synthesis delivered. Prometheus telemetry logged.'
  }
];

export default function ArchitectureSimulator() {
  const [activePipeline, setActivePipeline] = useState<'payment' | 'rag'>('payment');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    'System ready. Click "Execute Live Flow" to run distributed simulation.'
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const steps = activePipeline === 'payment' ? PAYMENT_STEPS : RAG_STEPS;

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleStart = async () => {
    if (isRunning) return;
    setIsRunning(true);
    sound.playClick();
    setLogs([`>>> [INITIALIZING] Simulating ${activePipeline === 'payment' ? 'PayFast Distributed Payment' : 'VaultMind Secure RAG'} Architecture...`]);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      sound.playPacketTravel();
      setLogs((prev) => [...prev, steps[i].log]);
      await new Promise((res) => setTimeout(res, steps[i].durationMs));
    }

    sound.playSuccess();
    setLogs((prev) => [
      ...prev,
      `>>> [SUCCESS] End-to-end pipeline finished with zero errors. All guarantees satisfied!`
    ]);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
    setIsRunning(false);
    sound.playClick();
    setLogs(['System reset. Standby for next pipeline execution.']);
  };

  const switchPipeline = (pipe: 'payment' | 'rag') => {
    if (isRunning) return;
    setActivePipeline(pipe);
    setCurrentStepIndex(-1);
    sound.playClick();
    setLogs([`Switched to ${pipe === 'payment' ? 'PayFast Payment Pipeline' : 'VaultMind Vector Platform'}. Ready.`]);
  };

  return (
    <section id="simulator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            Interactive Engineering Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Live Distributed <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">Architecture Simulation</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Trigger a real-world transaction or vector embedding flow and inspect how event-driven decoupling, idempotency locks, and fault-tolerant workers operate under the hood.
          </p>
        </div>

        {/* Simulator Glass Console */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/20 shadow-glow-cyan/20">
          {/* Pipeline Switcher & Trigger Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => switchPipeline('payment')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activePipeline === 'payment'
                    ? 'bg-cyan-500 text-black shadow-glow-cyan font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                💳 PayFast Settlement (100K+ SQS/Go)
              </button>
              <button
                onClick={() => switchPipeline('rag')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activePipeline === 'rag'
                    ? 'bg-cyan-500 text-black shadow-glow-cyan font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🧠 VaultMind RAG (384-dim HNSW)
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-40"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-glow-cyan transition-all disabled:opacity-50"
              >
                <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'fill-black'}`} />
                {isRunning ? 'Processing Flow...' : 'Execute Live Flow'}
              </button>
            </div>
          </div>

          {/* Architecture Nodes Flow Diagram */}
          <div className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
              {steps.map((step, idx) => {
                const isPassed = currentStepIndex > idx;
                const isCurrent = currentStepIndex === idx;
                const isPending = currentStepIndex < idx;
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.id}
                    className={`relative p-4 rounded-xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.35)] scale-105'
                        : isPassed
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-slate-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    {/* Step Number & Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-slate-700">
                        0{idx + 1}
                      </span>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                      )}
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent
                        className={`w-4 h-4 ${
                          isCurrent
                            ? 'text-cyan-400'
                            : isPassed
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }`}
                      />
                      <h4 className="text-xs font-semibold text-white truncate">
                        {step.name}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight mb-2">
                      {step.sub}
                    </p>

                    <div className="mt-auto pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-cyan-300">
                      <span>{step.tech}</span>
                      {isCurrent && <span className="animate-pulse text-cyan-400">ACTIVE</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-Time Telemetry Terminal */}
          <div className="mt-4 rounded-xl bg-black/80 border border-slate-800 p-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300">LIVE SYSTEM TELEMETRY STREAM</span>
              </div>
              <span className="text-[10px] text-slate-500">
                PORT: 443 / TLS 1.3 / BUFFER: ACTIVE
              </span>
            </div>

            <div
              ref={logContainerRef}
              className="h-28 overflow-y-auto space-y-1 text-slate-300 pr-2 scrollbar-thin"
            >
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-cyan-500/70 select-none">&gt;</span>
                  <span
                    className={
                      log.includes('[SUCCESS]')
                        ? 'text-emerald-400 font-semibold'
                        : log.includes('[INITIALIZING]')
                        ? 'text-cyan-400 font-semibold'
                        : 'text-slate-300'
                    }
                  >
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
