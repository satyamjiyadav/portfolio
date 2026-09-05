import { useState } from 'react';
import { Layers, Github, ArrowUpRight, Cpu, ExternalLink } from 'lucide-react';
import { Project } from '../types/portfolio';
import ProjectModal from './ProjectModal';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Projects() {
  const { data } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Flagship Engineering Implementations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Distributed Systems & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Platforms</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Engineered from ground up with focus on latency guarantees, high availability, database consistency, and cryptographic security.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-slate-800/90 flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge & Title */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold shadow-glow-cyan/20">
                    {project.badge}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playHover()}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-black hover:bg-cyan-400 transition-all shadow-glow-cyan/20"
                        title="Open Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 mt-0.5 mb-4">
                  {project.subtitle}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 py-3 mb-6 bg-slate-950/50 rounded-xl border border-slate-800/80 px-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-sm font-bold font-mono text-cyan-400">{m.value}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2.5 mb-6">
                  {project.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5 font-bold">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Tech Stack & Deep Dive CTA */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedProject(project);
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Architecture Deep Dive</span>
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedProject(project);
                      }}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Architecture Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
