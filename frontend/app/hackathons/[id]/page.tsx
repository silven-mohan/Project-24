"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Timer, 
  Users, 
  Trophy, 
  Rocket, 
  Cpu, 
  Globe, 
  Leaf, 
  GraduationCap, 
  HeartPulse, 
  CodeSquare, 
  Shield, 
  Coins,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import { getHackathonById, registerForHackathon, checkIfRegisteredForHackathon } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";
import "../hackathons.css";

export default function HackathonDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHackathonById(id as string);
        if (!data) {
          router.push("/hackathons");
          return;
        }
        setHackathon(data);
        
        if (user) {
          // Fix: Passing user.uid as first argument to match db.js signature
          const registered = await checkIfRegisteredForHackathon(user.uid, id as string);
          setIsRegistered(registered);
        }
      } catch (err) {
        console.error("Failed to load hackathon:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, user, router]);

  const handleRegister = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }
    setRegistering(true);
    try {
      await registerForHackathon(id as string, user.uid);
      setIsRegistered(true);
      setHackathon((prev: any) => ({ ...prev, participants: prev.participants + 1 }));
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setRegistering(false);
    }
  };

  const getIcon = (category: string) => {
    const cat = category?.toLowerCase() || "";
    if (cat.includes("ai") || cat.includes("ml")) return <Cpu className="h-10 w-10" />;
    if (cat.includes("blockchain") || cat.includes("web3")) return <Globe className="h-10 w-10" />;
    if (cat.includes("climate") || cat.includes("green")) return <Leaf className="h-10 w-10" />;
    if (cat.includes("education")) return <GraduationCap className="h-10 w-10" />;
    if (cat.includes("health")) return <HeartPulse className="h-10 w-10" />;
    if (cat.includes("open source")) return <CodeSquare className="h-10 w-10" />;
    if (cat.includes("security")) return <Shield className="h-10 w-10" />;
    if (cat.includes("finance") || cat.includes("fintech")) return <Coins className="h-10 w-10" />;
    return <Rocket className="h-10 w-10" />;
  };

  const getThemeColors = (category: string) => {
    const cat = category?.toLowerCase() || "";
    if (cat.includes("ai")) return ["#f97316", "#fb923c", "#ea580c"];
    if (cat.includes("blockchain")) return ["#a855f7", "#c084fc", "#7c3aed"];
    if (cat.includes("climate")) return ["#10b981", "#34d399", "#059669"];
    if (cat.includes("education")) return ["#3b82f6", "#60a5fa", "#2563eb"];
    if (cat.includes("health")) return ["#ec4899", "#f472b6", "#db2777"];
    return ["#22d3ee", "#67e8f9", "#06b6d4"];
  };

  if (loading) {
    return (
      <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </StarfieldBackground>
    );
  }

  const colors = getThemeColors(hackathon.category);
  const accentColor = colors[0];

  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/60 border-b border-white/5">
        <Link
          href="/hackathons"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Hackathons
        </Link>
      </nav>

      <div className="pt-32 pb-24 px-4 max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header Box */}
        <BorderGlow
          edgeSensitivity={32}
          glowColor="190 80 65"
          backgroundColor="#0a0e1a"
          borderRadius={24}
          glowRadius={28}
          glowIntensity={0.6}
          colors={colors as [string, string, string]}
        >
          <div className="p-8 flex flex-col items-center text-center gap-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center border border-white/10"
              style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)` }}
            >
              <div style={{ color: accentColor }}>{getIcon(hackathon.category)}</div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2 block">
                {hackathon.category} • {hackathon.format}
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">
                {hackathon.title}
              </h1>
            </div>
          </div>
        </BorderGlow>

        {/* Stats Box */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center text-center gap-1">
            <Timer className="h-5 w-5 text-cyan-400 mb-1" />
            <p className="text-[9px] uppercase tracking-widest text-white/40">Duration</p>
            <p className="text-sm font-bold">{hackathon.duration}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center text-center gap-1">
            <Users className="h-5 w-5 text-cyan-400 mb-1" />
            <p className="text-[9px] uppercase tracking-widest text-white/40">Registered</p>
            <p className="text-sm font-bold">{hackathon.participants}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center text-center gap-1">
            <Trophy className="h-5 w-5 text-amber-400 mb-1" />
            <p className="text-[9px] uppercase tracking-widest text-white/40">Prize Pool</p>
            <p className="text-sm font-bold text-amber-400">{hackathon.prizePool}</p>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Rocket className="h-5 w-5 text-cyan-400" />
            About this Hackathon
          </h2>
          <p className="text-white/50 leading-relaxed whitespace-pre-wrap">
            {hackathon.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {hackathon.tags?.map((tag: string) => (
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
                  Successfully Registered
                </div>
                {hackathon.hackathonLink && (
                  <a 
                    href={hackathon.hackathonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-lg shadow-white/10"
                  >
                    Visit Official Website
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={registering}
                className="w-full py-4 px-6 rounded-2xl bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                {registering ? "Processing..." : "Register for Hackathon"}
              </button>
            )}
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}
