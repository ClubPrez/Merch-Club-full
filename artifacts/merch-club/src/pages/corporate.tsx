import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import RelatedContent from "@/components/related-content";
import { StartProjectModal } from "@/components/start-project-modal";
import { blogPosts } from "@/pages/blog";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import bagImg from "@assets/Sporty_style_by_the_door_1776180821016.png";
import packagingImg from "@assets/Professional_promotional_packaging_shot_1776180821018.png";
import kittingImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1776180821018.png";
import tumblerImg from "@assets/ChatGPT_Image_Apr_16,_2026,_02_19_38_PM_1776376559711.png";
import plazaImg from "@assets/Merch_club_in_the_city_plaza_1775835373159.png";
import hoodieImg from "@assets/Club_logo_hoodie_with_bold_text_1775772595094.png";
import internalApparelImg from "@assets/Apparel_Women's_Quilted_Vest_1779815844277.png";
import challengesBg from "@assets/Golf_kit_1779815882715.png";
import heroImg from "@assets/Gold_Driver_Head_1779815968162.png";
import giftingRolloutImg from "@assets/Journal_(1)_1779816341928.png";
import accessBankFeatureImg from "@assets/Journal_(1)_1779816321010.png";
import onboardingKitsImg from "@assets/Golf_1779816227199.png";
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
  { num: "01", title: "Brand Standard Alignment", desc: "We align with marketing leadership to define logo usage, garment standards, decoration methods, and program scope across every office and department.", img: hoodieImg },
  { num: "02", title: "Controlled Proofing & Production", desc: "Every item follows defined brand guidelines. Production is monitored for consistency across batches, suppliers, and facilities.", img: packagingImg },
  { num: "03", title: "Distribution Coordination", desc: "Bulk shipments to HQ, location-based kits, or direct-to-employee fulfillment — chosen based on how your organization actually operates.", img: kittingImg },
  { num: "04", title: "Ongoing Program Oversight", desc: "We help maintain consistency long term, not just at launch — managing reorders, new locations, and refreshes as your team grows.", img: tumblerImg },
];

const challenges = [
  {
    title: "Fragmented Logo Usage",
    desc: "One office orders polos with the wrong logo file. Another uses an outdated lockup. Your brand starts looking inconsistent — and that's just the first symptom.",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5",
  },
  {
    title: "Inconsistent Garment Quality",
    desc: "Different sources, different fabric weights, different decoration. The result: apparel that looks unrelated even when the logo is correct.",
    icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z",
  },
  {
    title: "Different Vendors Across Regions",
    desc: "Each location ends up sourcing locally. Procurement loses visibility, marketing loses control, and your brand pays the price.",
    icon: "M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.949 8.949 0 005.65-2.009m-11.3 0A8.949 8.949 0 0012 21M3 12h18M9 3.5c-1.5 2.5-2.25 5.5-2.25 8.5s.75 6 2.25 8.5m6-17c1.5 2.5 2.25 5.5 2.25 8.5s-.75 6-2.25 8.5",
  },
  {
    title: "Inventory Confusion",
    desc: "Boxes get reordered when they shouldn't. Sizes run out at the worst moment. Stale stock gathers dust in storage rooms.",
    icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h10.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5zm10.5 0h2.25a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-.44-1.06l-2.12-2.122a1.5 1.5 0 00-1.06-.44H15.75",
  },
  {
    title: "No Centralized Oversight",
    desc: "When merchandise lives in five spreadsheets and three procurement systems, no one owns it. We become the team that does.",
    icon: "M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25",
  },
  {
    title: "Multi-Department Coordination",
    desc: "HR wants onboarding kits. Sales needs trade-show gear. Marketing has a launch. Leadership has a gifting initiative. We bring it all under one program.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
];

const apparelBrands = [
  "Patagonia",
  "Cutter & Buck",
  "Peter Millar",
  "Nike Golf",
  "The North Face",
  "Travis Mathew",
  "Lululemon",
  "Mizzen+Main",
  "Vineyard Vines",
  "Bombas",
  "YETI",
];

const featuredProjects = [
  { name: "Access Bank", desc: "Strategic gifting and branded materials coordinated across locations to maintain consistency and premium presentation.", img: packagingImg },
  { name: "Corporate Rebrand Rollout", desc: "Multi-department apparel and merchandise execution aligned with updated brand standards and coordinated distribution timelines.", img: hoodieImg },
  { name: "National Onboarding Kits", desc: "Welcome kit programs deployed to remote and hybrid teams across regions — kitted, branded, and shipped direct on day one.", img: kittingImg },
];

const faqs = [
  { q: "How do you maintain brand consistency across multiple locations?", a: "Through centralized proofing systems, defined garment standards, and controlled production oversight. Every order flows through the same approval workflow no matter which office initiates it." },
  { q: "Can you support onboarding kits for distributed teams?", a: "Yes. We coordinate kitting and direct-to-employee shipping as needed — including remote, hybrid, and multi-office workforces." },
  { q: "Do you help manage rebrand rollouts?", a: "Yes. We align merchandise production and distribution with updated brand standards and launch timelines so the rollout lands cleanly across every location." },
  { q: "Can we standardize apparel across departments?", a: "Yes. We build structured apparel systems that allow flexibility — by role, region, or department — while maintaining brand control." },
  { q: "Do you offer on-demand solutions for distributed teams?", a: "Yes. Our Brandini platform supports no-minimum, on-demand ordering with centralized oversight, so individual locations can self-serve without going off-brand." },
];

const industriesServed = [
  { name: "Financial Services", desc: "Banks, credit unions, and wealth firms — gifting, branch openings, and advisor programs." },
  { name: "Technology & SaaS", desc: "Onboarding kits, conference activations, and remote-team gifting for distributed orgs." },
  { name: "Professional Services", desc: "Law firms, consulting, and accounting — client gifting and partner-level apparel." },
  { name: "Insurance", desc: "Multi-region apparel programs, agent kits, and customer appreciation initiatives." },
  { name: "Real Estate", desc: "Brokerage branding, agent onboarding, and client closing gift programs." },
  { name: "Manufacturing HQ", desc: "Corporate office apparel, executive gifting, and trade show systems for industrial brands." },
  { name: "Multi-Location Retail", desc: "Store team apparel, opening kits, and seasonal rollouts across regions." },
  { name: "National Franchises", desc: "Franchisee apparel, on-demand reorder portals, and centralized brand control." },
  { name: "Energy & Utilities", desc: "Corporate-side apparel, leadership gifting, and community engagement programs." },
  { name: "Pharma & Biotech", desc: "Conference materials, internal apparel systems, and milestone recognition gifting." },
];

const useCases = [
  { title: "Internal Apparel Systems", desc: "Consistent, brand-aligned apparel for teams across offices. Easy reordering. Controlled decoration methods. No mismatched logos.", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" },
  { title: "Onboarding & Culture Kits", desc: "Welcome kits that reinforce brand standards while creating a cohesive first impression for new hires — kitted, branded, and shipped direct.", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
  { title: "Corporate Gifting Initiatives", desc: "Executive-level gifting programs designed for clients, partners, and leadership. Elevated sourcing. Controlled presentation. Coordinated fulfillment.", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
  { title: "National Brand Rollouts", desc: "Coordinated updates across locations during rebrands or campaign launches. Apparel, print, and supporting materials executed on a structured timeline.", icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" },
  { title: "Trade Show & Conference Kits", desc: "Booth apparel, attendee giveaways, and speaker materials engineered to elevate brand presence at industry events nationwide.", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
  { title: "On-Demand Reorder Portals", desc: "Brandini-powered no-minimum ordering for distributed teams. Centralized oversight, decentralized convenience.", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
];

const comparison = [
  { capability: "Brand consistency across every location", us: true, them: false },
  { capability: "Dedicated program manager", us: true, them: false },
  { capability: "Controlled proofing process", us: true, them: false },
  { capability: "Multi-region distribution & DTC fulfillment", us: true, them: false },
  { capability: "Executive-tier gifting sourcing", us: true, them: false },
  { capability: "On-demand portal for distributed teams", us: true, them: false },
  { capability: "Lowest-bid catalog products", us: false, them: true },
  { capability: "One-off, transactional ordering", us: false, them: true },
];

const trustItems = [
  { label: "Centralized Brand Control", desc: "Locked Pantones, controlled artwork, and audited proofs across every office and order." },
  { label: "Premium Sourcing", desc: "Executive-tier vendors curated for client gifting, leadership recognition, and milestone moments." },
  { label: "Multi-Region Fulfillment", desc: "Bulk shipments, location-based kits, and direct-to-employee delivery — domestic and international." },
  { label: "On-Demand Platform", desc: "Brandini powers no-minimum ordering for distributed teams with centralized oversight." },
  { label: "Vendor-Vetted Manufacturers", desc: "Certified suppliers with audited quality systems and consistent batch-to-batch results." },
  { label: "Insured & Bonded", desc: "Liability coverage on production, kitting, gifting, and freight to every location." },
];

const testimonials = [
  {
    quote: "We finally have one team accountable for every branded item that ships from our company. The brand consistency alone was worth it.",
    name: "VP of Marketing",
    org: "National Financial Services Firm",
  },
  {
    quote: "Their team rolled out new apparel to fourteen offices in the same week our rebrand went live. Not a single hiccup.",
    name: "Director of Brand",
    org: "Multi-Location SaaS Company",
  },
  {
    quote: "Executive gifting used to be a fire drill every December. Now it's a program — sourced, kitted, and shipped without us touching it.",
    name: "Chief of Staff",
    org: "Professional Services Firm",
  },
  {
    quote: "Our onboarding kits used to look like an afterthought. New hires now post unboxings on LinkedIn. That's the difference structure makes.",
    name: "People Operations Lead",
    org: "Tech Company",
  },
  {
    quote: "From conference booths to executive client gifts, every order lands the way we designed it. Quality, presentation, decoration — all on point.",
    name: "Brand Operations Manager",
    org: "Insurance Group",
  },
];

export default function Corporate() {
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

  const PAGE_URL = "https://merchclub.com/industries/corporate";
  const PAGE_IMG = "https://merchclub.com/opengraph.jpg";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Merch Club",
      "url": "https://merchclub.com",
      "logo": "https://merchclub.com/opengraph.jpg",
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
      "name": "Corporate Multi-Location Branded Merchandise Programs | Merch Club",
      "description": "Structured branded merchandise programs for corporate organizations operating across multiple offices, regions, and departments — sourcing, design, production, and distribution managed end to end.",
      "inLanguage": "en-US",
      "isPartOf": { "@type": "WebSite", "name": "Merch Club", "url": "https://merchclub.com" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": PAGE_IMG },
      "datePublished": "2026-04-20",
      "dateModified": "2026-04-20"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Corporate Multi-Location Branded Merchandise Programs",
      "serviceType": "Corporate Branded Merchandise & Apparel Programs",
      "provider": { "@type": "Organization", "name": "Merch Club", "url": "https://merchclub.com", "telephone": "+1-531-777-0347" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "audience": { "@type": "Audience", "audienceType": "Corporate Marketing, HR, Operations, and Brand Teams" },
      "description": "Structured branded merchandise programs for corporate organizations operating across multiple offices, regions, and departments — onboarding kits, internal apparel systems, gifting initiatives, and national rollouts.",
      "url": PAGE_URL,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Corporate Programs",
        "itemListElement": useCases.map((u) => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": u.title, "description": u.desc }
        }))
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "500",
        "highPrice": "500000"
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
      "name": "Corporate Sectors Served",
      "itemListElement": industriesServed.map((it, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": it.name,
        "description": it.desc
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://merchclub.com/#localbusiness",
      "name": "Merch Club",
      "image": "https://merchclub.com/opengraph.jpg",
      "url": "https://merchclub.com",
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merchclub.com/" },
        { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://merchclub.com/industries" },
        { "@type": "ListItem", "position": 3, "name": "Corporate", "item": PAGE_URL }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black pb-20 lg:pb-0">
      <SEO
        title="Corporate Multi-Location Branded Merchandise Programs"
        description="Structured branded merchandise programs for corporate organizations operating across multiple offices, regions, and departments. Onboarding kits, internal apparel systems, gifting initiatives, and national rollouts — handled by one team."
        path="/industries/corporate"
        image={PAGE_IMG}
        imageAlt="Corporate branded merchandise programs by Merch Club"
        keywords="corporate branded merchandise, multi-location apparel programs, employee onboarding kits, corporate gifting program, national brand rollout, internal apparel system, distributed team merch, on-demand company store, executive gifting, corporate rebrand rollout"
        jsonLd={jsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>Corporate Multi-Location Branded Merchandise Programs</h1>
          <p>
            Merch Club designs and executes structured branded merchandise programs for corporate
            organizations operating across multiple offices, regions, and departments throughout the
            United States.
          </p>
          <p>
            From onboarding kits and internal apparel systems to gifting initiatives and national
            rollouts, our team manages sourcing, design, production, and distribution so your brand
            stays consistent at scale.
          </p>
          <h2>Corporate Programs We Build</h2>
          <ul>
            {useCases.map((u) => (
              <li key={u.title}><strong>{u.title}:</strong> {u.desc}</li>
            ))}
          </ul>
          <h2>Sectors Served</h2>
          <ul>
            {industriesServed.map((it) => (
              <li key={it.name}><strong>{it.name}:</strong> {it.desc}</li>
            ))}
          </ul>
          <h2>Featured Corporate Projects</h2>
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
            <a href="/industries/corporate">Corporate</a>
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
                  { label: "Corporate", href: "/industries/corporate" },
                ]}
                theme="light"
                className="mb-6"
              />
              <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Industry — Corporate</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Branded Merch Programs <span className="text-[#888]">For Multi-Location Teams.</span>
              </h1>
              <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-xl mb-8 md:mb-10">
                Structured branded merchandise programs for corporate organizations operating across multiple offices, regions, and departments — sourcing, design, production, and distribution managed end to end.
              </p>
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-black text-white text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-[#222] transition-colors">
                Start a Corporate Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>

            <div className="relative order-1 lg:order-2 lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative rounded-full overflow-hidden border border-black/10 aspect-square w-full max-w-[440px] bg-black shadow-2xl">
                <img
                  src={heroImg}
                  alt="ACCESSbank-branded Igloo backpack cooler on the golf course at sunrise"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex absolute -top-4 -left-4 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-black text-white items-center justify-center text-[10px] font-bold uppercase tracking-[0.15em] text-center leading-tight p-3 -rotate-[8deg] shadow-xl">
                35+ Corporate<br />Clients
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
              Consistency Gets Harder As You Grow.<br /><span className="text-[#888]">That's Why Multi-Location Teams Need Structure.</span>
            </h2>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-10 items-start">
            <RevealItem>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Corporate Merch, Handled</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                What We Build <span className="text-[#888]">For Corporate Teams.</span>
              </h2>
            </RevealItem>
            <RevealItem delay={100} className="lg:pt-3">
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Whether it's <span className="text-black font-semibold">internal apparel</span>, <span className="text-black font-semibold">onboarding kits</span>, <span className="text-black font-semibold">executive gifting</span>, or <span className="text-black font-semibold">national rollouts</span>, branded merchandise across a multi-location org has to feel intentional and stay consistent — not isolated and one-off.
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
                <img src={internalApparelImg} alt="Internal apparel systems for corporate teams" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                <span className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </span>
                <div className="absolute bottom-7 left-7 right-7">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-1.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Internal Apparel</h3>
                  <p className="text-sm text-white/80 leading-relaxed">Brand-aligned apparel programs that scale cleanly across every office and team.</p>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={100} className="md:h-full">
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] h-full min-h-[260px] group cursor-pointer" onClick={() => setProjectModalOpen(true)}>
                <img src={onboardingKitsImg} alt="Onboarding and culture kits" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Onboarding<br />& Culture Kits</h3>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={150} className="md:h-full">
              <div className="rounded-2xl bg-[#eeece5] p-7 md:p-8 h-full min-h-[260px] flex flex-col justify-between">
                <div className="inline-flex self-start items-center gap-2 border border-black/20 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Why It Matters
                </div>
                <p className="text-2xl md:text-3xl text-black font-black leading-[1.1] tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  You're not buying swag.<br /><span className="text-[#888]">You're scaling a brand.</span>
                </p>
              </div>
            </RevealItem>

            <RevealItem delay={200} className="md:row-span-2 md:h-full md:col-start-3 md:row-start-1">
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] h-full min-h-[420px] group cursor-pointer" onClick={() => setProjectModalOpen(true)}>
                <img src={giftingRolloutImg} alt="Corporate gifting and rollouts" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                <div className="absolute bottom-7 left-7 right-7">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-1.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Gifting & Rollouts</h3>
                  <p className="text-sm text-white/80 mb-5 leading-relaxed">Executive-tier client gifting and coordinated national rollouts during rebrands and launches.</p>
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
                { label: "Internal Apparel", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" },
                { label: "Onboarding Kits", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
                { label: "Executive Gifting", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
                { label: "National Rollouts", icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" },
                { label: "Trade Shows", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
                { label: "On-Demand Portals", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
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
              Multi-Location Challenges<br /><span className="text-[#aaa]">We Help Solve.</span>
            </h2>
            <p className="text-base text-[#aaa] mb-16 max-w-xl">These problems aren't creative. They're operational. That's why we solve them with structure.</p>
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
              When merchandise is centralized, brand control improves. That's the whole game.
            </p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-y border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Featured Case Study</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              ACCESSbank.<br /><span className="text-[#888]">Banking Is Built on Relationships. So Is the Gift.</span>
            </h2>
          </RevealItem>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-12">
            <RevealItem>
              <Link href="/case-studies/access-bank" className="block group">
                <div className="rounded-2xl overflow-hidden border border-black/10">
                  <img
                    src={accessBankFeatureImg}
                    alt="ACCESSbank — The Art of Toasting book, custom-authored by Merch Club"
                    className="w-full h-[340px] md:h-[440px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </Link>
            </RevealItem>

            <RevealItem delay={150}>
              <p className="text-lg md:text-xl text-[#444] leading-relaxed mb-6">
                Most corporate gifting follows a formula: pick from a catalog, add a logo, ship it. ACCESSbank wasn't interested in that. So we built a multi-program system — shareholder gifting, executive accounts, employee recognition, branch hospitality, and a 52-page book on the art of toasting we authored and illustrated ourselves because the right one didn't exist.
              </p>
              <p className="text-base md:text-lg text-[#666] leading-relaxed mb-8">
                Every program funds the next. Every tier feels like the relationship — not the transaction.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10 border-y border-black/10 py-8">
                {[
                  { stat: "4", label: "Gifting tiers — shareholder to bulk" },
                  { stat: "52", label: "Page custom-authored book" },
                  { stat: "5", label: "Branch-illustrated coffee cups" },
                  { stat: "200+", label: "SKUs across the program" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl md:text-5xl font-black text-black leading-none mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{s.stat}</div>
                    <p className="text-xs md:text-sm text-[#666] leading-snug uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/case-studies/access-bank"
                  className="inline-flex items-center justify-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-[#222] transition-colors"
                >
                  Read the ACCESSbank Case Study
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <button
                  onClick={() => setProjectModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 border border-black/20 text-black text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  Start Your Corporate Project
                </button>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-y border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">What Clients Say</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Trusted by Corporate<br /><span className="text-[#888]">Brand &amp; Operations Teams.</span>
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
                  <CountUp end={200} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">Corporate Programs</div>
              </div>
              <div className="text-center md:border-x md:border-black/10">
                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp end={50} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">Multi-Region Rollouts</div>
              </div>
              <div className="text-center">
                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp end={100} suffix="%" />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">On-Brand Delivery</div>
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
              How We Run Corporate<br /><span className="text-[#888]">Merchandise Programs.</span>
            </h2>
            <p className="text-base text-[#888] mb-16 max-w-xl">Scaling branded merchandise requires process. Here's how we run it.</p>
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
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mt-16 border-t border-white/10 pt-8 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Less coordination. More control.</p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Merch Club vs. Typical Promo Vendors</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Why Corporate Teams<br /><span className="text-[#888]">Switch to Merch Club.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-12 leading-relaxed">A traditional promo distributor sells you a product. We run a program. The difference shows up on every order, in every office, in every region.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01" />
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
              {["Apparel", "Gifting", "Onboarding", "Reorders", "Trade Shows", "Distribution", "Proofing", "Rollouts"].map((word, j) => (
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Sectors Served</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Corporate,<br /><span className="text-[#888]">In Every Sector.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-16 leading-relaxed">From financial services to multi-location retail, we build merch programs that work across every kind of corporate org.</p>
          </RevealItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {industriesServed.map((industry, i) => (
              <RevealItem key={i} delay={i * 50}>
                <div className="border-l-2 border-black/10 pl-5 py-1 hover:border-black transition-colors">
                  <h3 className="text-lg font-black text-black mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{industry.name}</h3>
                  <p className="text-sm text-[#666] leading-relaxed">{industry.desc}</p>
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
              Built for Corporate<br /><span className="text-[#888]">Brand Standards.</span>
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

          <div className="mt-12 p-6 bg-[#f9f9f9] rounded-2xl border border-black/10 flex items-start gap-5">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] block mb-1">Free Tool</span>
              <p className="font-bold text-base text-black mb-1">Planning a corporate apparel order?</p>
              <p className="text-sm text-[#666] leading-relaxed mb-3">Use our free Size Breakdown Calculator to get the right quantity per size for your team — before you place the order. Instant, no sign-up.</p>
              <Link href="/tools/size-breakdown" className="text-sm font-bold text-black underline underline-offset-4 hover:text-[#444] transition-colors">Open the calculator →</Link>
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
              Ready to Centralize Your<br /><span className="text-[#888]">Branded Merchandise Program?</span>
            </h2>
            <p className="text-base text-[#888] leading-relaxed mb-8 max-w-lg mx-auto">
              Tell us how your organization operates. We'll handle the execution.
            </p>
          </RevealItem>
          <RevealItem delay={200}>
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-black text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors">
              Start a Corporate Project
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
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01" /></svg>
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
