import { Building2, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function ExperienceRazorpay() {
  const { data } = usePortfolioData();
  const razorpayExp = data.experience.find((e) => e.company.toLowerCase().includes('razorpay')) || data.experience[0];

  if (!razorpayExp) return null;

  return (
    <section id="experience" className="py-20 relative bg-slate-950/60 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" />
              Production Engineering Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Production <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Experience & Impact</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Proven engineering impact in high-scale environments. Architecting resilient pipelines, automated reconciliation, and fault-tolerant microservices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{razorpayExp.period}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{razorpayExp.location}</span>
            </div>
          </div>
        </div>

        {/* Company Banner */}
        <div className="p-6 rounded-2xl glass-card border-cyan-500/20 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-black text-blue-400 text-xl font-mono">
              R
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                {razorpayExp.role}
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-normal">
                  Payments Platform
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Team: {razorpayExp.team} • Scale: 100K+ Daily Transactions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Production Exact-Once Semantics
          </div>
        </div>

        {/* Engineering Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {razorpayExp.highlights.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="glass-card glass-card-hover rounded-xl p-6 border border-slate-800/80 flex flex-col justify-between group"
            >
              <div>
                {/* Metric Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-semibold shadow-glow-cyan/20">
                    {item.metricsGlow}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    LOG_0{idx + 1}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.points}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {item.tag}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
