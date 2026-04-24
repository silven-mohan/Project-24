"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Video, 
  Clock, 
  Users, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  Mic2,
  Share2,
  Sparkles
} from "lucide-react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import { getWebinarById, registerForWebinar, checkIfRegisteredForWebinar } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";
import "../webinars.css";

export default function WebinarDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  
  const [webinar, setWebinar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getWebinarById(id as string);
        if (!data) {
          router.push("/webinars");
          return;
        }
        setWebinar(data);
        
        if (user) {
          const registered = await checkIfRegisteredForWebinar(user.uid, id as string);
          setIsRegistered(registered);
        }
      } catch (err) {
        console.error("Failed to load webinar:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, user, router]);

  const handleRegister = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setRegistering(true);
    try {
      await registerForWebinar(id as string, user.uid);
      setIsRegistered(true);
      setWebinar((prev: any) => ({ ...prev, participants: (prev.participants || 0) + 1 }));
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setRegistering(false);
    }
  };

  const getThemeColors = (type: string) => {
    switch (type) {
      case "recorded": return ["#10b981", "#34d399", "#059669"];
      case "live": return ["#f43f5e", "#fb7185", "#e11d48"];
      default: return ["#6366f1", "#818cf8", "#4f46e5"];
    }
  };

  if (loading) {
    return (
      <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      </StarfieldBackground>
    );
  }

  const colors = getThemeColors(webinar.type);
  const accentColor = colors[0];

  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/60 border-b border-white/5">
        <Link
          href="/webinars"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Webinars
        </Link>
      </nav>

      <div className="pt-32 pb-24 px-4 max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header Box */}
        <BorderGlow
          edgeSensitivity={32}
          glowColor="160 80 65"
          backgroundColor="#0a0e1a"
          borderRadius={24}
          glowRadius={28}
          glowIntensity={0.6}
          colors={colors as [string, string, string]}
        >
          <div className="p-8 flex flex-col items-center text-center gap-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10 relative"
              style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)` }}
            >
              <Video className="h-10 w-10" style={{ color: accentColor }} />
              {webinar.type === "live" && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-rose-500 text-[10px] font-bold rounded-full animate-pulse">LIVE</span>
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
                {webinar.type} Webinar
              </span>
              <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                {webinar.title}
              </h1>
            </div>
          </div>
        </BorderGlow>

        {/* Speaker Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Mic2 className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Presented by</p>
            <p className="text-lg font-bold">{webinar.speakerName}</p>
            <p className="text-sm text-white/50">{webinar.speakerRole || "Expert Speaker"}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center gap-1">
            <Calendar className="h-5 w-5 text-emerald-400 mb-1" />
            <p className="text-[9px] uppercase tracking-widest text-white/40">Schedule</p>
            <p className="text-sm font-bold">{webinar.dateTime || "On-Demand"}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center gap-1">
            <Users className="h-5 w-5 text-emerald-400 mb-1" />
            <p className="text-[9px] uppercase tracking-widest text-white/40">Participants</p>
            <p className="text-sm font-bold">{webinar.participants || 0}</p>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            Session Overview
          </h2>
          <p className="text-white/50 leading-relaxed whitespace-pre-wrap">
            {webinar.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {webinar.tags?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/40">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Box */}
        <div className="p-2 rounded-3xl bg-white/5 border border-white/10">
          <div className="p-6 rounded-2xl bg-[#0a0e1a] border border-white/5">
            {isRegistered ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                  Registered
                </div>
                {webinar.videoUrl && (
                  <a 
                    href={webinar.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-lg shadow-white/10"
                  >
                    {webinar.type === "recorded" ? "Watch Recording" : "Join Webinar"}
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={registering}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
              >
                {registering ? "Processing..." : "Register for Session"}
              </button>
            )}
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}
