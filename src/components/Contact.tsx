import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Github, Linkedin, Code2, FileDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Contact() {
  const { data } = usePortfolioData();
  const { profile } = data;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    sound.playSuccess();
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);
    sound.playPacketTravel();

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      sound.playSuccess();

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSentSuccess(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            Connect & Dispatch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Let's Engineer <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Something Massive</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Available for Software Development Engineer (SDE-1) roles, high-scale distributed systems challenges, and vector AI engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Credentials & Endpoints */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 shadow-glow-cyan/10">
              <h3 className="text-lg font-bold text-white mb-1">Direct Communications Hub</h3>
              <p className="text-xs text-slate-400 mb-6">
                Fastest response via Email or LinkedIn message.
              </p>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-slate-400">EMAIL ADDRESS</div>
                      <a href={`mailto:${profile.email}`} className="text-xs font-mono text-slate-200 hover:text-cyan-400 truncate block">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(profile.email, 'email')}
                    className="p-2 rounded-lg bg-black border border-slate-700 text-slate-400 hover:text-white"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-950 border border-blue-500/30 text-blue-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">PHONE / WHATSAPP</div>
                      <a href={`tel:${profile.phone}`} className="text-xs font-mono text-slate-200 hover:text-cyan-400">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(profile.phone, 'phone')}
                    className="p-2 rounded-lg bg-black border border-slate-700 text-slate-400 hover:text-white"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400">CURRENT LOCATION</div>
                    <div className="text-xs font-mono text-slate-200">
                      {profile.location} (Open to Relocation)
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 mb-3">ENGINEERING PROFILES:</div>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playHover()}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span>LeetCode</span>
                  </a>
                </div>
              </div>

              {/* Direct Resume Download */}
              <div className="mt-6">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={profile.resumeName}
                  onClick={() => sound.playClick()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-cyan hover:opacity-95 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download SDE-1 Resume ({profile.resumeUpdatedAt})</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Message Dispatch */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-1">Dispatch Encrypted Transmission</h3>
              <p className="text-xs text-slate-400 mb-6">
                Send a quick direct message or interview invitation.
              </p>

              {sentSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Transmission dispatched successfully! Satyam will respond within 24 hours.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex (Engineering Manager)"
                      className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400">Your Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400">Message / Role Requirements</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="We're looking for an SDE-1 to work on our high-throughput distributed payment / backend systems..."
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-cyan hover:from-cyan-400 transition-all disabled:opacity-50"
                >
                  <Send className={`w-4 h-4 ${isSending ? 'animate-bounce' : ''}`} />
                  {isSending ? 'Routing Transmission...' : 'Transmit Message'}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
