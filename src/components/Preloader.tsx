"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    // Animate the progress bar
    tl.to(".preloader-progress", {
      scaleX: 1,
      duration: 1.8,
      ease: "power2.inOut",
    })
      // Animate the percentage counter
      .to(
        ".preloader-count",
        {
          innerText: 100,
          duration: 1.8,
          snap: { innerText: 1 },
          ease: "power2.inOut",
        },
        0
      )
      // Fade out brand text upward
      .to(".preloader-brand", {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
      // Slide the curtain up
      .to(".preloader-overlay", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      })
      // Clean up
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
      <div className="preloader-overlay absolute inset-0 bg-[#050505] flex flex-col items-center justify-center">
        <div className="preloader-brand flex flex-col items-center gap-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-white/80 text-sm tracking-[0.5em] uppercase font-light">
              ITZFIZZ
            </span>
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          </div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
            <div className="preloader-progress w-full h-full bg-gradient-to-r from-orange-500 to-orange-400 origin-left scale-x-0" />
          </div>

          {/* Counter */}
          <div className="flex items-baseline gap-1">
            <span className="preloader-count text-white/60 text-xs font-mono tracking-widest">
              0
            </span>
            <span className="text-white/30 text-xs font-mono">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
