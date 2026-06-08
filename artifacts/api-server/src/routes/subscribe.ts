import { Router, type IRouter } from "express";
import { db, subscribersTable } from "@workspace/db";

const router: IRouter = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/subscribe", async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  try {
    await db
      .insert(subscribersTable)
      .values({ email })
      .onConflictDoNothing();

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to subscribe. Please try again." });
  }
});

export default router;
