"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Terminal,
  Shield,
  Cpu,
  ChevronRight,
  ArrowLeft,
  FileText,
  Search,
  Check,
  Copy,
  Layers,
  Wrench,
  Sparkles,
} from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import { PRODUCT_CONFIG } from "@/lib/content";

interface DocItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  codeSnippet?: {
    code: string;
    language: string;
    filename?: string;
  };
  content: string[];
}

const DOCS_LIST: DocItem[] = [
  {
    slug: "setup",
    title: "Setup & Quickstart Guide",
    category: "GETTING STARTED",
    description: "Install Jennie locally via npx or integrate into your GitHub Actions workflow in 60 seconds.",
    codeSnippet: {
      code: `$ npx jennie review --base main`,
      language: "bash",
      filename: "Terminal",
    },
    content: [
      "Jennie is an autonomous AI code review agent that inspects pull requests, traces function calls across files, flags security vulnerabilities, and leaves human-quality inline comments.",
      "Run Jennie locally in your project root to review staged or uncommitted git changes before opening a PR.",
      "Add the workflow file to .github/workflows/jennie-review.yml to automatically review all incoming pull requests.",
    ],
  },
  {
    slug: "action-options",
    title: "GitHub Action Options & Parameters",
    category: "CONFIGURATION",
    description: "Configure action parameters, review depth levels, max inline comments, and path exclusion globs.",
    codeSnippet: {
      code: `npx jennie review --ci --base main --depth thorough --max-comments 15`,
      language: "bash",
      filename: "GitHub Action CLI",
    },
    content: [
      "Tailor review depth from quick sanity checks to thorough architectural inspections.",
      "Use --max-comments to cap the number of inline suggestions posted per pull request.",
      "Use --ignore to skip generated lockfiles, minified bundles, or vendor directories.",
    ],
  },
  {
    slug: "ai-provider-config",
    title: "AI Provider Configuration",
    category: "CONFIGURATION",
    description: "Provider-agnostic setup: Anthropic Claude 3.5/3.7, OpenAI o3/gpt-4o, OpenRouter, and Cloudflare Workers AI.",
    codeSnippet: {
      code: `export ANTHROPIC_API_KEY="sk-ant-api03-..."\nexport JENNIE_MODEL="claude-3-7-sonnet"`,
      language: "bash",
      filename: ".env",
    },
    content: [
      "Bring your own API keys. No code diffs are stored or used for model training.",
      "Native support for Anthropic Claude 3.7 Sonnet, OpenAI gpt-4o/o3-mini, and OpenRouter unified API.",
    ],
  },
  {
    slug: "mcp",
    title: "Model Context Protocol (MCP) Integration",
    category: "ADVANCED FEATURES",
    description: "Connect MCP servers to give Jennie live context from databases, Sentry error logs, and Playwright tests.",
    codeSnippet: {
      code: `npx jennie review --mcp ./mcp-config.json`,
      language: "bash",
      filename: "Terminal",
    },
    content: [
      "Jennie includes a built-in Model Context Protocol (MCP) client.",
      "Wire in database schemas, APM observability logs, and browser automation tools to inspect live runtime context.",
    ],
  },
  {
    slug: "rules-files",
    title: "Project Rules & Style Guidelines (.jennie/rules.md)",
    category: "CONFIGURATION",
    description: "Enforce custom architecture guidelines and security constraints using repository rules markdown files.",
    codeSnippet: {
      code: `# .jennie/rules.md\n- All exported API handlers must validate inputs using Zod.\n- Do NOT commit AWS or Stripe secret keys.`,
      language: "markdown",
      filename: ".jennie/rules.md",
    },
    content: [
      "Create a .jennie/rules.md file in your repository to enforce team-specific standards.",
      "Jennie automatically parses rules.md during reviews and flags any violations inline on GitHub PRs.",
    ],
  },
  {
    slug: "custom-instructions-example",
    title: "Custom Agent Prompt Tailoring",
    category: "CONFIGURATION",
    description: "Tailor Jennie's persona and focus areas to match your team's code review style.",
    codeSnippet: {
      code: `npx jennie review --instructions ./custom-prompt.md`,
      language: "bash",
      filename: "Terminal",
    },
    content: [
      "Pass custom prompt markdown files to customize how Jennie critiques code changes.",
      "Enforce specific team idioms, TypeScript strictness, or performance requirements.",
    ],
  },
  {
    slug: "qa-features",
    title: "QA Features & Automated Testing",
    category: "QA & TESTING",
    description: "Automated QA capabilities that run check suites, verify test coverage, and catch subtle regressions.",
    content: [
      "Analyzes call trees to find unintended side effects in untested modules.",
      "Warns when new exported utility functions lack corresponding unit test cases.",
    ],
  },
  {
    slug: "ambient-qa",
    title: "Ambient QA & Background Auditing",
    category: "QA & TESTING",
    description: "Run Jennie as a continuous background daemon during local development for instant code feedback.",
    codeSnippet: {
      code: `$ npx jennie qa --ambient`,
      language: "bash",
      filename: "Terminal",
    },
    content: [
      "Monitors local file changes and outputs instant feedback in your terminal before you git commit.",
    ],
  },
  {
    slug: "cross-repo-qa",
    title: "Cross-Repository QA & Microservices",
    category: "QA & TESTING",
    description: "Cross-reference multiple repositories simultaneously for breaking microservice API changes.",
    codeSnippet: {
      code: `npx jennie review --repos org/backend,org/frontend,org/shared-types`,
      language: "bash",
      filename: "Terminal",
    },
    content: [
      "Enables the agent to verify breaking API changes across frontend and backend pull requests simultaneously.",
    ],
  },
  {
    slug: "subagent-tool",
    title: "Subagent Tools & Autonomous Loop",
    category: "ADVANCED FEATURES",
    description: "Multi-agent loop powered by specialized tools: ast_search, ripgrep, file_tree, and pr_commenter.",
    content: [
      "Uses ast-grep to search code structures symbolically across files.",
      "Rapidly locates keyword usages and recursively inspects surrounding context.",
    ],
  },
  {
    slug: "flue-migration",
    title: "Flue Migration Guide",
    category: "MIGRATION",
    description: "Migrating from legacy static CLI review scripts to the Jennie Agent on Flue v1.0.",
    content: [
      "Upgrades your workflow from rigid regex matching to full LLM agentic reasoning.",
    ],
  },
  {
    slug: "tag-jennie",
    title: "PR Comment Trigger Tags (/jennie review)",
    category: "GETTING STARTED",
    description: "Trigger on-demand code reviews directly inside GitHub PR comments.",
    codeSnippet: {
      code: `User: /jennie review --depth thorough`,
      language: "text",
      filename: "GitHub PR Comment",
    },
    content: [
      "Leave a comment on any open GitHub PR to trigger an instant on-demand AI review.",
    ],
  },
];

export default function DocsPage() {
  const [activeSlug, setActiveSlug] = useState<string>("setup");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeDoc = DOCS_LIST.find((d) => d.slug === activeSlug) || DOCS_LIST[0];

  const categories = Array.from(new Set(DOCS_LIST.map((d) => d.category)));

  const filteredDocs = DOCS_LIST.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Top Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5e5a54] dark:text-[#a39e93] hover:text-[#e8542c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO LANDING PAGE</span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs font-mono bg-[#eae3d5] dark:bg-[#1c1a17] border border-[#dcd3c3] dark:border-[#2e2b26] text-[#181715] dark:text-[#f3efe6] focus:outline-none focus:ring-2 focus:ring-[#e8542c]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 border-r border-[#dcd3c3] dark:border-[#2e2b26] pr-6 space-y-6">
          {categories.map((cat) => {
            const catDocs = filteredDocs.filter((d) => d.category === cat);
            if (catDocs.length === 0) return null;

            return (
              <div key={cat}>
                <h3 className="font-headline text-xs uppercase tracking-wider text-[#7a746b] dark:text-[#88837a] mb-3">
                  {cat}
                </h3>
                <ul className="space-y-1.5 text-xs font-mono">
                  {catDocs.map((doc) => {
                    const isActive = doc.slug === activeSlug;

                    return (
                      <li key={doc.slug}>
                        <button
                          onClick={() => setActiveSlug(doc.slug)}
                          className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all ${
                            isActive
                              ? "bg-[#e8542c] text-white font-bold shadow-sm"
                              : "text-[#5e5a54] dark:text-[#a39e93] hover:text-[#181715] dark:hover:text-white hover:bg-[#eae3d5]/60 dark:hover:bg-[#252320]"
                          }`}
                        >
                          <span className="truncate">{doc.title}</span>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </aside>

        {/* Main Doc Viewer */}
        <main className="lg:col-span-3 space-y-8">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#e8542c] dark:text-[#f05a28] px-2.5 py-1 rounded-full bg-[#e8542c]/10 border border-[#e8542c]/20 inline-block mb-3">
              {activeDoc.category}
            </span>
            <h1 className="font-headline text-2xl sm:text-4xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
              {activeDoc.title}
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#5e5a54] dark:text-[#a39e93] leading-relaxed">
              {activeDoc.description}
            </p>
          </div>

          {/* Interactive Code Block */}
          {activeDoc.codeSnippet && (
            <div className="space-y-3">
              <h3 className="font-headline text-xs uppercase tracking-wider text-[#181715] dark:text-[#f3efe6] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#e8542c]" />
                QUICK EXAMPLE COMMAND
              </h3>
              <CodeBlock
                code={activeDoc.codeSnippet.code}
                language={activeDoc.codeSnippet.language}
                filename={activeDoc.codeSnippet.filename}
              />
            </div>
          )}

          {/* Detailed Content Paragraphs */}
          <div className="space-y-4 p-6 rounded-2xl bg-[#fbf8f3] dark:bg-[#181715] border border-[#dcd3c3] dark:border-[#2e2b26]">
            <h3 className="font-headline text-base uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
              OVERVIEW & KEY CONCEPTS
            </h3>
            {activeDoc.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-xs md:text-sm text-[#5e5a54] dark:text-[#a39e93] leading-relaxed font-sans"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quick Nav Footer Links */}
          <div className="pt-6 border-t border-[#dcd3c3] dark:border-[#2e2b26] flex items-center justify-between text-xs font-mono text-[#5e5a54] dark:text-[#a39e93]">
            <span>Active Doc: {activeDoc.slug}.md</span>
            <a
              href={`${PRODUCT_CONFIG.repoUrl}/tree/main/docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e8542c] transition-colors"
            >
              View docs/ folder on GitHub →
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
