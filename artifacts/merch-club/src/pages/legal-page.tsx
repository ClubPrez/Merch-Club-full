import { ReactNode } from "react";
import SEO from "@/components/seo";
import Breadcrumbs from "@/components/breadcrumbs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  eyebrow: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
  seoTitle: string;
  seoDescription: string;
  path: string;
  breadcrumbLabel: string;
}

export function LegalPage({
  title,
  eyebrow,
  lastUpdated,
  intro,
  sections,
  seoTitle,
  seoDescription,
  path,
  breadcrumbLabel,
}: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEO title={seoTitle} description={seoDescription} path={path} />
      <SiteHeader />

      <main>
        <section className="bg-black text-white">
          <div className="max-w-3xl mx-auto px-8 md:px-16 lg:px-20 pt-32 pb-20">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]} />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] mt-8 mb-4">{eyebrow}</p>
            <h1
              className="text-5xl md:text-7xl leading-[0.95] mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "-0.01em" }}
            >
              {title}
            </h1>
            <p className="text-sm text-[#888]">Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-8 md:px-16 lg:px-20 py-20">
          <div className="text-base text-[#333] leading-relaxed mb-12">{intro}</div>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2
                  className="text-2xl md:text-3xl mb-4 text-black"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}
                >
                  {s.heading}
                </h2>
                <div className="text-base text-[#444] leading-relaxed space-y-4">{s.body}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-black/10 text-sm text-[#666]">
            Questions? Email{" "}
            <a href="mailto:hello@merchclub.com" className="text-black underline hover:no-underline">
              hello@merchclub.com
            </a>
            .
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
