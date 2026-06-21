---
name: SAGE image URLs leak supplier identity by value
description: Why every SAGE/promoplace image URL must be proxied, not just field-stripped, before reaching the client.
---

SAGE/promoplace product image URLs embed `SN=<suppId>` in the query string, and that `SN` value equals the confidential `suppId` (supplier identity) we strip everywhere else. A field-name whitelist on the JSON response does NOT catch this — the leak is a *value* inside a functional URL string (`pics[].url`, search `thumb`), not a named field.

**Rule:** Any endpoint that returns a SAGE image URL must route it through the server-side image proxy (`toProxiedImageUrl` → `/api/img/<token>`), which AES-GCM-encrypts the upstream URL so the client never sees the promoplace host or `SN`. Applies app-wide: search thumbs, product pics, quote-data pics, and any future image-returning endpoint.

**Why:** A code review caught `SN=69533` == raw `suppId=69533` leaking through image URLs even though no forbidden JSON *keys* were present. Customers/competitors could fingerprint the supplier from the CDN URL.

**How to apply:** When adding/modifying any serializer that emits a SAGE image, wrap the URL in `toProxiedImageUrl(url, 600)` (keep RS=600 for card + detail). Never return a raw `promoplace.com` URL to the client. Verify by grepping the live JSON response for `promoplace`, `SN=`, `qpic`, and the literal `suppId` value — all must be absent.

**Proxy hardening invariants (don't regress):** key derives from `SAGE_AUTH_KEY`/`IMAGE_PROXY_SECRET` and must fail closed if absent (no guessable fallback key); host check is exact (`=== "promoplace.com"` or `.endsWith(".promoplace.com")`, HTTPS only) to block SSRF/look-alike hosts; the in-memory image cache is bounded by entry count, per-entry size, AND a total byte budget, with reads capped to a hard max so a huge/unbounded upstream response can't exhaust memory.
