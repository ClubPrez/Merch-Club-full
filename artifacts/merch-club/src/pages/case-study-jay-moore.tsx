import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";

const FUCHSIA = "#A1006B"; // Pantone 227 C — accent only, never on global chrome

function Placeholder({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) {
  return (
    <div className={`${ratio} w-full rounded-2xl bg-[#eee] border border-black/10 flex items-center justify-center text-[#888] text-xs font-bold uppercase tracking-[0.2em] text-center px-6`}>
      <span>
        Image placeholder
        <br />
        <span className="text-[#bbb] font-medium normal-case tracking-normal">{label}</span>
      </span>
    </div>
  );
}

function PlaceholderDark({ label, ratio = "aspect-[4/3]" }: { label: string; ratio?: string }) {
  return (
    <div className={`${ratio} w-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-xs font-bold uppercase tracking-[0.2em] text-center px-6`}>
      <span>
        Image placeholder
        <br />
        <span className="text-white/25 font-medium normal-case tracking-normal">{label}</span>
      </span>
    </div>
  );
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Jay Moore Landscaping", href: "/case-studies/jay-moore-landscaping" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How a Landscaper Became a Landmark.",
  description:
    "Jay Moore trusted us with a hard call: stop blending in. Here's what happened when a tradesman bet on standing out — and we made sure it paid off.",
  datePublished: "2026-06-07",
  author: { "@type": "Organization", name: "Merch Club" },
  publisher: {
    "@type": "Organization",
    name: "Merch Club",
    logo: { "@type": "ImageObject", url: "https://merchclub.com/opengraph.jpg" },
  },
  mainEntityOfPage: "https://merchclub.com/case-studies/jay-moore-landscaping",
  about: "Brand Identity & Branded Merchandise",
  mentions: [
    { "@type": "Organization", name: "Jay Moore Landscaping" },
    { "@type": "Organization", name: "Ideal Pure Water" },
  ],
};

const badIdeas = [
  {
    n: "01",
    title: "The Lemonade Stand",
    body: "Finish a job, set up a free lemonade stand on the brand-new lawn. Neighbors wander over to get refreshed and leave wondering who turned the yard next door into something out of a magazine. Suburbia runs on keeping up with the Joneses. We'd just make sure the Joneses were handing out pink lemonade.",
    reaction: "Jay said maybe.",
    reactionFuchsia: false,
  },
  {
    n: "02",
    title: "The Weed Tray",
    body: "Every promo company slaps a logo on a koozie. Nobody makes the branded rolling tray. Among adults 35 to 50, about four in five drank in the past year, and one in three used THC. That's a third of the prime homeowner market, and not one landscaping company in the country is talking to them. Be the first. Also, it's all plants.",
    reaction: "Jay said 'we'll see.'",
    reactionFuchsia: false,
  },
  {
    n: "03",
    title: "The Flag",
    body: "The biggest flagpole in Omaha, right off the interstate. Instead of a normal flag, a giant white #1 on a fuchsia field. No logo, no words, just the number — a thirty-foot monument to self-belief you could read from a passing semi. Jay went and put up a giant flagpole. He just didn't fly the flag we designed.",
    reaction: "He's wrong, but he's the client.",
    reactionFuchsia: true,
  },
];

export default function CaseStudyJayMoore() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="Jay Moore Landscaping Case Study — How a Landscaper Became a Landmark | Merch Club"
        description="Jay Moore trusted us with a hard call: stop blending in. Here's what happened when a tradesman bet on standing out — and we made sure it paid off."
        path="/case-studies/jay-moore-landscaping"
        type="article"
        image="/images/jay-moore-thumb.jpg"
        imageAlt="Jay Moore Landscaping fuchsia building with brand sign — brand system case study by Merch Club"
        keywords="jay moore landscaping, brand system, fuchsia brand identity, landscaping brand case study, omaha landscaping brand, merch club case study, brand color strategy, branded merchandise landscaping"
        jsonLd={[buildBreadcrumbJsonLd(breadcrumbs), articleJsonLd]}
      />

      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-8 md:px-16 lg:px-20 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} theme="dark" className="mb-8" />
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-white text-black px-2.5 py-1 rounded-full">
              Landscaping & Brand
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              Jay Moore Landscaping
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">Omaha, NE</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 block mb-3">
            Case Study
          </span>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            How a Landscaper Became a Landmark.
          </h1>
          <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-3xl">
            Jay Moore trusted us with a hard call: stop blending in. Here's what happened when
            a tradesman bet on standing out — and we made sure it paid off.
          </p>
        </div>
      </section>

      {/* ── Hero Image ──────────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] pb-16 md:pb-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden aspect-[16/9]">
            <img
              src="/images/jay-moore-hero.jpg"
              alt="Jay Moore standing in front of his fuchsia-painted building — Jay Moore Landscaping, Omaha"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Jay Moore ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-8">
                Jay Moore
              </span>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                Every tradesman who's good at the work eventually hits the same wall: the work
                doesn't speak for itself. Jay Moore is one of the best landscapers in Omaha, but
                "one of the best" is invisible when every competitor looks identical from the
                road.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                So Jay made a decision most people in his trade never will. He trusted a partner
                to take him somewhere uncomfortable. To stop looking like everyone else. To
                become a landmark instead of a logo.
              </p>
              <p className="text-base md:text-lg font-bold text-black leading-relaxed">
                This is what happened next.
              </p>
            </div>
            <div className="relative overflow-visible">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src="/images/jay-moore-portrait.jpg"
                  alt="Jay Moore in his plant nursery wearing a branded Jay Moore Landscaping shirt"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <img
                src="/images/jay-moore-signature.png"
                alt=""
                aria-hidden="true"
                className="absolute pointer-events-none select-none"
                style={{
                  bottom: "-3.5rem",
                  left: "-3rem",
                  width: "83%",
                  transform: "rotate(3deg)",
                  opacity: 1,
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem + Who Is Jay ────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] pt-24 md:pt-32 pb-24 md:pb-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* Left — two text blocks with flower divider between them */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-5">
                The Problem
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-8"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Two Landscapers.<br />One Name.<br />One Color to Settle It.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-6">
                The landscaping industry has a sameness problem — green logos, generic trucks,
                yard signs that vanish into the lawn.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-6">
                Jay had it worse: there was already another Moore Landscaping in Omaha. Same
                name, same city, same category.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">
                You can't out-logo a name collision. You need something people see from across
                the street and know instantly which Moore is which.
              </p>
              <p
                className="text-xl md:text-2xl font-bold text-black leading-snug border-l-[3px] pl-5"
                style={{ borderColor: FUCHSIA }}
              >
                "Not 'look distinctive.' Be unmistakable."
              </p>

              {/* Flower divider — left column only */}
              <img
                src="/images/jay-moore-flowers.png"
                alt=""
                aria-hidden="true"
                className="w-full select-none pointer-events-none"
                style={{ maxWidth: "380px", mixBlendMode: "multiply", marginTop: "3rem", marginBottom: "3.5rem" }}
              />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-5">
                Who They Are
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-8"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Jay Doesn't Sell.<br />He Listens.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-6">
                The outside of your home is one of the most important rooms in it, and Jay treats
                it that way. He's part psychologist, part anthropologist — he asks how you
                actually live, who hosts, who needs privacy, who's drowning in maintenance, then
                designs around the answer.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">
                Forty years of knowledge. A crew that's been together for twenty. You don't get
                that at the bottom of the market, and Jay's clients know it.
              </p>
              <p
                className="text-xl md:text-2xl font-bold text-black leading-snug border-l-[3px] pl-5"
                style={{ borderColor: FUCHSIA }}
              >
                "The best salesman alive.<br />Because he never sells anyone."
              </p>
            </div>

            {/* Right — 2×2 grid on mobile, stacked column on desktop */}
            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-5 lg:pt-12">
              <div className="rounded-xl lg:rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/jay-moore-truck.jpg"
                  alt="Jay Moore Landscaping fuchsia-wrapped flatbed truck with American flag — Omaha's most recognizable landscaping brand"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl lg:rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[16/9]">
                <img
                  src="/images/jay-moore-sign-closeup.jpg"
                  alt="Jay Moore Landscaping illuminated sign on fuchsia building at sunset — bold brand identity in Omaha Nebraska"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="rounded-xl lg:rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/jay-moore-headshot.jpg"
                  alt="Jay Moore, owner of Jay Moore Landscaping in Omaha Nebraska, photographed among lush greenery"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="rounded-xl lg:rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[16/9]">
                <img
                  src="/images/jay-moore-pergola.jpg"
                  alt="Wooden pergola at sunset with fuchsia sky — Jay Moore Landscaping craftsmanship, Omaha Nebraska"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── The Solution ────────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">
                The Solution
              </span>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Own a Color.<br />Own the Market.
              </h2>
              <p className="text-base md:text-lg text-[#aaa] leading-relaxed mb-5">
                Every landscaper fights over green, so we took the one color nobody owns.
                Fuchsia. Pantone 227 C. Not pink-pink — the deep, confident kind a luxury brand
                picks. Against a green lawn, it's a beacon.
              </p>
              <p className="text-base md:text-lg text-[#aaa] leading-relaxed">
                One rule from there: every choice makes the color stronger or weaker. We only
                ever made it stronger.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/jay-moore-brand-system.jpg"
                alt="Jay Moore Landscaping brand system — Pantone 227 C fuchsia mailer with magnolia illustration and color wheel"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Bringing It to Life ─────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">
              Bringing It to Life
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              We Painted the Building.<br />Then We Made It Art.
            </h2>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
              We started big — painted Jay's entire building fuchsia and raised a sign on it off
              an interstate with tens of thousands of drivers a day. Permanent. Free advertising
              for the next decade.
            </p>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
              Then we drew a magnolia, by hand, because craft signals craft and craft is what Jay
              sells. It wraps the trucks, frames the doors, and fixes the one thing every
              landscaper gets wrong: the yard sign.
            </p>
            <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">
              Most are eyesores a homeowner tolerates. Jay's is a small piece of art a homeowner
              actually wants on the lawn.
            </p>
            <p
              className="text-xl md:text-2xl font-bold text-black leading-snug border-l-[3px] pl-5"
              style={{ borderColor: FUCHSIA }}
            >
              "Don't fight to put your brand on people's lawns. Make a brand they want there."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="/images/jay-moore-building.jpg"
                alt="Jay Moore Landscaping fuchsia-painted building with magnolia sign surrounded by professional landscaping — Omaha Nebraska brand identity"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="/images/jay-moore-yard-sign.jpg"
                alt="Jay Moore Landscaping branded yard sign with fuchsia magnolia illustration on a professionally landscaped Omaha home — custom landscaping signage that homeowners actually want on their lawn"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <Placeholder label="Magnolia yard sign on a finished lawn" ratio="aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* ── The Program ─────────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">
              The Program
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              A Brand You Can Hold.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {[
              {
                label: "The Mail",
                title: "Seven mailers in two years.",
                body: "Beautiful design, soft-touch finish, real photo shoots. Hand-delivered by the USPS, who, for the record, have some of the strongest calves in the country. You can scroll past an ad. You can't scroll past your mailbox.",
              },
              {
                label: "The Welcome",
                title: "A luxe denim journal at the first meeting.",
                body: "Because Jay wants you taking notes and asking questions. The best designs come from collaboration, not a menu.",
              },
              {
                label: "The Button",
                title: "Jay pushes a button. We handle the rest.",
                body: "When the plans are ready, that single click triggers a fulfillment action handled entirely by Merch Club — a custom floral package ships to the client's door with drinkware, a to-do list, a fuchsia marker, and a note: \"the level of care you're about to receive will arrive once you're ready to seed the future.\"",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-black/5">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full inline-block mb-5 text-white"
                  style={{ backgroundColor: FUCHSIA }}
                >
                  {item.label}
                </span>
                <h3
                  className="text-2xl md:text-3xl font-black tracking-tight text-black mb-3 leading-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-base text-[#444] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mb-14 max-w-3xl">
            <p
              className="text-xl md:text-2xl font-bold text-black leading-snug border-l-[3px] pl-5"
              style={{ borderColor: FUCHSIA }}
            >
              "Recognition isn't built in one impression. It's built in seven."
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Placeholder
              label="Mailer collection fanned to show soft-touch finish"
              ratio="aspect-square"
            />
            <Placeholder label="Denim journal at first client meeting" ratio="aspect-square" />
            <Placeholder
              label="Floral package unboxed — drinkware, to-do list, fuchsia marker"
              ratio="aspect-square"
            />
            <Placeholder label="Behind-the-scenes photo shoot frame" ratio="aspect-square" />
          </div>
        </div>
      </section>

      {/* ── The Impact ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">
                The Impact
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                The Phone Rings to Say Thanks. The Neighbor Changed Colors.
              </h2>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                People call Jay to compliment the color — not for a quote. They say it makes
                Omaha look bold and sophisticated to people driving past on the interstate.
                That's a landscaping company becoming part of how a city sees itself.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
                Then there's the neighbor: Ideal Pure Water, a family-owned Omaha business
                delivering water for more than a hundred years, kept hearing the same directions
                to their own door: "Oh yeah, next to the beautiful pink building." So they changed
                their brand color to pink and put up a pink billboard on the same interstate.
              </p>
              <p className="text-base md:text-lg text-[#444] leading-relaxed mb-8">
                A century-old company looked at Jay's color and decided the smart move wasn't to
                fight it. It was to join it.
              </p>
              <p className="text-sm text-[#aaa] italic leading-relaxed mb-10">
                (We're still working on getting them to paint the actual building. We're
                confident the neighborhood is about to send a lot of emails.)
              </p>
              <p className="text-xl md:text-2xl font-bold text-black leading-snug">
                "If you can't beat us, join us. And hey, it works."
              </p>
            </div>
            <div className="space-y-8">
              <p
                className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: FUCHSIA }}
              >
                "Oh yeah, next to the beautiful pink building."
              </p>
              <Placeholder
                label="Jay's fuchsia building + Ideal's pink billboard — same interstate, one frame"
                ratio="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Bad Ideas Tax ───────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">
              The Bad Ideas Tax
            </span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              The Cost of Our Best Ideas?<br />You Hear the Bad Ones Too.
            </h2>
            <p className="text-base md:text-lg text-[#aaa] leading-relaxed">
              Every great idea has a graveyard of bad ones behind it. We don't hide ours. We
              pitch them. Jay says no. Usually.
            </p>
          </div>

          <ol className="space-y-0 border-t border-white/10">
            {badIdeas.map((idea) => (
              <li
                key={idea.n}
                className="grid grid-cols-1 lg:grid-cols-[3rem_1fr_14rem] gap-5 lg:gap-10 py-8 border-b border-white/10 items-start"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-white/30 pt-1.5">
                  {idea.n}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.25em] px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: FUCHSIA }}
                    >
                      Bad Idea #{idea.n}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}
                    >
                      {idea.title}
                    </h3>
                  </div>
                  <p className="text-base text-[#888] leading-relaxed">{idea.body}</p>
                </div>
                <div className="lg:text-right">
                  <p
                    className={`text-sm italic leading-relaxed ${idea.reactionFuchsia ? "font-bold" : "text-white/40"}`}
                    style={idea.reactionFuchsia ? { color: FUCHSIA } : {}}
                  >
                    "{idea.reaction}"
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-base md:text-lg text-[#aaa] leading-relaxed max-w-2xl">
            There are more. Every Tuesday we walk in with "I had an idea last night," and Jay
            reaches for his coffee. That's the partnership.
          </p>
        </div>
      </section>

      {/* ── Closing + CTA ───────────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">
            The Lesson
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            We're the Physical Layer of Every Brand.
          </h2>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-5">
            Pick a lane. Own a surface. Make it impossible to forget.
          </p>
          <p className="text-base md:text-lg text-[#444] leading-relaxed mb-10">
            Jay picked fuchsia. Every truck, every sign, every mailer, every floral package
            reinforced the same thing. His competitor started copying the color. His neighbor
            rebranded. That's what brand ownership looks like when it's done right.
          </p>
          <div className="border-t border-black/10 pt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setProjectModalOpen(true)}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-black text-white text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-[#333] transition-colors"
            >
              Start Your Project
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>
            <Link
              href="/case-studies"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-black/15 text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-black hover:text-white transition-colors"
            >
              All Case Studies
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
