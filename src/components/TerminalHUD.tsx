import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface TerminalHUDProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  cmd?: string;
  output: string | React.ReactNode;
}

export default function TerminalHUD({ isOpen, onClose }: TerminalHUDProps) {
  const { data } = usePortfolioData();
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      output: (
        <div>
          <div className="text-cyan-400 font-bold mb-1">
            Satyam Yadav // SDE-1 Distributed Systems Terminal v2.4
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-cyan-300 font-bold">help</span> to view available system commands.
          </div>
        </div>
      )
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    sound.playClick();
    const newLog: CommandLog = { cmd: trimmed, output: '' };
    const lower = trimmed.toLowerCase();

    if (lower === 'help') {
      newLog.output = (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-semibold mb-1">AVAILABLE COMMANDS:</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">experience</span>: View Razorpay platform mission logs</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">projects</span>: Inspect PayFast & VaultMind platform specs</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">skills</span>: List distributed systems & AI competencies</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">metrics</span>: Display production throughput & latency stats</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">resume</span>: Download Satyam's SDE-1 Resume directly</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">contact</span>: Display verified communication endpoints</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">clear</span>: Flush terminal screen buffer</div>
          <div><span className="text-cyan-300 font-mono w-28 inline-block">exit</span>: Terminate console session</div>
        </div>
      );
    } else if (lower === 'experience') {
      const exp = data.experience[0];
      newLog.output = (
        <div className="space-y-2 text-slate-300">
          <div className="text-emerald-400 font-bold">{exp.company} — {exp.role} ({exp.period})</div>
          <div className="text-xs text-slate-400">Team: {exp.team} | Location: {exp.location}</div>
          {exp.highlights.map((h, i) => (
            <div key={i} className="pl-3 border-l border-cyan-500/40 text-xs">
              <span className="text-cyan-300 font-semibold">[{h.metricsGlow}]</span> {h.title}: {h.points}
            </div>
          ))}
        </div>
      );
    } else if (lower === 'projects') {
      newLog.output = (
        <div className="space-y-3">
          {data.projects.map((p) => (
            <div key={p.id} className="p-2 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 font-bold flex items-center justify-between">
                <span>{p.title} — {p.subtitle}</span>
                <span className="text-xs text-slate-400 font-mono">[{p.badge}]</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{p.description}</p>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Tech: {p.techStack.join(', ')}
              </div>
              <div className="text-[11px] text-cyan-300 font-mono mt-0.5 flex flex-wrap gap-3">
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="underline hover:text-white">
                  GitHub ↗
                </a>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="underline hover:text-white text-emerald-400">
                    Live Demo ↗ ({p.liveUrl})
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'skills') {
      newLog.output = (
        <div className="space-y-2 text-xs">
          {data.skillCategories.map((c) => (
            <div key={c.id}>
              <span className="text-cyan-400 font-bold">{c.title}:</span>{' '}
              <span className="text-slate-300">{c.skills.map((s) => s.name).join(', ')}</span>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'metrics') {
      newLog.output = (
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          {data.systemMetrics.map((m) => (
            <div key={m.id} className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-cyan-300 font-bold">{m.value}</div>
              <div className="text-slate-400">{m.label}</div>
              <div className="text-[10px] text-slate-500">{m.subtext}</div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'resume' || lower === 'curl /resume') {
      newLog.output = (
        <div className="text-emerald-400">
          [INIT] Triggering resume download: {data.profile.resumeName}...
        </div>
      );
      window.open(data.profile.resumeUrl, '_blank');
    } else if (lower === 'contact') {
      newLog.output = (
        <div className="space-y-1 text-xs font-mono">
          <div><span className="text-slate-400">Email:</span> <a href={`mailto:${data.profile.email}`} className="text-cyan-300 underline">{data.profile.email}</a></div>
          <div><span className="text-slate-400">Phone:</span> <span className="text-white">{data.profile.phone}</span></div>
          <div><span className="text-slate-400">LinkedIn:</span> <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{data.profile.linkedin}</a></div>
          <div><span className="text-slate-400">GitHub:</span> <a href={data.profile.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{data.profile.github}</a></div>
          <div><span className="text-slate-400">LeetCode:</span> <a href={data.profile.leetcode} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{data.profile.leetcode}</a></div>
        </div>
      );
    } else if (lower === 'clear') {
      setLogs([]);
      setInput('');
      return;
    } else if (lower === 'exit') {
      onClose();
      return;
    } else {
      newLog.output = (
        <div className="text-rose-400 text-xs">
          Command not recognized: "{trimmed}". Type <span className="text-white underline">help</span> for valid commands.
        </div>
      );
    }

    setLogs((prev) => [...prev, newLog]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div
        className={`w-full ${
          isMaximized ? 'h-[95vh] max-w-5xl' : 'h-[550px] max-w-3xl'
        } rounded-2xl bg-[#090c15] border border-cyan-500/30 flex flex-col shadow-2xl shadow-cyan-500/20 overflow-hidden font-mono`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200">
              satyam@razorpay-core: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded hover:bg-rose-950 text-slate-400 hover:text-rose-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Output Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs text-slate-200 scrollbar-thin">
          {logs.map((log, index) => (
            <div key={index} className="space-y-1">
              {log.cmd && (
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <span>satyam@core:~$</span>
                  <span>{log.cmd}</span>
                </div>
              )}
              <div className="pl-2">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 px-4 py-3 bg-black/60 border-t border-slate-800"
        >
          <span className="text-cyan-400 font-bold select-none text-xs">satyam@core:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' for command directory..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs hover:bg-cyan-500 hover:text-black font-semibold transition-colors"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
