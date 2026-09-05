import { useState } from 'react';
import { Volume2, VolumeX, Terminal, FileDown, Lock, Menu, X } from 'lucide-react';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenTerminal, onOpenAdmin }: NavbarProps) {
  const { data } = usePortfolioData();
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const navLinks = [
    { label: 'Simulator', href: '#simulator' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06080d]/80 backdrop-blur-xl border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Callsign */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-glow-cyan">
            <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm group-hover:text-white transition-colors">
              SY
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white tracking-wide">
                {data.profile.name}
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/80">
              Backend Developer • Systems & AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playHover()}
              className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Terminal Shortcut */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            title="Open CLI Terminal (Cmd+K)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-all text-xs font-mono"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
            <kbd className="text-[10px] bg-black/40 px-1 py-0.5 rounded border border-cyan-500/30">⌘K</kbd>
          </button>

          {/* Resume Download */}
          <a
            href={data.profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            download={data.profile.resumeName}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs hover:shadow-glow-cyan transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Admin Lock Access */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAdmin();
            }}
            title="Admin Portal (Manage Resume & Projects)"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-[#07090e]/95 border-b border-cyan-500/20 backdrop-blur-2xl space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-lg text-sm font-mono text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-cyan-300 hover:bg-slate-900 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" /> Open Command Terminal
          </button>
        </div>
      )}
    </nav>
  );
}
