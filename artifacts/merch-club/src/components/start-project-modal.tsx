import { useState, useEffect, useRef } from "react";
import logoSrc from "@assets/Social_PostsArtboard_3@3x_1775229381093.png";

type Step = "url" | "scanning" | "results" | "lead" | "done";

interface MockupItem {
  id: string;
  label: string;
  url: string;
}

interface GenerateResponse {
  success: boolean;
  companyName?: string;
  submittedUrl?: string;
  logoUrl?: string;
  logoSource?: string;
  logoIsFallback?: boolean;
  colors?: string[];
  mockups?: MockupItem[];
  notes?: string[];
  error?: string;
}

const SCAN_LINES = [
  "Reading homepage…",
  "Identifying brand assets…",
  "Extracting logo…",
  "Sampling brand colors…",
  "Compositing tee mockup…",
  "Compositing drinkware…",
  "Compositing headwear…",
  "Polishing concepts…",
];

export function StartProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("url");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [scanIndex, setScanIndex] = useState(0);
  const [lead, setLead] = useState({ name: "", email: "", company: "", notes: "" });
  const scanTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setStep("url");
      setUrl("");
      setError(null);
      setResult(null);
      setScanIndex(0);
      setLead({ name: "", email: "", company: "", notes: "" });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (step !== "scanning") {
      if (scanTimer.current) clearInterval(scanTimer.current);
      return;
    }
    setScanIndex(0);
    scanTimer.current = setInterval(() => {
      setScanIndex((i) => (i < SCAN_LINES.length - 1 ? i + 1 : i));
    }, 900);
    return () => {
      if (scanTimer.current) clearInterval(scanTimer.current);
    };
  }, [step]);

  if (!open) return null;

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const cleaned = url.trim();
    if (!cleaned) {
      setError("Enter your website URL.");
      return;
    }
    setStep("scanning");
    try {
      const res = await fetch("/api/generate-mockups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleaned }),
      });
      const data = (await res.json()) as GenerateResponse;
      if (!data.success || !data.mockups?.length) {
        setError(data.error || "We couldn't generate mockups. Try a different URL.");
        setStep("url");
        return;
      }
      setResult(data);
      await new Promise((r) => setTimeout(r, 600));
      setStep("results");
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("url");
    }
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          source: "ai-mockup-generator",
          companyName: result?.companyName,
          submittedUrl: result?.submittedUrl,
          mockups: result?.mockups?.map((m) => m.url),
          colors: result?.colors,
        }),
      });
    } catch {
      // best-effort
    }
    setStep("done");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-0 sm:px-4"
      onClick={onClose}
      data-testid="modal-start-project"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-3xl bg-[#0a0a0a] text-white border border-white/10 sm:rounded-2xl rounded-none p-6 sm:p-8 md:p-10 max-h-[100dvh] sm:max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "card-enter 0.3s ease-out forwards" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
          data-testid="button-close-modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <img src={logoSrc} alt="Merch Club" className="h-7 object-contain brightness-0 invert" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 border border-white/15 rounded-full px-2 py-0.5">
            AI Concept Studio
          </span>
        </div>

        {step === "url" && (
          <UrlStep
            url={url}
            setUrl={setUrl}
            error={error}
            onSubmit={handleScan}
          />
        )}

        {step === "scanning" && <ScanStep url={url} index={scanIndex} />}

        {step === "results" && result && (
          <ResultsStep result={result} onContinue={() => setStep("lead")} />
        )}

        {step === "lead" && result && (
          <LeadStep
            result={result}
            lead={lead}
            setLead={setLead}
            onSubmit={handleLeadSubmit}
            onBack={() => setStep("results")}
          />
        )}

        {step === "done" && <DoneStep result={result} />}
      </div>
    </div>
  );
}

function UrlStep({
  url,
  setUrl,
  error,
  onSubmit,
}: {
  url: string;
  setUrl: (v: string) => void;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
      <h4
        className="text-4xl md:text-5xl font-black tracking-tight"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        See your brand on merch in 30 seconds.
      </h4>
      <p className="text-sm text-white/60 mt-2 mb-8 leading-relaxed max-w-xl">
        Drop your website URL. We'll pull your logo and brand palette and render real merch concepts — no
        forms first, no waiting for a sales rep.
      </p>

      <form onSubmit={onSubmit} className="space-y-4" data-testid="form-url">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center bg-white/[0.04] border border-white/10 rounded-lg px-4 focus-within:border-white/30 transition-colors">
            <span className="text-white/30 text-sm pr-2 select-none">https://</span>
            <input
              type="text"
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value.replace(/^https?:\/\//i, ""))}
              placeholder="yourcompany.com"
              className="flex-1 bg-transparent py-3.5 text-sm text-white placeholder-white/30 focus:outline-none"
              data-testid="input-url"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-white/90 transition-colors"
            data-testid="button-generate"
          >
            Generate
          </button>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <p className="text-[11px] text-white/35 uppercase tracking-wider pt-2">
          Free · No signup required · Concepts only
        </p>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10 text-center">
        {[
          ["01", "Scan", "Pull logo + palette"],
          ["02", "Render", "Composite onto merch"],
          ["03", "Refine", "Real samples, your spec"],
        ].map(([n, t, d]) => (
          <div key={n}>
            <div className="text-[10px] tracking-[0.3em] text-white/30 mb-1">{n}</div>
            <div
              className="text-lg font-black tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {t}
            </div>
            <div className="text-[11px] text-white/45 mt-1">{d}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ScanStep({ url, index }: { url: string; index: number }) {
  return (
    <div className="py-6" data-testid="step-scanning">
      <h4
        className="text-3xl md:text-4xl font-black tracking-tight"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Scanning {url || "your site"}…
      </h4>
      <p className="text-sm text-white/50 mt-2 mb-8">
        Reading your brand and rendering concepts. ~15–25s.
      </p>

      <div className="relative h-44 rounded-lg border border-white/10 overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent mb-6">
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ animation: "scan-line 1.6s linear infinite" }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 h-8 bg-white/70"
                style={{
                  animation: "bounce-bar 1.1s ease-in-out infinite",
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <ul className="space-y-2">
        {SCAN_LINES.map((line, i) => {
          const state = i < index ? "done" : i === index ? "active" : "pending";
          return (
            <li
              key={line}
              className={`flex items-center gap-3 text-sm transition-opacity ${
                state === "pending" ? "opacity-30" : "opacity-100"
              }`}
            >
              <span
                className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                  state === "done"
                    ? "border-white/40 bg-white text-black"
                    : state === "active"
                      ? "border-white/60 text-white"
                      : "border-white/20"
                }`}
              >
                {state === "done" ? (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                ) : state === "active" ? (
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                ) : null}
              </span>
              <span className={state === "done" ? "text-white/80" : "text-white"}>{line}</span>
            </li>
          );
        })}
      </ul>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes bounce-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ResultsStep({
  result,
  onContinue,
}: {
  result: GenerateResponse;
  onContinue: () => void;
}) {
  return (
    <div data-testid="step-results">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.3em] text-white/40 mb-1">CONCEPTS FOR</div>
          <h4
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {result.companyName}
          </h4>
        </div>
        {result.logoUrl && (
          <div className="shrink-0 w-16 h-16 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center p-2">
            <img
              src={result.logoUrl}
              alt={`${result.companyName} logo`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>

      {result.colors && result.colors.length > 0 && (
        <div className="mb-6">
          <div className="text-[10px] tracking-[0.3em] text-white/40 mb-2">PALETTE</div>
          <div className="flex gap-2">
            {result.colors.map((c) => (
              <div key={c} className="flex flex-col items-start gap-1">
                <div
                  className="w-12 h-12 rounded-md border border-white/10"
                  style={{ backgroundColor: c }}
                />
                <span className="text-[10px] text-white/50 font-mono">{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {result.mockups?.map((m) => (
          <a
            key={m.id}
            href={m.url}
            target="_blank"
            rel="noreferrer"
            className="group block"
            data-testid={`mockup-${m.id}`}
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-white/[0.04] border border-white/10 group-hover:border-white/30 transition-colors">
              <img src={m.url} alt={m.label} className="w-full h-full object-cover" />
            </div>
            <div className="text-[11px] tracking-[0.2em] text-white/55 mt-2 uppercase">{m.label}</div>
          </a>
        ))}
      </div>

      {result.logoIsFallback && (
        <div className="mb-4 text-[11px] text-white/45 border border-white/10 rounded-md px-3 py-2">
          Note: we used a brand fallback for the logo. Final samples will use your real artwork.
        </div>
      )}

      <button
        onClick={onContinue}
        className="w-full bg-white text-black font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-lg hover:bg-white/90 transition-colors"
        data-testid="button-continue-lead"
      >
        Get real samples & a quote
      </button>
      <p className="text-[11px] text-white/40 mt-3 text-center">
        Concepts are placeholders. We'll send polished mockups within 24 hours.
      </p>
    </div>
  );
}

function LeadStep({
  result,
  lead,
  setLead,
  onSubmit,
  onBack,
}: {
  result: GenerateResponse;
  lead: { name: string; email: string; company: string; notes: string };
  setLead: (v: { name: string; email: string; company: string; notes: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <div data-testid="step-lead">
      <button
        onClick={onBack}
        className="text-[11px] text-white/45 hover:text-white tracking-wider uppercase mb-3"
      >
        ← Back to concepts
      </button>
      <h4
        className="text-3xl md:text-4xl font-black tracking-tight"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Where should we send the real ones?
      </h4>
      <p className="text-sm text-white/55 mt-2 mb-6 leading-relaxed">
        Polished mockups for {result.companyName}, sample box options, and a quote — within 24 hours.
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Name"
            required
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            data-testid="input-name"
          />
          <input
            type="email"
            placeholder="Work email"
            required
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            data-testid="input-email"
          />
        </div>
        <input
          type="text"
          placeholder="Company"
          value={lead.company || result.companyName || ""}
          onChange={(e) => setLead({ ...lead, company: e.target.value })}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
          data-testid="input-company"
        />
        <textarea
          placeholder="What products, quantities, or timeline? (optional)"
          rows={3}
          value={lead.notes}
          onChange={(e) => setLead({ ...lead, notes: e.target.value })}
          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
          data-testid="input-notes"
        />
        <button
          type="submit"
          className="w-full bg-white text-black font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-lg hover:bg-white/90 transition-colors"
          data-testid="button-submit-lead"
        >
          Send my mockups
        </button>
        <p className="text-[11px] text-white/40 text-center">
          We never share your info. Reply within 24 hours, on business days.
        </p>
      </form>
    </div>
  );
}

function DoneStep({ result }: { result: GenerateResponse | null }) {
  return (
    <div className="text-center py-8" data-testid="step-done">
      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h4
        className="text-3xl md:text-4xl font-black tracking-tight"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        You're in.
      </h4>
      <p className="text-sm text-white/55 mt-2 max-w-md mx-auto">
        Polished concepts for {result?.companyName || "your brand"} are on the way. Check your inbox within 24
        hours.
      </p>
      {result?.mockups && result.mockups.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-8 max-w-md mx-auto">
          {result.mockups.map((m) => (
            <div
              key={m.id}
              className="aspect-square rounded-md overflow-hidden bg-white/[0.04] border border-white/10"
            >
              <img src={m.url} alt={m.label} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
