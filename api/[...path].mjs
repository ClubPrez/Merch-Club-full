// Vercel Serverless Function (catch-all) for the Merch Club API.
//
// This thin entry simply re-exports the pre-bundled Express app. The heavy
// lifting (bundling the whole server + workspace deps into one self-contained
// file) is done by the api-server's own esbuild step during the Vercel build,
// so @vercel/node has a single file to ship and nothing to trace across the
// pnpm monorepo.
//
// In this framework-null Vercel project the `[...path]` filename is a literal
// function path, not an automatic catch-all. vercel.json explicitly routes
// /api/* to this function before its filesystem and 404 rules. The route
// capture preserves the requested API path if Vercel passes the rewritten
// function URL to Express instead of the original URL.
import app from "../artifacts/api-server/dist/vercel/serverless.mjs";

export default function handler(req, res) {
  if (req.url?.includes("__mc_api_path=")) {
    const url = new URL(req.url, "http://localhost");
    const route = url.searchParams.get("__mc_api_path");
    url.searchParams.delete("__mc_api_path");
    const path = /^\/api\/(?:\[\.{3}path\]|%5B\.{3}path%5D)$/i.test(url.pathname) && route !== null
      ? `/api/${route}`
      : url.pathname;
    req.url = path + url.search;
  }
  return app(req, res);
}
