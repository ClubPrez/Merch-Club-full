import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import multer from "multer";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// ── Internal types ────────────────────────────────────────────────────────────

interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

// ── Service clients ───────────────────────────────────────────────────────────

function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const NOTIFY_EMAIL = "chris@merchclub.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Merch Club <quotes@merchclub.com>";

// Private Supabase Storage bucket (created manually). Service/secret key only.
const ARTWORK_BUCKET = "quote-artwork";

// ── Multer (memory storage, 20 MB cap) ───────────────────────────────────────

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/postscript",
  "application/illustrator",
  "image/x-eps",
  "application/x-eps",
]);
const ALLOWED_EXT = /\.(jpg|jpeg|png|gif|webp|svg|pdf|ai|eps)$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype) || ALLOWED_EXT.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Unsupported file type. Please upload PNG, JPG, PDF, AI, EPS, or SVG.",
        ),
      );
    }
  },
});

// ── Validation ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RawBody {
  productId?: unknown;
  productName?: unknown;
  qty?: unknown;
  method?: unknown;
  numColors?: unknown;
  numLocations?: unknown;
  perUnit?: unknown;
  artworkFileId?: unknown;
  artworkFileName?: unknown;
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  zip?: unknown;
}

interface ValidatedPayload {
  productId: string;
  productName: string;
  qty: number;
  method: string;
  numColors: number | null;
  numLocations: number | null;
  perUnit: number;
  artworkFileId: string | null;
  artworkFileName: string | null;
  name: string;
  company: string;
  email: string;
  phone: string;
  zip: string;
}

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function validateBody(
  body: RawBody,
): { ok: true; data: ValidatedPayload } | { ok: false; message: string } {
  const productId = s(body.productId);
  const productName = s(body.productName);
  const qty = Number(body.qty);
  const method = s(body.method);
  const perUnit = Number(body.perUnit);
  const name = s(body.name);
  const email = s(body.email);

  if (!productId) return { ok: false, message: "Missing productId." };
  if (!productName) return { ok: false, message: "Missing productName." };
  if (!Number.isFinite(qty) || qty <= 0) return { ok: false, message: "Invalid qty." };
  if (!method) return { ok: false, message: "Missing method." };
  if (!Number.isFinite(perUnit) || perUnit < 0)
    return { ok: false, message: "Invalid perUnit." };
  if (!name) return { ok: false, message: "Name is required." };
  if (!email) return { ok: false, message: "Email is required." };
  if (!EMAIL_RE.test(email))
    return { ok: false, message: "Invalid email address." };

  const rawFileId = s(body.artworkFileId);
  const rawFileName = s(body.artworkFileName);

  return {
    ok: true,
    data: {
      productId,
      productName,
      qty,
      method,
      numColors:
        body.numColors != null && body.numColors !== ""
          ? Number(body.numColors)
          : null,
      numLocations:
        body.numLocations != null && body.numLocations !== ""
          ? Number(body.numLocations)
          : null,
      perUnit,
      artworkFileId: rawFileId || null,
      artworkFileName: rawFileName || null,
      name,
      company: s(body.company),
      email,
      phone: s(body.phone),
      zip: s(body.zip),
    },
  };
}

// ── Email template ────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:5px 0;color:#777;font-size:13px;width:38%;">${esc(label)}</td>
    <td style="padding:5px 0;font-size:13px;">${esc(value)}</td>
  </tr>`;
}

function buildEmailHtml(d: ValidatedPayload, artworkUrl: string | null): string {
  const colorsStr =
    d.numColors != null ? `${d.numColors} color${d.numColors !== 1 ? "s" : ""}` : "—";
  const locsStr =
    d.numLocations != null
      ? `${d.numLocations} location${d.numLocations !== 1 ? "s" : ""}`
      : "—";

  const quoteRows = [
    row("Product", d.productName),
    row("Product ID", d.productId),
    row("Quantity", `${Number(d.qty).toLocaleString()} units`),
    row("Method", d.method),
    row("Colors", colorsStr),
    row("Locations", locsStr),
  ].join("\n");

  const contactRows = [
    row("Name", d.name),
    ...(d.company ? [row("Company", d.company)] : []),
    row("Email", d.email),
    ...(d.phone ? [row("Phone", d.phone)] : []),
    ...(d.zip ? [row("Zip", d.zip)] : []),
  ].join("\n");

  const artworkSection =
    artworkUrl && d.artworkFileName
      ? `
    <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#aaa;margin:28px 0 10px;">Artwork</h3>
    <table style="width:100%;border-collapse:collapse;">
      ${row("File", d.artworkFileName)}
    </table>
    <p style="font-size:12px;color:#888;margin:8px 0 4px;">Secure download link (valid 7 days):</p>
    <a href="${esc(artworkUrl)}" style="color:#111;font-size:12px;word-break:break-all;">${esc(artworkUrl)}</a>
  `
      : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f9f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:580px;margin:32px auto;background:#fff;border-radius:12px;padding:36px;border:1px solid #eee;">
  <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#aaa;">Merch Club</p>
  <h1 style="margin:0 0 6px;font-size:26px;font-weight:900;color:#111;">New Quote Request</h1>
  <p style="margin:0 0 28px;font-size:13px;color:#999;">Submitted via the Instant Quote tool</p>

  <div style="background:#f5f5f5;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
    <span style="font-size:20px;font-weight:900;color:#111;">$${Number(d.perUnit).toFixed(2)}</span>
    <span style="font-size:13px;color:#888;"> / unit &nbsp;&middot;&nbsp; ${esc(d.productName)} &nbsp;&middot;&nbsp; ${Number(d.qty).toLocaleString()} units &nbsp;&middot;&nbsp; ${esc(d.method)}</span>
  </div>

  <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#aaa;margin:0 0 10px;">Quote Details</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
    ${quoteRows}
    <tr style="border-top:1px solid #eee;">
      <td style="padding:10px 0 6px;color:#111;font-weight:700;font-size:13px;">Est. Per Unit</td>
      <td style="padding:10px 0 6px;font-weight:900;font-size:17px;color:#111;">$${Number(d.perUnit).toFixed(2)}</td>
    </tr>
  </table>

  <h3 style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#aaa;margin:0 0 10px;">Contact</h3>
  <table style="width:100%;border-collapse:collapse;">
    ${contactRows}
  </table>

  ${artworkSection}

  <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px;">
  <p style="font-size:11px;color:#bbb;margin:0;">Sent from <a href="https://merchclub.com" style="color:#bbb;">merchclub.com</a> Instant Quote tool</p>
</div>
</body>
</html>`;
}

// ── POST /quote-request/upload ────────────────────────────────────────────────

router.post(
  "/quote-request/upload",
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("file")(req as any, res, (err: unknown) => {
      if (err instanceof multer.MulterError) {
        res.status(400).json({
          ok: false,
          message:
            err.code === "LIMIT_FILE_SIZE"
              ? "File exceeds 20MB limit."
              : err.message,
        });
        return;
      }
      if (err) {
        res
          .status(400)
          .json({ ok: false, message: (err as Error).message ?? "Upload error." });
        return;
      }
      next();
    });
  },
  async (req: Request, res: Response) => {
    const file = (req as any).file as UploadedFile | undefined;
    if (!file) {
      res.status(400).json({ ok: false, message: "No file provided." });
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      logger.warn("Supabase not configured — artwork upload unavailable");
      res.status(503).json({
        ok: false,
        message:
          "Artwork upload is temporarily unavailable. You can proceed without artwork.",
      });
      return;
    }

    try {
      const ext = file.originalname.split(".").pop()?.toLowerCase() ?? "bin";
      const fileId = `${randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from(ARTWORK_BUCKET)
        .upload(fileId, file.buffer, { contentType: file.mimetype, upsert: false });

      if (error) {
        logger.error({ err: error }, "Supabase Storage upload failed");
        res.status(502).json({
          ok: false,
          message: "Artwork upload failed. You can proceed without artwork.",
        });
        return;
      }

      res.json({ ok: true, fileId, fileName: file.originalname });
    } catch (err) {
      logger.error({ err }, "Unexpected error during artwork upload");
      res
        .status(500)
        .json({ ok: false, message: "Artwork upload failed. You can proceed without artwork." });
    }
  },
);

// ── POST /quote-request ───────────────────────────────────────────────────────

router.post("/quote-request", async (req: Request, res: Response) => {
  const result = validateBody(req.body as RawBody);
  if (!result.ok) {
    res.status(400).json({ ok: false, message: result.message });
    return;
  }
  const { data } = result;

  // 1 ── Save lead (durable record — must succeed before email is attempted)
  const supabase = getSupabase();
  if (!supabase) {
    logger.warn("Supabase not configured — cannot save quote request");
    res.status(503).json({
      ok: false,
      message:
        "Quote submission is temporarily unavailable. Please email chris@merchclub.com directly.",
    });
    return;
  }

  const { error: dbError } = await supabase.from("quote_requests").insert({
    product_id: data.productId,
    product_name: data.productName,
    quantity: data.qty,
    decoration_method: data.method,
    colors: data.numColors,
    locations: data.numLocations,
    per_unit: data.perUnit,
    artwork_file_id: data.artworkFileId,
    artwork_file_name: data.artworkFileName,
    contact_name: data.name,
    company: data.company || null,
    email: data.email,
    phone: data.phone || null,
    zip: data.zip || null,
  });

  if (dbError) {
    logger.error({ err: dbError }, "Failed to save quote request to Supabase");
    res
      .status(500)
      .json({ ok: false, message: "Something went wrong. Please try again." });
    return;
  }

  logger.info({ email: data.email, productId: data.productId }, "Quote request saved");

  // 2 ── Generate signed artwork URL (best-effort)
  let artworkUrl: string | null = null;
  if (data.artworkFileId) {
    try {
      const { data: signed, error: signErr } = await supabase.storage
        .from(ARTWORK_BUCKET)
        .createSignedUrl(data.artworkFileId, 7 * 24 * 3600);
      if (signErr) {
        logger.warn({ err: signErr }, "Failed to generate artwork signed URL");
      } else {
        artworkUrl = signed?.signedUrl ?? null;
      }
    } catch (err) {
      logger.warn({ err }, "Exception generating artwork signed URL");
    }
  }

  // 3 ── Send notification email (best-effort — lead already saved above)
  const resend = getResend();
  if (!resend) {
    logger.warn("RESEND_API_KEY not set — skipping notification email");
  } else {
    try {
      const subject = `New Quote Request — ${data.company || data.name}`;
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject,
        html: buildEmailHtml(data, artworkUrl),
      });
      logger.info({ to: NOTIFY_EMAIL }, "Quote notification email sent");
    } catch (err) {
      logger.warn({ err }, "Quote notification email failed — lead already saved to DB");
    }
  }

  res.json({ ok: true });
});

export default router;
