# Cross-Repository QA & Microservices Inspection

For microservices architectures, Jennie can cross-reference multiple repositories simultaneously.

## Cross-Repo Execution

```bash
npx jennie review --repos org/backend,org/frontend,org/shared-types
```

This enables the agent to verify breaking API changes across frontend and backend pull requests simultaneously.
