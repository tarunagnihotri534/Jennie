# Flue Migration Guide

Migrating from legacy static CLI review scripts to the Jennie Agent on Flue v1.0.

## Breaking Changes & Enhancements

- **Agentic Loop**: No longer uses rigid regex rules; runs a full LLM agent loop.
- **Provider Agnostic**: Unified provider config under `JENNIE_PROVIDER`.
- **MCP Client**: Native support for Model Context Protocol servers.
