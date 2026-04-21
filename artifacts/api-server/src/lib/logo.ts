import * as cheerio from "cheerio";
import sharp from "sharp";
import { safeFetch } from "./safeFetch";

const LOGO_MAX_BYTES = 3 * 1024 * 1024; // 3MB
const SVG_MAX_BYTES = 500 * 1024; // 500KB inline SVG cap

export interface LogoCandidate {
  url: string;
  score: number;
  source: string;
  width?: number;
  height?: number;
  inlineSvg?: string;
  inHeader?: boolean;
}

export interface LogoResult {
  buffer: Buffer | null;
  url: string | null;
  source: string;
  isFallback: boolean;
  width?: number;
  height?: number;
  format?: string;
}

function absolutize(src: string, base: string): string | null {
  if (!src) return null;
  if (src.startsWith("data:")) return src;
  try {
    return new URL(src, base).toString();
  } catch {
    return null;
  }
}

function scoreCandidate(
  src: string,
  alt: string,
  cls: string,
  id: string,
): number {
  const blob = `${src} ${alt} ${cls} ${id}`.toLowerCase();
  let s = 0;
  if (/logo/.test(blob)) s += 40;
  if (/brand/.test(blob)) s += 15;
  if (/mark|wordmark/.test(blob)) s += 10;
  if (/header|nav/.test(blob)) s += 8;
  if (/icon/.test(blob)) s += 4;
  if (/\.svg(\?|$)/i.test(src)) s += 25;
  if (/\.png(\?|$)/i.test(src)) s += 10;
  if (/sprite|sprites/.test(blob)) s -= 20;
  if (/banner|hero|background|bg-|cover/.test(blob)) s -= 25;
  if (/avatar|profile|user/.test(blob)) s -= 15;
  if (/favicon/.test(blob)) s -= 5;
  return s;
}

export function findLogoCandidates(
  $: cheerio.CheerioAPI,
  baseUrl: string,
): LogoCandidate[] {
  const out: LogoCandidate[] = [];

  $("img").each((_, el) => {
    const $el = $(el);
    const rawSrc =
      $el.attr("src") ||
      $el.attr("data-src") ||
      $el.attr("data-lazy-src") ||
      $el.attr("data-original") ||
      "";
    const srcset = $el.attr("srcset") || "";
    let src = rawSrc;
    if (!src && srcset) {
      src = srcset.split(",")[0]?.trim().split(/\s+/)[0] || "";
    }
    const abs = absolutize(src, baseUrl);
    if (!abs) return;
    const alt = $el.attr("alt") || "";
    const cls = $el.attr("class") || "";
    const id = $el.attr("id") || "";
    let score = scoreCandidate(abs, alt, cls, id);
    const inHeader =
      $el.parents("header, nav, [role=banner], .header, .nav, .navbar")
        .length > 0;
    if (inHeader) score += 12;
    const w = parseInt($el.attr("width") || "0", 10);
    const h = parseInt($el.attr("height") || "0", 10);
    if (w && h) {
      if (w < 24 && h < 24) score -= 20;
      if (w > 600 || h > 600) score -= 8;
    }
    out.push({ url: abs, score, source: "img", width: w, height: h });
  });

  $("svg").each((i, el) => {
    if (i > 12) return;
    const $el = $(el);
    const cls = $el.attr("class") || "";
    const id = $el.attr("id") || "";
    const ariaLabel = $el.attr("aria-label") || "";
    const role = $el.attr("role") || "";
    const parentCls = $el.parent().attr("class") || "";
    const parentAria = $el.parent().attr("aria-label") || "";
    const linkAria = $el.parents("a[aria-label]").first().attr("aria-label") || "";
    const blob = `${cls} ${id} ${ariaLabel} ${role} ${parentCls} ${parentAria} ${linkAria}`;
    const inHeader = $el.parents("header, nav, [role=banner], .header, .nav, .navbar").length > 0;
    const isLogo = /logo|brand|mark|wordmark/i.test(blob);
    if (isLogo || (inHeader && i < 3)) {
      const html = $.html(el);
      if (html && html.length < 50000) {
        const score = isLogo ? 70 : 30;
        out.push({ url: `inline-svg:${i}`, score, source: "inline-svg", inlineSvg: html, inHeader } as LogoCandidate);
      }
    }
  });

  const ogImg = $('meta[property="og:image"]').attr("content");
  if (ogImg) {
    const abs = absolutize(ogImg, baseUrl);
    if (abs) out.push({ url: abs, score: 12, source: "og:image" });
  }
  const twImg = $('meta[name="twitter:image"]').attr("content");
  if (twImg) {
    const abs = absolutize(twImg, baseUrl);
    if (abs) out.push({ url: abs, score: 10, source: "twitter:image" });
  }

  $('link[rel*="icon"]').each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const abs = absolutize(href, baseUrl);
    if (!abs) return;
    const sizes = $(el).attr("sizes") || "";
    const big = /(192|256|512)/.test(sizes) || /apple-touch-icon/i.test(href);
    out.push({ url: abs, score: big ? 8 : 4, source: "favicon" });
  });

  const seen = new Set<string>();
  return out
    .filter((c) => {
      if (seen.has(c.url)) return false;
      seen.add(c.url);
      return true;
    })
    .sort((a, b) => b.score - a.score);
}

function looksLikePhoto(meta: sharp.Metadata, score: number): boolean {
  const w = meta.width || 0;
  const h = meta.height || 0;
  if (!w || !h) return false;
  const ratio = w / h;
  if (score < 30 && ratio > 1.4 && ratio < 2.4 && w > 600) return true;
  if (score < 30 && w > 1200 && h > 600) return true;
  return false;
}

export async function downloadLogo(
  candidates: LogoCandidate[],
): Promise<LogoResult> {
  for (const c of candidates.slice(0, 12)) {
    try {
      if (c.source === "inline-svg" && c.inlineSvg) {
        let svg = c.inlineSvg;
        if (svg.length > SVG_MAX_BYTES) continue;
        if (!/xmlns=/.test(svg)) {
          svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        const buf = Buffer.from(svg);
        const img = sharp(buf, { density: 300 });
        const meta = await img.metadata();
        if ((meta.width || 0) < 16) continue;
        const pngBuf = await img.resize({ width: 800, withoutEnlargement: true }).png().toBuffer();
        return {
          buffer: pngBuf,
          url: "inline-svg",
          source: "inline-svg",
          isFallback: false,
          width: meta.width,
          height: meta.height,
          format: "png",
        };
      }
      if (c.url.startsWith("data:")) continue;
      const res = await safeFetch(c.url, { timeoutMs: 8000, maxBytes: LOGO_MAX_BYTES });
      if (res.status >= 400) continue;
      const ct = res.contentType;
      const buf = res.buffer;
      if (buf.length < 200) continue;

      let pngBuf: Buffer;
      let meta: sharp.Metadata;
      if (/svg/i.test(ct) || /\.svg(\?|$)/i.test(c.url)) {
        const img = sharp(buf, { density: 300 });
        meta = await img.metadata();
        pngBuf = await img.resize({ width: 800, withoutEnlargement: true })
          .png()
          .toBuffer();
      } else {
        const img = sharp(buf);
        meta = await img.metadata();
        if ((meta.width || 0) < 32 || (meta.height || 0) < 32) {
          if (c.source === "favicon") {
            pngBuf = await img.resize({ width: 256 }).png().toBuffer();
          } else {
            continue;
          }
        } else if (looksLikePhoto(meta, c.score)) {
          continue;
        } else {
          pngBuf = await img.resize({ width: 800, withoutEnlargement: true }).png().toBuffer();
        }
      }

      return {
        buffer: pngBuf,
        url: c.url,
        source: c.source,
        isFallback: c.source === "favicon" || c.source === "og:image",
        width: meta.width,
        height: meta.height,
        format: "png",
      };
    } catch {
      continue;
    }
  }
  return {
    buffer: null,
    url: null,
    source: "none",
    isFallback: true,
  };
}

export async function makeMonogramLogo(
  name: string,
  bg = "#0a0a0a",
  fg = "#ffffff",
): Promise<Buffer> {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("") || "MC";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" rx="80" fill="${bg}"/>
    <text x="300" y="340" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="900" font-size="240" fill="${fg}" letter-spacing="-8">${initials}</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}
