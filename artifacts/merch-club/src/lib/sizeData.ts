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

// State-level deltas [XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL]
// Based on CDC BRFSS obesity prevalence by state.
// Positive = more of that size, negative = less.
const TIER: Record<string, number[]> = {
  "-2": [ 0.005,  0.013,  0.018,  0.008, -0.010, -0.018, -0.010, -0.004, -0.002],
  "-1": [ 0.003,  0.007,  0.010,  0.005, -0.006, -0.010, -0.006, -0.002, -0.001],
   "0": [ 0,      0,      0,      0,      0,      0,      0,      0,      0     ],
   "1": [-0.003, -0.007, -0.010, -0.005,  0.006,  0.010,  0.006,  0.002,  0.001],
   "2": [-0.005, -0.013, -0.018, -0.008,  0.010,  0.018,  0.010,  0.004,  0.002],
   "3": [-0.008, -0.020, -0.025, -0.010,  0.015,  0.025,  0.015,  0.006,  0.002],
};

// Tier assignments per state code — sourced from CDC obesity prevalence data.
// Tier 3 = significantly larger distribution (≥38% obesity)
// Tier 2 = moderately larger (35–38%)
// Tier 1 = slightly larger (32–35%)
// Tier 0 = national average (28–32%)
// Tier -1 = slightly smaller (24–28%)
// Tier -2 = moderately smaller (<24%)
const STATE_TIER: Record<string, string> = {
  AL: "3", AK: "1", AZ: "0", AR: "2", CA: "-2",
  CO: "-2", CT: "-1", DE: "0", DC: "-2", FL: "0",
  GA: "1", HI: "-2", ID: "0", IL: "0", IN: "1",
  IA: "1", KS: "1", KY: "2", LA: "2", ME: "0",
  MD: "-1", MA: "-2", MI: "1", MN: "0", MS: "3",
  MO: "1", MT: "0", NE: "1", NV: "0", NH: "0",
  NJ: "-1", NM: "-1", NY: "-1", NC: "1", ND: "2",
  OH: "1", OK: "2", OR: "0", PA: "0", RI: "-1",
  SC: "2", SD: "1", TN: "2", TX: "1", UT: "-1",
  VT: "-1", VA: "0", WA: "-1", WV: "3", WI: "1",
  WY: "0",
};

export const STATE_ADJUSTMENTS: Record<string, number[]> = Object.fromEntries(
  Object.entries(STATE_TIER).map(([code, tier]) => [code, TIER[tier]])
);

export interface StateOption {
  code: string;
  name: string;
  tier: number;
}

export const STATES: StateOption[] = [
  { code: "",   name: "National Average (No Adjustment)", tier: 0 },
  { code: "AL", name: "Alabama",        tier: 3  },
  { code: "AK", name: "Alaska",         tier: 1  },
  { code: "AZ", name: "Arizona",        tier: 0  },
  { code: "AR", name: "Arkansas",       tier: 2  },
  { code: "CA", name: "California",     tier: -2 },
  { code: "CO", name: "Colorado",       tier: -2 },
  { code: "CT", name: "Connecticut",    tier: -1 },
  { code: "DE", name: "Delaware",       tier: 0  },
  { code: "DC", name: "Washington D.C.",tier: -2 },
  { code: "FL", name: "Florida",        tier: 0  },
  { code: "GA", name: "Georgia",        tier: 1  },
  { code: "HI", name: "Hawaii",         tier: -2 },
  { code: "ID", name: "Idaho",          tier: 0  },
  { code: "IL", name: "Illinois",       tier: 0  },
  { code: "IN", name: "Indiana",        tier: 1  },
  { code: "IA", name: "Iowa",           tier: 1  },
  { code: "KS", name: "Kansas",         tier: 1  },
  { code: "KY", name: "Kentucky",       tier: 2  },
  { code: "LA", name: "Louisiana",      tier: 2  },
  { code: "ME", name: "Maine",          tier: 0  },
  { code: "MD", name: "Maryland",       tier: -1 },
  { code: "MA", name: "Massachusetts",  tier: -2 },
  { code: "MI", name: "Michigan",       tier: 1  },
  { code: "MN", name: "Minnesota",      tier: 0  },
  { code: "MS", name: "Mississippi",    tier: 3  },
  { code: "MO", name: "Missouri",       tier: 1  },
  { code: "MT", name: "Montana",        tier: 0  },
  { code: "NE", name: "Nebraska",       tier: 1  },
  { code: "NV", name: "Nevada",         tier: 0  },
  { code: "NH", name: "New Hampshire",  tier: 0  },
  { code: "NJ", name: "New Jersey",     tier: -1 },
  { code: "NM", name: "New Mexico",     tier: -1 },
  { code: "NY", name: "New York",       tier: -1 },
  { code: "NC", name: "North Carolina", tier: 1  },
  { code: "ND", name: "North Dakota",   tier: 2  },
  { code: "OH", name: "Ohio",           tier: 1  },
  { code: "OK", name: "Oklahoma",       tier: 2  },
  { code: "OR", name: "Oregon",         tier: 0  },
  { code: "PA", name: "Pennsylvania",   tier: 0  },
  { code: "RI", name: "Rhode Island",   tier: -1 },
  { code: "SC", name: "South Carolina", tier: 2  },
  { code: "SD", name: "South Dakota",   tier: 1  },
  { code: "TN", name: "Tennessee",      tier: 2  },
  { code: "TX", name: "Texas",          tier: 1  },
  { code: "UT", name: "Utah",           tier: -1 },
  { code: "VT", name: "Vermont",        tier: -1 },
  { code: "VA", name: "Virginia",       tier: 0  },
  { code: "WA", name: "Washington",     tier: -1 },
  { code: "WV", name: "West Virginia",  tier: 3  },
  { code: "WI", name: "Wisconsin",      tier: 1  },
  { code: "WY", name: "Wyoming",        tier: 0  },
];

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

export function calculateBreakdown(
  quantity: number,
  audience: AudienceKey,
  stateCode: string = "",
): SizeResult[] {
  const audienceDeltas = ADJUSTMENTS[audience];
  const stateDeltas = stateCode ? (STATE_ADJUSTMENTS[stateCode] ?? TIER["0"]) : TIER["0"];

  const adjusted = SIZES.map((size, i) => ({
    size,
    pct: Math.max(0, BASE[size] + audienceDeltas[i] + stateDeltas[i]),
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
