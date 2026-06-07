import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";
import Breadcrumbs, { buildBreadcrumbJsonLd } from "@/components/breadcrumbs";
import { StartProjectModal } from "@/components/start-project-modal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { calculateBreakdown, AUDIENCE_TYPES, STATES, type AudienceKey, type SizeResult } from "@/lib/sizeData";
import heroTexture from "@assets/ChatGPT_Image_Jun_6,_2026,_11_50_21_AM_1780764935613.png";

const CANONICAL_PATH = "/tools/size-breakdown";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Learning Center", href: "/blog" },
  { label: "Size Breakdown Tool" },
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

const jsonLd = [
  buildBreadcrumbJsonLd(breadcrumbItems),
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Size Breakdown Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Free bulk apparel size breakdown calculator. Enter your total order quantity and audience type to get the optimal size run, so you order the right number of each size.",
    url: `https://merchclub.com${CANONICAL_PATH}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Merch Club", url: "https://merchclub.com" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Merch Club",
    url: "https://merchclub.com",
    logo: "https://merchclub.com/opengraph.jpg",
    description:
      "Full-service branded merchandise programs — strategy, design, production, kitting, and distribution.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Omaha",
      addressRegion: "NE",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://merchclub.com/contact",
    },
  },
];

const SIZE_SHADES: Record<string, { bg: string; text: string }> = {
  XS:  { bg: "hsl(0,0%,10%)",  text: "white" },
  S:   { bg: "hsl(0,0%,20%)",  text: "white" },
  M:   { bg: "hsl(0,0%,30%)",  text: "white" },
  L:   { bg: "hsl(0,0%,40%)",  text: "white" },
  XL:  { bg: "hsl(0,0%,50%)",  text: "white" },
  "2XL": { bg: "hsl(0,0%,60%)", text: "black" },
  "3XL": { bg: "hsl(0,0%,69%)", text: "black" },
  "4XL": { bg: "hsl(0,0%,77%)", text: "black" },
  "5XL": { bg: "hsl(0,0%,84%)", text: "black" },
};

const RELATED_ARTICLES = [
  {
    href: "/blog/merch-program-strategy",
    title: "Why Your Merch Program Needs a Strategy — Not Just a Vendor",
  },
  {
    href: "/blog/branded-merchandise-mistakes",
    title: "5 Branded Merchandise Mistakes That Make Your Company Look Amateur",
  },
  {
    href: "/blog/custom-kitting-brand-experience",
    title: "The Hidden Cost of Unboxing: How Custom Kitting Elevates Brand Experience",
  },
];

// ─── Send Modal ──────────────────────────────────────────────────────────────

interface SendModalProps {
  open: boolean;
  onClose: () => void;
  results: SizeResult[];
  editableQtys: Record<string, number>;
  quantity: number;
  audienceLabel: string;
  stateLabel: string;
}

function SendModal({ open, onClose, results, editableQtys, quantity, audienceLabel, stateLabel }: SendModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const visibleResults = results.filter(r => r.quantity > 0);
  const sizeTable = visibleResults
    .map(r => `${r.size}: ${editableQtys[r.size] ?? r.quantity} units`)
    .join(", ");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: name,
              from_email: email,
              phone: phone || "Not provided",
              notes: notes || "None",
              quantity: quantity.toLocaleString(),
              audience: audienceLabel,
              state: stateLabel,
              size_table: sizeTable,
              to_email: "chris@merchclub.com",
            },
          }),
        });
        if (res.ok) {
          setStatus("sent");
        } else {
          throw new Error(`${res.status}`);
        }
      } catch (err) {
        setStatus("error");
        setErrorMsg("Could not send — please email chris@merchclub.com directly.");
      }
    } else {
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        `\nOrder: ${quantity.toLocaleString()} units · ${audienceLabel} · ${stateLabel}`,
        `Sizes: ${sizeTable}`,
        notes ? `\nNotes: ${notes}` : null,
      ].filter(Boolean).join("\n");
      window.open(
        `mailto:chris@merchclub.com?subject=${encodeURIComponent("Size Breakdown — " + name)}&body=${encodeURIComponent(body)}`,
        "_blank"
      );
      setStatus("sent");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="send-modal-title"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/10">
          <div>
            <h2 id="send-modal-title" className="text-lg font-bold text-black">Send to Merch Club</h2>
            <p className="text-xs text-[#888] mt-0.5">We'll review your breakdown and follow up with next steps.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-[#888] hover:text-black"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="px-6 py-12 text-center">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">We've got it!</h3>
            <p className="text-sm text-[#666] mb-6">
              Chris will be in touch within one business day to help finalize your order.
            </p>
            <button
              onClick={onClose}
              className="bg-black text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#222] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Breakdown preview */}
            <div className="px-6 py-3 bg-[#f9f9f9] border-b border-black/10 flex gap-2 flex-wrap">
              <span className="text-xs font-bold text-black bg-black/10 px-2.5 py-1 rounded-full">
                {quantity.toLocaleString()} units
              </span>
              <span className="text-xs font-bold text-black bg-black/10 px-2.5 py-1 rounded-full">
                {audienceLabel}
              </span>
              {stateLabel && stateLabel !== "National Average" && (
                <span className="text-xs font-bold text-black bg-black/10 px-2.5 py-1 rounded-full">
                  {stateLabel}
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1.5" htmlFor="send-name">
                    Name <span className="text-black normal-case tracking-normal">*</span>
                  </label>
                  <input
                    id="send-name"
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1.5" htmlFor="send-email">
                    Email <span className="text-black normal-case tracking-normal">*</span>
                  </label>
                  <input
                    id="send-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1.5" htmlFor="send-phone">
                  Phone <span className="text-[#bbb] normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <input
                  id="send-phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(402) 555-0100"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] mb-1.5" htmlFor="send-notes">
                  Notes <span className="text-[#bbb] normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <textarea
                  id="send-notes"
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Deadline, product preference, decoration style, special instructions…"
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 resize-none"
                />
              </div>
              {status === "error" && (
                <p className="text-xs text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                  {errorMsg}
                </p>
              )}
              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-[#aaa]">
                  Breakdown will be included automatically.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending" || !name.trim() || !email.trim()}
                  className="bg-black text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#222] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  {status === "sending" ? "Sending…" : "Send Breakdown"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SizeBreakdown() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | "">(100);
  const [audience, setAudience] = useState<AudienceKey>("average");
  const [state, setState] = useState<string>("");
  const [results, setResults] = useState<SizeResult[] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [excludedSizes, setExcludedSizes] = useState<Set<string>>(new Set());

  // Editable quantities and locks
  const [editableQtys, setEditableQtys] = useState<Record<string, number>>({});
  const [lockedSizes, setLockedSizes] = useState<Set<string>>(new Set());
  const [hasEdits, setHasEdits] = useState(false);
  const [editingSize, setEditingSize] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Send modal
  const [sendModalOpen, setSendModalOpen] = useState(false);

  const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  function toggleSize(size: string) {
    setExcludedSizes(prev => {
      const next = new Set(prev);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  }

  function toggleLock(size: string) {
    setLockedSizes(prev => {
      const next = new Set(prev);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  }

  function handleCalculate() {
    const qty = typeof quantity === "number" ? quantity : 0;
    if (qty < 1) return;
    const base = calculateBreakdown(qty, audience, state);
    const active = base.filter(r => !excludedSizes.has(r.size));
    if (active.length === 0) return;
    const totalPct = active.reduce((s, r) => s + r.percentage, 0);
    const rescaled = active.map(r => ({
      ...r,
      percentage: r.percentage / totalPct,
      quantity: Math.round((r.percentage / totalPct) * qty),
    }));
    const sum = rescaled.reduce((s, r) => s + r.quantity, 0);
    const diff = qty - sum;
    if (diff !== 0) {
      const largestIdx = rescaled.reduce(
        (best, r, i) => (r.quantity > rescaled[best].quantity ? i : best), 0
      );
      rescaled[largestIdx].quantity += diff;
    }
    setResults(rescaled);
    setEditableQtys(Object.fromEntries(rescaled.map(r => [r.size, r.quantity])));
    setLockedSizes(new Set());
    setHasEdits(false);
  }

  function handleQtyChange(size: string, val: number) {
    setEditableQtys(prev => ({ ...prev, [size]: Math.max(0, val) }));
    setHasEdits(true);
  }

  function handleRecalculate() {
    const qty = typeof quantity === "number" ? quantity : 0;
    if (!results) return;

    const lockedTotal = Array.from(lockedSizes).reduce(
      (sum, size) => sum + (editableQtys[size] ?? 0), 0
    );
    const remaining = qty - lockedTotal;
    if (remaining < 0) return;

    const nonLocked = results.filter(r => !lockedSizes.has(r.size) && r.quantity > 0);
    if (nonLocked.length === 0) return;

    const totalPct = nonLocked.reduce((s, r) => s + r.percentage, 0);
    const redistributed = nonLocked.map(r => ({
      size: r.size,
      quantity: Math.round((r.percentage / totalPct) * remaining),
    }));

    const sum = redistributed.reduce((s, r) => s + r.quantity, 0);
    const diff = remaining - sum;
    if (diff !== 0 && redistributed.length > 0) {
      const largestIdx = redistributed.reduce(
        (best, r, i) => (r.quantity > redistributed[best].quantity ? i : best), 0
      );
      redistributed[largestIdx].quantity += diff;
    }

    const newQtys = { ...editableQtys };
    redistributed.forEach(r => { newQtys[r.size] = r.quantity; });
    setEditableQtys(newQtys);
    setHasEdits(false);
  }

  function handlePrint() {
    window.print();
  }

  function handleCopy() {
    const header = `Merch Club — Size Breakdown\n${qty.toLocaleString()} units · ${selectedAudience?.label ?? ""}${selectedState?.code ? ` · ${selectedState.name}` : ""}\n\nSize\tQty\t%`;
    const rows = visibleResults.map(r => {
      const dq = editableQtys[r.size] ?? r.quantity;
      const pct = totalDisplayQty > 0 ? ((dq / totalDisplayQty) * 100).toFixed(1) : "0.0";
      return `${r.size}\t${dq}\t${pct}%`;
    });
    const footer = `Total\t${totalDisplayQty}\t100%`;
    const text = [header, ...rows, footer].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  function handleDownloadCSV() {
    const csvRows = [
      ["Size", "Quantity", "Percentage"],
      ...visibleResults.map(r => {
        const dq = editableQtys[r.size] ?? r.quantity;
        const pct = totalDisplayQty > 0 ? ((dq / totalDisplayQty) * 100).toFixed(1) : "0.0";
        return [r.size, String(dq), `${pct}%`];
      }),
      ["Total", String(totalDisplayQty), "100%"],
    ];
    const csv = [
      `# Merch Club Size Breakdown`,
      `# ${qty.toLocaleString()} units · ${selectedAudience?.label ?? ""}${selectedState?.code ? ` · ${selectedState.name}` : ""}`,
      `# Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      "",
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `merch-club-size-breakdown-${qty}units.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const qty = typeof quantity === "number" ? quantity : 0;
  const visibleResults = results ? results.filter(r => r.quantity > 0) : [];

  // For bar chart — use editable qtys when available
  const displayQtys = visibleResults.map(r => editableQtys[r.size] ?? r.quantity);
  const maxQty = displayQtys.length ? Math.max(...displayQtys) : 1;
  const totalDisplayQty = displayQtys.reduce((a, b) => a + b, 0);

  const selectedAudience = AUDIENCE_TYPES.find(a => a.key === audience);
  const selectedState = STATES.find(s => s.code === state);

  return (
    <div className="min-h-screen bg-white">
      {/* Print styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-page { page-break-inside: avoid; }
          @page { margin: 1.5cm; }
        }
        .print-only { display: none; }
      `}</style>

      <SEO
        title="Bulk T-Shirt Size Breakdown Calculator"
        description="Free tool to plan your bulk apparel size run. Enter total quantity and audience type to get the optimal breakdown of each size, so you order right the first time."
        path={CANONICAL_PATH}
        type="website"
        jsonLd={jsonLd}
        keywords="bulk t-shirt size calculator, apparel size breakdown, shirt size distribution, bulk order sizes, t-shirt size chart calculator, size run calculator"
      />

      <div className="no-print">
        <SiteHeader />
      </div>

      {/* Print header — only shown when printing */}
      <div className="print-only mb-8">
        <div style={{ borderBottom: "2px solid #000", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.03em", fontFamily: "sans-serif" }}>MERCH CLUB</div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>Full-service branded merchandise programs</div>
            </div>
            <div style={{ textAlign: "right", fontSize: "11px", color: "#888" }}>
              <div>chris@merchclub.com</div>
              <div>merchclub.com</div>
              <div style={{ marginTop: "4px" }}>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: "26px", fontWeight: 900, marginBottom: "6px", fontFamily: "sans-serif" }}>BULK APPAREL SIZE BREAKDOWN</div>
        <div style={{ fontSize: "13px", color: "#555" }}>
          {qty.toLocaleString()} units · {selectedAudience?.label}
          {selectedState && selectedState.code ? ` · ${selectedState.name}` : ""}
        </div>
      </div>

      <main id="main-content">

        {/* Hero */}
        <section aria-label="Tool introduction" className="no-print relative bg-[#0a0a0a] pt-32 pb-20 px-8 md:px-16 lg:px-20 overflow-hidden">
          <img
            src={heroTexture}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/30" aria-hidden="true" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
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
        <section
          aria-label="Size breakdown calculator"
          className="py-16 px-8 md:px-16 lg:px-20 bg-white border-b border-black/10"
        >
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Left sidebar ── */}
            <div className="w-full lg:w-72 shrink-0 space-y-4 no-print">

              {/* Panel 1 — Order Quantity */}
              <div className="rounded-2xl border border-black/10 p-5 bg-[#fafafa]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-1">
                  # &nbsp; Order Quantity
                </p>
                <p className="text-xs text-[#aaa] mb-3">Total units to order</p>
                <input
                  id="quantity-input"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={e =>
                    setQuantity(e.target.value === "" ? "" : Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-full border border-black/20 rounded-xl px-4 py-3 text-base font-bold text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors mb-3"
                  placeholder="e.g. 100"
                  aria-label="Total order quantity"
                />
                <div className="flex flex-wrap gap-1.5">
                  {[24, 48, 72, 144, 288, 576, 1152].map(preset => (
                    <button
                      key={preset}
                      onClick={() => setQuantity(preset)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                        quantity === preset
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black/20 hover:border-black/50"
                      }`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel 2 — Audience Type */}
              <div className="rounded-2xl border border-black/10 p-5 bg-[#fafafa]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-1">
                  Audience Type
                </p>
                <p className="text-xs text-[#aaa] mb-3">Who is this order for?</p>
                <div className="relative">
                  <select
                    id="audience-select"
                    value={audience}
                    onChange={e => setAudience(e.target.value as AudienceKey)}
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors appearance-none pr-9"
                    aria-describedby="audience-hint"
                  >
                    {AUDIENCE_TYPES.map(a => (
                      <option key={a.key} value={a.key}>{a.label}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {selectedAudience && (
                  <p id="audience-hint" className="mt-2 text-xs text-[#aaa] leading-relaxed flex gap-1.5 items-start">
                    <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#bbb]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4M12 8h.01"/></svg>
                    {selectedAudience.description}
                  </p>
                )}
              </div>

              {/* Panel 3 — Location */}
              <div className="rounded-2xl border border-black/10 p-5 bg-[#fafafa]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-1">
                  Location
                </p>
                <p className="text-xs text-[#aaa] mb-3">State / Region</p>
                <div className="relative">
                  <select
                    className="w-full border border-black/20 rounded-xl px-4 py-3 text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-colors appearance-none pr-9"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    aria-label="State or region"
                  >
                    {STATES.map(s => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="mt-2 text-xs text-[#aaa] leading-relaxed flex gap-1.5 items-start">
                  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#bbb]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 16v-4M12 8h.01"/></svg>
                  {state === "" ? "Using national average distribution data." : (() => {
                    const s = STATES.find(st => st.code === state)!;
                    if (s.tier >= 2) return `${s.name} trends larger — distribution shifted toward XL+.`;
                    if (s.tier === 1) return `${s.name} is slightly above average — mild shift toward larger sizes.`;
                    if (s.tier === -1) return `${s.name} is slightly below average — mild shift toward smaller sizes.`;
                    if (s.tier <= -2) return `${s.name} trends smaller — distribution shifted toward S/M.`;
                    return `Using ${s.name} average distribution data.`;
                  })()}
                </p>
              </div>

              {/* Panel 4 — Available Sizes */}
              <div className="rounded-2xl border border-black/10 p-5 bg-[#fafafa]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-1">
                  Available Sizes
                </p>
                <p className="text-xs text-[#aaa] mb-3">Click a size to exclude it from the calculation.</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map(size => {
                    const excluded = excludedSizes.has(size);
                    const shade = SIZE_SHADES[size] ?? { bg: "hsl(0,0%,30%)", text: "white" };
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        aria-pressed={!excluded}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                          excluded
                            ? "bg-white text-[#bbb] border-black/10 line-through"
                            : "bg-white text-black border-black/20 hover:border-black/50"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: excluded ? "#ddd" : shade.bg }}
                          aria-hidden="true"
                        />
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculate button */}
              <button
                onClick={handleCalculate}
                disabled={!qty || qty < 1}
                aria-label="Calculate size breakdown for your order"
                className="w-full bg-black text-white text-sm font-bold px-6 py-4 rounded-full hover:bg-[#222] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Calculate Size Breakdown
              </button>
            </div>

            {/* ── Right: results ── */}
            <div
              className="flex-1 min-w-0"
              role="region"
              aria-live="polite"
              aria-atomic="false"
              aria-label="Size breakdown results"
            >
              {results && visibleResults.length > 0 ? (
                <div className="print-page">
                  {/* Results header */}
                  <div className="flex items-start justify-between mb-6 flex-wrap gap-3 no-print">
                    <div>
                      <h2
                        className="text-2xl font-black tracking-tight"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        Size Breakdown
                      </h2>
                      <p className="text-xs text-[#888] mt-0.5">
                        {qty.toLocaleString()} units · {selectedAudience?.label}
                        {selectedState && selectedState.code ? ` · ${selectedState.name}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Copy */}
                      <button
                        onClick={handleCopy}
                        aria-label="Copy breakdown to clipboard"
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-black/20 hover:border-black/50 transition-colors bg-white text-black"
                      >
                        {copied ? (
                          <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path strokeLinecap="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                          </svg>
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      {/* CSV */}
                      <button
                        onClick={handleDownloadCSV}
                        aria-label="Download breakdown as CSV"
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-black/20 hover:border-black/50 transition-colors bg-white text-black"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        CSV
                      </button>
                      {/* PDF */}
                      <button
                        onClick={handlePrint}
                        aria-label="Download or print PDF"
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-black/20 hover:border-black/50 transition-colors bg-white text-black"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        PDF
                      </button>
                      {/* Send */}
                      <button
                        onClick={() => setSendModalOpen(true)}
                        aria-label="Send this breakdown to Merch Club"
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full bg-black text-white hover:bg-[#222] transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send
                      </button>
                    </div>
                  </div>

                  {/* Bar chart */}
                  <div className="space-y-2.5 mb-8" role="list" aria-label="Size quantities">
                    {visibleResults.map((r, idx) => {
                      const displayQty = editableQtys[r.size] ?? r.quantity;
                      const ratio = maxQty > 0 ? displayQty / maxQty : 0;
                      const shade = SIZE_SHADES[r.size] ?? { bg: "hsl(0,0%,30%)", text: "white" };
                      const pct = totalDisplayQty > 0 ? ((displayQty / totalDisplayQty) * 100).toFixed(1) : "0.0";
                      return (
                        <div
                          key={r.size}
                          className="flex items-center gap-4"
                          role="listitem"
                          aria-label={`${r.size}: ${displayQty} units, ${pct} percent`}
                        >
                          <span className="text-sm font-bold text-black w-10 shrink-0 tabular-nums">{r.size}</span>
                          <div className="flex-1 bg-[#ebebeb] rounded-full h-9 overflow-hidden" role="presentation">
                            <div
                              className="h-full rounded-full transition-all duration-500 ease-out flex items-center px-3"
                              style={{
                                width: `${ratio * 100}%`,
                                backgroundColor: shade.bg,
                                minWidth: ratio > 0 ? "2.5rem" : 0,
                                justifyContent: ratio >= 0.25 ? "flex-end" : "flex-start",
                              }}
                            >
                              {ratio >= 0.18 && (
                                <span
                                  className="text-xs font-bold tabular-nums leading-none"
                                  style={{ color: shade.text, opacity: 0.9 }}
                                  aria-hidden="true"
                                >
                                  {pct}%
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm font-bold text-black w-10 text-right shrink-0 tabular-nums">{displayQty}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Editable summary table */}
                  <div className="overflow-x-auto rounded-2xl border border-black/10 mb-4">
                    <table className="w-full text-sm" aria-label={`Size breakdown table for ${qty.toLocaleString()} units`}>
                      <thead>
                        <tr className="border-b border-black/10 bg-[#fafafa]">
                          <th scope="col" className="text-left text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] px-5 py-3.5">Size</th>
                          <th scope="col" className="text-left text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] px-4 py-3.5 no-print">
                            <span className="flex items-center gap-1">
                              Qty
                              <span className="text-[9px] normal-case text-[#bbb] font-normal tracking-normal">(click to set)</span>
                            </span>
                          </th>
                          <th scope="col" className="text-right text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] px-5 py-3.5 print-only">Qty</th>
                          <th scope="col" className="text-right text-[10px] font-bold uppercase tracking-[0.15em] text-[#888] px-4 py-3.5">%</th>
                          <th scope="col" className="text-center px-4 py-3.5 no-print" aria-label="Lock size">
                            <svg className="w-3.5 h-3.5 mx-auto text-[#ccc]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                              <path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4"/>
                            </svg>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {visibleResults.map(r => {
                          const displayQty = editableQtys[r.size] ?? r.quantity;
                          const isLocked = lockedSizes.has(r.size);
                          const isEditing = editingSize === r.size && !isLocked;
                          const pct = totalDisplayQty > 0
                            ? ((displayQty / totalDisplayQty) * 100).toFixed(1)
                            : "0.0";
                          return (
                            <tr key={r.size} className={isLocked ? "bg-[#fafafa]" : "hover:bg-[#fdfdfd] transition-colors"}>
                              {/* Size label */}
                              <td className="px-5 py-3 font-bold text-black">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: SIZE_SHADES[r.size]?.bg ?? "#333" }}
                                    aria-hidden="true"
                                  />
                                  {r.size}
                                </div>
                              </td>

                              {/* Click-to-edit qty — screen only */}
                              <td className="px-4 py-2 no-print">
                                {isEditing ? (
                                  <input
                                    type="number"
                                    min={0}
                                    autoFocus
                                    value={displayQty}
                                    onChange={e => handleQtyChange(r.size, parseInt(e.target.value) || 0)}
                                    onBlur={() => setEditingSize(null)}
                                    onKeyDown={e => {
                                      if (e.key === "Enter" || e.key === "Escape") setEditingSize(null);
                                    }}
                                    aria-label={`Quantity for size ${r.size}`}
                                    className="w-20 border-b-2 border-black bg-transparent text-xl font-black tabular-nums text-black focus:outline-none py-0.5 text-left"
                                  />
                                ) : (
                                  <button
                                    onClick={() => { if (!isLocked) setEditingSize(r.size); }}
                                    disabled={isLocked}
                                    aria-label={`Quantity for size ${r.size}: ${displayQty}. Click to edit.`}
                                    className={`text-xl font-black tabular-nums text-black leading-none py-1 transition-colors ${
                                      isLocked
                                        ? "cursor-default text-[#aaa]"
                                        : "cursor-pointer hover:text-[#555] group"
                                    }`}
                                    title={isLocked ? "Unlock to edit" : "Click to edit"}
                                  >
                                    {displayQty}
                                  </button>
                                )}
                              </td>

                              {/* Print-only static qty */}
                              <td className="px-5 py-3 text-right font-bold text-black print-only">{displayQty}</td>

                              {/* Percentage */}
                              <td className="px-4 py-3 text-right text-[#888] tabular-nums">{pct}%</td>

                              {/* Lock toggle — screen only */}
                              <td className="px-4 py-3 text-center no-print">
                                <button
                                  onClick={() => toggleLock(r.size)}
                                  aria-pressed={isLocked}
                                  aria-label={isLocked ? `Unlock size ${r.size}` : `Lock size ${r.size}`}
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all ${
                                    isLocked
                                      ? "bg-black text-white"
                                      : "text-[#ccc] hover:text-[#888] hover:bg-black/8"
                                  }`}
                                >
                                  {isLocked ? (
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="M12 1a5 5 0 00-5 5v3H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V11a2 2 0 00-2-2h-2V6a5 5 0 00-5-5zm0 2a3 3 0 013 3v3H9V6a3 3 0 013-3zm0 9a2 2 0 110 4 2 2 0 010-4z"/>
                                    </svg>
                                  ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                      <path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4"/>
                                    </svg>
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="border-t border-black/10 bg-[#fafafa]">
                          <td className="px-5 py-3 font-bold text-black">Total</td>
                          <td className="px-4 py-3 font-black text-xl text-black tabular-nums no-print">{totalDisplayQty.toLocaleString()}</td>
                          <td className="px-5 py-3 text-right font-bold text-black tabular-nums print-only">{totalDisplayQty.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-bold text-black">100%</td>
                          <td className="no-print" />
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Recalculate with locks */}
                  {lockedSizes.size > 0 && (
                    <div className="mb-4 flex items-center gap-3 p-4 bg-[#f5f5f5] rounded-2xl border border-black/10 no-print">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-black">
                          {lockedSizes.size} size{lockedSizes.size > 1 ? "s" : ""} locked
                          {" — "}
                          <span className="font-normal text-[#666]">
                            {Array.from(lockedSizes).reduce((s, sz) => s + (editableQtys[sz] ?? 0), 0).toLocaleString()} units fixed,{" "}
                            {Math.max(0, qty - Array.from(lockedSizes).reduce((s, sz) => s + (editableQtys[sz] ?? 0), 0)).toLocaleString()} to redistribute
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={handleRecalculate}
                        className="shrink-0 text-xs font-bold px-4 py-2 bg-black text-white rounded-full hover:bg-[#222] transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                      >
                        Recalculate
                      </button>
                    </div>
                  )}

                  {/* Qty mismatch warning */}
                  {totalDisplayQty !== qty && (
                    <div className="mb-4 flex items-center gap-2 p-3.5 bg-amber-50 rounded-xl border border-amber-200 no-print">
                      <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                      </svg>
                      <p className="text-xs text-amber-800">
                        Current total is <strong>{totalDisplayQty.toLocaleString()}</strong>, your order quantity is <strong>{qty.toLocaleString()}</strong>.{" "}
                        {lockedSizes.size > 0 ? "Click Recalculate to redistribute." : "Adjust quantities or recalculate."}
                      </p>
                    </div>
                  )}

                  <div className="mt-2 p-5 bg-[#f9f9f9] rounded-2xl border border-black/10" role="note">
                    <p className="text-xs text-[#888] leading-relaxed">
                      <strong className="text-black">Note:</strong> Starting-point recommendations based on national average distribution data, adjusted for your audience type. Always review with your merch team before finalizing production. Lock any size to hold its quantity while redistributing the rest.
                    </p>
                  </div>

                  {/* Print disclaimer */}
                  <div className="print-only mt-8" style={{ borderTop: "1px solid #ddd", paddingTop: "1rem", fontSize: "10px", color: "#999" }}>
                    Generated by the Merch Club Size Breakdown Calculator — merchclub.com/tools/size-breakdown.
                    These are starting-point recommendations based on national distribution data adjusted for audience type.
                    Always review with your merch team before finalizing production.
                    Contact chris@merchclub.com to discuss your order.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#f5f5f5] flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-[#ccc]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[#aaa]">Set your options and click<br /><strong className="text-black">Calculate Size Breakdown</strong></p>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* SEO Content */}
        <section
          aria-labelledby="how-to-heading"
          className="no-print py-20 px-8 md:px-16 lg:px-20 bg-white border-b border-black/10"
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="how-to-heading"
              className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] text-black mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              How to Use This Calculator
            </h2>
            <div className="space-y-5 text-[#555] leading-relaxed text-sm md:text-base mb-16">
              <p>
                Ordering the right mix of sizes is one of the most under-appreciated parts of a bulk
                apparel run. Order too many smalls and your team in the field is left fighting over the
                three larges that came in. Order too many XLs for a college-age population and you're left
                with extras nobody wants. This calculator takes the guesswork out of size planning by
                applying real-world distribution data to your specific audience.
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
          </div>
        </section>

        {/* Persuasion block */}
        <section className="no-print bg-[#0a0a0a] text-white py-20 md:py-28 px-8 md:px-16 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">Why Merch Club</span>
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Most Printers Take Your Order. We Build Your Program.
            </h2>
            <div className="space-y-5 text-base md:text-lg text-[#aaa] leading-relaxed mb-10">
              <p>
                Here's a quick test: did the company printing your shirts ever give you a tool like
                this one? Probably not. A sizing tool is a small thing, but it tells you something
                bigger about how a partner thinks. The good ones sweat the details you shouldn't
                have to.
              </p>
              <p>
                That's the difference with Merch Club. Private-label presentation that makes your
                team's apparel feel considered, not thrown in a box. Packaging and distribution
                handled so you're not the one sorting shirts by size in a conference room. Pricing
                that's a real value, not a markup on the same blank everyone else sells.
              </p>
              <p>
                The result: your people get apparel they actually want to wear, and you look good
                to the person who signed off on the budget.
              </p>
              <p>
                You're already on the site of a company that gets more out of your apparel dollars.
                Want to see what that looks like for your team?
              </p>
            </div>
            <button
              onClick={() => setProjectModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-bold px-7 py-3.5 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Talk to us
              <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          </div>
        </section>

        <section className="no-print py-20 px-8 md:px-16 lg:px-20 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#888] border border-black/15 rounded-full px-4 py-1.5 mb-5">FAQ's</span>
              <h2
                id="faq-heading"
                className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12" aria-labelledby="faq-heading">
              <div>
                {FAQS.filter((_, i) => i % 2 === 0).map((faq, i) => {
                  const idx = i * 2;
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border-t border-black/10">
                      <button
                        className="w-full flex items-center justify-between py-5 text-left group"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-medium text-black pr-4">{faq.q}</span>
                        <span className={`text-xl text-black/50 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: isOpen ? "400px" : "0", opacity: isOpen ? 1 : 0 }}
                      >
                        <p className="text-sm text-[#666] pb-5 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                {FAQS.filter((_, i) => i % 2 === 1).map((faq, i) => {
                  const idx = i * 2 + 1;
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border-t border-black/10">
                      <button
                        className="w-full flex items-center justify-between py-5 text-left group"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-medium text-black pr-4">{faq.q}</span>
                        <span className={`text-xl text-black/50 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: isOpen ? "400px" : "0", opacity: isOpen ? 1 : 0 }}
                      >
                        <p className="text-sm text-[#666] pb-5 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <nav aria-label="Related Learning Center articles" className="mt-14 pt-10 border-t border-black/10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-5">
                Related Reading
              </h3>
              <ul className="space-y-3">
                {RELATED_ARTICLES.map(article => (
                  <li key={article.href}>
                    <Link
                      href={article.href}
                      className="text-sm font-semibold text-black underline underline-offset-4 hover:text-[#444] transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-label="Start a project"
          className="no-print bg-[#0a0a0a] py-20 md:py-28 px-8 md:px-16 lg:px-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ready to place your order?
            </h2>
            <p className="text-sm md:text-base text-[#888] leading-relaxed mb-8 max-w-md mx-auto">
              We'll help you finalize your size run, source the right product, and deliver on time — start
              to finish.
            </p>
            <button
              onClick={() => setProjectModalOpen(true)}
              aria-label="Start a project with Merch Club"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-black text-sm font-bold px-8 py-4 sm:py-3.5 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Start a Project
              <svg
                className="w-4 h-4"
                aria-hidden="true"
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

      </main>

      <div className="no-print">
        <SiteFooter />
      </div>

      <StartProjectModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />

      <SendModal
        open={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        results={visibleResults}
        editableQtys={editableQtys}
        quantity={qty}
        audienceLabel={selectedAudience?.label ?? ""}
        stateLabel={selectedState?.name ?? "National Average"}
      />
    </div>
  );
}
