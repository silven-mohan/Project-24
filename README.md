# Project 24

> **A learner-first, peer-to-peer engineering ecosystem.**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-orange?logo=firebase)](https://firebase.google.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://project-24-pi.vercel.app)

---

## 🌐 Live Site

**[https://project-24-pi.vercel.app](https://project-24-pi.vercel.app)**

---

## 📖 Overview

Project 24 is a full-stack collaborative learning platform built for engineers and developers who learn best with their peers. It combines social networking, competitive programming, live events, and AI-powered features into a single, beautifully designed platform.

The name *Project 24* reflects the 24-hour coding sprint culture and the idea that every hour is an opportunity to learn, build, and connect.

---

## ✨ Features

### 🏟️ Main Arena (`/main`)
- Full-page hero with kinetic "PROJECT 24" branding
- Scroll-reveal layout: title-first, content below the fold
- Embedded interactive learning guide (served from `/public/project24-learning-guide.html`) via iframe with postMessage cross-frame communication
- Section-based navigation synced between the outer page and the iframe
- Live sign-in gate (shown only to unauthenticated users)

### ⚔️ Challenges (`/challenges`)
- Browse and create peer-driven coding challenges
- HackerRank-integrated challenge links with strict URL validation
- Real-time participant count tracking via Firestore
- Challenge categories: Algorithm, UI Design, Brain Teasers, and more
- Custom challenge creation form with duration picker and icon selector
- Detailed challenge view page with "Ready to Begin" action section

### 🚀 Hackathons (`/hackathons`)
- Browse live, upcoming, and completed hackathons
- Filter by category: AI/ML, Web Dev, Sustainability, EdTech, HealthTech, Blockchain, Cybersecurity, and FinTech
- Per-hackathon registration with real-time participant tracking
- Prize pool display, team size info, and format labels (Online / In-Person / Hybrid)
- Registration status persistence per authenticated user
- External hackathon link support

### 🎤 Webinars (`/webinars`)
- Browse recorded, scheduled, and live webinar sessions
- Per-speaker profiles with name, role, and avatar
- Registration system for scheduled webinars
- Host/schedule your own webinar (authenticated users)
- Category tags and participant counters
- Dynamic color theming per webinar type

### 👥 Study Groups (`/study-groups`)
- Create and join peer-led study groups
- Browse groups by topic and membership
- Real-time member count tracking

### 🎮 Puzzle Games (`/puzzle-games`)
- Daily AI-generated puzzles via **Google Gemini API**
- **Mini Sudoku** — 6×6 grid with difficulty scaling
- **Minesweeper** — Configurable grid with timer
- Daily puzzle system: one puzzle per day per user, tracks completion
- Win cards shown upon puzzle completion
- Authenticated progress tracking; guests can play without saving progress

### 👤 Profile (`/profile`, `/users/[identifier]`)
- Stealth-themed user profile page
- Stats display: challenges completed, hackathons joined, connections
- Connections / social follow system
- Profile editing and avatar display
- View other users' public profiles via `username` or `uid`
- Skeleton loading states for premium perceived performance

### 🔐 Authentication (`/login`)
- **Email OTP** — Passwordless login via 6-digit one-time code sent to email
- **Google OAuth** — One-click sign-in via Google
- **GitHub OAuth** — One-click sign-in via GitHub
- Social auth rate limiting (prevents button spam)
- Automatic redirect to `/main` after successful authentication
- OTP verification modal with animated transitions

### 📰 Post (`/post`)
- Content publishing route for platform updates and articles

### ⚖️ Legal Pages (`/legal/*`)
- [Privacy Policy](/legal/privacy-policy)
- [Terms of Use](/legal/terms-of-use)
- [Cookie Policy](/legal/cookie-policy)

---

## 🎨 Design System

Project 24 features a **Kinetic Dark UI** — a fully custom, premium design language built from scratch:

- **Color Palette**: Deep space black (`#06070f`), Cyan accents (`#22d3ee`), gradient whites
- **Typography**: Fluid type scale using `clamp()` — Perfect Fourth (1.333) scale. Base `1rem → 1.125rem` across viewports
- **Spacing**: 8px base scale with fluid section padding via `clamp()`
- **Motion**: `KineticTransition` component system — physics-derived from the StarfieldBackground's drift vectors
- **Starfield Background**: Canvas-rendered particle system with configurable density and drift
- **BorderGlow Effect**: Mouse-tracking luminous border that follows the primary light source
- **StarBorder Component**: Animated gradient border for CTAs
- **ClickSpark Effect**: Particle burst on every click interaction
- **RippleGrid Background**: CSS grid ripple effect for the landing page
- **AnimatedList**: Smooth staggered list reveal component
- **KineticCard**: Enter/exit animations derived from starfield physics
- **KineticPage**: Full-page enter/exit wrapper with AnimatePresence

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.2.1 | React framework, App Router, SSR/SSG |
| **React** | 19.2.4 | UI library |
| **TypeScript** | ^5 | Static typing |
| **Tailwind CSS** | ^4 | Utility-first CSS |
| **Motion (Framer)** | ^12 | Animation library (`motion/react`) |
| **Lucide React** | ^1.7 | Icon library |
| **shadcn/ui** | ^4 | Headless component primitives |
| **tw-animate-css** | ^1.4 | Tailwind animation utilities |

### Backend / Services
| Technology | Purpose |
|-----------|---------|
| **Firebase Auth** | Email OTP, Google OAuth, GitHub OAuth |
| **Firestore** | NoSQL database for all platform data |
| **Firebase Admin SDK** | Server-side token verification and OTP flow |
| **Google Gemini API** | AI-powered daily puzzle generation |
| **Next.js API Routes** | `/api/auth/send-otp`, `/api/auth/verify-otp` |
| **Node.js Cron** | Scheduled daily puzzle generation |

### Analytics & Monitoring
| Tool | Purpose |
|------|---------|
| **Vercel Analytics** | Page view tracking and visitor insights |
| **Vercel Speed Insights** | Core Web Vitals (LCP, INP, CLS) monitoring |
| **Microsoft Clarity** | Session heatmaps and behavioral analytics |
| **Google Search Console** | Search indexing and performance monitoring |

### DevOps & Infrastructure
| Tool | Purpose |
|------|---------|
| **Vercel** | Frontend deployment and edge network |
| **pnpm** | Fast, disk-efficient package manager |
| **pnpm Workspaces** | Monorepo management (frontend + backend) |
| **ESLint** | Code quality and linting |

---

## 📁 Project Structure

```
Project-24/
├── frontend/                   # Next.js App
│   ├── app/
│   │   ├── layout.tsx          # Root layout (metadata, analytics, JSON-LD)
│   │   ├── page.tsx            # Landing/gateway page
│   │   ├── sitemap.ts          # Auto-generated sitemap.xml
│   │   ├── robots.ts           # Auto-generated robots.txt
│   │   ├── globals.css         # Design system (fluid type, spacing tokens)
│   │   ├── main/               # Main Arena page
│   │   ├── challenges/         # Coding Challenges
│   │   ├── hackathons/         # Hackathons listing
│   │   ├── webinars/           # Webinars hub
│   │   ├── study-groups/       # Study Groups
│   │   ├── puzzle-games/       # Puzzle Games (Sudoku, Minesweeper)
│   │   │   ├── mini-sudoku/
│   │   │   └── minesweeper/
│   │   ├── profile/            # User profile page
│   │   ├── users/[identifier]/ # Dynamic user profile lookup
│   │   ├── post/               # Content publishing
│   │   ├── login/              # Authentication page
│   │   ├── legal/
│   │   │   ├── privacy-policy/
│   │   │   ├── terms-of-use/
│   │   │   └── cookie-policy/
│   │   └── api/
│   │       └── auth/
│   │           ├── send-otp/   # OTP generation endpoint
│   │           └── verify-otp/ # OTP verification endpoint
│   ├── components/
│   │   ├── background/         # StarfieldBackground, RippleGridBackground
│   │   ├── effects/            # BorderGlow, StarBorder, ClickSpark, KineticTransition
│   │   ├── layout/             # AppFrame, Sidebar
│   │   ├── sections/           # Page section components
│   │   ├── social/             # ProfileView, connections
│   │   ├── hackathons/         # Hackathon-specific components
│   │   ├── webinars/           # Webinar-specific components
│   │   ├── study-groups/       # Study group components
│   │   ├── legal/              # Shared LegalPage component
│   │   └── ui/                 # Primitive UI components (AnimatedList, etc.)
│   ├── public/
│   │   ├── project24-learning-guide.html  # Interactive learning guide
│   │   └── google673575b69757ed8d.html    # GSC verification file
│   └── types/                  # TypeScript type definitions
│
├── backend/                    # Shared backend module
│   ├── auth.js                 # Firebase Auth helpers
│   ├── db.js                   # Firestore CRUD operations
│   ├── firebaseConfig.js       # Firebase SDK initialization
│   ├── AuthProvider.tsx        # React context for auth state
│   ├── cron.js                 # Daily puzzle generation cron
│   └── services/
│       ├── geminiService.js    # Google Gemini API integration
│       ├── puzzleGenerator.js  # Puzzle generation logic
│       └── puzzleStorage.js    # Puzzle Firestore persistence
│
├── package.json                # Root workspace config
├── pnpm-workspace.yaml         # pnpm workspace definition
├── pnpm-lock.yaml              # Lockfile
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18
- **pnpm** >= 9 (`npm install -g pnpm`)
- A **Firebase** project with Auth, Firestore, and Admin SDK enabled
- A **Google Gemini API** key (for puzzle generation)

### 1. Clone the Repository
```bash
git clone https://github.com/silven-mohan/Project-24.git
cd Project-24
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Create `backend/.env`:
```env
FIREBASE_ADMIN_KEY=your_service_account_json
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Development Server
```bash
pnpm dev
```

The app will be available at **http://localhost:3000**

---

## 📐 Design Principles

1. **Kinetic UI**: All motion is physics-derived. Entry directions follow the starfield's average drift vector.
2. **Desktop-First, Mobile-Aware**: Desktop layout is locked/frozen. All responsive changes use additive `@media (max-width: 768px)` overrides only.
3. **Fluid Typography**: All font sizes use `clamp()` — no hard breakpoints for text.
4. **Zero Horizontal Scroll**: Strict `overflow-x: hidden` on root elements.
5. **Performance-First Analytics**: All tracking is non-blocking (`strategy="afterInteractive"`) and anonymous-first.

---

## 🔒 Security

- **Firestore Security Rules**: All database reads/writes are protected by server-side security rules
- **Firebase Auth**: All authentication tokens are managed by Firebase — never stored in plain text
- **OTP Flow**: Email OTP codes expire after 10 minutes and are single-use
- **Rate Limiting**: Social auth buttons are rate-limited to prevent spam
- **HTTPS Only**: All data transmission is encrypted via TLS
- **COOP Header**: `Cross-Origin-Opener-Policy: same-origin-allow-popups` configured for Firebase OAuth popup compatibility

---

## 🗺️ SEO

- **Auto-generated sitemap** at `/sitemap.xml` (Next.js App Router)
- **Auto-generated robots.txt** at `/robots.txt`
- **Per-page metadata** — unique title, description, OG tags, and canonical URLs
- **Schema.org JSON-LD** — `WebApplication` structured data
- **Open Graph** and **Twitter Cards** configured globally
- **Google Search Console** verified and sitemap submitted
- **Bing Webmaster Tools** imported from GSC

---

## ⚖️ Legal

- [Privacy Policy](https://project-24-pi.vercel.app/legal/privacy-policy)
- [Terms of Use](https://project-24-pi.vercel.app/legal/terms-of-use)
- [Cookie Policy](https://project-24-pi.vercel.app/legal/cookie-policy)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org) — The React framework for production
- [Firebase](https://firebase.google.com) — Backend infrastructure
- [Google Gemini](https://ai.google.dev) — AI-powered puzzle generation
- [Vercel](https://vercel.com) — Deployment and analytics
- [Microsoft Clarity](https://clarity.microsoft.com) — Behavioral analytics
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Lucide](https://lucide.dev) — Icon library
- [shadcn/ui](https://ui.shadcn.com) — Component primitives

---

<div align="center">
  <p>Built with ☕ and 🔥 by the Project 24 team</p>
  <p>
    <a href="https://project-24-pi.vercel.app">Live Site</a> ·
    <a href="https://project-24-pi.vercel.app/legal/privacy-policy">Privacy</a> ·
    <a href="https://project-24-pi.vercel.app/legal/terms-of-use">Terms</a>
  </p>
</div>
