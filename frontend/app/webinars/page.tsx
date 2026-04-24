"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import StarBorder from "@/components/effects/StarBorder";
import { Video, Code2, Cpu, Sparkles, Clock, Calendar, Users, Plus } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import WebinarModal from "@/components/webinars/WebinarModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div key={webinar.id} className="webinar-card-wrapper w-full">
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
        className="webinar-card-glow h-full"
      >
        <article className="webinar-card">
          <div className="webinar-card__info">
            <div className="flex items-center gap-3 mb-4">
              <div className="webinar-card__icon" style={{ "--icon-accent": getColor(webinar.type) } as React.CSSProperties}>
                {getIcon(webinar.type)}
              </div>
              <span className={`webinar-${webinar.type}-badge`}>
                {webinar.type.charAt(0).toUpperCase() + webinar.type.slice(1)}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white/95 leading-snug mb-3">
              {webinar.title}
            </h3>
            <p className="text-base text-white/55 leading-relaxed flex-1">
              {webinar.description}
            </p>
            <div className="webinar-meta">
              <span className="webinar-meta__item">
                <Calendar className="h-3.5 w-3.5" />
                {webinar.dateTime || "N/A"}
              </span>
              <span className="webinar-meta__item">
                <Users className="h-3.5 w-3.5" />
                {webinar.participants} {webinar.type === "recorded" ? "views" : "registered"}
              </span>
            </div>
            <div className="webinar-speaker">
              <div className="webinar-speaker__avatar">
                {webinar.speakerAvatar || (webinar.speakerName ? webinar.speakerName.charAt(0) : "?")}
              </div>
              <div className="webinar-speaker__info">
                <span className="webinar-speaker__name">{webinar.speakerName}</span>
                <span className="webinar-speaker__role">{webinar.speakerRole || "Expert"}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6 mb-4">
              {webinar.tags && webinar.tags.map(tag => (
                <span key={tag} className="webinar-tag">{tag}</span>
              ))}
            </div>
            <div className="flex justify-end mt-auto">
              {webinar.type === "recorded" ? (
                <a href={webinar.videoUrl} target="_blank" rel="noopener noreferrer" className="webinar-btn m-0 border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20">
                  Watch Recording
                </a>
              ) : webinar.type === "live" ? (
                <button className="webinar-btn m-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                  Join Live
                </button>
              ) : (
                <button
                  onClick={() => handleRegister(webinar.id)}
                  disabled={registrations[webinar.id]}
                  className={`webinar-btn m-0 ${registrations[webinar.id] ? "opacity-50 cursor-not-allowed" : "border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"}`}
                >
                  {registrations[webinar.id] ? "Registered" : "Register Now"}
                </button>
              )}
            </div>
          </div>
        </article>
      </BorderGlow>
    </div>
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="group"
            >
              <StarBorder as="span" color="indigo" speed="5s" thickness={1}>
                <span className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-indigo-100 transition-colors duration-200 group-hover:text-white">
                  <Plus className="h-4 w-4" />
                  <span>Host/Schedule</span>
                </span>
              </StarBorder>
            </button>
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

      <WebinarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Refresh list
          getWebinars().then(data => setWebinars(data as Webinar[]));
        }}
      />
    </StarfieldBackground>
  );
}
