import { Router, type IRouter, type Request, type Response } from "express";
import { Resend } from "resend";
import { submitRateLimit } from "../lib/rate-limit";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const NOTIFY_EMAIL = "chris@merchclub.com";
const FROM_EMAIL = process.env.EMAIL_FROM ?? "Merch Club <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return value
    ? `<tr>
    <td style="padding:7px 0;color:#a1a1aa;font-size:13px;width:34%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:7px 0;font-size:14px;color:#18181b;font-weight:500;line-height:1.45;">${esc(value)}</td>
  </tr>`
    : "";
}

function rowLink(label: string, value: string, href: string): string {
  return value
    ? `<tr>
    <td style="padding:7px 0;color:#a1a1aa;font-size:13px;width:34%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:7px 0;font-size:14px;font-weight:500;line-height:1.45;"><a href="${esc(href)}" style="color:#2563eb;text-decoration:none;font-weight:600;">${esc(value)}</a></td>
  </tr>`
    : "";
}

function sectionLabel(text: string): string {
  return `<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a1a1aa;">${esc(text)}</p>`;
}

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  topic: string;
  message: string;
  projectType: string;
  timeline: string;
  budget: string;
  source: string;
  page: string;
}

function buildEmailHtml(d: ContactPayload, submittedAt: string): string {
  const replyMailto = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent("Re: Your Merch Club inquiry")}`;
  const firstName = d.name.split(/\s+/)[0] || d.name;
  const companyLine = d.company
    ? `<span style="color:#71717a;font-weight:500;"> &middot; ${esc(d.company)}</span>`
    : "";

  const topicDisplay = d.topic || d.projectType || "";
  const sourceDisplay = d.source || "Website contact form";

  const whoRows = [
    rowLink("Email", d.email, `mailto:${d.email}`),
    d.phone ? rowLink("Phone", d.phone, `tel:${d.phone.replace(/[^0-9+]/g, "")}`) : "",
  ].filter(Boolean).join("\n");

  const detailRows = [
    row("Topic / Type", topicDisplay),
    row("Timeline", d.timeline),
    row("Budget", d.budget),
  ].filter(Boolean).join("\n");

  const hasDetails = topicDisplay || d.timeline || d.budget;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry — Merch Club</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New inquiry from ${esc(d.name)}${d.company ? " at " + esc(d.company) : ""}${topicDisplay ? " — " + esc(topicDisplay) : ""}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;border:1px solid #e4e4e7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

          <tr><td style="padding:32px 28px 0;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#a1a1aa;">Merch Club &middot; ${esc(sourceDisplay)}</p>
            <h1 style="margin:0 0 6px;font-size:26px;line-height:1.15;font-weight:800;color:#18181b;letter-spacing:-0.02em;">New Inquiry</h1>
            <p style="margin:0;font-size:14px;color:#71717a;line-height:1.5;">${esc(d.name)}${d.company ? " &middot; " + esc(d.company) : ""}${topicDisplay ? " &middot; " + esc(topicDisplay) : ""}</p>
          </td></tr>

          <tr><td style="padding:28px 28px 0;">
            ${sectionLabel("Who")}
            <p style="margin:0 0 14px;font-size:19px;font-weight:800;color:#18181b;letter-spacing:-0.01em;">${esc(d.name)}${companyLine}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${whoRows}</table>
          </td></tr>

          ${hasDetails ? `<tr><td style="padding:28px 28px 0;">
            ${sectionLabel("Details")}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${detailRows}</table>
          </td></tr>` : ""}

          <tr><td style="padding:28px 28px 0;">
            ${sectionLabel("Message")}
            <p style="margin:0;font-size:14px;color:#18181b;line-height:1.65;white-space:pre-wrap;">${esc(d.message)}</p>
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
            ${d.page ? `<p style="margin:4px 0 0;font-size:12px;color:#c4c4c8;">${esc(d.page)}</p>` : ""}
          </td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

router.post("/contact", submitRateLimit, async (req: Request, res: Response) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  const name = s(body.name);
  const email = s(body.email);
  const message = s(body.message);

  if (!name) { res.status(400).json({ ok: false, message: "Name is required." }); return; }
  if (!email) { res.status(400).json({ ok: false, message: "Email is required." }); return; }
  if (!EMAIL_RE.test(email)) { res.status(400).json({ ok: false, message: "Invalid email address." }); return; }
  if (!message) { res.status(400).json({ ok: false, message: "Message is required." }); return; }

  const payload: ContactPayload = {
    name,
    email,
    company: s(body.company),
    phone: s(body.phone),
    topic: s(body.topic),
    message,
    projectType: s(body.projectType),
    timeline: s(body.timeline),
    budget: s(body.budget),
    source: s(body.source) || "Website contact form",
    page: s(body.page),
  };

  const resend = getResend();
  if (!resend) {
    logger.warn("RESEND_API_KEY not set — contact form email skipped");
    res.status(503).json({ ok: false, message: "Email delivery is temporarily unavailable. Please email chris@merchclub.com directly." });
    return;
  }

  try {
    const submittedAt =
      new Date().toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "America/New_York",
      }) + " ET";

    const topicLine = payload.topic || payload.projectType || "";
    const subject = `New Inquiry — ${payload.company || payload.name}${topicLine ? " · " + topicLine : ""}`;

    const { error: sendErr } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: payload.email,
      subject,
      html: buildEmailHtml(payload, submittedAt),
    });

    if (sendErr) {
      logger.error({ err: sendErr }, "Contact form email rejected by Resend");
      res.status(502).json({ ok: false, message: "Failed to send your message. Please email chris@merchclub.com directly." });
      return;
    }

    logger.info({ from: payload.email, source: payload.source }, "Contact form email sent");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Unexpected error sending contact form email");
    res.status(500).json({ ok: false, message: "Something went wrong. Please email chris@merchclub.com directly." });
  }
});

export default router;
