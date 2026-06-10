---
name: Merch Club prerender + Vercel deploy
description: How the marketing site ships static prerendered HTML to production, and the non-obvious deploy topology / build pitfalls.
---

# Merch Club prerender & deploy

The marketing site (`artifacts/merch-club`) deploys to **Vercel** via the repo-root
`vercel.json` and is served at the **apex `merchclub.com`** (non-www). The `.replit`
`autoscale` config is NOT what serves the public domain — don't be misled by it.

- **Canonical is the apex; www redirects to apex.** As verified 2026-06-10,
  `https://merchclub.com/` returns 200 directly and `https://www.merchclub.com/`
  returns a 308 → `https://merchclub.com/`. So sitemap/canonical/JSON-LD URLs should
  use **non-www** (they do). NOTE: this is the reverse of an earlier note that claimed
  apex→www; always re-verify the live direction with `curl -sS -D - -o /dev/null` before
  trusting either way. When checking the live site, fetch with `curl -L` (follow
  redirects) or a redirect stub can read as an empty body. "Live site shows empty
  `<div id="root">`" reports are often just a stale CDN/browser cache or a
  pre-propagation deploy — verify with `curl -L -A <browser-UA>` per route first.

- **Vercel serves static files before applying `rewrites`.** The SPA catch-all
  `{ source:"/(.*)", destination:"/index.html" }` does NOT clobber per-route
  prerendered files — `/about` serves `about/index.html`, not the homepage. Leave it.

## Build pitfalls (the reason prod can silently ship empty HTML)
**Why:** a previous "empty body" panic traced to these two latent footguns, not an actual outage.

- **Never gate a critical build step on pnpm's `postbuild` hook.** pnpm only runs
  pre/post scripts when `enable-pre-post-scripts` is true; the default has flipped
  across pnpm majors and CI can disable it. If it's off, the build "succeeds" while
  silently skipping prerender → ships empty `<div id="root">`. Fold critical steps
  into the `build` script with `&&` so they always run and fail loudly.

- **The prerender must fail the build on empty renders.** `scripts/prerender.mjs`
  catches SSR errors and would otherwise write a template-only file (empty root div)
  and exit 0. It now `process.exit(1)` if any route renders empty. Keep it that way —
  a green build that ships empty HTML is the exact bug this prerender exists to prevent.

- **`prerender.mjs` is NOT idempotent.** It reads `dist/public/index.html` as the
  template and overwrites it with the homepage render. Run it only after a fresh
  `vite build` (the `build` script chains both). A guard exits 1 if the template no
  longer contains the empty `<div id="root"></div>` placeholder.
