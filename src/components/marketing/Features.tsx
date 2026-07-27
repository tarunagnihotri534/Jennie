"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { eyebrow, cards } = PRODUCT_CONFIG.inspection;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!gridRef.current) return;

      const cardEls = gridRef.current.querySelectorAll(".feature-card");
      const numberEls = gridRef.current.querySelectorAll(".card-number");
      const checkItems = gridRef.current.querySelectorAll(".check-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // 1. Cards rise into place left to right
      tl.from(cardEls, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      })
      // 2. Oversized numbers subtle reveal in sync with card fade-in
      .from(
        numberEls,
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      // 3. Nested checklist items stagger right after cards land
      .from(
        checkItems,
        {
          x: -12,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Eyebrow Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm md:text-base font-mono text-[#6e685c] dark:text-[#a39e93] leading-relaxed">
          {eyebrow}
        </p>
      </div>

      {/* 3-Column Flush Card Grid with 1px Vertical Dividers */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-[#dcd3c3] dark:border-[#2e2b26] shadow-lg"
      >
        {cards.map((cardData, idx) => (
          <FeatureCard
            key={cardData.id}
            data={cardData}
            isLast={idx === cards.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
