import { Terminal, Lock } from 'lucide-react';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenTerminal: () => void;
}

export default function Footer({ onOpenAdmin, onOpenTerminal }: FooterProps) {
  const { data } = usePortfolioData();

  return (
    <footer className="py-12 border-t border-slate-900 bg-[#040609] text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
            SY
          </div>
          <div>
            <span className="text-slate-300 font-semibold">{data.profile.name}</span>
            <span className="text-slate-500 ml-2">| Distributed Systems & AI Platforms</span>
          </div>
        </div>

        {/* Center: System Status */}
        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            All Pipelines Nominal
          </span>
          <span>•</span>
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            CLI Mode
          </button>
        </div>

        {/* Right: Admin & Copyright */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              sound.playClick();
              onOpenAdmin();
            }}
            className="hover:text-cyan-400 flex items-center gap-1 transition-colors text-slate-500 hover:text-slate-300"
            title="Admin Login & Resume Control"
          >
            <Lock className="w-3 h-3" />
            Admin Portal
          </button>
          <span>© {new Date().getFullYear()} Satyam Yadav</span>
        </div>

      </div>
    </footer>
  );
}
