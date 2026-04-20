import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { industries } from "@/lib/site-data";

interface Props {
  active?: boolean;
  theme?: "dark" | "light";
}

export function IndustriesMegaMenu({ active = false, theme = "dark" }: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const live = industries.filter((i) => i.status === "live");
  const upcoming = industries.filter((i) => i.status !== "live");

  const triggerColor = theme === "dark"
    ? (active ? "text-white" : "text-[#a3a3a3] hover:text-white")
    : (active ? "text-black" : "text-black/70 hover:text-black");

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href="/industries"
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 transition-colors ${triggerColor}`}
      >
        Industries
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </Link>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 transition-all duration-200 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        }`}
        role="menu"
      >
        <div className="w-[640px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 p-6 md:p-7">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">Live Industry Pages</span>
                <Link href="/industries" className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/60 hover:text-black inline-flex items-center gap-1">
                  View all
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {live.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={ind.href}
                    className="group block rounded-xl border border-black/5 hover:border-black/15 bg-[#fafafa] hover:bg-white p-4 transition-all"
                    aria-label={`Visit ${ind.name} industry page`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3
                        className="text-lg font-black text-black leading-tight"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}
                      >
                        {ind.name}
                      </h3>
                      <svg className="w-4 h-4 text-black/30 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                    <p className="text-xs text-[#666] leading-relaxed">{ind.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-6 md:p-7 text-white flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-3">Coming Soon</span>
              <ul className="space-y-2.5 flex-1">
                {upcoming.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={ind.href}
                      className="text-sm font-medium text-white/80 hover:text-white transition-colors inline-flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      {ind.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/industries"
                className="mt-5 inline-flex items-center justify-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                Browse All Industries
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
