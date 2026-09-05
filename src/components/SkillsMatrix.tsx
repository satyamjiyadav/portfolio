import { Cpu, Terminal, GraduationCap, Award } from 'lucide-react';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function SkillsMatrix() {
  const { data } = usePortfolioData();
  const { skillCategories, profile } = data;

  return (
    <section id="skills" className="py-20 relative bg-slate-950/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Engineering Knowledge & Toolchain
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Technical Arsenal & <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">Core Competencies</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Specialized in building resilient distributed backends, real-time message pipelines, and high-dimensional vector search applications.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      onMouseEnter={() => sound.playHover()}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-default ${
                        skill.highlight
                          ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 shadow-glow-cyan/20'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {skill.name}
                      {skill.tag && (
                        <span className="ml-1.5 text-[10px] text-cyan-400 font-semibold">
                          [{skill.tag}]
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Education & Academic Excellence Card */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between bg-gradient-to-br from-slate-950 to-blue-950/20">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Education & Pedigree
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-blue-300">
                  {profile.education.cgpa}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Formal computer science foundational coursework & algorithms
              </p>

              <div className="p-4 rounded-xl bg-black/50 border border-slate-800/80 space-y-2">
                <div className="text-sm font-bold text-white">{profile.education.degree}</div>
                <div className="text-xs text-cyan-300 font-mono">{profile.education.college}</div>
                <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-2 border-t border-slate-800">
                  <span>Batch: {profile.education.period}</span>
                  <span className="text-emerald-400 font-semibold">{profile.education.cgpa}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>LeetCode: </span>
              <a
                href={profile.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="text-cyan-400 hover:underline"
              >
                leetcode.com/u/satyamyadav1414
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
