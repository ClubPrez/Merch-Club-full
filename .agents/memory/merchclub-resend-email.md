---
name: Merch Club quote-notification email (Resend)
description: Why quote emails may not send even with a valid RESEND_API_KEY, and what gates it
---

# Merch Club quote emails via Resend

The quote-request route sends a notification email best-effort AFTER the lead is
already saved to Supabase — so a failing email never blocks lead capture.

## The gating issue (external account state, not code)
A valid `RESEND_API_KEY` is necessary but NOT sufficient. Resend will only send
FROM a custom-domain address if that **domain is verified in the Resend account**.

- Signature of the problem: HTTP **403** `"This API key is not authorized to send
  emails from merchclub.com"`. The key authenticated fine (no 401) — the DOMAIN is
  the blocker.
- Fix (user-side, requires DNS access): Resend → Domains → add `merchclub.com` →
  add the provided SPF/DKIM (and DMARC) records at the domain's DNS provider →
  Verify. No code change needed afterward; the default From address already targets
  this domain.

**Why this matters:** it's invisible from the codebase — you cannot grep your way
to "is the domain verified." If a future session sees leads saving but no emails
arriving, check Resend domain verification first, then re-run the live send test.

## Quick live test (no DB row created)
Run a Node process (has runtime env) that POSTs to `https://api.resend.com/emails`
with `Authorization: Bearer $RESEND_API_KEY`, using the same From/To as the route.
Read the HTTP status: 200 = delivering, 403 = domain not verified, 401 = bad key.
Never print the key value.

## Dev-sender fallback (test before the domain verifies)
The From address is env-driven: `process.env.EMAIL_FROM ?? "Merch Club
<quotes@merchclub.com>"`. Set `EMAIL_FROM="Merch Club <onboarding@resend.dev>"`
(Resend's universal test sender) to send immediately; later swap to the verified
custom-domain address with only an env change + api-server restart (no code edit).

**Surprising:** a key that is domain-restricted to merchclub.com (returns the 403
above for merchclub.com sends) STILL sends fine via `onboarding@resend.dev` — a
direct probe returned HTTP 200 and the live route logged "Quote notification email
sent". So the dev sender is a reliable end-to-end test path even with a scoped key.
(Delivery of the test sender is still limited to the Resend account's own address.)

## reply-to field naming + error handling
Reply-to must ALWAYS be the customer's email. Resend **Node SDK v6 uses `replyTo`
(camelCase)**; the **REST API uses `reply_to` (snake_case)**. `resend.emails.send()`
returns `{ data, error }` and does NOT throw on 4xx — check the returned `error`,
not just try/catch, or failures look like successes.
