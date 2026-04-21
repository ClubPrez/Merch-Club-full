import dns from "node:dns/promises";
import type { LookupAddress, LookupOptions } from "node:dns";
import net from "node:net";
import { Agent, fetch as undiciFetch, type Response as UndiciResponse } from "undici";

const MAX_REDIRECTS = 5;
const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_MAX_BYTES = 6 * 1024 * 1024; // 6MB cap

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export class SafeFetchError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

function ipToInt(ip: string): bigint | null {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map((n) => BigInt(parseInt(n, 10)));
    if (parts.length !== 4 || parts.some((p) => p < 0n || p > 255n)) return null;
    return (parts[0]! << 24n) | (parts[1]! << 16n) | (parts[2]! << 8n) | parts[3]!;
  }
  return null;
}

function isPrivateIPv4(ip: string): boolean {
  const n = ipToInt(ip);
  if (n === null) return true;
  // 0.0.0.0/8
  if (n < (1n << 24n)) return true;
  // 10.0.0.0/8
  if (n >= 167772160n && n < 184549376n) return true;
  // 100.64.0.0/10 CGNAT
  if (n >= 1681915904n && n < 1686110208n) return true;
  // 127.0.0.0/8 loopback
  if (n >= 2130706432n && n < 2147483648n) return true;
  // 169.254.0.0/16 link-local
  if (n >= 2851995648n && n < 2852061184n) return true;
  // 172.16.0.0/12
  if (n >= 2886729728n && n < 2887778304n) return true;
  // 192.0.0.0/24, 192.0.2.0/24, 192.168.0.0/16, 198.18.0.0/15, 198.51.100.0/24, 203.0.113.0/24
  if (n >= 3221225472n && n < 3221225728n) return true;
  if (n >= 3221225984n && n < 3221226240n) return true;
  if (n >= 3232235520n && n < 3232301056n) return true;
  if (n >= 3325256704n && n < 3325388288n) return true;
  if (n >= 3325478912n && n < 3325479168n) return true;
  if (n >= 3405803776n && n < 3405804032n) return true;
  // 224.0.0.0/4 multicast
  if (n >= 3758096384n && n < 4026531840n) return true;
  // 240.0.0.0/4 reserved
  if (n >= 4026531840n) return true;
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  if (!net.isIPv6(ip)) return true;
  const lower = ip.toLowerCase();
  if (lower === "::" || lower === "::1") return true;
  if (lower.startsWith("fe80:") || lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("ff")) return true; // multicast
  if (lower.startsWith("::ffff:")) {
    const v4 = lower.slice(7);
    if (net.isIPv4(v4)) return isPrivateIPv4(v4);
  }
  return false;
}

async function assertPublicHost(hostname: string): Promise<void> {
  const lower = hostname.toLowerCase();
  if (
    lower === "localhost" ||
    lower.endsWith(".localhost") ||
    lower.endsWith(".local") ||
    lower.endsWith(".internal") ||
    lower === "metadata.google.internal"
  ) {
    throw new SafeFetchError("blocked-host", `Blocked hostname: ${hostname}`);
  }
  if (net.isIP(hostname)) {
    if (net.isIPv4(hostname) && isPrivateIPv4(hostname)) {
      throw new SafeFetchError("blocked-ip", `Blocked IPv4: ${hostname}`);
    }
    if (net.isIPv6(hostname) && isPrivateIPv6(hostname)) {
      throw new SafeFetchError("blocked-ip", `Blocked IPv6: ${hostname}`);
    }
    return;
  }
  let addrs: { address: string; family: number }[] = [];
  try {
    addrs = await dns.lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new SafeFetchError("dns-fail", `DNS lookup failed: ${hostname}`);
  }
  if (!addrs.length) throw new SafeFetchError("dns-empty", `No DNS for ${hostname}`);
  for (const a of addrs) {
    if (a.family === 4 && isPrivateIPv4(a.address)) {
      throw new SafeFetchError("blocked-ip", `Resolved to private IP ${a.address}`);
    }
    if (a.family === 6 && isPrivateIPv6(a.address)) {
      throw new SafeFetchError("blocked-ip", `Resolved to private IPv6 ${a.address}`);
    }
  }
}

function assertSafeUrl(u: URL): void {
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new SafeFetchError("bad-proto", `Bad protocol: ${u.protocol}`);
  }
  const port = u.port ? parseInt(u.port, 10) : u.protocol === "https:" ? 443 : 80;
  if (port !== 80 && port !== 443 && port !== 8080 && port !== 8443) {
    throw new SafeFetchError("bad-port", `Blocked port: ${port}`);
  }
}

export interface SafeFetchOptions {
  timeoutMs?: number;
  maxBytes?: number;
}

export interface SafeFetchResult {
  status: number;
  headers: Headers;
  finalUrl: string;
  buffer: Buffer;
  contentType: string;
}

async function readWithCap(res: UndiciResponse, maxBytes: number): Promise<Buffer> {
  const cl = parseInt(res.headers.get("content-length") || "0", 10);
  if (cl && cl > maxBytes) {
    throw new SafeFetchError("too-large", `Content-Length ${cl} exceeds cap`);
  }
  if (!res.body) return Buffer.alloc(0);
  const reader = res.body.getReader();
  let received = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) {
      received += value.byteLength;
      if (received > maxBytes) {
        try {
          await reader.cancel();
        } catch {
          /* ignore */
        }
        throw new SafeFetchError("too-large", `Body exceeded cap ${maxBytes}`);
      }
      chunks.push(value);
    }
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c)));
}

function buildPinnedAgent(allowedIps: Set<string>): Agent {
  return new Agent({
    connect: {
      lookup: (
        hostname: string,
        options: LookupOptions,
        callback: (
          err: NodeJS.ErrnoException | null,
          address: string | LookupAddress[],
          family?: number,
        ) => void,
      ) => {
        dns
          .lookup(hostname, { all: true, verbatim: true })
          .then((addrs) => {
            const safe = addrs.filter((a) => {
              if (!allowedIps.has(a.address)) return false;
              if (a.family === 4 && isPrivateIPv4(a.address)) return false;
              if (a.family === 6 && isPrivateIPv6(a.address)) return false;
              return true;
            });
            if (!safe.length) {
              callback(
                Object.assign(new Error("DNS rebinding blocked"), {
                  code: "EBLOCKED",
                }),
                "",
                4,
              );
              return;
            }
            if (options && options.all) {
              callback(null, safe as LookupAddress[]);
            } else {
              const first = safe[0]!;
              callback(null, first.address, first.family);
            }
          })
          .catch((err) => callback(err as NodeJS.ErrnoException, "", 4));
      },
    },
  });
}

export async function safeFetch(
  rawUrl: string,
  opts: SafeFetchOptions = {},
): Promise<SafeFetchResult> {
  const timeout = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_BYTES;

  let current = new URL(rawUrl);
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    assertSafeUrl(current);
    await assertPublicHost(current.hostname);

    const allowedIps = new Set<string>();
    if (net.isIP(current.hostname)) {
      allowedIps.add(current.hostname);
    } else {
      const addrs = await dns.lookup(current.hostname, { all: true, verbatim: true });
      for (const a of addrs) {
        if (a.family === 4 && !isPrivateIPv4(a.address)) allowedIps.add(a.address);
        if (a.family === 6 && !isPrivateIPv6(a.address)) allowedIps.add(a.address);
      }
      if (!allowedIps.size) {
        throw new SafeFetchError("blocked-ip", "No public IPs resolved");
      }
    }

    const dispatcher = buildPinnedAgent(allowedIps);
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    let res: UndiciResponse;
    try {
      res = await undiciFetch(current.toString(), {
        signal: ctrl.signal,
        redirect: "manual",
        headers: {
          "User-Agent": UA,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        dispatcher,
      });
    } finally {
      clearTimeout(t);
    }

    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      const loc = res.headers.get("location") || "";
      const next = new URL(loc, current);
      try {
        await res.body?.cancel();
      } catch {
        /* ignore */
      }
      current = next;
      continue;
    }

    const buffer = await readWithCap(res, maxBytes);
    return {
      status: res.status,
      headers: res.headers as unknown as Headers,
      finalUrl: current.toString(),
      buffer,
      contentType: res.headers.get("content-type") || "",
    };
  }
  throw new SafeFetchError("too-many-redirects", "Too many redirects");
}
