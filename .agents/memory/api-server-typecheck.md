---
name: api-server typecheck is pre-broken
description: Why `pnpm --filter @workspace/api-server typecheck` fails on unrelated errors, and how to validate new api-server files.
---

# api-server typecheck is pre-broken

`pnpm --filter @workspace/api-server run typecheck` (`tsc -p`) does NOT pass on a clean tree. It fails with:
- TS6305 "Output file ... has not been built from source" for `lib/api-zod` and `lib/db` (project references not prebuilt), and
- a Zod constraint error inside `lib/db` (`ZodObject ... does not satisfy ZodType`) from a Zod version mismatch.

**Why:** these are pre-existing monorepo issues in the referenced lib packages, not in api-server source. They predate and are unrelated to most api-server feature work.

**How to apply:** Do not try to "fix" these as part of unrelated api-server work — it's out of scope and a rabbit hole. To validate NEW api-server files:
1. `pnpm --filter @workspace/api-server run build` (esbuild via build.mjs) — this is what `dev` actually runs; it bundles but does NOT typecheck.
2. Isolated typecheck of just your files (skips the broken project refs):
   `pnpm exec tsc --noEmit --skipLibCheck --strict --target es2022 --module esnext --moduleResolution bundler --types node src/lib/yourfile.ts src/routes/yourroute.ts`
   Empty output = clean.

Stack note: api-server is Express 5 + TS (ESM, `type:module`). Routes live in `src/routes/*.ts`, export a default `Router`, are registered in `src/routes/index.ts`, and are mounted at `/api` in `src/app.ts`. It listens on `PORT` (8080 in dev). Native global `fetch`/`Response` are typed fine via `@types/node`.
