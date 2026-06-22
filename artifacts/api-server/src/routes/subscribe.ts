import { Router, type IRouter } from "express";
import { getDb, subscribersTable } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/subscribe", async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  // The newsletter is the ONLY feature that needs the Postgres database. When
  // DATABASE_URL is not configured (e.g. on the serverless deployment, which
  // intentionally does not depend on the dev database), degrade gracefully
  // instead of crashing — every other route works without a database. Note:
  // getDb() is only referenced here, so importing this module never opens a pool.
  if (!process.env.DATABASE_URL) {
    logger.warn("Newsletter signup attempted but DATABASE_URL is not configured");
    res.status(503).json({
      ok: false,
      message: "Newsletter signup is temporarily unavailable.",
    });
    return;
  }

  try {
    const db = getDb();
    await db.insert(subscribersTable).values({ email }).onConflictDoNothing();

    res.status(200).json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to save newsletter subscriber");
    res.status(500).json({ error: "Failed to subscribe. Please try again." });
  }
});

export default router;
