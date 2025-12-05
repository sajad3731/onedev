---
description: Fetch latest changes from GitHub repository
---

Fetch the latest changes from the GitHub repository using `git fetch origin`.

Include retry logic with exponential backoff (up to 4 retries: 2s, 4s, 8s, 16s delays) if network failures occur.

After fetching, show:
1. A summary of what branches were updated
2. If the current branch has new commits available upstream, show them with `git log HEAD..origin/<current-branch> --oneline`
3. Current git status

Be concise in your output.
