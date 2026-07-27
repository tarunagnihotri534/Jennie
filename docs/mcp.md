# Model Context Protocol (MCP) Integration

Jennie includes a built-in MCP client that connects external Model Context Protocol servers to give the AI agent deep real-time context about database schemas, error logs, and browser test runs.

## Configuring MCP Servers

Create an `mcp-config.json` file in your repository:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    },
    "sentry": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sentry"]
    }
  }
}
```

## Running Jennie with MCP Enabled

Pass the `--mcp` option when executing reviews:

```bash
npx jennie review --mcp ./mcp-config.json
```

---

## What the Agent Does with MCP

- **Database Verification**: Validates SQL migrations against production schemas before PR merge.
- **APM Error Checks**: Cross-references modified code lines with recent Sentry exception tracebacks.
- **Browser Automation**: Spawns headless Playwright tests to verify UI regressions.
