"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Users, BookOpen, MessageSquare, Settings, Shield, Clock, Hash } from "lucide-react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import { createStudyGroup } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";
import "../study-groups.css";

type TabType = "general" | "privacy";

export default function CreateStudyGroupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    topic: "",
    goals: "",
    frequency: "Weekly",
    capacity: 10,
    recruitmentType: "Open Enrollment",
    groupLink: "",
  });

  const handleSubmit = async () => {
    if (!user) return;
    
    // Check if all fields are filled
    const requiredFields = ['name', 'topic', 'goals', 'frequency', 'groupLink'];
    const isMissing = requiredFields.some(field => !formData[field as keyof typeof formData]);
    
    if (isMissing) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const groupData = {
        ...formData,
        status: "Filling",
        tags: formData.topic.split(",").map(t => t.trim()).filter(Boolean),
        userId: user.uid,
      };
      await createStudyGroup(groupData);
      router.push("/study-groups");
    } catch (err) {
      console.error("Failed to create study group:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/60 border-b border-white/5">
        <Link
          href="/study-groups"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Study Groups
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
            glowColor="270 80 65"
            backgroundColor="#0a0e1a"
            borderRadius={24}
            glowRadius={28}
            glowIntensity={0.65}
            coneSpread={24}
            animated={true}
            colors={["#a855f7", "#c084fc", "#9333ea"]}
            className="w-full"
          >
            <div className="p-8 md:p-12">
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  <Users className="h-8 w-8 text-purple-400" />
                  Initialize Study Cohort
                </h1>
                <p className="text-white/45 text-lg mt-2">
                  Found a new circle and learn together.
                </p>
              </div>

              {/* Tabs */}
              <div className="webinar-modal-tabs mb-10">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`webinar-modal-tab ${activeTab === "general" ? "active" : ""}`}
                  data-type="scheduled"
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

              <div className="min-h-[400px]">
                {activeTab === "general" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Name */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Hash className="h-3 w-3" />
                        Group Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Quantum Physics deep dive"
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
                        required
                        placeholder="e.g., Physics, AI, History"
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
                        required
                        placeholder="What are the group's objectives?"
                        className="webinar-modal-input min-h-[120px] resize-none py-3"
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Frequency */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Meeting Frequency
                      </label>
                      <select
                        required
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
                        required
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
                      <div className="flex gap-6">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, recruitmentType: "Open Enrollment" })}
                          className={`flex-1 p-6 rounded-2xl border ${formData.recruitmentType === "Open Enrollment" ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5"} text-left hover:border-purple-500/30 transition-all`}
                        >
                          <span className="block text-base font-semibold text-white">Open Enrollment</span>
                          <span className="block text-sm text-white/40 mt-1">Anyone can join immediately.</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, recruitmentType: "Invite Only" })}
                          className={`flex-1 p-6 rounded-2xl border ${formData.recruitmentType === "Invite Only" ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5"} text-left hover:border-purple-500/30 transition-all`}
                        >
                          <span className="block text-base font-semibold text-white">Invite Only</span>
                          <span className="block text-sm text-white/40 mt-1">Applications must be approved.</span>
                        </button>
                      </div>
                    </div>

                    {/* Group Link */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" />
                        Group Link (Discord/WhatsApp)
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="e.g., https://discord.gg/..."
                        className="webinar-modal-input"
                        value={formData.groupLink}
                        onChange={(e) => setFormData({ ...formData, groupLink: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-6 mt-16">
                <Link
                  href="/study-groups"
                  className="px-8 py-3 rounded-xl font-semibold text-white/40 hover:text-white transition-colors"
                >
                  Cancel
                </Link>
                <button
                  onClick={activeTab === "general" ? () => setActiveTab("privacy") : handleSubmit}
                  disabled={loading}
                  className={`webinar-modal-submit scheduled px-10 py-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={{ background: "#a855f7", color: "white" }}
                >
                  {loading ? "Initializing..." : activeTab === "general" ? "Next Step" : "Create Cohort"}
                </button>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </StarfieldBackground>
  );
}
