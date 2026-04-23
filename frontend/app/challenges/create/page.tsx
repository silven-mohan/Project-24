"use client";

import type { ReactNode, FormEvent, ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import StarBorder from "@/components/effects/StarBorder";
import { createChallenge } from "@backend/db.js";
import { useAuth } from "@backend/AuthProvider";
import { 
  ChevronLeft, 
  Send, 
  Plus, 
  X,
  Swords,
  Palette,
  Brain,
  Timer,
  Sparkles,
  Users,
  Code2,
  Flame,
  Trophy
} from "lucide-react";
import "../challenges.css";

type IconOption = {
  name: string;
  icon: ReactNode;
};

import { ChevronDown } from "lucide-react";

type SelectOption = {
  value: string;
  label: string;
};

function CustomSelect({ 
  options, 
  value, 
  onChange, 
  label 
}: { 
  options: SelectOption[]; 
  value: string; 
  onChange: (val: string) => void;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-white/40">{label}</label>
      <div className="custom-select-container">
        <div 
          className="custom-select-trigger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption?.label || "Select..."}</span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="custom-options-list z-50">
              {options.map((opt) => (
                <div
                  key={opt.value}
                  className={`custom-option-item ${value === opt.value ? 'selected' : ''}`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const IconOptions: IconOption[] = [
  { name: "Swords", icon: <Swords className="h-5 w-5" /> },
  { name: "Palette", icon: <Palette className="h-5 w-5" /> },
  { name: "Brain", icon: <Brain className="h-5 w-5" /> },
  { name: "Timer", icon: <Timer className="h-5 w-5" /> },
  { name: "Sparkles", icon: <Sparkles className="h-5 w-5" /> },
  { name: "Users", icon: <Users className="h-5 w-5" /> },
  { name: "Code2", icon: <Code2 className="h-5 w-5" /> },
  { name: "Flame", icon: <Flame className="h-5 w-5" /> },
  { name: "Trophy", icon: <Trophy className="h-5 w-5" /> },
];

export default function CreateChallengePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "Lifetime",
    hackerRankLink: "",
    icon: "Zap",
    accentColor: "#00f2ff",
    glowColor: "180 100 50",
    difficulty: "All Levels",
    status: "Live"
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }

    if (!formData.hackerRankLink.toLowerCase().includes("hackerrank.com/challenges/")) {
      alert("Neural link rejected. Please provide a valid HackerRank challenge URL (hackerrank.com/challenges/...).");
      return;
    }
    
    setLoading(true);
    try {
      const challengeData = {
        ...formData,
        tags,
        creator_id: user.uid,
        gradientColors: [formData.accentColor, formData.accentColor + "cc", formData.accentColor + "99"]
      };
      await createChallenge(challengeData);
      router.push("/challenges");
    } catch (err) {
      console.error("Error creating challenge:", err);
      alert("Failed to create challenge. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t: string) => t !== tagToRemove));
  };

  return (
    <StarfieldBackground className="relative min-h-screen w-full overflow-hidden bg-[#06070f] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/60 border-b border-white/5">
        <Link
          href="/challenges"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Challenges
        </Link>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto pt-32 pb-24 px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Plus className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
              Create New Challenge
            </h1>
            <p className="text-white/40 text-sm">Design a quest for the community to conquer.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Info Section */}
          <div className="p-6 rounded-2xl bg-white/2 border border-white/5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-white/40">Challenge Title*</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 7-Day DSA Sprint"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                  value={formData.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-white/40">Category*</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Competition, Learning"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                  value={formData.category}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-white/40">Description*</label>
              <textarea
                required
                rows={4}
                placeholder="Describe the challenge goals and requirements..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                value={formData.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomSelect 
                label="Duration*"
                value={formData.duration}
                onChange={(val) => setFormData({ ...formData, duration: val })}
                options={[
                  { value: "Lifetime", label: "Lifetime" },
                  { value: "1 Week", label: "1 Week" },
                  { value: "1 Day", label: "1 Day" }
                ]}
              />
              <CustomSelect 
                label="Difficulty*"
                value={formData.difficulty}
                onChange={(val) => setFormData({ ...formData, difficulty: val as any })}
                options={[
                  { value: "All Levels", label: "All Levels" },
                  { value: "Beginner", label: "Beginner" },
                  { value: "Intermediate", label: "Intermediate" },
                  { value: "Advanced", label: "Advanced" }
                ]}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-white/40">HackerRank Challenge Link*</label>
              <input
                required
                type="url"
                placeholder="https://hackerrank.com/challenges/..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                value={formData.hackerRankLink}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hackerRankLink: e.target.value })}
              />
            </div>
          </div>

          {/* Aesthetics Section */}
          <div className="p-6 rounded-2xl bg-white/2 border border-white/5 space-y-6">
            <h2 className="text-sm font-semibold text-white/70 flex items-center gap-2">
              <Palette className="h-4 w-4" /> Aesthetics & Branding
            </h2>
            
            <div className="space-y-4">
              <label className="text-xs font-medium uppercase tracking-wider text-white/40">Select Icon</label>
              <div className="grid grid-cols-5 md:grid-cols-9 gap-3">
                {IconOptions.map((opt: IconOption) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: opt.name })}
                    className={`flex items-center justify-center p-3 rounded-xl border transition-all ${
                      formData.icon === opt.name 
                        ? "bg-purple-500/20 border-purple-500/50 text-white" 
                        : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    {opt.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-white/40">Accent Color</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    className="h-10 w-10 rounded-lg bg-transparent border-none cursor-pointer"
                    value={formData.accentColor}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, accentColor: e.target.value })}
                  />
                  <input
                    type="text"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none"
                    value={formData.accentColor}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, accentColor: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-white/40">Glow Hue (HSL: H S L)</label>
                <input
                  type="text"
                  placeholder="180 100 50"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                  value={formData.glowColor}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, glowColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-white/40">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                  value={tagInput}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                  onKeyDown={(e: KeyboardEvent) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3 hover:text-white" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full group"
            >
              <StarBorder as="div" color="purple" speed="3s" thickness={2}>
                <span className="flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all duration-300 group-hover:tracking-widest">
                  {loading ? "INITIALIZING NEURAL NET..." : "DEPLOY CHALLENGE"}
                  {!loading && <Send className="h-5 w-5" />}
                </span>
              </StarBorder>
            </button>
          </div>
        </form>
      </div>
    </StarfieldBackground>
  );
}
