import Link from "next/link";
import { BookOpen, Terminal, Shield, Cpu, ChevronRight, ArrowLeft } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";
import { PRODUCT_CONFIG } from "@/lib/content";

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Top Breadcrumb Nav */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5e5a54] dark:text-[#a39e93] hover:text-[#e8542c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO LANDING PAGE</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 border-r border-[#dcd3c3] dark:border-[#2d2b27] pr-6 space-y-6">
          <div>
            <h3 className="font-headline text-sm uppercase tracking-wider text-[#181715] dark:text-[#f3efe6] mb-3">
              GETTING STARTED
            </h3>
            <ul className="space-y-2 text-xs font-mono text-[#5e5a54] dark:text-[#a39e93]">
              <li className="text-[#e8542c] font-bold flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5" /> Quick Installation
              </li>
              <li className="hover:text-[#e8542c] cursor-pointer pl-4">Architecture Overview</li>
              <li className="hover:text-[#e8542c] cursor-pointer pl-4">Environment Variables</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm uppercase tracking-wider text-[#181715] dark:text-[#f3efe6] mb-3">
              INTEGRATIONS
            </h3>
            <ul className="space-y-2 text-xs font-mono text-[#5e5a54] dark:text-[#a39e93]">
              <li className="hover:text-[#e8542c] cursor-pointer">GitHub Actions Workflow</li>
              <li className="hover:text-[#e8542c] cursor-pointer">GitLab CI Pipeline</li>
              <li className="hover:text-[#e8542c] cursor-pointer">Local CLI Usage</li>
              <li className="hover:text-[#e8542c] cursor-pointer">MCP Server Plugins</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-sm uppercase tracking-wider text-[#181715] dark:text-[#f3efe6] mb-3">
              PROVIDERS
            </h3>
            <ul className="space-y-2 text-xs font-mono text-[#5e5a54] dark:text-[#a39e93]">
              <li className="hover:text-[#e8542c] cursor-pointer">Anthropic Claude</li>
              <li className="hover:text-[#e8542c] cursor-pointer">OpenAI GPT-4o / o3</li>
              <li className="hover:text-[#e8542c] cursor-pointer">Cloudflare Workers AI</li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#e8542c]/10 text-[#e8542c] border border-[#e8542c]/20 mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>DOCUMENTATION STUB</span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#181715] dark:text-[#f3efe6]">
              {PRODUCT_CONFIG.name} DOCUMENTATION
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#5e5a54] dark:text-[#a39e93] leading-relaxed">
              Welcome to the official developer documentation for {PRODUCT_CONFIG.name}. Learn how to configure your AI review agent, set up CI/CD pipelines, and connect Model Context Protocol tools.
            </p>
          </div>

          {/* Quick Install Guide */}
          <div className="space-y-4 p-6 rounded-2xl bg-[#eae3d5]/80 dark:bg-[#1c1a17]/80 border border-[#dcd3c3] dark:border-[#2e2b26]">
            <h2 className="font-headline text-xl uppercase tracking-tight flex items-center gap-2 text-[#181715] dark:text-[#f3efe6]">
              <Terminal className="w-5 h-5 text-[#e8542c]" />
              1. SCAFFOLD CONFIGURATION
            </h2>
            <p className="text-sm text-[#5e5a54] dark:text-[#a39e93]">
              Run the interactive initializer script inside your project workspace root:
            </p>
            <CodeBlock
              code={PRODUCT_CONFIG.initCommand}
              language="bash"
              filename="Terminal"
            />
          </div>

          {/* Core Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-[#dcd3c3] dark:border-[#2e2b26] bg-[#eae3d5]/50 dark:bg-[#1c1a17]/50">
              <Shield className="w-6 h-6 text-[#e8542c] mb-3" />
              <h3 className="font-headline text-lg uppercase text-[#181715] dark:text-[#f3efe6] mb-2">
                SECURITY & PRIVACY
              </h3>
              <p className="text-xs text-[#5e5a54] dark:text-[#a39e93] leading-relaxed">
                Code diffs are sent directly to your configured provider API (Anthropic, OpenAI) via TLS. No code is stored or used for model training.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#dcd3c3] dark:border-[#2e2b26] bg-[#eae3d5]/50 dark:bg-[#1c1a17]/50">
              <Cpu className="w-6 h-6 text-[#e8542c] mb-3" />
              <h3 className="font-headline text-lg uppercase text-[#181715] dark:text-[#f3efe6] mb-2">
                MCP TOOL EXPANSION
              </h3>
              <p className="text-xs text-[#5e5a54] dark:text-[#a39e93] leading-relaxed">
                Extend review agent capability using standard MCP servers. Read live database schemas, run AST checks, or pull runtime logs.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
