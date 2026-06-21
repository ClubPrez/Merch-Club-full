import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// ── Types ─────────────────────────────────────────────────────────────────────

interface DecorationMethod {
  method: string;
  setupChg: number;
  screenChg: number;
  perColorSetup: number;
  perColorRunChg: number[];
  pricingDependsOnColors: boolean;
  pricingDependsOnLocations: boolean;
}

interface QuoteData {
  id: number;
  name: string;
  qty: number[];
  basePrc: number[];
  priceIncludes: string;
  setupChg: number;
  decorationMethods: DecorationMethod[];
  pics: { url: string; caption: string }[];
}

export interface QuoteProduct {
  id: number | string | null;
  name: string | null;
  thumb: string | null;
}

interface Props {
  open: boolean;
  product: QuoteProduct | null;
  onClose: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcPerUnit(
  basePrc: number[],
  qtyIdx: number,
  method: DecorationMethod,
  numColors: number,
  numLocations: number,
): number {
  const base = Number(basePrc[qtyIdx]) || 0;
  const colorsBeyondFirst = method.pricingDependsOnColors ? Math.max(0, numColors - 1) : 0;
  const effectiveLocations = method.pricingDependsOnLocations ? Math.max(1, numLocations) : 1;
  const perColorRun = Number(method.perColorRunChg[qtyIdx]) || 0;
  return base + perColorRun * colorsBeyondFirst * effectiveLocations;
}

function formatIncludes(raw: string): string {
  return raw
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" · ");
}

// ── Sub-components ────────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="px-6 py-6 space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-2.5 w-20 rounded" />
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-9 w-14 rounded-full" />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-2.5 w-32 rounded" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
      <div className="pt-2 space-y-3">
        <Skeleton className="h-12 w-36 rounded" />
        <Skeleton className="h-3 w-44 rounded" />
        <Skeleton className="h-3 w-28 rounded" />
      </div>
    </div>
  );
}

function Stepper({
  label,
  value,
  min = 1,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-black/8 last:border-b-0">
      <span className="text-[13px] font-medium text-black">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label="Decrease"
          className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-base leading-none hover:bg-black hover:text-white hover:border-black disabled:opacity-20 disabled:cursor-not-allowed transition-all"
        >
          −
        </button>
        <span className="w-5 text-center text-[17px] font-black tabular-nums">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          aria-label="Increase"
          className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-base leading-none hover:bg-black hover:text-white hover:border-black transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function QuoteModal({ open, product, onClose }: Props) {
  // Animation
  const [mounted, setMounted] = useState(false);
  const [entering, setEntering] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [fetchState, setFetchState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  // Selections
  const [selectedQtyIdx, setSelectedQtyIdx] = useState(0);
  const [selectedMethodIdx, setSelectedMethodIdx] = useState(0);
  const [numColors, setNumColors] = useState(1);
  const [numLocations, setNumLocations] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  // ── Mount / unmount with animation ──
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (open) {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      setMounted(true);
      setEntering(false);
      const f1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntering(true));
      });
      cleanup = () => cancelAnimationFrame(f1);
    } else if (mounted) {
      setEntering(false);
      exitTimerRef.current = setTimeout(() => {
        setMounted(false);
      }, 340);
      cleanup = () => {
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      };
    }
    return cleanup;
  }, [open]);

  // ── Body scroll lock ──
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ── Escape key ──
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // ── Fetch quote data ──
  useEffect(() => {
    if (!open || !product?.id) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setFetchState("loading");
    setQuoteData(null);
    setErrorMsg(null);
    setSelectedQtyIdx(0);
    setSelectedMethodIdx(0);
    setNumColors(1);
    setNumLocations(1);
    setShowDetails(false);

    fetch(`/api/quote-data/${product.id}`, { signal: ctrl.signal })
      .then(async (res) => {
        const json = (await res.json()) as {
          ok: boolean;
          data?: QuoteData;
          message?: string;
        };
        if (!json.ok || !json.data) {
          setErrorMsg(json.message ?? "Quote data unavailable for this product.");
          setFetchState("error");
          return;
        }
        const d = json.data;
        const firstNonZero = d.qty.findIndex((q) => Number(q) > 0);
        setSelectedQtyIdx(firstNonZero >= 0 ? firstNonZero : 0);
        setQuoteData(d);
        setFetchState("idle");
      })
      .catch((err: unknown) => {
        if ((err as Error).name === "AbortError") return;
        setErrorMsg("Something went wrong. Please try again.");
        setFetchState("error");
      });

    return () => ctrl.abort();
  }, [open, product?.id, fetchTrigger]);

  if (!mounted) return null;

  // ── Derived values ──
  const selectedMethod = quoteData?.decorationMethods[selectedMethodIdx] ?? null;
  const qtyBreakpoints = quoteData
    ? quoteData.qty
        .map((q, i) => ({ qty: Number(q), idx: i }))
        .filter(({ qty }) => qty > 0)
    : [];

  const perUnit =
    quoteData && selectedMethod
      ? calcPerUnit(quoteData.basePrc, selectedQtyIdx, selectedMethod, numColors, numLocations)
      : 0;

  const basePerUnit = quoteData ? Number(quoteData.basePrc[selectedQtyIdx]) || 0 : 0;
  const decoPerUnit = Math.max(0, perUnit - basePerUnit);

  const oneTimeSetupFees: { label: string; amount: number }[] = selectedMethod
    ? [
        { label: "Base setup charge", amount: Number(selectedMethod.setupChg) || 0 },
        { label: "Screen charge", amount: Number(selectedMethod.screenChg) || 0 },
        selectedMethod.pricingDependsOnColors && (Number(selectedMethod.perColorSetup) || 0) > 0
          ? {
              label: `Per-color setup (${numColors} color${numColors !== 1 ? "s" : ""})`,
              amount: (Number(selectedMethod.perColorSetup) || 0) * numColors,
            }
          : null,
      ].filter((x): x is { label: string; amount: number } => x !== null && x.amount > 0)
    : [];

  const isLoaded = fetchState === "idle" && quoteData !== null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm cursor-pointer"
        style={{
          opacity: entering ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Instant Quote"
        className="absolute inset-y-0 right-0 w-full sm:w-[520px] bg-white flex flex-col shadow-[−24px_0_80px_rgba(0,0,0,0.18)]"
        style={{
          transform: entering ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.36s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "-24px 0 80px rgba(0,0,0,0.18)",
        }}
      >
        {/* ── PANEL HEADER ── */}
        <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-black/8">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full border border-black/15 hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#bbb] mb-3">
            Instant Quote
          </p>

          {!isLoaded ? (
            <div className="flex gap-3 items-center pr-10">
              <Skeleton className="w-[52px] h-[52px] rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-2/5 rounded" />
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-start pr-10">
              {quoteData!.pics[0]?.url ? (
                <img
                  src={quoteData!.pics[0].url}
                  alt={quoteData!.name}
                  className="w-[52px] h-[52px] rounded-lg object-contain bg-[#f4f2ef] p-1.5 flex-shrink-0"
                />
              ) : (
                <div className="w-[52px] h-[52px] rounded-lg bg-[#f4f2ef] flex-shrink-0" />
              )}
              <div className="min-w-0">
                <h2 className="text-[14px] font-semibold text-black leading-snug line-clamp-2">
                  {quoteData!.name}
                </h2>
                {quoteData!.priceIncludes && (
                  <p className="mt-0.5 text-[11px] text-[#aaa] leading-relaxed">
                    Includes: {formatIncludes(quoteData!.priceIncludes)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {fetchState === "loading" && <LoadingSkeleton />}

          {fetchState === "error" && (
            <div className="flex flex-col items-center justify-center text-center py-20 px-8 gap-3">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-1">
                <svg className="w-5 h-5 text-black/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3
                className="text-xl font-black text-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Quote unavailable.
              </h3>
              <p className="text-[13px] text-[#777] max-w-xs leading-relaxed">{errorMsg}</p>
              <button
                onClick={() => setFetchTrigger((t) => t + 1)}
                className="mt-1 text-[11px] font-bold uppercase tracking-widest text-black underline underline-offset-4 hover:text-[#555] transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {isLoaded && quoteData && (
            <div className="px-6 py-6 space-y-8">

              {/* ── STEP 1: QUANTITY ── */}
              <section>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#bbb] mb-3">
                  Step 1 — Quantity
                </p>
                <div className="flex flex-wrap gap-2">
                  {qtyBreakpoints.map(({ qty, idx }) => {
                    const isSelected = idx === selectedQtyIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedQtyIdx(idx)}
                        className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-150 ${
                          isSelected
                            ? "bg-black text-white"
                            : "border border-black/20 text-black hover:border-black"
                        }`}
                      >
                        {qty.toLocaleString()}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* ── STEP 2: DECORATION METHOD ── */}
              <section>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#bbb] mb-3">
                  Step 2 — Decoration Method
                </p>
                <div
                  className={`grid gap-3 ${
                    quoteData.decorationMethods.length === 1 ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {quoteData.decorationMethods.map((dm, i) => {
                    const isSelected = i === selectedMethodIdx;
                    const methodUnit = calcPerUnit(
                      quoteData.basePrc,
                      selectedQtyIdx,
                      dm,
                      numColors,
                      numLocations,
                    );
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedMethodIdx(i)}
                        className={`relative text-left rounded-xl px-4 py-4 transition-all duration-150 border-2 ${
                          isSelected
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-black/10 hover:border-black/35"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </span>
                        )}
                        <p
                          className={`text-[11px] font-bold uppercase tracking-[0.1em] leading-snug pr-5 ${
                            isSelected ? "text-white/60" : "text-[#aaa]"
                          }`}
                        >
                          {dm.method}
                        </p>
                        <p
                          className={`mt-2 text-[22px] font-black tabular-nums leading-none ${
                            isSelected ? "text-white" : "text-black"
                          }`}
                        >
                          ${methodUnit.toFixed(2)}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? "text-white/45" : "text-[#ccc]"}`}>
                          / unit
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* ── CONDITIONAL INPUTS ── */}
              {(selectedMethod?.pricingDependsOnColors || selectedMethod?.pricingDependsOnLocations) && (
                <section className="rounded-xl bg-[#fafafa] border border-black/6 px-5 py-1">
                  {selectedMethod.pricingDependsOnColors && (
                    <Stepper
                      label="Number of colors"
                      value={numColors}
                      min={1}
                      onChange={setNumColors}
                    />
                  )}
                  {selectedMethod.pricingDependsOnLocations && (
                    <Stepper
                      label="Number of locations"
                      value={numLocations}
                      min={1}
                      onChange={setNumLocations}
                    />
                  )}
                </section>
              )}

              {/* ── PER-UNIT PRICE ── */}
              <section className="pb-2">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[52px] font-black text-black tabular-nums leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    ${perUnit.toFixed(2)}
                  </span>
                  <span className="text-[14px] text-[#999] font-medium">/ unit</span>
                </div>
                <p className="mt-1.5 text-[11px] text-[#bbb]">
                  at {qtyBreakpoints.find((b) => b.idx === selectedQtyIdx)?.qty.toLocaleString() ?? ""} units
                  {selectedMethod ? ` · ${selectedMethod.method}` : ""}
                </p>

                {/* Details toggle */}
                <button
                  onClick={() => setShowDetails((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[#999] hover:text-black transition-colors"
                >
                  See price details
                  <svg
                    className="w-3 h-3 transition-transform duration-200"
                    style={{ transform: showDetails ? "rotate(180deg)" : "rotate(0deg)" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Expandable breakdown */}
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: showDetails ? "480px" : "0",
                    opacity: showDetails ? 1 : 0,
                    transition: "max-height 0.32s ease, opacity 0.22s ease",
                  }}
                >
                  <div className="mt-4 rounded-xl bg-[#fafafa] border border-black/6 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-4">
                      Per-unit breakdown
                    </p>

                    <div className="space-y-2.5 text-[12px]">
                      <div className="flex justify-between">
                        <span className="text-[#666]">Base price</span>
                        <span className="font-semibold tabular-nums">${basePerUnit.toFixed(2)}</span>
                      </div>

                      {decoPerUnit > 0 && (
                        <div className="flex justify-between">
                          <span className="text-[#666]">Decoration run charge</span>
                          <span className="font-semibold tabular-nums">+${decoPerUnit.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between font-bold border-t border-black/8 pt-2.5">
                        <span>Per unit</span>
                        <span className="tabular-nums">${perUnit.toFixed(2)}</span>
                      </div>
                    </div>

                    {oneTimeSetupFees.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-black/8">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#bbb] mb-3">
                          One-time setup (not per unit)
                        </p>
                        <div className="space-y-2.5 text-[12px]">
                          {oneTimeSetupFees.map(({ label, amount }) => (
                            <div key={label} className="flex justify-between">
                              <span className="text-[#666]">{label}</span>
                              <span className="font-semibold tabular-nums">${Number(amount).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* ── STICKY FOOTER ── */}
        <div className="flex-shrink-0 border-t border-black/8 px-6 pt-4 pb-6 bg-white">
          <button
            disabled={!isLoaded}
            onClick={() => {
              if (!quoteData || !selectedMethod) return;
              // TODO: wire to artwork upload + contact form (next prompt)
              console.log("Instant Quote selection:", {
                productId: product?.id,
                qty: quoteData.qty[selectedQtyIdx],
                method: selectedMethod.method,
                numColors: selectedMethod.pricingDependsOnColors ? numColors : null,
                numLocations: selectedMethod.pricingDependsOnLocations ? numLocations : null,
                perUnit: Number(perUnit.toFixed(2)),
              });
            }}
            className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-full hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            Continue to Artwork &amp; Contact
          </button>
          <p className="mt-2 text-center text-[10px] text-[#bbb]">
            No commitment — we'll confirm the quote and collect artwork next.
          </p>
        </div>
      </div>
    </div>
  );
}
