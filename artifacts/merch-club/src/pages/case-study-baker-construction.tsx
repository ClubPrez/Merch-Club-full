import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";

import bernieBeer from "@assets/Bernie_Beer_Glass_1779204227434.png";
import heroJobsite from "@assets/Apparel_in_the_field_1779205508007.png";
import beerCansCold from "@assets/Cold_Beer_Image_Alt_1779204227435.png";
import backpackCoolers from "@assets/60_yr_backpack_coolers_1779204227431.png";
import apparelField from "@assets/Apparel_in_the_field_1779204227432.png";
import beanieHat from "@assets/Beanie_1779204227433.png";
import capCloseUp from "@assets/Cap_Side_Close_Up_1779204227435.png";
import chargingCable from "@assets/Charging_Cable_1779204227435.png";
import coolerJobsite from "@assets/Cooler_1779204227436.png";
import delivery from "@assets/Delivery_1779204227436.png";
import golfEvent from "@assets/Golf_Event_(1)_1779204227436.png";
import golfHat from "@assets/Golf_Hat_1779204227436.png";
import guyWithCap from "@assets/Guy_with_cap_1779204227437.png";
import guysWithCaps from "@assets/Guys_with_Caps_1779204227437.png";
import walkingHall from "@assets/Walking_down_the_hall_1779204227437.png";
import tradeShow from "@assets/Trade_Show_1_1779204262595.png";

type GalleryItem = { src: string; alt: string; ratio: string; width: string };

const galleryRowOne: GalleryItem[] = [
  { src: apparelField, alt: "Two Baker Group crew members in Carhartt jackets reviewing plans on a job site", ratio: "aspect-[4/3]", width: "24rem" },
  { src: beanieHat, alt: "Embroidered Baker Group black beanie worn by a crew member", ratio: "aspect-[3/4]", width: "16rem" },
  { src: guysWithCaps, alt: "Two Baker Group team members in branded leather-patch caps and field jackets", ratio: "aspect-[4/3]", width: "24rem" },
  { src: capCloseUp, alt: "Macro detail of an embroidered Baker Group logo on a perforated performance cap", ratio: "aspect-[4/5]", width: "18rem" },
  { src: golfHat, alt: "Baker Group golf cap and quarter-zip on the course at a client event", ratio: "aspect-[3/4]", width: "16rem" },
  { src: walkingHall, alt: "Baker Group team in branded hoodies and rain jacket walking the office hallway", ratio: "aspect-[4/3]", width: "24rem" },
  { src: guyWithCap, alt: "Baker Group leather-patch cap and field jacket worn at a barn meeting", ratio: "aspect-[3/4]", width: "16rem" },
];

const galleryRowTwo: GalleryItem[] = [
  { src: bernieBeer, alt: "Bernie Steam Beer 60th anniversary glassware showing the label, founder portraits, and Exile brewing partner mark", ratio: "aspect-[16/9]", width: "32rem" },
  { src: beerCansCold, alt: "Cooler full of Bernie Steam Beer cans on ice at a Baker Group anniversary event", ratio: "aspect-[3/4]", width: "16rem" },
  { src: backpackCoolers, alt: "Pyramid stack of Baker Group 60th anniversary cooler backpacks", ratio: "aspect-[4/5]", width: "18rem" },
  { src: coolerJobsite, alt: "Custom Baker Group hard cooler on a jobsite with a crew member walking by", ratio: "aspect-[3/4]", width: "16rem" },
  { src: golfEvent, alt: "Baker Group golf event activation with branded koozies, tools, and golf log books", ratio: "aspect-[4/3]", width: "24rem" },
  { src: tradeShow, alt: "Baker Group recruiting booth at a university trade show", ratio: "aspect-[4/3]", width: "24rem" },
  { src: chargingCable, alt: "Custom Baker Group branded USB-C charging cable with a Baker service van figurine", ratio: "aspect-[3/4]", width: "16rem" },
  { src: delivery, alt: "Merch Club pallet of Baker Group cartons being delivered off a truck", ratio: "aspect-[3/4]", width: "16rem" },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Construction", href: "/case-studies/construction" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Baker Group — A Long-Term Construction Merch Partnership",
  description:
    "Three-plus years embedded with Baker Group, a 1,500-employee multi-specialty contractor — running field apparel, executive gear, client gifting, trade show kits, and the 60th-anniversary Bernie Steam Beer program.",
  datePublished: "2026-04-22",
  author: { "@type": "Organization", name: "Merch Club" },
  publisher: {
    "@type": "Organization",
    name: "Merch Club",
    logo: { "@type": "ImageObject", url: "https://merchclub.replit.app/opengraph.jpg" },
  },
  mainEntityOfPage: "https://merchclub.replit.app/case-studies/construction",
  about: "Construction & Trades Apparel Programs",
};

export default function CaseStudyBakerConstruction() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="Baker Group — A Long-Term Construction Merch Partnership"
        description="What it looks like when your merch team isn't a vendor. Three-plus years embedded with Baker Group — field apparel, executive gear, gifting, trade shows, and a 60th-anniversary beer brewed in Des Moines."
        path="/case-studies/construction"
        type="article"
        keywords="construction merch case study, baker group, contractor apparel program, carhartt field apparel, anniversary merch, custom beer collaboration, trade show kits, embedded merch partner"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), articleJsonLd]}
      />

      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-8 md:px-16 lg:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-white text-black px-2.5 py-1 rounded-full">Construction</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Baker Group</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">Ongoing · 2023+</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            What It Looks Like When Your Merch Team Isn't a Vendor.
          </h1>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
            Three years embedded with Baker Group — every department, every milestone, every job site. From Carhartt-built field jackets to a 60th-anniversary beer brewed in Des Moines.
          </p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-16 md:pb-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <img
              src={heroJobsite}
              alt="Two Baker Group crew members in branded Carhartt jackets and embroidered caps reviewing site plans on a jobsite with an excavator behind them"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Who They Are */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Who They Are</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Meet Baker Group.
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
            Baker Group is one of the Midwest's largest multi-specialty design-build contractors. Headquartered in Des Moines, Iowa, with roots that go back to 1963, Baker handles mechanical, electrical, building automation, life safety, plumbing, and HVAC service work for projects across the region. A 1,500-employee operation. A company that built itself the same way its crews build buildings — one detail at a time.
          </p>
          <p className="text-base md:text-lg text-[#444] leading-relaxed">
            Baker's brand isn't loud. It's earned. Decades in the field. A founder story — Bernie and Berniece Baker, founding a small steamfitting company in Lee Township and growing it into a Midwest powerhouse — that the company still puts on a beer label. "Lee Township against the World" isn't a tagline. It's the worldview. When a company carries that kind of identity, the merch can't be afterthought. It has to carry the same weight.
          </p>
        </div>
      </section>

      {/* The Partnership */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Partnership</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Not a Vendor. An Embedded Team.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                Most merch programs start with an order form. Baker started with a phone call about three years ago that turned into something different. Today we handle the full spectrum of Baker Group merchandise across every department in the company.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed">
                Field crews get Carhartt jackets and beanies built for jobsite conditions. Leadership gets executive polos, quarter-zips, and golf gear designed for the client meetings where real relationships happen. Recruiting gets the trade show kit. Marketing gets the anniversary program. HR gets the onboarding apparel. One partner. Every program.
              </p>
            </div>
            <div>
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#eee] border border-black/10">
                <img src={walkingHall} alt="Baker Group employees in branded hoodies walking the office hallway" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Moment: 60 Years */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">The Hero Moment</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Some Milestones Get a Sheet Cake.<br />Baker Got a Beer.
            </h2>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
              In 2023, Baker Group hit 60 years — six decades from Bernie and Berniece Baker founding a steamfitting company in Lee Township to one of the Midwest's largest multi-specialty contractors. A milestone like that doesn't get marked with a coffee mug. So we built a program that matched the moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img src={bernieBeer} alt="Bernie Steam Beer glassware showing Bernie and Berniece's portraits and the Exile Brewing partner mark" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img src={beerCansCold} alt="Cooler of Bernie Steam Beer cans on ice at a Baker Group event" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          <div className="max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Bernie Steam Beer · 1963–2023
            </h3>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed mb-5">
              In partnership with Exile Brewing Company — a local Des Moines brewery — we developed a custom co-branded beer for Baker's 60th anniversary. Named for Bernie Baker, the founder. Featured Bernie and Berniece's actual portraits on the label. Carried the company's worldview right on the can: "Lee Township against the World." A full-flavored steam beer brewed for a company that built itself on the boldness of an underdog.
            </p>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed mb-8">
              Not a logo slapped on a stock label. A real product, brewed in their backyard, carrying their actual story — written in their actual voice.
            </p>
            <ul className="space-y-3 text-base md:text-lg text-white">
              <li className="flex gap-3"><span className="text-white/30">—</span>Custom Bernie Steam Beer, brewed by Exile Brewing</li>
              <li className="flex gap-3"><span className="text-white/30">—</span>Custom anniversary glassware engineered to pair with the beer</li>
              <li className="flex gap-3"><span className="text-white/30">—</span>Custom cooler backpacks — built for tailgates, jobsite breaks, and team moments</li>
              <li className="flex gap-3"><span className="text-white/30">—</span>Anniversary apparel and accessories rolled out across the company</li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Range */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Range</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Every Department.<br />Every Program. One Team.
            </h2>
            <p className="text-base md:text-lg text-[#444] leading-relaxed max-w-3xl">
              Most merch programs cover one or two needs. The Baker partnership spans the entire company — and stays consistent across every touchpoint because it's all coming from one team that knows the brand inside out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: apparelField, label: "Field Apparel", desc: "Carhartt jackets, Defender hoodies, beanies, vests, cooling towels, hand warmers, first-aid kits, custom zipper pulls." },
              { src: golfHat, label: "Executive & Leadership Gear", desc: "Polos, quarter-zips, co-branded apparel, custom caps, and patches for client meetings and the field." },
              { src: golfEvent, label: "Client Gifting & Relationship Tools", desc: "Golf log books, drinkware, suede koozies, duck-hunting gear, multi-tool pens — the relationship-building toolkit." },
              { src: chargingCable, label: "Trade Show & Event Programs", desc: "Backpacks, tech items, chargers, cables, earbuds, mouse pads, neck fans — kitted and shipped wherever Baker is showing up next." },
              { src: backpackCoolers, label: "Anniversary & Milestone Programs", desc: "The 60th-anniversary build — Bernie Steam Beer, cooler backpacks, glassware, and the full kit." },
              { src: tradeShow, label: "Recruiting, HR & Onboarding", desc: "First-day apparel for new hires and field-tested giveaways for hiring events." },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#eee] border border-black/10 mb-4">
                  <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-black mb-2 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.label}</h3>
                <p className="text-sm md:text-base text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Gallery */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 mb-12 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">From the Field</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Three Years of Baker, In the Wild.
          </h2>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-2xl">
            Every piece below is real work. Real product. Real Baker employees wearing it on the job, in the office, on the course, and at the events that matter.
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
              <div key={`r1-${i}`} className={`${g.ratio} shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10`} style={{ width: g.width }}>
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="mc-marquee-row mc-marquee-track-r">
            {[...galleryRowTwo, ...galleryRowTwo].map((g, i) => (
              <div key={`r2-${i}`} className={`${g.ratio} shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10`} style={{ width: g.width }}>
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day-to-Day */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">What This Looks Like Day-to-Day</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            The Operating Rhythm of an Embedded Partnership.
          </h2>
          <ol className="space-y-5">
            {[
              "Annual planning — every year starts with a calendar conversation. Anniversaries, trade shows, hiring waves, gifting seasons, leadership events. We map the year before it starts.",
              "Department-by-department creative — field, exec, recruiting, marketing, and HR each get their own creative direction. One brand. Different applications.",
              "Product sourcing across categories — from Carhartt programs to custom-developed items like the Bernie Beer collaboration. Whatever the moment calls for.",
              "Production management across decoration methods — embroidery, screenprint, patch, laser-engrave, custom development. Coordinated as a single program instead of a stack of one-off orders.",
              "Kitting, fulfillment, and distribution — whether the destination is a jobsite, a trade show booth, a client's office, or 1,500 employees company-wide.",
              "Reporting and recap — every program closes with a recap. What landed. What to repeat. What to evolve next year. The relationship gets smarter every cycle.",
            ].map((step, i) => (
              <li key={i} className="flex gap-5 items-start">
                <span className="shrink-0 w-9 h-9 rounded-full bg-black text-white text-sm font-black flex items-center justify-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{i + 1}</span>
                <p className="text-base md:text-lg text-[#444] leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why This Matters / CTA */}
      <section className="bg-black text-white py-28 md:py-40 px-8 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 block mb-6">Why This Matters</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Less Coordination.<br />More Consistency.<br />One Team.
          </h2>
          <p className="text-lg md:text-xl text-[#bbb] leading-relaxed mb-12 max-w-2xl mx-auto">
            Across every program, every department, every milestone — one team handling it. That's the difference between a vendor and a partner.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-3 bg-white text-black text-base md:text-lg font-black uppercase tracking-wide px-10 py-5 md:px-12 md:py-6 rounded-full hover:bg-[#eee] transition-colors shadow-2xl">
              Start Your Project
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </button>
            <Link href="/industries/construction" className="inline-flex items-center gap-2 border border-white/20 text-white text-sm md:text-base font-bold px-7 py-4 rounded-full hover:bg-white hover:text-black transition-colors">
              See Construction Programs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/70 text-sm md:text-base font-bold px-2 py-3 hover:text-white hover:underline">
              All Case Studies
            </Link>
          </div>
        </div>
      </section>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
