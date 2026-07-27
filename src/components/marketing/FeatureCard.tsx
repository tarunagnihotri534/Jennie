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

  const isLifted = data.bgVariant === "lifted";
  const isAccentTag = data.tagVariant === "accent";

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -6,
        boxShadow: isLifted
          ? "0 25px 50px rgba(0, 0, 0, 0.15)"
          : "0 20px 40px rgba(0, 0, 0, 0.12)",
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
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: isLifted
          ? "0 10px 25px rgba(0, 0, 0, 0.06)"
          : "0 0px 0px rgba(0, 0, 0, 0)",
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (numberRef.current) {
      gsap.to(numberRef.current, {
        opacity: 0.18,
        duration: 0.25,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`feature-card relative p-8 md:p-10 flex flex-col justify-between transition-colors duration-200 cursor-pointer ${
        isLifted
          ? "bg-[#f5f1e8] dark:bg-[#201e1b] shadow-md z-10 rounded-lg md:rounded-none"
          : "bg-[#e8e2d8] dark:bg-[#181715] z-0"
      } ${
        !isLast ? "border-r border-[#dcd3c3] dark:border-[#2e2b26]" : ""
      } ${
        data.hasOrangeBorder ? "border-l-4 border-l-[#e8542c] dark:border-l-[#f05a28]" : ""
      }`}
    >
      <div>
        {/* Row 1: Oversized Number & Tag Pill */}
        <div className="flex items-center justify-between mb-8">
          <span
            ref={numberRef}
            className="card-number font-headline text-6xl md:text-7xl font-black text-neutral-600 dark:text-neutral-300 opacity-18 select-none leading-none tracking-tight"
          >
            {data.number}
          </span>

          <span
            ref={pillRef}
            className={`font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              isAccentTag
                ? "border-[#e8542c] text-[#e8542c] dark:text-[#f05a28] bg-[#e8542c]/5"
                : "border-[#c8c0b0] dark:border-[#38342e] text-[#6e685c] dark:text-[#8e887d]"
            }`}
          >
            {data.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-xl md:text-2xl font-bold uppercase tracking-tight text-[#181715] dark:text-[#f3efe6] mb-4">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-[#5e5a54] dark:text-[#a39e93] leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Thin Horizontal Divider */}
        <div className="border-t border-[#d6cebf] dark:border-[#2e2b26] my-6" />

        {/* Checklist */}
        <ul className="space-y-3">
          {data.checks.map((checkText, idx) => (
            <li
              key={idx}
              className="check-item flex items-center gap-3 font-mono text-xs md:text-sm text-[#4a4640] dark:text-[#b0aaa0]"
            >
              <CheckIcon
                className={`w-4 h-4 shrink-0 ${
                  data.hasOrangeBorder
                    ? "text-[#e8542c] dark:text-[#f05a28]"
                    : "text-[#6e685c] dark:text-[#8e887d]"
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
