# GitHub Action Options & Parameters

Jennie's GitHub Action accepts various command-line flags and parameters to tailor review depth, file filtering, and comment formatting.

## Available Action Flags

```bash
npx jennie review [options]
```

### Options Reference

| Flag | Description | Default |
| :--- | :--- | :--- |
| `--ci` | Run in headless CI mode for GitHub Actions | `false` |
| `--base <branch>` | Git base branch to compare changes against | `main` |
| `--depth <level>` | Review depth (`quick`, `standard`, `thorough`) | `standard` |
| `--max-comments <N>` | Maximum inline comments allowed per PR | `10` |
| `--ignore <globs>` | Comma-separated glob patterns to skip (e.g. `*.lock,dist/*`) | `none` |
| `--rules <path>` | Path to custom project rules file | `.jennie/rules.md` |
| `--mcp <path>` | Path to Model Context Protocol configuration | `none` |
| `--verbose` | Enable debug logs during agent execution | `false` |

---

## Example CI Configuration

```yaml
- name: Thorough Security & Code Review
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    npx jennie review \
      --ci \
      --base main \
      --depth thorough \
      --max-comments 15 \
      --ignore "*.min.js,vendor/*"
```
