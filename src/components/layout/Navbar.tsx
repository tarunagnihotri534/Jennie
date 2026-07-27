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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#f2ede4]/80 dark:bg-[#141312]/80 border-b border-[#e2dacd] dark:border-[#2d2b27] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-1.5 rounded-lg bg-[#e8542c] text-white shadow-sm transition-transform group-hover:scale-105">
            <Anchor className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-headline text-xl md:text-2xl font-bold tracking-tight text-[#181715] dark:text-[#f3efe6]">
            {PRODUCT_CONFIG.name}
          </span>
        </Link>

        {/* Center: Uppercase Tracked Navigation Links (Desktop) */}
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

        {/* Right Side: GitHub Star Count, Theme Toggle, Avatar */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={PRODUCT_CONFIG.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-[#eae3d5] dark:bg-[#252320] text-[#181715] dark:text-[#f3efe6] border border-[#dcd3c3] dark:border-[#38342e] hover:border-[#e8542c] dark:hover:border-[#f05a28] transition-all group"
          >
            <GithubIcon className="w-4 h-4" />
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{PRODUCT_CONFIG.starsCount}</span>
          </a>

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
            className="p-2 rounded-lg text-[#181715] dark:text-[#f3efe6] hover:bg-[#eae3d5] dark:hover:bg-[#252320] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Collapse */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e2dacd] dark:border-[#2d2b27] bg-[#f2ede4] dark:bg-[#141312] px-4 pt-2 pb-6 space-y-4">
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
          <div className="pt-2 border-t border-[#e2dacd] dark:border-[#2d2b27] flex items-center justify-between">
            <a
              href={PRODUCT_CONFIG.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-[#eae3d5] dark:bg-[#252320] text-[#181715] dark:text-[#f3efe6]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub ⭐ {PRODUCT_CONFIG.starsCount}</span>
            </a>
            <div className="w-8 h-8 rounded-full bg-[#dcd3c3] dark:bg-[#2e2b26] flex items-center justify-center text-[#5e5a54]">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
