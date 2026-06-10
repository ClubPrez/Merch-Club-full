---
name: String.replace template injection corrupts $-sequences
description: Why prerender/template injection must use function replacements, and why JSON.parse validation won't catch the corruption.
---

# `String.prototype.replace` special patterns corrupt injected JSON/HTML

When injecting a generated string (JSON-LD, rendered app HTML, etc.) into a template
with `template.replace(marker, injectedString)`, the **replacement string** is parsed
for special patterns: `$$` → `$`, `$&` → matched text, `` $` `` → text before match,
`$'` → text after match. So a literal value like a JSON-LD `"priceRange": "$$-$$$"`
silently becomes `"$-$$"`, and a value containing `$&`/`$'` would splice chunks of the
template into your payload.

**Fix:** pass a function as the replacement — `html.replace(marker, () => injected)` —
which disables all `$` interpretation. (Or escape via `injected.replace(/\$/g, '$$$$')`.)

**Why this is sneaky:** the corrupted output is often still *valid JSON*, so a
`JSON.parse()` sweep over the prerendered HTML reports success and misses it entirely.

**How to apply:** in any string-templating/injection step (e.g.
`scripts/prerender.mjs`), prefer function replacements. When verifying prerendered
structured data, don't rely on parse-validity alone — also `grep` for the literal
expected value (e.g. `$$-$$$`) in the built `dist/` output.
