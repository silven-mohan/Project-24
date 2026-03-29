"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import GhostCursor from "@/components/GhostCursor";

export default function Home() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [buttonFalling, setButtonFalling] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [ultraZoom, setUltraZoom] = useState(false);

  const clearAnimationHandles = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
      navTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      clearAnimationHandles();
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const runSequence = () => {
    if (sequenceStarted || !rootRef.current) return;

    const root = rootRef.current;
    const rect = root.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width * 0.5,
      y: rect.top + rect.height * 0.5,
    };
    const pad = 36;

    const starts = [
      { x: rect.left + pad, y: rect.top + pad },
      { x: rect.right - pad, y: rect.top + pad },
      { x: rect.left + pad, y: rect.bottom - pad },
      { x: rect.right - pad, y: rect.bottom - pad },
    ];

    const controls = [
      { x: rect.left + rect.width * 0.18, y: rect.top + rect.height * 0.6 },
      { x: rect.left + rect.width * 0.84, y: rect.top + rect.height * 0.36 },
      { x: rect.left + rect.width * 0.24, y: rect.top + rect.height * 0.72 },
      { x: rect.left + rect.width * 0.78, y: rect.top + rect.height * 0.8 },
    ];

    const BUTTON_FALL_MS = 600;
    const PATH_MS = 980;
    const PATH_GAP_MS = 120;
    const CENTER_HOLD_MS = 500;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const bezier = (p0: number, p1: number, p2: number, t: number) =>
      (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;

    const dispatchPointerMove = (x: number, y: number) => {
      root.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          cancelable: false,
          clientX: x,
          clientY: y,
          pointerType: "mouse",
          isPrimary: true,
        })
      );
    };

    setSequenceStarted(true);
    setButtonFalling(true);

    const t0 = performance.now() + BUTTON_FALL_MS * 0.45;
    dispatchPointerMove(starts[0].x, starts[0].y);

    const animate = (now: number) => {
      const elapsed = now - t0;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const step = PATH_MS + PATH_GAP_MS;
      const stage = Math.floor(elapsed / step);
      if (stage < starts.length) {
        const stageStart = stage * step;
        const localElapsed = elapsed - stageStart;
        const t = Math.min(1, localElapsed / PATH_MS);
        const et = easeOut(Math.max(0, t));
        const x = bezier(starts[stage].x, controls[stage].x, center.x, et);
        const y = bezier(starts[stage].y, controls[stage].y, center.y, et);

        // After the first movement reaches center, keep reinforcing a center pointer.
        if (stage >= 1) {
          dispatchPointerMove(center.x, center.y);
        }

        dispatchPointerMove(x, y);

        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const holdElapsed = elapsed - step * starts.length;
      dispatchPointerMove(center.x, center.y);

      if (holdElapsed < CENTER_HOLD_MS) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      setZooming(true);
      setUltraZoom(true);
      navTimeoutRef.current = setTimeout(() => {
        router.push("/main");
      }, 950);
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  return (
    <div
      ref={rootRef}
      className={`hero-root ${zooming ? "hero-root--zoom" : ""} ${ultraZoom ? "hero-root--ultra" : ""}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <GhostCursor
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
        trailLength={55}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={1}
        bloomRadius={1}
        brightness={2}
        color="#B19EEF"
        edgeIntensity={0}
        targetPixels={1300000}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />

      <div className="title-layer" aria-hidden="true">
        <h3 className="project-title">Project-24</h3>
      </div>

      <main className="relative z-10 flex h-full w-full items-end justify-center p-8 pb-20">
        <button
          type="button"
          onClick={runSequence}
          disabled={sequenceStarted}
          className={`rounded-xl border border-zinc-100/60 bg-zinc-500/35 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-xl transition-colors duration-300 hover:bg-zinc-400/45 ${buttonFalling ? "cta-fall" : ""}`}
        >
          Get Started
        </button>
      </main>

      <style jsx>{`
        .hero-root {
          transform-origin: center center;
          transition: transform 900ms cubic-bezier(0.2, 0.8, 0.12, 1), filter 900ms ease,
            opacity 900ms ease;
        }

        .hero-root::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at center, rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 0.5) 100%);
          opacity: 0.55;
          transition: opacity 900ms ease;
          z-index: 11;
        }

        .hero-root--zoom {
          transform: translate3d(0, 0, 0) scale(1.5);
          filter: blur(1.5px) saturate(1.12);
          opacity: 0.92;
        }

        .hero-root--ultra {
          transform: translate3d(0, 0, 0) scale(1.9);
          filter: blur(2.2px) saturate(1.2);
          opacity: 0.9;
        }

        .hero-root--zoom::after {
          opacity: 0.9;
        }

        .title-layer {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .project-title {
          color: #000;
          font-size: clamp(2.5rem, 8vw, 6.5rem);
          letter-spacing: 0.08em;
          font-weight: 800;
          line-height: 1;
          text-transform: uppercase;
        }

        .cta-fall {
          animation: ctaDrop 620ms cubic-bezier(0.24, 0.87, 0.34, 1) forwards;
          pointer-events: none;
        }

        @keyframes ctaDrop {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(180px) rotate(7deg);
            opacity: 0;
          }
        }

      `}</style>
    </div>
  );
}
