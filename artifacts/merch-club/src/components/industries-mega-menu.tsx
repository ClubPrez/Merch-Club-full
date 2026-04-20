import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { industries } from "@/lib/site-data";

interface Props {
  active?: boolean;
  theme?: "dark" | "light";
}

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
        <div className="bg-white shadow-2xl border-t border-black/10 border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] block mb-3">Industries</span>
              <h3 className="text-3xl md:text-4xl font-black text-black leading-[0.95] tracking-tight mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Branded Programs<br /><span className="text-[#888]">By Industry.</span>
              </h3>
              <p className="text-sm text-[#666] leading-relaxed mb-6">
                Structured merch programs built around how your industry actually operates — sourcing, decoration, and distribution included.
              </p>
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full hover:bg-[#222] transition-colors"
              >
                Browse All Industries
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">Live Industry Pages</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">{live.length} available</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {live.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={ind.href}
                    className="group block rounded-xl border border-black/10 hover:border-black bg-[#fafafa] hover:bg-white p-5 transition-all"
                    aria-label={`Visit ${ind.name} industry page`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4
                        className="text-xl font-black text-black leading-tight"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}
                      >
                        {ind.name}
                      </h4>
                      <svg className="w-4 h-4 text-black/30 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                    <p className="text-xs text-[#666] leading-relaxed mb-2">{ind.tagline}</p>
                    <p className="text-[11px] text-[#888] leading-relaxed line-clamp-2">{ind.who}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 lg:border-l lg:border-black/10 lg:pl-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Coming Soon</span>
              <ul className="space-y-3">
                {upcoming.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={ind.href}
                      className="group block"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="w-1 h-1 rounded-full bg-black/30 group-hover:bg-black transition-colors" />
                        <span className="text-sm font-bold text-black group-hover:text-black uppercase tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
                          {ind.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#888] leading-relaxed pl-3">{ind.tagline}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
