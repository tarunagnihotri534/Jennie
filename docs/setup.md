# Setup & Quickstart Guide

Jennie is an autonomous AI code review agent that inspects pull requests, traces function calls across files, flags security vulnerabilities, and leaves human-quality inline comments.

## Installation

You can run Jennie locally via `npx` or integrate it directly into your GitHub Actions workflow.

### Local CLI Review

Run Jennie in your project root to review staged or uncommitted git changes before opening a PR:

```bash
# Review staged changes locally
$ npx jennie review

# Analyze against main branch with verbose log output
$ npx jennie review --base main --verbose

# Run with custom MCP tool configuration
$ npx jennie review --mcp ./mcp-config.json
```

### GitHub Action Setup

Add the following workflow file to `.github/workflows/jennie-review.yml`:

```yaml
name: Jennie AI Code Review
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

      - name: Run Jennie Review Agent
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx jennie review --ci
```

---

## Environment Variables

| Variable | Description | Required |
| :--- | :--- | :--- |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key for model reasoning | Yes (if using Anthropic) |
| `OPENAI_API_KEY` | OpenAI API key for gpt-4o / o3 models | Yes (if using OpenAI) |
| `GITHUB_TOKEN` | GitHub token for posting inline PR comments | Yes (for GitHub Actions) |
| `JENNIE_MODEL` | Override default model selection (e.g. `claude-3-7-sonnet`) | No |

---

## Next Steps

- Explore [AI Provider Config](ai-provider-config.md) to set up alternative models.
- Read [Action Options](action-options.md) for full CI parameters.
- Learn about [MCP Tool Integration](mcp.md) for custom tool extensions.
