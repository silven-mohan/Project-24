"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StarfieldBackground from "@/components/background/StarfieldBackground";

interface Section {
  heading: string;
  body: string | string[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

export default function LegalPage({
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <StarfieldBackground className="relative min-h-screen w-full bg-[#06070f] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#06070f]/70 border-b border-white/5">
        <Link
          href="/main"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Legal nav links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-white/30">
          <Link href="/legal/privacy-policy" className="hover:text-cyan-400 transition-colors">
            Privacy
          </Link>
          <Link href="/legal/terms-of-use" className="hover:text-cyan-400 transition-colors">
            Terms
          </Link>
          <Link href="/legal/cookie-policy" className="hover:text-cyan-400 transition-colors">
            Cookies
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main id="legal-content" className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24">
        {/* Header */}
        <header className="mb-14">
          <p className="text-[10px] uppercase tracking-[0.5em] text-cyan-500 font-black mb-4">
            Legal · Project 24
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            {title}
          </h1>
          <p className="text-base text-white/50 leading-relaxed max-w-xl">{subtitle}</p>
          <p className="mt-4 text-xs text-white/25 uppercase tracking-widest">
            Last updated: {lastUpdated}
          </p>
          <div className="mt-8 h-px w-full bg-white/5" />
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i} aria-labelledby={`section-${i}`}>
              <h2
                id={`section-${i}`}
                className="text-lg font-bold text-white/90 mb-3 flex items-center gap-3"
              >
                <span className="text-xs text-cyan-500/60 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              {Array.isArray(section.body) ? (
                <ul className="space-y-2 text-white/55 text-sm leading-relaxed list-none">
                  {section.body.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-cyan-500/40 mt-1">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/55 text-sm leading-relaxed">{section.body}</p>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Project 24. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/legal/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </main>
    </StarfieldBackground>
  );
}
