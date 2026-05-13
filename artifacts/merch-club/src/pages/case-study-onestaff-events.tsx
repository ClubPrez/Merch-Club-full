import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";
import onestaffLogo from "@assets/Social_PostsArtboard_1_copy@3x_1778001408621.png";
import testimonialPhoto from "@assets/OneStaff-Test_1778691015027.png";

type GalleryItem = { label: string; ratio: string; width: string };

const galleryRowOne: GalleryItem[] = [
  { label: "Booth wide shot — show floor", ratio: "aspect-[4/3]", width: "24rem" },
  { label: "Branded backdrop / step & repeat", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Recruiter meetup — on-floor", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Premium giveaway hero shot", ratio: "aspect-[4/5]", width: "18rem" },
  { label: "Nurses with branded swag", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Lanyards / badge holders", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Booth detail — counter graphics", ratio: "aspect-[4/5]", width: "18rem" },
  { label: "Branded coffee bar moment", ratio: "aspect-[4/3]", width: "24rem" },
  { label: "Group photo — OneStaff team", ratio: "aspect-[3/4]", width: "16rem" },
];

const galleryRowTwo: GalleryItem[] = [
  { label: "Custom tee — flat lay", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Branded tote on the strip", ratio: "aspect-[4/5]", width: "18rem" },
  { label: "Hat / cap product detail", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Vegas-themed limited drop", ratio: "aspect-[4/5]", width: "18rem" },
  { label: "Sticker pack / pins flat lay", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "After-party activation", ratio: "aspect-[4/3]", width: "24rem" },
  { label: "Branded water bottle on floor", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Recruiter swag drop, in hand", ratio: "aspect-[3/4]", width: "16rem" },
  { label: "Booth signage detail", ratio: "aspect-[4/5]", width: "18rem" },
];

function Placeholder({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) {
  return (
    <div className={`${ratio} w-full rounded-2xl bg-[#eee] border border-black/10 flex items-center justify-center text-[#888] text-xs font-bold uppercase tracking-[0.2em] text-center px-6`}>
      <span>Image placeholder<br /><span className="text-[#bbb] font-medium normal-case tracking-normal">{label}</span></span>
    </div>
  );
}

function PlaceholderDark({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) {
  return (
    <div className={`${ratio} w-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-xs font-bold uppercase tracking-[0.2em] text-center px-6`}>
      <span>Image placeholder<br /><span className="text-white/25 font-medium normal-case tracking-normal">{label}</span></span>
    </div>
  );
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Events — TravCon", href: "/case-studies/events" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TravCon — Event Merch & Booth Activation for OneStaff Medical",
  description:
    "How Merch Club designed and produced OneStaff Medical's full event merch program for TravCon — the largest annual gathering of travel healthcare professionals — from booth apparel to premium giveaways, recruiter swag, and limited-edition Vegas drops.",
  datePublished: "2026-05-12",
  author: { "@type": "Organization", name: "Merch Club" },
  publisher: {
    "@type": "Organization",
    name: "Merch Club",
    logo: { "@type": "ImageObject", url: "https://merchclub.replit.app/opengraph.jpg" },
  },
  mainEntityOfPage: "https://merchclub.replit.app/case-studies/events",
  about: "Event Merchandise",
};

export default function CaseStudyOnestaffEvents() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="TravCon — Event Merch & Booth Activation for OneStaff Medical"
        description="Merch Club ran OneStaff Medical's full event program at TravCon — booth apparel, premium giveaways, recruiter swag, and a limited Vegas drop, all built and shipped to Las Vegas as one production."
        path="/case-studies/events"
        type="article"
        keywords="event merch case study, trade show merch, TravCon, travel nurse conference, branded booth giveaways, recruiter swag, healthcare staffing event, OneStaff Medical"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), articleJsonLd]}
      />

      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />

      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-8 md:px-16 lg:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-white text-black px-2.5 py-1 rounded-full">Events</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">OneStaff Medical · TravCon</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">May 12, 2026 · 6 min read</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Showing Up Big <br className="hidden md:block" />at TravCon.
          </h1>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
            A full event merch program for OneStaff Medical at TravCon — the largest annual gathering of travel healthcare professionals — built around the booth, the recruiters, and the nurses already shopping their next contract.
          </p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-16 md:pb-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <PlaceholderDark label="Hero — OneStaff TravCon booth, wide-angle show floor shot" ratio="aspect-[16/9]" />
        </div>
      </section>

      {/* Who is OneStaff */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Who They Are</span>
          <img
            src={onestaffLogo}
            alt="OneStaff Medical logo"
            className="h-8 md:h-10 lg:h-12 w-auto mb-8"
            loading="lazy"
          />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Meet OneStaff Medical
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
            OneStaff Medical is a national healthcare staffing agency that places travel nurses, allied health professionals, and per-diem clinicians at hospitals and clinics across all 50 states. Their brand is built on the freedom of the assignment — chase a 13-week contract anywhere, then move on to the next adventure.
          </p>
          <p className="text-base md:text-lg text-[#444] leading-relaxed">
            For most of the year that brand lives on a phone — texts from a recruiter, a job board, a Slack channel. Once a year it gets to live in person. That moment is TravCon.
          </p>
        </div>
      </section>

      {/* Why TravCon matters */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Stage</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                The One Week the Whole Industry Is in One Room.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                TravCon — the Travelers Conference — is the largest annual gathering of travel healthcare professionals in the country. Thousands of travel nurses, allied health pros, and locum clinicians fly into Las Vegas for CEUs, recruiter meetups, and a community that's otherwise scattered across 50 states.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed">
                For an agency like OneStaff, it's the single biggest brand moment of the year — the only week where their next 12 months of contracts are physically standing in front of them. The merch had to do real work: pull people in from the aisle, give recruiters something to hand over, and leave the show floor on a body that wears it home.
              </p>
            </div>
            <div>
              <Placeholder label="OneStaff team on the TravCon show floor" ratio="aspect-[4/5]" />
            </div>
          </div>
        </div>
      </section>

      {/* Program 1 — The Booth */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Program 1 — The Booth</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A Booth That Pulled People in from Three Aisles Away.
            </h2>
            <p className="text-base md:text-lg text-[#444] leading-relaxed max-w-3xl">
              Booth apparel for the OneStaff team, recruiter polos, branded counter graphics, and a tiered giveaway strategy — small grab-and-go items at the front, premium pieces saved for the recruiters to hand out as the conversation got real.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-12">
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>3,200+</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Branded items distributed at booth</div>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>14</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">SKUs across the on-site program</div>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>0</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Re-runs needed mid-show</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Placeholder label="Recruiter polos / team look on the floor" ratio="aspect-[3/4]" />
            <Placeholder label="Premium giveaway — recruiter hand-out" ratio="aspect-[3/4]" />
          </div>
        </div>
      </section>

      {/* Program 2 — Vegas Drop / Activations */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">Program 2 — Vegas Drop</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A Limited Drop Built to Leave the Show Floor.
            </h2>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
              Alongside the booth program we built a limited Vegas-themed drop — apparel and accessories nurses would actually want to wear back home, not stuff in the bottom of a suitcase. Sized intentionally short so it sold out by Saturday and gave the brand a scarcity moment instead of a leftover-inventory problem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-12">
            <div className="bg-white text-black rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>4 Days</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">From booth open to drop sold out</div>
            </div>
            <div className="bg-white text-black rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>6</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Limited SKUs in the Vegas capsule</div>
            </div>
            <div className="bg-white text-black rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>1 Pallet</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Total freight to Las Vegas</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PlaceholderDark label="Vegas drop tee — front graphic" ratio="aspect-[3/4]" />
            <PlaceholderDark label="Limited cap / accessory hero shot" ratio="aspect-[3/4]" />
          </div>
        </div>
      </section>

      {/* Scrolling Gallery */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 mb-12 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">From the Floor</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Our Work, On the Floor.
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
            It's all in the details.
          </p>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-2xl">
            Booth apparel, premium giveaways, recruiter swag, and a limited Vegas drop — every piece designed for OneStaff's brand and built for one week in Las Vegas where the whole industry is watching.
          </p>
        </div>

        <style>{`
          @keyframes mc-marquee-left { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          @keyframes mc-marquee-right { 0% { transform: translate3d(-50%,0,0); } 100% { transform: translate3d(0,0,0); } }
          .mc-marquee-row { display: flex; width: max-content; gap: 1.25rem; will-change: transform; }
          .mc-marquee-track-l { animation: mc-marquee-left 60s linear infinite; }
          .mc-marquee-track-r { animation: mc-marquee-right 75s linear infinite; }
          .mc-marquee:hover .mc-marquee-row { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .mc-marquee-track-l, .mc-marquee-track-r { animation: none; }
          }
        `}</style>

        <div className="mc-marquee space-y-5">
          <div className="mc-marquee-row mc-marquee-track-l">
            {[...galleryRowOne, ...galleryRowOne].map((g, i) => (
              <div
                key={`r1-${i}`}
                className="shrink-0"
                style={{ width: g.width }}
              >
                <PlaceholderDark label={g.label} ratio={g.ratio} />
              </div>
            ))}
          </div>
          <div className="mc-marquee-row mc-marquee-track-r">
            {[...galleryRowTwo, ...galleryRowTwo].map((g, i) => (
              <div
                key={`r2-${i}`}
                className="shrink-0"
                style={{ width: g.width }}
              >
                <PlaceholderDark label={g.label} ratio={g.ratio} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <svg className="w-10 h-10 md:w-12 md:h-12 text-black/20 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] text-black mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            "TravCon is our biggest week of the year and Merch Club treated it that way. Our booth team looked sharp, our recruiters had something real to hand over, and the Vegas drop sold out before the closing keynote. Easiest event production we've ever run."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img
              src={testimonialPhoto}
              alt="Marketing Director, OneStaff Medical"
              className="w-14 h-14 rounded-full object-cover border border-black/10"
              loading="lazy"
            />
            <div className="text-left">
              <div className="text-sm md:text-base font-bold text-black leading-tight">Marketing Director</div>
              <div className="text-xs md:text-sm text-[#666] leading-tight mt-0.5">OneStaff Medical</div>
            </div>
          </div>
        </div>
      </section>

      {/* End to end */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">How We Ran It</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Design → Production → Vegas,<br />Handled End to End.
          </h2>
          <ol className="space-y-5">
            {[
              "Strategy — mapped the show into three audience moments (aisle pull, recruiter conversation, post-conference wear) and built the SKU mix to serve each one.",
              "Design — built the on-floor look from OneStaff's brand inward, plus a separate creative direction for the limited Vegas drop so it didn't feel like a logo restamp.",
              "Sourcing & sampling — sourced product, pulled physical samples for sign-off, and locked decoration methods well ahead of the freight cutoff.",
              "Production — managed printing, embroidery, and finished-goods QC across multiple suppliers as a single program with one ship date.",
              "Freight & on-site — palletized everything to a single Las Vegas drop point, coordinated with the convention's receiving dock, and had backup product staged offsite for the just-in-case.",
              "Recap — closed the show with a one-page report: items distributed, sell-through on the Vegas drop, top performers, and reorder candidates for next year's TravCon.",
            ].map((step, i) => (
              <li key={i} className="flex gap-5 items-start">
                <span className="shrink-0 w-9 h-9 rounded-full bg-black text-white text-sm font-black flex items-center justify-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{i + 1}</span>
                <p className="text-base md:text-lg text-[#444] leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Outcome</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            A TravCon Playbook OneStaff Runs Every Year.
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">
            What used to be a fire drill of vendor wrangling, sample chasing, and last-minute reorders is now a single annual program with one creative direction, one production timeline, and one freight lane to Las Vegas. The internal team gets to spend the week working the booth instead of hunting boxes.
          </p>
          <div className="border-t border-black/10 pt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-black text-white text-sm md:text-base font-bold px-7 py-3 rounded-full hover:bg-[#333] transition-colors">
              Start Your Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </button>
            <Link href="/industries/events" className="inline-flex items-center gap-2 border border-black/15 text-black text-sm md:text-base font-bold px-7 py-3 rounded-full hover:bg-black hover:text-white transition-colors">
              See Event Programs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-black text-sm md:text-base font-bold px-2 py-3 hover:underline">
              All Case Studies
            </Link>
          </div>
        </div>
      </section>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
