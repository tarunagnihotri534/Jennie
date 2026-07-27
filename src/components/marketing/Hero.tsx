"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Copy, Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import Stamp from "@/components/ui/Stamp";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaBlockRef = useRef<HTMLDivElement>(null);

  const words = PRODUCT_CONFIG.hero.headlineLine2Words;

  // Staggered entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set([badgeRef.current, line1Ref.current, line2Ref.current, subheadlineRef.current, ctaBlockRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(stampRef.current, { opacity: 0, scale: 0.5, rotate: -20 });

      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.4)" }, "-=0.5")
        .to(stampRef.current, { opacity: 1, scale: 1, rotate: 6, duration: 0.7, ease: "elastic.out(1, 0.5)" }, "-=0.6")
        .to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaBlockRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Continuous smooth word-cycling animation for line 2
  useEffect(() => {
    const interval = setInterval(() => {
      if (!line2Ref.current) return;

      gsap.to(line2Ref.current, {
        y: -35,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setWordIndex((prev) => (prev + 1) % words.length);
          gsap.fromTo(
            line2Ref.current,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }
          );
        },
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [words.length]);

  const handleCopyInit = async () => {
    try {
      await navigator.clipboard.writeText(PRODUCT_CONFIG.initCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <section ref={heroRef} className="relative w-full py-16 md:py-24 lg:py-28 overflow-hidden paper-texture border-b border-[#e2dacd] dark:border-[#2d2b27]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Rotated Dashed Stamp Badge */}
        <div ref={stampRef} className="w-full flex justify-end md:absolute md:top-0 md:right-8 lg:right-12 mb-6 md:mb-0 z-20">
          <Stamp text={PRODUCT_CONFIG.stampText} className="shadow-sm font-black" />
        </div>

        {/* Centered Pill Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#eae3d5] dark:bg-[#252320] text-[#181715] dark:text-[#f3efe6] border border-[#dcd3c3] dark:border-[#38342e] shadow-sm mb-8 hover:border-[#e8542c] transition-colors cursor-pointer group"
        >
          <span className="w-2 h-2 rounded-full bg-[#e8542c] animate-pulse" />
          <span className="font-bold tracking-wide text-[#181715] dark:text-[#f3efe6]">{PRODUCT_CONFIG.badge}</span>
          <span className="text-neutral-500">/</span>
          <a
            href={PRODUCT_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#f3efe6] hover:text-[#f05a28] transition-colors"
          >
            <Image
              src="/jennie.png"
              alt="Jennie Logo"
              width={16}
              height={16}
              className="object-contain rounded"
            />
            <span className="font-bold uppercase tracking-wider">{PRODUCT_CONFIG.repoOrgName}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Two-Line Giant Headline */}
        <div className="w-full max-w-5xl mb-6">
          <h1 className="font-headline tracking-tighter uppercase leading-none select-none">
            {/* Line 1: Dark gradient charcoal to gray in light mode */}
            <span ref={line1Ref} className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-charcoal mb-1">
              {PRODUCT_CONFIG.hero.headlineLine1}
            </span>
            
            {/* Line 2: Continuous GSAP Animated Word Rotation */}
            <div className="h-[60px] sm:h-[90px] md:h-[110px] lg:h-[130px] flex items-center justify-center overflow-hidden">
              <span
                ref={line2Ref}
                className="block text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-[#e8542c] dark:text-[#f05a28] font-black drop-shadow-sm"
              >
                {words[wordIndex]}
              </span>
            </div>
          </h1>
        </div>

        {/* Subheadline (High contrast dark charcoal text in light mode) */}
        <p ref={subheadlineRef} className="text-base sm:text-lg md:text-xl text-[#38342e] dark:text-[#a39e93] max-w-2xl font-medium mb-10">
          {PRODUCT_CONFIG.hero.subheadlinePrefix}
          <strong className="font-black text-[#181715] dark:text-[#f3efe6]">
            {PRODUCT_CONFIG.hero.subheadlineHighlight}
          </strong>
        </p>

        {/* Terminal-Style CTA Block */}
        <div ref={ctaBlockRef} className="relative w-full max-w-lg mb-4">
          <div className="corner-dashed-container relative rounded-xl border border-[#dcd3c3] dark:border-[#38342e] bg-[#eae3d5]/90 dark:bg-[#1e1c19]/90 backdrop-blur-sm p-4 md:p-5 flex items-center justify-between shadow-lg">
            <div className="corner-dashed-tl" />
            <div className="corner-dashed-br" />

            <div className="flex items-center gap-3 font-mono text-sm md:text-base text-[#181715] dark:text-[#f3efe6]">
              <span className="text-[#e8542c] font-bold select-none">$</span>
              <span className="font-bold text-[#181715] dark:text-[#f3efe6]">{PRODUCT_CONFIG.initCommand}</span>
            </div>

            <button
              onClick={handleCopyInit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold text-[#181715] dark:text-[#a39e93] hover:text-black dark:hover:text-white bg-[#d6cbba] dark:bg-[#2d2b27] hover:bg-[#c8bfae] dark:hover:bg-[#38342e] border border-[#c8bfae] dark:border-[#3e3a35] transition-all focus:outline-none"
              title="Copy init command"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Small Caption Below */}
        <p className="text-xs font-mono tracking-wider uppercase text-[#5e5a54] dark:text-[#88837a] font-semibold">
          {PRODUCT_CONFIG.hero.ctaCaptionPrefix}
          <strong className="font-black text-[#181715] dark:text-[#f3efe6]">
            {PRODUCT_CONFIG.hero.ctaCaptionHighlight}
          </strong>
          {PRODUCT_CONFIG.hero.ctaCaptionSuffix}
        </p>

      </div>
    </section>
  );
}
