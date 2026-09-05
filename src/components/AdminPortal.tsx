import React, { useState } from 'react';
import { Lock, X, Upload, FileText, Plus, Trash2, Download, RefreshCcw, Save, CheckCircle, ExternalLink } from 'lucide-react';
import { sound } from '../audio/soundEffects';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { Project } from '../types/portfolio';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  const { data, updateData, updateResume, resetData } = usePortfolioData();
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'resume' | 'projects' | 'profile' | 'export'>('resume');
  const [successMessage, setSuccessMessage] = useState('');

  // Resume form state
  const [newResumeUrl, setNewResumeUrl] = useState(data.profile.resumeUrl);
  const [newResumeName, setNewResumeName] = useState(data.profile.resumeName);

  // New project state
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    badge: 'Distributed Systems',
    description: '',
    highlights: [''],
    techStack: [],
    githubUrl: '',
    liveUrl: '',
    metrics: [
      { label: 'Latency', value: '<50ms' },
      { label: 'Throughput', value: '10K RPS' }
    ],
    architecture: {
      type: 'event-driven',
      flow: ['Ingress', 'Kafka Queue', 'Worker', 'Database'],
      deepDiveText: 'Event-driven high-availability microservice architecture.'
    }
  });
  const [techInput, setTechInput] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const hashPasscode = async (str: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    const inputHash = await hashPasscode(passcode.trim());
    const targetHash = data.adminPasscodeHash || 'b3de7f090d21eddfcee98e798996f84c0f645d4320340af79cef206dd759a238';

    if (inputHash === targetHash) {
      setIsAuthenticated(true);
      setAuthError('');
      sound.playSuccess();
    } else {
      setAuthError('Access Denied: Invalid Security Key.');
      sound.playClick();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playClick();
    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result as string;
      updateResume(base64Url, file.name);
      setNewResumeName(file.name);
      setNewResumeUrl(base64Url);
      sound.playSuccess();
      setSuccessMessage(`Successfully updated resume to ${file.name}! Visitors can now download it directly.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveResumeUrl = () => {
    if (!newResumeUrl.trim()) return;
    updateResume(newResumeUrl.trim(), newResumeName.trim() || 'Satyam_Yadav_Resume.pdf');
    sound.playSuccess();
    setSuccessMessage('Resume URL successfully updated!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      alert('Please fill in title and description');
      return;
    }

    const createdProject: Project = {
      id: newProject.title.toLowerCase().replace(/\s+/g, '-'),
      title: newProject.title,
      subtitle: newProject.subtitle || 'Production Service',
      badge: newProject.badge || 'Backend Service',
      description: newProject.description,
      highlights: newProject.highlights?.filter(Boolean) || [newProject.description],
      techStack: newProject.techStack?.length ? newProject.techStack : ['Go', 'PostgreSQL', 'Docker'],
      githubUrl: newProject.githubUrl || 'https://github.com/satyamjiyadav',
      liveUrl: newProject.liveUrl,
      metrics: newProject.metrics || [{ label: 'p99', value: '<100ms' }],
      architecture: newProject.architecture || {
        type: 'microservice',
        flow: ['Ingress', 'Database Commit'],
        deepDiveText: 'Decoupled resilient microservice.'
      }
    };

    const updated = {
      ...data,
      projects: [createdProject, ...data.projects]
    };
    updateData(updated);
    sound.playSuccess();
    setSuccessMessage(`Project "${createdProject.title}" added to portfolio!`);
    setTimeout(() => setSuccessMessage(''), 4000);

    // Reset project form
    setNewProject({
      title: '',
      subtitle: '',
      badge: 'Distributed Systems',
      description: '',
      highlights: [''],
      techStack: [],
      githubUrl: '',
      liveUrl: ''
    });
  };

  const handleDeleteProject = (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const updated = {
      ...data,
      projects: data.projects.filter((p) => p.id !== projectId)
    };
    updateData(updated);
    sound.playClick();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'portfolioData.json');
    dlAnchor.click();
    sound.playSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Portfolio Command Center
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  ADMIN PORTAL
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Real-time resume replacement, project additions & system configuration
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Login Form if not Authenticated */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-12 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Security Access Authentication</h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Authorized administrator access only. Enter master security key to proceed.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Master Passcode..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-center focus:border-cyan-400 focus:outline-none"
              />
              {authError && <p className="text-xs text-rose-400 font-mono">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-sm shadow-glow-cyan hover:from-cyan-400"
              >
                Authenticate & Access Console
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('resume')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'resume'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                📄 Resume Manager
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'projects'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                🚀 Projects Manager
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'export'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                💾 Backup & Export
              </button>
            </div>

            {/* TAB 1: RESUME MANAGER */}
            {activeTab === 'resume' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Current Active Resume
                  </h4>
                  <div className="text-xs font-mono text-slate-400 mt-2 space-y-1">
                    <div>Filename: <strong className="text-cyan-300">{data.profile.resumeName}</strong></div>
                    <div>Last Updated: <span className="text-slate-300">{data.profile.resumeUpdatedAt}</span></div>
                    <div className="pt-2">
                      <a
                        href={data.profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                      >
                        <span>Test Download / View Active Resume</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Option A: Direct File Upload */}
                <div className="p-6 rounded-xl border border-dashed border-cyan-500/40 bg-black/40 text-center">
                  <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">
                    Upload New Resume PDF (Instant Update)
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Select a new PDF from your computer. It will immediately replace the resume on all download buttons on this portfolio.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-glow-cyan hover:from-cyan-400">
                    <Upload className="w-4 h-4" />
                    Choose New PDF File
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Option B: External URL Input */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Or Update via External Link (Google Drive / S3 / Cloud)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newResumeName}
                      onChange={(e) => setNewResumeName(e.target.value)}
                      placeholder="File Name (e.g. Satyam_Yadav_SDE1.pdf)"
                      className="px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs font-mono focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      value={newResumeUrl}
                      onChange={(e) => setNewResumeUrl(e.target.value)}
                      placeholder="URL (https://drive.google.com/... or /resume.pdf)"
                      className="px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs font-mono focus:border-cyan-400"
                    />
                  </div>
                  <button
                    onClick={handleSaveResumeUrl}
                    className="px-4 py-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono hover:bg-cyan-500 hover:text-black flex items-center gap-1.5 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save External URL
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {/* Add New Project Form */}
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-cyan-400" />
                    Add New Project to Portfolio
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400">Project Title</label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="e.g. StreamMesh"
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400">Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={newProject.subtitle}
                        onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                        placeholder="e.g. Real-Time Distributed Consensus"
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400">Description</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Comprehensive project summary..."
                      rows={2}
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400">GitHub Repository URL</label>
                      <input
                        type="text"
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        placeholder="https://github.com/satyamjiyadav/..."
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400">Category Badge</label>
                      <input
                        type="text"
                        value={newProject.badge}
                        onChange={(e) => setNewProject({ ...newProject, badge: e.target.value })}
                        placeholder="Distributed Systems / AI"
                        className="w-full mt-1 px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400">Tech Stack (comma separated)</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        placeholder="Go, Kafka, Redis, Docker (press Add)"
                        className="flex-1 px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (techInput.trim()) {
                            const parsed = techInput.split(',').map((t) => t.trim()).filter(Boolean);
                            setNewProject({
                              ...newProject,
                              techStack: [...(newProject.techStack || []), ...parsed]
                            });
                            setTechInput('');
                          }
                        }}
                        className="px-3 py-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono"
                      >
                        Add Tech
                      </button>
                    </div>
                    {newProject.techStack && newProject.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {newProject.techStack.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleAddProject}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-cyan-400"
                  >
                    <Plus className="w-4 h-4" /> Add Project to Live Portfolio
                  </button>
                </div>

                {/* Existing Projects List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Existing Active Projects ({data.projects.length})
                  </h4>
                  {data.projects.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-white">{p.title}</div>
                        <div className="text-xs font-mono text-cyan-400">{p.subtitle}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{p.techStack.join(' • ')}</div>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 hover:bg-rose-900"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: BACKUP & EXPORT */}
            {activeTab === 'export' && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-cyan-400" />
                    Export Portfolio Config to Code
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Download the complete current portfolio configuration (including any uploaded resume, modified projects, or changed metrics) as a JSON file to commit directly into your Git repository.
                  </p>
                  <button
                    onClick={handleExportJSON}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-glow-cyan flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download portfolioData.json
                  </button>
                </div>

                {/* Change Master Passcode */}
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    Update Master Security Passcode
                  </h4>
                  <p className="text-xs text-slate-400">
                    Change your admin access key anytime. It will be cryptographically hashed (SHA-256) and saved in local storage.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Master Passcode (min 6 chars)..."
                      className="flex-1 px-3 py-2 rounded-lg bg-black border border-slate-700 text-white text-xs font-mono focus:border-cyan-400"
                    />
                    <button
                      onClick={async () => {
                        if (!newPassword.trim() || newPassword.trim().length < 6) {
                          alert('New passcode must be at least 6 characters long.');
                          return;
                        }
                        const hashed = await hashPasscode(newPassword.trim());
                        updateData({ ...data, adminPasscodeHash: hashed });
                        sound.playSuccess();
                        setSuccessMessage('Master Security Key successfully updated and encrypted!');
                        setNewPassword('');
                        setTimeout(() => setSuccessMessage(''), 4000);
                      }}
                      className="px-4 py-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono hover:bg-cyan-500 hover:text-black transition-colors"
                    >
                      Update Passcode
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                  <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4 text-rose-400" />
                    Factory Reset Portfolio
                  </h4>
                  <p className="text-xs text-slate-400">
                    Reset all changes made in this admin panel back to Satyam's original Razorpay resume defaults.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all portfolio custom data back to default CV?')) {
                        resetData();
                        sound.playSuccess();
                        setSuccessMessage('Portfolio reset to initial CV specifications.');
                        setTimeout(() => setSuccessMessage(''), 3000);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-rose-900 text-white font-mono text-xs hover:bg-rose-800"
                  >
                    Reset to Initial Defaults
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
