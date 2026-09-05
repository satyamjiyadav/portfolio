import { X, ExternalLink, Github, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { Project } from '../types/portfolio';
import { sound } from '../audio/soundEffects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 uppercase tracking-wider">
            {project.badge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-cyan-400 mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 mt-4 leading-relaxed">
          {project.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 my-6">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-lg font-bold font-mono text-cyan-400">{m.value}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* System Architecture Flow Diagram */}
        <div className="my-6 p-4 rounded-xl bg-black/70 border border-cyan-500/20">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3 pb-2 border-b border-slate-800">
            <Cpu className="w-4 h-4" />
            <span>ARCHITECTURAL EXECUTION SEQUENCE</span>
          </div>

          <div className="space-y-2">
            {project.architecture.flow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-5 h-5 rounded flex items-center justify-center bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px]">
                  {idx + 1}
                </span>
                <span className="text-slate-300 flex-1">{step}</span>
                {idx < project.architecture.flow.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800/80 leading-relaxed">
            <strong className="text-cyan-300 font-mono">Deep Dive:</strong> {project.architecture.deepDiveText}
          </p>
        </div>

        {/* Engineering Highlights */}
        <div className="my-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Key Engineering Accomplishments
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 my-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white text-xs font-mono transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View Source Code</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs transition-all shadow-glow-cyan"
            >
              <span>Explore Deployment</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
