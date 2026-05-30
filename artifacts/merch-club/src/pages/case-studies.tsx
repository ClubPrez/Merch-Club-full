import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { caseStudies } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import eventsThumb from "@assets/461191773_18297032593205370_5287082838877484901_n_1778693892844.jpg";

const thumbBySlug: Record<string, string> = {
  events: eventsThumb,
};

export default function CaseStudies() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
  ];

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies — Merch Club",
    description: "Real-world branded merchandise programs Merch Club has built for healthcare, nonprofit, and growth-stage teams.",
    url: "https://merchclub.com/case-studies",
    hasPart: caseStudies.map((c) => ({
      "@type": "Article",
      headline: c.title,
      url: `https://merchclub.com/case-studies/${c.slug}`,
      description: c.summary,
    })),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SEO
        title="Case Studies — Branded Merchandise Programs"
        description="Real branded merchandise programs Merch Club has executed — staff apparel rollouts, donor stewardship kits, and onboarding programs with measurable results."
        path="/case-studies"
        keywords="branded merchandise case studies, merch program case studies, healthcare merch case study, nonprofit donor kit case study"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), collectionJsonLd]}
      />


<SiteHeader onStartProject={() => setProjectModalOpen(true)} />


      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-8 md:px-16 lg:px-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-10" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#666] block mb-4">Case Studies</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-6 max-w-4xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Programs We've Built. <span className="text-[#888]">Outcomes We've Delivered.</span>
          </h1>
          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl">
            Each engagement starts with a problem and ends with a system that runs. Here's how it has played out for teams across healthcare, nonprofit, and growth-stage tech.
          </p>
        </div>
      </section>

      <section className="bg-white text-black py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`} aria-label={`Read the ${cs.client} case study: ${cs.title}`} className="group block rounded-2xl border border-black/10 bg-[#f7f7f7] hover:bg-white hover:border-black/30 hover:-translate-y-1 transition-all p-7 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center mb-8 md:mb-10">
                <div className="md:col-span-7 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-black text-white px-2.5 py-1 rounded-full">{cs.industry}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">{cs.client}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {cs.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#555] leading-relaxed mb-6">{cs.summary}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-black">
                    Read the {cs.client} case study
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
                  </span>
                </div>
                <div className="md:col-span-5 order-1 md:order-2">
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/5 border border-black/5">
                    <img
                      src={thumbBySlug[cs.slug] ?? cs.image}
                      alt={`${cs.client} — ${cs.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {cs.results.map((r) => (
                  <div key={r.label} className="bg-black text-white rounded-xl p-4 md:p-5 text-center">
                    <div className="text-3xl md:text-4xl font-black leading-none mb-2 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{r.value}</div>
                    <div className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-white/60 leading-tight">{r.label}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Want to be the next one?
          </h2>
          <p className="text-base text-[#888] leading-relaxed mb-8 max-w-lg mx-auto">
            Tell us what you're trying to build. We'll show you how to get there.
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
