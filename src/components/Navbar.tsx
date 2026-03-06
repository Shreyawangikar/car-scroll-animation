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

    // Initial entrance
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.5 }
    );

    // Background change on scroll
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
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">IF</span>
          </div>
          <span className="text-white text-sm tracking-[0.25em] uppercase font-medium hidden sm:block">
            ITZFIZZ
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About", "Features", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/50 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <button className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-white/15 rounded-full text-white/70 hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300">
          Get Started
        </button>
      </div>
    </nav>
  );
}
