import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StampProps {
  text: string;
  className?: string;
}

export default function Stamp({ text, className = "" }: StampProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md border-2 border-dashed border-[#e8542c] text-[#e8542c] bg-[#e8542c]/5 font-mono text-xs md:text-sm font-bold uppercase tracking-wider shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
    >
      <CheckCircle2 className="w-4 h-4 text-[#e8542c]" />
      <span>{text}</span>
    </div>
  );
}
