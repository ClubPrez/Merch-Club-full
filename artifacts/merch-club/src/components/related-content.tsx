import { Link } from "wouter";

export interface RelatedItem {
  href: string;
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
  image?: string;
  cta?: string;
}

interface RelatedContentProps {
  heading?: string;
  eyebrow?: string;
  items: RelatedItem[];
  theme?: "light" | "dark";
  className?: string;
}

export default function RelatedContent({
  heading = "Keep Reading",
  eyebrow = "Related",
  items,
  theme = "light",
  className = "",
}: RelatedContentProps) {
  if (items.length === 0) return null;
  const isDark = theme === "dark";
  const sectionBg = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const headingColor = isDark ? "text-white" : "text-black";
  const eyebrowColor = isDark ? "text-[#888]" : "text-[#888]";
  const cardBg = isDark ? "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20" : "bg-[#f5f5f5] hover:bg-[#eeeeee] border-black/5 hover:border-black/10";
  const cardEyebrow = isDark ? "text-white/60" : "text-[#888]";
  const cardTitle = isDark ? "text-white" : "text-black";
  const cardDesc = isDark ? "text-white/70" : "text-[#555]";
  const cardMeta = isDark ? "text-white/40" : "text-[#999]";

  return (
    <section className={`${sectionBg} py-20 md:py-24 px-8 md:px-16 lg:px-20 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${eyebrowColor} block mb-3`}>{eyebrow}</span>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] ${headingColor}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {heading}
            </h2>
          </div>
        </div>
        <div className={`grid grid-cols-1 ${items.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-5 md:gap-6`}>
          {items.map((item) => {
            const ctaLabel = item.cta || `Read more about ${item.title}`;
            return (
              <Link key={item.href} href={item.href} aria-label={ctaLabel} className={`group block rounded-2xl border ${cardBg} p-6 md:p-7 transition-all hover:-translate-y-1`}>
                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${cardEyebrow} block mb-3`}>{item.eyebrow}</span>
                <h3 className={`text-xl md:text-2xl font-black ${cardTitle} mb-3 leading-[1.05] tracking-tight`} style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.005em" }}>
                  {item.title}
                </h3>
                {item.description && (
                  <p className={`text-sm ${cardDesc} leading-relaxed mb-4 line-clamp-3`}>{item.description}</p>
                )}
                <div className="flex items-center justify-between mt-auto gap-3">
                  {item.meta && <span className={`text-[11px] uppercase tracking-[0.15em] ${cardMeta}`}>{item.meta}</span>}
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] ${cardTitle} ml-auto text-right`}>
                    {ctaLabel}
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
