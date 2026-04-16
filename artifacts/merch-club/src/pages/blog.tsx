import { useEffect, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import { StartProjectModal } from "@/components/start-project-modal";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";
import blogKittingImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1775835373159.png";
import blogPackagingImg from "@assets/Professional_promotional_packaging_shot_1775835373158.png";
import blogCityImg from "@assets/Merch_club_in_the_city_plaza_1775835373159.png";

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; author: string; role: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "callout"; text: string }
  | { type: "list"; heading: string; items: string[] };

export const blogPosts: {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
  content: ContentBlock[];
}[] = [
  {
    slug: "merch-program-strategy",
    tag: "Strategy",
    title: "Why Your Merch Program Needs a Strategy — Not Just a Vendor",
    excerpt: "Most companies treat branded merchandise like an afterthought. Here's why a strategic approach changes everything — from employee retention to brand perception.",
    date: "Apr 2, 2026",
    readTime: "6 min read",
    img: blogKittingImg,
    content: [
      {
        type: "paragraph",
        text: "Branded merchandise is one of the most underutilized tools in a company's marketing arsenal. Most organizations treat it like an afterthought — a last-minute order of logo'd pens before a trade show, or a rushed batch of t-shirts for a company event. But the brands that get merch right? They treat it like a strategic asset."
      },
      {
        type: "heading",
        text: "The Vendor Trap"
      },
      {
        type: "paragraph",
        text: "When you approach branded merchandise with a vendor mindset, you're essentially buying commodities. You're comparing prices on polo shirts, haggling over minimum order quantities, and hoping the logo placement looks decent when it arrives. There's no creative direction, no brand alignment, and no long-term thinking."
      },
      {
        type: "paragraph",
        text: "The result? A closet full of forgettable swag that nobody wants to wear. Employees shove the company hoodie to the back of their drawer. Clients politely accept the branded mug and leave it at the office. The investment is wasted — not because the products were bad, but because there was no strategy behind them."
      },
      {
        type: "quote",
        text: "The difference between merch that people wear proudly and merch that ends up in a donation bin comes down to one thing: strategic intent behind every decision.",
        author: "Merch Club Team",
        role: "Brand Strategy"
      },
      {
        type: "heading",
        text: "What a Strategic Approach Looks Like"
      },
      {
        type: "paragraph",
        text: "A merch strategy starts with understanding your brand's visual identity, your audience, and your goals. Are you trying to boost employee morale? Impress prospects at a conference? Reward loyal customers? Each of these scenarios calls for different products, different packaging, and different delivery methods."
      },
      {
        type: "stats",
        items: [
          { value: "73%", label: "of employees say branded gear boosts morale" },
          { value: "2.5x", label: "higher recall vs. digital-only campaigns" },
          { value: "89%", label: "of recipients keep merch for over a year" }
        ]
      },
      {
        type: "paragraph",
        text: "Strategic merch programs consider the full lifecycle: from concept and design through production, kitting, and distribution. They ensure every touchpoint — from the box it arrives in to the insert card inside — reinforces your brand story."
      },
      {
        type: "heading",
        text: "The ROI of Getting It Right"
      },
      {
        type: "paragraph",
        text: "Companies that invest in strategic merchandise programs see measurable returns. Employee engagement scores improve when people actually want to wear the gear. Brand recall increases when prospects receive a thoughtfully curated gift box instead of a generic stress ball. And repeat orders go up because the merch program becomes a reliable, scalable part of the marketing mix."
      },
      {
        type: "callout",
        text: "A strategic merch program doesn't cost more — it wastes less. Every dollar is intentional, every product is on-brand, and every delivery reinforces your story."
      },
      {
        type: "paragraph",
        text: "The difference between a vendor and a partner is the difference between ordering products and building a program. One is transactional. The other is transformational."
      },
    ]
  },
  {
    slug: "custom-kitting-brand-experience",
    tag: "Kitting",
    title: "The Hidden Cost of Unboxing: How Custom Kitting Elevates Brand Experience",
    excerpt: "A great product means nothing if the unboxing falls flat. We break down how thoughtful kitting turns a delivery into a brand moment.",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    img: blogPackagingImg,
    content: [
      {
        type: "paragraph",
        text: "You've invested in premium branded products. The quality is there. The design is sharp. But then it arrives in a plain brown box with crumpled paper stuffing and a packing slip that looks like it was printed in 1997. That's the hidden cost of ignoring the unboxing experience."
      },
      {
        type: "heading",
        text: "First Impressions Are Physical"
      },
      {
        type: "paragraph",
        text: "In a world saturated with digital touchpoints, a physical package is a rare opportunity to create a tangible brand moment. The way something is packaged communicates just as much as the product itself. A custom-branded box with tissue paper, a printed insert card, and carefully arranged items tells the recipient: we thought about you."
      },
      {
        type: "quote",
        text: "Unboxing is the last mile of marketing. It's where your brand promise becomes a physical experience — and it's the moment most companies completely miss.",
        author: "Merch Club Creative",
        role: "Design & Kitting"
      },
      {
        type: "paragraph",
        text: "Compare that to a plastic bag with a shipping label. Same products inside. Completely different emotional response."
      },
      {
        type: "heading",
        text: "What Goes Into a Great Kit"
      },
      {
        type: "paragraph",
        text: "Custom kitting is more than just putting things in a box. It's a design exercise. Every element should be intentional — from the order items are revealed when the box is opened, to the materials used for padding, to the messaging on the insert. A well-kitted package creates a sequence: anticipation, discovery, delight."
      },
      {
        type: "list",
        heading: "Elements of a great kit:",
        items: [
          "Custom-printed outer box with brand colors",
          "Tissue paper or crinkle cut in brand palette",
          "Branded insert card with personal message",
          "Items arranged in a deliberate reveal order",
          "Premium padding — no styrofoam or generic fillers"
        ]
      },
      {
        type: "paragraph",
        text: "The best kitting programs also consider logistics. How does the kit hold up in shipping? Is it designed for easy assembly at scale? Can it accommodate different product combinations for different recipients? These operational details are what separate a polished program from a pile of products stuffed in a mailer."
      },
      {
        type: "heading",
        text: "The Business Case for Better Packaging"
      },
      {
        type: "stats",
        items: [
          { value: "4x", label: "more social shares from custom kits" },
          { value: "92%", label: "of recipients say packaging impacts perception" },
          { value: "$3-5", label: "average added cost per kit" }
        ]
      },
      {
        type: "paragraph",
        text: "Kitting isn't just a nice-to-have — it's a revenue driver. Recipients of well-packaged gifts are significantly more likely to share their experience on social media, generating organic brand impressions. They're more likely to keep and use the products. And they're more likely to associate your brand with quality and attention to detail."
      },
      {
        type: "paragraph",
        text: "The cost difference between a generic shipment and a custom-kitted experience is often marginal. But the impact on brand perception? That's where the real ROI lives."
      },
    ]
  },
  {
    slug: "branded-merchandise-mistakes",
    tag: "Corporate",
    title: "5 Branded Merchandise Mistakes That Make Your Company Look Amateur",
    excerpt: "From inconsistent logos to cheap materials, these common missteps undermine your brand. Learn what separates forgettable swag from strategic merch.",
    date: "Mar 5, 2026",
    readTime: "7 min read",
    img: blogCityImg,
    content: [
      {
        type: "paragraph",
        text: "Your branded merchandise is an extension of your brand. When it's done well, it builds loyalty, sparks conversations, and keeps your company top of mind. When it's done poorly, it does the opposite — it signals that you don't care about the details. Here are five mistakes we see companies make over and over."
      },
      {
        type: "heading",
        text: "1. Using the Wrong Logo File"
      },
      {
        type: "paragraph",
        text: "This might sound basic, but it's shockingly common. Companies send a low-resolution JPEG pulled from their website, and the vendor prints it as-is. The result is a pixelated, fuzzy logo on an otherwise decent product. Always use vector files (AI, EPS, or SVG) for print production. If your team doesn't have these on hand, that's a brand management problem worth fixing."
      },
      {
        type: "heading",
        text: "2. Choosing Products Based on Price Alone"
      },
      {
        type: "paragraph",
        text: "The cheapest option is almost never the best option. A flimsy tote bag or a pen that runs out of ink in a week doesn't just fail to impress — it actively damages your brand. Recipients associate the quality of the product with the quality of your company. Invest in fewer, better items rather than flooding events with disposable junk."
      },
      {
        type: "quote",
        text: "Cheap merch doesn't save money — it costs credibility. When your logo is on something people throw away, that's the brand association you've created.",
        author: "Merch Club Team",
        role: "Client Strategy"
      },
      {
        type: "heading",
        text: "3. Ignoring Your Audience"
      },
      {
        type: "paragraph",
        text: "A construction company giving out silk scarves. A tech startup distributing leather-bound journals. These are real examples we've seen. Branded merch should reflect who's receiving it. Think about their lifestyle, their work environment, and what they'd actually use. When you nail the audience fit, people don't just accept the merch — they seek it out."
      },
      {
        type: "heading",
        text: "4. Inconsistent Branding Across Items"
      },
      {
        type: "paragraph",
        text: "Different logo versions on different products. Colors that don't match. Fonts that vary from item to item. This kind of inconsistency makes your brand look disorganized. Every piece of merchandise should look like it came from the same family — same colors, same logo treatment, same level of quality."
      },
      {
        type: "stats",
        items: [
          { value: "67%", label: "of consumers notice brand inconsistencies" },
          { value: "23%", label: "lower trust when branding varies" },
          { value: "3-5", label: "touchpoints to build brand recognition" }
        ]
      },
      {
        type: "heading",
        text: "5. No Plan for Distribution"
      },
      {
        type: "paragraph",
        text: "You ordered 500 branded jackets. They arrive at HQ in 20 boxes. Now what? Without a distribution plan, those jackets sit in a storage room collecting dust. Smart merch programs plan distribution from the start — whether that's direct-to-recipient shipping, event-day handouts, or integration with an online store. The best product in the world is worthless if it never reaches the right person."
      },
      {
        type: "callout",
        text: "The fix for all five mistakes? Work with a partner who thinks strategically — not just a vendor who takes orders. Every merch decision should be intentional."
      },
    ]
  },
];

export default function Blog() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title="Blog — Insights & Ideas"
        description="Strategy, branding, and operations thinking for teams that take their merch seriously. Read the latest from the Merch Club blog."
        path="/blog"
      />
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
            <Link href="/about" className="text-[#a3a3a3] hover:text-white transition-colors">About</Link>
            <span className="text-white">Blog</span>
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

      <section className="bg-[#0a0a0a] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#666] block mb-4">The Merch Club Blog</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Insights & Ideas
          </h1>
          <p className="mt-6 text-sm md:text-base text-[#888] max-w-lg mx-auto leading-relaxed">
            Strategy, branding, and operations thinking for teams that take their merch seriously.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Link href={`/blog/${blogPosts[0].slug}`} className="group block mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl overflow-hidden border border-black/10">
                <img
                  src={blogPosts[0].img}
                  alt={blogPosts[0].title}
                  className="w-full h-[300px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black px-3 py-1 rounded-full">{blogPosts[0].tag}</span>
                  <span className="text-[11px] text-[#aaa]">{blogPosts[0].date}</span>
                  <span className="text-[11px] text-[#aaa]">{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] text-black group-hover:text-[#555] transition-colors mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {blogPosts[0].title}
                </h2>
                <p className="text-base text-[#777] leading-relaxed mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <span className="text-sm font-bold text-black underline underline-offset-4 group-hover:text-[#666] transition-colors">
                  Read article
                </span>
              </div>
            </div>
          </Link>

          <div className="border-t border-black/10 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {blogPosts.slice(1).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-black/10 mb-5">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-[260px] md:h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black px-3 py-1 rounded-full">{post.tag}</span>
                    <span className="text-[11px] text-[#aaa]">{post.date}</span>
                    <span className="text-[11px] text-[#aaa]">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug text-black group-hover:text-[#555] transition-colors mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#777] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-sm font-bold text-black underline underline-offset-4 group-hover:text-[#666] transition-colors">
                    Read article
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.9] text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Ready to rethink your merch?
          </h3>
          <p className="text-sm md:text-base text-[#888] leading-relaxed mb-8 max-w-md mx-auto">
            Let's build a branded merchandise program that actually moves the needle.
          </p>
          <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-black text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors">
            Start a Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
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
