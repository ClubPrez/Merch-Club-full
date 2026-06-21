import { Router, type IRouter } from "express";
import { getProductDetail, SageError, type PublicProductDetail } from "../lib/sage";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  expires: number;
  product: PublicProductDetail;
}

const cache = new Map<string, CacheEntry>();

function getCached(key: string): PublicProductDetail | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.product;
}

function setCached(key: string, product: PublicProductDetail): void {
  cache.set(key, { product, expires: Date.now() + CACHE_TTL_MS });
}

router.get("/product/:id", async (req, res) => {
  const rawId = req.params.id;
  const prodEId = Number(rawId);

  if (!rawId || !Number.isFinite(prodEId) || prodEId <= 0) {
    res.status(400).json({ ok: false, message: "A valid product id is required." });
    return;
  }

  const cacheKey = String(prodEId);
  const cached = getCached(cacheKey);
  if (cached) {
    res.status(200).json({ ok: true, product: cached });
    return;
  }

  try {
    const product = await getProductDetail(prodEId);
    setCached(cacheKey, product);
    res.status(200).json({ ok: true, product });
  } catch (err) {
    if (err instanceof SageError) {
      logger.warn({ errNum: err.errNum, detail: err.detail }, "SAGE product detail failed");
      const status = err.errNum === 10401 ? 404 : 502;
      res.status(status).json({ ok: false, message: err.message });
      return;
    }
    logger.error({ err }, "Unexpected error during SAGE product detail");
    res.status(500).json({ ok: false, message: "Something went wrong. Please try again." });
  }
});

export default router;
