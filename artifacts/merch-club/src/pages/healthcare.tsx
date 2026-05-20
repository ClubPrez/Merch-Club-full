import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import RelatedContent from "@/components/related-content";
import { StartProjectModal } from "@/components/start-project-modal";
import { caseStudies as siteCaseStudies, getRelatedCaseStudies } from "@/lib/site-data";
import { blogPosts } from "@/pages/blog";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import heroImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776180821018.png";
import bagImg from "@assets/Sporty_style_by_the_door_1776180821016.png";
import packagingImg from "@assets/Professional_promotional_packaging_shot_1776180821018.png";
import kittingImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1776180821018.png";
import nursesWeekImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_08_AM_1776180821018.png";
import scrubsModelImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776181322914.png";
import tumblerImg from "@assets/ChatGPT_Image_Apr_16,_2026,_02_19_38_PM_1776376559711.png";
import challengesBg from "@assets/Sporty_style_by_the_door_1776422196392.png";
import clinicianGiftingImg from "@assets/Box-Logo_Corrected_1779288344289.png";
import eventsImg from "@assets/461191773_18297032593205370_5287082838877484901_n_1778693892844.jpg";
import heroPortrait from "@assets/ChatGPT_Image_May_5,_2026,_07_31_07_PM_1779288262963.png";
import { SiteHeader } from "@/components/site-header";

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
  { num: "01", title: "Strategic Alignment", desc: "We align with marketing and operations leadership to define scope, timelines, brand standards, and distribution needs.", img: scrubsModelImg },
  { num: "02", title: "Controlled Design & Proofing", desc: "Brand accuracy matters in healthcare. We manage the proofing process to maintain consistency across apparel, print, and packaging.", img: packagingImg },
  { num: "03", title: "Production Oversight", desc: "We source products intentionally. Decoration methods are selected based on durability, environment, and usage. Quality is monitored before anything ships.", img: tumblerImg },
  { num: "04", title: "Fulfillment & Distribution", desc: "Kitting. Multi-location shipping. Department-level coordination. We manage logistics so internal teams aren't chasing boxes.", img: kittingImg },
];

const challenges = [
  {
    title: "Brand Consistency",
    desc: "Maintaining a unified brand across departments, locations, and rotating staff — without one-off vendors going off-script.",
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5",
  },
  {
    title: "Sizing at Scale",
    desc: "Managing apparel sizing across hundreds of clinical staff — without endless spreadsheets, exchanges, or guesswork.",
    icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z",
  },
  {
    title: "Multi-Site Logistics",
    desc: "Shipping to multiple facilities, clinics, and offices on tight timelines — coordinated, tracked, and on schedule.",
    icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h10.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5zm10.5 0h2.25a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-.44-1.06l-2.12-2.122a1.5 1.5 0 00-1.06-.44H15.75",
  },
  {
    title: "Professional, Not Promo",
    desc: "Balancing clinical professionalism with team culture — apparel and merch that staff are actually proud to wear.",
    icon: "M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25",
  },
  {
    title: "Quality That Holds Up",
    desc: "Avoiding low-quality promo products that undermine trust — every item proofed, sourced, and produced to last.",
    icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
  },
  {
    title: "One Coordinated Partner",
    desc: "Replacing five disconnected vendors with one team handling sourcing, proofing, kitting, and distribution end-to-end.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
];

const scrubBrands = [
  "FIGS",
  "Cherokee",
  "Grey's Anatomy",
  "WonderWink",
  "Dickies Medical",
  "Healing Hands",
  "Koi",
  "Jaanuu",
  "Barco",
  "Landau",
  "Med Couture",
];

const caseStudies = [
  { name: "CHI", desc: "Structured apparel and branded materials executed across departments to maintain consistency and durability in clinical environments.", img: packagingImg },
  { name: "OneStaff Medical", desc: "Large-scale apparel and event-driven merchandise programs built to support distributed healthcare staffing teams.", img: nursesWeekImg },
  { name: "Breast Cancer Awareness Initiative", desc: "Coordinated awareness apparel and supporting materials designed to increase visibility and drive participation without feeling gimmicky.", img: bagImg },
];

const faqs = [
  { q: "What types of branded merchandise work best for hospitals?", a: "Durable apparel systems, structured onboarding kits, and intentional awareness campaign materials tend to perform best. Products must reflect professionalism and withstand high-use environments." },
  { q: "Can you manage merchandise for multiple healthcare locations?", a: "Yes. We regularly coordinate kitting and distribution across facilities, departments, and states." },
  { q: "How do you handle apparel sizing for large clinical teams?", a: "We use structured size collection systems and controlled ordering processes to reduce errors and simplify reorders." },
  { q: "Do you support awareness campaigns like breast cancer initiatives?", a: "Yes. We coordinate apparel, supporting materials, and fulfillment logistics so campaigns feel cohesive and well executed." },
  { q: "How do you maintain brand consistency across departments?", a: "Through controlled proofing systems, centralized sourcing, and structured program oversight." },
];

const industriesServed = [
  { name: "Hospitals & Health Systems", desc: "Multi-facility apparel, awareness campaigns, donor gifting." },
  { name: "Specialty Clinics", desc: "Cardiology, orthopedics, oncology, dermatology brand programs." },
  { name: "Urgent Care Networks", desc: "Multi-location apparel and onboarding kits for fast-growing clinics." },
  { name: "Surgery Centers", desc: "Sterile-environment-appropriate apparel and patient-facing materials." },
  { name: "Dental Practices", desc: "Branded scrubs, patient kits, and recall campaign materials." },
  { name: "Behavioral Health", desc: "Approachable, trauma-informed apparel and program materials." },
  { name: "Home Health & Hospice", desc: "Field-staff apparel and family-facing comfort kits." },
  { name: "Medical Staffing Agencies", desc: "Recruitment kits, traveler welcome packs, and event apparel." },
  { name: "Healthcare Nonprofits", desc: "Awareness merchandise, donor recognition, and event collateral." },
  { name: "Medical Device & Pharma", desc: "Conference apparel, sales enablement gear, and event activations." },
];

const useCases = [
  { title: "Nurses Week", desc: "Coordinated appreciation kits across every department and shift, on the same week, on brand.", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
  { title: "Recruiting & Onboarding", desc: "Welcome kits that make new clinicians feel chosen — apparel, printed materials, and gifts in one box.", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07" },
  { title: "Hospital Openings", desc: "Day-one kits, ribbon-cutting apparel, and giveaways shipped to a single facility on a fixed date.", icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" },
  { title: "Donor Appreciation", desc: "Premium, restrained gifting for board members, major donors, and physicians.", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
  { title: "Conferences & Booths", desc: "Booth apparel, attendee giveaways, and overnight reorders when traffic spikes.", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
  { title: "Awareness Months", desc: "Breast cancer, mental health, heart month — coordinated apparel and patient-facing materials.", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
];

const comparison = [
  { capability: "Brand consistency across facilities", us: true, them: false },
  { capability: "Dedicated program manager", us: true, them: false },
  { capability: "Controlled proofing process", us: true, them: false },
  { capability: "Multi-site kitting & distribution", us: true, them: false },
  { capability: "Healthcare-grade material sourcing", us: true, them: false },
  { capability: "Strategic intake & scoping", us: true, them: false },
  { capability: "Lowest-bid catalog products", us: false, them: true },
  { capability: "One-off, transactional ordering", us: false, them: true },
];

const trustItems = [
  { label: "HIPAA-Aware Fulfillment", desc: "Patient-data-conscious workflows on direct-mail and onboarding kits." },
  { label: "Brand Standards Adherence", desc: "Locked Pantones, controlled artwork, audited proofs." },
  { label: "Sustainable Sourcing", desc: "WRAP- and Fair Labor-aligned manufacturers prioritized." },
  { label: "Compliance-Ready Apparel", desc: "Antimicrobial, fluid-resistant, and OR-appropriate options available." },
  { label: "Vendor-Vetted", desc: "Certified suppliers with audited quality systems." },
  { label: "Insured & Bonded", desc: "Liability coverage on production, kitting, and freight." },
];

const testimonials = [
  {
    quote: "Merch Club took the chaos out of our nurses week rollout. One vendor, every facility, on time — and the apparel actually looked like our brand.",
    name: "Director of Marketing",
    org: "Regional Hospital Network",
  },
  {
    quote: "We've worked with promotional companies before. This is the first time it felt like a real program. The proofing process and quality control made the difference.",
    name: "VP, Brand & Communications",
    org: "Specialty Healthcare Group",
  },
  {
    quote: "Kitting and multi-site distribution used to eat a week of our operations time. Now we approve a proof and the boxes show up where they need to be.",
    name: "Operations Manager",
    org: "Multi-Location Clinic Group",
  },
  {
    quote: "Their team handled onboarding kits for 400 new hires last quarter without a single hiccup. Our HR team finally has a partner they can trust.",
    name: "Chief People Officer",
    org: "Integrated Health System",
  },
  {
    quote: "From breast cancer awareness to physician gifting, every program lands the way we designed it. Quality, packaging, presentation — it all matches.",
    name: "Brand Director",
    org: "Academic Medical Center",
  },
];

const relatedLinks = [
  { title: "Education & Universities", path: "/industries", desc: "Branded merchandise for higher-ed and K–12 systems." },
  { title: "Hospitality & Events", path: "/industries", desc: "Hotel, venue, and event activation merchandise." },
  { title: "Corporate & Enterprise", path: "/industries", desc: "Multi-location enterprise merch programs." },
  { title: "Branded Apparel Programs", path: "/#services", desc: "Structured staff apparel systems built to scale." },
];

const blogLinks = [
  { title: "How to Plan a Nurses Week Merchandise Program", path: "/blog" },
  { title: "Choosing the Right Scrub Brand for Your Hospital", path: "/blog" },
  { title: "Why Healthcare Branding Fails (and How to Fix It)", path: "/blog" },
];

export default function Healthcare() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
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

  const PAGE_URL = "https://merchclub.replit.app/industries/healthcare";
  const PAGE_IMG = "https://merchclub.replit.app/opengraph.jpg";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Merch Club",
      "url": "https://merchclub.replit.app",
      "logo": "https://merchclub.replit.app/opengraph.jpg",
      "telephone": "+1-531-777-0347",
      "email": "hello@merchclub.com",
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
      "name": "Healthcare Branded Merchandise Programs | Merch Club",
      "description": "Structured branded merchandise programs for hospitals, healthcare networks, specialty clinics, and medical organizations — strategy through delivery.",
      "inLanguage": "en-US",
      "isPartOf": { "@type": "WebSite", "name": "Merch Club", "url": "https://merchclub.replit.app" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": PAGE_IMG },
      "datePublished": "2026-04-01",
      "dateModified": "2026-04-17"
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Healthcare Branded Merchandise Programs",
      "serviceType": "Healthcare Branded Merchandise Programs",
      "provider": { "@type": "Organization", "name": "Merch Club", "url": "https://merchclub.replit.app", "telephone": "+1-531-777-0347" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "audience": { "@type": "Audience", "audienceType": "Hospitals, Healthcare Networks, Specialty Clinics, Medical Staffing Agencies" },
      "description": "Structured branded merchandise programs for hospitals, healthcare networks, specialty clinics, and medical organizations — strategy, design, sourcing, kitting, and multi-site distribution.",
      "url": PAGE_URL,
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Healthcare Merch Programs",
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
      "name": "Healthcare Industries Served",
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
      "@id": "https://merchclub.replit.app/#localbusiness",
      "name": "Merch Club",
      "image": "https://merchclub.replit.app/opengraph.jpg",
      "url": "https://merchclub.replit.app",
      "telephone": "+1-531-777-0347",
      "email": "hello@merchclub.com",
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
        { "@type": "ListItem", "position": 3, "name": "Healthcare", "item": PAGE_URL }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black pb-20 lg:pb-0">
      <SEO
        title="Healthcare Branded Merchandise Programs"
        description="Structured branded merchandise programs for hospitals, healthcare networks, specialty clinics, and medical organizations. Strategy, design, sourcing, kitting, and multi-site distribution — handled by one team."
        path="/industries/healthcare"
        image={PAGE_IMG}
        imageAlt="Branded healthcare merchandise programs by Merch Club"
        keywords="healthcare branded merchandise, hospital apparel programs, medical scrubs program, nurses week kits, hospital onboarding kits, multi-site healthcare merch, clinical brand consistency, healthcare promotional products, breast cancer awareness apparel, donor appreciation gifting"
        jsonLd={jsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>Healthcare Branded Merchandise Programs</h1>
          <p>
            Merch Club designs and executes structured branded merchandise programs for hospitals,
            healthcare networks, specialty clinics, urgent care, surgery centers, dental practices,
            behavioral health, home health, hospice, medical staffing agencies, healthcare nonprofits,
            and medical device & pharma organizations across the United States.
          </p>
          <p>
            From strategy and design through controlled proofing, production oversight, kitting, and
            multi-site distribution, our team manages every step so internal marketing and operations
            teams aren't chasing vendors.
          </p>
          <h2>Healthcare Programs We Build</h2>
          <ul>
            {useCases.map((u) => (
              <li key={u.title}><strong>{u.title}:</strong> {u.desc}</li>
            ))}
          </ul>
          <h2>Industries Served</h2>
          <ul>
            {industriesServed.map((it) => (
              <li key={it.name}><strong>{it.name}:</strong> {it.desc}</li>
            ))}
          </ul>
          <h2>Featured Healthcare Projects</h2>
          <ul>
            {caseStudies.map((c) => (
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
            <a href="/">Home</a> · <a href="/about">About</a> · <a href="/blog">Blog</a> ·{" "}
            <a href="/industries/healthcare">Healthcare</a>
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
                  { label: "Healthcare", href: "/industries/healthcare" },
                ]}
                theme="light"
                className="mb-6"
              />
              <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Industry — Healthcare</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                We Build Branded<br />Merch Programs<br /><span className="text-[#888]">for Healthcare.</span>
              </h1>
              <p className="text-base md:text-lg text-[#555] leading-relaxed max-w-xl mb-10">
                Structured merchandise programs for hospitals, healthcare networks, specialty clinics, and medical organizations — strategy through delivery.
              </p>
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold px-8 py-3.5 rounded-full hover:bg-[#222] transition-colors">
                Start a Healthcare Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>

            <div className="relative order-1 lg:order-2 lg:col-span-2 flex justify-center lg:justify-end">
              <div className="relative rounded-full overflow-hidden border border-black/10 aspect-square w-full max-w-[440px] bg-black shadow-2xl">
                <img
                  src={heroPortrait}
                  alt="Travel nurse leaving a wellness studio with a OneStaff-branded duffel and yoga mat"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="hidden md:flex absolute -top-4 -left-4 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-black text-white items-center justify-center text-[10px] font-bold uppercase tracking-[0.15em] text-center leading-tight p-3 -rotate-[8deg] shadow-xl">
                200+ Healthcare<br />Clients
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-[10px] pb-10 overflow-hidden">
          <div className="flex items-center gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
            {[...Array(3)].map((_, loop) => (
              <div key={loop} className="flex items-center gap-16 shrink-0">
                {scrubBrands.map((brand, i) => (
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
              Healthcare Isn't Casual.<br /><span className="text-[#888]">Your Brand Presence Shouldn't Be Either.</span>
            </h2>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-10 items-start">
            <RevealItem>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Healthcare Merch, Handled</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                What We Build <span className="text-[#888]">For Healthcare Teams.</span>
              </h2>
            </RevealItem>
            <RevealItem delay={100} className="lg:pt-3">
              <p className="text-base md:text-lg text-[#666] leading-relaxed">
                Whether it's <span className="text-black font-semibold">staff apparel</span>, <span className="text-black font-semibold">awareness initiatives</span>, or <span className="text-black font-semibold">donor gifting</span>, branded merchandise in healthcare has to feel intentional and well-managed — not transactional.
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
                <img src={scrubsModelImg} alt="Healthcare staff apparel programs" className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                <span className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </span>
                <div className="absolute bottom-7 left-7 right-7">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-1.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Staff Apparel</h3>
                  <p className="text-sm text-white/80 leading-relaxed">Programs designed to stand up to clinical use, shift after shift.</p>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={100} className="md:h-full">
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] h-full min-h-[260px] group cursor-pointer" onClick={() => setProjectModalOpen(true)}>
                <img src={eventsImg} alt="OneStaff Medical booth at TravCon — branded merch wall and travel-nurse giveaways" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Events</h3>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={150} className="md:h-full">
              <div className="rounded-2xl bg-[#eeece5] p-7 md:p-8 h-full min-h-[260px] flex flex-col justify-between">
                <div className="inline-flex self-start items-center gap-2 border border-black/20 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  Why It Matters
                </div>
                <p className="text-2xl md:text-3xl text-black font-black leading-[1.1] tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  You're not ordering swag.<br /><span className="text-[#888]">You're reinforcing trust.</span>
                </p>
              </div>
            </RevealItem>

            <RevealItem delay={200} className="md:row-span-2 md:h-full md:col-start-3 md:row-start-1">
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] h-full min-h-[420px] group cursor-pointer" onClick={() => setProjectModalOpen(true)}>
                <img src={clinicianGiftingImg} alt="OneStaff Medical 'Wake Up to New Adventures' Nurses Week gift boxes with branded mailer cards and crinkle fill" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/0" />
                <div className="absolute bottom-7 left-7 right-7">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-1.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Clinician Gifting</h3>
                  <p className="text-sm text-white/80 mb-5 leading-relaxed">Nurses Week, holidays, and milestone kits — designed around the way clinicians actually live and pack.</p>
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
                { label: "Staff Apparel", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" },
                { label: "Events", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
                { label: "Donor Gifting", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
                { label: "Branded Merchandise", icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" },
                { label: "Nurses Week", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
                { label: "Onboarding Kits", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
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
              Healthcare Challenges<br /><span className="text-[#aaa]">We Help Solve.</span>
            </h2>
            <p className="text-base text-[#aaa] mb-16 max-w-xl">Most healthcare teams come to us because coordination is the real problem.</p>
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
              Branded merchandise programs work when they're treated like operational systems, not one-off orders. That's the difference.
            </p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-y border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Case Studies</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-16" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Featured Healthcare<br /><span className="text-[#888]">Projects.</span>
            </h2>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
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
                Start Your Healthcare Project
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
                Trusted by Healthcare<br /><span className="text-[#888]">Marketing &amp; Operations Teams.</span>
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
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">Healthcare Clients</div>
              </div>
              <div className="text-center md:border-x md:border-black/10">
                <div className="text-7xl md:text-8xl lg:text-9xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp end={50} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#888] mt-3">Hospitals Served</div>
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
              How We Run Healthcare<br /><span className="text-[#888]">Merchandise Programs.</span>
            </h2>
            <p className="text-base text-[#888] mb-16 max-w-xl">You shouldn't have to manage five vendors to execute one initiative. Here's how we structure it.</p>
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
            <p className="text-2xl md:text-3xl lg:text-4xl font-black text-white mt-16 border-t border-white/10 pt-8 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Execution is structured from start to finish.</p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Merch Club vs. Typical Promo Vendors</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Why Healthcare Teams<br /><span className="text-[#888]">Switch to Merch Club.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-12 leading-relaxed">A traditional promo distributor sells you a product. We run a program. The difference shows up in every facility, every reorder, every audit.</p>
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
              {["Apparel", "Kitting", "Onboarding", "Awareness", "Gifting", "Distribution", "Proofing", "Production"].map((word, j) => (
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Industries Served</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Healthcare,<br /><span className="text-[#888]">In Every Form.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-16 leading-relaxed">From multi-hospital health systems to single-location specialty clinics, we build merchandise programs that work across the full healthcare landscape.</p>
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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Compliance & Trust</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-white mb-12 max-w-3xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Built for Healthcare<br /><span className="text-[#888]">Operating Standards.</span>
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
                      style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0 }}
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
                      style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0 }}
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
              Ready to Build a Structured<br /><span className="text-[#888]">Healthcare Merchandise Program?</span>
            </h2>
            <p className="text-base text-[#888] leading-relaxed mb-8 max-w-lg mx-auto">
              Tell us what your organization is planning. We'll handle the execution.
            </p>
          </RevealItem>
          <RevealItem delay={200}>
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-black text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors">
              Start a Healthcare Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </RevealItem>
        </div>
      </section>


      <footer className="bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <img src={logoSrc} alt="Merch Club" className="h-10 w-auto mb-6 brightness-0 invert" />
              <p className="text-sm text-[#666] leading-relaxed mb-6 max-w-sm">
                Full-service branded merchandise for healthcare teams that demand quality, consistency, and execution.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/MerchClubPro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#888] hover:text-white hover:border-white/40 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.instagram.com/merchclub_ig/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#888] hover:text-white hover:border-white/40 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>Services</h4>
              <ul className="space-y-3">
                {["Strategy", "Design", "Proofing", "Production", "Kitting", "Distribution"].map(item => (
                  <li key={item}><a href="#" className="text-sm text-[#666] hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>Company</h4>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Industries", href: "/industries" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Learning Center", href: "/blog" },
                  { label: "Healthcare", href: "/industries/healthcare" },
                ].map(item => (
                  <li key={item.label}><Link href={item.href} className="text-sm text-[#666] hover:text-white transition-colors">{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>Get Started</h4>
              <p className="text-xs text-[#666] mb-4 leading-relaxed">Ready to build a structured healthcare merch program? Let's talk.</p>
              <button onClick={() => setProjectModalOpen(true)} className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                Start a Project
              </button>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#444]">&copy; {new Date().getFullYear()} Merch Club. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
                <a key={item} href="#" className="text-xs text-[#444] hover:text-[#888] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

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
