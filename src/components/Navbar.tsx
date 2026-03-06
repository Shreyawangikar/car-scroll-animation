"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.8 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a14]/80 backdrop-blur-xl border-b border-[#FFD700]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B8860B] to-[#FFD700] flex items-center justify-center">
            <span className="text-[#0a0a14] text-xs font-bold">IF</span>
          </div>
          <span className="text-[#e8d5a3] text-sm tracking-[0.25em] uppercase font-medium hidden sm:block">
            ITZFIZZ
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Events", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/40 text-xs tracking-[0.2em] uppercase hover:text-[#FFD700] transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFD700] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <button className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-[#FFD700]/20 rounded-full text-[#e8d5a3]/70 hover:bg-[#FFD700]/10 hover:text-[#FFD700] hover:border-[#FFD700]/40 transition-all duration-300">
          Join Event
        </button>
      </div>
    </nav>
  );
}
