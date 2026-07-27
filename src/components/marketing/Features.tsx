"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { kicker, titleLine1, titleLine2, subtitle, cards } = PRODUCT_CONFIG.inspection;

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

      tl.from(cardEls, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      })
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
      {/* Section Header matching shippie.dev exact screenshot */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#e8542c] dark:text-[#f05a28] block mb-4">
          {kicker}
        </span>
        
        {/* Exact Headline: A REVIEWER THAT READS THE WHOLE PICTURE */}
        <h2 className="font-headline text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6] font-black leading-none mb-6">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>

        <p className="text-base sm:text-lg text-[#5e5a54] dark:text-[#a39e93] max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* 3-Column White Card Grid with 1px Vertical Dividers */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-[#dcd3c3] dark:border-[#2e2b26] shadow-xl bg-white dark:bg-[#181715]"
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
