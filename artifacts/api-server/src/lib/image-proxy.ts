import { createHash, createHmac, createCipheriv, createDecipheriv } from "crypto";

let cachedKey: Buffer | null = null;

// Derive a stable AES-256 key from a server-only secret. The key never leaves
// the server, so clients cannot forge tokens or decrypt the upstream URL.
// Fails closed: if the secret is missing we throw rather than fall back to a
// guessable key (which would turn the proxy into a forgeable public relay).
function getKey(): Buffer {
  if (cachedKey) return cachedKey;
  const secret = process.env.IMAGE_PROXY_SECRET || process.env.SAGE_AUTH_KEY;
  if (!secret) {
    throw new Error(
      "Image proxy secret missing: set SAGE_AUTH_KEY (or IMAGE_PROXY_SECRET).",
    );
  }
  cachedKey = createHash("sha256").update(String(secret)).digest();
  return cachedKey;
}

// Deterministic 12-byte IV derived from the plaintext: identical URLs produce
// identical tokens (so browser/proxy caching stays effective) while distinct
// URLs get distinct IVs (preserving AES-GCM security).
function deterministicIv(plaintext: string): Buffer {
  return createHmac("sha256", getKey()).update(plaintext).digest().subarray(0, 12);
}

function encodeImageToken(url: string): string {
  const key = getKey();
  const iv = deterministicIv(url);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(url, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString("base64url");
}

export function decodeImageToken(token: string): string | null {
  try {
    const raw = Buffer.from(token, "base64url");
    if (raw.length < 12 + 16 + 1) return null;
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(12, 28);
    const ciphertext = raw.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString("utf8");
  } catch {
    return null;
  }
}

// Only ever fetch/relay SAGE's own image host — prevents the proxy from being
// used as an open relay (SSRF), even though tokens are already authenticated.
// Exact host match so look-alikes (e.g. evilpromoplace.com) are rejected, and
// HTTPS is required (SAGE serves images over HTTPS).
export function isAllowedImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase();
    return host === "promoplace.com" || host.endsWith(".promoplace.com");
  } catch {
    return false;
  }
}

function bumpResolution(url: string, rs: number): string {
  if (/RS=\d+/i.test(url)) return url.replace(/RS=\d+/gi, `RS=${rs}`);
  return url + (url.includes("?") ? "&" : "?") + `RS=${rs}`;
}

// Convert a raw SAGE/promoplace image URL into an opaque same-origin proxy path
// (/api/img/<token>). The token is AES-256-GCM encrypted, so the client never
// sees the upstream URL, the SN= supplier number, or any other SAGE identifier.
export function toProxiedImageUrl(rawUrl: string | null | undefined, rs = 600): string | null {
  if (typeof rawUrl !== "string" || rawUrl.trim() === "") return null;
  const normalized = rawUrl.trim();
  if (!isAllowedImageUrl(normalized)) {
    // Not a recognized SAGE image; don't proxy arbitrary URLs.
    return null;
  }
  try {
    const token = encodeImageToken(bumpResolution(normalized, rs));
    return `/api/img/${token}`;
  } catch {
    // Fail closed (e.g. missing secret): emit no image rather than a weak token.
    return null;
  }
}
