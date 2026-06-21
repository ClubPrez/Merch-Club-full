---
name: Post-merge hang on drizzle-kit interactive prompt
description: Why post-merge setup times out on schema push, and the two things that fix it
---

# Post-merge setup hangs / times out on `drizzle-kit push`

`scripts/post-merge.sh` runs a drizzle schema push. Post-merge runs with stdin closed and a timeout, so **any interactive drizzle prompt makes it hang and fail**.

## Two distinct fixes (needed together)

1. **Use the non-interactive script.** Run `pnpm --filter db run push-force` (drizzle-kit `push --force`), never plain `push`. The db package exposes both `push` and `push-force`. `--force` skips confirmations; it does NOT truncate for an add-unique-constraint diff (it just runs `ALTER TABLE ADD CONSTRAINT`).

2. **Fix constraint-name drift so there's no diff at all.** A table created with inline `UNIQUE` gets Postgres's default constraint name `<table>_<col>_key`, but drizzle's `.unique()` expects `<table>_<col>_unique`. Drizzle matches unique constraints **by name**, so it keeps trying to "add" the constraint and prompts about truncating. Fix non-destructively:
   `ALTER TABLE <t> RENAME CONSTRAINT <t>_<col>_key TO <t>_<col>_unique;` (metadata-only, no data loss).

**Why:** the merge that surfaced this had `subscribers.email` unique under the legacy `_key` name; push wanted to re-add it as `_unique` and stalled on the truncate question.

## Env note
- Post-merge / drizzle run against `DATABASE_URL`, which is Replit's built-in Postgres (`helium`/`heliumdb`), NOT Supabase. Inspect/repair it with `pg` + `DATABASE_URL`.

## Recurring orphaned-port gotcha
- After a merge restart, the api-server can fail with `EADDRINUSE :8080` because an orphaned `node ./dist/index.mjs` from a prior start still holds the port and is outside the workflow's process group (so `restart_workflow` won't reap it). Kill the orphan, then restart. **Do not** `pkill -f "dist/index.mjs"` from a shell whose own command line contains that string — pkill self-matches and kills your shell (exit 143). Use a `[d]ist/index.mjs` style pattern.
