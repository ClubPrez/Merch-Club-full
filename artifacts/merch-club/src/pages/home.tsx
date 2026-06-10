import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import heroImg from "@assets/0I4A7792_1774446809972.jpg";
import golfImg from "@assets/image_1774554118628.png";
import constructionApparelImg from "@assets/Smiling_man_in_work_jacket_1777576062227.png";
import healthcareApparelImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_13_04_PM_1777576088650.png";
import kittingNewImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_08_AM_1775772571862.png";
import onDemandStoreImg from "@assets/Club_logo_hoodie_with_bold_text_1775772595094.png";
import industrySpecificImg from "@assets/Smiling_man_in_work_jacket_1775772678827.png";
import employeeGiftsImg from "@assets/ChatGPT_Image_Apr_9,_2026,_03_55_44_PM_1775772702220.png";
import bulkSourcingImg from "@assets/ChatGPT_Image_Apr_9,_2026,_04_16_06_PM_1775772750326.png";
import eventMerchImg from "@assets/Monochrome_merch_flat_lay_arrangement_1775772900084.png";
import logoAccessBank from "@assets/logo_accessbank_nobg.png";
import logoPaylocity from "@assets/logo_paylocity_nobg.png";
import logoFraserStryker from "@assets/logo_fraserstryker_nobg.png";
import logoCHI from "@assets/logo_chi_nobg.png";
import logoKomen from "@assets/logo_komen_nobg.png";
import bottleImg from "@assets/0I4A7757_1774446952971.jpg";
import corporateImg from "@assets/image_1774625538266.png";
import constructionImg from "@assets/image_1774625624335.png";
import eventsImg from "@assets/image_1774625754502.png";
import modelImg from "@assets/image_1774553895766.png";
import cloverImg from "@assets/Social_PostsArtboard_2@3x_copy_1775827336093.png";
import kittingImg from "@assets/image_1774638885691.png";
import distributionImg from "@assets/ChatGPT_Image_Apr_9,_2026,_04_16_06_PM_1775773754055.png";
import productionImg from "@assets/image_1774638950602.png";
import strategyImg from "@assets/Product_demo_in_modern_office_setting_1775773725225.png";
import designImg from "@assets/image_1774639099780.png";
import proofingImg from "@assets/image_1774639328557.png";
import team1Img from "@assets/1_1775229252465.png";
import team2Img from "@assets/2_1775229252466.png";
import team3Img from "@assets/3_1775229252466.png";
import team4Img from "@assets/4_1775229252466.png";
import accessBankImg from "@assets/Denik_Journal_1780544222401.png";
import onestaffImg from "@assets/tote_vw_bus_1778692208474.png";
import merchClubProductionImg from "@assets/ChatGPT_Image_Mar_24,_2026,_11_18_55_AM_1774718494043.png";
import merchClubDistributionImg from "@assets/ChatGPT_Image_Apr_9,_2026,_04_16_06_PM_1775831640229.png";
import industryCorporateImg from "@assets/ChatGPT_Image_Mar_28,_2026,_12_13_49_PM_1774718584149.png";
import industryEventsImg from "@assets/ChatGPT_Image_Mar_28,_2026,_12_21_48_PM_1774718584150.png";
import newProofingImg from "@assets/image_1774719180184.png";
import newDesignImg from "@assets/ChatGPT_Image_Mar_28,_2026,_12_35_49_PM_1774719367008.png";
import dashboardScreenImg from "@assets/Client_portal_dashboard_UI_design_1775591808887.png";
import brandAccessBank from "@assets/ACCESSbank_Lettering_Only_1779905854420.png";
import brandPaylocity from "@assets/brand_paylocity_nobg.png";
import brandFraserStryker from "@assets/brand_fraserstryker_nobg.png";
import brandKomen from "@assets/brand_komen_nobg.png";
import brandOnestaff from "@assets/Social_PostsArtboard_1@3x_1777583934192.png";
import logo50MileMarch from "@assets/50_Mile_March_-_Logo_-_Single_Color_Black_1780542627135.png";
import logoAPAH from "@assets/APAH_Single_Color_Black_1780542659870.png";
import logoAHA from "@assets/aha_logo_nobg.png";
import logoBackNine from "@assets/Back_Nine_Logo_1780542695681.png";
import logoBakerGroup from "@assets/Baker_Group_Logo_With_R_Black_1780542718496.png";
import logoBB from "@assets/BB_Logo_1780895152187.png";
import logoBurlington from "@assets/Burlington_Capital_Logo_1780542879250.png";
import logoF3 from "@assets/F3_Logo_1780542913430.png";
import logoFederalCrop from "@assets/FederalCrop_Logo_1780542945995.png";
import logoHologic from "@assets/Hologic_Main_Logo_PMS2756_WoTagline_1780542986902.png";
import logoJayMoore from "@assets/jay_moore_nobg.png";
import logoMarqeta from "@assets/marqeta_nobg.png";
import logoPitch from "@assets/Pitch_IndividualLogos-03_1780543115104.png";
import logoPicklemans from "@assets/picklemans_logo_clean.png";
import logoMcCoy from "@assets/McCoy_Horizontal_Logo_Black_1780543231903.png";
import blogKittingImg from "@assets/ChatGPT_Image_Apr_8,_2026,_11_27_13_AM_1775835373159.png";
import blogPackagingImg from "@assets/Professional_promotional_packaging_shot_1775835373158.png";
import blogCityImg from "@assets/Merch_club_in_the_city_plaza_1775835373159.png";

function CountUp({ end, prefix = "", suffix = "", duration = 2000 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const directionRef = useRef<1 | -1>(1);

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => {
        let next = prev + directionRef.current;
        if (next >= painPoints.length) {
          directionRef.current = -1;
          next = prev - 1;
        } else if (next < 0) {
          directionRef.current = 1;
          next = prev + 1;
        }
        return next;
      });
    }, 1800);

    return () => clearInterval(id);
  }, [hoveredIndex]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex flex-col gap-3">
        {painPoints.map((point, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={point.label}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 cursor-default ${
                isActive
                  ? "bg-black/5 border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.05)] scale-[1.02]"
                  : "bg-transparent border border-transparent opacity-40 scale-100"
              }`}
              onMouseEnter={() => {
                setHoveredIndex(i);
                setActiveIndex(i);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
            >
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-black/10" : "bg-black/5"}`}>
                <svg className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-black" : "text-[#aaa]"}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={point.icon} />
                </svg>
              </div>
              <div>
                <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${isActive ? "text-black" : "text-[#999]"}`}>{point.label}</span>
                {isActive && (
                  <p className="text-xs text-[#888] mt-0.5 animate-[card-enter_0.3s_ease-out_forwards]">{point.desc}</p>
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

function BetterWaySection({ onStartProject }: { onStartProject: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const iframeWrap = iframeWrapRef.current;
    const content = contentRef.current;
    if (!section || !iframeWrap || !content) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const visible = rect.top < windowHeight && rect.bottom > 0;
      if (!visible) return;

      const progress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
      iframeWrap.style.transform = `translateY(${(progress - 0.5) * -80}px) scale(1.15)`;
      content.style.transform = `translateY(${(progress - 0.5) * 30}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-32 px-8 md:px-16 lg:px-20 bg-[#0a0a0a]">
      <div ref={iframeWrapRef} className="hidden md:block absolute inset-0 z-0 will-change-transform pointer-events-none" style={{ transform: "scale(1.15)" }}>
        <iframe
          src="https://www.youtube.com/embed/_NvgNaTBcL8?autoplay=1&mute=1&loop=1&playlist=_NvgNaTBcL8&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 min-w-[177.78vh] min-h-[56.25vw] w-auto h-auto -translate-x-1/2 -translate-y-1/2"
          style={{ border: "none" }}
          title="Merch Club showcase"
        />
      </div>
      <div className="hidden md:block absolute inset-0 bg-black/60 z-[1]" />

      <div className="md:hidden mb-8 rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
        <iframe
          src="https://www.youtube.com/embed/_NvgNaTBcL8?autoplay=1&mute=1&loop=1&playlist=_NvgNaTBcL8&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
          allow="autoplay; encrypted-media"
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
          title="Merch Club showcase"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-transparent to-[#0a0a0a] z-[2] pointer-events-none" />

      <div ref={contentRef} className="max-w-6xl mx-auto relative z-10 will-change-transform">
        <RevealItem delay={0}>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white/70" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
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
                <span className="text-3xl md:text-5xl font-black text-[#a3a3a3] tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
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
                <span className="text-3xl md:text-5xl font-black text-[#a3a3a3] tracking-tight leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.title}</h4>
                  <p className="text-xs md:text-sm text-[#777] mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>

        <RevealItem delay={900} className="mt-14 max-w-6xl md:mr-auto md:ml-0 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <a href="#" className="inline-flex items-center gap-2 border border-white/30 text-white text-xs sm:text-sm md:text-base font-bold px-5 sm:px-7 py-3 rounded-full hover:bg-white/10 transition-colors">
            One partner. Total execution.
          </a>
          <button onClick={onStartProject} className="inline-flex items-center gap-2 bg-white text-black text-xs sm:text-sm md:text-base font-bold px-5 sm:px-7 py-3 rounded-full hover:bg-gray-200 transition-colors">
            Start Planning Your Project
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
          </button>
        </RevealItem>
      </div>
    </section>
  );
}

function StickyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.85;
      const end = windowH * 0.15;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeCount = Math.floor(progress * (timelineSteps.length + 0.5));

  return (
    <div id="process" className="bg-[#0a0a0a] py-20 md:py-28 px-8 md:px-16 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <RevealItem delay={0}>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            From concept to delivery.
          </h3>
        </RevealItem>
        <RevealItem delay={100}>
          <p className="text-sm md:text-base text-[#888] leading-relaxed max-w-2xl mb-14">
            One partner. Six stages. From the first creative brief to the final box on the dock, every step is ours to own.
          </p>
        </RevealItem>

        <div ref={containerRef} className="relative">
          <div className="space-y-6">
            {[0, 1].map((row) => (
              <div key={row}>
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
                  {timelineSteps.slice(row * 3, row * 3 + 3).map((step, idx) => {
                    const i = row * 3 + idx;
                    const isActive = i < activeCount;
                    return (
                      <div key={step.num} className="flex items-center flex-1 min-w-0">
                        <div
                          className="group flex gap-4 items-start transition-all duration-700 ease-out flex-1 min-w-0"
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            transform: isActive ? "translateY(0)" : "translateY(12px)",
                          }}
                        >
                          <div className="w-[100px] h-[120px] md:w-[120px] md:h-[150px] rounded-lg overflow-hidden border border-white/10 group-hover:border-white/25 shrink-0 transition-all duration-500">
                            <img
                              src={step.img}
                              alt={`Merch Club ${step.title.toLowerCase()} - branded merchandise ${step.desc.toLowerCase()}`}
                              className="w-full h-full object-cover transition-all duration-700"
                              style={{ filter: isActive ? "grayscale(0)" : "grayscale(1)" }}
                            />
                          </div>
                          <div className="pt-1 min-w-0">
                            <span
                              className="text-3xl font-black tracking-tight leading-none block mb-1 transition-colors duration-500"
                              style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? "#fff" : "#333" }}
                            >
                              {step.num}
                            </span>
                            <h4
                              className="text-lg font-black tracking-tight transition-colors duration-500"
                              style={{ fontFamily: "'Bebas Neue', sans-serif", color: isActive ? "#fff" : "#444" }}
                            >
                              {step.title}
                            </h4>
                            <p
                              className="text-xs mt-1 leading-relaxed transition-all duration-500"
                              style={{ color: isActive ? "#999" : "#333" }}
                            >
                              {step.desc}
                            </p>
                          </div>
                        </div>
                        {idx < 2 && (
                          <div className="hidden md:flex items-center px-3 shrink-0">
                            <svg
                              width="24" height="24" viewBox="0 0 24 24" fill="none"
                              className="transition-all duration-500"
                              style={{ opacity: isActive ? 0.6 : 0.15 }}
                            >
                              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const timelineSteps = [
  { num: "01", title: "Strategy", desc: "Define goals, audience, scope, and timing.", img: strategyImg },
  { num: "02", title: "Design", desc: "Create brand-aligned concepts and system direction.", img: newDesignImg },
  { num: "03", title: "Proofing", desc: "Manage approvals with live proofs and better control.", img: newProofingImg },
  { num: "04", title: "Production", desc: "Coordinate vendors, quality, and timeline management.", img: proofingImg },
  { num: "05", title: "Kitting", desc: "Assemble packages, bundles, and event-ready configurations.", img: kittingImg },
  { num: "06", title: "Distribution", desc: "Ship direct, multi-location, or campaign-based deliveries.", img: merchClubDistributionImg },
];


import { StartProjectModal } from "../components/start-project-modal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const testimonials = [
  { name: "Bailey Sullivan", text: "The Merch Club has been SUCH an amazing addition to our small business over these past 2 years! They've created custom hats, tees, safety vests, sunglasses, and more — making our apparel buying process SO much easier!" },
  { name: "Bill Corriston", text: "Chris and his team at Merch Club have been fantastic to work with. Launching a company and developing brand awareness has been made so much easier having Merch Club in our corner! Pricing, communication, design support are all 10/10!" },
  { name: "Matt Beck", text: "If you want the absolute best when it comes to your company logo, your apparel and your brand in general, there's no other choice than Merch Club. They took the time to design a logo that was literally perfect for my business." },
  { name: "Andrew George", text: "Working with Chris and Jason has been absolutely awesome. Merch Club offers tons of products, a great user experience, and it's an awesome solution for any business owner looking for branded merchandise." },
  { name: "Lane Hickenbottom", text: "Merch Club goes above and beyond — offering exciting products that elevate your brand and get people talking. Chris is an amazing idea guy who comes up with the coolest ways to get your brand out there. Five stars all the way!" },
  { name: "John Hardy", text: "Jason helped us get the logo prepped for embroidery and set up a store for us to use for fundraising. We have access to well over 1,000 items including apparel, lifestyle products, and more. Incredible service!" },
  { name: "Nickole Duker", text: "Merch Club is the best! For years Chris has helped get our company great promotional items at great prices. They are super responsive and great with a deadline. We've tried many others — none compare." },
  { name: "Joe DiMinico", text: "Excellent quality products, great service, and attention to detail." },
  { name: "Matt Conley", text: "They made it easy to create exactly what we were looking for!" },
  { name: "David Slobotski", text: "Came in clutch to save the day when I was behind schedule with an event." },
];

const trustedBrands = [
  { name: "Marqeta",                    logo: logoMarqeta,        sizeClass: "h-12 md:h-14" },
  { name: "OneStaff Medical",           logo: brandOnestaff,      sizeClass: "h-8 md:h-9"   },
  { name: "Pickleman's",                logo: logoPicklemans,     sizeClass: "h-10 md:h-12" },
  { name: "F3",                         logo: logoF3,             sizeClass: "h-12 md:h-14" },
  { name: "Susan G. Komen",             logo: brandKomen,         sizeClass: "h-16 md:h-20" },
  { name: "Burlington Capital",         logo: logoBurlington,     sizeClass: "h-8 md:h-10"  },
  { name: "Jay Moore Landscaping",      logo: logoJayMoore,       sizeClass: "h-9 md:h-11"  },
  { name: "Fraser Stryker",             logo: brandFraserStryker, sizeClass: "h-20 md:h-24" },
  { name: "Federal Crop",               logo: logoFederalCrop,    sizeClass: "h-20 md:h-24" },
  { name: "A Place At Home",            logo: logoAPAH,           sizeClass: "h-10 md:h-12" },
  { name: "Hologic",                    logo: logoHologic,        sizeClass: "h-7 md:h-8"   },
  { name: "Back Nine",                  logo: logoBackNine,       sizeClass: "h-16 md:h-20" },
  { name: "50 Mile March",              logo: logo50MileMarch,    sizeClass: "h-9 md:h-11"  },
  { name: "Pitch",                      logo: logoPitch,          sizeClass: "h-20 md:h-24" },
  { name: "ACCESSbank",                 logo: brandAccessBank,    sizeClass: "h-7 md:h-8"   },
  { name: "Baker Group",                logo: logoBakerGroup,     sizeClass: "h-10 md:h-12" },
  { name: "American Heart Association", logo: logoAHA,            sizeClass: "h-10 md:h-12" },
  { name: "McCoy",                      logo: logoMcCoy,          sizeClass: "h-9 md:h-11"  },
  { name: "Paylocity",                  logo: brandPaylocity,     sizeClass: "h-16 md:h-20" },
  { name: "Benson Brewery",             logo: logoBB,             sizeClass: "h-14 md:h-16" },
];

// Ease-in-out sigmoid approximation for the spotlight gradient mask.
// 14 stops that simulate a smooth bell-curve falloff centered at 50%.
const SPOTLIGHT_STOPS = [
  "transparent 0%",
  "transparent 14%",
  "rgba(0,0,0,0.04) 21%",
  "rgba(0,0,0,0.18) 27%",
  "rgba(0,0,0,0.44) 33%",
  "rgba(0,0,0,0.76) 39%",
  "rgba(0,0,0,0.96) 44%",
  "#000 47%",
  "#000 53%",
  "rgba(0,0,0,0.96) 56%",
  "rgba(0,0,0,0.76) 61%",
  "rgba(0,0,0,0.44) 67%",
  "rgba(0,0,0,0.18) 73%",
  "rgba(0,0,0,0.04) 79%",
  "transparent 86%",
  "transparent 100%",
].join(", ");
const SPOTLIGHT_MASK = `linear-gradient(to right, ${SPOTLIGHT_STOPS})`;

function TrustedBrandsSection() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const logoRow = (filter: string, opacity: number) =>
    [0, 1, 2].flatMap((rep) =>
      trustedBrands.map((brand) => (
        <img
          key={`${rep}-${brand.name}`}
          src={brand.logo}
          alt={rep === 0 ? brand.name : ""}
          className={`${brand.sizeClass} w-auto object-contain shrink-0 mx-10 md:mx-14`}
          style={{ filter, opacity }}
        />
      ))
    );

  return (
    <section className="bg-white border-t border-black/5 py-8 md:py-10 overflow-hidden">
      <p className="text-center text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#bbb] mb-8 px-8">
        Brands that trust us
      </p>

      {reducedMotion ? (
        /* Reduced-motion: static centered wrap, no animation */
        <div className="max-w-6xl mx-auto px-8 flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {trustedBrands.map((brand) => (
            <img
              key={brand.name}
              src={brand.logo}
              alt={brand.name}
              className={`${brand.sizeClass} w-auto object-contain`}
              style={{ filter: "grayscale(1)", opacity: 0.55 }}
            />
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden">
          {/* ── Layer 1: gray base — sets section height, always visible ── */}
          <div
            className="flex items-center animate-[marquee_70s_linear_infinite]"
            style={{ width: "max-content" }}
            aria-label="Brands that trust Merch Club"
          >
            {logoRow("grayscale(1)", 0.55)}
          </div>

          {/*
            ── Layer 2: spotlight overlay ──
            Absolutely covers Layer 1. Same animation → perfectly in sync.
            Logos rendered pure black (brightness(0)).
            A gradient mask reveals them only near the horizontal center,
            fading out on both sides via the ease-in-out sigmoid above.
            Logos "pass through" the fixed spotlight as they scroll.
          */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
            style={{
              maskImage: SPOTLIGHT_MASK,
              WebkitMaskImage: SPOTLIGHT_MASK,
            }}
          >
            <div
              className="flex items-center animate-[marquee_70s_linear_infinite]"
              style={{ width: "max-content" }}
            >
              {logoRow("grayscale(1) brightness(0)", 1)}
            </div>
          </div>

          {/* Edge fades — blends logos into the white background on entry/exit */}
          <div
            className="absolute inset-y-0 left-0 w-28 md:w-44 pointer-events-none"
            aria-hidden="true"
            style={{ background: "linear-gradient(to right, #fff 40%, transparent 100%)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-28 md:w-44 pointer-events-none"
            aria-hidden="true"
            style={{ background: "linear-gradient(to left, #fff 40%, transparent 100%)" }}
          />
        </div>
      )}
    </section>
  );
}

function RotatingTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[activeIdx];
  return (
    <div className="max-w-4xl mx-auto px-8 md:px-16 text-center min-h-[280px] flex flex-col items-center justify-center">
      <div className={`transition-all duration-500 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <p className="text-2xl md:text-4xl lg:text-5xl font-black text-black leading-tight tracking-tight mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
          "{t.text}"
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-sm font-bold text-black">
            {t.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="text-left">
            <span className="text-sm font-bold text-black block">{t.name}</span>
            <div className="flex gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFade(false); setTimeout(() => { setActiveIdx(i); setFade(true); }, 300); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-black w-6" : "bg-black/15 hover:bg-black/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

const faqItems = [
  { q: "What is Merch Club and how does it work?", a: "Merch Club is a full-service branded merchandise partner. We handle everything from product sourcing and design to warehousing, kitting, and fulfillment — so your team doesn't have to." },
  { q: "How much time can I save with Merch Club?", a: "Most clients save 10–20 hours per month by eliminating vendor coordination, order tracking, and inventory management. We handle the logistics so you can focus on your brand." },
  { q: "Do you handle warehousing and fulfillment?", a: "Yes. We store your inventory in our warehouse and fulfill orders on demand — whether it's individual shipments, bulk drops, or kitted gift boxes shipped nationwide." },
  { q: "Will the merch match my brand style and guidelines?", a: "Absolutely. Every project starts with a brand review. We match your colors, logos, fonts, and tone to ensure every piece of merch feels on-brand." },
  { q: "Which industries does Merch Club work with?", a: "We work across healthcare, construction, finance, staffing, nonprofits, and more. Our process adapts to industry-specific needs like compliance, safety gear, and event timelines." },
  { q: "How do I get started with Merch Club?", a: "Just fill out our project form or book a call. We'll learn about your goals, recommend products, and build a custom plan — no minimums, no pressure." },
  { q: "Do I need to provide my own designs?", a: "Not at all. Our in-house design team creates custom artwork, mockups, and product layouts. If you have existing assets, we'll work with those too." },
  { q: "What types of products can you source?", a: "Everything from premium apparel and headwear to drinkware, tech accessories, gift boxes, and trade show kits. If it can be branded, we can source it." },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const leftItems = faqItems.filter((_, i) => i % 2 === 0);
  const rightItems = faqItems.filter((_, i) => i % 2 === 1);

  const FAQItem = ({ item, index }: { item: typeof faqItems[0]; index: number }) => {
    const isOpen = openIndex === index;
    return (
      <div className="border-t border-black/10">
        <button
          className="w-full flex items-center justify-between py-5 text-left group"
          onClick={() => setOpenIndex(isOpen ? null : index)}
        >
          <span className="text-base md:text-lg font-medium text-black pr-4">{item.q}</span>
          <span className={`text-xl text-black/50 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
        </button>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0 }}
        >
          <p className="text-sm text-[#666] pb-5 leading-relaxed">{item.a}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      <div>
        {leftItems.map((item, i) => (
          <FAQItem key={i} item={item} index={i * 2} />
        ))}
      </div>
      <div>
        {rightItems.map((item, i) => (
          <FAQItem key={i} item={item} index={i * 2 + 1} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{from: "user"|"bot", text: string}[]>([
    { from: "bot", text: "Hey! 👋 How can we help you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const stickyTriggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const el = stickyTriggerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowStickyBar(true);
        obs.disconnect();
      }
    }, { rootMargin: "0px 0px -20% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const searchableItems = [
    { label: "Services", desc: "Full merch programs, kitting, fulfillment, branded apparel", section: "services" },
    { label: "Industries", desc: "Construction, healthcare, corporate, events", section: "industries" },
    { label: "Process", desc: "Strategy, design, production, fulfillment — from concept to delivery", section: "process" },
    { label: "Case Study", desc: "OneStaff Medical — Nurses Week gift boxes shipped to 48 states", section: "case-study" },
    { label: "Flexible Models", desc: "Bulk sourcing, on-demand stores, kitting, event merch, client gifts", section: "flexible-models" },
    { label: "FAQ", desc: "Common questions about Merch Club services and process", section: "faq" },
    { label: "Contact", desc: "Start a project, book a call, get in touch", section: "contact" },
    { label: "Brands", desc: "Carhartt, Nike, Patagonia, Yeti, and more", section: "brands" },
    { label: "Testimonials", desc: "Real reviews from Merch Club clients", section: "testimonials" },
  ];

  const filteredResults = searchQuery.trim()
    ? searchableItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchableItems;

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Merch Club",
      "url": "https://merchclub.com",
      "logo": "https://merchclub.com/opengraph.jpg",
      "telephone": "+1-531-777-0347",
      "email": "chris@merchclub.com",
      "address": { "@type": "PostalAddress", "streetAddress": "12020 Shamrock Plaza, Suite 200", "addressLocality": "Omaha", "addressRegion": "NE", "postalCode": "68154", "addressCountry": "US" },
      "sameAs": [
        "https://www.facebook.com/MerchClubPro",
        "https://www.instagram.com/merchclub_ig/",
        "https://www.linkedin.com/company/merchclub/",
        "https://www.tiktok.com/@merchclub_tt",
        "https://www.youtube.com/@MerchClubPro"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://merchclub.com",
      "name": "Merch Club",
      "description": "Full-service branded merchandise programs.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://merchclub.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Merch Club Services",
      "itemListElement": timelineSteps.map((s, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": { "@type": "Service", "name": s.title, "description": s.desc, "provider": { "@type": "Organization", "name": "Merch Club" } }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "itemReviewed": { "@type": "Organization", "name": "Merch Club" },
      "ratingValue": "5.0",
      "reviewCount": "18",
      "bestRating": "5"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SEO
        title="Full-Service Branded Merchandise"
        description="Full-service branded merchandise programs for teams that take their brand seriously. Strategy, design, proofing, production, kitting, and nationwide distribution — handled by one team."
        path="/"
        imageAlt="Merch Club — Full-Service Branded Merchandise"
        keywords="branded merchandise, custom apparel, promotional products, corporate merch program, kitting and fulfillment, company swag, employee onboarding kits, branded gift boxes, full-service merch agency, custom merch company"
        jsonLd={homeJsonLd}
      />

      <noscript>
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
          <h1>Merch Club — Full-Service Branded Merchandise</h1>
          <p>
            Merch Club is a full-service branded merchandise partner. We handle strategy, design,
            proofing, production, kitting, and nationwide distribution so your brand shows up right —
            every time.
          </p>
          <h2>Our Process</h2>
          <ol>
            {timelineSteps.map((s) => (
              <li key={s.title}><strong>{s.title}:</strong> {s.desc}</li>
            ))}
          </ol>
          <h2>Industries We Serve</h2>
          <ul>
            <li><a href="/industries/healthcare">Healthcare</a> — Hospital and clinic merch programs.</li>
            <li>Construction, finance, staffing, nonprofits, education, hospitality, and corporate.</li>
          </ul>
          <h2>Frequently Asked Questions</h2>
          {faqItems.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
          <h2>Read More</h2>
          <p><a href="/about">About Merch Club</a> · <a href="/blog">Blog</a> · <a href="/industries/healthcare">Healthcare</a></p>
          <h2>Contact</h2>
          <p>Phone: <a href="tel:+15317770347">+1 531-777-0347</a></p>
        </div>
      </noscript>
      <SiteHeader onStartProject={() => setProjectModalOpen(true)} />


      <section className="relative overflow-hidden bg-[#0a0a0a] px-6 sm:px-8 md:px-16 lg:px-20 pt-12 sm:pt-16 pb-14 sm:pb-10">

        <div className="relative flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center mb-10 gap-10 lg:gap-16 w-full max-w-7xl mx-auto">
            <div ref={headlineRef} className="text-center lg:text-left shrink-0 w-full lg:max-w-[320px]">
              <div className="relative flex justify-center lg:justify-start">
                <img src={cloverImg} alt="Merch Club clover" className="h-16 md:h-16 lg:h-20 object-contain mb-5 md:mb-4" style={{ display: 'block', maxWidth: 'fit-content' }} />
              </div>
              <h2 className="text-7xl sm:text-7xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Merch,<br />
                <span className="inline-block overflow-hidden h-[1.1em] align-bottom relative">
                  <span className="invisible">organized.</span>
                  <span
                    className={`absolute inset-x-0 top-0 text-center lg:text-left text-[#a3a3a3] transition-all duration-400 ${isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
                  >
                    {rotatingWords[wordIndex]}
                  </span>
                </span>
              </h2>
              <p className="mt-5 md:mt-4 text-base md:text-base text-[#a3a3a3] leading-relaxed max-w-[420px] md:max-w-[320px] mx-auto lg:mx-0">
                We design and execute structured branded merchandise programs for marketing and operations teams — from trade show kits to multi-location rollouts.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-3 mt-7 md:mt-5 w-full">
                <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center justify-center gap-2 bg-white text-black text-sm md:text-sm font-bold px-7 md:px-6 py-4 md:py-2.5 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap w-full sm:w-auto">
                  Start a Project
                  <svg className="w-4 h-4 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </button>
                <a href="https://calendly.com/merchclub/introductory-call?month=2026-05" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white text-sm md:text-sm font-bold px-7 md:px-6 py-4 md:py-2.5 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap w-full sm:w-auto">
                  Book a Call
                </a>
              </div>
            </div>

            <div className="hidden lg:flex relative items-center justify-center shrink-0">
              <div ref={circle1Ref} className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px] aspect-square rounded-full overflow-hidden relative z-10 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <img src={constructionApparelImg} alt="Branded Carhartt field jacket with embroidered contractor logo — construction crew apparel program by Merch Club" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 hover:bg-black/40 transition-colors">
                  <Link href="/industries/construction" className="bg-white text-black text-[10px] sm:text-[11px] md:text-xs font-bold px-3 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2 rounded-full hover:bg-gray-200 transition-all hover:scale-105 inline-flex items-center gap-1.5 max-w-[85%] text-center justify-center leading-tight">
                    Construction Apparel
                    <svg className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div ref={circle2Ref} className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px] aspect-square rounded-full overflow-hidden -ml-8 sm:-ml-10 md:-ml-12 lg:-ml-16 relative z-20 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <iframe
                  src="https://www.youtube.com/embed/S4aqX1SR_gY?autoplay=1&mute=1&loop=1&playlist=S4aqX1SR_gY&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none"
                  style={{ border: 0 }}
                />
                <div className="absolute inset-0 z-10" />
              </div>

              <div ref={circle3Ref} className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] lg:w-[340px] lg:h-[340px] xl:w-[380px] xl:h-[380px] aspect-square rounded-full overflow-hidden -ml-8 sm:-ml-10 md:-ml-12 lg:-ml-16 relative z-30 border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500">
                <img src={healthcareApparelImg} alt="OneStaff Medical branded healthcare staff apparel — nurse and clinical team uniform program by Merch Club" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 hover:bg-black/40 transition-colors">
                  <Link href="/industries/healthcare" className="bg-white text-black text-[10px] sm:text-[11px] md:text-xs font-bold px-3 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2 rounded-full hover:bg-gray-200 transition-all hover:scale-105 inline-flex items-center gap-1.5 max-w-[85%] text-center justify-center leading-tight">
                    Healthcare Apparel
                    <svg className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="lg:hidden -mx-6 sm:-mx-8 mt-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-5 animate-[marquee_30s_linear_infinite]">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex shrink-0 gap-5">
                {[
                  { href: "/industries/construction", img: constructionApparelImg, label: "Construction" },
                  { href: "/industries/healthcare", img: healthcareApparelImg, label: "Healthcare" },
                  { href: "/industries/corporate", img: corporateImg, label: "Corporate" },
                  { href: "/industries/events", img: eventsImg, label: "Events" },
                ].map((c, i) => (
                  <Link key={`${dup}-${i}`} href={c.href} className="group relative shrink-0 w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] aspect-square rounded-full overflow-hidden border-4 border-[#0a0a0a] block">
                    <img src={c.img} alt={`${c.label} branded apparel and merchandise program — industry-specific merch execution by Merch Club`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <span className="bg-white text-black text-[11px] font-bold px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 leading-none">
                        {c.label}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-white py-3 -rotate-1 scale-105 relative z-10 -mt-5">
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

      <section ref={stickyTriggerRef} id="services" className="relative bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 flex items-center justify-center order-2 md:order-1">
            <RotatingCards />
          </div>

          <div className="flex-1 text-left order-1 md:order-2">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Custom merch<br />isn't complicated.<br />
              <span className="text-[#888]">Coordinating it is.</span>
            </h3>
            <p className="mt-6 md:mt-8 text-sm md:text-base text-[#666] leading-relaxed max-w-lg">
              Ordering branded merchandise usually means juggling emails, approvals, shipping timelines, and product quality. Different vendors. Different deadlines. Different headaches. Merch Club replaces that chaos with one organized system. You get a dedicated team, clear timelines, and merch that actually reflects your brand.
            </p>
          </div>
        </div>
      </section>

      <BetterWaySection onStartProject={() => setProjectModalOpen(true)} />

      <section id="industries" className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <RevealItem delay={0}>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Industry-Specific Execution
            </h3>
            <p className="mt-4 text-sm md:text-base text-[#888] leading-relaxed max-w-3xl mx-auto text-center">
              We support healthcare systems, construction firms, corporate teams, and event-driven organizations with structured merchandise programs.
            </p>
          </RevealItem>

          <div className="mt-16 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-0">
              {[
                { label: "Construction", img: constructionImg, href: "/industries/construction" },
                { label: "Healthcare", img: healthcareApparelImg, href: "/industries/healthcare" },
                { label: "Corporate", img: industryCorporateImg, href: "/industries/corporate" },
                { label: "Events", img: industryEventsImg, href: "/industries/events" },
              ].map((item, i) => (
                <RevealItem key={item.label} delay={200 + i * 150} className={`${i > 0 ? "sm:-ml-8 md:-ml-12 lg:-ml-16" : ""} relative`} style={undefined}>
                  <div className={`w-[170px] h-[170px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[320px] lg:h-[320px] xl:w-[350px] xl:h-[350px] aspect-square rounded-full overflow-hidden border-4 border-[#0a0a0a] hover:scale-105 transition-transform duration-500 relative mx-auto`} style={{ zIndex: i + 10 }}>
                    <img src={item.img} alt={`${item.label} branded apparel and merchandise programs — Merch Club industry execution`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                      <Link href={item.href} className="bg-white text-black text-xs sm:text-sm md:text-sm font-bold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-2.5 rounded-full inline-flex items-center gap-1.5 sm:gap-2 hover:bg-gray-200 transition-all hover:scale-105" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
                        {item.label}
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="brands" className="bg-[#0a0a0a] py-8 md:py-12 overflow-hidden -mt-[75px]">
        <RevealItem delay={0}>
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#555] mb-10">Brands We Work With</p>
        </RevealItem>
        {[
          { brands: ["Carhartt", "Nike", "Adidas", "Yeti", "Solo Stove", "Patagonia", "The North Face"], direction: "marquee", duration: "35s" },
          { brands: ["Under Armour", "Columbia", "Stanley", "TravisMathew", "Callaway", "Peter Millar", "OGIO"], direction: "marquee-reverse", duration: "40s" },
          { brands: ["Titleist", "Vineyard Vines", "Hanes", "Champion", "Bella+Canvas", "Next Level"], direction: "marquee", duration: "32s" },
        ].map((row, rowIdx) => (
          <div key={rowIdx} className="overflow-hidden py-4 border-t border-white/5" style={{ animationDelay: `${rowIdx * 200}ms` }}>
            <div className="flex whitespace-nowrap" style={{ animation: `${row.direction} ${row.duration} linear infinite` }}>
              {[...Array(4)].map((_, rep) => (
                <div key={rep} className="flex items-center shrink-0">
                  {row.brands.map((brand, j) => (
                    <span key={`${rep}-${j}`} className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight text-[#666] hover:text-[#999] transition-colors duration-300 mx-6 md:mx-10 flex items-center gap-3 md:gap-4 shrink-0" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#444] shrink-0" />
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="case-study" className="bg-white py-16 md:py-24 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
            <div className="lg:w-[45%] flex flex-col justify-between">
              <div>
                <RevealItem delay={0}>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Meet the brands putting our <span className="text-[#888]">process to work.</span>
                  </h3>
                </RevealItem>

                <RevealItem delay={100}>
                  <div className="flex items-center gap-4 mb-10">
                    <span className="text-xs font-bold text-black border border-black/20 rounded-full px-4 py-1.5">ONESTAFF MEDICAL · NURSE GIFTING</span>
                  </div>
                </RevealItem>

                <RevealItem delay={200}>
                  <div className="mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#888] block mb-4">Services delivered</span>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {["Nurses Week gifting", "Holiday gifting", "Travel-nurse product design", "Custom kitting & fulfillment"].map((tool) => (
                        <div key={tool} className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-[#888] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-[#666]">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealItem>

                <RevealItem delay={300}>
                  <blockquote className="border-l-2 border-black/15 pl-5 mb-8">
                    <p className="text-base md:text-lg text-black/80 leading-relaxed font-medium italic">
                      "Heyo. The traveler holiday gifts were a hit. Merch Club made the process easy, brought us ideas that didn't feel cookie-cutter, and helped us send something that actually felt thoughtful. That's always the bar for us, and they nailed it."
                    </p>
                    <footer className="mt-4">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#888]">Marketing Director</span>
                      <span className="text-xs text-[#aaa] ml-2">— OneStaff Medical</span>
                    </footer>
                  </blockquote>
                </RevealItem>
              </div>

            </div>

            <RevealItem delay={200} className="lg:w-[55%] relative">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-black/10">
                  <img src={onestaffImg} alt="OneStaff Medical travel nurse at sunrise with branded blanket — wanderlust-driven nurse gifting" className="w-full h-[300px] sm:h-[380px] md:h-[500px] object-cover" />
                </div>

                <div className="hidden md:block absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl border border-black/10 p-5 max-w-[280px] shadow-2xl shadow-black/10">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888] block mb-2">Case Study · Nurse Gifting</span>
                  <h4 className="text-sm font-black text-black leading-snug mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.01em" }}>
                    Travel Nurse Gifting, Built Around the Wanderlust.
                  </h4>
                  <p className="text-[11px] text-[#888] leading-relaxed mb-3">
                    Two annual gifting programs — Nurses Week and the holidays — designed around the way travel nurses actually live, work, and pack.
                  </p>
                  <Link href="/case-studies/nurse-gifting" className="text-[11px] font-bold text-black underline underline-offset-2 hover:text-[#666] transition-colors">
                    Read the case study
                  </Link>
                </div>
              </div>

              <div className="hidden md:grid grid-cols-4 gap-6 mt-8">
                <div>
                  <span className="text-3xl md:text-4xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>2x/yr</span>
                  <p className="text-[10px] text-[#999] mt-1 leading-relaxed">Annual gifting moments</p>
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}><CountUp end={50} /></span>
                  <p className="text-[10px] text-[#999] mt-1 leading-relaxed">States reached</p>
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}><CountUp end={100} suffix="%" /></span>
                  <p className="text-[10px] text-[#999] mt-1 leading-relaxed">On-time delivery</p>
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>1 Roof</span>
                  <p className="text-[10px] text-[#999] mt-1 leading-relaxed">Design → kitting → fulfillment</p>
                </div>
              </div>

              <div className="md:hidden mt-4 bg-[#f5f5f5] rounded-xl border border-black/10 p-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888] block mb-2">Case Study · Nurse Gifting</span>
                <h4 className="text-sm font-black text-black leading-snug mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.01em" }}>
                  Travel Nurse Gifting, Built Around the Wanderlust.
                </h4>
                <p className="text-[11px] text-[#888] leading-relaxed mb-3">
                  Two annual gifting programs — Nurses Week and the holidays — designed around the way travel nurses actually live, work, and pack.
                </p>
                <Link href="/case-studies/nurse-gifting" className="text-[11px] font-bold text-black underline underline-offset-2 hover:text-[#666] transition-colors">
                  Read the case study
                </Link>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-24 md:py-32 overflow-hidden">
        <RotatingTestimonials />

      </section>

      <TrustedBrandsSection />

      <StickyTimeline />

      <section className="bg-[#141414] py-24 md:py-32 px-8 md:px-16 lg:px-20 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16 mb-16">
            <RevealItem delay={0}>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] max-w-xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Less coordination. More control.
              </h3>
            </RevealItem>
            <RevealItem delay={100}>
              <p className="text-sm md:text-base text-[#888] leading-relaxed max-w-md md:pt-2">
                Instead of managing multiple vendors, you work with one partner who oversees the entire program. That's how branded merchandise stays consistent, scalable, and aligned with the brand.
              </p>
            </RevealItem>
          </div>

          <RevealItem delay={200}>
            <div className="relative rounded-2xl border border-white/10 bg-[#161616] overflow-hidden shadow-2xl shadow-black/50 max-w-5xl mx-auto">
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/5 rounded-md px-4 py-1">
                    <span className="text-[10px] text-white/30 font-medium">portal.merchclub.com</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={dashboardScreenImg}
                  alt="Merch Club Client Portal Dashboard"
                  className="w-full h-auto block"
                />

                <div className="hidden sm:block absolute top-[16%] right-[8%] animate-[dashPulse_3s_ease-in-out_infinite]">
                  <div className="bg-white rounded-xl shadow-lg shadow-black/20 px-3 py-2 flex items-center gap-2 border border-black/5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-800">Shipment Confirmed</span>
                    <span className="text-[9px] text-gray-400">Just now</span>
                  </div>
                </div>

                <div className="hidden sm:block absolute top-[42%] left-[5%] animate-[dashFloat_4s_ease-in-out_infinite_1s]">
                  <div className="bg-white rounded-xl shadow-lg shadow-black/20 px-3 py-2 border border-black/5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="text-[10px] font-bold text-gray-800">On-time rate</span>
                    </div>
                    <span className="text-lg font-black text-gray-900">98.4%</span>
                  </div>
                </div>

                <div className="hidden sm:block absolute bottom-[18%] right-[12%] animate-[dashFloat_5s_ease-in-out_infinite_2s]">
                  <div className="bg-white rounded-xl shadow-lg shadow-black/20 px-3 py-2 border border-black/5 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-800 block">12 Delivered</span>
                      <span className="text-[8px] text-gray-400">This quarter</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block absolute top-[60%] right-[3%] animate-[dashCursor_6s_ease-in-out_infinite_0.5s] pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 3l14 8-6 2-4 6-4-16z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <div className="absolute top-5 left-4 bg-black/80 rounded-md px-2 py-0.5 whitespace-nowrap">
                    <span className="text-[8px] text-white font-medium">View tracking</span>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-[15%] left-[15%] w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-[dashGlow_4s_ease-in-out_infinite]" />
                  <div className="absolute bottom-[25%] right-[20%] w-24 h-24 bg-green-400/10 rounded-full blur-3xl animate-[dashGlow_5s_ease-in-out_infinite_2s]" />
                </div>
              </div>
            </div>
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 pt-16 border-t border-white/5">
            <RevealItem delay={300}>
              <div>
                <div className="w-8 h-[2px] bg-white/30 mb-5" />
                <h4 className="text-base md:text-lg font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.02em" }}>
                  Real-time order visibility
                </h4>
                <p className="text-sm text-[#666] leading-relaxed">
                  Track every project from production through delivery. No more chasing vendors for updates or wondering where things stand.
                </p>
              </div>
            </RevealItem>
            <RevealItem delay={400}>
              <div>
                <div className="w-8 h-[2px] bg-white/30 mb-5" />
                <h4 className="text-base md:text-lg font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.02em" }}>
                  One dashboard for everything
                </h4>
                <p className="text-sm text-[#666] leading-relaxed">
                  Active projects, confirmed shipments, pending items, and delivery history — all in one place. Open it once and you're caught up.
                </p>
              </div>
            </RevealItem>
            <RevealItem delay={500}>
              <div>
                <div className="w-8 h-[2px] bg-white/30 mb-5" />
                <h4 className="text-base md:text-lg font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.02em" }}>
                  Confirmed timelines you can count on
                </h4>
                <p className="text-sm text-[#666] leading-relaxed">
                  Projected ship dates, carrier tracking, and expected arrivals — locked in and visible before you have to ask.
                </p>
              </div>
            </RevealItem>
          </div>

          <RevealItem delay={600}>
            <div className="mt-16 text-center">
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-gray-200 transition-colors">
                See How It Works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </RevealItem>
        </div>
      </section>

      <section id="flexible-models" className="bg-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 mb-16">
          <RevealItem delay={0}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">Built For Every Size Business</span>
          </RevealItem>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <RevealItem delay={100}>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] max-w-2xl text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Flexible models. Same execution standard.
              </h3>
            </RevealItem>
            <RevealItem delay={200}>
              <p className="text-sm text-[#666] leading-relaxed max-w-md">
                Whether you're a small business ordering your first batch of branded gear or a large corporation running multi-location programs — we have a merch solution built for you. Different scale, same operational excellence.
              </p>
            </RevealItem>
          </div>
        </div>

        {(() => {
          const flexCards = [
            { img: bulkSourcingImg, label: "MERCH CLUB", title: "Bulk product sourcing", desc: "Large-quantity orders with coordinated production, quality checks, and delivery timelines." },
            { img: onDemandStoreImg, label: "BRANDINI", title: "On-demand merch stores", desc: "Branded storefronts for distributed teams — individual orders, centrally managed." },
            { img: kittingNewImg, label: "MERCH CLUB", title: "Kitting & fulfillment", desc: "Custom kits assembled and shipped to any number of locations on your schedule." },
            { img: eventMerchImg, label: "MERCH CLUB", title: "Event merchandise", desc: "Trade show kits, conference swag, and event drops — sourced, branded, and delivered on time." },
            { img: industrySpecificImg, label: "SCRUB CLUB", title: "Industry-specific programs", desc: "Uniforms, safety gear, and branded workwear managed under one structured program." },
            { img: employeeGiftsImg, label: "BRANDINI", title: "Client & employee gifts", desc: "Premium branded gifts curated, packaged, and shipped directly to recipients." },
          ];
          return (
            <div className="relative">
              <div className="flex gap-6 animate-[flexScroll_30s_linear_infinite] hover:[animation-play-state:paused] w-max">
                {[...flexCards, ...flexCards].map((card, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[320px] group">
                    <div className="relative rounded-2xl overflow-hidden bg-[#f5f5f5] border border-black/5 hover:border-black/15 transition-all duration-500 h-full">
                      <div className="relative h-[220px] overflow-hidden">
                        <img src={card.img} alt={`${card.title} — branded merchandise program by Merch Club`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f5] via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#888] mb-3 block">{card.label}</span>
                        <h4 className="text-lg font-black text-black mb-2 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
                          {card.title}
                        </h4>
                        <p className="text-sm text-[#888] leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <RevealItem delay={300}>
            <button
              onClick={() => setProjectModalOpen(true)}
              className="bg-black text-white text-sm font-bold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              Start a Bulk Order Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </RevealItem>
          <RevealItem delay={400}>
            <a
              href="https://trybrandini.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black/20 text-black text-sm font-bold px-8 py-3.5 rounded-full hover:bg-black/5 transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              Build Your On-Demand Store
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </RevealItem>
        </div>
      </section>

      {/* Team section hidden — will move to separate page */}

      <section className="bg-white py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <RevealItem delay={0}>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] block mb-4">From the Blog</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Insights & Ideas
              </h3>
            </RevealItem>
            <RevealItem delay={100}>
              <Link href="/blog" className="text-sm font-bold text-black underline underline-offset-4 hover:text-[#666] transition-colors">
                View all posts
              </Link>
            </RevealItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                slug: "merch-program-strategy",
                img: blogKittingImg,
                tag: "Strategy",
                title: "Why Your Merch Program Needs a Strategy — Not Just a Vendor",
                excerpt: "Most companies treat branded merchandise like an afterthought. Here's why a strategic approach changes everything — from employee retention to brand perception.",
                date: "Apr 2, 2026",
              },
              {
                slug: "custom-kitting-brand-experience",
                img: blogPackagingImg,
                tag: "Kitting",
                title: "The Hidden Cost of Unboxing: How Custom Kitting Elevates Brand Experience",
                excerpt: "A great product means nothing if the unboxing falls flat. We break down how thoughtful kitting turns a delivery into a brand moment.",
                date: "Mar 18, 2026",
              },
              {
                slug: "branded-merchandise-mistakes",
                img: blogCityImg,
                tag: "Corporate",
                title: "5 Branded Merchandise Mistakes That Make Your Company Look Amateur",
                excerpt: "From inconsistent logos to cheap materials, these common missteps undermine your brand. Learn what separates forgettable swag from strategic merch.",
                date: "Mar 5, 2026",
              },
            ].map((post, i) => (
              <RevealItem key={i} delay={200 + i * 150}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-black/10 mb-5">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-[220px] md:h-[260px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">{post.tag}</span>
                  <h4 className="text-lg md:text-xl font-black text-black leading-snug mt-2 mb-3 group-hover:text-[#555] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
                    {post.title}
                  </h4>
                  <p className="text-sm text-[#777] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-[11px] text-[#aaa] font-medium">{post.date}</span>
                </Link>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-16 md:py-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <RevealItem delay={0}>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#888] border border-black/15 rounded-full px-4 py-1.5 mb-5">FAQ's</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                Frequently Asked Questions
              </h3>
            </div>
          </RevealItem>
          <FAQAccordion />
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-32 px-8 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <RevealItem delay={0}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a3a3a3]">Ready to elevate your brand?</span>
          </RevealItem>
          <RevealItem delay={100}>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mt-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Ready to simplify branded<br />merchandise?
            </h3>
          </RevealItem>
          <RevealItem delay={200}>
            <p className="text-sm md:text-base text-[#888] leading-relaxed max-w-xl mx-auto mt-6">
              Whether you're launching a merch line, outfitting a team, or planning a branded campaign — we're ready when you are.
            </p>
          </RevealItem>
          <RevealItem delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors">
                Start a Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
              <a href="https://calendly.com/merchclub/introductory-call?month=2026-05" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-bold px-8 py-3.5 rounded-full hover:border-white/50 hover:bg-white/5 transition-all">
                Book a Call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </RevealItem>
        </div>
      </section>
      <SiteFooter />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a] border-t border-white/10 px-4 py-3 flex items-center gap-2 shadow-2xl transition-all duration-300" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))", opacity: showStickyBar ? 1 : 0, pointerEvents: showStickyBar ? "auto" : "none", transform: showStickyBar ? "translateY(0)" : "translateY(100%)" }}>
        <a href="tel:+15317770347" className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Call Merch Club">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01" /></svg>
        </a>
        <button onClick={() => setProjectModalOpen(true)} className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-full hover:bg-gray-200 transition-colors">
          Start a Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
        </button>
      </div>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-24 px-2 sm:px-4" onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ animation: "card-enter 0.25s ease-out forwards" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-black/10">
              <svg className="w-5 h-5 text-[#999] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Merch Club..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 text-base text-black placeholder-[#bbb] bg-transparent outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="text-[#aaa] hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <button
                    key={item.section}
                    className="w-full flex items-start gap-4 px-6 py-4 hover:bg-[#f5f5f5] transition-colors text-left border-b border-black/5 last:border-0"
                    onClick={() => {
                      setSearchOpen(false);
                      const el = document.getElementById(item.section);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      else if (item.section === "contact") setProjectModalOpen(true);
                    }}
                  >
                    <div>
                      <span className="text-sm font-bold text-black">{item.label}</span>
                      <p className="text-xs text-[#888] mt-0.5">{item.desc}</p>
                    </div>
                    <svg className="w-4 h-4 text-[#ccc] shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ))
              ) : (
                <div className="px-6 py-10 text-center">
                  <p className="text-sm text-[#888]">No results found for "{searchQuery}"</p>
                  <p className="text-xs text-[#bbb] mt-1">Try searching for services, industries, or FAQ</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ animation: "card-enter 0.25s ease-out forwards", height: "420px" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
                </svg>
              </div>
              <div>
                <h5 className="text-sm font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Merch Club</h5>
                <span className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />Online</span>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-[#666] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === "user" ? "bg-white text-black rounded-br-sm" : "bg-[#1a1a1a] text-[#ccc] rounded-bl-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (!chatInput.trim()) return;
              setChatMessages(prev => [...prev, { from: "user", text: chatInput }]);
              const input = chatInput;
              setChatInput("");
              setTimeout(() => {
                const replies = [
                  "Thanks for reaching out! One of our team members will follow up shortly.",
                  "Great question! We'd love to chat more — feel free to start a project or book a call above.",
                  "We typically turn projects around in 2-4 weeks depending on scope. Want to tell us more about yours?",
                ];
                setChatMessages(prev => [...prev, { from: "bot", text: replies[Math.floor(Math.random() * replies.length)] }]);
              }, 1000);
            }}
            className="p-3 border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-[#555] focus:outline-none focus:border-white/30 transition-colors"
            />
            <button type="submit" className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setChatOpen(prev => !prev)}
        className="fixed bottom-24 lg:bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105"
        aria-label="Chat"
      >
        {chatOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}
      </button>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 lg:bottom-6 right-24 z-40 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all duration-300"
        style={{ opacity: showBackToTop ? 1 : 0, pointerEvents: showBackToTop ? "auto" : "none", transform: showBackToTop ? "translateY(0)" : "translateY(16px)" }}
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
