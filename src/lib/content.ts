// ============================================================================
// SINGLE-FILE REBRAND CONFIGURATION
// All product-specific names, taglines, CLI commands, links, features & copy
// are defined here as typed constants. Rebranded to JENNIE.
// ============================================================================

export interface InspectionCardData {
  id: string;
  number: string;
  tag: string;
  tagVariant: "default" | "accent";
  title: string;
  description: string;
  checks: string[];
  bgVariant: "darker" | "lifted";
  hasOrangeBorder?: boolean;
}

export const PRODUCT_CONFIG = {
  // Product Name & Branding
  name: "JENNIE", // Product wordmark
  tagline: "The Autonomous AI Code Reviewer & Security Audit Engine",
  badge: "v1.1.0 OPEN SOURCE",
  repoOrgName: "tarunagnihotri534/Jennie", // GitHub repository org/name display
  repoUrl: "https://github.com/tarunagnihotri534/Jennie", // GitHub repository URL
  npmUrl: "https://www.npmjs.com/package/@tarunagnihotri534/jennie",
  starsCount: "0", // Default GitHub star count fallback
  stampText: "CLEARED TO MERGE", // Rotated stamp badge text

  // CLI & Command Names
  cliCommand: "@tarunagnihotri534/jennie",
  initCommand: "npx @tarunagnihotri534/jennie init",
  reviewCommand: "npx @tarunagnihotri534/jennie review",
  auditCommand: "npx @tarunagnihotri534/jennie audit",
  prTriggerCommand: "/jennie review",

  // Hero Headlines & Subheadlines
  hero: {
    headlineLine1: "CODE REVIEW & AUDIT FOR",
    headlineLine2Words: ["HACKERS", "VIBE CODERS", "BUILDERS", "SHIPPERS", "INDIE DEVS"],
    subheadlinePrefix: "Bugs, leaked secrets, sensitive security points — ",
    subheadlineHighlight: "caught before they merge.",
    ctaCaptionPrefix: "SCAFFOLDS A GITHUB ACTION - OR ",
    ctaCaptionHighlight: "NPX @TARUNAGNIHOTRI534/JENNIE AUDIT",
    ctaCaptionSuffix: " LOCALLY",
  },

  // Inspection & Ethos Section
  inspection: {
    kicker: "THE INSPECTION & AUDIT ENGINE",
    titleLine1: "A REVIEWER THAT READS",
    titleLine2: "THE WHOLE PICTURE",
    subtitle: "Jennie performs deep read-throughs and whole-codebase security audits on every line you ship.",
    cards: [
      {
        id: "card-1",
        number: "01",
        tag: "CI",
        tagVariant: "default",
        title: "REVIEWS ON GITHUB",
        description: "Runs as a GitHub Action on every pull request. Reads the diff and posts focused inline comments plus a summary — like a human reviewer, minus the wait.",
        checks: [
          "Catches exposed secrets and bugs",
          "Flags slow code and edge cases",
          "Points out missing unit tests",
        ],
        bgVariant: "darker",
        hasOrangeBorder: false,
      },
      {
        id: "card-2",
        number: "02",
        tag: "AGENT",
        tagVariant: "default",
        title: "EXPLORES YOUR CODEBASE",
        description: "Built on an autonomous agent loop with AST developer tools — so it reads far beyond the diff to understand cross-file function calls.",
        checks: [
          "Follows references, not just the diff",
          "Anthropic · OpenAI · OpenRouter",
          "Open source & 100% extendable",
        ],
        bgVariant: "lifted",
        hasOrangeBorder: false,
      },
      {
        id: "card-3",
        number: "03",
        tag: "AUDIT",
        tagVariant: "accent",
        title: "CODEBASE SECURITY AUDIT",
        description: "Scans your entire repository for sensitive points, leaked API keys, unprotected API route handlers, and unsafe code injections.",
        checks: [
          "Finds hardcoded secrets & bearer tokens",
          "Flags unprotected dynamic API handlers",
          "Gives actionable remediation steps",
        ],
        bgVariant: "darker",
        hasOrangeBorder: true,
      },
    ] as InspectionCardData[],
  },

  // Center Navigation Links
  navLinks: [
    { label: "FEATURES", href: "#features" },
    { label: "SECURITY AUDIT", href: "#quickstart" },
    { label: "ARCHITECTURE", href: "/docs" },
    { label: "FAQ", href: "#faq" },
    { label: "DOCS", href: "/docs" },
  ],

  // QuickStart Showcase Code Snippets
  quickstart: {
    securityAudit: {
      title: "Whole-Codebase Security Audit",
      filename: "terminal",
      language: "bash",
      code: `# Run deep security audit across whole codebase to find sensitive points
$ npx @tarunagnihotri534/jennie audit

# Detects API secret leaks, unprotected API handlers & unsanitized code injections
# Output: Detailed security report with file path, line numbers & remediation steps`,
    },
    localCli: {
      title: "Local Execution",
      filename: "terminal",
      language: "bash",
      code: `# Run code review locally against staged changes or git diff
$ npx @tarunagnihotri534/jennie review

# Analyze specific target branch with thorough depth
$ npx @tarunagnihotri534/jennie review --base main --depth thorough --verbose

# Run with interactive MCP tools enabled
$ npx @tarunagnihotri534/jennie review --mcp ./mcp-config.json`,
    },
    githubAction: {
      title: "GitHub Action Workflow",
      filename: ".github/workflows/ai-review.yml",
      language: "yaml",
      code: `name: AI Code Review & Security Audit
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Run Jennie Security Audit & Review
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: npx @tarunagnihotri534/jennie audit && npx @tarunagnihotri534/jennie review --ci`,
    },
    prTrigger: {
      title: "On-Demand PR Comment Trigger",
      filename: "GitHub PR Comment",
      language: "text",
      code: `User: /jennie review --depth thorough

Jennie Bot: ⚓ Autonomous code review initiated!
- Analyzed 8 modified files across 3 commits
- Checked AST call graphs for breaking changes
- Verified env var declarations in .env.example

Result: 2 suggestions posted inline. 0 security leaks found.`,
    },
  },

  // FAQ Section
  faqs: [
    {
      question: "What is Jennie v1.1.0?",
      answer:
        "Jennie is an extendable, open-source AI code review and security audit agent. It reads your diff, inspects full AST call trees, scans your whole repository for sensitive points (`npx @tarunagnihotri534/jennie audit`), and posts focused inline review comments plus summaries.",
    },
    {
      question: "How do I run the Codebase Security Audit?",
      answer:
        "Run `npx @tarunagnihotri534/jennie audit` in your terminal. It scans all project files for hardcoded API keys, unprotected API route handlers, dangerous innerHTML injection, and unvalidated environment variable usage.",
    },
    {
      question: "Which AI providers does it support?",
      answer:
        "Jennie supports Anthropic (Claude 3.7 Sonnet, Claude 3.5 Haiku), OpenAI (gpt-4o, o3-mini), OpenRouter, Google Gemini, and custom local endpoints (Ollama/vLLM). You control your API keys and data privacy.",
    },
    {
      question: "Can I extend Jennie with my own tools?",
      answer:
        "Yes! Built on the Model Context Protocol (MCP), you can attach custom tools or MCP servers (like database schemas, Sentry error logs, or internal docs) so Jennie can query real codebase context during review.",
    },
    {
      question: "Is Jennie open source?",
      answer:
        "Yes, Jennie is 100% open source under the MIT license. You can inspect the source code, contribute tools, or publish custom rules.",
    },
  ],

  // Footer Links & Metadata
  footer: {
    copyright: `© ${new Date().getFullYear()} JENNIE Agent v1.1.0. Open Source under MIT License.`,
    starHistoryText: "Star history tracking active on GitHub",
    links: [
      { label: "GitHub", href: "https://github.com/tarunagnihotri534/Jennie" },
      { label: "NPM Package", href: "https://www.npmjs.com/package/@tarunagnihotri534/jennie" },
      { label: "Documentation", href: "/docs" },
      { label: "MIT License", href: "https://opensource.org/licenses/MIT" },
    ],
  },
};
