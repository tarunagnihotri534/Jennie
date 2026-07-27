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
      // 1. ScrollTrigger for Floating Pill morph on scroll
      ScrollTrigger.create({
        start: 60, // px scrolled down
        onEnter: () => {
          setIsScrolled(true);
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              backgroundColor: "rgba(234, 227, 213, 0.95)",
              borderColor: "rgba(220, 211, 195, 1)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
        onLeaveBack: () => {
          setIsScrolled(false);
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              backgroundColor: "rgba(234, 227, 213, 0.8)",
              borderColor: "rgba(220, 211, 195, 0.8)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      });

      // 2. Active Section ScrollTriggers
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

  // Smooth GSAP color update for active link
  useEffect(() => {
    PRODUCT_CONFIG.navLinks.forEach((link) => {
      const linkEl = linkRefs.current[link.label];
      if (linkEl) {
        const isActive = activeSection === link.label;
        gsap.to(linkEl, {
          color: isActive ? "#e8542c" : "#181715",
          duration: 0.25,
        });
      }
    });
  }, [activeSection]);

  return (
    <header
      ref={headerRef}
      className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8"
    >
      {/* Floating Pill Capsule matching shippie.dev exact style */}
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto rounded-full bg-[#eae3d5]/90 dark:bg-[#1c1a17]/90 backdrop-blur-md border border-[#dcd3c3] dark:border-[#2e2b26] shadow-sm px-6 py-2.5 flex items-center justify-between transition-colors"
      >
        {/* Left: Brand Logo & Wordmark (Sharp Charcoal Text in Light Mode) */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="p-1.5 rounded-lg bg-[#e8542c] text-white shadow-sm transition-transform group-hover:scale-105">
            <Anchor className="w-4.5 h-4.5 stroke-[2.5]" />
          </div>
          <span className="font-headline text-xl md:text-2xl font-black tracking-tight text-[#181715] dark:text-[#f3efe6]">
            {PRODUCT_CONFIG.name}
          </span>
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {PRODUCT_CONFIG.navLinks.map((link) => {
            const displayLabel =
              isScrolled && link.label === "DOCUMENTATION" ? "DOCS" : link.label;

            return (
              <Link
                key={link.label}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[link.label] = el;
                }}
                className="text-xs font-mono font-bold tracking-widest uppercase transition-colors text-[#181715] dark:text-[#f3efe6] hover:text-[#e8542c]"
              >
                {displayLabel}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: GitHub Icon, Star Count, Theme Toggle, Avatar */}
        <div className="hidden md:flex items-center gap-3.5 shrink-0">
          <a
            href={PRODUCT_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#dcd3c3]/70 dark:bg-[#252320] text-[#181715] dark:text-[#f3efe6] border border-[#c8bfae] dark:border-[#38342e] hover:border-[#e8542c] transition-all group"
          >
            <GithubIcon className="w-4 h-4 text-[#181715] dark:text-[#f3efe6]" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{PRODUCT_CONFIG.starsCount}</span>
          </a>

          <ThemeToggle />

          <div className="w-8 h-8 rounded-full bg-[#dcd3c3] dark:bg-[#2e2b26] border border-[#c8bfae] dark:border-[#3e3a35] flex items-center justify-center text-[#181715] dark:text-[#f3efe6] shadow-sm hover:scale-105 transition-transform cursor-pointer">
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
                className="text-sm font-mono font-bold tracking-wider text-[#181715] dark:text-[#f3efe6] hover:text-[#e8542c] uppercase py-1"
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
              className="flex items-center gap-2 text-xs font-mono font-bold text-[#181715] dark:text-[#f3efe6]"
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
