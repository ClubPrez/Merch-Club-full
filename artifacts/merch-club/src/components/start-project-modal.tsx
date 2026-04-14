import { useState, useEffect } from "react";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";

export function StartProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-0 sm:px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-white border border-black/10 sm:rounded-2xl rounded-none p-6 sm:p-8 md:p-10 max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{ animation: "card-enter 0.3s ease-out forwards" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#aaa] hover:text-black transition-colors z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h4 className="text-2xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>We'll be in touch.</h4>
            <p className="text-sm text-[#888] mt-2">Our team will reach out within 24 hours to get things started.</p>
          </div>
        ) : (
          <>
            <img src={logoSrc} alt="Merch Club" className="h-8 object-contain mb-4" />
            <h4 className="text-3xl md:text-4xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Start a Project</h4>
            <p className="text-sm text-[#888] mt-1 mb-6 leading-relaxed">
              Tell us what you're thinking. We'll handle the rest. You don't need it all figured out. Give us the basics.
            </p>

            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <input type="text" placeholder="Name" required className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
              <input type="email" placeholder="Email" required className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
              <input type="text" placeholder="Company" className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
              <textarea placeholder="What are you looking to create?" rows={3} required className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors resize-none" />
              <select className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-[#aaa] focus:outline-none focus:border-black/30 transition-colors appearance-none">
                <option value="">Timeline</option>
                <option value="asap">ASAP</option>
                <option value="2-weeks">Within 2 weeks</option>
                <option value="1-month">Within a month</option>
                <option value="2-3-months">2–3 months</option>
                <option value="flexible">Flexible</option>
              </select>
              <input type="text" placeholder="Budget (optional)" className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
              <button type="submit" className="w-full bg-black text-white text-sm font-bold py-3.5 rounded-full hover:bg-black/80 transition-colors">
                Start My Project
              </button>
              <p className="text-[10px] text-[#bbb] text-center mt-2">Trusted by teams who care what their merch says about them.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
