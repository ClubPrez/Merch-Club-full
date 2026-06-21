import { Router, type IRouter } from "express";
import { getFullQuoteData, SageError, type PublicQuoteData } from "../lib/sage";
import { quoteDataRateLimit } from "../lib/rate-limit";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  expires: number;
  data: PublicQuoteData;
}

const cache = new Map<string, CacheEntry>();

function getCached(key: string): PublicQuoteData | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached(key: string, data: PublicQuoteData): void {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL_MS });
}

router.get("/quote-data/:id", quoteDataRateLimit, async (req, res) => {
  const rawId = req.params.id;
  const prodEId = Number(rawId);

  if (!rawId || !Number.isFinite(prodEId) || prodEId <= 0) {
    res.status(400).json({ ok: false, message: "A valid product id is required." });
    return;
  }

  const cacheKey = String(prodEId);
  const cached = getCached(cacheKey);
  if (cached) {
    res.status(200).json({ ok: true, data: cached });
    return;
  }

  try {
    const data = await getFullQuoteData(prodEId);
    setCached(cacheKey, data);
    res.status(200).json({ ok: true, data });
  } catch (err) {
    if (err instanceof SageError) {
      logger.warn({ errNum: err.errNum, detail: err.detail }, "SAGE full quote data failed");
      const status = err.errNum === 10501 || err.errNum === 10502 ? 404 : 502;
      res.status(status).json({ ok: false, message: err.message });
      return;
    }
    logger.error({ err }, "Unexpected error during SAGE full quote data");
    res.status(500).json({ ok: false, message: "Something went wrong. Please try again." });
  }
});

export default router;
