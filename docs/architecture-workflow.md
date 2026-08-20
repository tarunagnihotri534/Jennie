# 🏗️ System Architecture & Workflow Guide

This document outlines the system architecture, execution pipelines, agent reasoning loop, and tool integrations that power **Jennie**.

---

## 📐 High-Level System Architecture

Jennie is designed as a multi-tier agentic architecture. It decouples context gathering (git diffs, AST parsing, repo rules) from model reasoning (Anthropic, OpenAI, OpenRouter) and output dispatching (CLI terminal, GitHub Actions inline comments, Web Portal).

```mermaid
flowchart TD
    subgraph Inputs["1. Trigger & Execution Layer"]
        CLI["💻 Local CLI\n(npx @tarunagnihotri534/jennie review)"]
        GHA["🐙 GitHub Actions CI\n(.github/workflows/jennie-review.yml)"]
        PRComment["💬 PR Comment Trigger\n(/jennie review)"]
        WebGUI["🌐 Next.js Documentation GUI\n(http://localhost:3000)"]
    end

    subgraph Core["2. Context & AST Engine"]
        GitDiff["Git Diff & Branch Comparator\n(git diff HEAD / base)"]
        ASTParser["AST Call Tree & Import Explorer"]
        RulesParser["Repo Guidelines Parser\n(.jennie/rules.md)"]
    end

    subgraph AgentLoop["3. Jennie AI Agent Reasoning Loop"]
        PromptBuilder["Prompt & Context Scaffolder"]
        MCPClient["🔌 Model Context Protocol (MCP) Client"]
        LLMProvider["🧠 LLM Reasoning Engine\n(Anthropic / OpenAI / OpenRouter)"]
    end

    subgraph Outputs["4. Output & Reporting Layer"]
        TermOut["💻 ANSI Formatted Terminal Output"]
        PRComments["💬 GitHub PR Inline Comments & Summary"]
        SecurityAlerts["🚨 Security & Secret Vulnerability Warnings"]
    end

    Inputs --> Core
    Core --> AgentLoop
    AgentLoop --> Outputs
```

---

## 🔄 Execution Sequence & Reasoning Loop

When a review is triggered (locally or in CI/CD), Jennie executes the following sequential pipeline:

```mermaid
sequenceDiagram
    autonumber
    participant Dev as Developer / GitHub PR
    participant CLI as Jennie CLI / Action Runner
    participant Git as Git Repository & AST
    participant MCP as MCP Servers (Database / Sentry)
    participant LLM as AI Model (Claude 3.7 / GPT-4o)
    participant GitHub as GitHub PR Comments API

    Dev->>CLI: Trigger `npx @tarunagnihotri534/jennie review`
    CLI->>Git: Inspect staged changes & git diff
    Git-->>CLI: Return modified files & call trees
    CLI->>CLI: Parse `.jennie/rules.md` guidelines
    
    opt MCP Integration Enabled
        CLI->>MCP: Query external context (Schemas, Sentry logs)
        MCP-->>CLI: Return live system runtime context
    end

    CLI->>LLM: Send diff + AST context + repository rules
    LLM-->>CLI: Return structured review suggestions & security audit

    alt CI Mode (--ci)
        CLI->>GitHub: Post inline comments on modified PR lines
    else Local CLI Mode
        CLI->>Dev: Print ANSI formatted review report in terminal
    end
```

---

## 🧱 Component Breakdown

### 1. Trigger & Execution Layer ([`bin/jennie.js`](file:///c:/Users/darkt/OneDrive/Documents/Desktop/AlexaaaDR/bin/jennie.js))
- Serves as the primary CLI entry point for node execution.
- Parses command line flags (`--base`, `--depth`, `--mcp`, `--rules`, `--ci`, `--verbose`).
- Configures environment key fallbacks for Anthropic (`ANTHROPIC_API_KEY`), OpenAI (`OPENAI_API_KEY`), and OpenRouter (`OPENROUTER_API_KEY`).

### 2. Context & AST Engine
- **Git Comparator:** Extracts diffs against specified base branches (`--base main`).
- **Secret Scanner:** Runs static regex analysis to detect hardcoded API keys (`sk-...`, `ghp_...`, `AIza...`), tokens, and credentials before sending code to LLMs.
- **Rules Engine:** Reads `.jennie/rules.md` to inject team-specific architectural, style, and safety rules into the review prompt.

### 3. Model Context Protocol (MCP) Client
- Connects to external MCP servers to fetch live runtime context (e.g. database schemas, APM error traces, API specs).

### 4. Output & Reporting Engine
- Formats review findings into clean ANSI terminal outputs for developers.
- Scaffolds GitHub Actions PR comments using `GITHUB_TOKEN` when `--ci` mode is enabled.
