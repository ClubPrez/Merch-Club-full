import type { Request, Response, NextFunction, RequestHandler } from "express";

// ── Simple in-memory, per-IP fixed-window rate limiter ────────────────────────
// No external dependency; fine for the current single-instance public scale.
// Each limiter owns an independent bucket map, so endpoint limits never share
// counters. A lazily-unref'd sweep keeps memory bounded without holding the
// process open.

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

interface Bucket {
  count: number;
  resetAt: number;
}

// Behind the Replit/autoscale proxy the socket address is the proxy, so prefer
// the left-most X-Forwarded-For entry (the original client). This is spoofable,
// which is acceptable for light abuse throttling — not a security boundary.
function clientIp(req: Request): string {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  if (Array.isArray(xff) && xff.length > 0) {
    const first = xff[0]?.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.socket?.remoteAddress ?? req.ip ?? "unknown";
}

export function rateLimit({ windowMs, max, message }: RateLimitOptions): RequestHandler {
  const hits = new Map<string, Bucket>();

  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of hits) {
      if (now >= bucket.resetAt) hits.delete(key);
    }
  }, Math.max(windowMs, 60_000));
  // Never let the sweep timer keep the Node process alive.
  sweep.unref?.();

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = clientIp(req);
    const now = Date.now();

    let bucket = hits.get(key);
    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      hits.set(key, bucket);
    }
    bucket.count += 1;

    const remaining = Math.max(0, max - bucket.count);
    const resetSeconds = Math.max(0, Math.ceil((bucket.resetAt - now) / 1000));
    res.setHeader("RateLimit-Limit", String(max));
    res.setHeader("RateLimit-Remaining", String(remaining));
    res.setHeader("RateLimit-Reset", String(resetSeconds));

    if (bucket.count > max) {
      res.setHeader("Retry-After", String(resetSeconds));
      res.status(429).json({ ok: false, message });
      return;
    }

    next();
  };
}

// ── Per-endpoint limiters (per-IP, 1-minute windows) ──────────────────────────
const MINUTE = 60_000;

// Read endpoints: generous, just enough to blunt scraping/SAGE-credit burn.
export const searchRateLimit = rateLimit({
  windowMs: MINUTE,
  max: 30,
  message: "You're searching a little too fast. Please wait a moment and try again.",
});

export const quoteDataRateLimit = rateLimit({
  windowMs: MINUTE,
  max: 30,
  message: "You're loading quotes a little too fast. Please wait a moment and try again.",
});

// Upload: moderate — prevents storage abuse without blocking legit retries.
export const uploadRateLimit = rateLimit({
  windowMs: MINUTE,
  max: 10,
  message: "Too many uploads in a short time. Please wait a moment and try again.",
});

// Submissions: strict — protects the inbox and quote_requests table from floods.
export const submitRateLimit = rateLimit({
  windowMs: MINUTE,
  max: 5,
  message: "Too many requests. Please wait a minute before submitting again.",
});
