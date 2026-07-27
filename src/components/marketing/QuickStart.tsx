"use client";

import { useState } from "react";
import { GitBranch, Terminal, MessageSquareCode } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function QuickStart() {
  const [activeTab, setActiveTab] = useState<"github" | "local" | "pr">("github");

  const tabs = [
    {
      id: "github" as const,
      label: "GitHub Action",
      icon: GitBranch,
      data: PRODUCT_CONFIG.quickstart.githubAction,
    },
    {
      id: "local" as const,
      label: "Local CLI",
      icon: Terminal,
      data: PRODUCT_CONFIG.quickstart.localCli,
    },
    {
      id: "pr" as const,
      label: "On-Demand PR Trigger",
      icon: MessageSquareCode,
      data: PRODUCT_CONFIG.quickstart.prTrigger,
    },
  ];

  const currentData = tabs.find((t) => t.id === activeTab)?.data;

  return (
    <section id="quickstart" className="py-20 md:py-28 bg-[#eae3d5]/50 dark:bg-[#181715]/50 border-y border-[#e2dacd] dark:border-[#2d2b27]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#e8542c] dark:text-[#f05a28] px-3 py-1 rounded-full bg-[#e8542c]/10 border border-[#e8542c]/20 inline-block mb-4">
            QUICK START IN 60 SECONDS
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
            DEPLOY OR RUN LOCALLY
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#5e5a54] dark:text-[#a39e93]">
            Choose your workflow integration strategy below.
          </p>
        </div>

        {/* Tabs Control */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-mono font-semibold transition-all focus:outline-none ${
                  isActive
                    ? "bg-[#e8542c] text-white shadow-md scale-105"
                    : "bg-[#eae3d5] dark:bg-[#252320] text-[#5e5a54] dark:text-[#a39e93] border border-[#dcd3c3] dark:border-[#38342e] hover:border-[#e8542c]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code View Showcase */}
        {currentData && (
          <div className="max-w-4xl mx-auto">
            <CodeBlock
              code={currentData.code}
              language={currentData.language}
              filename={currentData.filename}
            />
          </div>
        )}

      </div>
    </section>
  );
}
