import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import RelatedContent, { type RelatedItem } from "@/components/related-content";
import { StartProjectModal } from "@/components/start-project-modal";
import { IndustriesMegaMenu } from "@/components/industries-mega-menu";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";
import { blogPosts } from "./blog";
import { caseStudies as siteCaseStudies } from "@/lib/site-data";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === params.slug);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Post Not Found</h1>
          <Link href="/blog" className="text-sm font-bold underline underline-offset-4">Back to blog</Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter(p => p.slug !== post.slug);

  const postUrl = `https://merchclub.replit.app/blog/${post.slug}`;
  const isoDate = (() => {
    const d = new Date(post.date);
    return Number.isNaN(d.getTime()) ? "2026-04-01" : d.toISOString().slice(0, 10);
  })();
  const plainText = post.content
    .map((b: any) => {
      if (b.text) return b.text;
      if (b.heading) return b.heading;
      if (b.items) return b.items.map((it: any) => typeof it === "string" ? it : `${it.value} ${it.label}`).join(" ");
      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const postJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": postUrl,
      "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
      "headline": post.title,
      "description": post.excerpt,
      "image": post.img && typeof post.img === "string" ? [post.img] : ["https://merchclub.replit.app/opengraph.jpg"],
      "datePublished": isoDate,
      "dateModified": isoDate,
      "articleSection": post.tag,
      "wordCount": plainText.split(/\s+/).length,
      "author": { "@type": "Organization", "name": "Merch Club", "url": "https://merchclub.replit.app" },
      "publisher": {
        "@type": "Organization",
        "name": "Merch Club",
        "logo": { "@type": "ImageObject", "url": "https://merchclub.replit.app/opengraph.jpg" }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merchclub.replit.app/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://merchclub.replit.app/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        imageAlt={post.title}
        keywords={`${post.tag.toLowerCase()}, branded merchandise, merch club blog, ${post.slug.replace(/-/g, " ")}`}
        jsonLd={postJsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>{post.title}</h1>
          <p><em>{post.tag} · {post.date} · {post.readTime}</em></p>
          <p>{post.excerpt}</p>
          {post.content.map((b: any, i: number) => {
            if (b.type === "heading") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "quote") return <blockquote key={i}>"{b.text}" — <cite>{b.author}, {b.role}</cite></blockquote>;
            if (b.type === "callout") return <p key={i}><strong>{b.text}</strong></p>;
            if (b.type === "list") return (
              <div key={i}>
                <p><strong>{b.heading}</strong></p>
                <ul>{b.items.map((it: string, j: number) => <li key={j}>{it}</li>)}</ul>
              </div>
            );
            if (b.type === "stats") return (
              <ul key={i}>{b.items.map((s: any, j: number) => <li key={j}><strong>{s.value}</strong> — {s.label}</li>)}</ul>
            );
            return <p key={i}>{b.text}</p>;
          })}
          <h2>More from the blog</h2>
          <ul>
            {otherPosts.map(p => (
              <li key={p.slug}><a href={`/blog/${p.slug}`}>{p.title}</a> — {p.excerpt}</li>
            ))}
          </ul>
          <p><a href="/">Home</a> · <a href="/blog">Blog</a> · <a href="/about">About</a></p>
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
            <Link href="/about" className="text-[#a3a3a3] hover:text-white transition-colors">About</Link>
            <IndustriesMegaMenu />
            <Link href="/case-studies" className="text-[#a3a3a3] hover:text-white transition-colors">Case Studies</Link>
            <Link href="/blog" className="text-white">Learning Center</Link>
            <a href="/contact" className="text-[#a3a3a3] hover:text-white transition-colors">Contact</a>
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

      <article>
        <div className="relative">
          <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-20 pb-12 md:pb-16">
            <div className="max-w-3xl">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Learning Center", href: "/blog" },
                  { label: post.title, href: `/blog/${post.slug}` },
                ]}
                theme="dark"
                className="mb-5"
              />
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-white px-3 py-1 rounded-full">{post.tag}</span>
                <span className="text-[11px] text-white/70">{post.date}</span>
                <span className="text-[11px] text-white/70">{post.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-8 md:px-16 py-16 md:py-24">
          <p className="text-lg md:text-xl text-[#555] leading-relaxed font-medium mb-12 border-l-4 border-black pl-6">
            {post.excerpt}
          </p>

          <div className="space-y-8">
            {post.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2 key={i} className="text-2xl md:text-3xl font-black tracking-tight text-black mt-14 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={i} className="my-12 border-l-4 border-black pl-6 md:pl-8 py-2">
                    <p className="text-lg md:text-xl font-semibold italic text-[#222] leading-relaxed mb-3">
                      "{block.text}"
                    </p>
                    <footer className="text-sm text-[#666]">
                      <span className="font-bold text-[#333]">{block.author},</span>{" "}
                      <span className="italic">{block.role}</span>
                    </footer>
                  </blockquote>
                );
              }
              if (block.type === "stats") {
                return (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
                    {block.items.map((stat, j) => (
                      <div key={j} className="text-center py-6 px-4 rounded-xl border border-black/10">
                        <span className="block text-3xl md:text-4xl font-black text-black mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                          {stat.value}
                        </span>
                        <span className="text-xs text-[#777] leading-snug">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              if (block.type === "callout") {
                return (
                  <div key={i} className="my-12 bg-[#f5f5f5] border border-black/10 rounded-xl p-6 md:p-8">
                    <div className="flex gap-3 items-start">
                      <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-base md:text-lg text-[#333] leading-relaxed font-medium">{block.text}</p>
                    </div>
                  </div>
                );
              }
              if (block.type === "list") {
                return (
                  <div key={i} className="my-10">
                    <p className="text-base font-bold text-[#222] mb-4">{block.heading}</p>
                    <ul className="space-y-3">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-base text-[#444] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <p key={i} className="text-base md:text-lg text-[#444] leading-[1.8]">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-20 pt-12 border-t border-black/10">
            <div className="bg-[#f5f5f5] rounded-2xl p-8 md:p-12 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888] block mb-3">Like what you read?</span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Let's build something together.
              </h3>
              <p className="text-sm text-[#777] max-w-md mx-auto mb-6 leading-relaxed">
                Whether you need a full merch program or a single project, we're ready to help.
              </p>
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold px-8 py-3.5 rounded-full hover:bg-[#333] transition-colors">
                Start a Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-[#f9f9f9] py-20 md:py-28 px-8 md:px-16 lg:px-20 border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-12" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            More From the Learning Center
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <div className="rounded-2xl overflow-hidden border border-black/10 mb-5">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-[240px] md:h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-black px-3 py-1 rounded-full">{p.tag}</span>
                  <span className="text-[11px] text-[#aaa]">{p.readTime}</span>
                </div>
                <h4 className="text-xl font-black tracking-tight leading-snug text-black group-hover:text-[#555] transition-colors mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
                  {p.title}
                </h4>
                <p className="text-sm text-[#777] leading-relaxed">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedContent
        eyebrow="See It In Practice"
        heading="Real Programs Built on This Thinking"
        items={siteCaseStudies.slice(0, 2).map((c) => ({
          href: `/case-studies/${c.slug}`,
          eyebrow: c.industry,
          title: c.title,
          description: c.summary,
          meta: c.readTime,
          cta: `Read the ${c.client} case study`,
        }))}
        theme="dark"
      />

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
