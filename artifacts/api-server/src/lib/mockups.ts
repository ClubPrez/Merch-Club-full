import sharp from "sharp";

export interface MockupTemplate {
  id: string;
  label: string;
  width: number;
  height: number;
  bg: string;
  fg: string;
  productSvg: (accent: string, palette: { fabric: string; shadow: string; trim: string }) => string;
  printArea: { x: number; y: number; w: number; h: number };
  adaptive?: boolean;
}

const DARK_FABRIC = { fabric: "#2a2a2f", shadow: "#1f1f24", trim: "#3a3a40" };
const LIGHT_FABRIC = { fabric: "#ececea", shadow: "#d8d8d4", trim: "#bcbcb6" };

const TEMPLATES: MockupTemplate[] = [
  {
    id: "tee",
    label: "Premium Tee",
    width: 1200,
    height: 1200,
    bg: "#0f0f10",
    fg: "#f5f5f5",
    adaptive: true,
    printArea: { x: 420, y: 460, w: 360, h: 320 },
    productSvg: (_accent, p) => `
      <g transform="translate(600 640)">
        <g transform="translate(-300 -340)">
          <path d="M30 120 L160 30 Q220 10 280 30 L300 10 Q360 0 420 30 L440 30 Q500 10 560 30 Q620 0 680 20 L780 100 Q800 120 790 150 L720 240 Q700 260 680 250 L620 220 L620 660 Q610 690 580 695 Q450 720 230 695 Q200 690 190 660 L190 220 L130 250 Q110 260 90 240 L20 150 Q10 120 30 120 Z"
            fill="${p.fabric}" stroke="${p.trim}" stroke-width="3"/>
          <path d="M280 30 Q330 80 405 80 Q480 80 530 30" fill="none" stroke="${p.trim}" stroke-width="3"/>
          <path d="M280 30 Q330 90 405 90 Q480 90 530 30" fill="${p.shadow}" stroke="none"/>
        </g>
      </g>`,
  },
  {
    id: "drinkware",
    label: "Drinkware",
    width: 1200,
    height: 1200,
    bg: "#f6f5f2",
    fg: "#0f0f10",
    printArea: { x: 425, y: 470, w: 350, h: 280 },
    productSvg: (accent) => `
      <g transform="translate(600 620)">
        <g transform="translate(-200 -300)">
          <rect x="40" y="60" width="320" height="540" rx="20"
            fill="#fafaf8" stroke="${accent}" stroke-width="2" stroke-opacity="0.25"/>
          <ellipse cx="200" cy="60" rx="160" ry="14" fill="#ecebe6"/>
          <ellipse cx="200" cy="60" rx="140" ry="10" fill="#0f0f10" opacity="0.05"/>
          <rect x="40" y="60" width="320" height="14" fill="#0f0f10" opacity="0.03"/>
          <rect x="40" y="590" width="320" height="14" fill="#0f0f10" opacity="0.06"/>
        </g>
      </g>`,
  },
  {
    id: "cap",
    label: "Headwear",
    width: 1200,
    height: 1200,
    bg: "#1a1a1d",
    fg: "#f5f5f5",
    adaptive: true,
    printArea: { x: 425, y: 440, w: 350, h: 240 },
    productSvg: (_accent, p) => `
      <g transform="translate(600 640)">
        <g transform="translate(-380 -260)">
          <path d="M120 280 Q120 80 380 60 Q640 80 640 280 L660 320 L620 360 Q380 380 140 360 L100 320 Z"
            fill="${p.fabric}" stroke="${p.trim}" stroke-width="2"/>
          <path d="M120 320 Q380 360 640 320 L760 380 Q380 440 0 380 Z"
            fill="${p.shadow}" stroke="${p.trim}" stroke-width="2"/>
          <path d="M380 60 L380 280" stroke="${p.trim}" stroke-opacity="0.4" stroke-width="2" fill="none"/>
        </g>
      </g>`,
  },
];

function frameSvg(
  t: MockupTemplate,
  accent: string,
  label: string,
  fabricPalette: { fabric: string; shadow: string; trim: string },
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${t.width}" height="${t.height}" viewBox="0 0 ${t.width} ${t.height}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="40%" r="80%">
        <stop offset="0%" stop-color="${shift(t.bg, 8)}"/>
        <stop offset="100%" stop-color="${t.bg}"/>
      </radialGradient>
    </defs>
    <rect width="${t.width}" height="${t.height}" fill="url(#bg)"/>
    <rect x="40" y="40" width="${t.width - 80}" height="${t.height - 80}" rx="36"
      fill="none" stroke="${t.fg}" stroke-opacity="0.05" stroke-width="2"/>
    <text x="80" y="120" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="700"
      font-size="22" letter-spacing="6" fill="${t.fg}" opacity="0.55">${label.toUpperCase()}</text>
    <text x="80" y="${t.height - 70}" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="700"
      font-size="18" letter-spacing="4" fill="${t.fg}" opacity="0.35">MERCH CLUB · CONCEPT</text>
    <rect x="${t.width - 100}" y="${t.height - 90}" width="40" height="40" rx="8" fill="${accent}" opacity="0.85"/>
    ${t.productSvg(accent, fabricPalette)}
  </svg>`;
}

function shift(hex: string, by: number): string {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return hex;
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + by);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + by);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + by);
  return (
    "#" +
    [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

async function isDarkMonochrome(logo: Buffer): Promise<boolean> {
  try {
    const { data, info } = await sharp(logo)
      .ensureAlpha()
      .resize(64, 64, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    let visible = 0;
    let dark = 0;
    let chroma = 0;
    const stride = info.channels;
    for (let i = 0; i < data.length; i += stride) {
      const a = data[i + 3] ?? 255;
      if (a < 60) continue;
      visible++;
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum < 0.35) dark++;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      if (max - min > 28) chroma++;
    }
    if (visible < 50) return false;
    const darkRatio = dark / visible;
    const chromaRatio = chroma / visible;
    return darkRatio > 0.55 && chromaRatio < 0.12;
  } catch {
    return false;
  }
}

async function preparedLogo(
  logo: Buffer,
  printW: number,
  printH: number,
  templateIsDark: boolean,
): Promise<Buffer> {
  const padFactor = 0.85;
  const targetW = Math.round(printW * padFactor);
  const targetH = Math.round(printH * padFactor);

  const shouldInvert = templateIsDark && (await isDarkMonochrome(logo));

  let pipeline = sharp(logo).ensureAlpha().resize({
    width: targetW,
    height: targetH,
    fit: "inside",
    withoutEnlargement: false,
  });

  if (shouldInvert) {
    pipeline = pipeline.negate({ alpha: false });
  }

  return pipeline.png().toBuffer();
}

export async function generateMockups(opts: {
  logo: Buffer;
  brandColors: string[];
  companyName: string;
  outDir: string;
  baseFilename: string;
}): Promise<{ id: string; label: string; relPath: string; absPath: string }[]> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  await fs.mkdir(opts.outDir, { recursive: true });

  const accent = opts.brandColors.find((c) => /^#[0-9a-f]{6}$/i.test(c)) ||
    "#888888";

  const results: { id: string; label: string; relPath: string; absPath: string }[] = [];

  const logoIsDark = await isLogoOverallDark(opts.logo);

  for (const t of TEMPLATES) {
    const useLightFabric = t.adaptive ? logoIsDark : isHexDark(t.bg) === false;
    const fabricPalette = useLightFabric ? LIGHT_FABRIC : DARK_FABRIC;
    const frame = Buffer.from(frameSvg(t, accent, t.label, fabricPalette));
    const frameImg = sharp(frame).png();

    const logoPng = await preparedLogo(opts.logo, t.printArea.w, t.printArea.h, !useLightFabric);
    const logoMeta = await sharp(logoPng).metadata();
    const lw = logoMeta.width || t.printArea.w;
    const lh = logoMeta.height || t.printArea.h;
    const cx = t.printArea.x + Math.round((t.printArea.w - lw) / 2);
    const cy = t.printArea.y + Math.round((t.printArea.h - lh) / 2);

    const composed = await frameImg
      .composite([{ input: logoPng, left: cx, top: cy }])
      .png({ compressionLevel: 8 })
      .toBuffer();

    const filename = `${opts.baseFilename}-${t.id}.png`;
    const absPath = path.join(opts.outDir, filename);
    await fs.writeFile(absPath, composed);
    results.push({
      id: t.id,
      label: t.label,
      relPath: `/api/generated/${filename}`,
      absPath,
    });
  }

  return results;
}

export async function saveLogoPreview(
  logo: Buffer,
  outDir: string,
  baseFilename: string,
): Promise<string> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  await fs.mkdir(outDir, { recursive: true });
  const filename = `${baseFilename}-logo.png`;
  const absPath = path.join(outDir, filename);
  const out = await sharp(logo)
    .resize({ width: 512, withoutEnlargement: true })
    .png()
    .toBuffer();
  await fs.writeFile(absPath, out);
  return `/api/generated/${filename}`;
}

async function isLogoOverallDark(logo: Buffer): Promise<boolean> {
  try {
    const { data, info } = await sharp(logo)
      .ensureAlpha()
      .resize(64, 64, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    let visible = 0;
    let lumSum = 0;
    const stride = info.channels;
    for (let i = 0; i < data.length; i += stride) {
      const a = data[i + 3] ?? 255;
      if (a < 60) continue;
      visible++;
      const r = data[i] ?? 0;
      const g = data[i + 1] ?? 0;
      const b = data[i + 2] ?? 0;
      lumSum += (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
    if (visible < 50) return false;
    return lumSum / visible < 0.5;
  } catch {
    return false;
  }
}

function isHexDark(hex: string): boolean {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.5;
}
