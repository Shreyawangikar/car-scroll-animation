"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CarAnimation() {
  const carRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carRef.current || !containerRef.current) return;

    // Initial entrance animation — car drops in with bounce
    gsap.fromTo(
      carRef.current,
      {
        opacity: 0,
        scale: 0.3,
        rotation: -90,
        y: -200,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 1.6,
        ease: "elastic.out(1, 0.6)",
        delay: 2.8,
      }
    );

    // Glow animates in
    if (glowRef.current) {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out", delay: 3 }
      );
    }

    // Idle floating animation (subtle)
    gsap.to(carRef.current, {
      y: "+=8",
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 4.5,
    });

    // Scroll-driven animation — multi-stage cinematic car movement
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
        pin: false,
      },
    });

    // Stage 1: Car rotates slightly and drifts right
    scrollTl
      .to(carRef.current, {
        rotation: 60,
        x: 120,
        y: -40,
        scale: 0.95,
        ease: "none",
        duration: 1,
      })
      // Stage 2: Car sweeps to center-left, rotates more
      .to(carRef.current, {
        rotation: 150,
        x: -80,
        y: -120,
        scale: 0.8,
        ease: "none",
        duration: 1,
      })
      // Stage 3: Car accelerates out (zooms + spins)
      .to(carRef.current, {
        rotation: 360,
        y: -250,
        x: 60,
        scale: 0.5,
        opacity: 0,
        ease: "none",
        duration: 1,
      });

    // Glow tracks the car on scroll
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* Multi-layer glow effect */}
      <div ref={glowRef} className="absolute">
        <div className="absolute -inset-10 w-100 h-100 sm:w-120 sm:h-120 md:w-140 md:h-140 rounded-full bg-orange-500/[0.03] blur-3xl" />
        <div className="absolute -inset-5 w-60 h-60 sm:w-80 sm:h-80 md:w-100 md:h-100 rounded-full bg-orange-600/[0.05] blur-2xl" />
      </div>

      {/* Car */}
      <div
        ref={carRef}
        className="car-image relative w-70 h-70 sm:w-95 sm:h-95 md:w-120 md:h-120 lg:w-[580px] lg:h-[580px]"
      >
        <Image
          src="/car.png"
          alt="McLaren 720S Top View"
          fill
          className="object-contain drop-shadow-[0_0_60px_rgba(255,107,53,0.2)]"
          priority
        />
      </div>
    </div>
  );
}
