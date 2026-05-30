import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

const reachOptions = [
  {
    title: "Project Inquiries",
    desc: "Starting a new program, single event, or company-wide rollout? Tell us what you're planning and we'll route you to the right strategist.",
    contact: "chris@merchclub.com",
    href: "mailto:chris@merchclub.com?subject=New%20Project%20Inquiry",
    icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
  },
  {
    title: "Partnerships & Vendors",
    desc: "Brands, decorators, fulfillment partners, or agencies looking to collaborate — we vet every relationship for quality and reliability.",
    contact: "partners@merchclub.com",
    href: "mailto:partners@merchclub.com?subject=Partnership%20Inquiry",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
  {
    title: "Careers",
    desc: "Builders, account leads, designers, production coordinators — we're always interested in talking to people who care about the craft.",
    contact: "careers@merchclub.com",
    href: "mailto:careers@merchclub.com?subject=Careers%20at%20Merch%20Club",
    icon: "M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-4.073m16.5 0a24.301 24.301 0 01-4.5 1.078m-9 0a24.301 24.301 0 01-4.5-1.078m9 1.078a23.847 23.847 0 014.5 0M21 12.75a9 9 0 00-18 0",
  },
  {
    title: "Press & Media",
    desc: "Writing about branded merchandise, the industry, or our work? We respond to media requests within one business day.",
    contact: "press@merchclub.com",
    href: "mailto:press@merchclub.com?subject=Press%20Inquiry",
    icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
  },
];

const faqs = [
  { q: "How quickly will I hear back?", a: "Within one business day for project inquiries, and within hours during business hours. If your timeline is tight, call us directly — we triage by deadline." },
  { q: "Do I need to know what I want?", a: "No. Most clients arrive with a goal, an audience, or a deadline — and we work backward from there. The strategy call is included." },
  { q: "Where do you operate?", a: "We're headquartered in Omaha, Nebraska, with national fulfillment and direct-to-venue, direct-to-jobsite, and direct-to-employee shipping anywhere in the U.S." },
  { q: "Do you have minimum order quantities?", a: "Most of our programs assume a real production run, but we scope to fit. For programs with kitting or rollouts, we'll right-size to your audience." },
  { q: "Can we tour your facility or meet in person?", a: "Yes — we host clients regularly in Omaha and travel for kickoff meetings on larger programs. Just ask." },
];

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", topic: "Project Inquiry", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const PAGE_URL = "https://merchclub.com/contact";
  const PAGE_IMG = "https://merchclub.com/opengraph.jpg";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": PAGE_URL,
      "url": PAGE_URL,
      "name": "Contact Merch Club",
      "description": "Talk to the Merch Club team. Project inquiries, partnerships, press, and careers — we respond within one business day.",
      "inLanguage": "en-US",
      "isPartOf": { "@type": "WebSite", "name": "Merch Club", "url": "https://merchclub.com" },
      "primaryImageOfPage": { "@type": "ImageObject", "url": PAGE_IMG }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Merch Club",
      "url": "https://merchclub.com",
      "logo": "https://merchclub.com/opengraph.jpg",
      "telephone": "+1-531-777-0347",
      "email": "chris@merchclub.com",
      "address": { "@type": "PostalAddress", "addressLocality": "Omaha", "addressRegion": "NE", "postalCode": "68102", "addressCountry": "US" },
      "contactPoint": [
        { "@type": "ContactPoint", "telephone": "+1-531-777-0347", "contactType": "sales", "email": "chris@merchclub.com", "areaServed": "US", "availableLanguage": ["en"] },
        { "@type": "ContactPoint", "contactType": "partnerships", "email": "partners@merchclub.com", "areaServed": "US", "availableLanguage": ["en"] },
        { "@type": "ContactPoint", "contactType": "human resources", "email": "careers@merchclub.com", "areaServed": "US", "availableLanguage": ["en"] },
        { "@type": "ContactPoint", "contactType": "press", "email": "press@merchclub.com", "areaServed": "US", "availableLanguage": ["en"] }
      ],
      "sameAs": ["https://www.facebook.com/MerchClubPro","https://www.instagram.com/merchclub_ig/"]
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://merchclub.com/#localbusiness",
      "name": "Merch Club",
      "image": PAGE_IMG,
      "url": "https://merchclub.com",
      "telephone": "+1-531-777-0347",
      "email": "chris@merchclub.com",
      "priceRange": "$$-$$$",
      "address": { "@type": "PostalAddress", "addressLocality": "Omaha", "addressRegion": "NE", "postalCode": "68102", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 41.2565, "longitude": -95.9345 },
      "areaServed": [
        { "@type": "Country", "name": "United States" },
        { "@type": "State", "name": "Nebraska" },
        { "@type": "State", "name": "Iowa" },
        { "@type": "State", "name": "Kansas" },
        { "@type": "State", "name": "Missouri" },
        { "@type": "State", "name": "South Dakota" }
      ],
      "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" }],
      "sameAs": ["https://www.facebook.com/MerchClubPro","https://www.instagram.com/merchclub_ig/"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
    },
    {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merchclub.com/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": PAGE_URL }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black pb-20 lg:pb-0">
      <SEO
        title="Contact Merch Club"
        description="Talk to the Merch Club team. Project inquiries, partnerships, press, and careers — we respond within one business day. Headquartered in Omaha, serving teams nationwide."
        path="/contact"
        image={PAGE_IMG}
        imageAlt="Contact the Merch Club team"
        keywords="contact merch club, branded merchandise contact, omaha merch agency, merch club phone, merch club email, custom apparel quote, branded merchandise quote, partnership inquiry"
        jsonLd={jsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>Contact Merch Club</h1>
          <p>Talk to the Merch Club team. We respond within one business day.</p>
          <h2>Phone</h2>
          <p><a href="tel:+15317770347">+1 531-777-0347</a></p>
          <h2>Email</h2>
          <ul>
            <li>Project inquiries: <a href="mailto:chris@merchclub.com">chris@merchclub.com</a></li>
            <li>Partnerships: <a href="mailto:partners@merchclub.com">partners@merchclub.com</a></li>
            <li>Careers: <a href="mailto:careers@merchclub.com">careers@merchclub.com</a></li>
            <li>Press: <a href="mailto:press@merchclub.com">press@merchclub.com</a></li>
          </ul>
          <h2>Headquarters</h2>
          <p>Omaha, Nebraska, United States</p>
          <h2>Hours</h2>
          <p>Monday–Friday, 8:00 AM – 6:00 PM CT</p>
        </div>
      </noscript>
      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />


      <section className="bg-[#0a0a0a] text-white pt-20 md:pt-28 pb-16 md:pb-24 px-8 md:px-16 lg:px-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} theme="dark" className="mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Get in Touch</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Let's Build Something<br /><span className="text-[#888]">Worth Wearing.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base md:text-lg text-[#aaa] leading-relaxed max-w-md">
                Project inquiries, partnerships, press, careers — pick the lane that fits and we'll get back to you within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <RevealItem>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Tell Us What You're Planning</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] text-black mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Send a Message.<br /><span className="text-[#888]">We'll Take It From Here.</span>
              </h2>
              <p className="text-base text-[#666] leading-relaxed mb-8 max-w-xl">
                You don't need to have it all figured out. The basics are enough — we'll bring the strategy.
              </p>
            </RevealItem>

            <RevealItem delay={100}>
              {submitted ? (
                <div className="border border-black/10 rounded-2xl p-10 md:p-14 bg-[#fafafa]">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mb-6">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Message received.</h3>
                  <p className="text-base text-[#666] leading-relaxed mb-6 max-w-md">
                    Thanks, {form.name || "we got it"}. A strategist will reach out within one business day. If your timeline is tighter than that, call us at <a href="tel:+15317770347" className="text-black font-semibold underline">+1 531-777-0347</a>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", phone: "", topic: "Project Inquiry", message: "" }); }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-[#666] transition-colors"
                  >
                    Send another message
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">Name *</label>
                      <input id="contact-name" name="name" type="text" required value={form.name} onChange={handleChange}
                        className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/40 focus:bg-white transition-colors" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">Email *</label>
                      <input id="contact-email" name="email" type="email" required value={form.email} onChange={handleChange}
                        className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/40 focus:bg-white transition-colors" placeholder="you@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-company" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">Company</label>
                      <input id="contact-company" name="company" type="text" value={form.company} onChange={handleChange}
                        className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/40 focus:bg-white transition-colors" placeholder="Company name" />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">Phone</label>
                      <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                        className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/40 focus:bg-white transition-colors" placeholder="(optional)" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-topic" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">What's this about?</label>
                    <select id="contact-topic" name="topic" value={form.topic} onChange={handleChange}
                      className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-black focus:outline-none focus:border-black/40 focus:bg-white transition-colors appearance-none">
                      <option>Project Inquiry</option>
                      <option>Partnership</option>
                      <option>Careers</option>
                      <option>Press</option>
                      <option>Something Else</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">Message *</label>
                    <textarea id="contact-message" name="message" required rows={5} value={form.message} onChange={handleChange}
                      className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3.5 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/40 focus:bg-white transition-colors resize-none" placeholder="What are you looking to build? Audience, timeline, goal — whatever you've got." />
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button type="submit" className="inline-flex items-center justify-center gap-2 bg-black text-white text-sm font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-[#222] transition-colors">
                      Send Message
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </button>
                    <p className="text-[11px] text-[#888]">We respond within one business day. No spam, ever.</p>
                  </div>
                </form>
              )}
            </RevealItem>
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <RevealItem delay={150}>
              <div className="bg-[#0a0a0a] text-white rounded-2xl p-8 md:p-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] block mb-5">Direct Lines</span>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1">Phone</p>
                    <a href="tel:+15317770347" className="text-2xl md:text-3xl font-black text-white hover:text-[#bbb] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>+1 531-777-0347</a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1">Email</p>
                    <a href="mailto:chris@merchclub.com" className="text-xl md:text-2xl font-black text-white hover:text-[#bbb] transition-colors break-all" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>chris@merchclub.com</a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1">Headquarters</p>
                    <p className="text-base text-white leading-snug">Omaha, Nebraska<br />United States</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1">Hours</p>
                    <p className="text-base text-white leading-snug">Mon–Fri · 8:00 AM – 6:00 PM CT</p>
                  </div>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={250}>
              <div className="border border-black/10 rounded-2xl p-7 md:p-8 bg-[#eeece5]">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-black text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>Average Response: Under 4 Hours</h3>
                    <p className="text-sm text-[#555] leading-relaxed">During business hours. After hours and weekends, by start of next business day.</p>
                  </div>
                </div>
              </div>
            </RevealItem>

            <RevealItem delay={350}>
              <div className="border border-black/10 rounded-2xl p-7 md:p-8 bg-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Follow Along</span>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/MerchClubPro" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/merchclub_ig/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                </div>
              </div>
            </RevealItem>
          </aside>
        </div>
      </section>

      <section className="bg-white py-2 px-0 overflow-hidden border-b border-black/10">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 mx-6">
              {["Strategy","Design","Sourcing","Production","Kitting","Distribution","Apparel","Giveaways"].map((word, j) => (
                <span key={j} className="flex items-center gap-6">
                  <span className="text-sm md:text-base font-black uppercase tracking-[0.15em] text-black/80" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem" }}>{word}</span>
                  <img src={cloverImg} alt="" className="h-4 w-4 opacity-30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Pick a Lane</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Other Ways<br /><span className="text-[#888]">to Reach Us.</span>
            </h2>
            <p className="text-base md:text-lg text-[#666] max-w-2xl mb-16 leading-relaxed">
              Routing your message to the right inbox gets you a faster, sharper answer.
            </p>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reachOptions.map((opt, i) => (
              <RevealItem key={i} delay={i * 100}>
                <a href={opt.href} className="group block border border-black/10 rounded-2xl p-8 md:p-10 hover:border-black hover:-translate-y-1 transition-all duration-300 h-full bg-white">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={opt.icon} /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>{opt.title}</h3>
                      <p className="text-base text-[#666] leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-5 border-t border-black/10">
                    <span className="text-sm font-semibold text-black break-all">{opt.contact}</span>
                    <span className="shrink-0 ml-3 w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                    </span>
                  </div>
                </a>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 md:py-24 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <RevealItem>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Where We Operate</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Based in Omaha.<br /><span className="text-[#888]">Built for Teams Everywhere.</span>
            </h2>
            <p className="text-base md:text-lg text-[#aaa] max-w-2xl mb-12 leading-relaxed">
              Our headquarters sits in the middle of the country — which means national fulfillment, direct-to-venue shipping, and direct-to-employee distribution land where they need to, when they need to.
            </p>
          </RevealItem>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 pt-8 border-t border-white/10">
            {[
              { label: "States Served", value: "50" },
              { label: "Headquarters", value: "Omaha, NE" },
              { label: "Response Time", value: "< 4 hr" },
              { label: "Programs Run", value: "1,200+" },
            ].map((stat, i) => (
              <RevealItem key={i} delay={i * 80}>
                <div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{stat.value}</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#888] mt-3">{stat.label}</div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-20 md:py-24 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <RevealItem>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#888] border border-black/15 rounded-full px-4 py-1.5 mb-5">Before You Reach Out</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Frequently Asked Questions
              </h3>
            </div>
          </RevealItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <div>
              {faqs.filter((_, i) => i % 2 === 0).map((faq, i) => {
                const idx = i * 2;
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-t border-black/10">
                    <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => setOpenFaq(isOpen ? null : idx)}>
                      <span className="text-base md:text-lg font-medium text-black pr-4">{faq.q}</span>
                      <span className={`text-xl text-black/50 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? "240px" : "0", opacity: isOpen ? 1 : 0 }}>
                      <p className="text-sm text-[#666] pb-5 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {faqs.filter((_, i) => i % 2 === 1).map((faq, i) => {
                const idx = i * 2 + 1;
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-t border-black/10">
                    <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => setOpenFaq(isOpen ? null : idx)}>
                      <span className="text-base md:text-lg font-medium text-black pr-4">{faq.q}</span>
                      <span className={`text-xl text-black/50 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? "240px" : "0", opacity: isOpen ? 1 : 0 }}>
                      <p className="text-sm text-[#666] pb-5 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <RevealItem>
            <img src={cloverImg} alt="" className="h-12 mx-auto mb-6 opacity-40" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Skip the Form.<br /><span className="text-[#888]">Start a Project.</span>
            </h2>
            <p className="text-base text-[#888] leading-relaxed mb-8 max-w-lg mx-auto">
              If you already know what you're building, jump straight into the project intake.
            </p>
          </RevealItem>
          <RevealItem delay={200}>
            <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-gray-200 transition-colors">
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </button>
          </RevealItem>
        </div>
      </section>
      <SiteFooter />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a] border-t border-white/10 px-4 py-3 flex items-center gap-2 shadow-2xl" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <a href="tel:+15317770347" className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Call Merch Club">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
        </a>
        <button onClick={() => setProjectModalOpen(true)} className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full hover:bg-gray-200 transition-colors">
          Start a Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
        </button>
      </div>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
