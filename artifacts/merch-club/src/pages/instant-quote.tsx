import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StartProjectModal } from "@/components/start-project-modal";
import { Skeleton } from "@/components/ui/skeleton";

interface PublicProduct {
  id: number | string | null;
  spc: string | null;
  name: string | null;
  category: string | null;
  description: string | null;
  priceRange: string | null;
  thumb: string | null;
}

const QUICK_TAGS = ["Mugs", "Hoodies", "Totes", "Pens", "Drinkware", "Bags"];
const PAGE_SIZE = 24;

function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealItem({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function hiResThumb(url: string | null): string | null {
  if (!url) return null;
  return url.replace(/RS=\d+/, "RS=600");
}

function formatFromPrice(priceRange: string | null): string | null {
  if (!priceRange) return null;
  const low = parseFloat(priceRange.trim().split(/\s*[-–—]\s*/)[0]);
  if (isNaN(low)) return null;
  return `From $${low.toFixed(2)}`;
}

function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full aspect-[4/5] rounded-xl mb-4" />
      <div className="px-0.5 space-y-2">
        <Skeleton className="h-3.5 w-4/5 rounded" />
        <Skeleton className="h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}

function NoImagePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg className="w-8 h-8 text-black/15" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </div>
  );
}

function ProductCard({ product, onQuote }: { product: PublicProduct; onQuote: (p: PublicProduct) => void }) {
  const [imgError, setImgError] = useState(false);
  const fromPrice = formatFromPrice(product.priceRange);
  const thumbSrc = hiResThumb(product.thumb);

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onQuote(product)}
    >
      {/* Image tile */}
      <div className="relative w-full aspect-[4/5] bg-[#F4F2EF] rounded-xl overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)]">
        {thumbSrc && !imgError ? (
          <img
            src={thumbSrc}
            alt={product.name ?? "Product"}
            className="w-full h-full object-contain p-5"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <NoImagePlaceholder />
        )}

        {/* Desktop: CTA pill fades in at bottom of tile on hover */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-0 pb-4 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-black/90 text-white text-[9px] font-bold uppercase tracking-[0.18em] px-5 py-2.5 rounded-full">
            Get Instant Quote
          </span>
        </div>
      </div>

      {/* Text block */}
      <div className="mt-3.5 px-0.5">
        <h3 className="text-[13px] font-medium text-black leading-snug line-clamp-2">
          {product.name ?? "Unnamed Product"}
        </h3>
        {fromPrice && (
          <p className="mt-1 text-[12px] text-[#999]">{fromPrice}</p>
        )}

        {/* Mobile: always-visible text CTA */}
        <button
          className="sm:hidden mt-2.5 text-[11px] font-medium text-black underline underline-offset-2 active:text-[#555] transition-colors"
          onClick={(e) => { e.stopPropagation(); onQuote(product); }}
        >
          Get Instant Quote →
        </button>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <span
      className="inline-block w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent"
      style={{ animation: "spin 0.6s linear infinite" }}
    />
  );
}

export default function InstantQuote() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const runSearch = useCallback(async (query: string, pageNum: number, append: boolean) => {
    if (!query.trim()) return;
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setProducts([]);
      setError(null);
    }

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), page: pageNum }),
      });

      const data = (await res.json()) as { ok: boolean; products?: PublicProduct[]; message?: string };

      if (!data.ok) {
        setError(data.message ?? "The search could not be completed. Please try again.");
        if (!append) setProducts([]);
        setHasMore(false);
        return;
      }

      const incoming = data.products ?? [];
      setProducts((prev) => (append ? [...prev, ...incoming] : incoming));
      setHasMore(incoming.length >= PAGE_SIZE);
      setCurrentPage(pageNum);
      setHasSearched(true);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      if (!append) setProducts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const handleSubmit = useCallback((chipQuery?: string) => {
    const query = chipQuery ?? inputValue;
    if (!query.trim()) return;
    if (chipQuery) setInputValue(chipQuery);
    setActiveQuery(query.trim());
    setHasSearched(false);
    setHasMore(false);
    runSearch(query.trim(), 1, false);
  }, [inputValue, runSearch]);

  const handleLoadMore = useCallback(() => {
    runSearch(activeQuery, currentPage + 1, true);
  }, [activeQuery, currentPage, runSearch]);

  const handleQuote = useCallback((product: PublicProduct) => {
    // TODO: open quote modal with this product (wire up in next prompt)
    console.log("Get Instant Quote clicked for product id:", product.id);
  }, []);

  const showGrid = !loading && products.length > 0;
  const showEmpty = !loading && hasSearched && products.length === 0 && !error;
  const showInitial = !hasSearched && !loading && !error;

  return (
    <div className="min-h-screen bg-white text-black pb-20 lg:pb-0">
      <SEO
        title="Instant Quote — Merch Club"
        description="Search our vetted merch catalog and get instant pricing. Mugs, hoodies, totes, pens, drinkware, bags, and more — accurate price breaks in minutes."
        path="/instant-quote"
        keywords="instant merch quote, custom merch pricing, branded merchandise catalog, bulk order pricing, custom hoodies quote, branded mugs wholesale"
      />

      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />
      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />

      {/* ─── HERO SEARCH ─── */}
      <section className="bg-[#0a0a0a] text-white pt-20 md:pt-28 pb-12 px-6 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Catalog Search</span>
          </div>

          <h1
            className="text-7xl sm:text-8xl md:text-[9rem] lg:text-[10rem] font-black tracking-tight leading-[0.88] text-white mb-5"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Instant Quote.
          </h1>

          <p className="text-base md:text-lg text-[#888] leading-relaxed mb-10 max-w-xl mx-auto">
            Search our vetted catalog, upload your art, get pricing in minutes.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
              placeholder="Search products — mugs, hoodies, totes…"
              className="w-full rounded-2xl px-6 py-5 pr-36 text-base text-white placeholder-white/25 focus:outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              onFocus={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; }}
              onBlur={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.18em] px-5 py-3 rounded-xl hover:bg-[#e8e8e8] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
            >
              {loading && !loadingMore ? "Searching…" : "Search"}
            </button>
          </div>

          {/* Quick-tag chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSubmit(tag)}
                disabled={loading}
                className="text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full text-white/50 transition-all duration-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ border: "1px solid rgba(255,255,255,0.13)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)"; }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Curated-network note */}
          <p className="mt-6 text-[12px] text-[#555] leading-relaxed">
            You're browsing our vetted network — lines we trust on quality and speed.{" "}
            Need something you don't see? We'll source it.{" "}
            <Link
              href="/contact"
              className="text-[#777] underline underline-offset-2 hover:text-[#bbb] transition-colors"
            >
              Just ask.
            </Link>
          </p>
        </div>
      </section>

      {/* ─── RESULTS AREA ─── */}
      <section className="bg-white min-h-[60vh] px-6 md:px-16 lg:px-20 py-14 md:py-20">
        <div className="max-w-7xl mx-auto">

          {/* Loading skeletons (first page) */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <RevealItem className="flex flex-col items-center justify-center text-center py-24 gap-3">
              <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-1">
                <svg className="w-6 h-6 text-black/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Search unavailable.
              </h2>
              <p className="text-sm text-[#777] max-w-sm leading-relaxed">{error}</p>
              <button
                onClick={() => handleSubmit()}
                className="mt-1 text-[11px] font-bold uppercase tracking-widest text-black underline underline-offset-4 hover:text-[#555] transition-colors"
              >
                Try again
              </button>
            </RevealItem>
          )}

          {/* Empty state */}
          {showEmpty && (
            <RevealItem className="flex flex-col items-center justify-center text-center py-24 gap-3">
              <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-1">
                <svg className="w-6 h-6 text-black/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                No matches in our vetted network.
              </h2>
              <p className="text-sm text-[#777] max-w-sm leading-relaxed">
                Tell us what you're after and we'll source it.{" "}
                <Link href="/contact" className="text-black font-semibold underline underline-offset-2 hover:text-[#555] transition-colors">
                  Get in touch →
                </Link>
              </p>
            </RevealItem>
          )}

          {/* Initial (pre-search) prompt */}
          {showInitial && (
            <div className="flex flex-col items-center justify-center text-center py-24 gap-3">
              <div className="w-14 h-14 rounded-full bg-black/4 flex items-center justify-center mb-1">
                <svg className="w-6 h-6 text-black/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
                </svg>
              </div>
              <p className="text-sm text-[#bbb] max-w-xs leading-relaxed">
                Search above to browse the catalog, or tap a category to jump straight in.
              </p>
            </div>
          )}

          {/* Results grid */}
          {showGrid && (
            <>
              <RevealItem className="mb-7 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#aaa]">
                  {products.length} result{products.length !== 1 ? "s" : ""} for &ldquo;{activeQuery}&rdquo;
                </p>
              </RevealItem>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {products.map((product, i) => (
                  <RevealItem key={String(product.id ?? i)} delay={Math.min(i % 3, 2) * 60}>
                    <ProductCard product={product} onQuote={handleQuote} />
                  </RevealItem>
                ))}
              </div>

              {/* Load-more skeletons (appended rows) */}
              {loadingMore && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 mt-10">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ProductCardSkeleton key={`more-${i}`} />
                  ))}
                </div>
              )}

              {/* Load more button */}
              {hasMore && !loadingMore && (
                <RevealItem className="mt-12 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 border border-black/20 text-black text-[10px] font-bold uppercase tracking-[0.18em] px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-250"
                  >
                    Load More
                  </button>
                </RevealItem>
              )}

              {/* Loading-more inline indicator (shows while skeletons aren't visible) */}
              {loadingMore && (
                <div className="mt-8 flex justify-center">
                  <span className="inline-flex items-center gap-2 text-[11px] text-[#aaa]">
                    <LoadingSpinner />
                    Loading more…
                  </span>
                </div>
              )}

              {/* End of results */}
              {!hasMore && !loadingMore && hasSearched && (
                <RevealItem className="mt-12 text-center">
                  <p className="text-[11px] text-[#bbb] font-medium">
                    That's everything in our network for &ldquo;{activeQuery}&rdquo;.{" "}
                    <Link href="/contact" className="text-[#888] underline underline-offset-2 hover:text-black transition-colors">
                      Need something else?
                    </Link>
                  </p>
                </RevealItem>
              )}
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
