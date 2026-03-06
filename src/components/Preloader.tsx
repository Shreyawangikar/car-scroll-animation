"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    tl.to(".preloader-progress", {
      scaleX: 1,
      duration: 2,
      ease: "power2.inOut",
    })
      .to(
        ".preloader-count",
        {
          innerText: 100,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.inOut",
        },
        0
      )
      .to(".preloader-brand", {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
      .to(".preloader-overlay", {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      })
      .set(".preloader-wrapper", { display: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className={`preloader-wrapper fixed inset-0 z-[100] ${
        !isLoading ? "pointer-events-none" : ""
      }`}
    >
      <div className="preloader-overlay absolute inset-0 bg-[#060610] flex flex-col items-center justify-center">
        <div className="preloader-brand flex flex-col items-center gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
            <span className="text-[#e8d5a3] text-sm tracking-[0.5em] uppercase font-light">
              ITZFIZZ
            </span>
            <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
          </div>

          {/* Preparing the stage */}
          <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase">
            Preparing the stage
          </span>

          {/* Progress bar */}
          <div className="w-52 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div className="preloader-progress w-full h-full bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] origin-left scale-x-0" />
          </div>

          {/* Counter */}
          <div className="flex items-baseline gap-1">
            <span className="preloader-count text-[#e8d5a3]/60 text-xs font-mono tracking-widest">
              0
            </span>
            <span className="text-[#e8d5a3]/30 text-xs font-mono">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
