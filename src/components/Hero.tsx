import { ArrowRight, Terminal, Github, Linkedin, Code2, Mail, ShieldAlert, Cpu } from 'lucide-react';
import Hero3DCore from './Hero3DCore';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const { data } = usePortfolioData();
  const { profile } = data;

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-radial-gradient">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Mission Brief & Credentials */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>BACKEND & DISTRIBUTED SYSTEMS DEVELOPER</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>AI PLATFORMS ENTHUSIAST</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Architecting <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Production-Grade
                </span>{' '}
                Distributed Systems
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Hi, I'm <strong className="text-white font-semibold">{profile.name}</strong>. A Backend Developer passionate about designing robust, production-grade systems and exploring modern AI architectures. Driven by scalable event pipelines, clean system design, and high-performance backend engineering.
              </p>
            </div>

            {/* Core Architectural Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-500/40 transition-colors">
                <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">High Throughput</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Event-Driven Scalability</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
                <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">Low Latency</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Sub-Second p99 Systems</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md col-span-2 sm:col-span-1 hover:border-blue-500/40 transition-colors">
                <div className="text-base sm:text-lg font-bold font-mono text-blue-400">Zero Event Loss</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Resilient Fault-Tolerance</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#simulator"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm flex items-center gap-2 shadow-glow-cyan transition-all"
              >
                <span>Launch Architecture Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#experience"
                onClick={() => sound.playClick()}
                className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:border-cyan-500/50 hover:text-white text-slate-300 font-mono text-xs flex items-center gap-2 transition-all"
              >
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Production Experience</span>
              </a>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTerminal();
                }}
                className="px-4 py-3 rounded-xl border border-slate-800 bg-black/50 hover:border-slate-600 text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">CLI</span>
              </button>
            </div>

            {/* Social & Verification Badges */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-mono text-slate-400">Verified Profiles:</span>
              <div className="flex items-center gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playHover()}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playHover()}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playHover()}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  title="LeetCode Profile"
                >
                  <Code2 className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => sound.playHover()}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Distributed Core */}
          <div className="lg:col-span-5 h-[420px] sm:h-[480px] lg:h-[550px] w-full relative">
            <div className="w-full h-full rounded-2xl border border-cyan-500/20 bg-slate-950/40 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-cyan-500/10">
              {/* Overlay HUD Markers */}
              <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                <span className="text-[10px] font-mono text-cyan-300/80 uppercase tracking-wider">
                  3D DISTRIBUTED LATTICE [ROTATE & INTERACT]
                </span>
              </div>

              {/* 3D WebGL Canvas */}
              <Hero3DCore />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
