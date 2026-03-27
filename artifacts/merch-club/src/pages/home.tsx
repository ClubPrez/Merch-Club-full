import { useEffect, useRef, useState } from "react";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1774446241907.png";
import heroImg from "@assets/0I4A7792_1774446809972.jpg";
import golfImg from "@assets/image_1774554118628.png";
import bottleImg from "@assets/0I4A7757_1774446952971.jpg";
import modelImg from "@assets/image_1774553895766.png";
import heroVideo from "@assets/Screen_Recording_2026-03-26_at_4.39.36_PM_1774561292379.mov";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_1774554960751.jpg";

function useRevealOnScroll(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

function useAnimateOnMount(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px) scale(0.95)";
    const timeout = setTimeout(() => {
      el.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  return ref;
}

const rotatingWords = ["handled.", "managed.", "organized.", "designed.", "packed.", "shipped.", "tracked.", "worn."];

const painPoints = [
  { icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z", label: "Proof approvals", desc: "Chasing sign-offs across teams and stakeholders" },
  { icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418", label: "Brand consistency", desc: "Keeping logos, colors, and quality on point" },
  { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", label: "Shifting deadlines", desc: "Timelines that move with every vendor change" },
  { icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", label: "Multiple vendors", desc: "Coordinating across suppliers with no single source" },
  { icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", label: "Inventory management", desc: "Tracking stock levels across multiple locations" },
];

function RotatingCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % painPoints.length);
        setIsExiting(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = painPoints[activeIndex];

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex flex-col gap-3">
        {painPoints.map((point, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={point.label}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-500 ${
                isActive
                  ? "bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-[1.02]"
                  : "bg-transparent border border-transparent opacity-40 scale-100"
              }`}
              style={{
                animation: isActive && !isExiting ? "card-enter 0.4s ease-out forwards" : undefined,
              }}
            >
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? "bg-white/15" : "bg-white/5"}`}>
                <svg className={`w-5 h-5 transition-colors duration-500 ${isActive ? "text-white" : "text-[#555]"}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={point.icon} />
                </svg>
              </div>
              <div>
                <span className={`text-sm font-bold tracking-wide transition-colors duration-500 ${isActive ? "text-white" : "text-[#666]"}`}>{point.label}</span>
                {isActive && (
                  <p className="text-xs text-[#888] mt-0.5">{point.desc}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RevealItem({ delay, className, children }: { delay: number; className?: string; children: React.ReactNode }) {
  const ref = useRevealOnScroll(delay);
  return <div ref={ref} className={className}>{children}</div>;
}

function BetterWaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    if (!section || !video || !content) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const visible = rect.top < windowHeight && rect.bottom > 0;
      if (!visible) return;

      const progress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
      video.style.transform = `translateY(${(progress - 0.5) * -80}px) scale(1.15)`;
      content.style.transform = `translateY(${(progress - 0.5) * 30}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32 px-8 md:px-16 lg:px-20">
      <video ref={videoRef} src={heroVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform" style={{ transform: "scale(1.15)" }} />
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      <div ref={contentRef} className="max-w-6xl mx-auto relative z-10 will-change-transform">
        <RevealItem delay={0}>
          <p className="text-lg md:text-xl lg:text-2xl font-black tracking-tight text-white/70 whitespace-nowrap" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            A better way to run branded merchandise programs.
          </p>
        </RevealItem>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16">
          <div>
            {[
              { num: "01", title: "Strategy", desc: "Program planning, stakeholder alignment, and scope framing." },
              { num: "02", title: "Brand-aligned design", desc: "Creative direction that protects consistency and elevates perception." },
            ].map((step, i) => (
              <RevealItem key={step.num} delay={300 + i * 150} className={`flex items-start gap-5 py-5 ${i < 1 ? "border-b border-white/10" : ""}`}>
                <span className="text-xs font-bold text-[#555] tracking-widest mt-1">{step.num}</span>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.title}</h4>
                  <p className="text-xs md:text-sm text-[#777] mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
          <div>
            {[
              { num: "03", title: "Controlled production", desc: "Sourcing, proofing, and quality oversight managed in one flow." },
              { num: "04", title: "Coordinated fulfillment", desc: "Kitting, distribution, and multi-location execution." },
            ].map((step, i) => (
              <RevealItem key={step.num} delay={600 + i * 150} className={`flex items-start gap-5 py-5 ${i < 1 ? "border-b border-white/10" : ""}`}>
                <span className="text-xs font-bold text-[#555] tracking-widest mt-1">{step.num}</span>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.title}</h4>
                  <p className="text-xs md:text-sm text-[#777] mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>

        <RevealItem delay={900} className="mt-14 max-w-6xl md:mr-auto md:ml-0 flex items-center justify-between gap-4">
          <a href="#" className="inline-flex items-center gap-2 border border-white/30 text-white text-sm md:text-base font-bold px-7 py-3 rounded-full hover:bg-white/10 transition-colors">
            One partner. Total execution.
          </a>
          <a href="#" className="inline-flex items-center gap-2 bg-white text-black text-sm md:text-base font-bold px-7 py-3 rounded-full hover:bg-gray-200 transition-colors">
            Start Planning Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
          </a>
        </RevealItem>
      </div>
    </section>
  );
}

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const headlineRef = useAnimateOnMount(100);
  const circle1Ref = useAnimateOnMount(300);
  const circle2Ref = useAnimateOnMount(500);
  const circle3Ref = useAnimateOnMount(700);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="hidden md:flex items-center justify-end gap-8 px-6 md:px-10 py-2 bg-[#222] border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em]">
        <a href="#" className="text-white transition-colors">MerchClub</a>
        <span className="text-white/20">|</span>
        <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">Brandini</a>
        <span className="text-white/20">|</span>
        <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">ScrubClub</a>
      </div>
      <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-[#111] border-b border-white/10">
        <div className="flex items-center gap-6">
          <img src={logoSrc} alt="Merch Club" className="h-6 object-contain invert" />
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">Services</a>
            <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">Industries</a>
            <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">Process</a>
            <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/MerchClubPro" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center text-[#a3a3a3] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/merchclub_ig/" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center text-[#a3a3a3] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="tel:+15317770347" className="hidden lg:flex items-center gap-2 text-xs text-[#a3a3a3] hover:text-white transition-colors font-medium tracking-wide">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +1 531-777-0347
          </a>
          <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="text-xs text-gray-400 font-medium tracking-wide">SEARCH</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0a0a0a] px-8 md:px-16 lg:px-20 pt-16 pb-10">

        <div className="relative flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center md:items-center justify-center mb-10 gap-8 md:gap-10 w-full max-w-7xl mx-auto">
            <div ref={headlineRef} className="text-center md:text-left shrink-0 md:max-w-[280px] lg:max-w-[320px]">
              <div className="relative flex justify-center md:justify-start">
                <img src={cloverImg} alt="Merch Club clover" className="h-12 md:h-16 lg:h-20 object-contain mb-4" style={{ display: 'block', maxWidth: 'fit-content' }} />
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Merch,<br />
                <span className="inline-block overflow-hidden h-[1.1em] align-bottom relative">
                  <span className="invisible">organized.</span>
                  <span
                    className={`absolute left-0 top-0 text-[#a3a3a3] transition-all duration-400 ${isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
                  >
                    {rotatingWords[wordIndex]}
                  </span>
                </span>
              </h2>
              <p className="mt-4 text-sm md:text-base text-[#a3a3a3] leading-relaxed max-w-[320px] mx-auto md:mx-0">
                We design and execute structured branded merchandise programs for marketing and operations teams — from trade show kits to multi-location rollouts.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                <a href="#" className="inline-flex items-center gap-2 bg-white text-black text-xs md:text-sm font-bold px-5 md:px-6 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
                  Start a Project
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
                <a href="#" className="inline-flex items-center gap-2 border border-white/30 text-white text-xs md:text-sm font-bold px-5 md:px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                  Book a Call
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center shrink-0">
              <div ref={circle1Ref} className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[240px] md:h-[240px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px] aspect-square rounded-full overflow-hidden relative z-10 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <img src={golfImg} alt="Golf apparel" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 hover:bg-black/40 transition-colors">
                  <a href="#" className="bg-white text-black text-[10px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full hover:bg-gray-200 transition-all hover:scale-105 inline-flex items-center gap-1 sm:gap-2">
                    Golf Apparel
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </div>
              </div>

              <div ref={circle2Ref} className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[240px] md:h-[240px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px] aspect-square rounded-full overflow-hidden -ml-6 sm:-ml-8 md:-ml-12 lg:-ml-16 relative z-20 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <iframe
                  src="https://www.youtube.com/embed/gbLmku5QACM?autoplay=1&mute=1&loop=1&playlist=gbLmku5QACM&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none"
                  style={{ border: 0 }}
                />
              </div>

              <div ref={circle3Ref} className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[240px] md:h-[240px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px] aspect-square rounded-full overflow-hidden -ml-6 sm:-ml-8 md:-ml-12 lg:-ml-16 relative z-30 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <img src={modelImg} alt="Model wearing merch" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 hover:bg-black/40 transition-colors">
                  <a href="#" className="bg-white text-black text-[10px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full hover:bg-gray-200 transition-all hover:scale-105 inline-flex items-center gap-1 sm:gap-2">
                    Healthcare Apparel
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="overflow-hidden bg-white py-3 -rotate-1 scale-105 relative z-10">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {["Onboarding kits", "Client gifts", "Team apparel", "Event drops"].map((text, j) => (
                <span key={j} className="text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-black mx-4 md:mx-6 flex items-center gap-4 md:gap-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {text}
                  <span className="text-black/40">&#x2022;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden bg-[#0a0a0a] border-y border-white/10 py-3 rotate-1 scale-105 -mt-2 relative z-0">
        <div className="flex animate-[marquee-reverse_25s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {["Your Executive Merch Partner In", "Construction", "Healthcare", "Real Estate", "Corporate"].map((text, j) => (
                <span key={j} className="text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mx-4 md:mx-6 flex items-center gap-4 md:gap-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {text}
                  <span className="text-white/30">&#x2022;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="relative bg-[#111] py-24 md:py-32 px-8 md:px-16 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 flex items-center justify-center order-2 md:order-1">
            <RotatingCards />
          </div>

          <div className="flex-1 text-left order-1 md:order-2">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Custom merch isn't complicated.<br />
              <span className="text-[#a3a3a3]">Coordinating it is.</span>
            </h3>
            <p className="mt-6 md:mt-8 text-sm md:text-base text-[#888] leading-relaxed max-w-lg">
              Ordering branded merchandise usually means juggling emails, approvals, shipping timelines, and product quality. Different vendors. Different deadlines. Different headaches. Merch Club replaces that chaos with one organized system. You get a dedicated team, clear timelines, and merch that actually reflects your brand.
            </p>
          </div>
        </div>
      </section>

      <BetterWaySection />
    </div>
  );
}
