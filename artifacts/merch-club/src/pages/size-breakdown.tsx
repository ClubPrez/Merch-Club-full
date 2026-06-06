import { useState } from "react";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { calculateBreakdown, AUDIENCE_TYPES, type AudienceKey, type SizeResult } from "@/lib/sizeData";

const CANONICAL_PATH = "/tools/size-breakdown";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Learning Center", href: "/blog" },
  { label: "Size Breakdown Tool" },
];

const jsonLd = [
  buildBreadcrumbJsonLd(breadcrumbItems),
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Size Breakdown Tool",
    applicationCategory: "BusinessApplication",
    description:
      "Free bulk apparel size breakdown calculator. Enter your total order quantity and audience type to get the optimal size run, so you order the right number of each size.",
    url: `https://merchclub.com${CANONICAL_PATH}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Merch Club", url: "https://merchclub.com" },
  },
];

const FAQS = [
  {
    q: "What size distribution data does this use?",
    a: "The calculator is based on national average unisex apparel distribution data, adjusted by audience type. The baseline reflects broad industry benchmarks across thousands of bulk apparel orders, then modified based on demographic patterns (age, gender skew, activity level, etc.).",
  },
  {
    q: "Does this work for women's cut or youth sizing?",
    a: "The tool outputs unisex sizing recommendations. For women's-cut apparel, select 'Women-Focused' and expect to size down one level relative to standard unisex. For youth sizing, the High School Students profile is the closest match — talk to your merch team to refine further.",
  },
  {
    q: "My order is a mix of field crews and office staff — which audience do I pick?",
    a: "Run two separate calculations: one for your field headcount using 'Men-Focused' (assuming a male-heavy field crew) and one for office staff using 'Corporate / Office'. Combine the results for your final order.",
  },
  {
    q: "Should I order extra safety stock in any sizes?",
    a: "For most programs, we recommend adding 5–10% buffer on M, L, and XL — the three highest-demand sizes — especially for on-demand stores or programs with late joiners. Your Merch Club team can help you plan buffer inventory as part of your overall program.",
  },
  {
    q: "Can I use this for hats, jackets, or other items?",
    a: "This calculator is optimized for unisex T-shirts and similar cut-and-sew apparel. For structured caps, jackets, or bottoms, size distributions vary meaningfully — reach out and we'll help you plan the right run.",
  },
];

export default function SizeBreakdown() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | "">( 100);
  const [audience, setAudience] = useState<AudienceKey>("average");
  const [results, setResults] = useState<SizeResult[] | null>(null);

  function handleCalculate() {
    const qty = typeof quantity === "number" ? quantity : 0;
    if (qty < 1) return;
    setResults(calculateBreakdown(qty, audience));
  }

  const qty = typeof quantity === "number" ? quantity : 0;
  const visibleResults = results ? results.filter(r => r.quantity > 0) : [];
  const maxQty = visibleResults.length ? Math.max(...visibleResults.map(r => r.quantity)) : 1;
  const selectedAudience = AUDIENCE_TYPES.find(a => a.key === audience);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Bulk T-Shirt Size Breakdown Calculator"
        description="Free bulk apparel size breakdown calculator. Enter your total order quantity and audience type to get the optimal size run, so you order the right number of each size."
        path={CANONICAL_PATH}
        type="website"
        jsonLd={jsonLd}
        keywords="bulk t-shirt size calculator, apparel size breakdown, shirt size distribution, bulk order sizes, t-shirt size chart calculator, size run calculator"
      />

      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#0a0a0a] pt-32 pb-20 px-8 md:px-16 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <Breadcrumbs
            items={breadcrumbItems}
            theme="dark"
            className="mb-8 justify-center [&>ol]:justify-center"
          />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#666] block mb-4">
            Merch Club Tools
          </span>
          <h1
            className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Bulk Apparel Size<br />Breakdown Calculator
          </h1>
          <p className="mt-6 text-sm md:text-base text-[#888] max-w-xl mx-auto leading-relaxed">
            Enter your total order quantity and audience type to get the optimal size run — so you order
            the right number of each size, every time.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="py-20 px-8 md:px-16 lg:px-20 bg-white border-b border-black/10">
        <div className="max-w-3xl mx-auto">

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">
                Total Order Quantity
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e =>
                  setQuantity(
                    e.target.value === "" ? "" : Math.max(1, parseInt(e.target.value) || 1),
                  )
                }
                className="w-full border border-black/20 rounded-xl px-4 py-3.5 text-lg font-bold text-black focus:outline-none focus:border-black transition-colors"
                placeholder="e.g. 100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-2">
                Audience Type
              </label>
              <div className="relative">
                <select
                  value={audience}
                  onChange={e => setAudience(e.target.value as AudienceKey)}
                  className="w-full border border-black/20 rounded-xl px-4 py-3.5 text-sm font-medium text-black focus:outline-none focus:border-black transition-colors bg-white appearance-none pr-10"
                >
                  {AUDIENCE_TYPES.map(a => (
                    <option key={a.key} value={a.key}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {selectedAudience && (
                <p className="mt-2 text-xs text-[#aaa] leading-relaxed">{selectedAudience.description}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={!qty || qty < 1}
            className="w-full md:w-auto bg-black text-white text-sm font-bold px-10 py-4 rounded-full hover:bg-[#222] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Calculate Size Breakdown
          </button>

          {/* Results */}
          {results && visibleResults.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2
                  className="text-2xl font-black tracking-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Size Breakdown — {qty.toLocaleString()} Units
                </h2>
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#888]">
                  {selectedAudience?.label}
                </span>
              </div>

              {/* Bar chart */}
              <div className="space-y-3 mb-8">
                {visibleResults.map(r => (
                  <div key={r.size} className="flex items-center gap-4">
                    <span className="text-sm font-bold text-black w-10 shrink-0">{r.size}</span>
                    <div className="flex-1 bg-[#f0f0f0] rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(r.quantity / maxQty) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-black w-10 text-right shrink-0">
                      {r.quantity}
                    </span>
                    <span className="text-xs text-[#888] w-14 text-right shrink-0">
                      {(r.percentage * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary table */}
              <div className="overflow-x-auto rounded-2xl border border-black/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/10 bg-[#fafafa]">
                      <th className="text-left text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] px-5 py-3.5">
                        Size
                      </th>
                      <th className="text-right text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] px-5 py-3.5">
                        Quantity
                      </th>
                      <th className="text-right text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] px-5 py-3.5">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {visibleResults.map(r => (
                      <tr key={r.size}>
                        <td className="px-5 py-3 font-bold text-black">{r.size}</td>
                        <td className="px-5 py-3 text-right font-bold text-black">{r.quantity}</td>
                        <td className="px-5 py-3 text-right text-[#666]">
                          {(r.percentage * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-black/10 bg-[#fafafa]">
                      <td className="px-5 py-3 font-bold text-black">Total</td>
                      <td className="px-5 py-3 text-right font-bold text-black">
                        {qty.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right font-bold text-black">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 p-5 bg-[#f9f9f9] rounded-2xl border border-black/10">
                <p className="text-xs text-[#888] leading-relaxed">
                  <strong className="text-black">Note:</strong> These quantities are starting-point
                  recommendations based on national average distribution data, adjusted for your audience
                  type. Always review with your merch team before finalizing production. Rounding ensures
                  your total adds up to exactly {qty.toLocaleString()} units.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 px-8 md:px-16 lg:px-20 bg-white border-b border-black/10">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] text-black mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            How to Use This Calculator
          </h2>
          <div className="space-y-5 text-[#555] leading-relaxed text-sm md:text-base mb-16">
            <p>
              Ordering the right mix of sizes is one of the most under-appreciated parts of a bulk apparel
              run. Order too many smalls and your team in the field is left fighting over the three larges
              that came in. Order too many XLs for a college-age population and you're left with extras
              nobody wants. This calculator takes the guesswork out of size planning by applying real-world
              distribution data to your specific audience.
            </p>
            <p>
              Select your audience type — whether that's a general mixed workforce, an athletic club, a
              construction crew, or a high school student body — and enter your total quantity. The tool
              applies statistical adjustments to the national average size distribution and returns a
              recommended quantity per size that adds up exactly to your order total.
            </p>
            <p>
              These recommendations are a starting point, not a guarantee. If you have historical order
              data or specific knowledge about your audience, layer that in. And if you're ordering for a
              mixed population spanning multiple locations or departments, consider running separate
              calculations per segment and combining the results.
            </p>
          </div>

          <h2
            className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] text-black mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-black/10">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-6">
                <h3 className="text-base font-bold text-black mb-2">{faq.q}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h3
            className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] text-white mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Ready to place your order?
          </h3>
          <p className="text-sm md:text-base text-[#888] leading-relaxed mb-8 max-w-md mx-auto">
            We'll help you finalize your size run, source the right product, and deliver on time — start
            to finish.
          </p>
          <button
            onClick={() => setProjectModalOpen(true)}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            Start a Project
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </button>
        </div>
      </section>

      <SiteFooter />
      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </div>
  );
}
