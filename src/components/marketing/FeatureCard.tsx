"use client";

import { useRef } from "react";
import gsap from "gsap";
import { InspectionCardData } from "@/lib/content";

function CheckIcon({ className = "w-4 h-4 text-neutral-500" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

interface FeatureCardProps {
  data: InspectionCardData;
  isLast: boolean;
}

export default function FeatureCard({ data, isLast }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const isLifted = data.bgVariant === "lifted";
  const isAccentTag = data.tagVariant === "accent";

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -4,
        boxShadow: isLifted
          ? "0 20px 40px rgba(0, 0, 0, 0.08)"
          : "0 15px 30px rgba(0, 0, 0, 0.06)",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (numberRef.current) {
      gsap.to(numberRef.current, {
        opacity: 0.35,
        duration: 0.3,
      });
    }

    if (pillRef.current) {
      gsap.to(pillRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // GSAP cursor-following subtle 3D tilt
    gsap.to(cardRef.current, {
      rotateX: -y * 0.02,
      rotateY: x * 0.02,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });

    // GSAP cursor-following spotlight glow
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        x: e.clientX - rect.left - 100,
        y: e.clientY - rect.top - 100,
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        boxShadow: isLifted
          ? "0 10px 25px rgba(0, 0, 0, 0.04)"
          : "0 0px 0px rgba(0, 0, 0, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (numberRef.current) {
      gsap.to(numberRef.current, {
        opacity: 0.2,
        duration: 0.3,
      });
    }

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`feature-card relative p-8 md:p-10 flex flex-col justify-between transition-colors duration-200 cursor-pointer overflow-hidden ${
        isLifted
          ? "bg-white dark:bg-[#1f1d1a] shadow-sm z-10"
          : "bg-[#fbf9f5] dark:bg-[#181715] z-0"
      } ${
        !isLast ? "border-r border-[#e8e2d8] dark:border-[#2e2b26]" : ""
      } ${
        data.hasOrangeBorder ? "border-l-4 border-l-[#e8542c] dark:border-l-[#f05a28]" : ""
      }`}
    >
      {/* GSAP Cursor Spotlight Glow Overlay */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute w-52 h-52 rounded-full bg-[#e8542c]/10 blur-2xl opacity-0 transition-opacity"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <div className="relative z-10">
        {/* Row 1: Oversized Faint Number & Tag Pill */}
        <div className="flex items-start justify-between mb-8">
          <span
            ref={numberRef}
            className="card-number font-mono text-5xl md:text-6xl font-black text-neutral-400 dark:text-neutral-500 opacity-20 select-none leading-none tracking-tight"
          >
            {data.number}
          </span>

          <span
            ref={pillRef}
            className={`font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border ${
              isAccentTag
                ? "border-[#e8542c] text-[#e8542c] dark:text-[#f05a28] bg-[#e8542c]/5"
                : "border-[#e2dad0] dark:border-[#38342e] text-[#8e887d] dark:text-[#78736a]"
            }`}
          >
            {data.tag}
          </span>
        </div>

        {/* Title (Exact Reference Typography) */}
        <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-tight text-[#181715] dark:text-[#f3efe6] mb-3">
          {data.title}
        </h3>

        {/* Description (Exact Reference Typography) */}
        <p className="text-xs md:text-sm text-[#6e685c] dark:text-[#a39e93] leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Thin Horizontal Divider */}
        <div className="border-t border-[#eee7dc] dark:border-[#2e2b26] my-6" />

        {/* Checklist */}
        <ul className="space-y-3">
          {data.checks.map((checkText, idx) => (
            <li
              key={idx}
              className="check-item flex items-center gap-3 font-mono text-xs text-[#5e5a54] dark:text-[#b0aaa0]"
            >
              <CheckIcon
                className={`w-4 h-4 shrink-0 ${
                  data.hasOrangeBorder
                    ? "text-[#e8542c] dark:text-[#f05a28]"
                    : "text-[#8e887d] dark:text-[#78736a]"
                }`}
              />
              <span>{checkText}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
