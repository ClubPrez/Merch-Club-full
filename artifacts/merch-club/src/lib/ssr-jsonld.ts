// SSR-only JSON-LD collector.
//
// During the build-time prerender (vite SSR build), the SEO component pushes its
// `jsonLd` prop here while React renders the page to a string. entry-server's
// render() resets this before each route and reads it after, so prerender.mjs can
// bake the structured data into the raw <head>. On the client this module is never
// exercised (the push is guarded by `import.meta.env.SSR`, which is statically
// false in the browser bundle and gets tree-shaken away).

type JsonLdInput = object | object[] | null | undefined;

let collected: object[] = [];

export function resetSSRJsonLd(): void {
  collected = [];
}

export function pushSSRJsonLd(jsonLd: JsonLdInput): void {
  if (!jsonLd) return;
  if (Array.isArray(jsonLd)) {
    for (const item of jsonLd) {
      if (item) collected.push(item);
    }
  } else {
    collected.push(jsonLd);
  }
}

export function getSSRJsonLd(): object[] {
  return collected;
}
