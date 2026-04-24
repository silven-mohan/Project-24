"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Rocket, Globe, MapPin, Trophy, Clock, Tag, Layout } from "lucide-react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import { createHackathon } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";
import "../hackathons.css";

type HackathonFormat = "Online" | "In-Person" | "Hybrid";

export default function OrganizeHackathonPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    prizePool: "",
    tags: "",
    hackathonLink: "",
  });

  const handleSubmit = async () => {
    if (!user) return;
    
    // Check if all fields are filled
    const requiredFields = ['title', 'description', 'category', 'duration', 'prizePool', 'tags', 'hackathonLink'];
    const isMissing = requiredFields.some(field => !formData[field as keyof typeof formData]);
    
    if (isMissing) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const hackathonData = {
        ...formData,
        format: "Online" as HackathonFormat,
        status: "Upcoming",
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        userId: user.uid,
      };
      await createHackathon(hackathonData);
      router.push("/hackathons");
    } catch (err) {
      console.error("Failed to create hackathon:", err);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="pt-32 pb-24 px-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl"
        >
          <BorderGlow
            edgeSensitivity={32}
            glowColor="190 80 65"
            backgroundColor="#0a0e1a"
            borderRadius={24}
            glowRadius={28}
            glowIntensity={0.65}
            coneSpread={24}
            animated={true}
            colors={["#22d3ee", "#67e8f9", "#06b6d4"]}
            className="w-full"
          >
            <div className="p-8 md:p-12">
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  <Plus className="h-8 w-8 text-cyan-400" />
                  Organize Hackathon
                </h1>
                <p className="text-white/45 text-lg mt-2">
                  Create an event and invite builders from across the globe.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Layout className="h-3 w-3" />
                    Hackathon Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Global AI Buildathon 2026"
                    className="hackathon-modal-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    Description
                  </label>
                  <textarea
                    required
                    placeholder="Briefly describe the theme, goals, and rules..."
                    className="hackathon-modal-input min-h-[150px] resize-none py-3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Hackathon Link */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    Hackathon Link (Website/Registration)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., https://devpost.com/..."
                    className="hackathon-modal-input"
                    value={formData.hackathonLink}
                    onChange={(e) => setFormData({ ...formData, hackathonLink: e.target.value })}
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Rocket className="h-3 w-3" />
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., AI/ML, Web3, FinTech"
                    className="hackathon-modal-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Duration
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 48 Hours, 1 Month"
                    className="hackathon-modal-input"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>

                {/* Prize Pool */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Trophy className="h-3 w-3" />
                    Prize Pool
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., $10,000, MacBooks"
                    className="hackathon-modal-input"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Beginners, Node.js, Python"
                    className="hackathon-modal-input"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-6 mt-16">
                <Link
                  href="/hackathons"
                  className="px-8 py-3 rounded-xl font-semibold text-white/40 hover:text-white transition-colors"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`hackathon-modal-submit px-10 py-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Creating..." : "Create Hackathon"}
                </button>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </StarfieldBackground>
  );
}
