# Ambient QA & Background Auditing

Ambient QA allows Jennie to run as a continuous background daemon during local development.

## Setup Ambient QA

```bash
# Launch background monitoring daemon
$ npx jennie qa --ambient
```

Jennie will monitor local file changes using `chokidar` file watchers and output instant feedback in your terminal before you even run `git commit`.
