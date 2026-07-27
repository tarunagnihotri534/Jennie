"use client";

import { useEffect, useRef } from "react";
import { Bot, Cpu, Wrench, Zap, Layers, ShieldAlert } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_CONFIG } from "@/lib/content";

const iconMap = {
  Bot: Bot,
  Cpu: Cpu,
  Wrench: Wrench,
  Zap: Zap,
  Layers: Layers,
  ShieldAlert: ShieldAlert,
};

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
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
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#e8542c] dark:text-[#f05a28] px-3 py-1 rounded-full bg-[#e8542c]/10 border border-[#e8542c]/20 inline-block mb-4">
          CORE ETHOS & CAPABILITIES
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
          BUILT LIKE A SENIOR REVIEWER
        </h2>
        <p className="mt-4 text-base md:text-lg text-[#5e5a54] dark:text-[#a39e93]">
          Not a static linter, but an autonomous AI agent loop equipped with real developer tools to deeply inspect pull requests.
        </p>
      </div>

      {/* 3-4 Column Responsive Card Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {PRODUCT_CONFIG.features.map((feature) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Bot;

          return (
            <div
              key={feature.id}
              className="group relative p-6 md:p-8 rounded-2xl bg-[#eae3d5]/80 dark:bg-[#1c1a17]/80 border border-[#dcd3c3] dark:border-[#2e2b26] shadow-sm hover:shadow-xl hover:border-[#e8542c] dark:hover:border-[#f05a28] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Primitive Container */}
                <div className="w-12 h-12 rounded-xl bg-[#e8542c]/10 dark:bg-[#f05a28]/10 text-[#e8542c] dark:text-[#f05a28] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#e8542c] group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Title */}
                <h3 className="font-headline text-xl md:text-2xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6] mb-3 group-hover:text-[#e8542c] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-[#5e5a54] dark:text-[#a39e93] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-6 pt-4 border-t border-[#dcd3c3]/50 dark:border-[#2e2b26]/50 flex items-center justify-between text-xs font-mono text-[#888279] dark:text-[#78736a]">
                <span>AGENT TOOLING</span>
                <span className="group-hover:translate-x-1 group-hover:text-[#e8542c] transition-all">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
