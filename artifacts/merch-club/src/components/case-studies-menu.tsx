import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { caseStudies } from "@/lib/site-data";
import eventsThumb from "@assets/461191773_18297032593205370_5287082838877484901_n_1778693892844.jpg";

const thumbBySlug: Record<string, string> = {
  events: eventsThumb,
};

interface Props {
  active?: boolean;
  theme?: "dark" | "light";
}

export function CaseStudiesMenu({ active = false, theme = "dark" }: Props) {
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

  const triggerColor = theme === "dark"
    ? (active ? "text-white" : "text-[#a3a3a3] hover:text-white")
    : (active ? "text-black" : "text-black/70 hover:text-black");

  return (
    <>
      <Link
        ref={triggerRef}
        href="/case-studies"
        aria-haspopup="true"
        aria-expanded={open}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`inline-flex items-center gap-1.5 transition-colors ${triggerColor}`}
      >
        Case Studies
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
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-6 lg:py-7">
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999] block mb-2">Case Studies</span>
                <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>
                  Programs We've <span className="text-[#888]">Built.</span>
                </h3>
              </div>
              <Link href="/case-studies" className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 hover:text-black transition-colors whitespace-nowrap">
                View All
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {caseStudies.map((cs) => {
                const thumb = thumbBySlug[cs.slug] ?? cs.image;
                return (
                  <Link
                    key={cs.slug}
                    href={`/case-studies/${cs.slug}`}
                    aria-label={`Read the ${cs.client} case study: ${cs.title}`}
                    className="group relative block rounded-xl overflow-hidden bg-[#0a0a0a] aspect-[16/9] hover:ring-2 hover:ring-black transition-all"
                  >
                    <img
                      src={thumb}
                      alt={cs.client}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 block mb-1">{cs.industry} · {cs.client}</span>
                      <div className="flex items-end justify-between gap-2">
                        <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>
                          {cs.title}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white opacity-80 group-hover:opacity-100 group-hover:gap-1.5 transition-all whitespace-nowrap shrink-0">
                          Read
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
