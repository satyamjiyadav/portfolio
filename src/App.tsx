import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArchitectureSimulator from './components/ArchitectureSimulator';
import ExperienceRazorpay from './components/ExperienceRazorpay';
import Projects from './components/Projects';
import SkillsMatrix from './components/SkillsMatrix';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalHUD from './components/TerminalHUD';
import AdminPortal from './components/AdminPortal';
import { sound } from './audio/soundEffects';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for CLI, Cmd+Shift+A for Admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for terminal
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        setTerminalOpen((prev) => !prev);
      }
      // Cmd+Shift+A for admin
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        sound.playClick();
        setAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <ArchitectureSimulator />
        <ExperienceRazorpay />
        <Projects />
        <SkillsMatrix />
        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Interactive Terminal CLI Modal */}
      <TerminalHUD
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Scalable Admin Portal Modal */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
