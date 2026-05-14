import { useState } from "react";
import { Link, useLocation } from "wouter";
import { IndustriesMegaMenu } from "./industries-mega-menu";
import { CaseStudiesMenu } from "./case-studies-menu";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";

interface Props {
  onStartProject: () => void;
  onOpenSearch?: () => void;
}

const NAV_LINKS: { label: string; href: string; xlOnly?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Learning Center", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_ONLY_LINKS = [
  { label: "Industries", href: "/industries" },
];

export function SiteHeader({ onStartProject, onOpenSearch }: Props) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location === href || location.startsWith(href + "/");
  };

  const industriesActive = location.startsWith("/industries");
  const caseStudiesActive = location.startsWith("/case-studies");

  return (
    <>
      <div className="hidden md:flex items-center justify-end gap-8 px-6 md:px-10 py-2 bg-[#222] border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em]">
        <a href="/" className="text-white transition-colors">MerchClub</a>
        <span className="text-white/20">|</span>
        <a href="https://trybrandini.com/" target="_blank" rel="noopener noreferrer" className="text-[#a3a3a3] hover:text-white transition-colors">Brandini</a>
        <span className="text-white/20">|</span>
        <a href="#" className="text-[#a3a3a3] hover:text-white transition-colors">ScrubClub</a>
      </div>

      <header className="sticky top-0 z-40 bg-[#111]/95 backdrop-blur-md border-b border-white/10 px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 xl:gap-8">
          <Link href="/" className="shrink-0">
            <img src={logoSrc} alt="Merch Club" className="h-7 xl:h-8 w-auto object-contain invert shrink-0" />
          </Link>
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-[11px] xl:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            {NAV_LINKS.slice(0, 3).map((link) => {
              const cls = link.xlOnly ? "hidden xl:inline-flex" : "";
              return isActive(link.href) ? (
                <span key={link.href} className={`text-white ${cls}`}>{link.label}</span>
              ) : (
                <Link key={link.href} href={link.href} className={`text-[#a3a3a3] hover:text-white transition-colors ${cls}`}>
                  {link.label}
                </Link>
              );
            })}
            <IndustriesMegaMenu active={industriesActive} />
            <CaseStudiesMenu active={caseStudiesActive} />
            {NAV_LINKS.slice(3).map((link) => {
              const cls = link.xlOnly ? "hidden xl:inline-flex" : "";
              return isActive(link.href) ? (
                <span key={link.href} className={`text-white ${cls}`}>{link.label}</span>
              ) : (
                <Link key={link.href} href={link.href} className={`text-[#a3a3a3] hover:text-white transition-colors ${cls}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/MerchClubPro" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hidden 2xl:flex items-center text-[#a3a3a3] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="https://www.instagram.com/merchclub_ig/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden 2xl:flex items-center text-[#a3a3a3] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
          </a>
          <a href="tel:+15317770347" className="hidden 2xl:flex items-center gap-2 text-xs text-[#a3a3a3] hover:text-white transition-colors font-medium tracking-wide whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            +1 531-777-0347
          </a>
          {onOpenSearch && (
            <button onClick={onOpenSearch} aria-label="Search" className="hidden lg:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 hover:bg-white/15 transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span className="text-xs text-gray-400 font-medium tracking-wide">SEARCH</span>
            </button>
          )}
          <button
            onClick={onStartProject}
            className="hidden lg:inline-flex items-center gap-2 bg-white text-black text-[11px] xl:text-xs font-bold uppercase tracking-widest px-4 xl:px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            Start a Project
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111] border-b border-white/10 px-6 py-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest ${isActive(link.href) ? "text-white" : "text-[#a3a3a3]"} hover:text-white transition-colors`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/industries"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest ${industriesActive ? "text-white" : "text-[#a3a3a3]"} hover:text-white transition-colors`}
            >
              Industries
            </Link>
            <Link
              href="/case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm font-bold uppercase tracking-widest ${caseStudiesActive ? "text-white" : "text-[#a3a3a3]"} hover:text-white transition-colors`}
            >
              Case Studies
            </Link>
            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest ${isActive(link.href) ? "text-white" : "text-[#a3a3a3]"} hover:text-white transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => { setMobileMenuOpen(false); onStartProject(); }}
              className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
            >
              Start a Project
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
            <a href="tel:+15317770347" className="text-xs text-[#a3a3a3] text-center font-medium tracking-wide">+1 531-777-0347</a>
          </div>
        </div>
      )}
    </>
  );
}
