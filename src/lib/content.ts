// ============================================================================
// SINGLE-FILE REBRAND CONFIGURATION
// All product-specific names, taglines, CLI commands, links, features & copy
// are defined here as typed constants. Rebranded to JENNIE.
// ============================================================================

export const PRODUCT_CONFIG = {
  // Product Name & Branding
  name: "JENNIE", // Product wordmark
  tagline: "The AI Code Reviewer for Indie Devs & Teams",
  badge: "OPEN SOURCE",
  repoOrgName: "tarunagnihotri534/Jennie", // GitHub repository org/name display
  repoUrl: "https://github.com/tarunagnihotri534/Jennie", // GitHub repository URL
  starsCount: "2.5K", // Displayed GitHub star count
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
    titleLine1: "A REVIEWER THAT READS THE WHOLE",
    titleLine2: "PICTURE",
    subtitle: "Jennie does the read-through a human reviewer would — on every change you ship.",
    cards: [
      {
        number: "01",
        tag: "CI",
        title: "REVIEWS ON GITHUB",
        description: "Runs as a GitHub Action on every pull request. Reads the diff and posts focused inline comments plus a summary — like a human reviewer, minus the wait.",
        isHighlighted: false,
      },
      {
        number: "02",
        tag: "AGENT",
        title: "EXPLORES YOUR CODEBASE",
        description: "Built on an autonomous AI agent framework, Jennie runs a real agent loop with developer tools — so it reads far beyond the diff to understand the full picture.",
        isHighlighted: true,
      },
      {
        number: "03",
        tag: "MCP",
        title: "EXTEND IT WITH MCP",
        description: "Acts as a Model Context Protocol client, so you can wire in external tools and give the agent more context while it reviews.",
        isHighlighted: false,
      },
    ],
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
      question: "How does this differ from static linters like ESLint or SonarQube?",
      answer: "Linters enforce static AST syntax rules. Our agent acts like a senior engineer: it understands code context, traces function calls across files, checks logic edge cases, and flags architectural bugs or leaked credentials.",
    },
    {
      question: "Which LLM providers and models are supported?",
      answer: "Supports Anthropic (Claude 3.7 Sonnet, Claude 3.5 Haiku), OpenAI (gpt-4o, o3-mini), OpenRouter, and Cloudflare Workers AI out of the box. You control your API keys and data privacy.",
    },
    {
      question: "Can I run this locally before pushing a branch?",
      answer: "Yes! Running 'npx jennie review' in your terminal inspects uncommitted or staged changes locally so you fix bugs before opening a PR.",
    },
    {
      question: "How does MCP tool integration work?",
      answer: "Our engine includes a built-in MCP client. You can plug in any Model Context Protocol server (e.g. database schemas, Sentry error logs, browser test suites) so the AI agent inspects live context.",
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
