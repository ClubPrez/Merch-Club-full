---
name: api-server Vercel serverless deploy
description: How the Express api-server runs as a Vercel function and the env/build gotchas that crash it
---

# api-server on Vercel (serverless function)

The Express app is deployed to Vercel as a single serverless function via a committed
catch-all `api/[...path].mjs` that imports a prebuilt bundle and re-exports its default
(the Express app, exported by `src/serverless.ts` which does NOT call `listen`).

## Build must produce a pino-plugin-FREE bundle for Vercel
`build.mjs` dual-builds: `dist/index.mjs` (with the esbuild pino plugin, for Replit) and
`dist/vercel/serverless.mjs` (NO pino plugin → one self-contained file, no worker sidecars).
**Why:** the pino esbuild plugin emits separate worker files (`pino-worker.mjs`, etc.); those
sidecars don't get traced into a single Vercel function and break logging/startup. Verify after
build that `dist/vercel/` contains ONLY `serverless.mjs` + `.map`.

## DATABASE_URL is now OPTIONAL — the DB dependency is lazy
`@workspace/db` (`lib/db/src/index.ts`) used to THROW at module import if `DATABASE_URL` was
unset, which crashed the ENTIRE serverless function at cold start (because `api/[...path].mjs`
imports the bundle at module scope). FIXED: the db package no longer creates a pool or throws at
import — it exposes `getDb()`/`getPool()` that lazily build the pool on first call (throwing only
then if `DATABASE_URL` is missing). `routes/subscribe.ts` guards on `process.env.DATABASE_URL`
and returns a 503 ("Newsletter signup is temporarily unavailable.") when unset; it's the ONLY
route that touches the DB. **Why:** the team intentionally keeps `DATABASE_URL` OUT of Vercel so
prod never depends on the dev Postgres. **How to apply:** do NOT statically import anything that
opens a pool at module load, and don't re-add a top-level throw in `lib/db` — that reintroduces
the cold-start crash. With `DATABASE_URL` unset, every route works except `/subscribe` (503).

## Full env set the function reads
Required: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`EMAIL_FROM`, `SAGE_ACCT_ID`, `SAGE_AUTH_KEY`, `SAGE_LOGIN_ID`, `SAGE_CONNECT_URL`.
Optional: `DATABASE_URL` (only the newsletter `/subscribe` route uses it; absent → 503, no crash).
Optional: `IMAGE_PROXY_SECRET` (falls back to `SAGE_AUTH_KEY` for HMAC token signing in
`lib/image-proxy.ts`), `LOG_LEVEL` (default info), `NODE_ENV` (Vercel sets production).

## Routing
`app.use("/api", router)`; Vercel filesystem routing must run before the SPA 404 rewrite so
`/api/*` hits the function. Health is `/api/healthz` (NOT `/api/health`); search is POST
`/api/search` (a GET 404s).

## merch-club vite build guards are REPL_ID-gated
`vite.config.ts` throws on missing `PORT`/`BASE_PATH` ONLY when `process.env.REPL_ID` is set
(Replit runtime). So a manual local build needs `PORT=… BASE_PATH=… vite build`; on Vercel
`REPL_ID` is unset, the throws are skipped, and `base` defaults to `/`. Don't "fix" this guard —
it's intentional and the Vercel build is unaffected.
