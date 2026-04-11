"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import { KineticCard, KineticPage } from "@/components/effects/KineticTransition";
import { ArrowLeft, Send, Search, MoreVertical, MessageSquare, Phone, Video } from "lucide-react";
import "./messaging.css";

// ─── Mock Data ───
const FRIENDS = [
  { id: 1, name: "Astrid", status: "online", lastMsg: "Hey, did you see the new puzzles?", color: "#3b82f6" },
  { id: 2, name: "Nova", status: "online", lastMsg: "Great work on the Sudoku logic!", color: "#ec4899" },
  { id: 3, name: "Cosmo", status: "offline", lastMsg: "Let me know when you're free to study.", color: "#10b981" },
  { id: 4, name: "Luna", status: "online", lastMsg: "Project-24 is looking amazing.", color: "#f59e0b" },
  { id: 5, name: "Sol", status: "offline", lastMsg: "Check out the new starfield drift.", color: "#8b5cf6" },
];

const MOCK_MESSAGES = [
  { id: 1, text: "Hey Silven! How's the Project-24 integration going?", sender: "Astrid", time: "10:30 AM" },
  { id: 2, text: "It's going great! Just added the messaging hub.", sender: "You", time: "10:32 AM" },
  { id: 3, text: "That's awesome. I love the Stealth aesthetic you're using.", sender: "Astrid", time: "10:33 AM" },
  { id: 4, text: "Thanks! I'm trying to keep it consistent across all pages.", sender: "You", time: "10:35 AM" },
];

export default function MessagingPage() {
  const [selectedFriend, setSelectedFriend] = useState<typeof FRIENDS[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredFriends = FRIENDS.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      <KineticPage pageKey="messaging" className="relative z-10 w-full px-6 py-8">
        
        {/* Header/Nav */}
        <nav className="flex items-center justify-between mb-8">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={16} /> Back to Profile
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold tracking-tight">Messaging Hub</h1>
            <span className="text-[10px] uppercase tracking-widest text-cyan-400/60 font-bold">Secure Synthesis</span>
          </div>
          <div className="w-[120px]" /> {/* Spacer for balance */}
        </nav>

        <div className="messaging-container">
          
          {/* Friends Sidebar */}
          <aside className="friends-pane">
            <div className="pane-header">
              <span className="text-xs font-bold uppercase tracking-widest text-white/30">Conversations</span>
              <button className="text-white/30 hover:text-white transition-colors">
                <Search size={18} />
              </button>
            </div>
            
            <div className="px-4 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                <input 
                  type="text" 
                  placeholder="Search friends..." 
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-cyan-500/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="friends-scroller">
              {filteredFriends.map((friend, idx) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`chat-thread-item ${selectedFriend?.id === friend.id ? 'chat-thread-item--active' : ''}`}
                  onClick={() => setSelectedFriend(friend)}
                >
                  <div className="thread-avatar">
                    <span className="text-sm font-bold opacity-60" style={{ color: friend.color }}>{friend.name[0]}</span>
                    <div className={`status-indicator ${friend.status === 'offline' ? 'status-indicator--offline' : ''}`} />
                  </div>
                  <div className="thread-info">
                    <span className="thread-name">{friend.name}</span>
                    <span className="thread-preview">{friend.lastMsg}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </aside>

          {/* Main Chat Area */}
          <main className="chat-pane">
            <AnimatePresence mode="wait">
              {selectedFriend ? (
                <motion.div 
                  key={selectedFriend.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col h-full"
                >
                  {/* Chat Header */}
                  <div className="chat-header">
                    <div className="thread-avatar">
                      <span className="text-sm font-bold opacity-60" style={{ color: selectedFriend.color }}>{selectedFriend.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-white block">{selectedFriend.name}</span>
                      <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest">{selectedFriend.status}</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/30">
                      <button className="hover:text-white transition-colors"><Phone size={18} /></button>
                      <button className="hover:text-white transition-colors"><Video size={18} /></button>
                      <button className="hover:text-white transition-colors"><MoreVertical size={18} /></button>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="chat-messages">
                    {MOCK_MESSAGES.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`message-bubble ${msg.sender === 'You' ? 'message-bubble--sent' : 'message-bubble--received'}`}
                      >
                        {msg.text}
                        <div className={`text-[9px] mt-1 opacity-40 text-right ${msg.sender === 'You' ? 'text-black' : 'text-white'}`}>
                          {msg.time}
                        </div>
                      </div>
                    ))}
                    <div className="message-bubble message-bubble--received italic opacity-50">
                      Mock conversation with {selectedFriend.name} initialized...
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="chat-input-area">
                    <input 
                      type="text" 
                      placeholder={`Message ${selectedFriend.name}...`}
                      className="chat-input"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && setNewMessage("")}
                    />
                    <button className="btn-send" onClick={() => setNewMessage("")}>
                      <Send size={18} className="-rotate-12" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="chat-empty-state">
                  <div className="chat-empty-icon">
                    <MessageSquare size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white/50">Your Conversations</h3>
                  <p className="max-w-[280px] text-sm text-white/20">
                    Select a friend from the left sidebar to start a new peer-to-peer synthesized session.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </main>

        </div>
      </KineticPage>
    </StarfieldBackground>
  );
}
