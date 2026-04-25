"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useAuth } from "@backend/AuthProvider";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, userData, loading } = useAuth();
  const showSidebar = pathname === "/main";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!showSidebar) {
      document.documentElement.style.setProperty("--sidebar-width", "0px");
    } else {
      document.documentElement.style.removeProperty("--sidebar-width");
    }
    
    // Close mobile menu on route change
    setMobileMenuOpen(false);

    return () => {
      document.documentElement.style.removeProperty("--sidebar-width");
    };
  }, [showSidebar, pathname]);

  if (!showSidebar) {
    return <main className="relative w-full min-h-screen overflow-x-hidden">{children}</main>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">

      {/* Mobile Profile Icon - Right Side */}
      {!mobileMenuOpen && (
        <div className="fixed top-6 right-6 z-250 md:hidden">
          <Link 
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            {loading ? (
              <div className="h-4 w-4 animate-pulse rounded-full bg-cyan-500/20" />
            ) : userData?.profile_picture ? (
              <img src={userData.profile_picture} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-cyan-200">
                {userData?.username ? userData.username[0] : (user?.email ? user.email[0] : "P")}
              </span>
            )}
          </Link>
        </div>
      )}

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-240 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar hideTopOffset mobileOpen={mobileMenuOpen} />
      <main className="app-main flex-1 w-full relative">
        {children}
      </main>
    </div>
  );
}
