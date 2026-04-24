"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import StarBorder from "@/components/effects/StarBorder";
import { Video, Code2, Cpu, Sparkles, Clock, Calendar, Users, Plus } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import { useAuth } from "@backend/AuthProvider";
import { getWebinars, registerForWebinar, checkIfRegisteredForWebinar } from "@backend/db.js";
import "./webinars.css";

interface Webinar {
  id: string;
  title: string;
  description: string;
  speakerName: string;
  speakerRole?: string;
  speakerAvatar?: string;
  type: "recorded" | "scheduled" | "live";
  dateTime?: string;
  videoUrl?: string;
  tags: string[];
  participants: number;
}

export default function WebinarsPage() {
  const { user, loading: authLoading } = useAuth();
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [registrations, setRegistrations] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const data = await getWebinars();
        setWebinars(data as Webinar[]);
        
        if (user) {
          const regStatus: Record<string, boolean> = {};
          await Promise.all(
            (data as Webinar[]).map(async (webinar) => {
              const isReg = await checkIfRegisteredForWebinar(user.uid, webinar.id);
              regStatus[webinar.id] = isReg;
            })
          );
          setRegistrations(regStatus);
        }
      } catch (err) {
        console.error("Failed to fetch webinars:", err);
      }
    };
    fetchWebinars();
  }, [user]);

  const handleRegister = async (webinarId: string) => {
    if (!user) return;
    try {
      await registerForWebinar(webinarId, user.uid);
      setRegistrations(prev => ({ ...prev, [webinarId]: true }));
      setWebinars(prev => prev.map(w => w.id === webinarId ? { ...w, participants: w.participants + 1 } : w));
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "recorded": return <Video className="h-7 w-7" />;
      case "live": return <Clock className="h-7 w-7" />;
      default: return <Code2 className="h-7 w-7" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "recorded": return "#10b981";
      case "live": return "#f43f5e";
      default: return "#6366f1";
    }
  };

  const webinarCards = webinars.map((webinar) => (
    <Link key={webinar.id} href={`/webinars/${webinar.id}`} className="webinar-card-wrapper w-full block outline-none group">
      <BorderGlow
        edgeSensitivity={28}
        glowColor={webinar.type === "recorded" ? "160 80 65" : webinar.type === "scheduled" ? "250 80 65" : "340 80 65"}
        backgroundColor="#0a0e1a"
        borderRadius={20}
        glowRadius={24}
        glowIntensity={0.6}
        coneSpread={22}
        animated={false}
        colors={
          webinar.type === "recorded"
            ? ["#10b981", "#34d399", "#059669"]
            : webinar.type === "scheduled"
            ? ["#6366f1", "#818cf8", "#4f46e5"]
            : ["#f43f5e", "#fb7185", "#e11d48"]
        }
        className="webinar-card-glow h-full cursor-pointer"
      >
        <article className="webinar-card">
          <div className="webinar-card__info">
            <div className="flex items-center gap-3 mb-4">
              <div className="webinar-card__icon" style={{ "--icon-accent": getColor(webinar.type) } as React.CSSProperties}>
                {getIcon(webinar.type)}
              </div>
              <span className={`webinar-${webinar.type}-badge px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10`}>
                {webinar.type}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white/95 leading-snug mb-2 group-hover:text-emerald-400 transition-colors">
              {webinar.title}
            </h3>
            <p className="text-sm text-white/40 mb-3 flex items-center gap-1.5 italic">
              with {webinar.speakerName}
            </p>
            <p className="text-base text-white/55 leading-relaxed flex-1 line-clamp-2">
              {webinar.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6 mb-4">
              {webinar.tags && webinar.tags.slice(0, 3).map(tag => (
                <span key={tag} className="webinar-tag text-[10px] px-2 py-0.5 bg-white/5 border border-white/5 rounded text-white/30">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="flex items-center gap-4 text-xs text-white/40">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {webinar.participants}
                </div>
                {webinar.dateTime && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {webinar.dateTime}
                  </div>
                )}
              </div>
              <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors flex items-center gap-1">
                View Details
                <Sparkles className="h-3 w-3" />
              </span>
            </div>
          </div>
        </article>
      </BorderGlow>
    </Link>
  ));

  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/60 border-b border-white/5">
        <Link
          href="/main"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <Link
              href="/webinars/host"
              className="group"
            >
              <StarBorder as="span" color="indigo" speed="5s" thickness={1}>
                <span className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-indigo-100 transition-colors duration-200 group-hover:text-white">
                  <Plus className="h-4 w-4" />
                  <span>Host/Schedule</span>
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
        <div className="webinars-hero-icon mb-6">
          <Video className="h-10 w-10 text-indigo-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-indigo-300 via-white to-sky-300 bg-clip-text text-transparent pb-2">
          Webinars
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60 leading-relaxed">
          Join live sessions or watch recordings from industry experts. Stay ahead with deep dives into modern technologies, best practices, and hands-on workshops.
        </p>
      </header>

      {/* Cards stack */}
      <section className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24">
        {webinars.length > 0 ? (
          <AnimatedList
            items={webinarCards}
            displayScrollbar={false}
            showGradients={true}
          />
        ) : (
          <div className="text-center py-20 text-white/40">
            No webinars found. Host the first one!
          </div>
        )}
      </section>

    </StarfieldBackground>
  );
}
