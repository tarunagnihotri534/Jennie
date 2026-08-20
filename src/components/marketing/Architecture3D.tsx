"use client";

import React, { useState } from "react";
import {
  Terminal,
  GitBranch,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  Database,
  CheckCircle2,
  Code,
  Sparkles,
  Bot,
} from "lucide-react";

interface LayerData {
  id: string;
  step: string;
  name: string;
  tagline: string;
  color: string;
  glowColor: string;
  badge: string;
  icon: React.ElementType;
  nodes: { label: string; detail: string; icon: React.ElementType }[];
  description: string;
  codeSnippet: string;
}

const LAYERS: LayerData[] = [
  {
    id: "layer-1",
    step: "01",
    name: "TRIGGER & INPUT LAYER",
    tagline: "Ingests code diffs from CLI, CI/CD, or GitHub PR triggers",
    color: "from-amber-500 to-orange-600",
    glowColor: "rgba(232, 84, 44, 0.4)",
    badge: "INPUT PIPELINE",
    icon: Terminal,
    nodes: [
      { label: "Local CLI", detail: "npx @tarunagnihotri534/jennie review", icon: Terminal },
      { label: "GitHub Action", detail: ".github/workflows/jennie-review.yml", icon: GitBranch },
      { label: "PR Comment", detail: "/jennie review trigger tag", icon: Code },
    ],
    description:
      "Captures uncommitted git diffs locally or pull request payloads in CI. Normalizes file paths, ignores vendor lockfiles, and establishes the review target branch.",
    codeSnippet: `// 1. Ingest Execution Target
const diff = await getGitDiff({ base: "main", depth: "thorough" });
const targetFiles = parseModifiedFiles(diff);`,
  },
  {
    id: "layer-2",
    step: "02",
    name: "AST & CONTEXT ENGINE",
    tagline: "Explores call graphs, cross-file imports & repository guidelines",
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    badge: "AST DISCOVERY",
    icon: Cpu,
    nodes: [
      { label: "AST Explorer", detail: "Traces cross-file call trees", icon: Cpu },
      { label: "Rules Guard", detail: "Parses .jennie/rules.md", icon: ShieldCheck },
      { label: "Secret Scanner", detail: "Regex check for API key leaks", icon: Zap },
    ],
    description:
      "Inspects modified abstract syntax trees beyond modified lines. Verifies interface contracts across imports and enforces custom team styling constraints.",
    codeSnippet: `// 2. Deep AST Call Graph Traversal
const callTree = astGrep.search(targetFiles);
const rules = parseRulesFile(".jennie/rules.md");
const secretsFound = scanForHardcodedSecrets(diff);`,
  },
  {
    id: "layer-3",
    step: "03",
    name: "AGENT REASONING CORE",
    tagline: "Model Context Protocol client + LLM reasoning loop",
    color: "from-purple-500 to-indigo-600",
    glowColor: "rgba(168, 85, 247, 0.4)",
    badge: "MCP + LLM BRAIN",
    icon: Bot,
    nodes: [
      { label: "MCP Client", detail: "Connects DB & Sentry servers", icon: Database },
      { label: "Claude 3.7", detail: "Anthropic reasoning model", icon: Sparkles },
      { label: "GPT-4o / o3", detail: "OpenAI multi-provider model", icon: Bot },
    ],
    description:
      "Executes autonomous agent loop. Queries Model Context Protocol (MCP) servers for live DB schemas or error logs, feeding context into LLM reasoning.",
    codeSnippet: `// 3. MCP Context Injection & LLM Reasoning
const mcpContext = await mcpClient.queryRuntimeContext();
const review = await llm.generateReview({
  diff,
  callTree,
  rules,
  mcpContext
});`,
  },
  {
    id: "layer-4",
    step: "04",
    name: "OUTPUT & DISPATCH",
    tagline: "Outputs ANSI terminal reports and GitHub PR inline comments",
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
    badge: "REPORT DISPATCH",
    icon: CheckCircle2,
    nodes: [
      { label: "Terminal Output", detail: "ANSI formatted color summary", icon: Terminal },
      { label: "PR Commenter", detail: "Posts GitHub inline feedback", icon: Code },
      { label: "Security Audit", detail: "Generates vulnerability report", icon: ShieldCheck },
    ],
    description:
      "Formats human-quality review suggestions. In local CLI mode, prints rich ANSI color logs. In CI mode, posts inline code line comments directly on GitHub PRs.",
    codeSnippet: `// 4. Output Feedback Dispatch
if (isCI) {
  await githubAPI.postInlineComments(review.suggestions);
} else {
  console.log(formatTerminalReport(review));
}`,
  },
];

export default function Architecture3D() {
  const [activeLayerId, setActiveLayerId] = useState<string>("layer-2");
  const [is3DTilted, setIs3DTilted] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"overview" | "code">("overview");

  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[1];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0d0c0a] text-[#f3efe6]">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#e8542c]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8542c]/10 border border-[#e8542c]/30 text-[#e8542c] font-mono text-xs uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D SYSTEM ARCHITECTURE</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight font-extrabold text-white">
            HOW <span className="text-[#e8542c]">JENNIE</span> WORKS UNDER THE HOOD
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#a39e93] font-sans leading-relaxed">
            Click through the 4-layer 3D architectural pipeline to see how raw git diffs are transformed into deep, senior-engineer quality code reviews.
          </p>

          {/* Controls Bar */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setIs3DTilted(!is3DTilted)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 border ${
                is3DTilted
                  ? "bg-[#e8542c] text-white border-[#e8542c] shadow-lg shadow-[#e8542c]/20"
                  : "bg-[#1c1a17] text-[#a39e93] border-[#2e2b26] hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{is3DTilted ? "3D ISOMETRIC VIEW" : "FLAT 2D VIEW"}</span>
            </button>
          </div>
        </div>

        {/* 3D Visualizer & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Stack Stage (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[480px] relative py-8">
            <div
              className={`w-full max-w-xl transition-all duration-700 ease-out space-y-4 ${
                is3DTilted
                  ? "[transform:perspective(1200px)_rotateX(28deg)_rotateY(-12deg)_rotateZ(2deg)] sm:[transform:perspective(1200px)_rotateX(32deg)_rotateY(-16deg)_rotateZ(4deg)] hover:[transform:perspective(1200px)_rotateX(24deg)_rotateY(-10deg)]"
                  : ""
              }`}
            >
              {LAYERS.map((layer, index) => {
                const isActive = layer.id === activeLayerId;
                const LayerIcon = layer.icon;

                return (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayerId(layer.id)}
                    style={{
                      boxShadow: isActive
                        ? `0 20px 40px -10px ${layer.glowColor}, 0 0 20px ${layer.glowColor}`
                        : "none",
                      transform: isActive
                        ? is3DTilted
                          ? "translateZ(30px) translateY(-8px)"
                          : "scale(1.02)"
                        : "translateZ(0px)",
                    }}
                    className={`group cursor-pointer relative rounded-2xl p-5 border transition-all duration-300 backdrop-blur-md ${
                      isActive
                        ? "bg-[#1f1c18]/90 border-[#e8542c] text-white"
                        : "bg-[#141310]/70 border-[#2b2722] hover:border-[#4d463d] text-[#a39e93]"
                    }`}
                  >
                    {/* Layer Pulse Connector Line */}
                    {index < LAYERS.length - 1 && (
                      <div className="absolute -bottom-4 left-10 w-0.5 h-4 bg-gradient-to-b from-[#e8542c]/60 to-transparent pointer-events-none z-0" />
                    )}

                    <div className="flex items-center justify-between gap-4">
                      {/* Left Badge & Title */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 bg-gradient-to-br ${layer.color} text-white shadow-md`}
                        >
                          <LayerIcon className="w-5 h-5" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold tracking-widest text-[#e8542c] uppercase">
                              STAGE {layer.step}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                              {layer.badge}
                            </span>
                          </div>
                          <h3 className="font-headline text-lg uppercase font-bold text-white tracking-tight">
                            {layer.name}
                          </h3>
                        </div>
                      </div>

                      {/* Right Indicator Arrow */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full transition-all ${
                            isActive
                              ? "bg-[#e8542c] animate-pulse ring-4 ring-[#e8542c]/30"
                              : "bg-[#2e2b26]"
                          }`}
                        />
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isActive ? "text-[#e8542c] translate-x-1" : "text-[#4d463d]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Node Cards Row inside Layer */}
                    <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-2">
                      {layer.nodes.map((node, nIdx) => {
                        const NodeIcon = node.icon;
                        return (
                          <div
                            key={nIdx}
                            className={`p-2 rounded-lg text-left text-xs font-mono transition-colors ${
                              isActive
                                ? "bg-white/5 border border-white/10 text-white"
                                : "bg-black/30 text-[#88837a]"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 font-semibold">
                              <NodeIcon className="w-3 h-3 text-[#e8542c]" />
                              <span className="truncate">{node.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspector Detail Card (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#141310] border border-[#2e2b26] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-[#2e2b26]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#e8542c] uppercase tracking-wider">
                    STAGE {activeLayer.step} INSPECTOR
                  </span>
                  <h3 className="font-headline text-2xl uppercase tracking-tight font-extrabold text-white mt-1">
                    {activeLayer.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-[#1c1a17] p-1 rounded-lg border border-[#2e2b26]">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      activeTab === "overview"
                        ? "bg-[#e8542c] text-white font-bold"
                        : "text-[#a39e93] hover:text-white"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      activeTab === "code"
                        ? "bg-[#e8542c] text-white font-bold"
                        : "text-[#a39e93] hover:text-white"
                    }`}
                  >
                    Code Logic
                  </button>
                </div>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="mt-6 space-y-6">
                  <p className="text-sm font-sans text-[#a39e93] leading-relaxed">
                    {activeLayer.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-headline text-xs uppercase tracking-wider text-white font-bold">
                      ACTIVE COMPONENT NODES
                    </h4>
                    <div className="space-y-2">
                      {activeLayer.nodes.map((node, i) => {
                        const NIcon = node.icon;
                        return (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-[#1c1a17] border border-[#2e2b26] flex items-center justify-between text-xs font-mono"
                          >
                            <div className="flex items-center gap-2 text-white">
                              <NIcon className="w-4 h-4 text-[#e8542c]" />
                              <span className="font-bold">{node.label}</span>
                            </div>
                            <span className="text-[#88837a] text-[11px]">
                              {node.detail}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Code Logic */}
              {activeTab === "code" && (
                <div className="mt-6 space-y-4">
                  <span className="text-xs font-mono text-[#88837a] block">
                    Underlying JavaScript execution snippet:
                  </span>
                  <div className="rounded-xl bg-[#090807] border border-[#2e2b26] p-4 text-xs font-mono overflow-x-auto text-[#e2ded6]">
                    <pre className="whitespace-pre-wrap leading-relaxed text-[#e8542c]">
                      {activeLayer.codeSnippet}
                    </pre>
                  </div>
                </div>
              )}

              {/* Footer Tip */}
              <div className="mt-8 pt-6 border-t border-[#2e2b26] flex items-center justify-between text-xs font-mono text-[#88837a]">
                <span>Pipeline Stage: {activeLayer.step} / 04</span>
                <span className="text-[#e8542c]">Status: Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
