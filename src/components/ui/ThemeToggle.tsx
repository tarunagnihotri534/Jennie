"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Check initial dark mode from document or user system preference
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-[#e2dacd] dark:bg-[#2d2b27] opacity-50" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-between w-13 h-7 px-1 rounded-full bg-[#e2dacd] dark:bg-[#2d2b27] border border-[#d2c7b5] dark:border-[#3e3a35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e8542c]"
    >
      <Sun className={`w-3.5 h-3.5 z-10 transition-opacity ${isDark ? "text-neutral-400 opacity-60" : "text-amber-600 opacity-100"}`} />
      <Moon className={`w-3.5 h-3.5 z-10 transition-opacity ${isDark ? "text-blue-300 opacity-100" : "text-neutral-400 opacity-60"}`} />
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#181715] shadow-sm transform transition-transform duration-200 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
