import * as cheerio from "cheerio";
import { safeFetch } from "./safeFetch";

export interface ScrapeResult {
  finalUrl: string;
  origin: string;
  html: string;
  $: cheerio.CheerioAPI;
}

const HTML_MAX_BYTES = 4 * 1024 * 1024; // 4MB

export function normalizeUrl(input: string): string {
  let url = (input || "").trim();
  if (!url) throw new Error("URL is required");
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  const u = new URL(url);
  return u.toString();
}

export async function scrapeSite(rawUrl: string): Promise<ScrapeResult> {
  const start = normalizeUrl(rawUrl);
  const res = await safeFetch(start, { timeoutMs: 12000, maxBytes: HTML_MAX_BYTES });
  if (res.status >= 400) throw new Error(`Site responded ${res.status}`);
  const html = res.buffer.toString("utf8");
  const finalUrl = res.finalUrl || start;
  const origin = new URL(finalUrl).origin;
  const $ = cheerio.load(html);
  return { finalUrl, origin, html, $ };
}

export function deriveCompanyName(
  $: cheerio.CheerioAPI,
  origin: string,
): string {
  const og = $('meta[property="og:site_name"]').attr("content")?.trim();
  if (og) return og;
  const appName = $('meta[name="application-name"]').attr("content")?.trim();
  if (appName) return appName;
  const title = ($("title").first().text() || "").trim();
  if (title) {
    const cleaned = title.split(/[|·–—\-:]/)[0]?.trim();
    if (cleaned && cleaned.length >= 2) return cleaned;
    if (title) return title;
  }
  try {
    const host = new URL(origin).hostname.replace(/^www\./, "");
    const root = host.split(".")[0] ?? host;
    return root.charAt(0).toUpperCase() + root.slice(1);
  } catch {
    return "Your Brand";
  }
}
