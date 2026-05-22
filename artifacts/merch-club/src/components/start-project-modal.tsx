import { useState, useEffect } from "react";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";

interface Props {
  open: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function StartProjectModal({ open, onClose, onOpenChange }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const close = () => {
    onClose?.();
    onOpenChange?.(false);
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-0 sm:px-4" onClick={close}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-4xl bg-white border border-black/10 sm:rounded-2xl rounded-none max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-5"
        onClick={e => e.stopPropagation()}
        style={{ animation: "card-enter 0.3s ease-out forwards" }}
      >
        <button onClick={close} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white md:text-[#aaa] md:hover:text-black transition-colors z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <aside className="md:col-span-2 bg-black text-white p-6 sm:p-8 md:p-10 flex flex-col">
          <img src={logoSrc} alt="Merch Club" className="h-8 object-contain mb-6 brightness-0 invert" />
          <h4 className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Let's Get Your<br />Merch <span className="text-white/60">Handled.</span>
          </h4>
          <p className="text-sm text-white/60 mt-3 leading-relaxed">
            Prefer to skip the form? Reach us directly — a human responds within one business day.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <a href="mailto:chris@merchclub.com?subject=New%20Project%20Inquiry" className="group flex items-start gap-3 text-white/80 hover:text-white transition-colors">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-0.5">Email</div>
                <div className="break-all">chris@merchclub.com</div>
              </div>
            </a>

            <a href="tel:+15317770347" className="group flex items-start gap-3 text-white/80 hover:text-white transition-colors">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-0.5">Phone</div>
                <div>(531) 777-0347</div>
              </div>
            </a>

            <div className="flex items-start gap-3 text-white/80">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a5.25 5.25 0 016.775 7.225l-4.95 7.025a2.25 2.25 0 01-3.65 0l-4.95-7.025A5.25 5.25 0 0112 6.75z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-0.5">Studio</div>
                <div>Omaha, Nebraska</div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-white/80">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-0.5">Hours</div>
                <div>Mon–Fri · 8a–6p CT</div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">What Happens Next</p>
            <ol className="text-xs text-white/70 space-y-1.5 leading-relaxed">
              <li><span className="text-white/40 mr-2">01</span>Quick reply within 24h</li>
              <li><span className="text-white/40 mr-2">02</span>30-min scoping call</li>
              <li><span className="text-white/40 mr-2">03</span>Written proposal &amp; timeline</li>
            </ol>
          </div>
        </aside>

        <div className="md:col-span-3 p-6 sm:p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-12">
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
              <h4 className="text-3xl md:text-4xl font-black text-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Start a Project</h4>
              <p className="text-sm text-[#888] mt-1 mb-6 leading-relaxed">
                Tell us what you're thinking. You don't need it all figured out — give us the basics and we'll take it from there.
              </p>

              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Name" required className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
                  <input type="text" placeholder="Company" className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="email" placeholder="Work email" required className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
                  <input type="tel" placeholder="Phone (optional)" className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors" />
                </div>

                <select required defaultValue="" className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-black/30 transition-colors appearance-none">
                  <option value="" disabled>Project type</option>
                  <option value="apparel">Staff &amp; crew apparel</option>
                  <option value="gifting">Client or employee gifting</option>
                  <option value="onboarding">Onboarding kits</option>
                  <option value="trade-show">Trade show / event kits</option>
                  <option value="awareness">Awareness campaign</option>
                  <option value="other">Something else</option>
                </select>

                <textarea placeholder="What are you looking to create? A few sentences is plenty." rows={4} required className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black placeholder-[#aaa] focus:outline-none focus:border-black/30 transition-colors resize-none" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select defaultValue="" className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-black/30 transition-colors appearance-none">
                    <option value="" disabled>Timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="2-weeks">Within 2 weeks</option>
                    <option value="1-month">Within a month</option>
                    <option value="2-3-months">2–3 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                  <select defaultValue="" className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-4 py-3 text-sm text-black focus:outline-none focus:border-black/30 transition-colors appearance-none">
                    <option value="" disabled>Estimated budget</option>
                    <option value="under-5k">Under $5K</option>
                    <option value="5-15k">$5K–$15K</option>
                    <option value="15-50k">$15K–$50K</option>
                    <option value="50k-plus">$50K+</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-black text-white text-sm font-bold py-3.5 rounded-full hover:bg-black/80 transition-colors mt-2">
                  Start My Project
                </button>
                <p className="text-[10px] text-[#bbb] text-center">We respond within one business day. No spam — ever.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
