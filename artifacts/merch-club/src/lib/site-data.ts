export type IndustryStatus = "live" | "coming-soon";

export interface Industry {
  slug: string;
  name: string;
  status: IndustryStatus;
  href: string;
  tagline: string;
  summary: string;
  who: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  industrySlug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  image: string;
  results: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
  relatedArticles?: string[];
}

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    status: "live",
    href: "/industries/healthcare",
    tagline: "Hospitals, networks, and specialty clinics",
    summary:
      "Structured branded merchandise programs built for healthcare organizations — staff apparel, awareness initiatives, donor recognition, and onboarding kits delivered with full compliance and brand consistency.",
    who: "Hospital systems, specialty clinics, urgent care, foundations, and provider networks.",
  },
  {
    slug: "construction",
    name: "Construction & Trades",
    status: "live",
    href: "/industries/construction",
    tagline: "Contractors, skilled trades, and field teams",
    summary:
      "Structured branded apparel and merchandise programs for construction firms, skilled trades, contractors, and field teams — sourcing, decoration, production, and multi-site distribution managed end to end.",
    who: "General contractors, specialty trades, MEP firms, civil and heavy highway, and construction management firms.",
  },
  {
    slug: "corporate",
    name: "Corporate",
    status: "live",
    href: "/industries/corporate",
    tagline: "Multi-location offices, regions, and departments",
    summary:
      "Structured branded merchandise programs for corporate organizations operating across multiple offices, regions, and departments — onboarding kits, internal apparel systems, gifting initiatives, and national rollouts.",
    who: "Multi-location corporates, financial services, tech, professional services, insurance, and national franchises.",
  },
  {
    slug: "events",
    name: "Trade Shows & Events",
    status: "live",
    href: "/industries/events",
    tagline: "Trade shows, conferences, and activations",
    summary:
      "Structured branded merchandise programs for trade shows, conferences, recruiting events, and large-scale activations — apparel, premium giveaways, booth kits, and venue logistics handled end to end.",
    who: "Event marketing, field marketing, trade show, recruiting, and brand activation teams.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "events",
    client: "OneStaff Medical",
    industry: "Events",
    industrySlug: "events",
    title: "The Booth No One Stopped Talking About",
    summary:
      "How an 80's hip hop themed activation made OneStaff Medical the most talked-about booth at the biggest healthcare recruiting trade show — beating bigger budgets by 10x.",
    date: "May 12, 2026",
    readTime: "6 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "3,200+", label: "Branded items distributed at booth" },
      { value: "14", label: "SKUs across the on-site program" },
      { value: "4 Days", label: "From booth open to Vegas drop sold out" },
    ],
    challenge:
      "TravCon is the single biggest in-person brand moment of the year for a healthcare staffing agency — one week in Las Vegas where the next 12 months of contracts are physically standing in front of you. The merch had to pull people in from the aisle, give recruiters something real to hand over, and leave the show floor on a body that wears it home.",
    approach: [
      "Mapped the show into three audience moments — aisle pull, recruiter conversation, and post-conference wear — and built the SKU mix to serve each.",
      "Built the on-floor look from OneStaff's brand inward, plus a separate Vegas-themed limited drop with its own creative direction.",
      "Managed printing, embroidery, and finished-goods QC across multiple suppliers as a single program with one ship date.",
      "Palletized everything to a single Las Vegas drop point with backup product staged offsite.",
    ],
    outcome:
      "What used to be a fire drill of vendor wrangling and last-minute reorders is now a single annual program — one creative direction, one production timeline, one freight lane to Las Vegas — that OneStaff runs every TravCon.",
  },
  {
    slug: "nurse-gifting",
    client: "OneStaff Medical",
    industry: "Nurse Gifting",
    industrySlug: "healthcare",
    title: "Travel Nurse Gifting, Built Around the Wanderlust",
    summary:
      "Two annual gifting programs — Nurses Week and the holidays — for OneStaff Medical's nationwide travel nurses. We translated their wanderlust brand into products nurses actually use on the road, and ran design, production, and per-nurse delivery end to end.",
    date: "Apr 15, 2026",
    readTime: "6 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "3,000+", label: "Gift boxes shipped across two programs" },
      { value: "48", label: "States delivered to" },
      { value: "98%", label: "On-time delivery rate" },
    ],
    challenge:
      "OneStaff's travel nurses are on assignment in a different city every 13 weeks. A gift that shows up at the wrong address — or feels generic for a brand built on wanderlust — misses the moment entirely.",
    approach: [
      "Translated OneStaff's wanderlust brand into a product system built for life on the road, not life at a desk.",
      "Ran two distinct annual programs — Nurses Week and the holidays — with separate creative, sourcing, and timing.",
      "Pulled latest assignment addresses from OneStaff and shipped per-nurse to all 48 lower states.",
      "Closed each program with a one-page recap to feed the next season's planning.",
    ],
    outcome:
      "Two repeatable seasonal programs are now baked into OneStaff's calendar, with the internal team spending days on each instead of weeks — and nurses receiving a gift that actually arrives where they live this month.",
  },
  {
    slug: "corporate",
    client: "Corporate",
    industry: "Corporate",
    industrySlug: "corporate",
    title: "Coming Soon",
    summary:
      "A multi-location corporate apparel and gifting program — onboarding kits, internal apparel systems, and national rollouts handled end to end. Full case study coming soon.",
    date: "Coming Soon",
    readTime: "—",
    image: "/opengraph.jpg",
    results: [
      { value: "—", label: "Locations served" },
      { value: "—", label: "SKUs in program" },
      { value: "—", label: "On-time delivery" },
    ],
    challenge: "Coming soon.",
    approach: ["Coming soon."],
    outcome: "Coming soon.",
  },
  {
    slug: "construction",
    client: "Construction",
    industry: "Construction",
    industrySlug: "construction",
    title: "Coming Soon",
    summary:
      "A jobsite-ready apparel and gear program for a national construction company — workwear, safety apparel, and crew gifting under one managed program. Full case study coming soon.",
    date: "Coming Soon",
    readTime: "—",
    image: "/opengraph.jpg",
    results: [
      { value: "—", label: "Crews outfitted" },
      { value: "—", label: "SKUs in program" },
      { value: "—", label: "On-time delivery" },
    ],
    challenge: "Coming soon.",
    approach: ["Coming soon."],
    outcome: "Coming soon.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getRelatedCaseStudies(currentSlug?: string, industrySlug?: string, limit = 2): CaseStudy[] {
  const pool = caseStudies.filter((c) => c.slug !== currentSlug);
  const sameIndustry = industrySlug ? pool.filter((c) => c.industrySlug === industrySlug) : [];
  const others = pool.filter((c) => !sameIndustry.includes(c));
  return [...sameIndustry, ...others].slice(0, limit);
}

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
