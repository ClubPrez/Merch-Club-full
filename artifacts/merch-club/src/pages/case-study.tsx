import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import RelatedContent, { type RelatedItem } from "@/components/related-content";
import { StartProjectModal } from "@/components/start-project-modal";
import { getCaseStudy, getRelatedCaseStudies } from "@/lib/site-data";
import { blogPosts } from "@/pages/blog";
import NotFound from "@/pages/not-found";
import { SiteHeader } from "@/components/site-header";

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


<SiteHeader onStartProject={() => setProjectModalOpen(true)} />


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
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-black text-white text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-[#333] transition-colors">
              Start Your Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </button>
            {cs.industrySlug && cs.industry && (
              <Link href={`/industries/${cs.industrySlug}`} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-black/15 text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-black hover:text-white transition-colors">
                See {cs.industry} Programs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </Link>
            )}
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-black text-sm md:text-base font-bold px-2 py-3 hover:underline">
              All Case Studies
            </Link>
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

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
