import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import { StartProjectModal } from "@/components/start-project-modal";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import team1Img from "@assets/1_1775229252465.png";
import team2Img from "@assets/2_1775229252466.png";
import team3Img from "@assets/3_1775229252466.png";
import team4Img from "@assets/4_1775229252466.png";
import missionImg from "@assets/0e8baef1-5aa2-4e3d-9acc-6eedba43547b_1776173642639.png";
import featuredCrewImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1776180821018.png";
import wideTeamImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1776180821018.png";
import brandAccessBank from "@assets/brand_accessbank_nobg.png";
import brandPaylocity from "@assets/brand_paylocity_nobg.png";
import brandFraserStryker from "@assets/brand_fraserstryker_nobg.png";
import brandKomen from "@assets/brand_komen_nobg.png";
import brandOnestaff from "@assets/brand_onestaff_nobg.png";

const trustedBrands = [
  { name: "OneStaff Medical", logo: brandOnestaff },
  { name: "Access Bank", logo: brandAccessBank },
  { name: "Paylocity", logo: brandPaylocity },
  { name: "Fraser Stryker", logo: brandFraserStryker },
  { name: "Susan G. Komen", logo: brandKomen },
];

function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealItem({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "scale" }) {
  const { ref, visible } = useRevealOnScroll();
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    scale: "scale(0.85)",
  };
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0) translateX(0) scale(1)" : transforms[direction], transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const { ref, visible } = useRevealOnScroll(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    setOffset(center * speed * -1);
  }, [speed]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return { ref, offset };
}

function ParallaxImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const { ref, offset } = useParallax(0.1);
  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <img src={src} alt={alt} className="w-full h-[120%] object-cover object-center" style={{ transform: `translateY(${offset}px)`, transition: "transform 0.1s linear" }} />
    </div>
  );
}

const teamMembers = [
  { img: team1Img, name: "Jason Olsen", role: "Sales", email: "jason@merchclub.com" },
  { img: team2Img, name: "Chris Harwood", role: "CEO", email: "chris@merchclub.com" },
  { img: team3Img, name: "Chelsea Vogel", role: "Vice President of Sales", email: "chelsea@merchclub.com" },
  { img: team4Img, name: "Jay Collins", role: "Production Manager", email: "jay@merchclub.com" },
];

const values = [
  { icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", title: "Quality Over Quantity", desc: "Every product, every detail, every delivery — we don't cut corners. If it has your logo, it should be your best." },
  { icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z", title: "People First", desc: "Behind every order is a relationship. We build partnerships, not transactions — and that starts with how we treat our own team." },
  { icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", title: "Move Fast, Stay Sharp", desc: "Tight deadlines don't scare us. We've built systems that let us deliver premium work at speed — without sacrificing craft." },
  { icon: "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z", title: "Full Ownership", desc: "We don't hand off and disappear. From strategy through delivery, one team owns it end to end — so nothing falls through the cracks." },
];

const testimonials = [
  { name: "Bill Corriston", text: "Chris and his team at Merch Club have been fantastic to work with. Launching a company and developing brand awareness has been made so much easier having Merch Club in our corner! Pricing, communication, design support are all 10/10!" },
  { name: "Bailey Sullivan", text: "The Merch Club has been SUCH an amazing addition to our small business over these past 2 years with them! They've created custom hats, tees, safety vests, sunglasses, and more — and have made our apparel buying process SO much easier!" },
  { name: "Andrew George", text: "Working with Chris and Jason has been absolutely awesome. Merch Club offers tons of products, a great user experience, and it's an awesome solution for any business owner looking for branded merchandise." },
  { name: "Lane Hickenbottom", text: "Merch Club goes above and beyond — offering exciting products that elevate your brand and get people talking. Chris is an amazing idea guy who comes up with the coolest ways to get your brand out there. Five stars all the way!" },
  { name: "matt beck", text: "If you want the absolute best when it comes to your company logo, your apparel and your brand in general, there's no other choice than Merch Club. They took the time to design a logo that was literally perfect for my business." },
  { name: "Nickole Duker", text: "Merch Club is the best! For years Chris has helped get our company great promotional items at great prices. They are super responsive and great with a deadline. We've tried many others — none compare." },
];

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const aboutJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Merch Club",
      "url": "https://merchclub.replit.app",
      "logo": "https://merchclub.replit.app/opengraph.jpg",
      "telephone": "+1-531-777-0347",
      "email": "hello@merchclub.com",
      "address": { "@type": "PostalAddress", "addressCountry": "US" },
      "sameAs": [
        "https://www.facebook.com/MerchClubPro",
        "https://www.instagram.com/merchclub_ig/"
      ],
      "employee": teamMembers.map(m => ({
        "@type": "Person",
        "name": m.name,
        "jobTitle": m.role,
        "email": m.email
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "url": "https://merchclub.replit.app/about",
      "name": "About Merch Club",
      "description": "Meet the team behind Merch Club — a full-service branded merchandise partner built on quality, speed, and relationships that last.",
      "inLanguage": "en-US",
      "isPartOf": { "@type": "WebSite", "name": "Merch Club", "url": "https://merchclub.replit.app" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merchclub.replit.app/" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://merchclub.replit.app/about" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="About Us"
        description="Meet the team behind Merch Club. We're a full-service branded merchandise partner built on quality, speed, and relationships that last across every program we run."
        path="/about"
        imageAlt="The Merch Club team"
        keywords="about merch club, merch club team, branded merchandise agency, custom merch company team, full-service merch partner, merch club leadership"
        jsonLd={aboutJsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>About Merch Club</h1>
          <p>
            Merch Club is a full-service branded merchandise partner. We handle strategy, design,
            proofing, production, kitting, and nationwide distribution for teams that take their
            brand seriously.
          </p>
          <h2>Our Team</h2>
          <ul>
            {teamMembers.map((m) => (
              <li key={m.email}><strong>{m.name}</strong> — {m.role} (<a href={`mailto:${m.email}`}>{m.email}</a>)</li>
            ))}
          </ul>
          <h2>Our Values</h2>
          <ul>
            {values.map((v) => (
              <li key={v.title}><strong>{v.title}:</strong> {v.desc}</li>
            ))}
          </ul>
          <h2>What Clients Say</h2>
          {testimonials.map((t, i) => (
            <blockquote key={i}>"{t.text}" — <cite>{t.name}</cite></blockquote>
          ))}
          <h2>Contact</h2>
          <p>Phone: <a href="tel:+15317770347">+1 531-777-0347</a></p>
          <p><a href="/">Home</a> · <a href="/blog">Blog</a> · <a href="/industries/healthcare">Healthcare</a></p>
        </div>
      </noscript>

      <div className="hidden md:flex items-center justify-end gap-8 px-6 md:px-10 py-2 bg-[#222] border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em]">
        <a href="/" className="text-white transition-colors">MerchClub</a>
        <span className="text-white/20">|</span>
        <a href="https://trybrandini.com/" target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] hover:text-white transition-colors">Brandini</a>
        <span className="text-white/20">|</span>
        <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">ScrubClub</a>
      </div>
      <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-[#111] border-b border-white/10">
        <div className="flex items-center gap-6">
          <Link href="/"><img src={logoSrc} alt="Merch Club" className="h-8 object-contain invert" /></Link>
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <Link href="/" className="text-[#a3a3a3] hover:text-white transition-colors">Home</Link>
            <span className="text-white">About</span>
            <Link href="/blog" className="text-[#a3a3a3] hover:text-white transition-colors">Blog</Link>
            <a href="/#services" className="text-[#a3a3a3] hover:text-white transition-colors">Services</a>
            <Link href="/industries/healthcare" className="text-[#a3a3a3] hover:text-white transition-colors">Industries</Link>
            <a href="/#contact" className="text-[#a3a3a3] hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setProjectModalOpen(true)} className="hidden lg:inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
            Start a Project
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>
      </header>

      <section className="relative bg-[#0a0a0a] py-16 md:py-24 px-8 md:px-16 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-5xl mx-auto text-center">
          <img src={cloverImg} alt="Merch Club" className="h-16 md:h-20 mx-auto mb-6" />
          <RevealItem delay={0}>
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-5 py-1.5 mb-8">
              <div className="flex -space-x-2">
                {teamMembers.map((m) => (
                  <img key={m.email} src={m.img} alt={m.name} className="w-7 h-7 rounded-full object-cover border-2 border-[#0a0a0a] grayscale" />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white">5.0</span>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#888]">· 500+ teams trust us</span>
              </div>
            </div>
          </RevealItem>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#666] block mb-4">About Merch Club</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            We Make Brands<br /><span className="text-[#888]">Look Their Best.</span>
          </h1>
          <p className="text-base md:text-lg text-[#888] leading-relaxed max-w-2xl mx-auto">
            Merch Club is a full-service branded merchandise company built for teams that care about quality, consistency, and getting things done right. From strategy to delivery, we handle every detail.
          </p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] border-t border-white/5 py-10 md:py-12 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#555] mb-8">
            Brands that trust us
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-20 gap-y-6">
            {trustedBrands.map((brand) => (
              <img
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2">
              <RevealItem delay={0}>
                <div className="inline-flex items-center gap-2 border border-black/15 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black">The Problem — Why Merch Club</span>
                </div>
              </RevealItem>
              <RevealItem delay={80}>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Branded Merch That Actually<br />
                  <span className="text-[#9a9a9a]">Means Something.</span>
                </h2>
              </RevealItem>
              <RevealItem delay={140}>
                <p className="text-base md:text-lg text-[#555] leading-[1.7] mb-10 max-w-xl">
                  Too many great brands get represented by forgettable merch — cheap pens, faded prints, products that say the opposite of what a company stands for. Behind the scenes it's just as broken: vendor chaos, missed deadlines, spreadsheets stacked on spreadsheets. <span className="text-black font-semibold">We built Merch Club to fix that.</span>
                </p>
              </RevealItem>
              <RevealItem delay={200}>
                <button
                  onClick={() => setProjectModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-black text-white text-sm font-bold px-7 py-4 rounded-full hover:bg-[#222] hover:gap-4 transition-all"
                >
                  Start a Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </button>
              </RevealItem>
            </div>

            <RevealItem delay={200} className="lg:w-1/2 w-full" direction="right">
              <div className="relative mx-auto w-full max-w-[560px] aspect-square">
                <div className="absolute inset-0 rounded-full overflow-hidden bg-black">
                  <ParallaxImage src={missionImg} alt="OneStaff branded merchandise" className="w-full h-full" />
                </div>
                <div className="absolute top-4 left-4 md:top-6 md:left-6 w-28 h-28 md:w-36 md:h-36 rounded-full bg-black text-white flex flex-col items-center justify-center text-center shadow-2xl">
                  <span className="text-2xl md:text-3xl font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    500+
                  </span>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 mt-1.5 leading-tight">
                    Brands<br />Served
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-white border border-black/10 rounded-2xl px-5 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-black">5.0 rated</span>
                  </div>
                </div>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-5">
          <RevealItem delay={0} direction="right">
            <span className="inline-block bg-black text-white text-3xl md:text-5xl lg:text-6xl font-black px-6 md:px-10 py-2 md:py-3 rotate-[-2deg] hover:rotate-0 transition-transform duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
              No Vendor Chaos.
            </span>
          </RevealItem>
          <RevealItem delay={150} direction="left">
            <span className="inline-block bg-black text-white text-3xl md:text-5xl lg:text-6xl font-black px-6 md:px-10 py-2 md:py-3 rotate-[1deg] hover:rotate-0 transition-transform duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
              No Missed Details.
            </span>
          </RevealItem>
          <RevealItem delay={300} direction="right">
            <span className="inline-block bg-black text-white text-3xl md:text-5xl lg:text-6xl font-black px-6 md:px-10 py-2 md:py-3 rotate-[-1deg] hover:rotate-0 transition-transform duration-300" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
              No Wasted Spend.
            </span>
          </RevealItem>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealItem delay={0}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Our Mission</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              One Partner. <span className="text-[#888]">Total Execution.</span>
            </h2>
          </RevealItem>
          <RevealItem delay={100}>
            <p className="text-base md:text-lg text-[#555] leading-[1.8] mb-6">
              Our mission is to turn branded merchandise into a system that works and a tool that builds real brand presence. We partner with marketing and operations teams to plan, design, produce, and deliver merch that is consistent, scalable, and aligned from start to finish.
            </p>
          </RevealItem>
          <RevealItem delay={150}>
            <p className="text-base md:text-lg text-[#555] leading-[1.8] mb-6">
              Every product we source, every kit we build, every shipment we send is designed to make your brand look like it knows exactly what it's doing.
            </p>
          </RevealItem>
          <RevealItem delay={200}>
            <p className="text-base md:text-lg text-[#555] leading-[1.8]">
              Based in Omaha. Built to serve teams everywhere.
            </p>
          </RevealItem>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealItem delay={0}>
            <div className="text-center mb-20">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#666] block mb-4">Why Us</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                What We Stand For
              </h2>
            </div>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <RevealItem key={i} delay={i * 150}>
                <div className="border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed">{v.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealItem delay={0}>
            <div className="text-center mb-20">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">The Crew</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Meet the Team
              </h2>
            </div>
          </RevealItem>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {teamMembers.map((member, i) => (
              <RevealItem key={i} delay={i * 150} direction="scale">
                <a href={`mailto:${member.email}`} className="text-center group block">
                  <div className="relative mb-6 mx-auto w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#888] mt-1 uppercase tracking-[0.1em] font-medium">{member.role}</p>
                </a>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem delay={0}>
            <div className="text-center mb-14 md:mb-20">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Testimonials</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                What Our Clients Say
              </h2>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-stretch">
            <RevealItem delay={100} direction="left" className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[560px] bg-black">
                <img src={featuredCrewImg} alt="Merch Club crew" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
                    The Merch Club Crew
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Real teams. Real work.
                  </div>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={200} direction="right" className="lg:col-span-2">
              <div className="relative bg-white border border-black/10 rounded-2xl p-8 md:p-10 h-[420px] md:h-[560px] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-sm font-bold text-white">
                    {testimonials[activeTestimonial].name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-black block leading-tight capitalize">{testimonials[activeTestimonial].name}</span>
                    <span className="text-[11px] text-[#888] uppercase tracking-[0.15em]">Verified Client</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-bold text-black ml-2">5.0</span>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  {testimonials.map((t, i) => (
                    <p
                      key={i}
                      className="absolute inset-0 text-base md:text-lg text-[#333] leading-relaxed transition-all duration-500"
                      style={{ opacity: activeTestimonial === i ? 1 : 0, transform: activeTestimonial === i ? "translateY(0)" : "translateY(12px)" }}
                    >
                      "{t.text}"
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">{activeTestimonial + 1} / {testimonials.length}</span>
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? "bg-black w-6" : "bg-black/20 w-1.5 hover:bg-black/40"}`}
                        aria-label={`Show testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </RevealItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
            <RevealItem delay={100}>
              <div className="relative bg-black text-white rounded-2xl p-8 md:p-10 h-[260px] md:h-[300px] flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5" />
                <div className="relative">
                  <span className="block text-7xl md:text-8xl font-black tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    <CountUp target={500} suffix="+" duration={2200} />
                  </span>
                  <p className="text-base font-bold mt-3">Brands served</p>
                </div>
                <div className="relative">
                  <p className="text-xs text-white/60 leading-relaxed">
                    From local shops to multi-state networks — we've shipped programs for hundreds of teams.
                  </p>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={200}>
              <div className="relative rounded-2xl overflow-hidden h-[260px] md:h-[300px] bg-black group">
                <img src={wideTeamImg} alt="Merch Club work in action" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">In the field</span>
                  <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={300}>
              <div className="relative bg-black text-white rounded-2xl p-8 md:p-10 h-[260px] md:h-[300px] flex flex-col justify-between overflow-hidden">
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-white/10" />
                <div className="relative">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 block mb-3">Get in touch</span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Let's build your next program.
                  </h3>
                </div>
                <div className="relative flex items-center gap-3">
                  <button
                    onClick={() => setProjectModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Contact us
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <a href="tel:+15317770347" className="text-xs text-white/70 hover:text-white transition-colors font-medium">
                    or call (531) 777-0347
                  </a>
                </div>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { target: 1200, suffix: "+", label: "Kits Shipped" },
              { target: 48, suffix: "", label: "States Reached" },
              { target: 500, suffix: "+", label: "Brands Served" },
              { target: 100, suffix: "%", label: "On-Time Delivery" },
            ].map((stat, i) => (
              <RevealItem key={i} delay={i * 150}>
                <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  <CountUp target={stat.target} suffix={stat.suffix} duration={2000 + i * 300} />
                </span>
                <p className="text-xs text-[#666] mt-2 uppercase tracking-[0.15em] font-medium">{stat.label}</p>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealItem delay={0}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.9] text-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Ready to Work Together?
            </h2>
          </RevealItem>
          <RevealItem delay={100}>
            <p className="text-base text-[#777] leading-relaxed mb-8 max-w-lg mx-auto">
              Whether you're launching a merch program, outfitting a team, or planning a branded campaign — we'd love to hear from you.
            </p>
          </RevealItem>
          <RevealItem delay={200}>
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-black text-white text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-[#333] transition-colors">
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </RevealItem>
        </div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-5">
              <img src={logoSrc} alt="Merch Club" className="h-10 w-auto mb-6 brightness-0 invert" />
              <p className="text-sm text-[#888] leading-relaxed max-w-sm mb-8">
                Full-service branded merchandise. From strategy to delivery, we handle every detail so your brand shows up right — every time.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/MerchClubPro" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#888] hover:text-white hover:border-white/40 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.instagram.com/merchclub_ig/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-[#888] hover:text-white hover:border-white/40 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>Services</h4>
              <ul className="space-y-3">
                {["Strategy", "Design", "Proofing", "Production", "Kitting", "Distribution"].map(item => (
                  <li key={item}><a href="#" className="text-sm text-[#666] hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>Company</h4>
              <ul className="space-y-3">
                {["About", "Case Studies", "Industries", "Process", "Contact", "Careers"].map(item => (
                  <li key={item}><a href="#" className="text-sm text-[#666] hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem" }}>Get 10% Off Your First Order</h4>
              <p className="text-xs text-[#666] mb-4 leading-relaxed">Join our newsletter for exclusive offers, new product drops, and merch inspiration.</p>
              <form onSubmit={e => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-[#555] focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-[#444] mt-3 leading-relaxed">By subscribing, you agree to our privacy policy. Unsubscribe anytime.</p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#444]">&copy; {new Date().getFullYear()} Merch Club. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
                <a key={item} href="#" className="text-xs text-[#444] hover:text-[#888] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
