import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "orange" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const baseStyle =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors";

  const variants = {
    default:
      "bg-[#eae3d5] dark:bg-[#252320] text-[#181715] dark:text-[#f3efe6] border border-[#dcd3c3] dark:border-[#38342e]",
    orange:
      "bg-[#e8542c]/10 text-[#e8542c] dark:text-[#f05a28] border border-[#e8542c]/30",
    outline:
      "border border-[#dcd3c3] dark:border-[#38342e] text-[#5e5a54] dark:text-[#a39e93]",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
