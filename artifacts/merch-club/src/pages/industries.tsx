import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import RelatedContent from "@/components/related-content";
import { StartProjectModal } from "@/components/start-project-modal";
import { industries, caseStudies } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";

export default function Industries() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
  ];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries Served — Merch Club",
    description:
      "Merch Club builds branded merchandise programs for industries where brand consistency, compliance, and operational structure matter — healthcare, construction, corporate, and trade shows & events.",
    url: "https://merchclub.com/industries",
    hasPart: industries.map((i) => ({
      "@type": "WebPage",
      name: i.name,
      url: `https://merchclub.com${i.href}`,
      description: i.summary,
    })),
  };

  const relatedCaseStudies = caseStudies.slice(0, 5).map((c) => ({
    href: `/case-studies/${c.slug}`,
    eyebrow: c.industry,
    title: c.title,
    description: c.summary,
    meta: c.readTime,
    cta: `Read the ${c.client} case study`,
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SEO
        title="Industries We Serve"
        description="Branded merchandise programs built for healthcare, construction, corporate, and trade show & event teams that need brand consistency, compliance, and operational structure at scale."
        path="/industries"
        keywords="industries served, branded merchandise by industry, healthcare merch, construction merch, corporate merch, trade show merch, event merch"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), collectionJsonLd]}
      />


<SiteHeader onStartProject={() => setProjectModalOpen(true)} />


      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-8 md:px-16 lg:px-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-10" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#666] block mb-4">Industries Served</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-6 max-w-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Built For Industries Where <span className="text-[#888]">Brand Presence Matters.</span>
          </h1>
          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl">
            We run branded merchandise programs for organizations that can't afford to look inconsistent — healthcare networks, construction firms, multi-location corporates, and trade show & event teams. Every program is built around your brand standards, compliance requirements, and operating cadence.
          </p>
        </div>
      </section>

      <section className="bg-white text-black py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {industries.map((industry) => {
              const isLive = industry.status === "live";
              const Wrapper = isLive ? Link : "div";
              const wrapperProps = isLive ? { href: industry.href } : { id: industry.slug };
              return (
                <Wrapper key={industry.slug} {...(wrapperProps as any)} className={`group block rounded-2xl border border-black/10 bg-[#f7f7f7] hover:bg-white hover:border-black/30 transition-all p-7 md:p-9 ${isLive ? "hover:-translate-y-1 cursor-pointer" : ""}`}>
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#888]">{industry.tagline}</span>
                    {isLive ? (
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-black text-white px-2.5 py-1 rounded-full">Live</span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] border border-black/20 text-black/60 px-2.5 py-1 rounded-full">Coming Soon</span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {industry.name}
                  </h2>
                  <p className="text-sm md:text-base text-[#555] leading-relaxed mb-5">{industry.summary}</p>
                  <p className="text-xs text-[#777] leading-relaxed mb-6">
                    <span className="font-bold uppercase tracking-[0.15em] text-[#888]">Who it's for: </span>
                    {industry.who}
                  </p>
                  {isLive ? (
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-black">
                      Explore {industry.name}
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                    </span>
                  ) : (
                    <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#666] hover:text-black transition-colors">
                      Talk to us about {industry.name}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                    </button>
                  )}
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      <RelatedContent
        eyebrow="Proof"
        heading="Real Programs. Real Results."
        items={relatedCaseStudies}
        theme="light"
      />

      <section className="bg-[#0a0a0a] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Don't see your industry?
          </h2>
          <p className="text-base text-[#888] leading-relaxed mb-8 max-w-lg mx-auto">
            We work with organizations across many sectors. If your team needs a structured branded merchandise program, let's talk.
          </p>
          <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-gray-200 transition-colors">
            Start a Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
          </button>
        </div>
      </section>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
