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
