#!/usr/bin/env node
/**
 * Build-time prerender: generates a static HTML file per route with the page's
 * real React content (H1, body copy, navigation) baked into the raw HTML.
 *
 * Strategy:
 *  1. Build an SSR bundle via `vite build --config vite.ssr.config.ts`
 *  2. Import the SSR bundle and call render(url) for each route
 *  3. Inject the rendered HTML into the Vite-built index.html template
 *  4. Update per-route <head> tags (title, description, canonical, OG, Twitter)
 *  5. Write each route to dist/public/<route>/index.html
 *
 * Runs automatically as `postbuild` — no manual invocation needed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'public');
const SERVER_DIST = path.join(ROOT, 'dist', 'server');
const BASE_URL = 'https://merchclub.com';

// ---------------------------------------------------------------------------
// Per-route metadata — title, description, canonical injected into <head>.
// Titles mirror the SEO component's logic:
//   path="/"  → "Merch Club — Full-Service Branded Merchandise"
//   others    → "{title} | Merch Club"
// ---------------------------------------------------------------------------
const ROUTE_META = {
  '/': {
    title: 'Merch Club — Full-Service Branded Merchandise',
    description:
      'Full-service branded merchandise programs for teams that take their brand seriously. Strategy, design, proofing, production, kitting, and nationwide distribution — handled by one team.',
  },
  '/about': {
    title: 'About Us | Merch Club',
    description:
      "Meet the team behind Merch Club. We're a full-service branded merchandise partner built on quality, speed, and relationships that last across every program we run.",
  },
  '/services': {
    title: 'Services | Merch Club',
    description:
      'End-to-end branded merchandise services: strategy, design, sourcing, production, kitting, and nationwide distribution — one accountable team handling it all.',
  },
  '/contact': {
    title: 'Contact | Merch Club',
    description:
      'Talk to the Merch Club team. Project inquiries, partnerships, press, and careers — we respond within one business day. Headquartered in Omaha, serving teams nationwide.',
  },
  '/blog': {
    title: 'Blog — Insights & Ideas | Merch Club',
    description:
      'Strategy, branding, and operations thinking for teams that take their merch seriously. Read the latest from the Merch Club blog on merch programs, kitting, design, and brand experience.',
  },
  '/industries': {
    title: 'Industries We Serve | Merch Club',
    description:
      'Branded merchandise programs built for healthcare, construction, corporate, and trade show & event teams that need brand consistency, compliance, and operational structure at scale.',
  },
  '/industries/healthcare': {
    title: 'Healthcare Branded Merchandise Programs | Merch Club',
    description:
      'Structured branded merchandise programs for hospitals, healthcare networks, specialty clinics, and medical organizations. Strategy, design, sourcing, kitting, and multi-site distribution — handled by one team.',
  },
  '/industries/construction': {
    title: 'Construction & Trades Branded Apparel Programs | Merch Club',
    description:
      'Structured branded apparel and merchandise programs for construction firms, skilled trades, contractors, and field teams. Sourcing, decoration, production, and distribution — handled by one team.',
  },
  '/industries/corporate': {
    title: 'Corporate Multi-Location Branded Merchandise Programs | Merch Club',
    description:
      'Structured branded merchandise programs for corporate organizations operating across multiple offices, regions, and departments. Onboarding kits, internal apparel systems, gifting initiatives, and national rollouts — handled by one team.',
  },
  '/industries/events': {
    title: 'Trade Show & Event Branded Merchandise Programs | Merch Club',
    description:
      'Structured branded merchandise programs for trade shows, conferences, recruiting events, and activations. Apparel, premium giveaways, booth kits, and venue logistics — handled end to end.',
  },
  '/case-studies': {
    title: 'Case Studies — Branded Merchandise Programs | Merch Club',
    description:
      'Real branded merchandise programs Merch Club has executed — staff apparel rollouts, donor stewardship kits, and onboarding programs with measurable results.',
  },
  '/case-studies/nurse-gifting': {
    title: 'Nurse Gifting — Travel Nurse Programs for OneStaff Medical | Merch Club',
    description:
      'How Merch Club ran nurse gifting for OneStaff Medical for Nurses Week and the holidays — designed around their wanderlust brand and built for life on the road.',
  },
  '/case-studies/events': {
    title: 'OneStaff Medical Trade Show Activation Case Study | Merch Club',
    description:
      "How an 80's hip hop themed activation made OneStaff Medical the most talked-about booth at the biggest healthcare recruiting trade show — beating bigger budgets by 10x.",
  },
  '/case-studies/construction': {
    title: 'Baker Group — A Long-Term Construction Merch Partnership | Merch Club',
    description:
      "What it looks like when your merch team isn't a vendor. Three-plus years embedded with Baker Group — field apparel, executive gear, gifting, trade shows, and a 60th-anniversary beer brewed in Des Moines.",
  },
  '/case-studies/access-bank': {
    title: 'ACCESSbank Corporate Gifting Case Study | Merch Club',
    description:
      "How Merch Club built ACCESSbank's shareholder, executive, and employee gifting programs — including a book on the art of toasting we wrote and illustrated ourselves.",
  },
  '/case-studies/jay-moore-landscaping': {
    title: 'Jay Moore Landscaping Case Study — How a Landscaper Became a Landmark | Merch Club',
    description:
      "Jay Moore trusted us with a hard call: stop blending in. Here's what happened when a tradesman bet on standing out — and we made sure it paid off.",
  },
  '/tools/size-breakdown': {
    title: 'Bulk T-Shirt Size Breakdown Calculator | Merch Club',
    description:
      'Free tool to plan your bulk apparel size run. Enter total quantity and audience type to get the optimal breakdown of each size, so you order right the first time.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Merch Club',
    description: 'Read the Merch Club privacy policy — how we collect, use, and protect your information.',
  },
  '/terms': {
    title: 'Terms of Service | Merch Club',
    description: 'Read the Merch Club terms of service governing use of our website and services.',
  },
  '/accessibility': {
    title: 'Accessibility Statement | Merch Club',
    description:
      'Merch Club is committed to digital accessibility. Read our accessibility statement and how to reach us with concerns.',
  },
};

const ROUTES = Object.keys(ROUTE_META);

// ---------------------------------------------------------------------------
// JSON-LD schemas for /tools/size-breakdown
// ---------------------------------------------------------------------------
const SIZE_BREAKDOWN_FAQS = [
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
    a: "This calculator is optimized for unisex T-shirts and similar cut-and-sew apparel. For structured caps, jackets, or bottoms, size distributions vary meaningfully — reach out and we'll help you plan the right run.",
  },
];

const SIZE_BREAKDOWN_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Learning Center', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Size Breakdown Tool', item: `${BASE_URL}/tools/size-breakdown` },
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
    mainEntity: SIZE_BREAKDOWN_FAQS.map((faq) => ({
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
    description: 'Full-service branded merchandise programs — strategy, design, production, kitting, and distribution.',
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
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const rep = (html, regex, str) => html.replace(regex, () => str);

function injectMeta(html, route) {
  const { title, description } = ROUTE_META[route] ?? {};
  const canonical = `${BASE_URL}${route}`;

  if (title) {
    html = rep(html, /<title>[^<]+<\/title>/, `<title>${title}</title>`);
    html = html.replace(/(<meta property="og:title" content=")[^"]*"/, (_, p) => `${p}${title}"`);
    html = html.replace(/(<meta name="twitter:title" content=")[^"]*"/, (_, p) => `${p}${title}"`);
  }
  if (description) {
    html = html.replace(/(<meta name="description" content=")[^"]*"/, (_, p) => `${p}${description}"`);
    html = html.replace(/(<meta property="og:description" content=")[^"]*"/, (_, p) => `${p}${description}"`);
    html = html.replace(/(<meta name="twitter:description" content=")[^"]*"/, (_, p) => `${p}${description}"`);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*"/, (_, p) => `${p}${canonical}"`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*"/, (_, p) => `${p}${canonical}"`);

  return html;
}

function injectJsonLd(html, schemas) {
  const tags = schemas
    .map((s) => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
    .join('\n');
  return html.replace('</head>', `${tags}\n</head>`);
}

function writeRoute(urlPath, html) {
  if (urlPath === '/') {
    fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
    console.log(`  ✓  ${BASE_URL}/`);
    return;
  }
  const segments = urlPath.split('/').filter(Boolean);
  const outDir = path.join(DIST, ...segments);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`  ✓  ${BASE_URL}${urlPath}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function buildSSR() {
  console.log('Building SSR bundle…');
  execFileSync('pnpm', ['exec', 'vite', 'build', '--config', 'vite.ssr.config.ts'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });
  console.log('SSR bundle built.\n');
}

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('✗  dist/public not found — run `vite build` first');
    process.exit(1);
  }

  await buildSSR();

  const serverEntry = path.join(SERVER_DIST, 'entry-server.js');
  if (!fs.existsSync(serverEntry)) {
    console.error('✗  SSR bundle not found at', serverEntry);
    process.exit(1);
  }

  const { render } = await import(serverEntry);
  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

  console.log('Prerendering routes…');

  let rendered = 0;
  let skipped = 0;

  for (const route of ROUTES) {
    let appHtml = '';
    try {
      appHtml = render(route);
    } catch (err) {
      console.warn(`  ⚠  ${route} — SSR render threw: ${err.message}`);
      skipped++;
    }

    let html = template;
    html = injectMeta(html, route);

    if (route === '/tools/size-breakdown') {
      html = injectJsonLd(html, SIZE_BREAKDOWN_SCHEMAS);
    }

    if (appHtml) {
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      rendered++;
    } else {
      skipped++;
    }

    writeRoute(route, html);
  }

  console.log(`\nDone — ${rendered} routes prerendered, ${skipped} skipped (template-only fallback).`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
