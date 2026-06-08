import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";

import coffeeCupsImg from "@assets/Coffee_Cups_5_1779814740859.png";
import giftingGloveImg from "@assets/Gifting_Glove_1779814740860.png";
import driverHeadImg from "@assets/Gold_Driver_Head_1779814740861.png";
import golfBallsImg from "@assets/Golf_Balls_1779814740861.png";
import golfKitImg from "@assets/Golf_kit_1779814740861.png";
import golfLogBookImg from "@assets/Golf_Log_Book_1779814740862.png";
import leatherGlassImg from "@assets/Leather_Wrap_Glass_1780070278473.png";
import iceChartreuseImg from "@assets/Ice_Cube_w__Chartreuse_1779814740862.png";
import journalImg from "@assets/Journal_1779814740862.png";
import handwrittenNoteImg from "@assets/Note_that_goes_with_glove_1780070248881.png";
import pitchImg1 from "@assets/PITCH_Image_1_1780070452870.png";
import pitchImg2 from "@assets/PITCH_Image_2_1780070452871.png";
import drinkwareItemImg from "@assets/Drinkware_Item_1780070351616.png";
import womensQuiltedVestImg from "@assets/Apparel_Women's_Quilted_Vest_1780070351615.png";
import apparelLadiesImg from "@assets/Apparel_Ladies_Green_1779815383438.png";
import backpackCoolerImg from "@assets/Backpack_cooler_1779815615792.png";
import heroQuarterZipImg from "@assets/Apparel_Quarter_Ziip_1779815734898.png";
import luggageTagImg from "@assets/Luggage_Tag_1_1779814740863.png";
import phoneChargerImg from "@assets/Phone_Charger_1779814740863.png";
import toastInsideImg from "@assets/Toast_1_1779814740863.png";
import toiletryBagImg from "@assets/Toiletry_Bag_1779814740863.png";
import branchesImg from "@assets/Who_is_ACCESSbank_1779814740863.png";
import envelopeOpenerImg from "@assets/ChatGPT_Image_May_26,_2026,_06_08_27_AM_1780112009960.png";
import bandanaDogImg from "@assets/ChatGPT_Image_May_26,_2026,_11_08_03_PM_1780112016774.png";
import brandedPenImg from "@assets/ChatGPT_Image_May_26,_2026,_11_14_15_PM_1780112024611.png";
import denikJournalImg from "@assets/ChatGPT_Image_May_26,_2026,_10_55_42_PM_1780112325947.png";
import luggageTagKitImg from "@assets/ChatGPT_Image_May_26,_2026,_11_42_22_PM_1780112378512.png";

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

function Img({ src, alt, ratio = "aspect-[4/3]", dark = false }: { src: string; alt: string; ratio?: string; dark?: boolean }) {
  return (
    <div className={`${ratio} w-full rounded-2xl overflow-hidden ${dark ? "bg-white/5 border border-white/10" : "bg-[#eee] border border-black/10"}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "ACCESSbank Corporate Gifting", href: "/case-studies/access-bank" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Banking is built on relationships. So is the gift.",
  description:
    "How Merch Club built ACCESSbank's shareholder, executive, and employee gifting programs — including a book on the art of toasting we wrote and illustrated ourselves.",
  datePublished: "2026-04-15",
  author: { "@type": "Organization", name: "Merch Club" },
  publisher: {
    "@type": "Organization",
    name: "Merch Club",
    logo: { "@type": "ImageObject", url: "https://merchclub.com/opengraph.jpg" },
  },
  mainEntityOfPage: "https://merchclub.com/case-studies/access-bank",
  about: "Corporate Gifting",
  mentions: [
    { "@type": "Organization", name: "ACCESSbank" },
    { "@type": "Organization", name: "PITCH" },
    { "@type": "Organization", name: "Denik" },
  ],
};

const tier1 = [
  { label: "Buffalo leather gloves", img: giftingGloveImg },
  { label: "Custom ice molds", img: iceChartreuseImg },
  { label: "Handwritten note from leadership", img: handwrittenNoteImg },
  { label: "Branded toiletry bags", img: toiletryBagImg },
];

const tier2 = [
  { label: "Custom golf balls", img: golfBallsImg },
  { label: "Driver head covers", img: driverHeadImg },
  { label: "Custom golf bags & kits", img: golfKitImg },
  { label: "Golf log books", img: golfLogBookImg },
  { label: "Leather-wrap whiskey glasses", img: leatherGlassImg },
  { label: "Branded luggage tags", img: luggageTagImg },
];

const tier3 = [
  { label: "Branded insulated drinkware", img: drinkwareItemImg },
  { label: "Ladies' branded performance polos", img: apparelLadiesImg },
  { label: "Women's branded quilted vests", img: womensQuiltedVestImg },
];

const branches = [
  "Village Point",
  "Aksarben",
  "Midtown",
  "Papillion",
  "Oak View",
];

export default function CaseStudyAccessBank() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="ACCESSbank Corporate Gifting Case Study | Merch Club"
        description="How Merch Club built ACCESSbank's shareholder, executive, and employee gifting programs — including a book on the art of toasting we wrote and illustrated ourselves."
        path="/case-studies/access-bank"
        type="article"
        keywords="corporate gifting case study, relationship banking corporate gifts, shareholder gifting program, financial services branded merchandise, premium corporate gifting, custom holiday gift program, employee gifting program"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), articleJsonLd]}
      />

      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-8 md:px-16 lg:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-white text-black px-2.5 py-1 rounded-full">Corporate Gifting</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">ACCESSbank</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">Ongoing Partnership</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Banking Is Built on Relationships.<br />So Is the Gift.
          </h1>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
            How ACCESSbank turned holiday gifting, shareholder programs, and employee recognition into the most memorable brand experiences in their market — including a book we wrote and illustrated ourselves because the book didn't exist yet.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-[#0a0a0a] pb-16 md:pb-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <Img src={heroQuarterZipImg} alt="ACCESSbank branded quarter-zip — relationship banking in action" ratio="aspect-[16/9]" dark />
        </div>
      </section>

      {/* Hero intro */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-black leading-relaxed font-medium">
            ACCESSbank doesn't bank like a bank. They bank like a partner. So when they came to us for gifting, the work couldn't feel like gifting either. It had to feel like the relationship. What followed was a multi-program build — shareholder gifting, executive accounts, employee recognition, awards — and a book we authored from scratch because the right one didn't exist.
          </p>
        </div>
      </section>

      {/* Who They Are */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Who They Are</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Meet ACCESSbank.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                ACCESSbank is a relationship-driven community bank built around an idea that most of the financial industry has forgotten: that small business doesn't need a transaction, it needs a partner.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed">
                Their growth has been earned the slow way — by understanding the businesses they serve, locking onto their clients' success, and showing up for the community around them.
              </p>
            </div>
            <div className="w-full rounded-2xl overflow-hidden bg-[#eee] border border-black/10">
              <img src={branchesImg} alt="ACCESSbank branch locations across Omaha" className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Shift</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Relationship-First Banks Need Relationship-First Gifts.
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
            Most corporate gifting follows a formula. Pick from a catalog. Add a logo. Ship it. Done. The recipient gets a tumbler with someone's brand on it. The brand gets a brief moment of acknowledgement. Everyone moves on.
          </p>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
            That's not what relationship banking looks like. So that's not what the gifts could feel like.
          </p>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
            We approached every program for ACCESSbank with one filter: <em>does this create a memory, or does this create another piece of swag?</em> If the answer was "memory," it stayed. If the answer was "swag," it was rebuilt until it became a memory.
          </p>
          <p className="text-base md:text-lg text-[#444] leading-relaxed">
            Banking is all about working toward the celebrations, commemorations, and milestones that bring people together to experience great things. The gifts had to deliver the same thing.
          </p>
        </div>
      </section>

      {/* Hero Moment — Holiday Shareholder Gifting */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">The Hero Moment</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A Community-Bank Holiday Gift, Built in Partnership with a Community Brand.
            </h2>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed mb-5">
              For shareholders and key growth accounts, ACCESSbank wanted a holiday program that felt like a community-first bank — not a corporate one. So we built it in partnership with <strong className="text-white">PITCH</strong>, a coal-fire pizzeria with a deep wine program. Two Omaha businesses showing up together to deliver something neither could have built alone.
            </p>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed">
              That's what relationship banking actually looks like.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <Img src={pitchImg1} alt="ACCESSbank x PITCH gift tote with Pitch White and Pitch Black wines and the Art of Toasting book" ratio="aspect-[4/5]" dark />
            <Img src={pitchImg2} alt="Hand-delivery moment — Merch Club and PITCH deliver the ACCESSbank holiday gift" ratio="aspect-[4/5]" dark />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              "Custom-presented PITCH Black and PITCH White wines",
              "Custom wine carrier — designed to elevate the unboxing",
              "Wooden singing wine pourer — turns a pour into a moment",
              "A custom-authored book on the art of toasting",
            ].map((item, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-white text-black text-sm font-black flex items-center justify-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{i + 1}</span>
                <p className="text-base md:text-lg text-white leading-snug pt-1">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-xl md:text-2xl font-bold text-white leading-snug mt-12 max-w-3xl">
            When two trusted local brands arrive at the door together, the gift stops being a gift — it becomes a relationship moment.
          </p>
        </div>
      </section>

      {/* The Art of Toasting */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Art of Toasting</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                The Book That Didn't Exist.<br />So We Wrote It.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                When we built the holiday kit, we knew we wanted a book on the art of toasting included. Something that would sit on a coffee table for years. Something that could be shared. Something that would carry the ACCESSbank story forward long after the wine was gone.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                The book didn't exist. Not the one we wanted. So we wrote it ourselves.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-8">
                A 52-page hardcover book on the history, craft, and modern reinvention of the toast — fully authored, illustrated, designed, and produced by Merch Club. Drawn for the young and old. Practical and beautiful. The kind of book that gets pulled off the shelf at family dinners and group toasts for years to come.
              </p>
              <p className="text-xl md:text-2xl font-bold text-black leading-snug">
                Most agencies sell their clients products.<br />We wrote our client a book.
              </p>
            </div>
            <div>
              <Img src={toastInsideImg} alt="Inside the Art of Toasting book — toasts that inspire, legacies that last" ratio="aspect-[3/4]" />
            </div>
          </div>
        </div>
      </section>

      {/* The Branded Gifting System */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Branded Gifting System</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Four Tiers. Every Audience.<br />Every Dollar Working Harder.
            </h2>
            <p className="text-base md:text-lg text-[#444] leading-relaxed">
              Corporate gifting isn't one program — it's a system. Shareholders, key accounts, executives, walk-ins, and bulk giveaways each need their own version of the brand experience. We built ACCESSbank a four-tier system.
            </p>
          </div>

          {/* Tier 1 */}
          <div className="bg-white rounded-3xl p-8 md:p-10 mb-6">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-black text-white px-2.5 py-1 rounded-full">Tier 1</span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Premium Shareholder + Executive Gifts</h3>
            </div>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-6">
              Custom buffalo leather gloves. Ice molds for shareholder meetings. Premium backpack coolers. Branded toiletry bags. The kind of gifts everyone wants but rarely buys for themselves. Every Tier 1 gift ships with a handwritten note from leadership.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {tier1.map((t, i) => (
                t.img
                  ? <Img key={i} src={t.img} alt={t.label} ratio="aspect-square" />
                  : <Placeholder key={i} label={t.label} ratio="aspect-square" />
              ))}
            </div>
            <p className="text-lg md:text-xl font-bold text-black leading-snug">
              A $15 leather gift with a handwritten card from the CEO is worth more than a $200 watch with a corporate letter. The value isn't in the price tag. It's in the moment of being seen.
            </p>
          </div>

          {/* Tier 2 */}
          <div className="bg-white rounded-3xl p-8 md:p-10 mb-6">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-black text-white px-2.5 py-1 rounded-full">Tier 2</span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Key Account + Relationship Building</h3>
            </div>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-6">
              Premium-feel pieces engineered without the premium price tag. Tumblers that look like $18 retail items delivered at $8 laser-engraved. A heavy lineup of branded golf gear — where ACCESSbank's relationships actually get built. That's not luck. That's relentless sourcing.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tier2.map((t, i) => (
                <Img key={i} src={t.img} alt={t.label} ratio="aspect-[4/3]" />
              ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-white rounded-3xl p-8 md:p-10 mb-6">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-black text-white px-2.5 py-1 rounded-full">Tier 3</span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Mid-Level Brand Touchpoints</h3>
            </div>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-6">
              Tier 3 is where budget math gets real — you need more pieces without spending Tier 1 dollars. Wins here look like a laser-engraved tumbler that costs $8 and feels like a $20 retail piece. Or staff apparel that matches the person, and carries the room.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tier3.map((t, i) => (
                t.img
                  ? <Img key={i} src={t.img} alt={t.label} ratio="aspect-[4/3]" />
                  : <Placeholder key={i} label={t.label} ratio="aspect-[4/3]" />
              ))}
            </div>
          </div>

          {/* Tier 4 / Bulk */}
          <div className="bg-white rounded-3xl p-8 md:p-10">
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-black text-white px-2.5 py-1 rounded-full">Tier 4</span>
            </div>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-[#eee] text-black px-2.5 py-1 rounded-full">Bulk Giveaways</span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Branded Pieces That Cut Through Noise</h3>
            </div>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-6">
              The dollar nobody else finds. Custom pens we source for $0.83 — a dollar less than identical pens cost everywhere else. Envelope openers with a silver metallic ink overlay so they stay top-of-mind on a desk instead of getting lost in the pile. Every program's savings fund the next one.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Img src={envelopeOpenerImg} alt="ACCESSbank branded envelope opener with a silver metallic ink overlay, resting on a stack of envelopes" ratio="aspect-[4/3]" />
              <Img src={bandanaDogImg} alt="Golden retriever wearing an ACCESSbank branded bandana at a downtown park" ratio="aspect-[4/3]" />
              <Img src={brandedPenImg} alt="ACCESSbank branded pen on a marble countertop beside a handwritten grocery list" ratio="aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      {/* Branch Coffee Cups */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Every Branch Got Its Own Cup</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A Piece of Merch That Knows Where You're Sitting.
            </h2>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
              Walk into an ACCESSbank branch and you're going to be offered something to drink. Relationship banking starts with hospitality. Most banks would put their logo on a generic stock cup and call it a day. We saw the moment differently.
            </p>
            <p className="text-base md:text-lg text-[#444] leading-relaxed">
              We commissioned original linework illustrations of each ACCESSbank branch — five distinct buildings, each with its own architecture, signage, and personality. Then we brought those illustrations to life on the cups customers hold in their hands during every visit.
            </p>
          </div>

          <div className="mb-6">
            <Img src={coffeeCupsImg} alt="Five ACCESSbank branch coffee cups — each with a custom line illustration of its building" ratio="aspect-[16/9]" />
            <div className="grid grid-cols-5 gap-4 mt-4">
              {branches.map((name) => (
                <p key={name} className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#666] text-center">{name}</p>
              ))}
            </div>
          </div>

          <p className="text-lg md:text-xl font-bold text-black leading-snug max-w-3xl">
            The detail nobody's required to notice is exactly the detail that builds loyalty.
          </p>
        </div>
      </section>

      {/* Employee Gifting */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Employees</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Storytelling You Can Hold.
            </h2>
            <p className="text-base md:text-lg text-[#444] leading-relaxed">
              ACCESSbank's employee gifting program is built around a simple idea: the people who carry the brand every day should feel as connected to it as the customers do. So we built the kit around story, intention, and a little bit of meaning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Denik journals — more than paper, a story",
                body: "Custom soft-touch journals with full-color inside and outside covers telling the story of ACCESSbank. Denik has built eight schools in impoverished communities around the world — we're part of the quest to fund the ninth. A brand story you can carry, and a school you help build by carrying it.",
                placeholder: "Denik journal — inside cover storytelling",
                img: denikJournalImg,
              },
              {
                title: "Custom desk chargers that glow ACCESSbank blue",
                body: "A daily touchpoint, in the brand color, on every desk. Small detail. Constant reinforcement.",
                placeholder: "Desk charger glowing blue",
                img: phoneChargerImg,
              },
              {
                title: "Igloo backpack coolers for the course and the lake",
                body: "Co-branded Igloo backpack coolers built for the moments where ACCESSbank relationships actually happen — early mornings on the first tee, weekends at the lake, tailgates that run long. Premium hardware, not promotional filler.",
                placeholder: "ACCESSbank backpack cooler",
                img: backpackCoolerImg as string | null,
              },
              {
                title: "Branded luggage tags for the people always on the road",
                body: "A simple piece of gear with a job to do — clip it on the carry-on, spot the bag at baggage claim, carry the brand from Omaha to wherever the next deal lives. Made to take the beating that real travel hands out.",
                placeholder: "Branded luggage tag",
                img: luggageTagKitImg as string | null,
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-black/5">
                {item.img
                  ? <Img src={item.img} alt={item.title} ratio="aspect-[4/3]" />
                  : <Placeholder label={item.placeholder} ratio="aspect-[4/3]" />}
                <div className="p-7">
                  <h3 className="text-xl md:text-2xl font-black text-black tracking-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.title}</h3>
                  <p className="text-base text-[#444] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Why This Matters</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Corporate Gifting Doesn't Have to Feel Corporate.
          </h2>
          <p className="text-lg md:text-xl text-[#444] leading-relaxed mb-5">
            When brands trust us to bring our best to the table, we show up with better product, at better pricing, and creative ways to execute the giveaway process that nobody else spends time thinking through.
          </p>
          <p className="text-lg md:text-xl text-[#444] leading-relaxed mb-8">
            Corporate gifting can feel like a community-bank holiday delivery hand-carried by two local partners. It can feel like a leather gift with a handwritten note. It can feel like a book that didn't exist until someone took the time to write it.
          </p>
          <p className="text-xl md:text-2xl font-bold text-black leading-snug">
            That's what we do.<br />
            That's what we've built with ACCESSbank.<br />
            <span className="text-[#888]">That's what we'll build with you.</span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Outcome</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            A Gifting System That Reinforces the Relationship at Every Touchpoint.
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">
            Shareholder, executive, key account, employee, and walk-in programs are now a connected system — each tier funded by savings on the next, each gift designed around the way ACCESSbank actually shows up for the people it serves.
          </p>
          <div className="border-t border-black/10 pt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-black text-white text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-[#333] transition-colors">
              Start a Corporate Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </button>
            <Link href="/case-studies" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-black/15 text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-black hover:text-white transition-colors">
              All Case Studies
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
