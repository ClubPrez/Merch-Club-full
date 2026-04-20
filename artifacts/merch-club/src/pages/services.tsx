import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { IndustriesMegaMenu } from "@/components/industries-mega-menu";
import { industries } from "@/lib/site-data";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import heroImg from "@assets/Sporty_style_by_the_door_1776180821016.png";
import strategyImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776181322914.png";
import designImg from "@assets/Casual_style_with_Carhartt_jacket_1775772661826.png";
import sourcingImg from "@assets/ChatGPT_Image_Apr_16,_2026,_02_19_38_PM_1776376559711.png";
import productionImg from "@assets/Professional_promotional_packaging_shot_1776180821018.png";
import kittingImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1776180821018.png";
import distributionImg from "@assets/Sporty_style_by_the_door_1776180821016.png";
import editorialImg1 from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1776376559712.png";
import editorialImg2 from "@assets/ChatGPT_Image_Apr_16,_2026,_02_19_45_PM_1776425570204.png";
import editorialImg3 from "@assets/ChatGPT_Image_Apr_9,_2026,_04_16_06_PM_1775831640229.png";
import healthcareImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776181322914.png";
import constructionImg from "@assets/Casual_style_with_Carhartt_jacket_1775772661826.png";
import corporateImg from "@assets/Professional_promotional_packaging_shot_1776180821018.png";
import eventsImg from "@assets/Sporty_style_by_the_door_1776180821016.png";

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

function CountUp({ end, suffix = "", prefix = "", duration = 1800 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
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
  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

const capabilities = [
  {
    title: "Strategy",
    short: "Program design",
    desc: "We start by understanding the audience, the timeline, the budget, and what success actually looks like — then build a merchandise program that fits, scales, and lasts.",
    img: strategyImg,
    bullets: ["Program scoping", "Audience mapping", "Budget framing", "Brand standards review"],
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    title: "Design & Proofing",
    short: "On-brand decoration",
    desc: "Brand-consistent decoration across apparel, print, and packaging. We manage the proofing process so brand color, scale, and placement stay correct on every item.",
    img: designImg,
    bullets: ["Logo treatment", "Color matching", "Mockups & proofs", "Brand guideline review"],
    icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
  {
    title: "Sourcing",
    short: "Curated suppliers",
    desc: "Access to premium apparel and merchandise from the brands you trust — Carhartt, Nike, Patagonia, Yeti, FIGS, and 2,000+ vetted manufacturers — at the right price for your scale.",
    img: sourcingImg,
    bullets: ["2,000+ vetted suppliers", "Premium brand access", "Sustainable options", "Volume pricing"],
    icon: "M3.375 3h17.25c.621 0 1.125.504 1.125 1.125v3.026a2.999 2.999 0 01-.879 2.121l-6.621 6.621a3 3 0 01-2.121.879H5.25a3 3 0 01-2.121-.879l-2.121-2.121A2.999 2.999 0 010 11.151V4.125C0 3.504.504 3 1.125 3h2.25z M3 14.25v6.75c0 .621.504 1.125 1.125 1.125h15.75c.621 0 1.125-.504 1.125-1.125v-6.75",
  },
  {
    title: "Production",
    short: "Quality oversight",
    desc: "Decoration methods chosen for the use case — embroidery, screen print, DTG, heat transfer, laser, debossing — with quality monitored before anything leaves the floor.",
    img: productionImg,
    bullets: ["Embroidery & screen print", "DTG & heat transfer", "Laser & debossing", "QA on every run"],
    icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
  },
  {
    title: "Kitting",
    short: "Built-to-spec packs",
    desc: "Branded kits assembled in-house — onboarding kits, gift boxes, event boxes, recruiting kits — with custom packaging, inserts, and personalization at any scale.",
    img: kittingImg,
    bullets: ["Onboarding & welcome kits", "Gift box assembly", "Event & trade show kits", "Custom packaging"],
    icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
  {
    title: "Distribution",
    short: "Nationwide fulfillment",
    desc: "Direct-to-employee, direct-to-jobsite, direct-to-venue, and multi-location splits — coordinated, tracked, and on schedule, with one team accountable end-to-end.",
    img: distributionImg,
    bullets: ["Direct-to-employee", "Multi-location splits", "Drop-ship & pop-up shops", "Inventory & warehousing"],
    icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h10.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5zm10.5 0h2.25a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-.44-1.06l-2.12-2.122a1.5 1.5 0 00-1.06-.44H15.75",
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Kickoff call to map audience, timeline, brand standards, distribution needs, and budget. We come back with a scoped plan, not a quote.", img: strategyImg },
  { num: "02", title: "Strategy & Selection", desc: "Curated product picks, decoration methods, packaging concepts, and a project timeline aligned to your launch date.", img: sourcingImg },
  { num: "03", title: "Design & Proofing", desc: "Mockups, color matching, and digital proofs reviewed against your brand standards. Nothing goes to production without sign-off.", img: designImg },
  { num: "04", title: "Production", desc: "Sourcing, decoration, and quality control across our vetted manufacturer network. Status tracked in one place.", img: productionImg },
  { num: "05", title: "Kitting & Distribution", desc: "Assembly, packaging, and direct-to-recipient shipping — to one location or thousands. We handle logistics so internal teams aren't chasing boxes.", img: kittingImg },
];

const programs = [
  { title: "Crew & Staff Apparel", desc: "Branded apparel systems for hourly, salaried, and field teams." },
  { title: "Onboarding Kits", desc: "Day-one welcome kits assembled and shipped to new hires." },
  { title: "Trade Show Kits", desc: "Booth-ready kits with apparel, giveaways, and premium swag." },
  { title: "Donor & Client Gifting", desc: "Curated, on-brand gift boxes for fundraising and account growth." },
  { title: "Awareness Campaigns", desc: "Cause-based programs with unified brand expression." },
  { title: "Recruiting Materials", desc: "Branded kits and giveaways for hiring events and university recruiting." },
  { title: "Leadership Gear", desc: "Premium executive apparel and gifting for leadership cohorts." },
  { title: "Multi-Site Distribution", desc: "Nationwide splits to clinics, sites, offices, and events." },
];

const faqs = [
  { q: "Do you have minimum order quantities?", a: "Most programs assume a real production run, but we right-size to your audience. For kitting and rollouts, we'll scope to fit your headcount, locations, or event size." },
  { q: "How long does a typical project take?", a: "Standard apparel orders run 3–4 weeks from sign-off. Custom kits and complex multi-location programs run 4–8 weeks. Rush is possible — call us if your timeline is tight." },
  { q: "Can you handle decoration and fulfillment together?", a: "Yes — that's the model. Strategy, sourcing, decoration, kitting, and distribution all live with one accountable team. No vendor handoffs." },
  { q: "What brands can you source?", a: "Premium brands including Carhartt, Nike, Patagonia, Yeti, FIGS, Stanley, Bella+Canvas, Next Level, Champion, Under Armour, plus 2,000+ vetted manufacturers and decorators." },
  { q: "Do you ship nationwide?", a: "Yes. Direct-to-employee, direct-to-jobsite, direct-to-venue, and multi-location splits anywhere in the U.S. — with tracked, on-time delivery." },
  { q: "How do we get started?", a: "Send a project inquiry or book a strategy call. The first conversation is scoped to your goal — no pricing pressure, no obligation." },
];

const industryImages: Record<string, string> = {
  healthcare: healthcareImg,
  construction: constructionImg,
  corporate: corporateImg,
  events: eventsImg,
};

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const PAGE_URL = "https://merchclub.replit.app/services";
  const PAGE_IMG = "https://merchclub.replit.app/opengraph.jpg";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": PAGE_URL,
      "url": PAGE_URL,
      "name": "Services — Merch Club",
      "description": "End-to-end branded merchandise services: strategy, design, sourcing, production, kitting, and nationwide distribution — handled by one accountable team.",
      "inLanguage": "en-US",
      "isPartOf": { "@type": "WebSite", "name": "Merch Club", "url": "https://merchclub.replit.app" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": PAGE_IMG },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Branded Merchandise Programs",
      "provider": { "@type": "Organization", "name": "Merch Club", "url": "https://merchclub.replit.app" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "serviceType": "Branded merchandise, custom apparel, kitting and fulfillment",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Merch Club Service Catalog",
        "itemListElement": capabilities.map((c) => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": c.title, "description": c.desc },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merchclub.replit.app/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": PAGE_URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black pb-20 lg:pb-0">
      <SEO
        title="Services — Merch Club"
        description="End-to-end branded merchandise services: strategy, design, sourcing, production, kitting, and nationwide distribution — one accountable team handling it all."
        path="/services"
        image={PAGE_IMG}
        imageAlt="Merch Club services overview"
        keywords="branded merchandise services, custom apparel programs, kitting and fulfillment, promotional product sourcing, corporate merch agency, decorated apparel, multi-location distribution"
        jsonLd={jsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>Merch Club Services</h1>
          <p>Strategy, design, sourcing, production, kitting, and distribution for branded merchandise programs — handled end-to-end by one accountable team.</p>
        </div>
      </noscript>

      <div className="hidden md:flex items-center justify-end gap-8 px-6 md:px-10 py-2 bg-[#222] border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em]">
        <a href="/" className="text-[#888] hover:text-white transition-colors">MerchClub</a>
        <span className="text-white/15">|</span>
        <a href="https://trybrandini.com/" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white transition-colors">Brandini</a>
        <span className="text-white/15">|</span>
        <a href="#" className="text-[#888] hover:text-white transition-colors">ScrubClub</a>
      </div>

      <header className="sticky top-0 z-40 bg-[#111]/95 backdrop-blur-md border-b border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/"><img src={logoSrc} alt="Merch Club" className="h-8 object-contain invert" /></Link>
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="text-[#a3a3a3] hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-[#a3a3a3] hover:text-white transition-colors">About</Link>
            <span className="text-white">Services</span>
            <IndustriesMegaMenu />
            <Link href="/case-studies" className="text-[#a3a3a3] hover:text-white transition-colors">Case Studies</Link>
            <Link href="/blog" className="text-[#a3a3a3] hover:text-white transition-colors">Learning Center</Link>
            <Link href="/contact" className="text-[#a3a3a3] hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+15317770347" className="hidden lg:flex items-center gap-2 text-xs text-[#a3a3a3] hover:text-white transition-colors font-medium tracking-wide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +1 531-777-0347
          </a>
          <button onClick={() => setProjectModalOpen(true)} className="hidden lg:inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
            Start a Project
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />}
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[105px] z-30 bg-[#111] px-6 py-8 flex flex-col gap-6">
          <Link href="/" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <span className="text-lg font-bold text-white">Services</span>
          <Link href="/industries" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
          <Link href="/case-studies" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
          <Link href="/blog" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>Learning Center</Link>
          <Link href="/contact" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}

      <section className="relative bg-[#0a0a0a] text-white pt-20 md:pt-28 pb-16 md:pb-24 px-8 md:px-16 lg:px-20 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <img src={heroImg} alt="" className="w-full h-full object-cover" style={{ filter: "blur(8px) grayscale(100%)" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/40" />
        <div className="relative max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} theme="dark" className="mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">What We Do</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                End-to-End Merch.<br /><span className="text-[#888]">Handled.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-md">
                Strategy, design, sourcing, production, kitting, and distribution — six capabilities, one accountable team, no vendor handoffs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-gray-200 transition-colors">
                  Start a Project
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </button>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-white/10 transition-colors">
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-3 px-0 overflow-hidden border-b border-black/10">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 mx-6">
              {["Strategy","Design","Sourcing","Production","Kitting","Distribution","Apparel","Giveaways"].map((word, j) => (
                <span key={j} className="flex items-center gap-6">
                  <span className="text-sm md:text-base font-black uppercase tracking-[0.15em] text-black/80" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem" }}>{word}</span>
                  <img src={cloverImg} alt="" className="h-4 w-4 opacity-30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
            <div className="lg:col-span-5">
              <RevealItem>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Six Capabilities</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  One team.<br /><span className="text-[#888]">All of it.</span>
                </h2>
              </RevealItem>
            </div>
            <div className="lg:col-span-7 lg:pt-3">
              <RevealItem delay={100}>
                <p className="text-base md:text-lg text-[#666] leading-relaxed">
                  Most agencies hand you off — design to one vendor, sourcing to another, fulfillment to a third. Merch Club replaces that chain with one accountable team that owns the full stack from kickoff to last-mile delivery.
                </p>
              </RevealItem>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <RevealItem key={cap.title} delay={i * 80}>
                <div className="group relative bg-white border border-black/10 rounded-2xl overflow-hidden hover:border-black/40 transition-colors h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
                    <img src={cap.img} alt={cap.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                      <span className="text-black/40">0{i + 1}</span>
                      <span>{cap.short}</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={cap.icon} /></svg>
                      </div>
                      <h3 className="text-2xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>
                        {cap.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#666] leading-relaxed mb-5">{cap.desc}</p>
                    <ul className="mt-auto grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {cap.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-1.5 text-[12px] text-[#555]">
                          <svg className="w-3 h-3 text-black/40 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] text-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
            <div className="lg:col-span-5">
              <RevealItem>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">How We Work</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  A process built<br /><span className="text-[#888]">for execution.</span>
                </h2>
              </RevealItem>
            </div>
            <div className="lg:col-span-7 lg:pt-3">
              <RevealItem delay={100}>
                <p className="text-base md:text-lg text-[#aaa] leading-relaxed">
                  Five stages, one timeline, one team. Every project follows the same disciplined sequence — so you know what's happening, when it's happening, and who owns it.
                </p>
              </RevealItem>
            </div>
          </div>

          <div className="space-y-3">
            {processSteps.map((step, i) => (
              <RevealItem key={step.num} delay={i * 80}>
                <div className="grid grid-cols-12 gap-4 md:gap-6 items-center py-5 md:py-6 border-t border-white/10 group hover:bg-white/[0.02] transition-colors -mx-4 md:-mx-6 px-4 md:px-6 rounded-xl">
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-3xl md:text-5xl font-black text-white/30 group-hover:text-white transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
                  </div>
                  <div className="hidden md:block col-span-2 lg:col-span-2">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#1a1a1a] ring-1 ring-white/10">
                      <img src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                    </div>
                  </div>
                  <div className="col-span-10 md:col-span-2 lg:col-span-2">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>{step.title}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-6 lg:col-span-6">
                    <p className="text-sm md:text-base text-[#999] leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="hidden lg:flex col-span-1 justify-end items-center text-white/20 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Programs We Build</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              From a single kit<br /><span className="text-[#888]">to a national rollout.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-16 leading-relaxed">
              Our services compose into recurring programs and one-off campaigns. Same team, same process, scaled to fit.
            </p>
          </RevealItem>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10 rounded-2xl overflow-hidden">
            {programs.map((p, i) => (
              <RevealItem key={p.title} delay={i * 50}>
                <div className="bg-white p-6 md:p-7 h-full hover:bg-[#fafafa] transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaa]">0{i + 1}</span>
                    <span className="flex-1 h-px bg-black/10" />
                  </div>
                  <h3 className="text-lg font-black text-black tracking-tight leading-snug mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em", fontSize: "1.4rem" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed">{p.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-0 border-b border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
          {[
            { img: editorialImg1, label: "Kitting Floor", caption: "Built-to-spec packs assembled in-house." },
            { img: editorialImg2, label: "Decoration", caption: "Embroidery, screen print, DTG, and more." },
            { img: editorialImg3, label: "Distribution", caption: "Direct-to-recipient — anywhere in the U.S." },
          ].map((item, i) => (
            <div key={i} className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-[#0a0a0a] group">
              <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 block mb-3">0{i + 1} — {item.label}</span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.caption}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0a0a0a] text-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Built for Industry</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Industry-specific<br /><span className="text-[#888]">execution.</span>
              </h2>
              <p className="mt-5 text-base md:text-lg text-[#aaa] leading-relaxed">
                Our process adapts to the realities of your industry — compliance, distribution, audience, and the moments that matter.
              </p>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.filter((i) => i.status === "live").map((ind, i) => (
              <RevealItem key={ind.slug} delay={i * 100}>
                <Link href={ind.href} className="group relative block rounded-2xl overflow-hidden bg-[#141414] aspect-[3/4] hover:ring-2 hover:ring-white transition-all">
                  <img src={industryImages[ind.slug]} alt={ind.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/0" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 block mb-2">{ind.tagline}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>{ind.name}</h3>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white opacity-80 group-hover:opacity-100 group-hover:gap-2.5 transition-all">
                      Explore Program
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <RevealItem>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Why It Works</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Less coordinating.<br /><span className="text-[#888]">More executing.</span>
              </h2>
              <p className="text-base md:text-lg text-[#666] leading-relaxed mb-8">
                Most teams burn weeks routing approvals between vendors. We replace that with a single point of accountability, structured timelines, and a quality bar that holds across every run.
              </p>
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-[#222] transition-colors">
                Start a Project
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </button>
            </RevealItem>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-px bg-black/10 border border-black/10 rounded-2xl overflow-hidden">
              {[
                { value: 2000, suffix: "+", label: "Vetted suppliers in our manufacturer network" },
                { value: 100, suffix: "%", label: "On-time delivery across active programs" },
                { value: 48, suffix: "", label: "States reached with direct fulfillment" },
                { value: 1, suffix: "", label: "Accountable team — start to finish" },
              ].map((s, i) => (
                <RevealItem key={i} delay={i * 100}>
                  <div className="bg-white p-7 md:p-9 h-full">
                    <div className="text-5xl md:text-6xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      <CountUp end={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-4 text-xs md:text-sm text-[#666] leading-relaxed">{s.label}</p>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-16 md:py-20 px-8 md:px-16 lg:px-20 border-b border-black/10">
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

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealItem>
            <img src={cloverImg} alt="" className="h-12 mx-auto mb-6 opacity-40" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Ready to put<br /><span className="text-[#888]">us to work?</span>
            </h2>
            <p className="text-base text-[#888] leading-relaxed mb-8 max-w-lg mx-auto">
              Tell us what you're building. We'll come back with a scoped plan, a timeline, and a real conversation — not a pitch.
            </p>
          </RevealItem>
          <RevealItem delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-black text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors">
                Start a Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </button>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 text-white text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
                Book a Call
              </Link>
            </div>
          </RevealItem>
        </div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <img src={logoSrc} alt="Merch Club" className="h-10 w-auto mb-6 brightness-0 invert" />
              <p className="text-sm text-[#666] leading-relaxed mb-6 max-w-sm">
                Full-service branded apparel and merchandise for teams that demand quality, consistency, and execution under pressure.
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
                {capabilities.map((c) => (
                  <li key={c.title}><Link href="/services" className="text-sm text-[#666] hover:text-white transition-colors">{c.title}</Link></li>
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
                  { label: "Construction", href: "/industries/construction" },
                  { label: "Corporate", href: "/industries/corporate" },
                  { label: "Trade Shows & Events", href: "/industries/events" },
                ].map((item) => (
                  <li key={item.label}><Link href={item.href} className="text-sm text-[#666] hover:text-white transition-colors">{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>Get Started</h4>
              <p className="text-xs text-[#666] mb-4 leading-relaxed">Ready to build something worth wearing? Let's talk.</p>
              <button onClick={() => setProjectModalOpen(true)} className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                Start a Project
              </button>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#444]">&copy; {new Date().getFullYear()} Merch Club. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
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
