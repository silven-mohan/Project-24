"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Rocket, Globe, MapPin, Trophy, Clock, Tag, Layout } from "lucide-react";
import BorderGlow from "@/components/effects/BorderGlow";
import { createHackathon } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";

interface HackathonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type HackathonFormat = "Online" | "In-Person" | "Hybrid";

export default function HackathonModal({ isOpen, onClose, onSuccess }: HackathonModalProps) {
  const { user } = useAuth();
  const [activeFormat, setActiveFormat] = useState<HackathonFormat>("Online");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    prizePool: "",
    tags: "",
  });

  const formatConfig: Record<HackathonFormat, { icon: any; label: string }> = {
    Online: { icon: Globe, label: "Online" },
    Hybrid: { icon: Rocket, label: "Hybrid" },
    "In-Person": { icon: MapPin, label: "In-Person" },
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const hackathonData = {
        ...formData,
        format: activeFormat,
        status: "Upcoming",
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        userId: user.uid,
      };
      await createHackathon(hackathonData);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Failed to create hackathon:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="hackathon-modal-overlay">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="hackathon-modal-container"
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
            className="w-full h-full"
          >
            <div className="hackathon-modal-content">
              {/* Header */}
              <div className="hackathon-modal-header">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Plus className="h-6 w-6 text-cyan-400" />
                    Organize Hackathon
                  </h2>
                  <p className="text-white/45 text-sm mt-1">Create an event and invite builders from across the globe.</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Format Switcher */}
              <div className="hackathon-modal-tabs">
                {(Object.keys(formatConfig) as HackathonFormat[]).map((format) => {
                  const Icon = formatConfig[format].icon;
                  return (
                    <button
                      key={format}
                      onClick={() => setActiveFormat(format)}
                      className={`hackathon-modal-tab ${activeFormat === format ? "active" : ""}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{formatConfig[format].label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Area */}
              <div className="hackathon-modal-form mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                      <Layout className="h-3 w-3" />
                      Hackathon Title
                    </label>
                    <input
                      type="text"
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
                      placeholder="Describe the goals, rules, and tracks of the hackathon."
                      className="hackathon-modal-input min-h-[100px] resize-none py-3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                      placeholder="e.g., 48 Hours, 1 Week"
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
                      placeholder="e.g., $10,000"
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
                      placeholder="e.g., React, Python, AWS"
                      className="hackathon-modal-input"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-4 mt-10">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl font-semibold text-white/40 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`hackathon-modal-submit ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Creating..." : "Create Hackathon"}
                  </button>
                </div>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
