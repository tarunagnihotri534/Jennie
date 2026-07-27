"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { kicker, titleLine1, titleLine2, subtitle, cards } = PRODUCT_CONFIG.inspection;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cardElements = gridRef.current?.children;
      if (cardElements && cardElements.length > 0) {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching exact reference layout */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#e8542c] dark:text-[#f05a28] block mb-4">
          {kicker}
        </span>
        
        {/* Giant Headline with Bold Orange Text (No Background Box) */}
        <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#e8542c] dark:text-[#f05a28] font-black leading-none mb-6">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>

        <p className="text-base sm:text-lg text-[#5e5a54] dark:text-[#a39e93] max-w-xl mx-auto leading-relaxed mt-4">
          {subtitle}
        </p>
      </div>

      {/* 3-Column Numbered Cards matching exact reference screenshot */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card) => (
          <div
            key={card.number}
            className={`relative p-8 rounded-xl bg-[#fbf8f3] dark:bg-[#181715] border ${
              card.isHighlighted
                ? "border-[#dcd3c3] dark:border-[#2e2b26] border-l-4 border-l-[#e8542c] dark:border-l-[#f05a28] shadow-md"
                : "border-[#dcd3c3] dark:border-[#2e2b26] shadow-sm"
            } transition-all duration-300 flex flex-col justify-between`}
          >
            <div>
              {/* Card Header: Number Top-Left & Tag Top-Right */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-5xl font-black text-[#d2c9b9] dark:text-[#38342e] select-none leading-none">
                  {card.number}
                </span>

                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    card.isHighlighted
                      ? "border-[#e8542c] text-[#e8542c] dark:text-[#f05a28] bg-[#e8542c]/5"
                      : "border-[#d2c9b9] dark:border-[#38342e] text-[#8e887d] dark:text-[#78736a]"
                  }`}
                >
                  {card.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-headline text-xl md:text-2xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6] mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-[#5e5a54] dark:text-[#a39e93] leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
