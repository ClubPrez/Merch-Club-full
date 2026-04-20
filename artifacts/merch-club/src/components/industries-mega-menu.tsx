import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { industries } from "@/lib/site-data";
import healthcareImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776181322914.png";
import constructionImg from "@assets/Casual_style_with_Carhartt_jacket_1775772661826.png";
import corporateImg from "@assets/Professional_promotional_packaging_shot_1776180821018.png";

interface Props {
  active?: boolean;
  theme?: "dark" | "light";
}

const industryImages: Record<string, string> = {
  healthcare: healthcareImg,
  construction: constructionImg,
  corporate: corporateImg,
};

export function IndustriesMegaMenu({ active = false, theme = "dark" }: Props) {
  const [open, setOpen] = useState(false);
  const [topPx, setTopPx] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const header = el.closest("header");
    const rect = (header ?? el).getBoundingClientRect();
    setTopPx(rect.bottom);
  };

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    updatePosition();
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onResize = () => { if (open) updatePosition(); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [open]);

  const live = industries.filter((i) => i.status === "live");
  const upcoming = industries.filter((i) => i.status !== "live");
  const featured = live[0];

  const triggerColor = theme === "dark"
    ? (active ? "text-white" : "text-[#a3a3a3] hover:text-white")
    : (active ? "text-black" : "text-black/70 hover:text-black");

  return (
    <>
      <Link
        ref={triggerRef}
        href="/industries"
        aria-haspopup="true"
        aria-expanded={open}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`inline-flex items-center gap-1.5 transition-colors ${triggerColor}`}
      >
        Industries
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </Link>

      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-200 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1 pointer-events-none"
        }`}
        style={{ top: topPx }}
        role="menu"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="bg-white shadow-2xl border-t border-black/[0.06]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            <div className="lg:col-span-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-5">Industries We Serve</span>
              <ul className="space-y-1">
                {live.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={ind.href}
                      className="group flex items-center gap-3 py-2.5 -mx-2 px-2 rounded-lg hover:bg-black/[0.03] transition-colors"
                      aria-label={`Visit ${ind.name} industry page`}
                    >
                      <span className="flex-shrink-0 w-9 h-9 rounded-md overflow-hidden bg-[#f0f0f0]">
                        {industryImages[ind.slug] && (
                          <img src={industryImages[ind.slug]} alt="" className="w-full h-full object-cover" />
                        )}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-bold text-black leading-tight">{ind.name}</span>
                        <span className="block text-[11px] text-[#888] leading-tight mt-0.5 truncate">{ind.tagline}</span>
                      </span>
                      <svg className="w-3.5 h-3.5 text-black/20 group-hover:text-black group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-black/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-3">Coming Soon</span>
                <ul className="space-y-2">
                  {upcoming.map((ind) => (
                    <li key={ind.slug}>
                      <Link
                        href={ind.href}
                        className="group flex items-center gap-2 text-xs text-[#666] hover:text-black transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-black/20 group-hover:bg-black transition-colors" />
                        <span>{ind.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-5">Programs & Capabilities</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  "Crew & Staff Apparel",
                  "Leadership Gear",
                  "Onboarding Kits",
                  "Trade Show Kits",
                  "Donor & Client Gifting",
                  "Awareness Campaigns",
                  "Recruiting Materials",
                  "Multi-Site Distribution",
                ].map((item) => (
                  <li key={item}>
                    <a href="/#services" className="group flex items-center gap-2 text-sm text-[#444] hover:text-black transition-colors py-1">
                      <span className="text-black/30 group-hover:text-black transition-colors text-base leading-none">+</span>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-black/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-3">From the Learning Center</span>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/blog/merch-program-strategy" className="group flex items-center gap-2 text-sm text-[#444] hover:text-black transition-colors">
                      <span>Building a Strategic Merch Program</span>
                      <svg className="w-3 h-3 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="group flex items-center gap-2 text-sm text-[#444] hover:text-black transition-colors">
                      <span>Browse Client Case Studies</span>
                      <svg className="w-3 h-3 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {featured && (
              <div className="lg:col-span-5">
                <Link href={featured.href} className="group block relative rounded-2xl overflow-hidden bg-[#0a0a0a] aspect-[16/10] lg:aspect-auto lg:h-full min-h-[340px]">
                  <img
                    src={industryImages[featured.slug]}
                    alt={featured.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      Featured Industry
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 block mb-2">{featured.tagline}</span>
                    <h3 className="text-3xl md:text-4xl font-black text-white leading-[0.95] tracking-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {featured.name} Merch<br /><span className="text-white/60">Programs.</span>
                    </h3>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white group-hover:gap-3 transition-all">
                      Explore Program
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-black/[0.06] bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between gap-4">
              <p className="text-xs text-[#666]">
                Don't see your industry? We build programs for organizations of every shape.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/industries"
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/70 hover:text-black transition-colors"
                >
                  Browse All
                </Link>
                <a
                  href="tel:+15317770347"
                  className="inline-flex items-center gap-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full hover:bg-[#222] transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Talk to Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
