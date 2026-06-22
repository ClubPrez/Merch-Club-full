// Vercel Serverless Function (catch-all) for the Merch Club API.
//
// This thin entry simply re-exports the pre-bundled Express app. The heavy
// lifting (bundling the whole server + workspace deps into one self-contained
// file) is done by the api-server's own esbuild step during the Vercel build,
// so @vercel/node has a single file to ship and nothing to trace across the
// pnpm monorepo.
//
// The `[...path]` filename makes this a catch-all: every `/api/*` request is
// routed here and the Express app receives the ORIGINAL path (e.g.
// `/api/search`), which matches `app.use("/api", router)`. No vercel.json
// rewrite is needed, so the existing legacy `routes` (WordPress 410s +
// redirects) are left untouched.
import app from "../artifacts/api-server/dist/vercel/serverless.mjs";

export default app;
