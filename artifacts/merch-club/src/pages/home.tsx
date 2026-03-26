import { useEffect, useRef } from "react";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1774446241907.png";
import heroImg from "@assets/0I4A7792_1774446809972.jpg";
import bottleImg from "@assets/0I4A7757_1774446952971.jpg";

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

export default function Home() {
  const headlineRef = useAnimateOnMount(100);
  const circle1Ref = useAnimateOnMount(300);
  const circle2Ref = useAnimateOnMount(500);
  const circle3Ref = useAnimateOnMount(700);
  const cardsRef = useAnimateOnMount(900);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-[#111] border-b border-white/10">
        <div className="flex items-center gap-6">
          <img src={logoSrc} alt="Merch Club" className="h-6 object-contain invert" />
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              Collections
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
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

      <section className="relative overflow-hidden bg-[#0a0a0a] px-6 md:px-10 pt-16 pb-10">

        <div className="relative flex flex-col items-center">
          <div className="flex items-center justify-center mb-10 gap-6 md:gap-10">
            <div ref={headlineRef} className="text-left shrink-0">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]" style={{ fontFamily: "'League Spartan', sans-serif" }}>
                Custom<br />Merch.<br /><span className="text-[#f59e0b]">Handled.</span>
              </h2>
            </div>

            <div className="relative flex items-center">
              <div ref={circle1Ref} className="w-[200px] h-[200px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full bg-[#f59e0b] flex items-center justify-center relative z-10 hover:scale-105 transition-transform duration-500">
                <div className="text-center px-4 md:px-8">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-black mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  <p className="text-[10px] md:text-sm font-semibold text-black leading-tight">
                    The platform for creators<br className="hidden md:block" /> to bring their merch<br className="hidden md:block" /> to the audience
                  </p>
                </div>
              </div>

              <div ref={circle2Ref} className="w-[200px] h-[200px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden -ml-8 md:-ml-16 relative z-20 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <img src={heroImg} alt="Merch Club collection" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>

              <div ref={circle3Ref} className="w-[200px] h-[200px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden -ml-8 md:-ml-16 relative z-30 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <img src={bottleImg} alt="Water bottle" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 hover:bg-black/40 transition-colors">
                  <a href="#" className="bg-white text-black text-xs md:text-sm font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-gray-200 transition-all hover:scale-105 inline-flex items-center gap-2">
                    Learn More
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-5xl">
            {[
              { title: "Curated merch drops from top creators", cta: "Explore" },
              { title: "Community-driven designs and collabs", cta: "Explore" },
              { title: "Exclusive drops you won't find anywhere else", cta: "Explore" },
            ].map((card, i) => (
              <div key={i} className="relative rounded-[16px] overflow-hidden bg-[#151515] border border-white/5 p-5 min-h-[140px] flex flex-col justify-between group hover:border-[#f59e0b]/30 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-3 right-3">
                  <div className="w-7 h-7 rounded-full bg-[#f59e0b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white/90 leading-snug max-w-[180px]">{card.title}</p>
                <a href="#" className="mt-3 text-xs font-bold uppercase tracking-widest border border-white/20 text-white/70 px-4 py-1.5 rounded-full w-fit hover:bg-white/5 transition-colors">
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="p-3 md:p-4">
        <div className="grid grid-cols-12 gap-3 min-h-[calc(100vh-80px)]">
          <div className="col-span-12 md:col-span-7 grid grid-rows-[1fr_auto] gap-3">
            <div className="relative rounded-[16px] overflow-hidden min-h-[300px] md:min-h-[400px]">
              <img src={heroImg} alt="Merch Club collection" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute top-6 left-6 md:top-8 md:left-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                  MERCH<br />CLUB
                </h1>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-auto md:right-8 md:translate-x-0">
                <span className="text-lg md:text-2xl font-black tracking-tight uppercase bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  Water Bottle
                </span>
              </div>

              <div className="absolute bottom-6 left-6 hidden md:block">
                <button className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 md:col-span-6 bg-[#111] border border-white/10 rounded-[16px] p-6 md:p-8 flex flex-col justify-between min-h-[180px]">
                <div>
                  <span className="text-5xl md:text-6xl font-black leading-none">20%</span>
                  <span className="text-5xl md:text-6xl font-black leading-none ml-2">OFF</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-400 font-medium">on all the products</p>
                  <p className="text-sm text-gray-400 font-medium">shop it now</p>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <a href="#" className="flex items-center gap-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-md hover:bg-gray-200 transition-colors">
                    <span className="leading-none">
                      <span className="text-[8px] block">SHOP</span>
                      ALL PRODUCTS
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 relative rounded-[16px] overflow-hidden min-h-[180px]">
                <div className="absolute inset-0 bg-[#1a1a1a]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Check Out The New Stuff</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 relative rounded-[16px] overflow-hidden min-h-[400px]">
            <img src={bottleImg} alt="Water bottle with stickers" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:translate-x-[-30%]">
              <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
