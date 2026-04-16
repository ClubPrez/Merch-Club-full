import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import { StartProjectModal } from "@/components/start-project-modal";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import heroImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776180821018.png";
import bagImg from "@assets/Sporty_style_by_the_door_1776180821016.png";
import packagingImg from "@assets/Professional_promotional_packaging_shot_1776180821018.png";
import kittingImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1776180821018.png";
import nursesWeekImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_08_AM_1776180821018.png";
import scrubsModelImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776181322914.png";
import tumblerImg from "@assets/ChatGPT_Image_Apr_16,_2026,_02_19_38_PM_1776376559711.png";

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

const services = [
  {
    title: "Internal Apparel Systems",
    desc: "Branded apparel programs for clinical staff, administrative teams, and leadership. Durable. Consistent. Easy to reorder. Built to scale across departments and facilities.",
    icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z",
  },
  {
    title: "Recruitment & Onboarding Kits",
    desc: "New-hire kits that reinforce culture without losing professionalism. Apparel, printed materials, and welcome items that feel cohesive and well considered.",
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
  },
  {
    title: "Awareness & Community Initiatives",
    desc: "Breast cancer awareness activations. Screening campaigns. Community health events. We coordinate products, packaging, and distribution so the message lands clearly.",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  },
  {
    title: "Gifting & Donor Programs",
    desc: "Premium gifting initiatives for board members, physicians, and donors. Thoughtful sourcing. Elevated presentation. Managed fulfillment.",
    icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z",
  },
];

const processSteps = [
  { num: "01", title: "Strategic Alignment", desc: "We align with marketing and operations leadership to define scope, timelines, brand standards, and distribution needs." },
  { num: "02", title: "Controlled Design & Proofing", desc: "Brand accuracy matters in healthcare. We manage the proofing process to maintain consistency across apparel, print, and packaging." },
  { num: "03", title: "Production Oversight", desc: "We source products intentionally. Decoration methods are selected based on durability, environment, and usage. Quality is monitored before anything ships." },
  { num: "04", title: "Fulfillment & Distribution", desc: "Kitting. Multi-location shipping. Department-level coordination. We manage logistics so internal teams aren't chasing boxes." },
];

const challenges = [
  "Maintaining brand consistency across departments.",
  "Managing apparel sizing for large clinical teams.",
  "Shipping to multiple facilities on tight timelines.",
  "Balancing professionalism with culture.",
  "Avoiding low-quality promotional products that undermine trust.",
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

export default function Healthcare() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="Healthcare Branded Merchandise Programs"
        description="We design and execute structured branded merchandise programs for hospitals, healthcare networks, specialty clinics, and medical organizations. Strategy through delivery."
        path="/industries/healthcare"
      />

      <div className="hidden md:flex items-center justify-end gap-8 px-6 md:px-10 py-2 bg-[#222] border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em]">
        <a href="/" className="text-[#888] hover:text-white transition-colors">MerchClub</a>
        <span className="text-white/15">|</span>
        <a href="https://trybrandini.com/" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white transition-colors">Brandini</a>
        <span className="text-white/15">|</span>
        <a href="#" className="text-[#888] hover:text-white transition-colors">ScrubClub</a>
      </div>

      <header className="sticky top-0 z-40 bg-[#111]/95 backdrop-blur-md border-b border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <img src={logoSrc} alt="Merch Club" className="h-8 object-contain invert" />
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="text-[#a3a3a3] hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-[#a3a3a3] hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="text-[#a3a3a3] hover:text-white transition-colors">Blog</Link>
            <a href="/#services" className="text-[#a3a3a3] hover:text-white transition-colors">Services</a>
            <span className="text-white">Industries</span>
            <a href="/#contact" className="text-[#a3a3a3] hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setProjectModalOpen(true)} className="hidden lg:inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
            Start a Project
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              }
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[105px] z-30 bg-[#111] px-6 py-8 flex flex-col gap-6">
          <Link href="/" className="text-lg font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/blog" className="text-lg font-bold text-[#888]" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <button onClick={() => { setMobileMenuOpen(false); setProjectModalOpen(true); }} className="mt-4 inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-bold px-6 py-3 rounded-full">
            Start a Project
          </button>
        </div>
      )}

      <section className="relative bg-white overflow-hidden border-b border-black/10">
        <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-20 pt-20 md:pt-28 pb-4 md:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-black" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Industry — Healthcare</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
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
                {videoPlaying ? (
                  <iframe
                    src="https://www.youtube.com/embed/nkQ50axsMxg?autoplay=1"
                    title="Merch Club Healthcare"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="group absolute inset-0 w-full h-full"
                    aria-label="Play video"
                  >
                    <img src={scrubsModelImg} alt="Healthcare branded apparel" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 md:w-12 md:h-12 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <div className="hidden md:flex absolute -top-4 -left-4 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-black text-white items-center justify-center text-[10px] font-bold uppercase tracking-[0.15em] text-center leading-tight p-3 -rotate-[8deg] shadow-xl">
                200+ Healthcare<br />Clients
              </div>
            </div>
          </div>
        </div>

        <div className="relative pb-10 overflow-hidden">
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

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4 text-center">The Standard</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-16 text-center max-w-5xl mx-auto" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Healthcare Isn't Casual.<br /><span className="text-[#888]">Your Brand Presence Shouldn't Be Either.</span>
            </h2>
          </RevealItem>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="lg:w-1/2">
              <RevealItem delay={100}>
                <p className="text-base md:text-lg text-[#aaa] leading-[1.8] mb-8">
                  <span className="float-left text-6xl md:text-7xl font-black text-white leading-[0.85] mr-3 mt-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>I</span>
                  n healthcare environments, <span className="text-white font-semibold">details matter</span>. Apparel needs to look professional. Materials need to hold up. Brand standards need to stay <span className="text-white font-semibold">consistent</span> across departments and locations.
                </p>
              </RevealItem>
              <RevealItem delay={150}>
                <div className="relative border-l-2 border-white/30 pl-6 py-2 my-8">
                  <p className="text-2xl md:text-3xl text-white font-black leading-[1.2] tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    You're not ordering swag.<br />
                    <span className="text-[#888]">You're reinforcing trust.</span>
                  </p>
                </div>
              </RevealItem>
              <RevealItem delay={200}>
                <p className="text-base md:text-lg text-[#ccc] leading-[1.8] mb-8">
                  Whether it's <span className="text-white font-semibold">staff apparel</span>, <span className="text-white font-semibold">awareness initiatives</span>, or <span className="text-white font-semibold">donor gifting</span>, branded merchandise in healthcare has to feel intentional and well-managed.
                </p>
              </RevealItem>
              <RevealItem delay={250}>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Staff Apparel", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" },
                    { label: "Awareness Initiatives", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
                    { label: "Donor Gifting", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
                    { label: "Branded Merchandise", icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" },
                    { label: "Nurses Week", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
                    { label: "Onboarding Kits", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
                  ].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-white/10 hover:border-white/20 transition-colors">
                      <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      {item.label}
                    </span>
                  ))}
                </div>
              </RevealItem>
            </div>
            <RevealItem delay={200} className="lg:w-1/2" direction="right">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={scrubsModelImg} alt="OneStaff branded scrubs" className="w-full h-[400px] md:h-[550px] object-cover object-top" />
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#666] block mb-4">What We Build</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              What We Build for<br /><span className="text-[#888]">Healthcare Teams.</span>
            </h2>
            <p className="text-base text-[#666] mb-16 max-w-xl">Every healthcare organization is different. The common thread is structure.</p>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <RevealItem key={i} delay={i * 120}>
                <div className="border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{s.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{s.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
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

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Case Studies</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-16" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Featured Healthcare<br /><span className="text-[#888]">Work.</span>
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
                  <p className="text-sm text-[#888] leading-relaxed">{study.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">In the Field</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A Look at the<br /><span className="text-[#888]">Work.</span>
            </h2>
            <p className="text-base text-[#888] mb-16 max-w-xl">Packaging, apparel, onboarding kits, and gifting programs built for healthcare teams.</p>
          </RevealItem>
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <RevealItem delay={0} className="col-span-12 md:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[320px] md:h-[460px]">
                <img src={packagingImg} alt="Prime Time Healthcare packaging" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealItem>
            <RevealItem delay={100} className="col-span-12 md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[320px] md:h-[460px]">
                <img src={tumblerImg} alt="Merch Club branded tumbler" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealItem>
            <RevealItem delay={150} className="col-span-12 md:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[280px] md:h-[400px]">
                <img src={bagImg} alt="OneStaff duffle bag" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealItem>
            <RevealItem delay={200} className="col-span-12 md:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[280px] md:h-[400px]">
                <img src={kittingImg} alt="OneStaff branded kitting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealItem>
            <RevealItem delay={250} className="col-span-12 md:col-span-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[280px] md:h-[400px]">
                <img src={nursesWeekImg} alt="OneStaff Nurses Week kits" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Our Process</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              How We Run Healthcare<br /><span className="text-[#888]">Merchandise Programs.</span>
            </h2>
            <p className="text-base text-[#888] mb-16 max-w-xl">You shouldn't have to manage five vendors to execute one initiative. Here's how we structure it.</p>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <RevealItem key={i} delay={i * 120}>
                <div className="relative">
                  <span className="text-7xl md:text-8xl font-black text-black/[0.04] absolute -top-6 -left-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
                  <div className="relative pt-8">
                    <h3 className="text-xl font-black text-black tracking-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{step.title}</h3>
                    <p className="text-sm text-[#888] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
          <RevealItem delay={500}>
            <p className="text-sm font-semibold text-black mt-16 border-t border-black/10 pt-8">Execution is structured from start to finish.</p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-1/2">
              <RevealItem>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#666] block mb-4">Challenges We Solve</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Healthcare Challenges<br /><span className="text-[#888]">We Help Solve.</span>
                </h2>
              </RevealItem>
              <RevealItem delay={100}>
                <p className="text-base text-[#888] leading-relaxed mb-8">
                  Most healthcare teams come to us because coordination is the real problem.
                </p>
              </RevealItem>
              <div className="space-y-4">
                {challenges.map((c, i) => (
                  <RevealItem key={i} delay={150 + i * 80}>
                    <div className="flex items-start gap-4 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <p className="text-sm text-[#ccc] leading-relaxed">{c}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
              <RevealItem delay={600}>
                <p className="text-sm font-semibold text-white mt-10">
                  Branded merchandise programs work when they're treated like operational systems, not one-off orders. That's the difference.
                </p>
              </RevealItem>
            </div>
            <RevealItem className="lg:w-1/2" delay={200} direction="right">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={heroImg} alt="OneStaff branded scrubs" className="w-full h-[500px] md:h-[700px] object-cover object-top" />
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4 text-center">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-black mb-16 text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Frequently Asked<br /><span className="text-[#888]">Questions.</span>
            </h2>
          </RevealItem>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <RevealItem key={i} delay={i * 80}>
                <div className="border border-black/10 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="text-sm md:text-base font-bold text-black leading-snug">{faq.q}</span>
                    <svg className={`w-5 h-5 text-[#888] shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-6" : "max-h-0"}`}>
                    <p className="text-sm text-[#888] leading-relaxed px-6">{faq.a}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

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
                  { label: "Blog", href: "/blog" },
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

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
