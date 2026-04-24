"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import StarBorder from "@/components/effects/StarBorder";
import { Users, BookOpen, Code, Database, Globe, Clock, User, Plus } from "lucide-react";
import AnimatedList from "@/components/ui/AnimatedList";
import StudyGroupModal from "@/components/study-groups/StudyGroupModal";
import { useAuth } from "@backend/AuthProvider";
import { getStudyGroups, joinStudyGroup, checkIfInStudyGroup } from "@backend/db.js";
import "./study-groups.css";

interface StudyGroup {
  id: string;
  name: string;
  topic: string;
  goals: string;
  frequency: string;
  capacity: number;
  recruitmentType: string;
  status: "Active" | "Filling" | "Completed";
  members: number;
  tags: string[];
}

export default function StudyGroupsPage() {
  const { user, loading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [memberships, setMemberships] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        const data = await getStudyGroups();
        setStudyGroups(data as StudyGroup[]);

        if (user) {
          const memberStatus: Record<string, boolean> = {};
          await Promise.all(
            (data as StudyGroup[]).map(async (group) => {
              const isIn = await checkIfInStudyGroup(user.uid, group.id);
              memberStatus[group.id] = isIn;
            })
          );
          setMemberships(memberStatus);
        }
      } catch (err) {
        console.error("Failed to fetch study groups:", err);
      }
    };
    fetchStudyGroups();
  }, [user]);

  const handleJoin = async (groupId: string) => {
    if (!user) return;
    try {
      await joinStudyGroup(groupId, user.uid);
      setMemberships(prev => ({ ...prev, [groupId]: true }));
      setStudyGroups(prev => prev.map(g => g.id === groupId ? { ...g, members: g.members + 1 } : g));
    } catch (err) {
      console.error("Failed to join study group:", err);
    }
  };

  const getIcon = (topic: string) => {
    const t = topic.toLowerCase();
    if (t.includes("front") || t.includes("react")) return <Globe className="h-7 w-7" />;
    if (t.includes("dsa") || t.includes("algo") || t.includes("code")) return <Code className="h-7 w-7" />;
    if (t.includes("back") || t.includes("db") || t.includes("data")) return <Database className="h-7 w-7" />;
    return <BookOpen className="h-7 w-7" />;
  };

  const studyGroupCards = studyGroups.map((group) => (
    <div key={group.id} className="study-group-card-wrapper w-full">
      <BorderGlow
        edgeSensitivity={28}
        glowColor="270 80 65"
        backgroundColor="#0a0e1a"
        borderRadius={20}
        glowRadius={24}
        glowIntensity={0.6}
        coneSpread={22}
        animated={false}
        colors={["#a855f7", "#c084fc", "#9333ea"]}
        className="study-group-card-glow h-full"
      >
        <article className="study-group-card">
          <div className="study-group-card__info">
            <div className="flex items-center gap-3 mb-4">
              <div className="study-group-card__icon" style={{ "--icon-accent": "#a855f7" } as React.CSSProperties}>
                {getIcon(group.topic)}
              </div>
              <span className={`study-group-status-badge status-${group.status.toLowerCase()}`}>
                {group.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white/95 leading-snug mb-3">
              {group.name}
            </h3>
            <p className="text-base text-white/55 leading-relaxed flex-1">
              {group.goals}
            </p>
            <div className="study-group-meta">
              <span className="study-group-meta__item">
                <Clock className="h-3.5 w-3.5" />
                {group.frequency}
              </span>
              <span className="study-group-meta__item">
                <User className="h-3.5 w-3.5" />
                {group.members} / {group.capacity} Members
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-6 mb-4">
              {group.tags && group.tags.map(tag => (
                <span key={tag} className="study-group-tag">{tag}</span>
              ))}
            </div>
            <div className="flex justify-end mt-auto">
              <button
                onClick={() => handleJoin(group.id)}
                disabled={memberships[group.id] || group.members >= group.capacity}
                className={`study-group-btn m-0 ${memberships[group.id] ? "opacity-50 cursor-not-allowed" : "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"}`}
              >
                {memberships[group.id] ? "Joined" : group.members >= group.capacity ? "Full" : "Join"}
              </button>
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
              <StarBorder as="span" color="purple" speed="5s" thickness={1}>
                <span className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-purple-100 transition-colors duration-200 group-hover:text-white">
                  <Plus className="h-4 w-4" />
                  <span>Create Group</span>
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
        <div className="study-groups-hero-icon mb-6">
          <Users className="h-10 w-10 text-purple-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-purple-300 via-white to-pink-300 bg-clip-text text-transparent pb-2">
          Study Groups
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60 leading-relaxed">
          Learn by doing and teach to master. Join peer-led cohorts focused on collaboration, accountability, and social learning.
        </p>
      </header>

      {/* Cards stack */}
      <section className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 pb-24">
        {studyGroups.length > 0 ? (
          <AnimatedList
            items={studyGroupCards}
            displayScrollbar={false}
            showGradients={true}
          />
        ) : (
          <div className="text-center py-20 text-white/40">
            No study groups found. Create the first one!
          </div>
        )}
      </section>

      <StudyGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Refresh list
          getStudyGroups().then(data => setStudyGroups(data as StudyGroup[]));
        }}
      />
    </StarfieldBackground>
  );
}
