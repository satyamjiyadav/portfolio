# Satyam Yadav — 3D Interactive Distributed Systems & AI Portfolio

> **Production-Grade Interactive WebGL Experience for Backend, Distributed Systems & AI Engineering.**

An ultra-performant, 3D interactive engineering portfolio engineered for **Satyam Yadav** (Software Development Engineer - Backend & Distributed Systems). Built with **Vite, React 18, TypeScript, Three.js, React Three Fiber, Tailwind CSS, and Framer Motion**. Features a live interactive distributed architecture simulator, real-time WebGL distributed node lattice, production telemetry logs, an interactive hacker CLI terminal, and a cryptographically secured administrative control plane.

---

## 🌐 Live Demos & Endpoints

| Component | Access / URL | Description |
| :--- | :--- | :--- |
| 🚀 **Live Portfolio** | [http://localhost:5173](http://localhost:5173) | Full 3D Interactive Experience & Architecture Simulator |
| ⚡ **Live Architecture Simulator** | [http://localhost:5173/#simulator](http://localhost:5173/#simulator) | Interactive pipeline for PayFast (Go/Kafka) & VaultMind (RAG) |
| 💻 **Hacker CLI Terminal** | Press `Cmd + K` / `Ctrl + K` | Interactive shell terminal for engineers & recruiters |
| 🔐 **Admin Control Center** | `Cmd + Shift + A` (or Lock icon) | Cryptographically secured portal for live resume & project management |

---

## 🚀 Overview

Most software developer portfolios are static landing pages or generic frontend templates that fail to showcase the true depth of a **Backend & Distributed Systems Engineer**.

This portfolio is architected from the ground up as a **"High-Scale Distributed Systems & Neural Engine"**:
- 🌌 **Real-Time 3D WebGL Distributed Core**: A Three.js interactive lattice rendering the 6 foundational nodes of modern high-scale architecture (`API Gateway`, `Event Stream`, `Worker Fleet`, `Vector Engine`, `ACID Storage`, `In-Memory Cache`) around a central `SYSTEM KERNEL`.
- ⚡ **Interactive Distributed Architecture Simulator**: Enables recruiters and engineering managers to execute mock transaction and vector search flows, witnessing animated packet travel, stage-by-stage latencies, and streaming telemetry logs.
- 🏢 **Production Impact Logs**: Highlights real-world high-scale metrics: **100K+ daily settlements**, **99.8% recovery time reduction**, **zero event loss across 30 Kafka partitions**, and **48 instrumented API routes**.
- 🚀 **Flagship Projects Showcase**: Deep-dive architecture breakdowns for **PayFast** (Go, Kafka, Double-Entry Ledger) and **VaultMind** (FastAPI, PGVector, 384-dim HNSW, Gemini 3.1).
- 🔒 **Cryptographic Admin Portal**: Zero-plaintext SHA-256 authenticated control panel for dynamic PDF resume replacement, project addition, and JSON backup exports.

---

## ✨ Features

- 🌌 **Interactive 3D WebGL Lattice (`Hero3DCore`)**: Three.js & React Three Fiber canvas featuring smooth mouse-parallax damping, ambient floating particle fields, wireframe shields, and interactive audio feedback.
- ⚡ **Dual-Flow Architecture Simulator (`ArchitectureSimulator`)**:
  - **PayFast Settlement**: Simulates API Ingress $\rightarrow$ Sub-ms Redis Velocity Check $\rightarrow$ Kafka 30 Partitions $\rightarrow$ Go SQS Worker $\rightarrow$ ACID Double-Entry Ledger $\rightarrow$ AES-256-GCM Vault.
  - **VaultMind RAG**: Simulates HTTP/2 Ingress $\rightarrow$ Celery Queue $\rightarrow$ 384-dim HNSW Cosine Search $\rightarrow$ RBAC Department Isolation $\rightarrow$ Gemini 3.1 LLM Stream.
- 💻 **Power-User CLI Terminal HUD (`TerminalHUD`)**: Keyboard-driven shell (`Cmd+K`) supporting `help`, `experience`, `projects`, `skills`, `metrics`, `resume`, `contact`, `clear`, and `exit`.
- 🔊 **Zero-Dependency Web Audio Synthesizer (`soundEffects`)**: Pure native Web Audio API synthesizing futuristic clicks, packet travel sweeps, and success chimes with global mute toggle.
- 📄 **Dynamic Live Resume Swapper**: Upload new PDF files directly or configure cloud links through the admin console; immediately updates all visitor download buttons across the portfolio.
- 🛡️ **Cryptographic SHA-256 Admin Authentication**: Protected with client-side Web Crypto API hashing. Zero hardcoded plain passwords. Includes in-portal passcode updater.
- 📱 **60 FPS Mobile & Performance Optimized**: Vite code splitting with dedicated vendor chunks (`three`, `motion`), responsive touch controls, and CSS glassmorphism.

---

## 🏗️ Architecture & Component Flow

```text
┌────────────────────────────────────────────────────────────────────────┐
│                            Visitor / Client                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / WebGL / Audio
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Vite + React 18 SPA Core                           │
│   (Tailwind CSS • Framer Motion • Glassmorphism • Web Audio Engine)    │
└───────┬───────────────────┬───────────────────┬─────────────────┬──────┘
        │                   │                   │                 │
        ▼                   ▼                   ▼                 ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐ ┌───────────────┐
│  Hero 3D Core │   │ Architecture  │   │  Hacker CLI   │ │ Admin Control │
│  (Three.js /  │   │   Simulator   │   │  Terminal HUD │ │    Portal     │
│  React Three) │   │ (PayFast/RAG) │   │   (Cmd + K)   │ │ (SHA-256 Auth)│
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘ └───────┬───────┘
        │                   │                   │                 │
        └───────────────────┴─────────┬─────────┴─────────────────┘
                                      │ Reactive State Sync
                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Reactive Data Store & Storage                        │
│          (src/data/portfolioData.ts • LocalStorage Fallback)           │
│     [Profile • Production Impact • Projects • Skills • Resume]         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```text
portfolio/
├── public/
│   ├── favicon.svg             # Cyber SVG icon
│   └── resume.pdf              # Active production resume file
├── src/
│   ├── audio/
│   │   └── soundEffects.ts     # Pure Web Audio API sci-fi synthesizer
│   ├── components/
│   │   ├── AdminPortal.tsx     # SHA-256 authenticated admin control panel
│   │   ├── ArchitectureSimulator.tsx # Interactive live pipeline simulator
│   │   ├── Contact.tsx         # Direct transmission hub & 1-click clipboard
│   │   ├── ExperienceRazorpay.tsx # Production impact logs & metric badges
│   │   ├── Footer.tsx          # System nominal status & portal trigger
│   │   ├── Hero.tsx            # Hero presentation & core pillar metrics
│   │   ├── Hero3DCore.tsx      # Three.js 3D WebGL distributed lattice
│   │   ├── Navbar.tsx          # Fixed glassmorphism navigation & sound toggle
│   │   ├── ProjectModal.tsx    # Architectural deep-dive drawer & sequence
│   │   ├── Projects.tsx        # PayFast & VaultMind flagship project cards
│   │   ├── SkillsMatrix.tsx    # 5 categorized technical arsenals & education
│   │   └── TerminalHUD.tsx     # Full interactive CLI console (Cmd+K)
│   ├── data/
│   │   └── portfolioData.ts    # Single source of truth data store & store helpers
│   ├── hooks/
│   │   └── usePortfolioData.ts # Custom reactive hook with event listener sync
│   ├── types/
│   │   └── portfolio.ts        # Fully typed interfaces (Project, Experience, etc.)
│   ├── App.tsx                 # Root layout & global shortcut listeners
│   ├── index.css               # Cyber grid, glassmorphism, scrollbars
│   └── main.tsx                # React DOM entrypoint
├── index.html                  # SEO meta tags, dark mode background, Google Fonts
├── package.json                # Project dependencies & build scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Custom colors, shadows, and animations
├── tsconfig.app.json           # Application TypeScript compiler settings
├── tsconfig.json               # Root TypeScript configuration
├── tsconfig.node.json          # Vite node configuration
└── vite.config.ts              # Bundler configuration & Rollup manual chunking
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework & Language** | React 18, TypeScript, Vite | Ultra-fast client-side SPA with HMR |
| **3D & WebGL Engine** | Three.js, `@react-three/fiber`, `@react-three/drei` | Distributed lattice & central quantum kernel |
| **Styling & Aesthetics** | Tailwind CSS, Custom Glassmorphism | Cyberpunk Obsidian (`#06080d`), Cyan glow |
| **Animations & FX** | Framer Motion, Canvas Confetti | Smooth spring transitions & particle bursts |
| **Audio Engine** | Web Audio API (Native Oscillator) | Zero-dependency synthesized UI feedback |
| **Security** | Web Crypto API (`crypto.subtle` SHA-256) | Client-side cryptographic hash verification |
| **Icons & Typography** | Lucide React, Inter, JetBrains Mono | Production UI iconography & monospace accents |

---

## ⚙️ Local Setup & Development

### 1. Clone the repository
```bash
git clone https://github.com/satyamjiyadav/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates optimized code-split production bundles in `dist/`.

---

## 🔐 Administrative Access & Management

The portfolio includes an integrated Admin Control Center for managing content without code redeployment:

1. **Access**:
   - Press **`Cmd + Shift + A`** (or `Ctrl + Shift + A` on Windows/Linux).
   - Alternatively, click the **Lock icon 🔒** in the Navbar or the "Admin Portal" link in the Footer.
2. **Security**:
   - Master passcode authentication (validated via **SHA-256** hash comparison).
   - Master passcode can be updated directly from the **Backup & Export** tab.
3. **Capabilities**:
   - **Resume Manager**: Upload any new PDF from your local machine to immediately update all download buttons.
   - **Project Manager**: Add new projects with custom title, tech stack, metrics, and live URLs via a clean GUI.
   - **Export Config**: Download the updated `portfolioData.json` with 1 click to commit changes directly into Git.

---

## 🤝 Connect with Satyam Yadav

- 💼 **LinkedIn**: [linkedin.com/in/satyam-yadav-40b898250](https://linkedin.com/in/satyam-yadav-40b898250)
- 🐙 **GitHub**: [github.com/satyamjiyadav](https://github.com/satyamjiyadav)
- 🧠 **LeetCode**: [leetcode.com/u/satyamyadav1414](https://leetcode.com/u/satyamyadav1414)
- 📧 **Email**: [satyamjiyadav12345@gmail.com](mailto:satyamjiyadav12345@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
