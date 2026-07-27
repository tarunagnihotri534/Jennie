# Jennie 🤖⚡

> **The Autonomous AI Code Reviewer for Indie Devs & Teams**
>
> *Bugs, leaked secrets, missing tests, and architectural risks — caught before they merge.*

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 💡 What is Jennie?

**Jennie** is an autonomous, agentic AI code review tool built for modern engineering workflows. Unlike traditional static linters (ESLint, SonarQube) that only check syntax rules, Jennie performs full deep read-throughs like a senior engineer. 

It traces AST call trees, follows cross-file dependencies, respects custom repository guidelines (`.jennie/rules.md`), connects to live external systems via the Model Context Protocol (MCP), and posts human-quality inline pull request feedback directly on GitHub.

Jennie can be run **locally** in your terminal before committing, continuously as a **GitHub Action**, or as an **ambient background QA daemon**.

---

## 🔥 Key Features

- **🧠 Deep Codebase Context**: Explores far beyond git diffs. Traces imports, inspects modified call trees, and verifies interface contracts across files.
- **🔌 Model Context Protocol (MCP)**: Native MCP client allows connecting live databases, Sentry observability, and Playwright browser suites into the review loop.
- **⚡ Provider Agnostic**: Native support for **Anthropic** (Claude 3.7 Sonnet / 3.5 Haiku), **OpenAI** (gpt-4o / o3-mini), **OpenRouter**, and **Cloudflare Workers AI**.
- **📜 Custom Repository Rules**: Place a `.jennie/rules.md` file in your repository to enforce team-specific architecture, styling, and security requirements.
- **💬 On-Demand PR Comment Triggers**: Trigger reviews directly inside GitHub PR comments using `/jennie review`.
- **🛡️ Security & Privacy First**: Zero code storage. Your code diffs are processed directly by your chosen LLM provider and never used for model training.
- **🌐 Ambient & Cross-Repo QA**: Audit local changes as you code (`npx jennie qa --ambient`) or verify multi-repository microservice breaking changes simultaneously.
- **🎨 Interactive Web Dashboard**: Includes a modern Next.js 16 web landing page and interactive documentation engine with dark mode and smooth animations.

---

## 🚀 Quickstart & Setup

### 1. Local CLI Review

Inspect staged or uncommitted local changes before opening a PR:

```bash
# Review staged changes in current working directory
npx jennie review

# Compare local branch against main with thorough depth
npx jennie review --base main --depth thorough --verbose

# Run with custom MCP tool integration enabled
npx jennie review --mcp ./mcp-config.json
```

### 2. GitHub Actions Integration

Add the workflow file to `.github/workflows/jennie-review.yml`:

```yaml
name: Jennie AI Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      issues: write

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run Jennie Review Agent
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx jennie review --ci
```

---

## 🔑 Environment Variables

Jennie supports multiple LLM providers. Configure the appropriate keys:

| Environment Variable | Description | Required | Default / Recommended |
| :--- | :--- | :--- | :--- |
| `ANTHROPIC_API_KEY` | Anthropic Claude API Key | Yes (if using Anthropic) | Recommended |
| `OPENAI_API_KEY` | OpenAI API Key | Yes (if using OpenAI) | - |
| `OPENROUTER_API_KEY` | OpenRouter Unified API Key | Yes (if using OpenRouter) | - |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID | Yes (if using Cloudflare) | - |
| `CLOUDFLARE_API_TOKEN` | Cloudflare Workers AI Token | Yes (if using Cloudflare) | - |
| `GITHUB_TOKEN` | GitHub Token for PR inline comments | Yes (for GitHub Actions) | `secrets.GITHUB_TOKEN` |
| `JENNIE_PROVIDER` | Selected LLM Provider | No | `anthropic` |
| `JENNIE_MODEL` | Override default model name | No | `claude-3-7-sonnet-20250219` |

### Provider Configuration Examples

**Anthropic (Default)**:
```bash
export ANTHROPIC_API_KEY="sk-ant-api03-..."
export JENNIE_MODEL="claude-3-7-sonnet-20250219"
```

**OpenAI**:
```bash
export OPENAI_API_KEY="sk-proj-..."
export JENNIE_PROVIDER="openai"
export JENNIE_MODEL="gpt-4o"
```

**OpenRouter**:
```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
export JENNIE_PROVIDER="openrouter"
export JENNIE_MODEL="anthropic/claude-3.5-sonnet"
```

---

## ⚙️ CLI Command Reference

```bash
npx jennie review [options]
```

| Flag / Option | Description | Default |
| :--- | :--- | :--- |
| `--base <branch>` | Base target branch for git diff comparison | `main` |
| `--ci` | Run in CI mode for GitHub Actions output | `false` |
| `--depth <level>` | Review depth (`fast`, `standard`, `thorough`) | `standard` |
| `--max-comments <N>` | Maximum number of inline comments posted on PR | `10` |
| `--mcp <path>` | Path to Model Context Protocol config JSON file | - |
| `--rules <path>` | Custom repository rules markdown file | `.jennie/rules.md` |
| `--ignore <glob>` | File patterns to exclude from review (comma-separated) | `dist/**,build/**` |
| `--verbose` | Output detailed step-by-step agent reasoning logs | `false` |

---

## 💻 Web Landing Page & Documentation Portal

This repository contains both the **Jennie Code Review Agent** documentation and its official web marketing portal built with **Next.js 16 (App Router)** and **Tailwind CSS v4**.

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

4. **Run Linter**:
   ```bash
   npm run lint
   ```

---

## 📂 Project Structure

```
.
├── docs/                        # Complete product documentation
│   ├── setup.md                 # Installation & Quickstart guide
│   ├── action-options.md        # GitHub Action CLI parameters & depth settings
│   ├── ai-provider-config.md    # Multi-provider LLM configuration guide
│   ├── mcp.md                   # Model Context Protocol integration guide
│   ├── rules-files.md           # Custom repository rules (.jennie/rules.md)
│   ├── custom-instructions.md   # Prompt tailoring guide
│   ├── qa-features.md           # Automated QA capabilities
│   ├── ambient-qa.md            # Background daemon setup
│   ├── cross-repo-qa.md         # Multi-repository microservices review
│   └── subagent-tool.md         # Autonomous subagent tools reference
├── src/
│   ├── app/
│   │   ├── docs/                # Interactive documentation browser page (/docs)
│   │   ├── globals.css          # Core design system tokens & Tailwind CSS
│   │   ├── layout.tsx           # Global app shell with ThemeProvider & Navbar/Footer
│   │   └── page.tsx             # Marketing landing page (Hero, Features, QuickStart, FAQ)
│   ├── components/
│   │   ├── layout/              # Navbar, Footer, Mobile Navigation
│   │   ├── marketing/           # Hero, Features, FeatureCard, QuickStart, FAQ
│   │   └── ui/                  # CodeBlock, Badge, ThemeToggle, Stamp, SmoothScroll
│   └── lib/
│       └── content.ts           # Central branding configuration & documentation items
├── public/                      # Static assets & public images
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js / postcss # PostCSS & Tailwind v4 styling setup
└── tsconfig.json                # TypeScript configuration
```

---

## 📚 Complete Documentation Index

For detailed guides, check out the `./docs` directory or visit the `/docs` route on the web application:

- [Setup & Quickstart Guide](docs/setup.md)
- [GitHub Action Options](docs/action-options.md)
- [AI Provider Configuration](docs/ai-provider-config.md)
- [Model Context Protocol (MCP) Integration](docs/mcp.md)
- [Custom Repository Rules](docs/rules-files.md)
- [Prompt Tailoring](docs/custom-instructions-example.md)
- [QA Features](docs/qa-features.md)
- [Ambient QA Daemon](docs/ambient-qa.md)
- [Cross-Repository QA](docs/cross-repo-qa.md)
- [Subagent Tools](docs/subagent-tool.md)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ for developers who ship fast.
