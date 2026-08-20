"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  GitBranch,
  Cpu,
  ShieldCheck,
  Zap,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Database,
  ArrowDown,
  Sparkles,
  Layers,
  Code2,
  FileCode,
} from "lucide-react";

interface StepDetail {
  id: number;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  accentHex: string;
  icon: React.ElementType;
  keyPoints: string[];
  mockConsoleOutput: string[];
  codeSnippet: string;
  liveStats: { label: string; value: string }[];
}

const FLOW_STEPS: StepDetail[] = [
  {
    id: 1,
    slug: "trigger",
    tag: "STAGE 01",
    title: "DIFF INGESTION & TRIGGER",
    subtitle: "Captures local git diffs, PR webhooks, or ambient QA file edits",
    badge: "INPUT LAYER",
    color: "from-[#e8542c] to-amber-500",
    accentHex: "#e8542c",
    icon: Terminal,
    keyPoints: [
      "Normalizes raw git diffs across staged and unstaged branches.",
      "Filters out lockfiles (package-lock.json), minified assets, and build directories.",
      "Detects PR trigger commands like '/jennie review' in GitHub comments.",
    ],
    mockConsoleOutput: [
      "⚓ Jennie v1.0.0 — Execution Triggered",
      "🔍 Scanning git diff against target base: 'main'",
      "✓ Detected 4 modified files across 2 commits",
      "• src/components/marketing/Hero.tsx",
      "• src/lib/content.ts",
      "• bin/jennie.js",
      "• package.json",
    ],
    codeSnippet: `// Step 1: Git Diff Ingestion Engine
const gitDiff = await execSync("git diff main...HEAD", { encoding: "utf8" });
const targetFiles = filterIgnoredFiles(gitDiff, [
  "dist/**",
  "build/**",
  "package-lock.json"
]);`,
    liveStats: [
      { label: "Target Branch", value: "main" },
      { label: "Modified Files", value: "4 files" },
      { label: "Scan Mode", value: "CLI / CI Mode" },
    ],
  },
  {
    id: 2,
    slug: "ast-analysis",
    tag: "STAGE 02",
    title: "AST READ-THROUGH & RULES GUARD",
    subtitle: "Traces cross-file call trees & enforces team guidelines (.jennie/rules.md)",
    badge: "AST DISCOVERY",
    color: "from-cyan-500 to-blue-600",
    accentHex: "#06b6d4",
    icon: Cpu,
    keyPoints: [
      "Explores AST call graphs beyond modified git lines to prevent breaking changes.",
      "Parses custom repository guidelines (.jennie/rules.md) for style and architecture rules.",
      "Static regex security audit to catch leaked API keys, tokens, or credentials.",
    ],
    mockConsoleOutput: [
      "🧠 Building Abstract Syntax Tree (AST) call graphs...",
      "📜 Loaded custom repository guidelines: .jennie/rules.md",
      "🛡️ Static Security Check: 0 hardcoded secrets or API keys found",
      "✓ Verified 12 imported interface contracts across 3 cross-file modules",
    ],
    codeSnippet: `// Step 2: AST Traversal & Rules Enforcement
const astTree = parseAST(targetFiles);
const rules = parseMarkdownRules(".jennie/rules.md");
const securityWarnings = scanForSecretPattern(gitDiff);`,
    liveStats: [
      { label: "AST Nodes Explored", value: "1,420 nodes" },
      { label: "Rules File", value: ".jennie/rules.md" },
      { label: "Secrets Leak Check", value: "Passed (0 leaks)" },
    ],
  },
  {
    id: 3,
    slug: "mcp-reasoning",
    tag: "STAGE 03",
    title: "MCP PROTOCOL & LLM REASONING",
    subtitle: "Queries Model Context Protocol servers + Anthropic / OpenAI reasoning loop",
    badge: "AGENT REASONING",
    color: "from-purple-500 to-indigo-600",
    accentHex: "#a855f7",
    icon: Bot,
    keyPoints: [
      "Native Model Context Protocol (MCP) client connects live DB schemas and Sentry APM logs.",
      "Provider agnostic: Claude 3.7 Sonnet, OpenAI gpt-4o/o3-mini, or OpenRouter.",
      "Generates human-quality suggestions with exact code diff replacements.",
    ],
    mockConsoleOutput: [
      "🔌 Model Context Protocol (MCP): Connected to database schema server",
      "🤖 Invoking LLM Reasoning Model: claude-3-7-sonnet-20250219",
      "⚡ Analyzing performance bottlenecks and potential unhandled edge cases...",
      "✓ Reasoning complete: Generated 2 focused inline review suggestions",
    ],
    codeSnippet: `// Step 3: MCP Query & Agent Reasoning Loop
const mcpData = await mcpClient.fetchRuntimeContext();
const reviewResult = await aiProvider.generateReview({
  model: "claude-3-7-sonnet-20250219",
  diff: gitDiff,
  astTree,
  rules,
  mcpContext: mcpData
});`,
    liveStats: [
      { label: "AI Provider", value: "Anthropic / OpenAI" },
      { label: "Model", value: "Claude 3.7 Sonnet" },
      { label: "MCP Protocol", value: "Connected" },
    ],
  },
  {
    id: 4,
    slug: "dispatch",
    tag: "STAGE 04",
    title: "ACTIONABLE REPORT DISPATCH",
    subtitle: "Formats ANSI color terminal summaries & posts GitHub PR inline comments",
    badge: "FINAL DISPATCH",
    color: "from-emerald-500 to-teal-600",
    accentHex: "#10b981",
    icon: CheckCircle2,
    keyPoints: [
      "In CLI mode: Displays rich color-coded ANSI terminal summaries.",
      "In CI mode: Posts inline code comments directly on modified lines in GitHub PRs.",
      "Provides actionable fix snippets that developers can merge in one click.",
    ],
    mockConsoleOutput: [
      "==================== JENNIE AI REVIEW SUMMARY ====================",
      "🛡️ Security Audit: 0 vulnerability vulnerabilities found.",
      "✨ Inline Comments Posted: 2 optimization suggestions on PR #42",
      "Status: CLEARED TO MERGE",
      "==================================================================",
    ],
    codeSnippet: `// Step 4: Dispatch Review Suggestions
if (opts.isCI) {
  await githubAPI.postInlinePRComments(reviewResult.suggestions);
} else {
  console.log(formatANSITerminalReport(reviewResult));
}`,
    liveStats: [
      { label: "Inline Suggestions", value: "2 posted" },
      { label: "Security Status", value: "Cleared to Merge" },
      { label: "Execution Time", value: "1.42 seconds" },
    ],
  },
];

export default function VerticalArchitectureFlow() {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"logs" | "code">("logs");

  // Automated Step Simulation Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStepId((prev) => (prev >= FLOW_STEPS.length ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStep = FLOW_STEPS.find((s) => s.id === activeStepId) || FLOW_STEPS[0];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090807] text-[#f3efe6] overflow-hidden">
      {/* Ambient Radial Glowing Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#e8542c]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8542c]/10 border border-[#e8542c]/30 text-[#e8542c] font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>VERTICAL ARCHITECTURE FLOW DEMO</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl uppercase tracking-tight font-extrabold text-white">
            THE <span className="text-[#e8542c]">JENNIE</span> REASONING PIPELINE
          </h2>

          <p className="text-sm sm:text-base text-[#a39e93] font-sans leading-relaxed">
            Follow the live vertical sequence step-by-step to see how code changes move through AST parsing, MCP context injection, and AI reasoning.
          </p>

          {/* Interactive Player Controls */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-5 py-2 rounded-full font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                isPlaying
                  ? "bg-amber-500 text-black shadow-amber-500/20 ring-2 ring-amber-400/40"
                  : "bg-[#e8542c] text-white hover:bg-[#f05a28] shadow-[#e8542c]/30"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> PAUSE LIVE DEMO
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> PLAY AUTOMATED DEMO SIMULATION
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveStepId(1);
              }}
              className="px-4 py-2 rounded-full font-mono text-xs font-semibold bg-[#1a1815] border border-[#2e2b26] text-[#a39e93] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Main Grid: Left Vertical Timeline + Right Live Simulation Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Vertical Timeline Steps (7 Cols) */}
          <div className="lg:col-span-7 relative">
            {/* Continuous Vertical Glowing Line */}
            <div className="absolute left-6 top-8 bottom-8 w-1 bg-[#1f1c18] rounded-full z-0 overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-[#e8542c] via-cyan-400 via-purple-500 to-emerald-400"
                initial={{ height: "0%" }}
                animate={{
                  height: `${(activeStepId / FLOW_STEPS.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Vertical Step Cards List */}
            <div className="space-y-6 relative z-10">
              {FLOW_STEPS.map((step) => {
                const isActive = step.id === activeStepId;
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStepId(step.id);
                    }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`group cursor-pointer rounded-2xl p-6 border transition-all duration-300 relative backdrop-blur-md ${
                      isActive
                        ? "bg-[#181613] border-[#e8542c] shadow-2xl shadow-[#e8542c]/10"
                        : "bg-[#11100e]/80 border-[#26231e] hover:border-[#423d34] text-[#a39e93]"
                    }`}
                  >
                    {/* Active Step Indicator Pulse */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 rounded-2xl border-2 border-[#e8542c] pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}

                    <div className="flex items-start gap-5">
                      {/* Left Number Circle */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-headline font-bold text-lg transition-transform group-hover:scale-110 shadow-md ${
                          isActive
                            ? `bg-gradient-to-br ${step.color} text-white ring-4 ring-[#e8542c]/20`
                            : "bg-[#1c1a17] border border-[#2e2b26] text-[#7a746b]"
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>

                      {/* Right Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
                                isActive ? "text-[#e8542c]" : "text-[#7a746b]"
                              }`}
                            >
                              {step.tag}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                              {step.badge}
                            </span>
                          </div>

                          {isActive && (
                            <span className="text-[11px] font-mono text-[#e8542c] flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-[#e8542c] animate-ping" />
                              ACTIVE STAGE
                            </span>
                          )}
                        </div>

                        <h3 className="font-headline text-xl uppercase font-bold text-white tracking-tight">
                          {step.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-sans text-[#a39e93] leading-relaxed">
                          {step.subtitle}
                        </p>

                        {/* Expandable Key Points when Active */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="pt-3 border-t border-white/10 space-y-1.5"
                            >
                              {step.keyPoints.map((point, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="flex items-start gap-2 text-xs font-mono text-[#dcd7cd]"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8542c] shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Interactive Console & Code Demo (5 Cols) */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="rounded-3xl bg-[#14120f] border border-[#2e2b26] p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
              {/* Card Header & Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-[#26231e]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs font-bold text-[#a39e93] uppercase">
                    SIMULATION DEMO CONSOLE
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#1a1815] p-1 rounded-xl border border-[#2e2b26]">
                  <button
                    onClick={() => setActiveTab("logs")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "logs"
                        ? "bg-[#e8542c] text-white font-bold"
                        : "text-[#88837a] hover:text-white"
                    }`}
                  >
                    Console Output
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      activeTab === "code"
                        ? "bg-[#e8542c] text-white font-bold"
                        : "text-[#88837a] hover:text-white"
                    }`}
                  >
                    Code Logic
                  </button>
                </div>
              </div>

              {/* Active Step Badge */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#a39e93]">
                  Active Stage: <strong className="text-white">{currentStep.tag}</strong>
                </span>
                <span className="text-[#e8542c] font-bold uppercase">
                  {currentStep.badge}
                </span>
              </div>

              {/* Dynamic Console Output / Code Logic Window */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentStep.id}-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-[#090807] border border-[#26231e] p-5 font-mono text-xs min-h-[220px] flex flex-col justify-between overflow-x-auto shadow-inner"
                >
                  {activeTab === "logs" ? (
                    <div className="space-y-2 text-[#dcd7cd]">
                      {currentStep.mockConsoleOutput.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          className={`flex items-start gap-2 ${
                            line.startsWith("====================")
                              ? "text-[#e8542c] font-bold"
                              : line.startsWith("🛡️") || line.startsWith("✨")
                              ? "text-emerald-400 font-semibold"
                              : line.startsWith("🤖") || line.startsWith("🧠")
                              ? "text-cyan-400"
                              : "text-[#b0a99c]"
                          }`}
                        >
                          <span className="text-[#555046] select-none">$</span>
                          <span className="whitespace-pre-wrap">{line}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <pre className="text-[#e8542c] leading-relaxed font-mono whitespace-pre-wrap">
                      {currentStep.codeSnippet}
                    </pre>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Live Stage Metadata Stats Cards */}
              <div className="grid grid-cols-3 gap-2">
                {currentStep.liveStats.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-xl bg-[#1a1815] border border-[#26231e] text-left text-xs font-mono"
                  >
                    <span className="text-[#7a746b] text-[10px] block truncate">
                      {stat.label}
                    </span>
                    <span className="font-bold text-white truncate block mt-0.5">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Next Step Control Footer */}
              <div className="pt-4 border-t border-[#26231e] flex items-center justify-between text-xs font-mono text-[#a39e93]">
                <span>Pipeline Progress: {currentStep.id} / 4</span>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStepId((prev) => (prev >= 4 ? 1 : prev + 1));
                  }}
                  className="hover:text-[#e8542c] transition-colors flex items-center gap-1 font-bold"
                >
                  Next Stage <ArrowDown className="w-3 h-3 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
