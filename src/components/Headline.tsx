"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HEADLINE_WORD1 = "WELCOME";
const HEADLINE_WORD2 = "ITZFIZZ";

export default function Headline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(".headline-letter");
    const subtext = containerRef.current.querySelector(".headline-sub");
    const line = containerRef.current.querySelector(".headline-line");

    const tl = gsap.timeline({ delay: 2.6 });

    // Staggered letter reveal
    tl.fromTo(
      letters,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.035,
        ease: "back.out(1.7)",
      }
    );

    // Decorative line grows
    if (line) {
      tl.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Subtitle fades in
    if (subtext) {
      tl.fromTo(
        subtext,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 flex flex-col items-center">
      {/* Main headline */}
      <h1 className="text-center select-none" style={{ perspective: "800px" }}>
        <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-white/90 mb-2">
          {HEADLINE_WORD1.split("").map((char, i) => (
            <span
              key={`w1-${i}`}
              className="headline-letter inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {char}
            </span>
          ))}
        </span>
        <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
          {HEADLINE_WORD2.split("").map((char, i) => (
            <span
              key={`w2-${i}`}
              className="headline-letter inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {char}
            </span>
          ))}
        </span>
      </h1>

      {/* Decorative line */}
      <div className="headline-line w-16 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-6 sm:mt-8 origin-center" />

      {/* Subtitle */}
      <p className="headline-sub text-white/30 text-xs sm:text-sm tracking-[0.4em] uppercase mt-4 font-light">
        Scroll-Driven Experience
      </p>
    </div>
  );
}
