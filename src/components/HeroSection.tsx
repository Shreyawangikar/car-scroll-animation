"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Headline from "./Headline";
import Stats from "./Stats";
import CarAnimation from "./CarAnimation";
import Particles from "./Particles";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !overlayRef.current) return;

    // Fade out hero content as user scrolls
    gsap.to(overlayRef.current, {
      opacity: 0,
      y: -120,
      scale: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "60% top",
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[250vh] bg-[#0a0a0a] overflow-hidden"
    >
      {/* Fixed hero viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-10 left-10 w-16 h-16 border-l border-t border-white/[0.06]" />
        <div className="absolute top-10 right-10 w-16 h-16 border-r border-t border-white/[0.06]" />
        <div className="absolute bottom-10 left-10 w-16 h-16 border-l border-b border-white/[0.06]" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-r border-b border-white/[0.06]" />

        {/* Particles */}
        <Particles />

        {/* Ambient gradient */}
        <div className="gradient-overlay absolute inset-0" />

        {/* Car animation layer */}
        <CarAnimation />

        {/* Content overlay */}
        <div
          ref={overlayRef}
          className="relative z-20 flex flex-col items-center justify-center w-full"
        >
          <Headline />
          <Stats />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase font-light">
            Scroll to explore
          </span>
          <div className="relative w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 rounded-full bg-orange-500/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
