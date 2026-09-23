---
name: Vite preview clean URLs
description: Local verification of prerendered nested pages in Vite preview
---

Vite's local preview serves the homepage fallback for a request such as `/about`, even when the built output contains `about/index.html`. `/about/` serves the actual prerendered nested HTML.

**Why:** A browser hydration check against the slashless URL appeared to report React mismatches, but the browser had received homepage HTML for the About route. The prerendered document hydrated without errors when served from its actual directory URL.

**How to apply:** Use a trailing slash when verifying built nested page HTML locally, and check the returned title before attributing hydration errors to React. Client-side navigation can still use slashless routes.