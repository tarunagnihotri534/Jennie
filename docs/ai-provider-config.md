# AI Provider Configuration

Jennie is provider-agnostic. You can connect Anthropic Claude 3.5 / 3.7, OpenAI o3 / gpt-4o, OpenRouter, or Cloudflare Workers AI.

## Supported Providers

### 1. Anthropic (Default & Recommended)

Set your API key in environment variables:

```bash
export ANTHROPIC_API_KEY="sk-ant-api03-..."
export JENNIE_MODEL="claude-3-7-sonnet-20250219"
```

### 2. OpenAI

To use OpenAI models:

```bash
export OPENAI_API_KEY="sk-proj-..."
export JENNIE_PROVIDER="openai"
export JENNIE_MODEL="gpt-4o"
```

### 3. OpenRouter

For unified access to hundreds of open/closed models:

```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
export JENNIE_PROVIDER="openrouter"
export JENNIE_MODEL="anthropic/claude-3.5-sonnet"
```

### 4. Cloudflare Workers AI

For local or edge execution on Cloudflare infrastructure:

```bash
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
export CLOUDFLARE_API_TOKEN="your-api-token"
export JENNIE_PROVIDER="cloudflare"
```
