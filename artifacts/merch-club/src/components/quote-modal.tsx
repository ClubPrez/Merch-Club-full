import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
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

// A price is only safe to show when it's a finite, positive number. Anything
// else (missing tier, NaN, or $0) means we couldn't compute a real quote.
function isPriceable(n: number): boolean {
  return Number.isFinite(n) && n > 0;
}

function calcPerUnit(
  basePrc: number[],
  qtyIdx: number,
  method: DecorationMethod,
  numColors: number,
  numLocations: number,
): number {
  const base = Number(basePrc[qtyIdx]);
  if (!Number.isFinite(base)) return NaN;
  const colorsBeyondFirst = method.pricingDependsOnColors ? Math.max(0, numColors - 1) : 0;
  const effectiveLocations = method.pricingDependsOnLocations ? Math.max(1, numLocations) : 1;
  const perColorRunRaw = Number(method.perColorRunChg[qtyIdx]);
  const perColorRun = Number.isFinite(perColorRunRaw) ? perColorRunRaw : 0;
  const result = base + perColorRun * colorsBeyondFirst * effectiveLocations;
  return Number.isFinite(result) ? result : NaN;
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
  const [picError, setPicError] = useState(false);

  // ── View state, artwork upload, contact form, submit ──
  const [modalView, setModalView] = useState<"quote" | "contact" | "success">("quote");
  const [artworkFileId, setArtworkFileId] = useState<string | null>(null);
  const [artworkFileName, setArtworkFileName] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactZip, setContactZip] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setPicError(false);
    setModalView("quote");
    setArtworkFileId(null);
    setArtworkFileName(null);
    setUploadState("idle");
    setUploadError(null);
    setContactName("");
    setContactCompany("");
    setContactEmail("");
    setContactPhone("");
    setContactZip("");
    setSubmitState("idle");
    setSubmitError(null);

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

  // ── Artwork upload handler ────────────────────────────────────────────────
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setUploadState("error");
      setUploadError("File is too large (max 20MB).");
      return;
    }
    setUploadState("uploading");
    setUploadError(null);
    setArtworkFileId(null);
    setArtworkFileName(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/quote-request/upload", { method: "POST", body: fd });
      const json = (await res.json()) as {
        ok: boolean;
        fileId?: string;
        fileName?: string;
        message?: string;
      };
      if (!json.ok || !json.fileId) {
        setUploadState("error");
        setUploadError(json.message ?? "Upload failed. You can proceed without artwork.");
        return;
      }
      setArtworkFileId(json.fileId);
      setArtworkFileName(json.fileName ?? file.name);
      setUploadState("done");
    } catch {
      setUploadState("error");
      setUploadError("Upload failed. You can proceed without artwork.");
    }
  };

  const handleRemoveArtwork = () => {
    setArtworkFileId(null);
    setArtworkFileName(null);
    setUploadState("idle");
    setUploadError(null);
  };

  // ── Quote request submit handler ──────────────────────────────────────────
  const handleSubmit = async () => {
    if (!quoteData || !selectedMethod) return;
    if (!isPriceable(perUnit)) {
      setSubmitError("We couldn't price this item automatically. Please contact us for a quote.");
      return;
    }
    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    if (!trimmedName) {
      setSubmitError("Name is required.");
      return;
    }
    if (!trimmedEmail) {
      setSubmitError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    setSubmitState("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: String(product?.id ?? ""),
          productName: quoteData.name,
          qty: quoteData.qty[selectedQtyIdx],
          method: selectedMethod.method,
          numColors: selectedMethod.pricingDependsOnColors ? numColors : null,
          numLocations: selectedMethod.pricingDependsOnLocations ? numLocations : null,
          perUnit: Number(perUnit.toFixed(2)),
          artworkFileId,
          artworkFileName,
          name: trimmedName,
          company: contactCompany.trim(),
          email: trimmedEmail,
          phone: contactPhone.trim(),
          zip: contactZip.trim(),
        }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!json.ok) {
        setSubmitState("error");
        setSubmitError(json.message ?? "Something went wrong. Please try again.");
        return;
      }
      setModalView("success");
      setSubmitState("idle");
    } catch {
      setSubmitState("error");
      setSubmitError("Network error. Please check your connection and try again.");
    }
  };

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
      : NaN;

  const basePerUnit = quoteData ? Number(quoteData.basePrc[selectedQtyIdx]) || 0 : 0;

  // Margin protection: only treat the quote as priceable when we have a real
  // quantity tier, a selected method, and a finite positive computed price.
  // Otherwise show "Contact us for pricing" instead of $0.00 / NaN.
  const canPrice =
    qtyBreakpoints.length > 0 &&
    !!selectedMethod &&
    isPriceable(basePerUnit) &&
    isPriceable(perUnit);

  const decoPerUnit = canPrice ? Math.max(0, perUnit - basePerUnit) : 0;

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
              {(() => {
                const primarySrc = quoteData!.pics[0]?.url || null;
                const fallbackSrc = product?.thumb || null;
                const imgSrc = picError ? fallbackSrc : primarySrc;
                return imgSrc ? (
                  <img
                    key={imgSrc}
                    src={imgSrc}
                    alt={quoteData!.name}
                    className="w-[52px] h-[52px] rounded-lg object-contain bg-[#f4f2ef] p-1.5 flex-shrink-0"
                    onError={() => {
                      if (!picError && fallbackSrc && imgSrc !== fallbackSrc) {
                        setPicError(true);
                      }
                    }}
                  />
                ) : (
                  <div className="w-[52px] h-[52px] rounded-lg bg-[#f4f2ef] flex-shrink-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-black/15" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                );
              })()}
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
              <p className="text-[12px] text-[#999] mt-1 leading-relaxed">
                Or{" "}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-black font-semibold underline underline-offset-2 hover:text-[#555] transition-colors"
                >
                  contact us
                </Link>{" "}
                and we'll quote it manually.
              </p>
            </div>
          )}

          {isLoaded && quoteData && modalView === "quote" && (
            <div className="px-6 py-6 space-y-8">

              {/* ── STEP 1: QUANTITY ── */}
              {qtyBreakpoints.length > 0 && (
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
              )}

              {/* ── STEP 2: DECORATION METHOD ── */}
              {quoteData.decorationMethods.length > 0 && (
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
                    // Mirror canPrice exactly (shared qty-tier + base-price
                    // checks) so a card can never show a price the main quote
                    // treats as unpriceable.
                    const methodPriceable =
                      qtyBreakpoints.length > 0 &&
                      isPriceable(basePerUnit) &&
                      isPriceable(methodUnit);
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
                          className={`mt-2 font-black tabular-nums leading-none ${
                            methodPriceable ? "text-[22px]" : "text-[15px]"
                          } ${isSelected ? "text-white" : "text-black"}`}
                        >
                          {methodPriceable ? `$${methodUnit.toFixed(2)}` : "Contact us"}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${isSelected ? "text-white/45" : "text-[#ccc]"}`}>
                          {methodPriceable ? "/ unit" : "for pricing"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
              )}

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
                {canPrice ? (
                <>
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
                </>
                ) : (
                  <div>
                    <p
                      className="text-[30px] font-black text-black leading-tight"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      Contact us for pricing
                    </p>
                    <p className="mt-2 text-[13px] text-[#777] leading-relaxed max-w-xs">
                      We couldn't generate an automatic price for this item.{" "}
                      <Link
                        href="/contact"
                        onClick={onClose}
                        className="text-black font-semibold underline underline-offset-2 hover:text-[#555] transition-colors"
                      >
                        Contact us
                      </Link>{" "}
                      and we'll put together an accurate quote.
                    </p>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* ── CONTACT VIEW ── */}
          {modalView === "contact" && (
            <div className="px-6 py-6 space-y-6">
              {/* Back link + quote summary */}
              <div>
                <button
                  onClick={() => setModalView("quote")}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#aaa] hover:text-black transition-colors mb-4"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Back to options
                </button>
                <div className="bg-[#f5f5f5] rounded-xl px-4 py-3 text-[12px]">
                  <span className="font-semibold">{selectedMethod?.method ?? "—"}</span>
                  <span className="text-[#999]"> · {(quoteData?.qty[selectedQtyIdx] ?? 0).toLocaleString()} units</span>
                  <span className="text-[#999]"> · </span>
                  <span className="font-semibold">
                    {canPrice ? `$${perUnit.toFixed(2)} / unit` : "Contact us for pricing"}
                  </span>
                </div>
              </div>

              {/* Artwork upload */}
              <section>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#bbb] mb-3">
                  Artwork{" "}
                  <span className="normal-case font-normal tracking-normal text-[9px] text-[#ccc]">
                    (optional)
                  </span>
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf,.ai,.eps,.svg,image/*,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {uploadState === "done" && artworkFileName ? (
                  <div className="flex items-center gap-3 border border-black/10 rounded-xl px-4 py-3 bg-[#f5f5f5]">
                    <svg className="w-4 h-4 text-black flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[12px] text-black flex-1 truncate">{artworkFileName}</span>
                    <button
                      onClick={handleRemoveArtwork}
                      className="text-[#aaa] hover:text-black transition-colors text-[11px] underline underline-offset-2 flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadState === "uploading"}
                    className="w-full border border-dashed border-black/20 hover:border-black/40 rounded-xl px-4 py-5 flex flex-col items-center gap-2 transition-colors disabled:opacity-60"
                  >
                    {uploadState === "uploading" ? (
                      <>
                        <svg className="w-5 h-5 text-[#aaa] animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span className="text-[11px] text-[#aaa]">Uploading…</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-[#ccc]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className="text-[12px] text-[#aaa]">Upload artwork file</span>
                        <span className="text-[10px] text-[#bbb]">PNG, JPG, PDF, AI, EPS, SVG · max 20MB</span>
                      </>
                    )}
                  </button>
                )}
                {uploadState === "error" && uploadError && (
                  <p className="mt-2 text-[11px] text-[#999]">{uploadError}</p>
                )}
              </section>

              {/* Contact form */}
              <section>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#bbb] mb-3">
                  Your Info
                </p>
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Name *"
                      className="bg-[#f5f5f5] border border-black/10 rounded-lg px-3.5 py-3 text-[13px] placeholder:text-[#bbb] focus:outline-none focus:border-black/30 transition-colors"
                    />
                    <input
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      placeholder="Company"
                      className="bg-[#f5f5f5] border border-black/10 rounded-lg px-3.5 py-3 text-[13px] placeholder:text-[#bbb] focus:outline-none focus:border-black/30 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Email *"
                      className="bg-[#f5f5f5] border border-black/10 rounded-lg px-3.5 py-3 text-[13px] placeholder:text-[#bbb] focus:outline-none focus:border-black/30 transition-colors"
                    />
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Phone"
                      className="bg-[#f5f5f5] border border-black/10 rounded-lg px-3.5 py-3 text-[13px] placeholder:text-[#bbb] focus:outline-none focus:border-black/30 transition-colors"
                    />
                  </div>
                  <input
                    value={contactZip}
                    onChange={(e) => setContactZip(e.target.value)}
                    placeholder="Zip code"
                    className="w-full bg-[#f5f5f5] border border-black/10 rounded-lg px-3.5 py-3 text-[13px] placeholder:text-[#bbb] focus:outline-none focus:border-black/30 transition-colors"
                  />
                  {submitError && (
                    <p className="text-[11px] text-red-500 pt-0.5">{submitError}</p>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ── SUCCESS VIEW ── */}
          {modalView === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20">
              <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3
                className="text-3xl font-black text-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                Request received.
              </h3>
              <p className="text-[14px] text-[#777] mt-3 leading-relaxed max-w-xs">
                Thanks — your request is in. We'll be in touch shortly to confirm details.
              </p>
              <button
                onClick={onClose}
                className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-black underline underline-offset-4 hover:text-[#666] transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* ── STICKY FOOTER ── */}
        {modalView !== "success" && (
          <div className="flex-shrink-0 border-t border-black/8 px-6 pt-4 pb-6 bg-white">
            {modalView === "quote" && (
              isLoaded && !canPrice ? (
                <>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="block w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-full hover:bg-black/80 transition-all duration-200 text-center"
                  >
                    Contact Us About This Product
                  </Link>
                  <p className="mt-2 text-center text-[10px] text-[#bbb]">
                    We'll put together an accurate quote for this item.
                  </p>
                </>
              ) : (
              <>
                <button
                  disabled={!isLoaded}
                  onClick={() => {
                    if (!quoteData || !selectedMethod) return;
                    setModalView("contact");
                  }}
                  className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-full hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Continue to Artwork &amp; Contact
                </button>
                <p className="mt-2 text-center text-[10px] text-[#bbb]">
                  No commitment — we'll confirm the quote and collect artwork next.
                </p>
              </>
              )
            )}
            {modalView === "contact" && (
              <>
                <button
                  disabled={
                    submitState === "submitting" ||
                    !contactName.trim() ||
                    !contactEmail.trim()
                  }
                  onClick={handleSubmit}
                  className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-full hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {submitState === "submitting" ? "Submitting…" : "Submit Quote Request"}
                </button>
                <p className="mt-2 text-center text-[10px] text-[#bbb]">
                  No commitment — we'll follow up to confirm details.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
