#!/usr/bin/env node
/**
 * Build-time prerender: generates route-specific HTML files with all meta
 * tags, canonical, OG/Twitter, JSON-LD, and visible body content baked in.
 *
 * Runs as `postbuild` via: node scripts/prerender.mjs
 * Requires the Vite build to have already output dist/public/index.html.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist', 'public');
const BASE_URL = 'https://merchclub.com';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Safe string replace — prevents $ in replacement being mis-interpreted */
const rep = (html, regex, str) => html.replace(regex, () => str);

function injectMeta(html, { title, description, canonical }) {
  html = rep(html, /<title>[^<]+<\/title>/, `<title>${title}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*"/, (_, p) => `${p}${description}"`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*"/, (_, p) => `${p}${canonical}"`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*"/, (_, p) => `${p}${title}"`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*"/, (_, p) => `${p}${description}"`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*"/, (_, p) => `${p}${canonical}"`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*"/, (_, p) => `${p}${title}"`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*"/, (_, p) => `${p}${description}"`);
  return html;
}

function injectSchemas(html, schemas) {
  const tags = schemas
    .map(s => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
    .join('\n');
  return html.replace('</head>', `${tags}\n</head>`);
}

function injectBody(html, bodyHtml) {
  return html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

function writeRoute(urlPath, html) {
  const segments = urlPath.split('/').filter(Boolean);
  const outDir = path.join(DIST, ...segments);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`  ✓  ${BASE_URL}${urlPath} → ${path.relative(process.cwd(), outFile)}`);
}

// ---------------------------------------------------------------------------
// Route: /tools/size-breakdown
// ---------------------------------------------------------------------------

const FAQS = [
  {
    q: 'What size distribution data does this use?',
    a: 'The calculator is based on national average unisex apparel distribution data, adjusted by audience type. The baseline reflects broad industry benchmarks across thousands of bulk apparel orders, then modified based on demographic patterns (age, gender skew, activity level, etc.).',
  },
  {
    q: "Does this work for women's cut or youth sizing?",
    a: "The tool outputs unisex sizing recommendations. For women's-cut apparel, select 'Women-Focused' and expect to size down one level relative to standard unisex. For youth sizing, the High School Students profile is the closest match — talk to your merch team to refine further.",
  },
  {
    q: 'My order is a mix of field crews and office staff — which audience do I pick?',
    a: "Run two separate calculations: one for your field headcount using 'Men-Focused' (assuming a male-heavy field crew) and one for office staff using 'Corporate / Office'. Combine the results for your final order.",
  },
  {
    q: 'Should I order extra safety stock in any sizes?',
    a: 'For most programs, we recommend adding 5–10% buffer on M, L, and XL — the three highest-demand sizes — especially for on-demand stores or programs with late joiners. Your Merch Club team can help you plan buffer inventory as part of your overall program.',
  },
  {
    q: 'Can I use this for hats, jackets, or other items?',
    a: 'This calculator is optimized for unisex T-shirts and similar cut-and-sew apparel. For structured caps, jackets, or bottoms, size distributions vary meaningfully — reach out and we\'ll help you plan the right run.',
  },
];

const SIZE_BREAKDOWN = {
  urlPath: '/tools/size-breakdown',
  title: 'Bulk T-Shirt Size Breakdown Calculator | Merch Club',
  description:
    'Free tool to plan your bulk apparel size run. Enter total quantity and audience type to get the optimal breakdown of each size, so you order right the first time.',
  canonical: `${BASE_URL}/tools/size-breakdown`,
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Learning Center', item: `${BASE_URL}/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Size Breakdown Tool',
          item: `${BASE_URL}/tools/size-breakdown`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Size Breakdown Tool',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Free bulk apparel size breakdown calculator. Enter your total order quantity and audience type to get the optimal size run, so you order the right number of each size.',
      url: `${BASE_URL}/tools/size-breakdown`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      provider: { '@type': 'Organization', name: 'Merch Club', url: BASE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Merch Club',
      url: BASE_URL,
      logo: `${BASE_URL}/opengraph.jpg`,
      description:
        'Full-service branded merchandise programs — strategy, design, production, kitting, and distribution.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Omaha',
        addressRegion: 'NE',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: `${BASE_URL}/contact`,
      },
    },
  ],
  bodyHtml: `<header style="background:#0a0a0a;padding:1rem 2rem;display:flex;align-items:center">
  <a href="/" style="color:white;font-weight:900;font-size:1.1rem;text-decoration:none">Merch Club</a>
  <nav aria-label="Main navigation" style="display:flex;gap:1.5rem;margin-left:2rem">
    <a href="/" style="color:#888;font-size:.875rem;text-decoration:none">Home</a>
    <a href="/about" style="color:#888;font-size:.875rem;text-decoration:none">About</a>
    <a href="/services" style="color:#888;font-size:.875rem;text-decoration:none">Services</a>
    <a href="/blog" style="color:#888;font-size:.875rem;text-decoration:none">Learning Center</a>
    <a href="/contact" style="color:#888;font-size:.875rem;text-decoration:none">Contact</a>
  </nav>
</header>
<main id="main-content">
  <nav aria-label="Breadcrumb" style="background:#0a0a0a;padding:2rem 2rem 0">
    <ol style="list-style:none;display:flex;flex-wrap:wrap;gap:.5rem;padding:0;margin:0;font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#666">
      <li><a href="/" style="color:#666;text-decoration:none">Home</a></li>
      <li style="color:#444">/</li>
      <li><a href="/blog" style="color:#666;text-decoration:none">Learning Center</a></li>
      <li style="color:#444">/</li>
      <li aria-current="page" style="color:#aaa">Size Breakdown Tool</li>
    </ol>
  </nav>
  <section aria-label="Tool introduction" style="background:#0a0a0a;padding:3rem 2rem 5rem;text-align:center">
    <p style="color:#666;font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.25em;margin-bottom:1rem">Merch Club Tools</p>
    <h1 style="color:white;font-size:clamp(2.5rem,7vw,5rem);font-weight:900;line-height:0.9;margin:0 auto 1.5rem;max-width:50rem">Bulk Apparel Size Breakdown Calculator</h1>
    <p style="color:#888;max-width:36rem;margin:0 auto;line-height:1.6;font-size:.9375rem">Enter your total order quantity and audience type to get the optimal size run &mdash; so you order the right number of each size, every time.</p>
  </section>
  <section aria-label="Size breakdown calculator" style="padding:5rem 2rem;background:white;border-bottom:1px solid rgba(0,0,0,.1)">
    <div style="max-width:48rem;margin:0 auto">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:2rem">
        <div>
          <label for="quantity-input" style="display:block;font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#888;margin-bottom:.5rem">Total Order Quantity</label>
          <input id="quantity-input" type="number" value="100" min="1" aria-label="Total order quantity" style="width:100%;border:1px solid rgba(0,0,0,.2);border-radius:.75rem;padding:.875rem 1rem;font-size:1.125rem;font-weight:700;box-sizing:border-box" />
        </div>
        <div>
          <label for="audience-select" style="display:block;font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#888;margin-bottom:.5rem">Audience Type</label>
          <select id="audience-select" aria-label="Audience type" style="width:100%;border:1px solid rgba(0,0,0,.2);border-radius:.75rem;padding:.875rem 1rem;font-size:.875rem;font-weight:500;box-sizing:border-box">
            <option value="average">General / Mixed &mdash; Standard national average distribution</option>
            <option value="younger">Younger Crowd (18&ndash;30) &mdash; Skews smaller, college students</option>
            <option value="hs_students">High School Students &mdash; Heavy XS, S, M; very few 2XL+</option>
            <option value="women_focused">Women-Focused &mdash; Adjusted for women&rsquo;s typical distribution</option>
            <option value="men_focused">Men-Focused &mdash; Adjusted for men&rsquo;s typical distribution</option>
            <option value="athletic">Athletic / Active &mdash; Centers M/L/XL</option>
            <option value="plus_focused">Plus / Larger Audience &mdash; Skews toward XL and above</option>
            <option value="mixed_corporate">Corporate / Office &mdash; Broad professional workforce</option>
          </select>
        </div>
      </div>
      <button type="button" aria-label="Calculate size breakdown for your order" style="background:black;color:white;font-weight:700;font-size:.875rem;padding:1rem 2.5rem;border-radius:9999px;border:none;cursor:pointer">Calculate Size Breakdown</button>
    </div>
  </section>
  <section aria-labelledby="how-to-heading" style="padding:5rem 2rem;background:white;border-bottom:1px solid rgba(0,0,0,.1)">
    <div style="max-width:48rem;margin:0 auto">
      <h2 id="how-to-heading" style="font-size:clamp(1.75rem,4vw,2.5rem);font-weight:900;line-height:0.95;margin-bottom:2rem">How to Use This Calculator</h2>
      <p style="color:#555;line-height:1.75;margin-bottom:1.25rem;font-size:.9375rem">Ordering the right mix of sizes is one of the most under-appreciated parts of a bulk apparel run. Order too many smalls and your team in the field is left fighting over the three larges that came in. Order too many XLs for a college-age population and you&rsquo;re left with extras nobody wants. This calculator takes the guesswork out of size planning by applying real-world distribution data to your specific audience.</p>
      <p style="color:#555;line-height:1.75;margin-bottom:1.25rem;font-size:.9375rem">Select your audience type &mdash; whether that&rsquo;s a general mixed workforce, an athletic club, a construction crew, or a high school student body &mdash; and enter your total quantity. The tool applies statistical adjustments to the national average size distribution and returns a recommended quantity per size that adds up exactly to your order total.</p>
      <p style="color:#555;line-height:1.75;margin-bottom:4rem;font-size:.9375rem">These recommendations are a starting point, not a guarantee. If you have historical order data or specific knowledge about your audience, layer that in. And if you&rsquo;re ordering for a mixed population spanning multiple locations or departments, consider running separate calculations per segment and combining the results.</p>
      <h2 id="faq-heading" style="font-size:clamp(1.75rem,4vw,2.5rem);font-weight:900;line-height:0.95;margin-bottom:2rem">Frequently Asked Questions</h2>
      <div>
        ${FAQS.map(faq => `<div style="border-top:1px solid rgba(0,0,0,.1);padding:1.5rem 0">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:.5rem;line-height:1.4">${faq.q}</h3>
          <p style="font-size:.875rem;color:#666;line-height:1.6;margin:0">${faq.a}</p>
        </div>`).join('\n        ')}
      </div>
      <nav aria-label="Related articles" style="margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid rgba(0,0,0,.1)">
        <h3 style="font-size:.625rem;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#888;margin-bottom:1.25rem">Related Reading</h3>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.75rem">
          <li><a href="/blog/merch-program-strategy" style="font-weight:600;color:black;text-underline-offset:4px">Why Your Merch Program Needs a Strategy &mdash; Not Just a Vendor</a></li>
          <li><a href="/blog/branded-merchandise-mistakes" style="font-weight:600;color:black;text-underline-offset:4px">5 Branded Merchandise Mistakes That Make Your Company Look Amateur</a></li>
          <li><a href="/blog/custom-kitting-brand-experience" style="font-weight:600;color:black;text-underline-offset:4px">The Hidden Cost of Unboxing: How Custom Kitting Elevates Brand Experience</a></li>
        </ul>
      </nav>
    </div>
  </section>
  <section aria-label="Start a project" style="background:#0a0a0a;padding:5rem 2rem;text-align:center">
    <h2 style="color:white;font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:0.9;margin-bottom:1.5rem">Ready to place your order?</h2>
    <p style="color:#888;margin-bottom:2rem;max-width:30rem;margin-left:auto;margin-right:auto;line-height:1.6">We&rsquo;ll help you finalize your size run, source the right product, and deliver on time &mdash; start to finish.</p>
    <a href="/contact" style="display:inline-block;background:white;color:black;font-weight:700;font-size:.875rem;padding:.875rem 2rem;border-radius:9999px;text-decoration:none">Start a Project</a>
  </section>
</main>
<footer style="background:#0a0a0a;padding:2rem;border-top:1px solid rgba(255,255,255,.05)">
  <nav aria-label="Footer navigation" style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-bottom:1rem">
    <a href="/privacy-policy" style="color:#444;font-size:.75rem;text-decoration:none">Privacy Policy</a>
    <a href="/terms" style="color:#444;font-size:.75rem;text-decoration:none">Terms of Service</a>
    <a href="/contact" style="color:#444;font-size:.75rem;text-decoration:none">Contact</a>
    <a href="/tools/size-breakdown" style="color:#444;font-size:.75rem;text-decoration:none">Size Breakdown Tool</a>
  </nav>
  <p style="color:#444;font-size:.75rem;text-align:center;margin:0">&copy; ${new Date().getFullYear()} Merch Club. All rights reserved.</p>
</footer>`,
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(DIST)) {
    console.error('✗  dist/public not found — run `vite build` first');
    process.exit(1);
  }

  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  console.log('Prerendering routes…');

  for (const route of [SIZE_BREAKDOWN]) {
    let html = template;
    html = injectMeta(html, route);
    html = injectSchemas(html, route.schemas);
    html = injectBody(html, route.bodyHtml);
    writeRoute(route.urlPath, html);
  }

  console.log('Done.');
}

main();
