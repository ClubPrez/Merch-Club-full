import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  jsonLd?: object | object[];
  keywords?: string;
  locale?: string;
  robots?: string;
  author?: string;
  twitterSite?: string;
}

const SITE_NAME = "Merch Club";
const BASE_URL = "https://merchclub.com";
const JSON_LD_ID = "page-jsonld";
const DEFAULT_TWITTER = "@merchclub";

export default function SEO({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  jsonLd,
  keywords,
  locale = "en_US",
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  author = SITE_NAME,
  twitterSite = DEFAULT_TWITTER,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = path === "/" ? `${SITE_NAME} — Full-Service Branded Merchandise` : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${BASE_URL}${path}`;
    const ogImage = image || `${BASE_URL}/opengraph.jpg`;
    const ogImageAlt = imageAlt || fullTitle;

    document.title = fullTitle;
    document.documentElement.setAttribute("lang", locale.split("_")[0] || "en");

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("name", "robots", robots);
    setMeta("name", "googlebot", robots);
    setMeta("name", "bingbot", robots);
    setMeta("name", "GPTBot", "index, follow");
    setMeta("name", "ChatGPT-User", "index, follow");
    setMeta("name", "OAI-SearchBot", "index, follow");
    setMeta("name", "ClaudeBot", "index, follow");
    setMeta("name", "Claude-Web", "index, follow");
    setMeta("name", "PerplexityBot", "index, follow");
    setMeta("name", "Perplexity-User", "index, follow");
    setMeta("name", "Google-Extended", "index, follow");
    setMeta("name", "Applebot", "index, follow");
    setMeta("name", "Applebot-Extended", "index, follow");
    setMeta("name", "CCBot", "index, follow");
    setMeta("name", "author", author);
    if (keywords) setMeta("name", "keywords", keywords);

    setMeta("name", "geo.region", "US-NE");
    setMeta("name", "geo.placename", "Omaha, Nebraska");
    setMeta("name", "geo.position", "41.2565;-95.9345");
    setMeta("name", "ICBM", "41.2565, -95.9345");
    setMeta("name", "coverage", "Worldwide");
    setMeta("name", "distribution", "Global");
    setMeta("name", "rating", "General");
    setMeta("name", "target", "all");

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", ogImageAlt);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", locale);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", ogImageAlt);
    if (twitterSite) {
      setMeta("name", "twitter:site", twitterSite);
      setMeta("name", "twitter:creator", twitterSite);
    }

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const existing = document.getElementById(JSON_LD_ID);
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSON_LD_ID;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const el = document.getElementById(JSON_LD_ID);
      if (el) el.remove();
    };
  }, [title, description, path, image, type, jsonLd]);

  return null;
}
