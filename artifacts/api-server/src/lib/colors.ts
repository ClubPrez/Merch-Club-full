import sharp from "sharp";
import * as cheerio from "cheerio";

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function isUseful(r: number, g: number, b: number): boolean {
  const [, s, l] = rgbToHsl(r, g, b);
  if (l < 0.05 || l > 0.95) return false;
  if (s < 0.12) return false;
  return true;
}

function quantize(v: number, step = 32): number {
  return Math.round(v / step) * step;
}

export async function extractColorsFromImage(
  buffer: Buffer,
): Promise<string[]> {
  try {
    const { data, info } = await sharp(buffer)
      .ensureAlpha()
      .resize(120, 120, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const counts = new Map<string, { count: number; r: number; g: number; b: number }>();
    const stride = info.channels;
    for (let i = 0; i < data.length; i += stride) {
      const a = data[i + 3] ?? 255;
      if (a < 200) continue;
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      if (!isUseful(r, g, b)) continue;
      const qr = quantize(r);
      const qg = quantize(g);
      const qb = quantize(b);
      const key = `${qr}-${qg}-${qb}`;
      const entry = counts.get(key);
      if (entry) {
        entry.count += 1;
        entry.r += r;
        entry.g += g;
        entry.b += b;
      } else {
        counts.set(key, { count: 1, r, g, b });
      }
    }

    const sorted = [...counts.values()].sort((a, b) => b.count - a.count);
    const palette: string[] = [];
    const seenHues: number[] = [];
    for (const c of sorted) {
      const r = c.r / c.count;
      const g = c.g / c.count;
      const b = c.b / c.count;
      const [h] = rgbToHsl(r, g, b);
      if (seenHues.some((sh) => Math.abs(sh - h) < 25)) continue;
      seenHues.push(h);
      palette.push(rgbToHex(r, g, b));
      if (palette.length >= 4) break;
    }
    return palette;
  } catch {
    return [];
  }
}

const HEX_RE = /#[0-9a-f]{6}\b/gi;
const RGB_RE = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/gi;

export function extractColorsFromHtml($: cheerio.CheerioAPI, html: string): string[] {
  const found = new Map<string, number>();
  const themeColor = $('meta[name="theme-color"]').attr("content");
  if (themeColor) found.set(themeColor.toLowerCase(), 100);

  const slice = html.slice(0, 200000);
  let m: RegExpExecArray | null;
  HEX_RE.lastIndex = 0;
  while ((m = HEX_RE.exec(slice)) !== null) {
    const hex = m[0].toLowerCase();
    found.set(hex, (found.get(hex) || 0) + 1);
  }
  RGB_RE.lastIndex = 0;
  while ((m = RGB_RE.exec(slice)) !== null) {
    const r = +(m[1] ?? 0);
    const g = +(m[2] ?? 0);
    const b = +(m[3] ?? 0);
    const hex = rgbToHex(r, g, b);
    found.set(hex, (found.get(hex) || 0) + 1);
  }

  const palette: string[] = [];
  const seenHues: number[] = [];
  const sorted = [...found.entries()].sort((a, b) => b[1] - a[1]);
  for (const [hex] of sorted) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (!isUseful(r, g, b)) continue;
    const [h] = rgbToHsl(r, g, b);
    if (seenHues.some((sh) => Math.abs(sh - h) < 25)) continue;
    seenHues.push(h);
    palette.push(hex);
    if (palette.length >= 4) break;
  }
  return palette;
}

export function ensurePalette(colors: string[]): string[] {
  const fallback = ["#0a0a0a", "#f5f5f5", "#888888"];
  const out: string[] = [];
  for (const c of colors) {
    if (/^#[0-9a-f]{6}$/i.test(c) && !out.includes(c.toLowerCase())) {
      out.push(c.toLowerCase());
    }
  }
  for (const f of fallback) {
    if (out.length >= 3) break;
    if (!out.includes(f)) out.push(f);
  }
  return out.slice(0, 4);
}
