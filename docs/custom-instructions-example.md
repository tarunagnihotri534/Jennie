# Custom Agent Prompt Tailoring

Tailor Jennie's persona and focus areas to match your team's code review style.

## Custom Prompt Example

```markdown
# Custom Jennie Prompt Instructions

When reviewing pull requests in this repository:
1. Pay special attention to SQL query efficiency and N+1 query problems in Prisma/ORM calls.
2. Be strict about TypeScript strict-mode compliance (no `any` types allowed).
3. Be concise and friendly in PR comments. Use code snippets to suggest exact fixes.
```

Pass custom instructions file via CLI:

```bash
npx jennie review --instructions ./custom-prompt.md
```
