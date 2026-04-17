import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import RelatedContent, { type RelatedItem } from "@/components/related-content";
import { StartProjectModal } from "@/components/start-project-modal";
import { getCaseStudy, getRelatedCaseStudies } from "@/lib/site-data";
import { blogPosts } from "@/pages/blog";
import NotFound from "@/pages/not-found";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";

export default function CaseStudy() {
  const params = useParams<{ slug: string }>();
  const cs = getCaseStudy(params.slug);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!cs) return <NotFound />;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: cs.client, href: `/case-studies/${cs.slug}` },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.summary,
    datePublished: cs.date,
    author: { "@type": "Organization", name: "Merch Club" },
    publisher: {
      "@type": "Organization",
      name: "Merch Club",
      logo: { "@type": "ImageObject", url: "https://merchclub.replit.app/opengraph.jpg" },
    },
    mainEntityOfPage: `https://merchclub.replit.app/case-studies/${cs.slug}`,
    about: cs.industry,
  };

  const related = getRelatedCaseStudies(cs.slug, cs.industrySlug, 2).map((r) => ({
    href: `/case-studies/${r.slug}`,
    eyebrow: r.industry,
    title: r.title,
    description: r.summary,
    meta: r.readTime,
    cta: `Read the ${r.client} case study`,
  }));

  const relatedArticleItems: RelatedItem[] = (cs.relatedArticles || [])
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is (typeof blogPosts)[number] => Boolean(p))
    .map((p) => ({
      href: `/blog/${p.slug}`,
      eyebrow: p.tag,
      title: p.title,
      description: p.excerpt,
      meta: p.readTime,
      cta: `Read: ${p.title}`,
    }));

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title={cs.title}
        description={cs.summary}
        path={`/case-studies/${cs.slug}`}
        type="article"
        keywords={`${cs.industry.toLowerCase()} case study, ${cs.client}, branded merchandise case study, merch program results`}
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), articleJsonLd]}
      />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-[#111]/95 backdrop-blur-md py-3 shadow-xl" : "bg-[#0a0a0a] py-5 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/">
              <img src={logoSrc} alt="Merch Club" className="h-7 md:h-9 object-contain brightness-0 invert" />
            </Link>
            <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>
              <Link href="/case-studies" className="text-white">Case Studies</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Learning Center</Link>
            </nav>
          </div>
          <button onClick={() => setProjectModalOpen(true)} className="hidden lg:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
            Start a Project
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
          </button>
        </div>
      </header>

      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-8 md:px-16 lg:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-white text-black px-2.5 py-1 rounded-full">{cs.industry}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{cs.client}</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">{cs.date} · {cs.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {cs.title}
          </h1>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">{cs.summary}</p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-16 md:pb-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {cs.results.map((r) => (
            <div key={r.label} className="bg-white text-black rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{r.value}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Challenge</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            What They Were Up Against
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed">{cs.challenge}</p>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Approach</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            How We Built the Program
          </h2>
          <ol className="space-y-5">
            {cs.approach.map((step, i) => (
              <li key={i} className="flex gap-5 items-start">
                <span className="shrink-0 w-9 h-9 rounded-full bg-black text-white text-sm font-black flex items-center justify-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{i + 1}</span>
                <p className="text-base md:text-lg text-[#444] leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Outcome</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            What They Walked Away With
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">{cs.outcome}</p>
          <div className="border-t border-black/10 pt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-black text-white text-sm md:text-base font-bold px-7 py-3 rounded-full hover:bg-[#333] transition-colors">
              Start Your Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </button>
            {cs.industrySlug === "healthcare" && (
              <Link href="/industries/healthcare" className="inline-flex items-center gap-2 border border-black/15 text-black text-sm md:text-base font-bold px-7 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
                See Healthcare Programs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </Link>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <RelatedContent
          eyebrow="More Case Studies"
          heading="Other Programs We've Built"
          items={related}
          theme="light"
        />
      )}

      {relatedArticleItems.length > 0 && (
        <RelatedContent
          eyebrow="From the Learning Center"
          heading="Related Reading"
          items={relatedArticleItems}
          theme="dark"
        />
      )}

      <StartProjectModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
