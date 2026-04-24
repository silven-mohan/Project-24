"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import StarBorder from "@/components/effects/StarBorder";
import {
  Code2,
  Globe,
  Leaf,
  GraduationCap,
  HeartPulse,
  CodeSquare,
  Shield,
  Coins,
  Timer,
  Users,
  Rocket,
  Plus,
  Cpu,
  ArrowLeft
} from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { useAuth } from "@backend/AuthProvider";
import { getHackathons, registerForHackathon, checkIfRegisteredForHackathon } from "@backend/db.js";
import "./hackathons.css";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  category: string;
  format: "Online" | "In-Person" | "Hybrid";
  duration: string;
  participants: number;
  prizePool: string;
  tags: string[];
  status: "Live" | "Upcoming" | "Completed";
  accentColor?: string;
  glowColor?: string;
  gradientColors?: [string, string, string];
  hackathonLink?: string;
}

const statusConfig: Record<
  Hackathon["status"],
  { label: string; dotClass: string; badgeClass: string }
> = {
  Live: {
    label: "LIVE NOW",
    dotClass: "status-dot--live",
    badgeClass: "status-badge--live",
  },
  Upcoming: {
    label: "UPCOMING",
    dotClass: "status-dot--upcoming",
    badgeClass: "status-badge--upcoming",
  },
  Completed: {
    label: "COMPLETED",
    dotClass: "status-dot--completed",
    badgeClass: "status-badge--completed",
  },
};

const formatColor: Record<Hackathon["format"], string> = {
  Online: "text-emerald-400",
  Hybrid: "text-amber-400",
  "In-Person": "text-sky-400",
};

export default function HackathonsPage() {
  const { user, loading: authLoading } = useAuth();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [registrations, setRegistrations] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const data = await getHackathons();
        setHackathons(data as Hackathon[]);

        if (user) {
          const regStatus: Record<string, boolean> = {};
          await Promise.all(
            (data as Hackathon[]).map(async (hackathon) => {
              const isReg = await checkIfRegisteredForHackathon(user.uid, hackathon.id);
              regStatus[hackathon.id] = isReg;
            })
          );
          setRegistrations(regStatus);
        }
      } catch (err) {
        console.error("Failed to fetch hackathons:", err);
      }
    };
    fetchHackathons();
  }, [user]);

  const handleRegister = async (hackathonId: string) => {
    if (!user) return;
    try {
      await registerForHackathon(hackathonId, user.uid);
      setRegistrations(prev => ({ ...prev, [hackathonId]: true }));
      setHackathons(prev => prev.map(h => h.id === hackathonId ? { ...h, participants: h.participants + 1 } : h));
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("ai") || cat.includes("ml")) return <Cpu className="h-6 w-6" />;
    if (cat.includes("blockchain") || cat.includes("web3")) return <Globe className="h-6 w-6" />;
    if (cat.includes("climate") || cat.includes("green")) return <Leaf className="h-6 w-6" />;
    if (cat.includes("education")) return <GraduationCap className="h-6 w-6" />;
    if (cat.includes("health")) return <HeartPulse className="h-6 w-6" />;
    if (cat.includes("open source")) return <CodeSquare className="h-6 w-6" />;
    if (cat.includes("security")) return <Shield className="h-6 w-6" />;
    if (cat.includes("finance") || cat.includes("fintech")) return <Coins className="h-6 w-6" />;
    return <Rocket className="h-6 w-6" />;
  };

  const getTheme = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("ai")) return { accent: "#f97316", glow: "25 85 65", grad: ["#f97316", "#fb923c", "#ea580c"] };
    if (cat.includes("blockchain")) return { accent: "#a855f7", glow: "280 75 65", grad: ["#a855f7", "#c084fc", "#7c3aed"] };
    if (cat.includes("climate")) return { accent: "#10b981", glow: "160 75 60", grad: ["#10b981", "#34d399", "#059669"] };
    if (cat.includes("education")) return { accent: "#3b82f6", glow: "220 80 65", grad: ["#3b82f6", "#60a5fa", "#2563eb"] };
    if (cat.includes("health")) return { accent: "#ec4899", glow: "330 80 65", grad: ["#ec4899", "#f472b6", "#db2777"] };
    return { accent: "#22d3ee", glow: "190 80 70", grad: ["#22d3ee", "#67e8f9", "#06b6d4"] };
  };

  const hackathonCards = hackathons.map((hackathon, idx) => {
    const theme = getTheme(hackathon.category);
    return (
      <div key={hackathon.id} className="hackathon-card-wrapper w-full">
        <BorderGlow
          edgeSensitivity={28}
          glowColor={hackathon.glowColor || theme.glow}
          backgroundColor="#0a0e1a"
          borderRadius={20}
          glowRadius={24}
          glowIntensity={0.7}
          coneSpread={22}
          animated={false}
          colors={(hackathon.gradientColors || theme.grad) as [string, string, string]}
          className="hackathon-card-glow h-full"
        >
          <article className="hackathon-card group cursor-pointer" id={`hackathon-${hackathon.id}`}>
            <Link href={`/hackathons/${hackathon.id}`} className="absolute inset-0 z-10" />
            <div className="hackathon-card__header relative z-0">
              <div className={`status-badge ${statusConfig[hackathon.status].badgeClass}`}>
                <span className={`status-dot ${statusConfig[hackathon.status].dotClass}`} />
                {statusConfig[hackathon.status].label}
              </div>
              <span className={`text-xs font-medium ${formatColor[hackathon.format]}`}>
                {hackathon.format}
              </span>
            </div>

            <div className="hackathon-card__title-row">
              <div
                className="hackathon-card__icon"
                style={{ "--icon-accent": hackathon.accentColor || theme.accent } as React.CSSProperties}
              >
                {getIcon(hackathon.category)}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-0.5">
                  {hackathon.category}
                </p>
                <h3 className="text-lg font-semibold text-white/95 leading-snug">
                  {hackathon.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-white/55 leading-relaxed mt-3 flex-1">
              {hackathon.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {hackathon.tags.map((tag) => (
                <span key={tag} className="hackathon-tag">{tag}</span>
              ))}
            </div>

            <div className="hackathon-card__footer">
              <div className="flex flex-col gap-1.5">
                 <div className="flex items-center gap-4 text-xs text-white/40">
                   <span className="flex items-center gap-1.5">
                     <Timer className="h-3.5 w-3.5" />
                     {hackathon.duration}
                   </span>
                   <span className="flex items-center gap-1.5">
                     <Users className="h-3.5 w-3.5" />
                     {hackathon.participants}
                   </span>
                 </div>
                 <div className="text-xs font-medium text-amber-400">
                    Prize: {hackathon.prizePool}
                 </div>
              </div>
              {registrations[hackathon.id] ? (
                <Link 
                  href={`/hackathons/${hackathon.id}`}
                  className="hackathon-join-btn text-center flex items-center justify-center gap-2"
                  style={{ "--btn-accent": hackathon.accentColor || theme.accent } as React.CSSProperties}
                >
                  <span>{hackathon.hackathonLink ? "Visit Website" : "View Details"}</span>
                  {hackathon.hackathonLink ? <Globe className="h-3.5 w-3.5" /> : <ArrowLeft className="h-3.5 w-3.5 rotate-180" />}
                </Link>
              ) : (
                <Link
                  href={`/hackathons/${hackathon.id}`}
                  className="hackathon-join-btn text-center"
                  style={{ "--btn-accent": hackathon.accentColor || theme.accent } as React.CSSProperties}
                >
                  Register Now
                </Link>
              )}
            </div>
          </article>
        </BorderGlow>
      </div>
    );
  });

  return (
    <StarfieldBackground className="relative min-h-screen w-full overflow-hidden bg-[#06070f] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/60 border-b border-white/5">
        <Link
          href="/main"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <Link href="/hackathons/organize" className="group">
              <StarBorder as="span" color="cyan" speed="5s" thickness={1}>
                <span className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-cyan-100 transition-colors duration-200 group-hover:text-white">
                  <Plus className="h-4 w-4" />
                  <span>Organize</span>
                </span>
              </StarBorder>
            </Link>
          )}
          {!user && !authLoading && (
            <Link href="/login" className="group">
              <StarBorder as="span" color="cyan" speed="5s" thickness={1}>
                <span className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-cyan-100 transition-colors duration-200 group-hover:text-white">
                  Sign In
                </span>
              </StarBorder>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-10 flex flex-col items-center text-center pt-32 pb-12 px-4">
        <div className="hackathons-hero-icon mb-6">
          <Code2 className="h-10 w-10 text-cyan-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent pb-2">
          Hackathons
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60 leading-relaxed">
          Collaborate, innovate, and build. Join global events to level up your skills, create amazing projects, and win huge prizes.
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-cyan-400">
              {hackathons.reduce((a, c) => a + (c.participants || 0), 0).toLocaleString()}+
            </span>
            <span className="text-xs text-white/40 uppercase tracking-wider mt-1">Hackers</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-400">{hackathons.length}</span>
            <span className="text-xs text-white/40 uppercase tracking-wider mt-1">Events</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-emerald-400">
              {hackathons.filter((c) => c.status === "Live").length}
            </span>
            <span className="text-xs text-white/40 uppercase tracking-wider mt-1">Live Now</span>
          </div>
        </div>
      </header>

      {/* Cards stack using AnimatedList */}
      <section className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24">
        {hackathons.length > 0 ? (
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hackathonCards}
             </div>
          </div>
        ) : (
          <div className="text-center py-20 text-white/40">
            No hackathons found. Organize the first one!
          </div>
        )}
      </section>

    </StarfieldBackground>
  );
}

