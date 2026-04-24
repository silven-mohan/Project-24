"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Users, BookOpen, MessageSquare, Settings, Shield, Clock, Hash } from "lucide-react";
import BorderGlow from "@/components/effects/BorderGlow";
import { createStudyGroup } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";

interface StudyGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type TabType = "general" | "privacy";

export default function StudyGroupModal({ isOpen, onClose, onSuccess }: StudyGroupModalProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    goals: "",
    frequency: "Weekly",
    capacity: 10,
    recruitmentType: "Open Enrollment",
  });

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const groupData = {
        ...formData,
        status: "Filling",
        tags: formData.topic.split(",").map(t => t.trim()).filter(Boolean),
        userId: user.uid,
      };
      await createStudyGroup(groupData);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Failed to create study group:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="webinar-modal-overlay">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="webinar-modal-container"
          style={{ maxWidth: "600px" }}
        >
          <BorderGlow
            edgeSensitivity={32}
            glowColor="270 80 65"
            backgroundColor="#0a0e1a"
            borderRadius={24}
            glowRadius={28}
            glowIntensity={0.65}
            coneSpread={24}
            animated={true}
            colors={["#a855f7", "#c084fc", "#9333ea"]}
            className="w-full h-full"
          >
            <div className="webinar-modal-content">
              {/* Header */}
              <div className="webinar-modal-header">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="h-6 w-6 text-purple-400" />
                    Initialize Study Cohort
                  </h2>
                  <p className="text-white/45 text-sm mt-1">Found a new circle and learn together.</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="webinar-modal-tabs mb-6">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`webinar-modal-tab ${activeTab === "general" ? "active" : ""}`}
                  data-type="scheduled" /* Use scheduled styling for purple */
                >
                  <BookOpen className="h-4 w-4" />
                  <span>General Info</span>
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`webinar-modal-tab ${activeTab === "privacy" ? "active" : ""}`}
                  data-type="scheduled"
                >
                  <Shield className="h-4 w-4" />
                  <span>Privacy & Limit</span>
                </button>
              </div>

              {/* Form Area */}
              <div className="webinar-modal-form">
                {activeTab === "general" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Hash className="h-3 w-3" />
                        Group Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., The React 19 Guild"
                        className="webinar-modal-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Topic */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" />
                        Primary Topic
                      </label>
                      <input
                        type="text"
                        placeholder="What will you be studying?"
                        className="webinar-modal-input"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      />
                    </div>

                    {/* Goals */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Settings className="h-3 w-3" />
                        Study Goals
                      </label>
                      <textarea
                        placeholder="What are the key learning outcomes for this group?"
                        className="webinar-modal-input min-h-[100px] resize-none py-3"
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Frequency */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Meeting Frequency
                      </label>
                      <select
                        className="webinar-modal-input appearance-none bg-[#0d121e]"
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Bi-Weekly</option>
                        <option>Weekends only</option>
                      </select>
                    </div>

                    {/* Member Limit */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        Member Capacity
                      </label>
                      <input
                        type="number"
                        placeholder="Max 50"
                        className="webinar-modal-input"
                        min="2"
                        max="50"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 2 })}
                      />
                    </div>

                    {/* Visibility */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Shield className="h-3 w-3" />
                        Recruitment Type
                      </label>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setFormData({ ...formData, recruitmentType: "Open Enrollment" })}
                          className={`flex-1 p-4 rounded-xl border ${formData.recruitmentType === "Open Enrollment" ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5"} text-left hover:border-purple-500/30 transition-all`}
                        >
                          <span className="block text-sm font-semibold text-white">Open Enrollment</span>
                          <span className="block text-xs text-white/40">Anyone can join immediately.</span>
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, recruitmentType: "Invite Only" })}
                          className={`flex-1 p-4 rounded-xl border ${formData.recruitmentType === "Invite Only" ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5"} text-left hover:border-purple-500/30 transition-all`}
                        >
                          <span className="block text-sm font-semibold text-white">Invite Only</span>
                          <span className="block text-xs text-white/40">Applications must be approved.</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-4 mt-10">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl font-semibold text-white/40 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={activeTab === "general" ? () => setActiveTab("privacy") : handleSubmit}
                    disabled={loading}
                    className={`webinar-modal-submit scheduled ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ background: "#a855f7", color: "white" }}
                  >
                    {loading ? "Initializing..." : activeTab === "general" ? "Next Step" : "Create Cohort"}
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
