import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";

import boothWide from "@assets/461191773_18297032593205370_5287082838877484901_n_1778693892844.jpg";
import boothSelfie from "@assets/461051920_18297032506205370_982178921037371215_n_1778693892843.jpg";
import boothChain from "@assets/461204439_18297032584205370_9064317744138119949_n_1778693892845.jpg";
import boothBuckets from "@assets/461238290_18297032536205370_6473409173115033458_n_1778693892845.jpg";
import vegasDropSolo from "@assets/485771444_1048758360618545_372803450094697544_n_1778693892845.jpg";
import vegasDropGroup from "@assets/ChatGPT_Image_Apr_30,_2026,_01_33_52_PM_1778693937978.png";
import giftSocks from "@assets/Resized_20240912_104004_1726158192626_2_1778694501183.JPG";
import giftBucketHat from "@assets/Resized_20240912_103951_1726158181668_2_1778694501183.JPG";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Healthcare Trade Show — OneStaff Medical", href: "/case-studies/events" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Booth No One Stopped Talking About — OneStaff Medical Trade Show Activation",
  description:
    "How an 80's hip hop themed activation made OneStaff Medical the most talked-about booth at the biggest healthcare recruiting trade show — beating bigger budgets by 10x.",
  datePublished: "2026-05-12",
  author: { "@type": "Organization", name: "Merch Club" },
  publisher: {
    "@type": "Organization",
    name: "Merch Club",
    logo: { "@type": "ImageObject", url: "https://merchclub.replit.app/opengraph.jpg" },
  },
  mainEntityOfPage: "https://merchclub.replit.app/case-studies/events",
  about: "Healthcare Trade Show Activation",
};

type PieceCard = {
  title: string;
  caption: string;
  src?: string;
  alt?: string;
};

const pieces: PieceCard[] = [
  {
    title: "Reversible bucket cap",
    caption:
      "The Day 1 drop. Full retro pattern on one side, OneStaff icon repeat on the other. One hat, two looks, infinite Instagram posts.",
    src: giftBucketHat,
    alt: "OneStaff TravCon reversible bucket cap — full retro swirl print on one side, icon repeat on the other",
  },
  {
    title: "Awesome Mixtape Bluetooth speaker",
    caption:
      "The Day 3 hero. Custom retro cassette housing, full-color brand artwork on Side A and Side B, real Bluetooth speaker inside. The piece nobody threw away.",
  },
  {
    title: "Custom mixtape inner insert",
    caption:
      "Full creative direction down to the cassette case insert. The retro VW party wagon became the activation's signature visual asset.",
  },
  {
    title: "Custom compression and athletic socks",
    caption:
      "Day 2 drop. Brand-colored stripes, OneStaff wordmark on the toe. Retro pattern, technical fabric, real performance build.",
    src: giftSocks,
    alt: "OneStaff custom rainbow stripe compression socks in retail packaging",
  },
  {
    title: "Custom cut-and-sew track jacket",
    caption:
      "Part of the team kit. Camo base, brand-stripe shoulders, signature van graphic on the back. Designed from pattern up — not a blank with a print on it.",
    src: vegasDropGroup,
    alt: "OneStaff custom cut-and-sew track jacket — back panel showing the signature VW party wagon graphic",
  },
  {
    title: "Custom track pants",
    caption:
      "Full team uniform piece. Pattern matched to the jacket. Designed and produced as a real garment, not a costume.",
    src: vegasDropSolo,
    alt: "OneStaff custom track pants — full retro look with brand stripe panels",
  },
  {
    title: "Letz Ride / Party Wagon stickers",
    caption:
      "Activation artwork. Used as booth graphics, giveaway extras, and a signature visual that anchored the entire campaign.",
  },
  {
    title: "Record-cut luggage tags",
    caption:
      "Cut from previously used vinyl records. Every-day giveaway. Functional, on-theme, recyclable, and unmistakably ours.",
  },
  {
    title: "Slap koozies",
    caption:
      "Daily giveaway. Custom branded, fits a can or a bottle, snaps on a wrist. Low cost, high utility, never tossed.",
  },
  {
    title: "Custom Sneaks",
    caption:
      "Designed and produced from scratch — not a stock shoe with a print on it. Brand stripes on the side panel, retro silhouette, signature heel detail. Worn by the team on the floor, photographed by attendees all three days.",
  },
  {
    title: "Fully custom footwear and sock program",
    caption:
      "Athletic socks, compression socks, and custom Sneaks engineered to work together visually and worn together on the floor.",
  },
  {
    title: 'Custom "boom box" Bluetooth speaker',
    caption:
      "Worn around the show floor. Blasted 80's hip hop in motion across the venue. The reason OneStaff brand impressions reached every corner of the show — not just their booth.",
  },
];

const services = [
  { title: "Strategy", desc: "Theme development, audience analysis, three-day giveaway sequencing." },
  { title: "Coaching", desc: "On-floor execution playbook for the OneStaff team." },
  { title: "Design", desc: "Brand extension into 80's hip hop visual language across every item in the activation." },
  { title: "Custom cut & sew", desc: "Jumpsuits, full-zip track jackets, bucket caps, socks, and custom shoes." },
  { title: "Custom hard goods", desc: "Cassette tape Bluetooth speakers, LED glasses, slap koozies, record-cut luggage tags, charging cords." },
  { title: "Music curation", desc: "80's hip hop playlist designed to fit the theme and energize the booth and the floor." },
];

const teamKit = [
  "Custom full cut-and-sew jumpsuits",
  "Heavy champ chains",
  "Custom compression and athletic socks",
  "Custom Sneaks — designed and produced from scratch",
  "Reversible bucket caps — full retro pattern on one side, signature icon repeat on the other",
  "LED glasses for the late-night sponsored party, synced to the music",
];

export default function CaseStudyOnestaffEvents() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="OneStaff Medical Trade Show Activation Case Study | Merch Club"
        description="How an 80's hip hop themed activation made OneStaff Medical the most talked-about booth at the biggest healthcare recruiting trade show — beating bigger budgets by 10x."
        path="/case-studies/events"
        type="article"
        keywords="healthcare trade show activation, healthcare recruiting trade show booth, branded merch trade show activation, custom trade show giveaways, healthcare trade show case study"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), articleJsonLd]}
      />
      <SiteHeader />

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white pt-32 md:pt-36 pb-12 md:pb-16 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" />
          <div className="flex flex-wrap items-center gap-3 mt-6 mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-[0.18em]">
              Healthcare Trade Show
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-white/60">OneStaff Medical · TravCon</span>
            <span className="text-xs uppercase tracking-[0.18em] text-white/40">May 12, 2026 · 8 min read</span>
          </div>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] text-white mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            The Booth No One Stopped Talking About.
          </h1>
          <p className="text-xl md:text-2xl text-white/70 leading-snug max-w-3xl mb-10">
            How OneStaff Medical owned the biggest healthcare recruiting trade show in the country — with less money than anyone else.
          </p>
          <div className="border-t border-white/10 pt-8 max-w-3xl">
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              OneStaff Medical came to us with a hard problem: how do you stand out at the biggest healthcare recruiting trade show of the year, on a floor full of identical booths, identical pitches, and identical swag bowls — with less budget than your biggest competitors?
            </p>
            <p className="text-lg md:text-xl text-white leading-relaxed mt-5 font-semibold">
              We didn't outspend them. We outthought them.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGES */}
      <section className="bg-[#0a0a0a] pb-20 md:pb-24 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <img
              src={boothWide}
              alt="OneStaff Medical TravCon booth — full activation with branded backdrops, the giveaway display, and the team in the retro hip hop kit"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <img
              src={boothSelfie}
              alt="OneStaff team selfie at the TravCon booth — full crew in the retro hip hop kit, branded backdrop and After Party Sponsor signage in frame"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Problem</span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            A Sea of Identical Booths.
          </h2>
          <div className="space-y-5 text-base md:text-lg text-[#333] leading-relaxed">
            <p>Every recruiter at this show was after the same audience — traveling nurses and clinical professionals scanning a crowded floor for a reason to slow down.</p>
            <p>Most companies took the same path. Pop-up banner. Branded polo. A bowl of pens and stress balls. Maybe a tumbler if the budget allowed.</p>
            <p>The result was a sea of interchangeable booths competing for the same attention with the same playbook.</p>
            <p>OneStaff's challenge wasn't visibility. It was differentiation. Bigger competitors had more booth space, more budget, more staff on the floor. We had to make the OneStaff booth the one nurses crossed the room to find — and the one they came back to.</p>
            <p className="text-xl md:text-2xl font-semibold text-black pt-4">The answer wasn't a bigger banner. It was a better strategy.</p>
          </div>
        </div>
      </section>

      {/* THE APPROACH */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Approach</span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-10 max-w-3xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            We Started Where Most Agencies Don't — at the Brand Level.
          </h2>
          <div className="max-w-3xl space-y-5 text-base md:text-lg text-[#333] leading-relaxed mb-12">
            <p>OneStaff's brand carries real cultural edge. Bold visual presence. Innovative culture. A team that takes recruiting seriously without taking itself too seriously. The activation needed to amplify that cultural signal without breaking the brand system underneath it.</p>
          </div>

          {/* The Theme callout */}
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-3">The Theme</span>
            <div
              className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              80's Hip Hop.
            </div>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
              The right cultural anchor for a brand willing to be the loudest team on the floor — for the right reasons.
            </p>
          </div>

          <div className="max-w-3xl space-y-5 text-base md:text-lg text-[#333] leading-relaxed mb-16">
            <p>Before any product was sourced, we printed brand evolution boards showing how the existing OneStaff color palette, logo, and visual system would extend into 80's hip hop language. Same brand. New context. Everything stayed on-brand. Nothing felt like a costume.</p>
            <p className="text-xl md:text-2xl font-semibold text-black pt-2">Then we built the world.</p>
          </div>

          {/* Team Kit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-16 items-start">
            <div>
              <h3
                className="text-2xl md:text-3xl font-black tracking-tight text-black mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                The Team Kit
              </h3>
              <p className="text-base text-[#666] mb-6">In uniform without being in costume.</p>
              <ul className="space-y-3">
                {teamKit.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base md:text-lg text-[#333] leading-snug">
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-black mt-2.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#eee] border border-black/10">
              <img
                src={vegasDropGroup}
                alt="OneStaff team in full retro hip hop kit — track jackets, champ chains, bucket caps, and custom sneaks"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* The 3-Day Sequence */}
          <div className="mb-12">
            <h3
              className="text-2xl md:text-3xl font-black tracking-tight text-black mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              The Three-Day Return Strategy
            </h3>
            <p className="text-base text-[#666] mb-6 max-w-2xl">
              The giveaways were sequenced as a three-day return strategy. Not a swag bowl. A reason to come back.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] w-full bg-[#f5f5f5] overflow-hidden">
                  <img
                    src={giftBucketHat}
                    alt="Day 1 giveaway — OneStaff TravCon reversible bucket cap with all-over swirl print"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#888] mb-3">Day 1</div>
                  <div
                    className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2 leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Reversible Bucket Caps
                  </div>
                  <p className="text-sm text-[#666] leading-snug">The Instagram-able hook — posted from the hotel room that night.</p>
                </div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] w-full bg-[#f5f5f5] overflow-hidden">
                  <img
                    src={giftSocks}
                    alt="Day 2 giveaway — OneStaff custom rainbow stripe compression socks in retail packaging"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#888] mb-3">Day 2</div>
                  <div
                    className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2 leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Custom Socks &amp; Fanny Packs
                  </div>
                  <p className="text-sm text-[#666] leading-snug">The piece that brings them back to find out what's next.</p>
                </div>
              </div>
              <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] w-full bg-[#eee] flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999]">Photo coming</span>
                </div>
                <div className="p-6 md:p-7">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#888] mb-3">Day 3</div>
                  <div
                    className="text-2xl md:text-3xl font-black tracking-tight text-black mb-2 leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Cassette Bluetooth Speakers
                  </div>
                  <p className="text-sm text-[#666] leading-snug">Plus charging cords and scrunchies — the hero piece nobody throws away.</p>
                </div>
              </div>
            </div>
            <p className="text-sm md:text-base text-[#555] leading-relaxed mt-5 max-w-3xl">
              Every day across all three days, attendees who stopped by also got custom luggage tags cut from previously used vinyl records and slap koozies.
            </p>
          </div>

          <div className="max-w-3xl space-y-5 text-base md:text-lg text-[#333] leading-relaxed">
            <p>The genius wasn't any single item. It was the sequence. Attendees got the bucket cap on Day 1, posted it on Instagram from their hotel that night, and showed up Day 2 for the next drop. By Day 3, the OneStaff booth was a destination — not a stop on the way to lunch.</p>
            <p>And while the team walked the floor between visits, they carried a custom "boom box" Bluetooth speaker built to match the activation, blasting 80's hip hop in motion across the entire venue. Free brand impressions, all day, every day, in places the competition's static booths couldn't reach.</p>
          </div>
        </div>
      </section>

      {/* THE OUTCOME */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">The Outcome</span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-12 max-w-4xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            The Most Popular Booth on the Floor — Every Day of the Show.
          </h2>

          <div className="aspect-[4/3] md:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-12">
            <img
              src={boothChain}
              alt="OneStaff recruiter in a champ chain and reversible bucket cap at the TravCon booth — attendee browsing the giveaway display loaded with bucket caps, fanny packs, and the enter-to-win sign"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12">
            <div className="bg-white text-black rounded-2xl p-6 md:p-8 text-center">
              <div className="text-6xl md:text-7xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>10x</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">
                Attention, foot traffic, and post-event conversation vs. larger budgets
              </div>
            </div>
            <div className="bg-white text-black rounded-2xl p-6 md:p-8 text-center">
              <div className="text-6xl md:text-7xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>3 Days</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">
                A trade show turned into a cultural moment
              </div>
            </div>
            <div className="bg-white text-black rounded-2xl p-6 md:p-8 text-center">
              <div className="text-6xl md:text-7xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>#1</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">
                The only booth anyone was talking about by Day 3
              </div>
            </div>
          </div>

          <div className="max-w-3xl space-y-5 text-base md:text-lg text-white/80 leading-relaxed">
            <p>By the end of Day 3, they were the only booth anyone was talking about.</p>
            <p>Multiple competitors spent significantly more on their activations. OneStaff won by roughly 10x in attention, foot traffic, and post-event conversation — because the strategy was right, the items were right, and the day-by-day sequencing turned a three-day trade show into a cultural moment people are still referencing.</p>
            <p>The brand carried forward long after the show closed. The team still talks about it. So do the nurses who left with a bucket cap, a pair of socks, a cassette speaker, and a story.</p>
          </div>
        </div>
      </section>

      {/* SERVICES PROVIDED */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Services Provided</span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-12 max-w-3xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            What We Ran for OneStaff.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-[#f5f5f5] rounded-2xl p-6 md:p-7">
                <div
                  className="text-2xl md:text-3xl font-black tracking-tight text-black mb-3 leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {s.title}
                </div>
                <p className="text-sm md:text-base text-[#555] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PIECES */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">The Pieces</span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-12 max-w-3xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Every Item, From the Bucket Cap to the Boom Box.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {pieces.map((p, i) => (
              <div key={i}>
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4">
                  {p.src ? (
                    <img
                      src={p.src}
                      alt={p.alt || p.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center px-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Photo coming</span>
                    </div>
                  )}
                </div>
                <div
                  className="text-xl md:text-2xl font-black tracking-tight text-white mb-2 leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {p.title}
                </div>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">{p.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="bg-[#0b0b1f] text-white py-24 md:py-32 px-8 md:px-16 lg:px-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(99,102,241,0.25) 0%, transparent 55%), radial-gradient(circle at 80% 100%, rgba(67,56,202,0.2) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto relative">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 block mb-6">Why This Matters</span>
          <div className="border-l-4 border-indigo-500 pl-6 md:pl-10">
            <blockquote
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white mb-10"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Most trade show activations get budgeted as a line item. We treat them as cultural moments.
            </blockquote>
            <div className="space-y-5 text-lg md:text-xl text-white/80 leading-relaxed">
              <p>
                The brands that win the floor aren't the ones with the biggest booths. They're the ones with the clearest signal, the tightest theme, and the smartest sequence — backed by execution that holds up under three days of foot traffic.
              </p>
              <div className="pt-4 space-y-2 text-xl md:text-2xl font-semibold text-white">
                <p>That's what we do.</p>
                <p>That's what we built for OneStaff.</p>
                <p className="text-indigo-300">That's what we'll build for you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-white py-20 md:py-24 px-8 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-black mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ready to Own Your Next Show?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white font-bold uppercase tracking-[0.15em] text-sm rounded-full hover:bg-[#222] transition-colors"
            >
              Start a Healthcare Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </Link>
            <Link
              href="/work/healthcare-branded-merchandise-programs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black border border-black/15 font-bold uppercase tracking-[0.15em] text-sm rounded-full hover:bg-[#f5f5f5] transition-colors"
            >
              See more healthcare merchandise programs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED CONTENT */}
      <section className="bg-[#f5f5f5] py-16 md:py-20 px-8 md:px-16 lg:px-20 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-6">Related</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <Link
              href="/work/healthcare-branded-merchandise-programs"
              className="group bg-white rounded-2xl p-6 md:p-7 border border-black/5 hover:border-black/20 transition-colors block"
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#888] mb-3">Program</div>
              <div
                className="text-xl md:text-2xl font-black tracking-tight text-black leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Healthcare Branded Merchandise Programs
              </div>
              <div className="mt-4 text-sm font-semibold text-black inline-flex items-center gap-2">
                See the program
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </Link>
            <Link
              href="/work/trade-show-event-execution-programs"
              className="group bg-white rounded-2xl p-6 md:p-7 border border-black/5 hover:border-black/20 transition-colors block"
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#888] mb-3">Program</div>
              <div
                className="text-xl md:text-2xl font-black tracking-tight text-black leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Trade Show &amp; Event Execution Programs
              </div>
              <div className="mt-4 text-sm font-semibold text-black inline-flex items-center gap-2">
                See the program
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </Link>
            <Link
              href="/case-studies"
              className="group bg-white rounded-2xl p-6 md:p-7 border border-black/5 hover:border-black/20 transition-colors block"
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#888] mb-3">More</div>
              <div
                className="text-xl md:text-2xl font-black tracking-tight text-black leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                See All Case Studies
              </div>
              <div className="mt-4 text-sm font-semibold text-black inline-flex items-center gap-2">
                Browse all
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <StartProjectModal open={projectModalOpen} onOpenChange={setProjectModalOpen} />
    </div>
  );
}
