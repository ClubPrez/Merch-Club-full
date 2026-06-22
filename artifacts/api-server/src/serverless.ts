import app from "./app";

// Vercel serverless entry. An Express app is itself a `(req, res)` handler, so
// exporting it directly is the standard @vercel/node pattern. Unlike
// `src/index.ts`, this entry never calls `app.listen()` — the platform owns the
// request lifecycle and invokes this default export per request.
export default app;
