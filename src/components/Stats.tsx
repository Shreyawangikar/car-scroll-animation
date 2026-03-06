"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Stat {
  value: number;
  suffix: string;
  description: string;
  color: string;
  icon: string;
}

const STATS: Stat[] = [
  {
    value: 58,
    suffix: "%",
    description: "Increase in pick up point use",
    color: "#FF6B35",
    icon: "↗",
  },
  {
    value: 23,
    suffix: "%",
    description: "Decreased in customer phone calls",
    color: "#4ECDC4",
    icon: "↘",
  },
  {
    value: 27,
    suffix: "%",
    description: "Increase in pick up point use",
    color: "#FFE66D",
    icon: "↗",
  },
  {
    value: 40,
    suffix: "%",
    description: "Decreased in customer phone calls",
    color: "#FF6B6B",
    icon: "↘",
  },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".stat-card");
    const counters = containerRef.current.querySelectorAll(".stat-counter");

    const tl = gsap.timeline({ delay: 3.5 });

    // Cards slide in
    tl.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      }
    );

    // Counter animation
    counters.forEach((counter, i) => {
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: STATS[i].value,
          duration: 1.5,
          snap: { innerText: 1 },
          ease: "power2.out",
          delay: 3.8 + i * 0.12,
        }
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full max-w-6xl mx-auto mt-10 sm:mt-14 md:mt-16 px-4 sm:px-6"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className="stat-card group relative text-center p-5 sm:p-7 rounded-2xl backdrop-blur-md bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500 cursor-default overflow-hidden"
          >
            {/* Hover gradient */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{
                background: `radial-gradient(circle at 50% 120%, ${stat.color}08, transparent 70%)`,
              }}
            />

            {/* Icon */}
            <span className="block text-lg mb-2 opacity-40">{stat.icon}</span>

            {/* Animated counter */}
            <div className="relative flex items-baseline justify-center gap-0.5">
              <span
                className="stat-counter text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums"
                style={{ color: stat.color }}
              >
                0
              </span>
              <span
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ color: stat.color }}
              >
                {stat.suffix}
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed mt-3 tracking-wide">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
