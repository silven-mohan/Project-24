"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useAuth } from "@backend/AuthProvider";
import Link from "next/link";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, userData, loading } = useAuth();
  const showSidebar = pathname === "/main";

  useEffect(() => {
    if (!showSidebar) {
      document.documentElement.style.setProperty("--sidebar-width", "0px");
    } else {
      document.documentElement.style.removeProperty("--sidebar-width");
    }
    return () => {
      document.documentElement.style.removeProperty("--sidebar-width");
    };
  }, [showSidebar]);

  if (!showSidebar) {
    return <main className="relative w-full min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Mobile Profile Icon */}
      <Link 
        href="/profile"
        className="fixed top-6 left-6 z-[200] md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-black/40 backdrop-blur-xl transition-all active:scale-90 overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2)] group"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 to-blue-500/10 opacity-0 group-active:opacity-100 transition-opacity" />
        
        {loading ? (
          <div className="h-5 w-5 animate-pulse rounded-full bg-cyan-500/20" />
        ) : userData?.profile_picture ? (
          <img src={userData.profile_picture} alt="Profile" className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm font-bold text-cyan-200 uppercase tracking-tighter">
            {userData?.username ? userData.username[0] : (user?.email ? user.email[0] : "P")}
          </span>
        )}
        
        {user && !loading && (
          <div className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-[#06070f] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        )}
      </Link>

      <Sidebar hideTopOffset />
      <main className="app-main flex-1 w-full relative">{children}</main>
    </div>
  );
}
