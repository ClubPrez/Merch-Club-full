import { Router, type IRouter } from "express";
import path from "node:path";
import { tmpdir } from "node:os";
import express from "express";
import { logger } from "../lib/logger";
import { scrapeSite, deriveCompanyName, normalizeUrl } from "../lib/scrape";
import { findLogoCandidates, downloadLogo, makeMonogramLogo } from "../lib/logo";
import {
  extractColorsFromImage,
  extractColorsFromHtml,
  ensurePalette,
} from "../lib/colors";
import { generateMockups, saveLogoPreview } from "../lib/mockups";

const router: IRouter = Router();

const GENERATED_DIR = path.join(tmpdir(), "merchclub-generated");

router.use("/generated", express.static(GENERATED_DIR, { maxAge: "1h" }));

router.post("/generate-mockups", async (req, res) => {
  const url = (req.body?.url as string | undefined)?.trim();
  if (!url) {
    return res.status(400).json({ success: false, error: "url is required" });
  }

  const baseFilename = `mc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const notes: string[] = [];
  let companyName = "Your Brand";
  let submittedUrl = url;
  let logoUrl: string | null = null;
  let logoSourceMeta = "";
  let palette: string[] = [];

  let logoBuffer: Buffer | null = null;
  let scrapeOk = false;
  let detectedFallback = false;

  try {
    const normalized = normalizeUrl(url);
    submittedUrl = normalized;
    const scraped = await scrapeSite(normalized);
    scrapeOk = true;
    companyName = deriveCompanyName(scraped.$, scraped.origin);
    notes.push(`Read homepage at ${new URL(scraped.finalUrl).hostname}`);
    notes.push(`Identified company name: ${companyName}`);

    const candidates = findLogoCandidates(scraped.$, scraped.finalUrl);
    if (candidates.length) {
      notes.push(`Found ${candidates.length} candidate brand asset${candidates.length === 1 ? "" : "s"}`);
    }
    const logoResult = await downloadLogo(candidates);
    if (logoResult.buffer) {
      logoBuffer = logoResult.buffer;
      logoSourceMeta = logoResult.source;
      detectedFallback = logoResult.isFallback;
      notes.push(
        logoResult.isFallback
          ? "Best available brand asset selected"
          : "Detected clean logo treatment",
      );
    } else {
      detectedFallback = true;
      notes.push("No clean logo detected — generating monogram fallback");
    }

    const htmlPalette = extractColorsFromHtml(scraped.$, scraped.html);
    if (htmlPalette.length) {
      notes.push(`Extracted ${htmlPalette.length} color${htmlPalette.length === 1 ? "" : "s"} from page styles`);
    }

    let logoPalette: string[] = [];
    if (logoBuffer) {
      logoPalette = await extractColorsFromImage(logoBuffer);
      if (logoPalette.length) notes.push("Pulled palette from logo asset");
    }

    palette = ensurePalette([...logoPalette, ...htmlPalette]);
  } catch (err) {
    logger.warn({ err, url }, "scrape failed, using fallback");
    notes.push("Site couldn't be fully scanned — using brand fallback");
    try {
      const u = new URL(normalizeUrl(url));
      const root = u.hostname.replace(/^www\./, "").split(".")[0] || "Brand";
      companyName = root.charAt(0).toUpperCase() + root.slice(1);
    } catch {
      companyName = "Your Brand";
    }
    palette = ensurePalette([]);
  }

  if (!logoBuffer) {
    logoBuffer = await makeMonogramLogo(
      companyName,
      palette[0] || "#0a0a0a",
      "#ffffff",
    );
    logoSourceMeta = logoSourceMeta || "monogram-fallback";
    notes.push("Generated monogram from company initials");
  }

  try {
    logoUrl = await saveLogoPreview(logoBuffer, GENERATED_DIR, baseFilename);
    notes.push("Preparing logo for mockup placement");

    const mockups = await generateMockups({
      logo: logoBuffer,
      brandColors: palette,
      companyName,
      outDir: GENERATED_DIR,
      baseFilename,
    });
    notes.push("Rendered first-round merch concepts");

    return res.json({
      success: true,
      companyName,
      submittedUrl,
      logoUrl,
      logoSource: logoSourceMeta,
      logoIsFallback: !scrapeOk || logoSourceMeta === "monogram-fallback" || detectedFallback,
      colors: palette,
      mockups: mockups.map((m) => ({ id: m.id, label: m.label, url: m.relPath })),
      notes,
    });
  } catch (err) {
    logger.error({ err }, "mockup generation failed");
    return res.status(500).json({
      success: false,
      error: "Mockup generation failed",
      companyName,
      submittedUrl,
      colors: palette,
      notes,
    });
  }
});

router.post("/lead", (req, res) => {
  const body = req.body || {};
  logger.info({ lead: body }, "lead captured");
  return res.json({ success: true });
});

export default router;
