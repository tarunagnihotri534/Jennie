"use client";

import { useState } from "react";
import Link from "next/link";
import { Anchor, Star, Menu, X, User } from "lucide-react";
import GithubIcon from "@/components/ui/GithubIcon";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      {/* Floating Capsule Header */}
      <div className="max-w-5xl mx-auto rounded-full bg-[#eae3d5]/90 dark:bg-[#1c1a17]/90 backdrop-blur-md border border-[#dcd3c3] dark:border-[#2e2b26] shadow-md px-6 py-2.5 flex items-center justify-between transition-colors">
        
        {/* Left: Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1 rounded-md bg-[#e8542c] text-white shadow-sm transition-transform group-hover:scale-105">
            <Anchor className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-headline text-lg md:text-xl font-bold tracking-tight text-[#181715] dark:text-[#f3efe6]">
            {PRODUCT_CONFIG.name}
          </span>
        </Link>

        {/* Center: Tracked Uppercase Links */}
        <nav className="hidden md:flex items-center gap-8">
          {PRODUCT_CONFIG.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-mono font-semibold tracking-widest text-[#5e5a54] dark:text-[#a39e93] hover:text-[#e8542c] dark:hover:text-[#f05a28] transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: GitHub Icon, Theme Toggle, Avatar */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={PRODUCT_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#5e5a54] dark:text-[#a39e93] hover:text-[#e8542c] transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{PRODUCT_CONFIG.starsCount}</span>
          </a>

          <ThemeToggle />
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
