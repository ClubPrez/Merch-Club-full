export type AudienceKey =
  | "average"
  | "younger"
  | "hs_students"
  | "women_focused"
  | "men_focused"
  | "athletic"
  | "plus_focused"
  | "mixed_corporate";

export type SizeKey = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL" | "5XL";

const SIZES: SizeKey[] = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

const BASE: Record<SizeKey, number> = {
  XS: 0.02,
  S: 0.09,
  M: 0.20,
  L: 0.265,
  XL: 0.22,
  "2XL": 0.13,
  "3XL": 0.05,
  "4XL": 0.015,
  "5XL": 0.01,
};

const ADJUSTMENTS: Record<AudienceKey, number[]> = {
  average:        [ 0,      0,      0,     0,     0,      0,      0,      0,      0     ],
  younger:        [ .025,   .035,   .02,   .01,  -.025,  -.04,   -.02,   -.003,  -.002 ],
  hs_students:    [ .04,    .06,    .03,   .005, -.04,   -.06,   -.025,  -.007,  -.003 ],
  women_focused:  [ .03,    .04,    .02,   .005, -.02,   -.04,   -.025,  -.007,  -.003 ],
  men_focused:    [-.01,   -.015,  -.01,   .015,  .02,    .025,   .015,   .005,  -.005 ],
  athletic:       [-.005,   .01,    .03,   .03,   .01,   -.03,   -.03,   -.01,   -.005 ],
  plus_focused:   [-.015,  -.05,   -.06,  -.03,   .03,    .05,    .04,    .02,    .015 ],
  mixed_corporate:[-.005,  -.01,    0,     .01,   .01,    .01,    .005,  -.005,  -.005 ],
};

export interface AudienceType {
  key: AudienceKey;
  label: string;
  description: string;
}

export const AUDIENCE_TYPES: AudienceType[] = [
  { key: "average",         label: "General / Mixed",             description: "Standard national average distribution" },
  { key: "younger",         label: "Younger Crowd (18–30)",       description: "Skews smaller — college students, young professionals" },
  { key: "hs_students",     label: "High School Students",        description: "Juniors & seniors (~16–18) — heavy concentration in XS, S, and M; very few 2XL+" },
  { key: "women_focused",   label: "Women-Focused",               description: "Adjusted for women's typical size distribution" },
  { key: "men_focused",     label: "Men-Focused",                 description: "Adjusted for men's typical size distribution" },
  { key: "athletic",        label: "Athletic / Active",           description: "Active community, gym-goers — centers M/L/XL" },
  { key: "plus_focused",    label: "Plus / Larger Audience",      description: "Skews toward larger sizes XL and above" },
  { key: "mixed_corporate", label: "Corporate / Office",          description: "Broad professional workforce, slightly larger" },
];

export interface SizeResult {
  size: SizeKey;
  percentage: number;
  quantity: number;
}

export function calculateBreakdown(quantity: number, audience: AudienceKey): SizeResult[] {
  const deltas = ADJUSTMENTS[audience];

  const adjusted = SIZES.map((size, i) => ({
    size,
    pct: Math.max(0, BASE[size] + deltas[i]),
  }));

  const total = adjusted.reduce((s, r) => s + r.pct, 0);
  const normalized = adjusted.map(r => ({ size: r.size, percentage: r.pct / total }));

  const quantities = normalized.map(r => ({
    size: r.size,
    percentage: r.percentage,
    quantity: Math.round(r.percentage * quantity),
  }));

  const sum = quantities.reduce((s, r) => s + r.quantity, 0);
  const diff = quantity - sum;
  if (diff !== 0) {
    const largestIdx = quantities.reduce(
      (best, r, i) => (r.quantity > quantities[best].quantity ? i : best),
      0,
    );
    quantities[largestIdx].quantity += diff;
  }

  return quantities;
}
