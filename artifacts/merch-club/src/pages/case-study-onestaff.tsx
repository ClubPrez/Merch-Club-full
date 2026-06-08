import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";
import heroImage from "@assets/tote_vw_bus_1778692208474.png";
import nursesWeekImage from "@assets/BLENDi_2_1778000814932.png";
import bottleImage from "@assets/653849757_902181562799830_4065228705558207715_n_1778001045823.jpg";
import scarfImage from "@assets/ChatGPT_Image_May_5,_2026,_04_03_04_PM_1778691070029.png";
import onestaffLogo from "@assets/Social_PostsArtboard_1_copy@3x_1778001408621.png";
import holidayBoxImage from "@assets/Logo_Corrected_Happy_Holiday_1778005396970.png";
import cozyKitImage from "@assets/Cozy_Time_Kit_1778004541901.png";
import testimonialPhoto from "@assets/OneStaff-Test_1778691015027.png";

import gSpeakerLake from "@assets/ChatGPT_Image_May_5,_2026,_07_14_06_PM_(1)_1778691486692.png";
import gPhoneGloves from "@assets/ChatGPT_Image_May_5,_2026,_07_27_03_PM_1778691486692.png";
import gYogaBag from "@assets/ChatGPT_Image_May_5,_2026,_07_31_07_PM_1778691486693.png";
import gSlingTulsa from "@assets/ChatGPT_Image_May_5,_2026,_08_00_22_PM_1778691486693.png";
import gCheckeredTote from "@assets/Checkered_Tote_-_Floor_1778691486693.JPG";
import gCozyKitFlat from "@assets/Cozy_Kit_3_1778691486693.png";
import gCozyKitBedside from "@assets/Cozy_Time_Kit_1778691486693.png";
import gCoolerBreakroom from "@assets/Custom_Cooler_Break_Room_1778691486694.png";
import gCoolerNeutral from "@assets/Custom_Cooler_Neutral_Background_1778691486694.png";
import gMassageNurse from "@assets/massage_nurse_1778691486694.png";
import gTrackerSky from "@assets/OneStaff__1_Sky_1778691486694.png";
import gTrackerPhone from "@assets/OneStaff__8_Phone_Tracker_1778691486695.png";
import gBagTracker from "@assets/OneStaff_Bag_Mockup_1778691486695.png";
import gScarfTraveler from "@assets/tote_vw_bus_1778692208474.png";
import gScarfClose from "@assets/Scarf_Close_up_1778691486695.png";
import gCapCity from "@assets/STYA_3_1778691486695.png";
import gScarfAirportGuy from "@assets/ChatGPT_Image_May_5,_2026,_04_03_04_PM_1778691486695.png";
import gBottleStickers from "@assets/653849757_902181562799830_4065228705558207715_n_1778691486696.jpg";

type GalleryItem = { src: string; alt: string; ratio: string; width: string };

const galleryRowOne: GalleryItem[] = [
  { src: gSpeakerLake, alt: "OneStaff #weareOSM speaker held up at a lakeside campfire", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gScarfTraveler, alt: "Travel nurse with OneStaff duffel sitting in vintage VW bus doorway overlooking the Pacific coast", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gCoolerBreakroom, alt: "Nurses in break room laughing around an OneStaff van-graphic lunch cooler", ratio: "aspect-[4/3]", width: "24rem" },
  { src: gBottleStickers, alt: "OneStaff teal water bottle decorated with branded sticker pack", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gYogaBag, alt: "OneStaff branded duffel and yoga mat heading into a wellness studio", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gMassageNurse, alt: "Nurse using OneStaff-branded massage gun on her shoulder at home", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gSlingTulsa, alt: "OneStaff stay osm sling bag at a Tulsa parade", ratio: "aspect-[4/5]", width: "18rem" },
  { src: gCozyKitBedside, alt: "OneStaff Cozy Time kit styled at a bedside — eye mask, fuzzy socks, candle, mug", ratio: "aspect-[4/5]", width: "18rem" },
  { src: gScarfAirportGuy, alt: "Traveler in denim jacket with OneStaff checkered smiley scarf at the gate", ratio: "aspect-[3/4]", width: "16rem" },
];

const galleryRowTwo: GalleryItem[] = [
  { src: gCozyKitFlat, alt: "OneStaff Cozy Kit flat lay — fuzzy socks and branded eye mask", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gCheckeredTote, alt: "OneStaff checkered quilted tote with smiley patch on a graffitied checker floor", ratio: "aspect-[4/5]", width: "18rem" },
  { src: gPhoneGloves, alt: "OneStaff branded touchscreen gloves scrolling Instagram", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gCoolerNeutral, alt: "Custom OneStaff van-graphic insulated lunch cooler, product detail", ratio: "aspect-[4/5]", width: "18rem" },
  { src: gTrackerPhone, alt: "OneStaff Bluetooth tracker held next to a phone in pairing mode", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gScarfClose, alt: "Macro detail of the OneStaff black and white checkered scarf weave", ratio: "aspect-[4/5]", width: "18rem" },
  { src: gTrackerSky, alt: "OneStaff Bluetooth tracker held against a clear blue sky", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gBagTracker, alt: "OneStaff tracker clipped to the front of a black backpack", ratio: "aspect-[3/4]", width: "16rem" },
  { src: gCapCity, alt: "OneStaff branded corduroy cap worn on a downtown city walk", ratio: "aspect-[4/3]", width: "24rem" },
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
  { label: "Nurse Gifting", href: "/case-studies/nurse-gifting" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Nurse Gifting — Travel Nurse Programs for Nurses Week & the Holidays (OneStaff Medical)",
  description:
    "How Merch Club designed and delivered two annual gifting programs for OneStaff Medical's travel nurses — translating their wanderlust brand into products nurses actually use on the road.",
  datePublished: "2026-04-15",
  author: { "@type": "Organization", name: "Merch Club" },
  publisher: {
    "@type": "Organization",
    name: "Merch Club",
    logo: { "@type": "ImageObject", url: "https://merchclub.com/opengraph.jpg" },
  },
  mainEntityOfPage: "https://merchclub.com/case-studies/nurse-gifting",
  about: "Nurse Gifting",
};

export default function CaseStudyOnestaff() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="Nurse Gifting — Travel Nurse Programs for OneStaff Medical"
        description="How Merch Club ran nurse gifting for OneStaff Medical for Nurses Week and the holidays — designed around their wanderlust brand and built for life on the road."
        path="/case-studies/nurse-gifting"
        type="article"
        keywords="nurse gifting case study, travel nurse gifting, nurses week gifts, healthcare staffing merch, nurse holiday gifts, branded nurse gift box, OneStaff Medical"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), articleJsonLd]}
      />

      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />

      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-8 md:px-16 lg:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-white text-black px-2.5 py-1 rounded-full">Nurse Gifting</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">OneStaff Medical</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">Apr 15, 2026 · 6 min read</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Travel Nurse Gifting, Built Around the Wanderlust.
          </h1>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
            Two annual gifting programs for OneStaff Medical — one for Nurses Week, one for the holidays — designed around the way travel nurses actually live, work, and pack.
          </p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-16 md:pb-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <img
              src={heroImage}
              alt="OneStaff Medical travel nurse on assignment — sunrise van life shot with branded blanket"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
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
            OneStaff Medical is a national healthcare staffing agency that places travel nurses, allied health professionals, and per-diem clinicians at hospitals and clinics across all 50 states. Their brand is built on the freedom of the assignment — the ability to chase a 13-week contract anywhere from a downtown trauma center to a coastal hospital, then move on to the next adventure.
          </p>
          <p className="text-base md:text-lg text-[#444] leading-relaxed">
            Their nurses aren't sitting at a desk waiting for a gift to land on it. They're on the road, in scrubs, between shifts — and any thank-you that doesn't survive a duffel bag and a 2,000-mile drive isn't really a thank-you at all.
          </p>
        </div>
      </section>

      {/* Wanderlust brand */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Brand Translation</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Capturing the Wanderlust in Product Form.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                OneStaff's identity is travel. Maps, mileage, time zones, suitcases, the open road. We took those visual cues and translated them into a product system — not just printed on a tee, but baked into objects nurses would actually carry with them on assignment.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed">
                Every SKU we picked had to pass one filter: <em>would a travel nurse pack this for the next contract?</em> If the answer was no, it didn't make the box.
              </p>
            </div>
            <div>
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#eee] border border-black/10">
                <img
                  src={nursesWeekImage}
                  alt="OneStaff-branded BLENDi portable blender van-side at the coast — wanderlust translated into a real travel-nurse product"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nurses Week Program */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Program 1 — Nurses Week</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Nurses Week Gifts That Showed Up Before the Shift Did.
            </h2>
            <p className="text-base md:text-lg text-[#444] leading-relaxed max-w-3xl">
              For Nurses Week, the goal was a gift moment that landed on time — at a different address for every nurse on assignment — and felt personal in a category that's mostly tote bags and chocolate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-12">
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>1,400+</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Nurse gift boxes shipped</div>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>36</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">States delivered to</div>
            </div>
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>143</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Organic posts and tags</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#eee] border border-black/10">
              <img
                src={bottleImage}
                alt="OneStaff-branded teal water bottle decorated with custom sticker pack — held by a travel nurse"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#eee] border border-black/10">
              <img
                src={scarfImage}
                alt="Travel nurse in an airport terminal wearing the OneStaff checkered scarf with smiley graphic, en route to the next assignment"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Program */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">Program 2 — Holiday Gifting</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              A Holiday Drop That Didn't Get Lost in the Shuffle.
            </h2>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
              The holiday program had to land in a crowded inbox of December gifts — without competing with whatever the hospital itself was sending. The answer was a tighter, more curated kit built around things nurses actually use on the road: warm layers, travel-ready accessories, and a few moments of quiet luxury for between shifts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-12">
            <div className="bg-white text-black rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>1,650</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Holiday kits delivered</div>
            </div>
            <div className="bg-white text-black rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>21</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Days, design to doorstep</div>
            </div>
            <div className="bg-white text-black rounded-2xl p-6 md:p-7 text-center">
              <div className="text-5xl md:text-6xl font-black leading-none mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>97%</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#666] leading-tight">Address accuracy on first ship</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={holidayBoxImage}
                alt="OneStaff-branded holiday gift box opened to reveal a Wake Up to New Adventures Happy Holidays card"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={cozyKitImage}
                alt="OneStaff Cozy Time holiday kit — branded eye mask, fuzzy socks, candle, and warm mug styled on a knit blanket"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Gallery */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 mb-12 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">From the Field</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Our Work, In the Wild.
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
            It's all in the details.
          </p>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-2xl">
            Thoughtful products. Creative details. Gifts that feel intentional, elevated, and aligned with your brand from every angle. Because great merch doesn't just wear your logo. It reflects your brand identity.
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
          {/* Row 1 — left */}
          <div className="mc-marquee-row mc-marquee-track-l">
            {[...galleryRowOne, ...galleryRowOne].map((g, i) => (
              <div
                key={`r1-${i}`}
                className={`${g.ratio} shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10`}
                style={{ width: g.width }}
              >
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          {/* Row 2 — right */}
          <div className="mc-marquee-row mc-marquee-track-r">
            {[...galleryRowTwo, ...galleryRowTwo].map((g, i) => (
              <div
                key={`r2-${i}`}
                className={`${g.ratio} shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10`}
                style={{ width: g.width }}
              >
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" loading="lazy" />
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
            "Heyo. The traveler holiday gifts were a hit. Merch Club made the process easy, brought us ideas that didn't feel cookie-cutter, and helped us send something that actually felt thoughtful. That's always the bar for us, and they nailed it."
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
            Design → Production → Delivery,<br />All Under One Roof.
          </h2>
          <ol className="space-y-5">
            {[
              "Design — built the creative system from OneStaff's brand inward, with mockups and product visuals approved before a single SKU was ordered.",
              "Sourcing & sampling — sourced product, pulled physical samples for sign-off, and locked decoration methods before scaling.",
              "Production — managed printing, embroidery, and finished-goods QC across multiple suppliers as a single program.",
              "Kitting & packaging — assembled every box by hand against a packing spec so the unboxing was identical from kit #1 to kit #1,650.",
              "Per-nurse delivery — built a redemption portal that let each nurse confirm their current address from their phone, eliminating bad-data ship-outs before they happened. Direct-to-door delivery with tracking handed back as a single report.",
              "Reporting — closed each program with a one-page recap: shipped, delivered, returned, and reorder candidates for next season.",
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
            A Repeatable Gifting Motion, Twice a Year.
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">
            Two seasonal programs are now built into OneStaff's calendar — each one launches off the prior year's recap, with creative direction and production timelines locked in advance. The internal team spends days on the program instead of weeks, and the nurses get a gift that actually shows up where they live this month.
          </p>
          <div className="border-t border-black/10 pt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-black text-white text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-[#333] transition-colors">
              Start Your Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </button>
            <Link href="/industries/healthcare" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-black/15 text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-black hover:text-white transition-colors">
              See Healthcare Programs
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
