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
    slug: "access-bank",
    client: "ACCESSbank",
    industry: "Corporate Gifting",
    industrySlug: "corporate",
    title: "Banking Is Built on Relationships. So Is the Gift.",
    summary:
      "How ACCESSbank turned holiday gifting, shareholder programs, and employee recognition into the most memorable brand experiences in their market — including a book on the art of toasting we wrote and illustrated ourselves because it didn't exist yet.",
    date: "Ongoing Partnership",
    readTime: "8 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "4 Tiers", label: "Audience-mapped gifting system" },
      { value: "52 Pgs", label: "Custom-authored hardcover book" },
      { value: "5", label: "Branch-illustrated coffee cups" },
    ],
    challenge:
      "ACCESSbank doesn't bank like a bank — they bank like a partner. So shareholder, executive, and employee gifting couldn't feel transactional. Every program had to reinforce the relationship the bank had spent years building.",
    approach: [
      "Built a four-tier gifting system mapping shareholders, key accounts, mid-level touchpoints, and bulk giveaways — each tier funded by savings on the next.",
      "Partnered with PITCH, a local pizzeria + wine program, to hand-deliver holiday shareholder kits as two trusted community brands arriving together.",
      "Authored and illustrated a 52-page hardcover book on the art of toasting from scratch because the right book didn't exist.",
      "Commissioned original line illustrations of every branch and brought them to life on location-specific coffee cups.",
    ],
    outcome:
      "Shareholder, executive, key account, employee, and walk-in programs run as one connected system — each gift designed around the way ACCESSbank actually shows up for the people it serves.",
  },
  {
    slug: "construction",
    client: "Baker Group",
    industry: "Construction",
    industrySlug: "construction",
    title: "What It Looks Like When Your Merch Team Isn't a Vendor",
    summary:
      "Three-plus years embedded with Baker Group — a 1,500-employee Midwest design-build contractor. Field apparel, executive gear, client gifting, trade shows, recruiting, and a 60th-anniversary beer brewed in Des Moines with Exile Brewing.",
    date: "Apr 22, 2026",
    readTime: "7 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "3+ Yrs", label: "Embedded partnership" },
      { value: "1,500", label: "Employees outfitted" },
      { value: "1 of 1", label: "Custom anniversary beer brewed" },
    ],
    challenge:
      "Baker Group is a 1,500-employee multi-specialty contractor with field crews, executive leadership, recruiting, marketing, and HR all needing branded apparel and gear for different moments — and a 60th anniversary milestone that couldn't be marked with a coffee mug.",
    approach: [
      "Embedded across every department — field, exec, recruiting, marketing, HR — so one brand voice carries across every program.",
      "Built Carhartt-grade field apparel for jobsite conditions alongside executive polos and golf gear for client meetings.",
      "Developed Bernie Steam Beer with Exile Brewing as the 60th-anniversary hero — custom co-branded beer, glassware, and cooler backpacks.",
      "Run annual planning, production across decoration methods, fulfillment, and recap reporting as a single ongoing partnership.",
    ],
    outcome:
      "Baker runs every merch moment — field, exec, anniversaries, trade shows, recruiting — through one embedded team instead of a stack of vendors, with consistency across every department and milestone.",
  },
  {
    slug: "jay-moore-landscaping",
    client: "Jay Moore Landscaping",
    industry: "Brand System",
    industrySlug: "corporate",
    title: "How a Landscaper Became a Landmark.",
    summary:
      "How Merch Club built Jay Moore Landscaping into Omaha's most recognizable brand by owning one color — and watched a century-old neighbor rebrand to match.",
    date: "Jun 7, 2026",
    readTime: "7 min read",
    image: "/opengraph.jpg",
    results: [
      { value: "1 Color", label: "Owned in a crowded market" },
      { value: "7", label: "Branded mailers in two years" },
      { value: "1", label: "Competitor rebranded to match" },
    ],
    challenge:
      "There was already another Moore Landscaping in Omaha. Same name, same city, same category. And the landscaping industry compounds the problem — green logos, generic trucks, yard signs that disappear into the lawn. Jay needed something people see from across the street and know instantly.",
    approach: [
      "Chose fuchsia (Pantone 227 C) as the single ownable color in a category dominated by green — a beacon against every lawn.",
      "Painted Jay's entire building fuchsia and raised an interstate sign visible to tens of thousands of drivers daily.",
      "Drew a hand-illustrated magnolia to signal craft — wrapping trucks, framing doors, and turning the yard sign into a piece of art homeowners want on their lawns.",
      "Built a seven-mailer direct-mail program with soft-touch finish and real photo shoots, plus a branded welcome journal and a button-triggered fulfillment package for new clients.",
    ],
    outcome:
      "People call Jay to compliment the color, not for a quote. A neighboring business of 100+ years rebranded to pink after being given directions as 'next to the beautiful pink building.' Jay's competitor started copying the color. The brand became part of how Omaha sees itself.",
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
