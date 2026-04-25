# Project 24

> **A learner-first, peer-to-peer engineering ecosystem.**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-orange?logo=firebase)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://project-24-pi.vercel.app)
[![Status](https://img.shields.io/badge/Status-Active%20Development-green.svg)]()

---

## 🌐 Live Site
**[https://project-24-pi.vercel.app](https://project-24-pi.vercel.app)**

---

## ## Table of Contents
- [Overview](#-overview)
- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Data Flows](#-data-flows)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Design System](#-design-system)
- [Security](#-security)
- [Getting Started](#-getting-started)
- [Troubleshooting](#-troubleshooting)
- [Changelog](#-changelog)
- [License](#-license)

---

## 📖 Overview

Project 24 is a full-stack collaborative learning platform built for engineers and developers to learn via peer-driven engagement. It integrates social networking, competitive programming, live events, and AI-powered puzzles into a unified, high-performance web architecture.

---

## ⚡ Quick Start
Run the project in 30 seconds:
```bash
git clone https://github.com/silven-mohan/Project-24.git
cd Project-24
pnpm install
pnpm dev
```

---

## 🏗️ Architecture

Project 24 uses a monorepo structure with pnpm workspaces, separating frontend delivery from shared backend services.

```text
       [ User Browser ]
              ↓
      [ Client (Next.js) ] ↔ [ Vercel Edge / Analytics ]
              ↓
      [ API Routes / SSR ]
              ↓
  ┌───────────┴───────────┐
  ↓                       ↓
[ Firebase Auth ]   [ Firestore DB ]
  ↓                       ↓
[ OAuth / OTP ]     [ Admin SDK / Gemini AI ]
```

---

## ✨ Features

### 🏟️ Main Arena (`/main`)
- Kinetic Hero branding with scroll-reveal transitions.
- Synchronized cross-frame communication via `postMessage` with an embedded learning guide.
- Context-aware navigation synced with sub-document scroll state.

### ⚔️ Challenges (`/challenges`)
- Peer-created coding challenges with HackerRank integration.
- Real-time participant tracking via Firestore listeners.
- Dynamic creation engine with duration validation and icon synthesis.

### 🎮 Puzzle Games (`/puzzle-games`)
- **Daily AI Puzzles**: Daily Sudoku and Minesweeper generation via **Google Gemini API**.
- **State Management**: Persistence of daily completion status per user.
- **Progress Tracking**: Authenticated history for competitive learning.

### 🚀 Hackathons & Webinars
- **Categorized Discovery**: AI/ML, Web3, FinTech, and more.
- **Registration Pipeline**: Atomically incremented participant counts and user-state persistence.
- **Speaker Profiles**: Structured data for webinar hosts and event schedules.

### 👤 Profile System
- **Stealth UI**: Custom design language for user identities.
- **Social Graph**: Follow/connection system with real-time status updates.
- **Optimization**: Skeleton loading states and optimized Firestore document lookups.

---

## 🛠️ Tech Stack

### Core Frameworks
- **Next.js 16.2.1**: App Router architecture with React Server Components.
- **React 19.2.4**: Concurrent rendering and optimized hook patterns.
- **TypeScript 5**: Strict type safety across the monorepo.
- **Tailwind CSS 4**: Utility-first styling with custom design tokens.

### Services & Logic
- **Firebase 12**: Authentication (OAuth/OTP) and Firestore NoSQL database.
- **Motion (Framer)**: Physics-derived kinetic animation system.
- **Google Gemini**: Large Language Model integration for dynamic content generation.
- **Lucide / shadcn**: Primitive UI components and iconography.

### Infrastructure
- **Vercel**: Global edge hosting, Analytics, and Speed Insights.
- **Microsoft Clarity**: Behavioral heatmaps and session monitoring.
- **pnpm**: Disk-efficient workspace management.

---

## 🔄 Data Flows

### OTP Authentication Flow
```text
User Input (Email) → API /send-otp → Admin SDK generates code → Firestore Storage → Email Service
User Input (Code) → API /verify-otp → Firestore Lookup → Token Generation → Redirect /main
```

### Challenge Participation
```text
User Click → Check Auth → Firestore Atomic Increment (Participants) → Add to User Record → UI Update
```

### Daily Puzzle Generation
```text
Cron Job (Daily) → Gemini API Request → Puzzle Validation → Firestore Write → Global Update
```

---

## 📁 Project Structure

```bash
Project-24/
├── frontend/                   # Next.js Application Root
│   ├── app/                    # App Router (pages, layouts, API routes)
│   ├── components/
│   │   ├── background/         # Canvas-rendered particle systems
│   │   ├── effects/            # Reusable motion & interaction primitives (KineticCard, BorderGlow)
│   │   ├── layout/             # Shared shell components (Sidebar, AppFrame)
│   │   ├── social/             # Profile and Social Graph logic
│   │   └── ui/                 # Low-level design primitives (AnimatedList, Buttons)
│   ├── public/                 # Static assets and verification files
│   └── lib/                    # Shared frontend utilities
├── backend/                    # Domain Logic & Shared Services
│   ├── services/               # Logic separated from route handlers (Gemini, Puzzle Gen)
│   ├── db.js                   # Firestore CRUD abstractions
│   └── auth.js                 # Firebase Auth server-side helpers
├── package.json                # Monorepo workspace configuration
└── README.md                   # Technical Documentation
```

---

## 🔌 API Documentation

### Authentication

#### `POST /api/auth/send-otp`
Sends a 6-digit verification code to the provided email.
- **Request**: `{ "email": "user@example.com" }`
- **Response**: `{ "success": true }`

#### `POST /api/auth/verify-otp`
Validates the code and initiates a session.
- **Request**: `{ "email": "user@example.com", "otp": "123456" }`
- **Response**: `{ "token": "...", "user": { ... } }`

---

## 🎨 Design System

### Design Philosophy
Project 24 implements a **Kinetic Dark** design language where motion is physics-derived from background particle vectors.

**Fluid Typography Example**:
```css
/* Perfect Fourth (1.333) scale with fluid clamp */
font-size: clamp(1rem, 2vw + 1rem, 3rem);
```

### Component Architecture
- **KineticTransition**: Physics-derived enter/exit transitions shared across all page routes.
- **BorderGlow**: Mouse-tracking luminous border following the primary light source.
- **Starfield**: Canvas-rendered particle system with configurable density and drift.

### Design Tokens
- `--color-primary`: Deep space black (`#06070f`)
- `--color-accent`: Cyan (`#22d3ee`)
- `--space-8`: 8px base grid spacing

---

## 🔒 Security

- **Auth Session Handling**: Firebase Auth tokens with secure refresh logic.
- **Firestore Security Rules**: Strict attribute-based access control (ABAC).
- **Secret Storage**: Environment variables managed via Vercel Secrets.
- **Rate Limiting**: API throttling for OTP and Social Auth endpoints.
- **COOP Policy**: Cross-Origin-Opener-Policy enforced for secure OAuth popups.

---

## ⚙️ Environment Variables

| Variable | Purpose | Required |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client-side Firebase initialization | Yes |
| `FIREBASE_ADMIN_KEY` | Server-side Firestore/Auth access | Yes |
| `GEMINI_API_KEY` | AI Puzzle generation | Yes |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL and Sitemap generation | Yes |

---

## 🛠️ Development

### Scripts
| Command | Action |
| :--- | :--- |
| `pnpm dev` | Start development server for both frontend and backend |
| `pnpm build` | Run production build for the entire workspace |
| `pnpm lint` | Execute ESLint across all projects |
| `pnpm clean` | Terminate orphaned node processes |

### Coding Standards
- **Component Pattern**: Functional components with Hooks.
- **Styling**: Tailwind-first approach using design tokens.
- **Logic**: Domain logic must reside in `backend/services`.
- **TypeScript**: Strict mode enabled; `any` is prohibited.

---

## 🛠️ Troubleshooting

### Firebase Auth popup blocked
Disable browser popup blockers or add `project-24.vercel.app` to the whitelist.

### OTP not sending
Ensure the `FIREBASE_ADMIN_KEY` is correctly formatted as a single-line JSON string in your `.env`.

### Hydration Errors
Ensure custom browser extensions (like dark mode toggles) are disabled as they can interfere with the Starfield canvas.

---

## 📈 Status & Roadmap
- **Project Status**: Active Development ✅
- **Current Version**: v0.2.5 (Puzzle Engine Integrated)
- **Known Limitations**:
  - Desktop-first optimizations prioritized.
  - Daily puzzle generation depends on Gemini API availability.

---

## 📄 License
This project is licensed under the **MIT License**.

---

<div align="center">
  <p>Built with ☕ and 🔥 by the Project 24 team</p>
  <p>
    <a href="https://project-24-pi.vercel.app">Live Site</a> ·
    <a href="https://project-24-pi.vercel.app/legal/privacy-policy">Privacy</a> ·
    <a href="https://project-24-pi.vercel.app/legal/terms-of-use">Terms</a> ·
    <a href="mailto:silven667@gmail.com">Contact</a>
  </p>
</div>
