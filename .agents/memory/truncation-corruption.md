---
name: Source corrupted with literal [...] truncation markers
description: How to recognize and recover a source file whose long lines were saved as literal "[...]" placeholders, breaking the build.
---

# Source files saved from a truncated view

**Symptom:** A production/dev build fails with an esbuild/babel JSX error like
`Expected identifier but found "["` at a column deep inside a long line. The file
contains literal `[...]` strings where long lines (paragraph copy, SVG `d=`
attributes, long classNames, alt text) used to be. Confirm with
`rg -F "[...]" <file>` — a real match means the placeholder is baked into the
source, not a display artifact.

**Why it happens:** A tool/editor that truncates long lines for display wrote
that truncated content back to disk, replacing the middle of each long line with
`[...]`. The original content is destroyed in that file. A single corrupted `<`
before `[...]` (e.g. `story.<[...]`) is what actually breaks JSX parsing.

**How to apply / recover:**
1. Find all affected files: `rg -l -F "[...]" <src dir>`.
2. Find the last clean commit: for recent commits run
   `git show <commit>:<file> | grep -c -F "[...]"` — pick the newest commit with 0.
3. Restore via redirect (avoid `git checkout` which the sandbox blocks):
   `git show <clean_commit>:<file> > <file>`.
4. Re-apply any *legitimate* change that the corrupting commit also intended
   (diff the clean vs corrupted version to find it — often a tiny one-liner).
5. Verify with a real build before declaring done.

**Note:** A local production build can pass while the same code fails on a remote
CI (e.g. Vercel) only if disk state differs from the committed/pushed state.
Always reproduce against the committed version (`git show HEAD:<file>`), not just
the working tree.
