# Project Rules & Style Guidelines (.jennie/rules.md)

You can enforce team-specific coding standards, architecture constraints, and forbidden patterns by creating a `.jennie/rules.md` file in your repository.

## Rule File Structure

Create `.jennie/rules.md`:

```markdown
# Team Code Guidelines

## Mandatory Architecture Rules
- All Next.js Server Components must be placed inside `src/app`.
- Do NOT use inline styles; use Tailwind utility classes or CSS variables.
- All exported API handlers must validate inputs using `zod` schemas.

## Security & Secrets
- Never commit AWS, Stripe, or OpenAI keys in source files.
- Always check that `.env.example` is updated when new env vars are added.

## Performance
- Do not import heavy lodash functions; use native ES6 helpers.
- React components must keep local transient state instead of mutating global stores directly.
```

Jennie automatically reads `.jennie/rules.md` during reviews and flags any violations inline!
