import { Link, useParams } from "wouter";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";
import { blogPosts } from "./blog";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === params.slug);

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

  return (
    <div className="min-h-screen bg-white text-black">
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
            <Link href="/blog" className="text-[#a3a3a3] hover:text-white transition-colors">Blog</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden lg:inline-flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
            Start a Project
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>
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
                  <blockquote key={i} className="my-12 border-l-4 border-[#2bbcb3] pl-6 md:pl-8 py-2">
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
                        <span className="block text-3xl md:text-4xl font-black text-[#2bbcb3] mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
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
                  <div key={i} className="my-12 bg-[#f7fafa] border border-[#2bbcb3]/20 rounded-xl p-6 md:p-8">
                    <div className="flex gap-3 items-start">
                      <svg className="w-5 h-5 text-[#2bbcb3] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2bbcb3] mt-2.5 flex-shrink-0" />
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
              <Link href="/" className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold px-8 py-3.5 rounded-full hover:bg-[#333] transition-colors">
                Start a Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-[#f9f9f9] py-20 md:py-28 px-8 md:px-16 lg:px-20 border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-black mb-12" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            More from the blog
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

      <footer className="bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-20 pt-16 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <img src={logoSrc} alt="Merch Club" className="h-8 brightness-0 invert" />
              <p className="text-xs text-[#444]">&copy; {new Date().getFullYear()} Merch Club. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service"].map(item => (
                <a key={item} href="#" className="text-xs text-[#444] hover:text-[#888] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
