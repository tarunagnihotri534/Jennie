"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showTerminalHeader?: boolean;
}

export default function CodeBlock({
  code,
  language = "bash",
  filename,
  showTerminalHeader = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-[#dcd3c3] dark:border-[#2e2b26] bg-[#1c1a17] text-[#f0ece1] font-mono shadow-md group">
      {/* Top Header */}
      {showTerminalHeader && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141311] border-b border-[#2d2b27] text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            {filename && (
              <span className="ml-2 font-mono text-neutral-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#e8542c]" />
                {filename}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="uppercase text-[10px] tracking-wider text-neutral-500">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              title="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
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
      )}

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-xs md:text-sm leading-relaxed">
        <pre className="whitespace-pre">
          <code>
            {code.split("\n").map((line, i) => {
              // Basic lightweight syntax coloring for standard keywords/comments
              const isComment = line.trim().startsWith("#") || line.trim().startsWith("//");
              const isCommandPrompt = line.trim().startsWith("$") || line.trim().startsWith("User:");

              return (
                <div key={i} className="table-row">
                  <span className="table-cell select-none pr-4 text-neutral-600 text-right text-[11px]">
                    {i + 1}
                  </span>
                  <span
                    className={`table-cell ${
                      isComment
                        ? "text-neutral-500 italic"
                        : isCommandPrompt
                        ? "text-[#e8542c] font-semibold"
                        : "text-[#f0ece1]"
                    }`}
                  >
                    {line}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
