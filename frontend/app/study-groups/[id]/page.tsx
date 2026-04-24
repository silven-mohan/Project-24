"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Clock, MessageSquare, ExternalLink, Shield, BookOpen, Tag } from "lucide-react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import BorderGlow from "@/components/effects/BorderGlow";
import StarBorder from "@/components/effects/StarBorder";
import { useAuth } from "@backend/AuthProvider";
import { getStudyGroups, checkIfInStudyGroup } from "@backend/db.js";
import "../study-groups.css";

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
  groupLink?: string;
}

export default function StudyGroupDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groups = await getStudyGroups();
        const found = groups.find((g: any) => g.id === id);
        if (found) {
          setGroup(found as StudyGroup);
          if (user) {
            const member = await checkIfInStudyGroup(user.uid, id as string);
            setIsMember(member);
          }
        }
      } catch (err) {
        console.error("Failed to fetch group:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroup();
  }, [id, user]);

  if (loading) {
    return (
      <StarfieldBackground className="min-h-screen bg-[#06070f] flex items-center justify-center">
        <div className="text-white/40 animate-pulse">Loading study group...</div>
      </StarfieldBackground>
    );
  }

  if (!group) {
    return (
      <StarfieldBackground className="min-h-screen bg-[#06070f] flex flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold text-white/60">Group Not Found</div>
        <Link href="/study-groups" className="text-purple-400 hover:underline">Return to Study Groups</Link>
      </StarfieldBackground>
    );
  }

  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/60 border-b border-white/5">
        <Link
          href="/study-groups"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </Link>
      </nav>

      <div className="pt-32 pb-24 px-4 flex justify-center">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
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
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`study-group-status-badge status-${group.status.toLowerCase()}`}>
                    {group.status}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/40 uppercase tracking-widest font-bold">
                    <Shield className="h-3 w-3" />
                    {group.recruitmentType}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">{group.name}</h1>
                <p className="text-lg text-white/60 leading-relaxed mb-8">{group.goals}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Topic</span>
                    <span className="text-sm font-semibold text-white/90">{group.topic}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Frequency</span>
                    <span className="text-sm font-semibold text-white/90">{group.frequency}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Members</span>
                    <span className="text-sm font-semibold text-white/90">{group.members} / {group.capacity}</span>
                  </div>
                </div>

                <div className="mt-8">
                   <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Tags</h3>
                   <div className="flex flex-wrap gap-2">
                     {group.tags && group.tags.map(tag => (
                       <span key={tag} className="study-group-tag py-1.5 px-4 text-xs">{tag}</span>
                     ))}
                   </div>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Sidebar / Join Card */}
          <div className="flex flex-col gap-6">
            <BorderGlow
              edgeSensitivity={32}
              glowColor="270 80 65"
              backgroundColor="#0a0e1a"
              borderRadius={24}
              glowRadius={24}
              glowIntensity={0.5}
              className="w-full"
            >
              <div className="p-8">
                <h2 className="text-xl font-bold text-white mb-6">Group Access</h2>
                
                {isMember ? (
                  <div className="flex flex-col gap-6">
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                      <p className="text-sm text-purple-200 font-medium">You are a member of this group!</p>
                    </div>

                    {group.groupLink ? (
                      <div className="flex flex-col gap-4">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Community Link</p>
                        <a 
                          href={group.groupLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative"
                        >
                          <StarBorder as="div" color="purple" speed="5s" thickness={1.5}>
                            <div className="flex items-center justify-center gap-2 py-4 px-6 text-white font-bold bg-purple-500/20 hover:bg-purple-500/30 transition-colors">
                              <MessageSquare className="h-5 w-5" />
                              <span>Join Community</span>
                              <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </StarBorder>
                        </a>
                        <p className="text-[10px] text-center text-white/30 italic">Click to join Discord/WhatsApp</p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                        <p className="text-xs text-white/40">No external link provided for this group yet.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <p className="text-sm text-white/50 leading-relaxed">
                      You must be a member to access the community links and resources.
                    </p>
                    <Link href="/study-groups" className="text-center">
                       <button className="w-full py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all">
                         Go to Join
                       </button>
                    </Link>
                  </div>
                )}
              </div>
            </BorderGlow>
            
            {/* Quick Tips */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
               <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <BookOpen className="h-3 w-3" />
                 Study Tip
               </h3>
               <p className="text-xs text-white/60 leading-relaxed italic">
                 "Consistency is key. Meeting even once a week can significantly boost your learning retention."
               </p>
            </div>
          </div>

        </div>
      </div>
    </StarfieldBackground>
  );
}
