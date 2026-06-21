import { Router, type IRouter } from "express";
import { searchProducts, SageError, type PublicProduct } from "../lib/sage";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const CACHE_TTL_MS = 60_000;

interface CacheEntry {
  expires: number;
  products: PublicProduct[];
}

const cache = new Map<string, CacheEntry>();

function getCached(key: string): PublicProduct[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.products;
}

function setCached(key: string, products: PublicProduct[]): void {
  cache.set(key, { products, expires: Date.now() + CACHE_TTL_MS });
}

router.post("/search", async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  const query = typeof body.query === "string" ? body.query.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const pageNum = Number(body.page);
  const page = Number.isFinite(pageNum) && pageNum > 0 ? Math.floor(pageNum) : 1;

  if (!query) {
    res.status(400).json({ ok: false, message: "A search query is required." });
    return;
  }

  const cacheKey = JSON.stringify({ query, category, page });
  const cached = getCached(cacheKey);
  if (cached) {
    res.status(200).json({ ok: true, products: cached });
    return;
  }

  try {
    const products = await searchProducts({
      query,
      category: category || undefined,
      page,
    });
    setCached(cacheKey, products);
    res.status(200).json({ ok: true, products });
  } catch (err) {
    if (err instanceof SageError) {
      logger.warn({ errNum: err.errNum, detail: err.detail }, "SAGE product search failed");
      res.status(502).json({ ok: false, message: err.message });
      return;
    }
    logger.error({ err }, "Unexpected error during SAGE product search");
    res.status(500).json({ ok: false, message: "Something went wrong. Please try again." });
  }
});

export default router;
