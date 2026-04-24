"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Video, Clock, User, Tag, Layout } from "lucide-react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import { createWebinar } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";
import "../webinars.css";

type WebinarType = "recorded" | "live";

export default function HostWebinarPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeType, setActiveType] = useState<WebinarType>("live");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    speakerName: "",
    speakerRole: "",
    videoUrl: "",
    tags: "",
  });

  const typeConfig: Record<WebinarType, { icon: any; label: string }> = {
    recorded: { icon: Video, label: "Add Recorded" },
    live: { icon: Clock, label: "Host Live" },
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    // Check if all fields are filled
    const requiredFields = ['title', 'description', 'speakerName', 'videoUrl', 'tags'];
    const isMissing = requiredFields.some(field => !formData[field as keyof typeof formData]);
    
    if (isMissing) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const webinarData = {
        ...formData,
        type: activeType,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        userId: user.uid,
      };
      await createWebinar(webinarData);
      router.push("/webinars");
    } catch (err) {
      console.error("Failed to create webinar:", err);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="pt-32 pb-24 px-4 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl"
        >
          <BorderGlow
            edgeSensitivity={32}
            glowColor={activeType === "recorded" ? "160 80 65" : "340 80 65"}
            backgroundColor="#0a0e1a"
            borderRadius={24}
            glowRadius={28}
            glowIntensity={0.65}
            coneSpread={24}
            animated={true}
            colors={
              activeType === "recorded"
                ? ["#10b981", "#34d399", "#059669"]
                : ["#f43f5e", "#fb7185", "#e11d48"]
            }
            className="w-full"
          >
            <div className="p-8 md:p-12">
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  <Plus className="h-8 w-8 text-indigo-400" />
                  Host a Webinar
                </h1>
                <p className="text-white/45 text-lg mt-2">
                  Share your knowledge with the Project 24 community.
                </p>
              </div>

              {/* Type Switcher */}
              <div className="webinar-modal-tabs mb-10">
                {(Object.keys(typeConfig) as WebinarType[]).map((type) => {
                  const Icon = typeConfig[type].icon;
                  return (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`webinar-modal-tab ${activeType === type ? "active" : ""}`}
                      data-type={type === "recorded" ? "recorded" : "live"}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{typeConfig[type].label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Layout className="h-3 w-3" />
                    Webinar Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Mastering Next.js Performance"
                    className="webinar-modal-input"
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
                    placeholder="What should participants expect to learn?"
                    className="webinar-modal-input min-h-[150px] resize-none py-3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Speaker */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Speaker Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="webinar-modal-input"
                    value={formData.speakerName}
                    onChange={(e) => setFormData({ ...formData, speakerName: e.target.value })}
                  />
                </div>

                {/* URL */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Video className="h-3 w-3" />
                    {activeType === "recorded" ? "Video URL" : "YouTube Live Link"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={activeType === "recorded" ? "YouTube/Vimeo link" : "YouTube Live Stream link"}
                    className="webinar-modal-input"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., React, Performance, Scalability"
                    className="webinar-modal-input"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-6 mt-16">
                <Link
                  href="/webinars"
                  className="px-8 py-3 rounded-xl font-semibold text-white/40 hover:text-white transition-colors"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`webinar-modal-submit ${activeType === "recorded" ? "recorded" : "live"} px-10 py-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Processing..." : activeType === "recorded" ? "Add Webinar" : "Start Hosting"}
                </button>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </StarfieldBackground>
  );
}
