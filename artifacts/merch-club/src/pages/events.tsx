import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import RelatedContent from "@/components/related-content";
import { StartProjectModal } from "@/components/start-project-modal";
import { blogPosts } from "@/pages/blog";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import bagImg from "@assets/ChatGPT_Image_May_22,_2026,_10_55_13_AM_1779465328841.png";
import packagingImg from "@assets/461204439_18297032584205370_9064317744138119949_n_1779465629405.jpg";
import kittingImg from "@assets/461204439_18297032584205370_9064317744138119949_n_1778693892845.jpg";
import tumblerImg from "@assets/485771444_1048758360618545_372803450094697544_n_1778693892845.jpg";
import hoodieImg from "@assets/ChatGPT_Image_Apr_30,_2026,_01_33_52_PM_1779465366869.png";
import boothImg from "@assets/461092537_18297032548205370_1790799881044431646_n_1778782467156.jpg";
import challengesBg from "@assets/461191773_18297032593205370_5287082838877484901_n_1778693892844.jpg";
import heroImg from "@assets/Trade_Show_1_1779465004779.png";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealItem({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "scale" }) {
  const { ref, visible } = useRevealOnScroll();
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    scale: "scale(0.85)",
  };
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0) translateX(0) scale(1)" : transforms[direction], transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ end, suffix = "", duration = 1800, className = "" }: { end: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(end * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref} className={className}>{value}{suffix}</span>;
}

const processSteps = [
  { num: "01", title: "Strategy & Positioning", desc: "We align on audience, event type, and desired brand impression before recommending products. The booth doesn't sell — the strategy does.", img: hoodieImg },
  { num: "02", title: "Coordinated Design", desc: "Apparel, giveaways, and booth materials are treated as one system. Every touchpoint reinforces the same brand impression.", img: packagingImg },
  { num: "03", title: "Production Management", desc: "We monitor timelines, production stages, and quality across vendors so deadlines hold and last-minute surprises stay rare.", img: tumblerImg },
  { num: "04", title: "Kitting & Delivery", desc: "Direct-to-venue shipping, pre-packed kits for staff, and organized labeling so booth setup takes minutes, not hours.", img: kittingImg },
];

const challenges = [
  {
    title: "Last-Minute Vendor Chaos",
    desc: "Three vendors, three timelines, three points of failure — and a show floor that doesn't care about your excuses. We become one accountable team.",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
  {
    title: "Cheap Giveaways That Hurt Perception",
    desc: "Filler swag costs you twice — the budget you spent and the impression you wanted. Premium relevance beats novelty every time.",
    icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
  {
    title: "Inconsistent Branding Across Materials",
    desc: "Apparel from one source. Giveaways from another. Booth print from a third. The result is a booth that looks rented, not designed.",
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
  {
    title: "Missed Production Deadlines",
    desc: "Event dates don't move. We build production timelines backward from your show date with built-in checkpoints — not hopes.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Over-Ordering & Wasted Budget",
    desc: "Pallets of leftover swag are a budget tax — and they don't help next year. We size programs to actual booth traffic, not aspiration.",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  {
    title: "Booth Setup Scrambles",
    desc: "Boxes arrive unlabeled. Sizes are mixed. Apparel is missing. We pre-kit, label, and stage so setup runs on a clock, not a prayer.",
    icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
  },
];

const apparelBrands = [
  "Patagonia",
  "YETI",
  "Nike",
  "Carhartt",
  "The North Face",
  "Cutter & Buck",
  "Travis Mathew",
  "Bombas",
  "Stanley",
  "Moleskine",
  "Bose",
];

const featuredProjects = [
  { name: "Healthcare Recruiting Activation", desc: "Coordinated staff apparel, premium giveaways, and supporting materials designed to attract qualified candidates at national conferences.", img: kittingImg },
  { name: "80s Themed Industry Activation", desc: "Full apparel system, creative giveaway strategy, and branded booth presence executed under tight timelines for a high-visibility industry event.", img: hoodieImg },
  { name: "Multi-Conference Rollout", desc: "Standardized apparel and merchandise kits distributed across multiple events throughout the year for a national field team.", img: packagingImg },
];

const faqs = [
  { q: "How early should we start planning trade show merchandise?", a: "Ideally 6–8 weeks before the event. Larger activations, custom apparel runs, or themed builds may require more lead time — the earlier we're aligned, the more options stay on the table." },
  { q: "What makes a good trade show giveaway?", a: "Relevance, perceived value, and alignment with your brand positioning. Cheap items often create the wrong impression; thoughtful items get carried home and used long after the event ends." },
  { q: "Can you ship directly to event venues?", a: "Yes. We coordinate venue delivery, labeling, hold-for-arrival timing, and contact with show services so your kits land where and when they need to." },
  { q: "Do you help standardize merchandise across multiple events?", a: "Yes. We build repeatable event kits that maintain brand consistency across regional conferences, recruiting tours, and national trade shows." },
  { q: "Can you support creative themed activations?", a: "Yes. We align product sourcing, decoration methods, and execution with event themes — from era-based concepts to industry-specific creative — while maintaining operational structure." },
];

const eventTypesServed = [
  { name: "National Trade Shows", desc: "Full booth merch programs for industry-defining shows — apparel, giveaways, print, and shipping handled end to end." },
  { name: "Regional Conferences", desc: "Right-sized kits for repeating regional events without the logistical drag of starting from scratch each time." },
  { name: "Recruiting & Career Events", desc: "Apparel and giveaways engineered to attract qualified talent and project credibility on crowded floors." },
  { name: "Customer & User Conferences", desc: "Branded experiences for owned events — attendee swag, speaker apparel, sponsor kits, and VIP gifting." },
  { name: "Sales Kickoffs (SKOs)", desc: "Internal-team apparel, recognition merch, and onboarding kits engineered around your annual kickoff timeline." },
  { name: "Industry Activations", desc: "Themed creative builds for sponsorships, pop-ups, and high-visibility brand moments." },
  { name: "Field Marketing Tours", desc: "Multi-city rollouts with consistent kits, on-time shipping, and local activation support." },
  { name: "Sponsorship Programs", desc: "Premium gifting and branded touchpoints engineered to elevate sponsor presence at partner events." },
  { name: "Awards & Galas", desc: "Elevated gifting, recognition merch, and event-night materials with premium presentation standards." },
  { name: "Pop-Up Activations", desc: "Short-window creative programs executed end to end — sourcing, decoration, kitting, and venue delivery." },
];

const useCases = [
  { title: "Trade Show Execution Kits", desc: "Coordinated apparel, premium giveaways, booth materials, and supporting print — designed to work together, not compete for attention.", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
  { title: "Staff Apparel Systems", desc: "Consistent, on-brand apparel that makes your team recognizable and professional on the floor — without the procurement scramble.", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" },
  { title: "Premium Giveaway Strategies", desc: "Intentional product selection based on audience, environment, and brand positioning. No filler swag — only items worth carrying home.", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
  { title: "Multi-Event Rollouts", desc: "Programs designed to scale across regional conferences, recruiting tours, and national trade shows — without losing brand consistency.", icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" },
  { title: "Booth Print & Signage", desc: "Banners, backdrops, table covers, and event print engineered to match your apparel and giveaway program — one cohesive brand wall.", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
  { title: "Direct-to-Venue Logistics", desc: "Hold-for-arrival shipping, on-time delivery, and labeled kits engineered around show services and load-in windows.", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h10.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5zm10.5 0h2.25a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-.44-1.06l-2.12-2.122a1.5 1.5 0 00-1.06-.44H15.75" },
];

const comparison = [
  { capability: "Coordinated apparel + giveaways + booth as one system", us: true, them: false },
  { capability: "Show-floor production timeline management", us: true, them: false },
  { capability: "Premium-tier giveaway sourcing", us: true, them: false },
  { capability: "Pre-kitted, labeled, hold-for-arrival shipping", us: true, them: false },
  { capability: "Multi-event rollout standardization", us: true, them: false },
  { capability: "Themed creative activation builds", us: true, them: false },
  { capability: "Catalog of cheap stock giveaways", us: false, them: true },
  { capability: "One-off, transactional ordering", us: false, them: true },
];

const trustItems = [
  { label: "Show-Floor Production Discipline", desc: "Production timelines built backward from event dates with checkpoint reviews — not last-minute prayer." },
  { label: "Premium Giveaway Sourcing", desc: "Curated vendors and items with perceived value worth carrying home, not tossing at the airport." },
  { label: "Direct-to-Venue Fulfillment", desc: "Hold-for-arrival shipping, accurate labeling, and timing aligned to show services and load-in windows." },
  { label: "Themed Creative Capability", desc: "Concept-to-kit execution for themed activations, sponsorships, and creative event builds." },
  { label: "Multi-Event Standardization", desc: "Repeatable kits that scale across tours, regions, and recurring shows — without re-inventing the booth." },
  { label: "Insured & Bonded", desc: "Liability coverage on production, kitting, and freight — including direct delivery to convention centers and venues." },
];

const testimonials = [
  {
    quote: "Our booth showed up looking like one cohesive brand instead of three vendors stitched together. Best floor presence we've ever had.",
    name: "Director of Field Marketing",
    org: "B2B SaaS Company",
  },
  {
    quote: "We hit a six-week production window for a national show with a themed activation. They didn't just make it work — they made it look easy.",
    name: "Event Marketing Manager",
    org: "National Healthcare System",
  },
  {
    quote: "The giveaways actually got carried home. People posted them. That's the difference between filler swag and a real strategy.",
    name: "Brand Lead",
    org: "Consumer Tech Brand",
  },
  {
    quote: "Twelve regional events in one year, every kit on time, every booth on brand. We finally have a partner who treats events like an operation.",
    name: "VP of Marketing",
    org: "Multi-Region Insurance Group",
  },
  {
    quote: "Pre-kitted, labeled, and shipped direct to the venue. Setup went from a four-hour scramble to a fifty-minute checklist.",
    name: "Trade Show Operations Lead",
    org: "Industrial Manufacturer",
  },
];

export default function Events() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const [testimonialFade, setTestimonialFade] = useState(true);

  useEffect(() => {
    if (testimonialPaused) return;
    const id = setInterval(() => {
      setTestimonialFade(false);
      setTimeout(() => {
        setTestimonialIndex((i) => (i + 1) % testimonials.length);
        setTestimonialFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, [testimonialPaused]);

  const goToTestimonial = (i: number) => {
    setTestimonialFade(false);
    setTimeout(() => { setTestimonialIndex(i); setTestimonialFade(true); }, 300);
  };

  const PAGE_URL = "https://merchclub.replit.app/industries/events";
  const PAGE_IMG = "https://merchclub.replit.app/opengraph.jpg";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Merch Club",
      "url": "https://merchclub.replit.app",
      "logo": "https://merchclub.replit.app/opengraph.jpg",
      "telephone": "+1-531-777-0347",
      "email": "chris@merchclub.com",
      "address": { "@type": "PostalAddress", "addressCountry": "US" },
      "sameAs": [
        "https://www.facebook.com/MerchClubPro",
        "https://www.instagram.com/merchclub_ig/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": PAGE_URL,
      "url": PAGE_URL,
      "name": "Trade Show & Event Branded Merchandise Programs | Merch Club",
      "description": "Structured branded merchandise programs for trade shows, conferences, recruiting events, and large-scale activations — apparel, premium giveaways, booth kits, and venue logistics handled end to end.",
      "inLanguage": "en-US",
      "isPartOf": { "@type": "WebSite", "name": "Merch Club", "url": "https://merchclub.replit.app" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": PAGE_IMG },
      "datePublished": "2026-04-20",
      "dateModified": "2026-04-20"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Trade Show & Event Branded Merchandise Programs",
      "serviceType": "Trade Show & Event Merchandise Programs",
      "provider": { "@type": "Organization", "name": "Merch Club", "url": "https://merchclub.replit.app", "telephone": "+1-531-777-0347" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "audience": { "@type": "Audience", "audienceType": "Event Marketing, Field Marketing, Trade Show, and Brand Activation Teams" },
      "description": "Structured branded merchandise programs for trade shows, conferences, recruiting events, and large-scale activations — apparel, premium giveaways, booth materials, kitting, and venue delivery.",
      "url": PAGE_URL,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Event Programs",
        "itemListElement": useCases.map((u) => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": u.title, "description": u.desc }
        }))
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "1500",
        "highPrice": "250000"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "itemReviewed": { "@type": "Organization", "name": "Merch Club" },
      "ratingValue": "5.0",
      "reviewCount": "47",
      "bestRating": "5"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Event Types Served",
      "itemListElement": eventTypesServed.map((it, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": it.name,
        "description": it.desc
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://merchclub.replit.app/#localbusiness",
      "name": "Merch Club",
      "image": "https://merchclub.replit.app/opengraph.jpg",
      "url": "https://merchclub.replit.app",
      "telephone": "+1-531-777-0347",
      "email": "chris@merchclub.com",
      "priceRange": "$$-$$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Omaha",
        "addressRegion": "NE",
        "postalCode": "68102",
        "addressCountry": "US"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 41.2565, "longitude": -95.9345 },
      "areaServed": [
        { "@type": "Country", "name": "United States" },
        { "@type": "State", "name": "Nebraska" },
        { "@type": "State", "name": "Iowa" },
        { "@type": "State", "name": "Kansas" },
        { "@type": "State", "name": "Missouri" },
        { "@type": "State", "name": "South Dakota" }
      ],
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }],
      "sameAs": ["https://www.facebook.com/MerchClubPro","https://www.instagram.com/merchclub_ig/"]
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merchclub.replit.app/" },
        { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://merchclub.replit.app/industries" },
        { "@type": "ListItem", "position": 3, "name": "Trade Shows & Events", "item": PAGE_URL }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black pb-20 lg:pb-0">
      <SEO
        title="Trade Show & Event Branded Merchandise Programs"
        description="Structured branded merchandise programs for trade shows, conferences, recruiting events, and activations. Apparel, premium giveaways, booth kits, and venue logistics — handled end to end."
        path="/industries/events"
        image={PAGE_IMG}
        imageAlt="Trade show and event branded merchandise programs by Merch Club"
        keywords="trade show merchandise, event branded merchandise, conference giveaways, booth swag, trade show apparel, event kitting, premium giveaways, recruiting event merch, sales kickoff merch, multi-event rollout, themed activation merch, branded booth materials"
        jsonLd={jsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>Trade Show & Event Branded Merchandise Programs</h1>
          <p>
            Merch Club designs and executes structured branded merchandise programs for trade shows,
            conferences, recruiting events, and large-scale activations across the United States.
          </p>
          <p>
            From apparel and premium giveaways to full booth kits and kitting logistics, our team
            manages sourcing, production, and delivery so your team can focus on showing up strong.
          </p>
          <h2>Event Programs We Build</h2>
          <ul>
            {useCases.map((u) => (
              <li key={u.title}><strong>{u.title}:</strong> {u.desc}</li>
            ))}
          </ul>
          <h2>Event Types Served</h2>
          <ul>
            {eventTypesServed.map((it) => (
              <li key={it.name}><strong>{it.name}:</strong> {it.desc}</li>
            ))}
          </ul>
          <h2>Featured Event Projects</h2>
          <ul>
            {featuredProjects.map((c) => (
              <li key={c.name}><strong>{c.name}:</strong> {c.desc}</li>
            ))}
          </ul>
          <h2>Frequently Asked Questions</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
          <h2>Contact</h2>
          <p>Phone: <a href="tel:+15317770347">+1 531-777-0347</a></p>
          <p>
            <a href="/">Home</a> · <a href="/about">About</a> · <a href="/blog">Learning Center</a> ·{" "}
            <a href="/industries/events">Trade Shows & Events</a>
          </p>
        </div>
      </noscript>
      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />


      <section className="relative bg-white overflow-hidden border-b border-black/10">
        <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-20 pt-20 md:pt-28 pb-4 md:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 lg:col-span-3">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Industries", href: "/industries" },
                  { label: "Trade Shows & Events", href: "/industries/events" },
                ]}
                theme="light"
                className="mb-6"
              />
              <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Industry — Trade Shows & Events</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Trade Show Merch Programs <span className="text-[#888]">For Show Floors.</span>
              </h1>
              <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-xl mb-8 md:mb-10">
                Structured branded merchandise programs for trade shows, conferences, recruiting events, and large-scale activations — apparel, premium giveaways, booth kits, and venue logistics handled end to end.
              </p>
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-black text-white text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-[#222] transition-colors">
                Start an Event Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>

            <div className="relative order-1 lg:order-2 lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative rounded-full overflow-hidden border border-black/10 aspect-square w-full max-w-[440px] bg-black shadow-2xl">
                <img
                  src={heroImg}
                  alt="Baker Group recruiting booth at a university career fair"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex absolute -top-4 -left-4 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-black text-white items-center justify-center text-[10px] font-bold uppercase tracking-[0.15em] text-center leading-tight p-3 -rotate-[8deg] shadow-xl">
                300+ Events<br />Activated
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-[10px] pb-10 overflow-hidden">
          <div className="flex items-center gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
            {[...Array(3)].map((_, loop) => (
              <div key={loop} className="flex items-center gap-16 shrink-0">
                {apparelBrands.map((brand, i) => (
                  <div key={`${loop}-${i}`} className="flex items-center h-10 shrink-0">
                    <span className="text-2xl md:text-3xl font-black uppercase tracking-[0.05em] text-black/60 hover:text-black transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-16 md:py-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4 text-center">The Standard</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white text-center max-w-5xl mx-auto" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Event Deadlines Don't Move.<br /><span className="text-[#888]">Presence Requires Execution.</span>
            </h2>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-10 items-start">
            <RevealItem>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Event Merch, Handled</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                What We Build <span className="text-[#888]">For Event Teams.</span>
              </h2>
            </RevealItem>
            <RevealItem delay={100} className="lg:pt-3">
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Whether it's a <span className="text-black font-semibold">national trade show</span>, a <span className="text-black font-semibold">recruiting tour</span>, a <span className="text-black font-semibold">themed activation</span>, or a <span className="text-black font-semibold">multi-conference rollout</span>, branded merchandise at events isn't about giving things away — it's about creating presence. And presence requires execution.
              </p>
            </RevealItem>
          </div>

          <RevealItem delay={150} className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#222] transition-colors">
                Start a Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </button>
              <Link href="/#work" className="inline-flex items-center gap-2 border border-black text-black text-sm font-bold px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
                Our Work
              </Link>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 md:grid-rows-2 gap-4 md:gap-5 md:auto-rows-fr" style={{ minHeight: "640px" }}>
            <RevealItem className="md:row-span-2 md:h-full">
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] h-full min-h-[420px] group cursor-pointer" onClick={() => setProjectModalOpen(true)}>
                <img src={bagImg} alt="Trade show booth execution kits" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                <span className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </span>
                <div className="absolute bottom-7 left-7 right-7">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-1.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Trade Show Kits</h3>
                  <p className="text-sm text-white/80 leading-relaxed">Apparel, giveaways, booth print, and signage designed as one cohesive system.</p>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={100} className="md:h-full">
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] h-full min-h-[260px] group cursor-pointer" onClick={() => setProjectModalOpen(true)}>
                <img src={hoodieImg} alt="Staff apparel systems for events" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Staff Apparel<br />Systems</h3>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={150} className="md:h-full">
              <div className="rounded-2xl bg-[#eeece5] p-7 md:p-8 h-full min-h-[260px] flex flex-col justify-between">
                <div className="inline-flex self-start items-center gap-2 border border-black/20 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Why It Matters
                </div>
                <p className="text-2xl md:text-3xl text-black font-black leading-[1.1] tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  You're not giving<br />things away.<br /><span className="text-[#888]">You're creating presence.</span>
                </p>
              </div>
            </RevealItem>

            <RevealItem delay={200} className="md:row-span-2 md:h-full md:col-start-3 md:row-start-1">
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] h-full min-h-[420px] group cursor-pointer" onClick={() => setProjectModalOpen(true)}>
                <img src={packagingImg} alt="Premium giveaway strategy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                <div className="absolute bottom-7 left-7 right-7">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-1.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Premium Giveaways</h3>
                  <p className="text-sm text-white/80 mb-5 leading-relaxed">Intentional product selection based on audience, environment, and brand positioning. No filler swag.</p>
                  <button onClick={(e) => { e.stopPropagation(); setProjectModalOpen(true); }} className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                    Start a Project
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                  </button>
                </div>
              </div>
            </RevealItem>
          </div>

          <RevealItem delay={250}>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2 lg:gap-3 mt-12 lg:mt-16">
              {[
                { label: "Trade Show Kits", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
                { label: "Staff Apparel", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" },
                { label: "Premium Giveaways", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
                { label: "Multi-Event Rollouts", icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" },
                { label: "Booth Print", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
                { label: "Venue Delivery", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h10.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5zm10.5 0h2.25a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-.44-1.06l-2.12-2.122a1.5 1.5 0 00-1.06-.44H15.75" },
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-black/[0.03] border border-black/10 rounded-full px-3 lg:px-4 py-2 text-[10px] lg:text-xs font-bold uppercase tracking-[0.15em] text-black whitespace-nowrap hover:bg-black hover:text-white hover:border-black transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.label}
                </span>
              ))}
            </div>
          </RevealItem>
        </div>
      </section>

      <section className="relative bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${challengesBg})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/30" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Challenges We Solve</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Common Event Challenges<br /><span className="text-[#aaa]">We Help Solve.</span>
            </h2>
            <p className="text-base text-[#aaa] mb-16 max-w-xl">Trade show merchandise works best when it's treated like an operational program — not a last-minute checklist.</p>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((c, i) => (
              <RevealItem key={i} delay={i * 120}>
                <div className="border border-white/10 bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 hover:border-white/20 hover:bg-black/65 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{c.title}</h3>
                  <p className="text-base md:text-lg text-[#bbb] leading-relaxed">{c.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
          <RevealItem delay={600}>
            <p className="text-base md:text-lg font-semibold text-white mt-12 max-w-2xl">
              Less scrambling. More control. That's the entire point.
            </p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-y border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Featured Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-16" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Featured Event<br /><span className="text-[#888]">Activations.</span>
            </h2>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((study, i) => (
              <RevealItem key={i} delay={i * 150}>
                <div className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden border border-black/10 mb-6">
                    <img src={study.img} alt={study.name} className="w-full h-[280px] md:h-[320px] object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{study.name}</h3>
                  <p className="text-base md:text-lg text-[#666] leading-relaxed">{study.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
          <RevealItem delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setProjectModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-[#222] transition-colors w-full sm:w-auto"
              >
                Start Your Event Project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <a
                href="/#work"
                className="inline-flex items-center justify-center gap-2 border border-black/20 text-black text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto"
              >
                View All Work
              </a>
            </div>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-y border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">What Clients Say</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Trusted by Event<br /><span className="text-[#888]">&amp; Field Marketing Teams.</span>
              </h2>
            </div>
          </RevealItem>
          <div
            className="max-w-4xl mx-auto text-center min-h-[320px] flex flex-col items-center justify-center"
            onMouseEnter={() => setTestimonialPaused(true)}
            onMouseLeave={() => setTestimonialPaused(false)}
          >
            <div className={`transition-all duration-500 ${testimonialFade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <p className="text-2xl md:text-4xl lg:text-5xl font-black text-black leading-tight tracking-tight mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
                "{testimonials[testimonialIndex].quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-sm font-bold text-black">
                  {testimonials[testimonialIndex].name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-black block">{testimonials[testimonialIndex].name}</span>
                  <span className="text-xs text-[#888] uppercase tracking-wider block mb-1">{testimonials[testimonialIndex].org}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? "bg-black w-6" : "bg-black/15 hover:bg-black/30 w-2"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <RevealItem delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-center mt-20 pt-12 border-t border-black/10">
              <div className="text-center">
                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp end={300} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">Events Activated</div>
              </div>
              <div className="text-center md:border-x md:border-black/10">
                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp end={6} suffix="–8" />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">Wks Ideal Lead Time</div>
              </div>
              <div className="text-center">
                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">On-Time Delivery</div>
              </div>
            </div>
          </RevealItem>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Our Process</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              How We Execute<br /><span className="text-[#888]">Event Programs.</span>
            </h2>
            <p className="text-base text-[#888] mb-16 max-w-xl">Events are about timing. Here's how we build programs that hit the floor on time.</p>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {processSteps.map((step, i) => (
              <RevealItem key={i} delay={i * 120}>
                <div className="relative flex items-start gap-6 group">
                  <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-2xl md:text-3xl font-black text-white/90 mb-1 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{step.title}</h3>
                    <p className="text-sm text-[#888] leading-relaxed">{step.desc}</p>
                  </div>
                  {i % 2 === 0 && (
                    <div className="hidden md:flex absolute -right-6 top-10 text-white/30">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  )}
                </div>
              </RevealItem>
            ))}
          </div>
          <RevealItem delay={500}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mt-16 border-t border-white/10 pt-8 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Less scrambling. More control.</p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Merch Club vs. Typical Promo Vendors</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Why Event Teams<br /><span className="text-[#888]">Switch to Merch Club.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-12 leading-relaxed">A traditional promo distributor sells you stock. We run a program. The difference shows up the moment the booth lights come on.</p>
          </RevealItem>
          <RevealItem delay={150}>
            <div className="overflow-x-auto rounded-2xl border border-black/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-black/10">
                    <th className="py-5 px-6 text-xs font-black uppercase tracking-[0.15em] text-black">Capability</th>
                    <th className="py-5 px-6 text-xs font-black uppercase tracking-[0.15em] text-black text-center">Merch Club</th>
                    <th className="py-5 px-6 text-xs font-black uppercase tracking-[0.15em] text-[#888] text-center">Typical Promo Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={i} className={`border-b border-black/5 ${i % 2 === 1 ? "bg-white" : "bg-[#fafafa]"}`}>
                      <td className="py-4 px-6 text-sm text-black font-medium">{row.capability}</td>
                      <td className="py-4 px-6 text-center">
                        {row.us ? (
                          <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-black text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          </span>
                        ) : (
                          <span className="text-[#ccc] text-lg">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.them ? (
                          <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-[#ccc] text-[#888]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          </span>
                        ) : (
                          <span className="text-[#ccc] text-lg">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealItem>
          <RevealItem delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setProjectModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-[#222] transition-colors w-full sm:w-auto"
              >
                Make the Switch
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <a
                href="tel:+15317770347"
                className="inline-flex items-center justify-center gap-2 border border-black/20 text-black text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Us
              </a>
            </div>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-4 px-0 overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 mx-6">
              {["Trade Shows", "Conferences", "Activations", "Recruiting", "Sponsorships", "Apparel", "Giveaways", "Kitting"].map((word, j) => (
                <span key={j} className="flex items-center gap-6">
                  <span className="text-sm md:text-base font-black uppercase tracking-[0.15em] text-black/80" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem" }}>{word}</span>
                  <img src={cloverImg} alt="" className="h-4 w-4 opacity-30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Event Types Served</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Built for Every<br /><span className="text-[#888]">Kind of Event.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-16 leading-relaxed">From national trade shows to sales kickoffs to themed pop-ups — we build merch programs that work across every type of event activation.</p>
          </RevealItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {eventTypesServed.map((event, i) => (
              <RevealItem key={i} delay={i * 50}>
                <div className="border-l-2 border-black/10 pl-5 py-1 hover:border-black transition-colors">
                  <h3 className="text-lg font-black text-black mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{event.name}</h3>
                  <p className="text-sm text-[#666] leading-relaxed">{event.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 md:py-24 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Standards & Trust</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-white mb-12 max-w-3xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Built for Event<br /><span className="text-[#888]">Show-Floor Standards.</span>
            </h2>
          </RevealItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {trustItems.map((t, i) => (
              <RevealItem key={i} delay={i * 60}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white mb-1 uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{t.label}</h3>
                    <p className="text-sm text-[#888] leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-16 md:py-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <RevealItem delay={0}>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#888] border border-black/15 rounded-full px-4 py-1.5 mb-5">FAQ's</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Frequently Asked Questions
              </h3>
            </div>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <div>
              {faqs.filter((_, i) => i % 2 === 0).map((faq, i) => {
                const idx = i * 2;
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-t border-black/10">
                    <button
                      className="w-full flex items-center justify-between py-5 text-left group"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <span className="text-base md:text-lg font-medium text-black pr-4">{faq.q}</span>
                      <span className={`text-xl text-black/50 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? "240px" : "0", opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="text-sm text-[#666] pb-5 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {faqs.filter((_, i) => i % 2 === 1).map((faq, i) => {
                const idx = i * 2 + 1;
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-t border-black/10">
                    <button
                      className="w-full flex items-center justify-between py-5 text-left group"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <span className="text-base md:text-lg font-medium text-black pr-4">{faq.q}</span>
                      <span className={`text-xl text-black/50 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? "240px" : "0", opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="text-sm text-[#666] pb-5 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <RelatedContent
        eyebrow="From the Learning Center"
        heading="Strategy & Operations Reading"
        items={blogPosts.slice(0, 3).map((p) => ({
          href: `/blog/${p.slug}`,
          eyebrow: p.tag,
          title: p.title,
          description: p.excerpt,
          meta: p.readTime,
          cta: `Read: ${p.title}`,
        }))}
        theme="dark"
      />

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealItem>
            <img src={cloverImg} alt="" className="h-12 mx-auto mb-6 opacity-40" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Ready to Run Your Next<br /><span className="text-[#888]">Event With Structure?</span>
            </h2>
            <p className="text-base text-[#888] leading-relaxed mb-8 max-w-lg mx-auto">
              Tell us what event you're planning. We'll handle the execution.
            </p>
          </RevealItem>
          <RevealItem delay={200}>
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-black text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors">
              Start an Event Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </RevealItem>
        </div>
      </section>
      <SiteFooter />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a] border-t border-white/10 px-4 py-3 flex items-center gap-2 shadow-2xl" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <a href="tel:+15317770347" className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Call Merch Club">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
        </a>
        <button onClick={() => setProjectModalOpen(true)} className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full hover:bg-gray-200 transition-colors">
          Start a Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
        </button>
      </div>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
