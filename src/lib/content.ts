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
  tagline: "The AI Code Reviewer for Indie Devs & Teams",
  badge: "OPEN SOURCE",
  repoOrgName: "tarunagnihotri534/Jennie", // GitHub repository org/name display
  repoUrl: "https://github.com/tarunagnihotri534/Jennie", // GitHub repository URL
  starsCount: "0", // Default GitHub star count fallback
  stampText: "CLEARED TO MERGE", // Rotated stamp badge text

  // CLI & Command Names
  cliCommand: "jennie",
  initCommand: "npx jennie init",
  reviewCommand: "npx jennie review",
  prTriggerCommand: "/jennie review",

  // Hero Headlines & Subheadlines
  hero: {
    headlineLine1: "CODE REVIEW FOR",
    headlineLine2Words: ["HACKERS", "VIBE CODERS", "BUILDERS", "SHIPPERS", "INDIE DEVS"],
    subheadlinePrefix: "Bugs, leaked secrets, missing tests — ",
    subheadlineHighlight: "caught before they merge.",
    ctaCaptionPrefix: "SCAFFOLDS A GITHUB ACTION - OR ",
    ctaCaptionHighlight: "NPX JENNIE REVIEW",
    ctaCaptionSuffix: " LOCALLY",
  },

  // Inspection & Ethos Section (Matching Reference Design)
  inspection: {
    kicker: "THE INSPECTION",
    titleLine1: "A REVIEWER THAT READS",
    titleLine2: "THE WHOLE PICTURE",
    subtitle: "Jennie does the read-through a human reviewer would — on every change you ship.",
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
          "Points out missing tests",
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
        description: "Built on the flue agent framework, Jennie runs a real agent loop with developer tools — so it reads far beyond the diff to understand the full picture.",
        checks: [
          "Follows references, not just the diff",
          "Anthropic · OpenAI · OpenRouter · Cloudflare",
          "Open source and extendable",
        ],
        bgVariant: "lifted",
        hasOrangeBorder: false,
      },
      {
        id: "card-3",
        number: "03",
        tag: "MCP",
        tagVariant: "accent",
        title: "EXTEND IT WITH MCP",
        description: "Acts as a Model Context Protocol client, so you can wire in external tools and give the agent more context while it reviews.",
        checks: [
          "Browser automation to QA web apps",
          "Observability and docs servers",
          "Bring your own MCP servers",
        ],
        bgVariant: "darker",
        hasOrangeBorder: true,
      },
    ] as InspectionCardData[],
  },

  // Center Navigation Links
  navLinks: [
    { label: "FEATURES", href: "#features" },
    { label: "INSTALL", href: "#quickstart" },
    { label: "FAQ", href: "#faq" },
    { label: "DOCS", href: "/docs" },
  ],

  // QuickStart Showcase Code Snippets
  quickstart: {
    githubAction: {
      title: "GitHub Action Workflow",
      filename: ".github/workflows/ai-review.yml",
      language: "yaml",
      code: `name: AI Code Review
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
      - name: Run AI Code Review
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: npx jennie review --ci`,
    },
    localCli: {
      title: "Local Execution",
      filename: "terminal",
      language: "bash",
      code: `# Run code review locally against staged changes or git diff
$ npx jennie review

# Analyze specific target branch
$ npx jennie review --base main --verbose

# Run with interactive MCP tools enabled
$ npx jennie review --mcp ./mcp-config.json`,
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
      question: "What is Jennie?",
      answer:
        "Jennie is an extendable, open-source AI code review agent. It reads your diff, explores the codebase with real developer tools, and posts focused inline review comments plus a summary — catching issues a human reviewer would, like exposed secrets, inefficient code, potential bugs, unhandled edge cases, and missing tests.",
    },
    {
      question: "How do I run it?",
      answer:
        "You can run Jennie locally via CLI with `npx jennie review` on your uncommitted or staged git changes, or trigger it automatically in GitHub Actions on every Pull Request using `/jennie review`.",
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
        "Yes, Jennie is 100% open source under the MIT license. You can inspect the source code, contribute tools, or self-host it freely.",
    },
  ],

  // Footer Links & Metadata
  footer: {
    copyright: `© ${new Date().getFullYear()} JENNIE Agent. Open Source under MIT License.`,
    starHistoryText: "Star history tracking active on GitHub",
    links: [
      { label: "GitHub", href: "https://github.com/tarunagnihotri534/Jennie" },
      { label: "Documentation", href: "/docs" },
      { label: "MIT License", href: "https://opensource.org/licenses/MIT" },
    ],
  },
};
