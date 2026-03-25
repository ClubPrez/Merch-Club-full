import logoSrc from "@assets/Social_PostsArtboard_3@3x_1774446241907.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1200px] bg-black rounded-[24px] overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Merch Club" className="h-8 object-contain invert" />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Products</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <button className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
            Shop Now
          </button>
        </header>

        <div className="p-3 md:p-4">
          <div className="grid grid-cols-12 gap-3 auto-rows-auto">
            <div className="col-span-12 md:col-span-5 grid grid-rows-[auto_1fr] gap-3">
              <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 flex gap-4">
                <div className="flex flex-col justify-center">
                  <h1
                    className="text-[64px] md:text-[80px] font-black leading-[0.85] tracking-[-0.04em] text-black"
                    style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
                  >
                    MODISK
                  </h1>
                </div>
                <div className="flex flex-col justify-center gap-4 flex-1">
                  <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight text-black">
                    FORGED IN TECH.<br />READY FOR THE<br />UNKNOWN.
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {["SHOCKPROOF", "IP68 RATING", "DUSTPROOF", "SMART SLEEP MODE", "THERMAL STABILITY"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase px-2.5 py-1 bg-black text-white rounded-full tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#e63220]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm font-bold text-black tracking-tight">UP TO 1050 MB/S</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 rounded-[20px] overflow-hidden relative min-h-[280px] md:min-h-[340px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#0a0a0a]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute top-4 right-4 w-16 h-24">
                    <div className="w-full h-full rounded-lg bg-gradient-to-b from-red-600 to-red-700 transform rotate-[-5deg]" />
                    <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 border-2 border-red-400 rounded-full" style={{ borderStyle: "solid", borderColor: "#c44", clipPath: "inset(50% 0 0 0)" }} />
                    </div>
                  </div>
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-[#e8e0d8] to-[#d0c8c0] flex items-center justify-center shadow-2xl transform rotate-[-8deg]">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[#e63220] flex items-center justify-center">
                      <span className="text-white text-xs font-bold tracking-wider">MODISK</span>
                    </div>
                  </div>
                  <div className="absolute top-1/4 left-1/4 w-1 h-20 bg-gradient-to-b from-gray-500 to-transparent transform rotate-[15deg]" />
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 rounded-[20px] overflow-hidden relative min-h-[200px] md:min-h-[240px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="flex gap-3">
                  <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 transform rotate-[-5deg] shadow-lg">
                    <div className="w-full h-full rounded-lg overflow-hidden flex items-end p-1.5">
                      <div className="w-4 h-4 rounded-sm bg-[#e63220]" />
                    </div>
                  </div>
                  <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 transform rotate-[3deg] shadow-lg">
                    <div className="w-full h-full rounded-lg overflow-hidden flex items-end p-1.5">
                      <div className="w-4 h-4 rounded-sm bg-[#e63220]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 bg-[#e63220] rounded-[20px] p-6 md:p-8 flex flex-col justify-between min-h-[200px] md:min-h-[240px]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg md:text-xl font-black text-white leading-tight tracking-tight max-w-[340px]">
                  BUILT FOR THE FIELD. TRUSTED IN THE STUDIO. NEVER OUT OF POWER.
                </h3>
                <div className="text-right flex-shrink-0">
                  <span className="text-[56px] md:text-[72px] font-black text-white leading-none">20</span>
                  <span className="text-lg font-bold text-white/80 ml-1">hr</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-white/90 text-sm font-medium">
                  &bull; Charging Time 90 minutes
                </p>
              </div>
            </div>

            <div className="col-span-12 grid grid-cols-12 gap-3">
              <div className="col-span-12 md:col-span-7 bg-white border border-gray-200 rounded-[20px] p-6 md:p-8">
                <ul className="space-y-2 text-sm text-gray-800 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-0.5">&bull;</span>
                    <span>Available in 1TB | 2TB | 4TB SSD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-0.5">&bull;</span>
                    <span>Ultra-fast read/write speeds up to 1050MB/s</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-0.5">&bull;</span>
                    <span>Compatible with Windows, macOS, iOS, and Linux</span>
                  </li>
                </ul>
                <button className="mt-6 border-2 border-black text-black text-sm font-bold px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-200 tracking-wide">
                  EXPLORE NOW
                </button>
              </div>

              <div className="col-span-12 md:col-span-5 rounded-[20px] overflow-hidden relative min-h-[180px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-gray-400 to-gray-500 shadow-md transform"
                        style={{ rotate: `${(i % 3 - 1) * 5}deg` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
