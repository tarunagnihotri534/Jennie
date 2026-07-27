# Subagent Tools & Autonomous Agent Loop

Jennie uses a multi-agent loop powered by specialized subagent tools:

- `ast_search`: Uses `ast-grep` to search code structures symbolically across files.
- `ripgrep`: Rapidly locates keyword usages and regex patterns.
- `file_tree`: Recursively explores directory structure to inspect surrounding files.
- `pr_commenter`: Formats and posts inline GitHub PR comments.
