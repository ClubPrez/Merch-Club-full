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
// Env-driven so the sender can be swapped without a code change:
//   • before domain verification: EMAIL_FROM="Merch Club <onboarding@resend.dev>"
//   • after merchclub.com verified:  EMAIL_FROM="Merch Club <quotes@merchclub.com>"
const FROM_EMAIL = process.env.EMAIL_FROM ?? "Merch Club <quotes@merchclub.com>";

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

function rowRaw(label: string, htmlValue: string): string {
  return `<tr>
    <td style="padding:7px 0;color:#a1a1aa;font-size:13px;width:34%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:7px 0;font-size:14px;color:#18181b;font-weight:500;line-height:1.45;">${htmlValue}</td>
  </tr>`;
}

function row(label: string, value: string): string {
  return rowRaw(label, esc(value));
}

function sectionLabel(text: string): string {
  return `<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a1a1aa;">${esc(text)}</p>`;
}

function buildEmailHtml(
  d: ValidatedPayload,
  artworkUrl: string | null,
  submittedAt: string,
): string {
  const colorsStr =
    d.numColors != null ? `${d.numColors} color${d.numColors !== 1 ? "s" : ""}` : "—";
  const locsStr =
    d.numLocations != null
      ? `${d.numLocations} location${d.numLocations !== 1 ? "s" : ""}`
      : "—";
  const perUnitStr = `$${Number(d.perUnit).toFixed(2)}`;
  const qtyStr = Number(d.qty).toLocaleString();
  const firstName = d.name.split(/\s+/)[0] || d.name;

  // Reply-to button: opens a pre-filled email back to the customer.
  const replyMailto = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent(
    "Re: Your Merch Club quote request",
  )}`;

  const whoRows = [
    rowRaw(
      "Email",
      `<a href="mailto:${encodeURIComponent(d.email)}" style="color:#2563eb;text-decoration:none;font-weight:600;">${esc(d.email)}</a>`,
    ),
    ...(d.phone
      ? [
          rowRaw(
            "Phone",
            `<a href="tel:${esc(d.phone.replace(/[^0-9+]/g, ""))}" style="color:#18181b;text-decoration:none;">${esc(d.phone)}</a>`,
          ),
        ]
      : []),
    ...(d.zip ? [row("Zip", d.zip)] : []),
  ].join("\n");

  const whatRows = [
    row("Product", d.productName),
    row("Quantity", `${qtyStr} units`),
    row("Decoration", d.method),
    row("Colors", colorsStr),
    row("Locations", locsStr),
    rowRaw(
      "Est. per unit",
      `<span style="font-weight:800;font-size:16px;color:#18181b;">${esc(perUnitStr)}</span>`,
    ),
  ].join("\n");

  const artworkBlock = artworkUrl
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="border-radius:10px;background:#ffffff;border:1.5px solid #18181b;">
          <a href="${esc(artworkUrl)}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:700;color:#18181b;text-decoration:none;border-radius:10px;">&#11015;&nbsp;&nbsp;Download Artwork</a>
        </td>
      </tr></table>
      <p style="margin:12px 0 0;font-size:12px;color:#a1a1aa;line-height:1.5;">${
        d.artworkFileName ? esc(d.artworkFileName) + " &middot; " : ""
      }secure link, expires in 7 days</p>`
    : `<p style="margin:0;font-size:14px;color:#71717a;">Customer will send artwork later.</p>`;

  const companyLine = d.company
    ? `<span style="color:#71717a;font-weight:500;"> &middot; ${esc(d.company)}</span>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>New Quote Request</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New quote from ${esc(d.name)}${
    d.company ? " at " + esc(d.company) : ""
  } — ${esc(qtyStr)} units of ${esc(d.productName)} at ${esc(perUnitStr)}/unit.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;border:1px solid #e4e4e7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

          <tr><td style="padding:32px 28px 0;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#a1a1aa;">Merch Club &middot; Instant Quote</p>
            <h1 style="margin:0 0 6px;font-size:26px;line-height:1.15;font-weight:800;color:#18181b;letter-spacing:-0.02em;">New Quote Request</h1>
            <p style="margin:0;font-size:14px;color:#71717a;line-height:1.5;">${esc(qtyStr)} units &middot; ${esc(d.productName)} &middot; <strong style="color:#18181b;">${esc(perUnitStr)}/unit</strong></p>
          </td></tr>

          <tr><td style="padding:28px 28px 0;">
            ${sectionLabel("Who")}
            <p style="margin:0 0 14px;font-size:19px;font-weight:800;color:#18181b;letter-spacing:-0.01em;">${esc(d.name)}${companyLine}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${whoRows}</table>
          </td></tr>

          <tr><td style="padding:28px 28px 0;">
            ${sectionLabel("What")}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${whatRows}</table>
          </td></tr>

          <tr><td style="padding:28px 28px 0;">
            ${sectionLabel("Artwork")}
            ${artworkBlock}
          </td></tr>

          <tr><td style="padding:28px 28px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td align="center" style="border-radius:12px;background:#18181b;">
                <a href="${esc(replyMailto)}" style="display:block;padding:16px 24px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;text-align:center;">Reply to ${esc(firstName)} &rarr;</a>
              </td>
            </tr></table>
          </td></tr>

          <tr><td style="padding:24px 28px 32px;">
            <hr style="border:none;border-top:1px solid #f0f0f0;margin:0 0 16px;">
            <p style="margin:0;font-size:12px;color:#a1a1aa;">Submitted ${esc(submittedAt)}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#c4c4c8;">Merch Club Instant Quote tool &middot; merchclub.com</p>
          </td></tr>

        </table>
      </td>
    </tr>
  </table>
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
      const submittedAt =
        new Date().toLocaleString("en-US", {
          dateStyle: "long",
          timeStyle: "short",
          timeZone: "America/New_York",
        }) + " ET";
      const subject = `New Quote Request — ${data.company || data.name} (${Number(
        data.qty,
      ).toLocaleString()} units)`;
      const { error: sendErr } = await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        replyTo: data.email,
        subject,
        html: buildEmailHtml(data, artworkUrl, submittedAt),
      });
      if (sendErr) {
        logger.warn(
          { err: sendErr },
          "Quote notification email rejected by Resend — lead already saved to DB",
        );
      } else {
        logger.info({ to: NOTIFY_EMAIL }, "Quote notification email sent");
      }
    } catch (err) {
      logger.warn({ err }, "Quote notification email failed — lead already saved to DB");
    }
  }

  res.json({ ok: true });
});

export default router;
