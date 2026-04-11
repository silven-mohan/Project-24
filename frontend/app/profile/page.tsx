"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import StarfieldBackground from "@/components/background/StarfieldBackground";
import { KineticCard, KineticPage } from "@/components/effects/KineticTransition";
import GlareHover from "@/components/ui/GlareHover";
import { 
  Users, Info, MessageSquare, Heart, Share2, ArrowLeft, 
  Settings, PlusCircle, UserCircle, Shield, Activity, LogOut,
  X, Trash2, Send
} from "lucide-react";
import "./profile.css";

// ─── Initial Data ───
const INITIAL_FRIENDS = [
  { id: 1, name: "Astrid", color: "#3b82f6" },
  { id: 2, name: "Nova", color: "#ec4899" },
  { id: 3, name: "Cosmo", color: "#10b981" },
  { id: 4, name: "Luna", color: "#f59e0b" },
  { id: 5, name: "Sol", color: "#8b5cf6" },
  { id: 6, name: "Orion", color: "#ef4444" },
];

const INITIAL_POSTS = [
  {
    id: 1,
    content: "Just finished the Mini Sudoku challenge! The logic puzzles on Project-24 are really helping me improve my algorithmic thinking. 🧩✨",
    date: "2 hours ago",
    likes: 24,
    comments: 5
  },
  {
    id: 2,
    content: "Exploring the starfield background logic today. The way the UI elements react to the average drift vector is fascinating. It's like the interface is actually part of the environment. 🌠",
    date: "5 hours ago",
    likes: 42,
    comments: 12
  },
  {
    id: 3,
    content: "Working on a new peer-to-peer study group for advanced Next.js patterns. Who's in? 📚🚀",
    date: "Yesterday",
    likes: 15,
    comments: 8
  }
];

export default function ProfilePage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [newPostModalOpen, setNewPostModalOpen] = React.useState(false);

  // Profile State
  const [username, setUsername] = React.useState("Silven Mohan");
  const [avatarInitial, setAvatarInitial] = React.useState("S");
  const [aboutMe, setAboutMe] = React.useState("Independent developer and educator focused on building high-performance, physics-driven web experiences. Passionate about procedural generation, cosmic aesthetics, and peer-to-peer learning.");
  const [posts, setPosts] = React.useState(INITIAL_POSTS);

  // Temporary Edit State
  const [tempUsername, setTempUsername] = React.useState(username);
  const [tempAbout, setTempAbout] = React.useState(aboutMe);
  const [newPostContent, setNewPostContent] = React.useState("");

  const handleSaveProfile = () => {
    setUsername(tempUsername);
    setAvatarInitial(tempUsername[0]?.toUpperCase() || "S");
    setAboutMe(tempAbout);
    setEditModalOpen(false);
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      content: newPostContent,
      date: "Just now",
      likes: 0,
      comments: 0
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostModalOpen(false);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const menuItems = [
    { label: "New Post", icon: <PlusCircle size={18} />, action: () => setNewPostModalOpen(true) },
    { label: "Edit Profile", icon: <UserCircle size={18} />, action: () => { setTempUsername(username); setTempAbout(aboutMe); setEditModalOpen(true); } },
    { label: "Share Profile", icon: <Share2 size={18} />, action: () => alert("Link copied to clipboard!") },
    { label: "Activity", icon: <Activity size={18} />, action: () => {} },
    { label: "Privacy Policies", icon: <Shield size={18} />, action: () => {} },
    { label: "Log out", icon: <LogOut size={18} />, action: () => window.location.href = "/", danger: true },
  ];

  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      <KineticPage pageKey="profile" className="relative z-10 w-full px-4 py-8">
        
        {/* Navigation */}
        <nav className="fixed top-6 left-6 z-50">
          <Link
            href="/main"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={16} /> Back to Arena
          </Link>
        </nav>

        {/* Settings & Messaging Menu */}
        <div className="settings-menu-container flex gap-3">
          <Link href="/profile/messaging" className="settings-btn">
            <Send size={20} />
          </Link>
          <div className="relative">
            <button 
              className="settings-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Settings size={22} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="dropdown-menu"
                >
                  {menuItems.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`dropdown-item ${item.danger ? 'dropdown-item--danger' : ''}`}
                      onClick={() => {
                        item.action();
                        setMenuOpen(false);
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="profile-container pt-16">
          
          {/* Header Section */}
          <header className="profile-header">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                <div className="w-full h-full rounded-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold">
                  {avatarInitial}
                </div>
              </div>
            </div>
            <h1 className="profile-username">{username}</h1>
            <p className="profile-handle">@{username.toLowerCase().replace(/\s+/g, '_')}</p>
          </header>

          <div className="profile-grid">
            
            {/* Sidebar: Friends & About */}
            <aside className="flex flex-col gap-8">
              
              {/* Friends Card */}
              <KineticCard index={1}>
                <div className="stealth-card h-full">
                  <h2 className="stealth-card__title">
                    <Users size={18} /> Friends
                  </h2>
                  <div className="friends-list">
                    {INITIAL_FRIENDS.map(friend => (
                      <div key={friend.id} className="friend-item">
                        <div className="friend-avatar" style={{ borderLeft: `2px solid ${friend.color}` }}>
                          <span className="text-sm font-bold opacity-60">{friend.name[0]}</span>
                        </div>
                        <span className="friend-name">{friend.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </KineticCard>

              {/* About Card */}
              <KineticCard index={2}>
                <div className="stealth-card h-full">
                  <h2 className="stealth-card__title">
                    <Info size={18} /> About Me
                  </h2>
                  <p className="about-text">
                    {aboutMe}
                  </p>
                </div>
              </KineticCard>

            </aside>

            {/* Main Area: Posts */}
            <main className="posts-feed">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 mb-2 ml-4">Latest Activity</h2>
              
              {posts.map((post, idx) => (
                <KineticCard key={post.id} index={idx + 3}>
                  <div className="stealth-card post-card h-full">
                    <div className="post-header">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold border border-white/10">{avatarInitial}</div>
                      <div className="post-meta">
                        <span className="post-author">{username}</span>
                        <span className="post-date">{post.date}</span>
                      </div>
                    </div>
                    <p className="post-content">{post.content}</p>
                    <div className="post-footer">
                      <button className="post-action">
                        <Heart size={16} /> {post.likes}
                      </button>
                      <button className="post-action">
                        <MessageSquare size={16} /> {post.comments}
                      </button>
                      <button className="post-action ml-auto">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </KineticCard>
              ))}
            </main>

          </div>
        </div>
      </KineticPage>

      {/* Modals */}
      <AnimatePresence>
        {editModalOpen && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setEditModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
            >
              <div className="modal-card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="modal-title mb-0">Edit Profile</h2>
                  <button onClick={() => setEditModalOpen(false)} className="text-white/40 hover:text-white">
                    <X size={24} />
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">About Me</label>
                  <textarea 
                    className="form-textarea" 
                    value={tempAbout}
                    onChange={(e) => setTempAbout(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Manage Posts ({posts.length})</label>
                  <div className="manage-posts-list">
                    {posts.map(post => (
                      <div key={post.id} className="manage-post-item">
                        <span className="manage-post-item__text">{post.content}</span>
                        <button 
                          className="btn-delete-post"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn-primary" onClick={handleSaveProfile}>Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}

        {newPostModalOpen && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setNewPostModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
            >
              <div className="modal-card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="modal-title mb-0">New Post</h2>
                  <button onClick={() => setNewPostModalOpen(false)} className="text-white/40 hover:text-white">
                    <X size={24} />
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label">What's on your mind?</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Share your thoughts or progress..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    autoFocus
                  />
                </div>

                <button className="btn-primary" onClick={handleCreatePost}>Post to Feed</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </StarfieldBackground>
  );
}
