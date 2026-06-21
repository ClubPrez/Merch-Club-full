import { Router, type IRouter } from "express";
import { decodeImageToken, isAllowedImageUrl } from "../lib/image-proxy";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const IMG_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const MAX_ENTRIES = 400;
const MAX_CACHEABLE_BYTES = 8 * 1024 * 1024; // 8 MB — largest single image we cache
const MAX_TOTAL_BYTES = 200 * 1024 * 1024; // 200 MB — overall cache memory budget
const HARD_MAX_BYTES = 12 * 1024 * 1024; // 12 MB — absolute cap on any proxied response

interface ImageCacheEntry {
  expires: number;
  body: Buffer;
  contentType: string;
}

const cache = new Map<string, ImageCacheEntry>();
let totalBytes = 0;

function deleteEntry(key: string): void {
  const entry = cache.get(key);
  if (!entry) return;
  totalBytes -= entry.body.byteLength;
  cache.delete(key);
}

function getCached(key: string): ImageCacheEntry | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    deleteEntry(key);
    return null;
  }
  // Refresh LRU recency.
  cache.delete(key);
  cache.set(key, entry);
  return entry;
}

function setCached(key: string, entry: ImageCacheEntry): void {
  deleteEntry(key); // replace any stale entry without double-counting bytes
  cache.set(key, entry);
  totalBytes += entry.body.byteLength;
  // Evict oldest entries until within both the entry-count and byte budgets.
  while (cache.size > MAX_ENTRIES || totalBytes > MAX_TOTAL_BYTES) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    deleteEntry(oldest);
  }
}

// Read the upstream body while enforcing an absolute size cap, so an oversized
// (or unbounded / lying-Content-Length) response can't exhaust memory.
async function readBodyWithCap(upstream: Response, cap: number): Promise<Buffer | null> {
  const declared = Number(upstream.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > cap) {
    try {
      await upstream.body?.cancel();
    } catch {
      // ignore cancel errors
    }
    return null;
  }

  if (!upstream.body) {
    const buf = Buffer.from(await upstream.arrayBuffer());
    return buf.byteLength > cap ? null : buf;
  }

  const reader = upstream.body.getReader();
  const chunks: Buffer[] = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    received += value.byteLength;
    if (received > cap) {
      try {
        await reader.cancel();
      } catch {
        // ignore cancel errors
      }
      return null;
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

router.get("/img/:token", async (req, res) => {
  const realUrl = decodeImageToken(req.params.token);
  if (!realUrl || !isAllowedImageUrl(realUrl)) {
    res.status(404).end();
    return;
  }

  const cached = getCached(realUrl);
  if (cached) {
    res.setHeader("Content-Type", cached.contentType);
    res.setHeader("Cache-Control", "public, max-age=21600, immutable");
    res.setHeader("X-Img-Cache", "HIT");
    res.status(200).send(cached.body);
    return;
  }

  try {
    const upstream = await fetch(realUrl);
    if (!upstream.ok) {
      logger.warn({ status: upstream.status }, "Image proxy upstream returned non-OK");
      res.status(502).end();
      return;
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const body = await readBodyWithCap(upstream, HARD_MAX_BYTES);
    if (!body) {
      logger.warn({ url: realUrl }, "Image proxy response exceeded size cap");
      res.status(502).end();
      return;
    }

    if (body.byteLength <= MAX_CACHEABLE_BYTES) {
      setCached(realUrl, { body, contentType, expires: Date.now() + IMG_CACHE_TTL_MS });
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=21600, immutable");
    res.setHeader("X-Img-Cache", "MISS");
    res.status(200).send(body);
  } catch (err) {
    logger.warn({ err }, "Image proxy fetch failed");
    res.status(502).end();
  }
});

export default router;
