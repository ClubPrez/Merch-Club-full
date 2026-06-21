---
name: Instant Quote priceability gating
description: The shared rule every price-rendering surface in the quote modal must obey so a $0/NaN/misleading price is never shown.
---

# Instant Quote priceability gating

**Rule:** Every surface that renders a price in `quote-modal.tsx` — the big per-unit
price, each decoration **method card**, the contact-view summary, and the footer
CTA — must gate on the *same* priceability predicate. That predicate requires ALL
of: at least one valid quantity tier (`qtyBreakpoints.length > 0`), a positive base
price for the selected tier (`isPriceable(basePerUnit)`), and a finite positive
computed price (`isPriceable(perUnit)` / `isPriceable(methodUnit)`). `isPriceable`
= finite AND `> 0`.

**Why:** A method card once used only `isPriceable(methodUnit)`. Because the per-unit
formula is `base + perColorRun*colorsBeyondFirst*effectiveLocations`, a product with
`base = 0` but a positive run charge yields `methodUnit > 0`, so the card showed a
real-looking `$X.XX` while the main quote correctly said "Contact us for pricing."
That is exactly the "never display a misleading price" violation the hardening was
meant to prevent. Hidden/empty sections are not enough — visible cards must also be
gated.

**How to apply:** When adding or editing any price display in the quote modal, derive
its visibility from the same checks as `canPrice`, not just from whether its own
number is positive. Keep `perUnit` NaN-able (default `NaN`, not `0`) so a stray
`.toFixed()` surfaces as an obvious bug rather than a silent `$0.00`, and make sure
every `.toFixed()` call site sits inside a priceable branch. Backend mirror: the
`/quote-request` validator rejects `perUnit <= 0` (not just `< 0`) so a $0 quote can
never be submitted even if a client path slips through.
