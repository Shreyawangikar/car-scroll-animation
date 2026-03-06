"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/car-scroll-animation" : "";

const LETTERS = "WELCOME ITZFIZZ".split("");

interface StatBox {
  id: string;
  value: string;
  text: string;
  bg: string;
  textColor: string;
  position: string;
}

const STAT_BOXES: StatBox[] = [
  {
    id: "box1",
    value: "58%",
    text: "Increase in pick up point use",
    bg: "#def54f",
    textColor: "#111",
    position: "top-[8%] right-[28%]",
  },
  {
    id: "box2",
    value: "23%",
    text: "Decreased in customer phone calls",
    bg: "#6ac9ff",
    textColor: "#111",
    position: "bottom-[8%] right-[32%]",
  },
  {
    id: "box3",
    value: "27%",
    text: "Increase in pick up point use",
    bg: "#333",
    textColor: "#fff",
    position: "top-[8%] right-[8%]",
  },
  {
    id: "box4",
    value: "40%",
    text: "Decreased in customer phone calls",
    bg: "#fa7328",
    textColor: "#111",
    position: "bottom-[8%] right-[10%]",
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const valueTextRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !trackRef.current ||
      !carRef.current ||
      !trailRef.current ||
      !valueTextRef.current
    )
      return;

    const car = carRef.current;
    const trail = trailRef.current;
    const letters = gsap.utils.toArray<HTMLSpanElement>(".value-letter");
    const valueContainer = valueTextRef.current;

    // Wait for layout to settle
    const initTimeout = setTimeout(() => {
      const valueRect = valueContainer.getBoundingClientRect();
      const letterOffsets = letters.map((l) => l.offsetLeft);
      const roadWidth = window.innerWidth;
      const carWidth = car.offsetWidth || 180;
      const endX = roadWidth - carWidth;

      // Build a timeline pinned to the section — scrub: 1 for smooth catchup
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // 1.2s smooth catchup
          pin: trackRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      // Phase 1 (0 → 0.7): Car drives across road
      tl.to(
        car,
        {
          x: endX,
          duration: 0.7,
          ease: "none",
          onUpdate: function () {
            const carX =
              (gsap.getProperty(car, "x") as number) + carWidth / 2;

            // Green trail follows car
            gsap.set(trail, { width: carX });

            // Reveal letters as car passes each one
            letters.forEach((letter, i) => {
              const letterX = valueRect.left + letterOffsets[i];
              if (carX >= letterX) {
                gsap.to(letter, {
                  opacity: 1,
                  duration: 0.15,
                  overwrite: true,
                });
              }
            });
          },
        },
        0
      );

      // Phase 2 (0.35 → 0.85): Stat boxes fade in staggered
      STAT_BOXES.forEach((box, i) => {
        const el = boxRefs.current[i];
        if (!el) return;

        tl.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          0.35 + i * 0.12 // stagger start
        );
      });

      // Phase 3 (0.85 → 1.0): Hold / gentle pulse on stat values
      tl.to({}, { duration: 0.15 }, 0.85);

      // Handle resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="hero-section relative"
      style={{ height: "500vh" }}
    >
      <div
        ref={trackRef}
        className="hero-track h-screen w-full flex items-center justify-center bg-[#121212]"
      >
        {/* Road strip */}
        <div className="relative w-screen overflow-hidden" style={{ height: "200px", backgroundColor: "#1e1e1e" }}>
          {/* Car */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={carRef}
            src={`${BASE_PATH}/car.png`}
            alt="car"
            className="absolute top-0 left-0 z-10"
            style={{ height: "200px", willChange: "transform" }}
          />

          {/* Green trail */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 z-[1]"
            style={{
              height: "200px",
              background: "linear-gradient(90deg, #45db7d 0%, #3ecf72 100%)",
              width: 0,
              willChange: "width",
            }}
          />

          {/* WELCOME ITZFIZZ letters */}
          <div
            ref={valueTextRef}
            className="absolute z-[5] flex"
            style={{
              top: "50%",
              left: "5%",
              transform: "translateY(-50%)",
              fontSize: "clamp(3rem, 8vw, 8rem)",
              fontWeight: 800,
              gap: "0.2rem",
              letterSpacing: "0.05em",
            }}
          >
            {LETTERS.map((char, i) => (
              <span
                key={i}
                className="value-letter"
                style={{
                  color: "#111",
                  opacity: 0,
                  willChange: "opacity",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>

        {/* Stat boxes */}
        {STAT_BOXES.map((box, i) => (
          <div
            key={box.id}
            ref={(el) => {
              boxRefs.current[i] = el;
            }}
            className={`absolute z-[5] flex flex-col justify-center items-start gap-[5px] rounded-xl ${box.position}`}
            style={{
              opacity: 0,
              background: box.bg,
              color: box.textColor,
              padding: "28px 32px",
              fontSize: "16px",
              willChange: "transform, opacity",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            }}
          >
            <span className="text-[52px] font-bold leading-none tracking-tight">
              {box.value}
            </span>
            <span className="text-sm opacity-80">{box.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
