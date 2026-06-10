import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { industries } from "@/lib/site-data";
import healthcareImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776181322914.png";
import constructionImg from "@assets/Casual_style_with_Carhartt_jacket_1775772661826.png";
import corporateImg from "@assets/Professional_promotional_packaging_shot_1776180821018.png";
import eventsImg from "@assets/Sporty_style_by_the_door_1776180821016.png";

interface Props {
  active?: boolean;
  theme?: "dark" | "light";
}

const industryImages: Record<string, string> = {
  healthcare: healthcareImg,
  construction: constructionImg,
  corporate: corporateImg,
  events: eventsImg,
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
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-6 lg:py-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

            <div className="lg:col-span-8">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-2">Industries We Serve</span>
                  <h3 className="text-xl md:text-2xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>
                    Programs Built for <span className="text-[#888]">Your Industry.</span>
                  </h3>
                </div>
                <Link href="/industries" onClick={() => setOpen(false)} className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 hover:text-black transition-colors whitespace-nowrap">
                  View All
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {live.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={ind.href}
                    aria-label={`Visit ${ind.name} industry page`}
                    className="group relative block rounded-xl overflow-hidden bg-[#0a0a0a] aspect-[16/7] hover:ring-2 hover:ring-black transition-all"
                  >
                    {industryImages[ind.slug] && (
                      <img
                        src={industryImages[ind.slug]}
                        alt={ind.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 block mb-1">{ind.tagline}</span>
                      <div className="flex items-end justify-between gap-2">
                        <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>
                          {ind.name}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white opacity-80 group-hover:opacity-100 group-hover:gap-1.5 transition-all whitespace-nowrap">
                          Explore
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {upcoming.length > 0 && (
                <div className="mt-3 pt-3 border-t border-black/10 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999]">Coming Soon</span>
                  {upcoming.map((ind, i) => (
                    <span key={ind.slug} className="flex items-center gap-3">
                      <Link href={ind.href} className="text-xs text-[#666] hover:text-black transition-colors">{ind.name}</Link>
                      {i < upcoming.length - 1 && <span className="text-black/15">·</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-black/[0.08] lg:pl-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-3">Programs & Capabilities</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-1">
                {[
                  { label: "Crew & Staff Apparel", href: "/case-studies/construction" },
                  { label: "Leadership Gear", href: "/case-studies/access-bank" },
                  { label: "Onboarding Kits", href: "/case-studies/construction" },
                  { label: "Trade Show Kits", href: "/case-studies/events" },
                  { label: "Donor & Client Gifting", href: "/case-studies/access-bank" },
                  { label: "Awareness Campaigns", href: "/case-studies/nurse-gifting" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="group flex items-center gap-2 text-sm text-[#444] hover:text-black transition-colors py-1">
                      <span className="text-black/30 group-hover:text-black transition-colors text-base leading-none">+</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-black/10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-2">Resources</span>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/blog/merch-program-strategy" className="group flex items-center justify-between gap-2 text-sm text-[#444] hover:text-black transition-colors">
                      <span>Building a Strategic Merch Program</span>
                      <svg className="w-3 h-3 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="group flex items-center justify-between gap-2 text-sm text-[#444] hover:text-black transition-colors">
                      <span>Client Case Studies</span>
                      <svg className="w-3 h-3 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-black/[0.06] bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between gap-4">
              <p className="text-xs text-[#666]">
                Don't see your industry? We build programs for organizations of every shape.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/industries"
                  onClick={() => setOpen(false)}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/70 hover:text-black transition-colors"
                >
                  Browse All
                </Link>
                <a
                  href="tel:+15317770347"
                  className="inline-flex items-center gap-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full hover:bg-[#222] transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01" />
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
