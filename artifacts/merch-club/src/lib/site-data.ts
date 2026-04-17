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
    slug: "nonprofit",
    name: "Nonprofit",
    status: "coming-soon",
    href: "/industries#nonprofit",
    tagline: "Foundations, advocacy groups, and member orgs",
    summary:
      "Mission-aligned merchandise programs for fundraising, donor stewardship, volunteer recognition, and event activations — built to extend cause visibility without overwhelming small teams.",
    who: "Foundations, advocacy organizations, member associations, and community nonprofits.",
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    status: "coming-soon",
    href: "/industries#financial-services",
    tagline: "Banks, credit unions, and wealth firms",
    summary:
      "Polished, compliance-aware branded merchandise for client gifting, advisor onboarding, branch openings, and conference activations — engineered for institutions where brand presentation is non-negotiable.",
    who: "Regional banks, credit unions, wealth management firms, and fintech companies.",
  },
  {
    slug: "education",
    name: "Education",
    status: "coming-soon",
    href: "/industries#education",
    tagline: "Universities, K-12 systems, and EdTech",
    summary:
      "Campus-wide branded merchandise programs for student life, alumni engagement, athletics, and admissions — coordinated across departments without losing brand integrity.",
    who: "Universities, K-12 districts, charter networks, and EdTech companies.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "regional-health-network-staff-apparel",
    client: "Regional Health Network",
    industry: "Healthcare",
    industrySlug: "healthcare",
    title: "Unifying Staff Apparel Across 12 Hospitals",
    summary:
      "How a regional healthcare network consolidated apparel sourcing, eliminated rogue vendor spend, and rolled out a branded staff program across 12 hospitals in 90 days.",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "12", label: "Hospitals onboarded" },
      { value: "38%", label: "Reduction in apparel spend" },
      { value: "100%", label: "On-time launch delivery" },
    ],
    challenge:
      "The network was managing apparel through six separate vendors, with no shared brand guide, inconsistent sizing, and constant logistical fire drills around new-hire kits and shift uniforms.",
    approach: [
      "Audited every existing apparel SKU across all 12 hospitals and mapped them to a unified brand standard.",
      "Built a centralized program portal with role-based ordering, automatic approval routing, and per-site budgeting.",
      "Replaced six legacy vendors with a single managed program — production, kitting, and per-hospital fulfillment under one roof.",
      "Stood up an on-demand reorder workflow for new hires so HR teams could trigger shipments without procurement involvement.",
    ],
    outcome:
      "Within the first 90 days the network had a fully branded staff apparel program live across all 12 hospitals, with measurable cost reductions and a single point of accountability for every shipment.",
    relatedArticles: ["merch-program-strategy", "branded-merchandise-mistakes"],
  },
  {
    slug: "nonprofit-donor-stewardship-program",
    client: "National Wellness Foundation",
    industry: "Nonprofit",
    industrySlug: "nonprofit",
    title: "Donor Stewardship Kits That Actually Get Opened",
    summary:
      "A national foundation needed donor recognition that felt premium without burning through restricted-use funds. We designed a tiered kit program with measurable engagement lift.",
    date: "Feb 9, 2026",
    readTime: "4 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "2.4x", label: "Donor reply rate vs. prior" },
      { value: "$0", label: "Cost overruns" },
      { value: "3", label: "Stewardship tiers launched" },
    ],
    challenge:
      "The foundation's previous donor gifts felt generic and rarely sparked a second touch from major donors. Internal teams were stitching together gifts from three different vendors with no consistent unboxing.",
    approach: [
      "Defined three donor tiers tied to giving thresholds, each with a distinct unboxing narrative.",
      "Designed and produced custom packaging that doubled as the stewardship message — no separate insert needed.",
      "Built fulfillment workflows that triggered kits within 5 business days of a qualifying gift.",
      "Tracked open-and-reply rates per tier to inform the next year of program investment.",
    ],
    outcome:
      "Donor reply rates more than doubled, and the foundation now has a repeatable stewardship motion that scales without adding internal headcount.",
    relatedArticles: ["custom-kitting-brand-experience", "merch-program-strategy"],
  },
  {
    slug: "growth-stage-saas-team-onboarding",
    client: "Growth-stage SaaS Company",
    industry: "Technology",
    industrySlug: "technology",
    title: "Onboarding Kits That Make New Hires Feel Day-One Valued",
    summary:
      "A 400-person SaaS company replaced their generic swag bag with a curated welcome experience — and saw a measurable lift in week-one engagement scores.",
    date: "Jan 22, 2026",
    readTime: "4 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "+18", label: "NPS lift, week-one" },
      { value: "100%", label: "Pre-start delivery rate" },
      { value: "1", label: "Vendor, all SKUs" },
    ],
    challenge:
      "The company was patching together onboarding swag from three suppliers, frequently shipping late and with mismatched branding. New hires often received their kit days into their start date — undermining the welcome moment.",
    approach: [
      "Standardized onboarding kit contents across all roles and locations.",
      "Built integration with the People team's HRIS so kits triggered automatically on offer acceptance.",
      "Took over warehousing, packing, and direct-to-employee shipping so kits arrived 2 days before start date.",
      "Created a refresh cadence so existing employees received a curated drop quarterly.",
    ],
    outcome:
      "New hires now get a polished welcome moment before they ever log in, and the People team has zero ongoing operational lift to maintain it.",
    relatedArticles: ["custom-kitting-brand-experience"],
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
