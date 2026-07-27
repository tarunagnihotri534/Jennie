"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Anchor, Star, Menu, X, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GithubIcon from "@/components/ui/GithubIcon";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. ScrollTrigger for Navbar state toggle (Base vs Scrolled Floating Pill)
      ScrollTrigger.create({
        start: 80, // px scrolled down
        onEnter: () => {
          setIsScrolled(true);
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              paddingInline: "1.75rem",
              paddingBlock: "0.6rem",
              borderRadius: "9999px",
              borderColor: "rgba(0,0,0,0.08)",
              backgroundColor: "rgba(234, 227, 213, 0.92)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              duration: 0.35,
              ease: "power2.out",
            });
          }
        },
        onLeaveBack: () => {
          setIsScrolled(false);
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              paddingInline: "1.5rem",
              paddingBlock: "1rem",
              borderRadius: "0px",
              borderColor: "transparent",
              backgroundColor: "transparent",
              boxShadow: "none",
              duration: 0.35,
              ease: "power2.out",
            });
          }
        },
      });

      // 2. Section ScrollTriggers for Active Nav Link Tracking
      const sections = [
        { id: "hero", navId: "FEATURES" },
        { id: "features", navId: "FEATURES" },
        { id: "quickstart", navId: "INSTALL" },
        { id: "faq", navId: "FAQ" },
      ];

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) {
                setActiveSection(sec.navId);
              }
            },
          });
        }
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // GSAP Smooth Color Transition for Active Link
  useEffect(() => {
    PRODUCT_CONFIG.navLinks.forEach((link) => {
      const linkEl = linkRefs.current[link.label];
      if (linkEl) {
        const isActive = activeSection === link.label;
        gsap.to(linkEl, {
          color: isActive ? "#e8542c" : "#5e5a54",
          duration: 0.25,
          ease: "power1.out",
        });
      }
    });
  }, [activeSection]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full pt-3 px-4 sm:px-6 lg:px-8 transition-all duration-300"
    >
      {/* Container morphs between Base Inline & Floating Capsule Pill */}
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto flex items-center justify-between transition-all duration-300 border border-transparent"
      >
        {/* Left: Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="p-1.5 rounded-lg bg-[#e8542c] text-white shadow-sm transition-transform group-hover:scale-105">
            <Anchor className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-headline text-xl md:text-2xl font-bold tracking-tight text-[#181715] dark:text-[#f3efe6]">
            {PRODUCT_CONFIG.name}
          </span>
        </Link>

        {/* Center: Nav Links (Full string "DOCUMENTATION" at top -> "DOCS" when scrolled) */}
        <nav className="hidden md:flex items-center gap-8">
          {PRODUCT_CONFIG.navLinks.map((link) => {
            // String swap: DOCUMENTATION -> DOCS when scrolled
            const displayLabel =
              isScrolled && link.label === "DOCUMENTATION" ? "DOCS" : link.label;

            return (
              <Link
                key={link.label}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[link.label] = el;
                }}
                className="text-xs font-mono font-semibold tracking-widest uppercase transition-colors hover:text-[#e8542c]"
              >
                {displayLabel}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: GitHub Icon, Star Count, Theme Toggle, Avatar */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* GitHub & Star Count Pill */}
          <a
            href={PRODUCT_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-[#eae3d5]/80 dark:bg-[#252320]/80 text-[#181715] dark:text-[#f3efe6] border border-[#dcd3c3] dark:border-[#38342e] hover:border-[#e8542c] transition-all group"
          >
            <GithubIcon className="w-4 h-4" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{PRODUCT_CONFIG.starsCount}</span>
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Avatar Placeholder */}
          <div className="w-8 h-8 rounded-full bg-[#dcd3c3] dark:bg-[#2e2b26] border border-[#c8bfae] dark:border-[#3e3a35] flex items-center justify-center text-[#5e5a54] dark:text-[#a39e93] shadow-sm hover:scale-105 transition-transform cursor-pointer">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#181715] dark:text-[#f3efe6] hover:bg-[#dcd3c3] dark:hover:bg-[#2e2b26] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Collapse */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto rounded-2xl border border-[#dcd3c3] dark:border-[#2d2b27] bg-[#eae3d5] dark:bg-[#1c1a17] p-5 shadow-lg space-y-4">
          <nav className="flex flex-col space-y-3">
            {PRODUCT_CONFIG.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-semibold tracking-wider text-[#5e5a54] dark:text-[#a39e93] hover:text-[#e8542c] uppercase py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#dcd3c3] dark:border-[#2d2b27] flex items-center justify-between">
            <a
              href={PRODUCT_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#5e5a54] dark:text-[#a39e93]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub ⭐ {PRODUCT_CONFIG.starsCount}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
