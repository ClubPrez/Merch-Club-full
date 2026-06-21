const SEARCH_SERVICE_ID = 103;
const DETAIL_SERVICE_ID = 104;
const API_VER = 130;
const MAX_RECS = 24;

export interface SearchProductsParams {
  query: string;
  category?: string;
  page?: number;
}

export interface PublicProduct {
  id: number | string | null;
  spc: string | null;
  name: string | null;
  category: string | null;
  description: string | null;
  priceRange: string | null;
  thumb: string | null;
}

export interface PublicProductPic {
  url: string | null;
  caption: string | null;
}

export interface PublicProductDetail {
  id: number;
  name: string | null;
  description: string | null;
  category: string | null;
  qty: (string | number)[];
  prc: (string | number)[];
  priceIncludes: string | null;
  setupChg: string | number | null;
  pics: PublicProductPic[];
  prodTime: string | null;
}

const FRIENDLY_SEARCH_ERROR_MESSAGES: Record<number, string> = {
  10301: "SAGE authentication failed. Please verify the account credentials.",
  10302: "This SAGE account is not authorized for product search.",
  10303: "The SAGE login is invalid or has expired.",
  10304: "Access was denied by SAGE. Please check the account permissions.",
};

const FRIENDLY_DETAIL_ERROR_MESSAGES: Record<number, string> = {
  10401: "That product could not be found.",
  10402: "That product is not available.",
};

export class SageError extends Error {
  readonly errNum?: number;
  readonly detail?: string;

  constructor(message: string, options?: { errNum?: number; detail?: string }) {
    super(message);
    this.name = "SageError";
    this.errNum = options?.errNum;
    this.detail = options?.detail;
  }
}

function parseErrNum(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return undefined;
}

interface SageCredentials {
  url: string;
  acctId: string;
  loginId: string;
  authKey: string;
}

function requireCredentials(): SageCredentials {
  const url = process.env.SAGE_CONNECT_URL;
  const acctId = process.env.SAGE_ACCT_ID;
  const loginId = process.env.SAGE_LOGIN_ID;
  const authKey = process.env.SAGE_AUTH_KEY;

  if (!url || !acctId || !loginId || !authKey) {
    throw new SageError("SAGE Connect is not configured on the server.");
  }

  return { url, acctId, loginId, authKey };
}

async function postToSage(
  url: string,
  requestBody: Record<string, unknown>,
  friendlyMessages: Record<number, string>,
  genericErrorMessage: string,
): Promise<Record<string, unknown>> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  } catch {
    throw new SageError("Could not reach the SAGE Connect service.");
  }

  if (!response.ok) {
    throw new SageError(`SAGE Connect returned HTTP ${response.status}.`);
  }

  let data: Record<string, unknown>;
  try {
    data = (await response.json()) as Record<string, unknown>;
  } catch {
    throw new SageError("SAGE Connect returned an invalid response.");
  }

  const errNumPresent = data.errNum !== undefined && data.errNum !== null;
  const errNum = parseErrNum(data.errNum);

  if (data.ok === false || errNumPresent) {
    const friendly = errNum !== undefined ? friendlyMessages[errNum] : undefined;
    const rawMsg =
      typeof data.errMsg === "string" && data.errMsg.trim() ? data.errMsg.trim() : undefined;
    throw new SageError(friendly ?? genericErrorMessage, { errNum, detail: rawMsg });
  }

  return data;
}

function toPublicProduct(raw: Record<string, unknown>): PublicProduct {
  const name =
    (typeof raw.name === "string" && raw.name) ||
    (typeof raw.prName === "string" && raw.prName) ||
    null;

  const id =
    typeof raw.prodEId === "number" || typeof raw.prodEId === "string"
      ? raw.prodEId
      : null;

  return {
    id,
    spc: typeof raw.spc === "string" ? raw.spc : null,
    name,
    category: typeof raw.category === "string" ? raw.category : null,
    description: typeof raw.description === "string" ? raw.description : null,
    priceRange: typeof raw.prc === "string" ? raw.prc : null,
    thumb: typeof raw.thumbPic === "string" ? raw.thumbPic : null,
  };
}

function toPublicProductDetail(id: number, raw: Record<string, unknown>): PublicProductDetail {
  const name =
    (typeof raw.prName === "string" && raw.prName) ||
    (typeof raw.name === "string" && raw.name) ||
    null;

  const pics = Array.isArray(raw.pics)
    ? (raw.pics as Record<string, unknown>[]).map((pic) => ({
        url: typeof pic?.url === "string" ? pic.url : null,
        caption: typeof pic?.caption === "string" ? pic.caption : null,
      }))
    : [];

  const qty = Array.isArray(raw.qty) ? (raw.qty as (string | number)[]) : [];
  const prc = Array.isArray(raw.prc) ? (raw.prc as (string | number)[]) : [];

  const setupChg =
    typeof raw.setupChg === "string" || typeof raw.setupChg === "number"
      ? raw.setupChg
      : null;

  return {
    id,
    name,
    description: typeof raw.description === "string" ? raw.description : null,
    category: typeof raw.category === "string" ? raw.category : null,
    qty,
    prc,
    priceIncludes: typeof raw.priceIncludes === "string" ? raw.priceIncludes : null,
    setupChg,
    pics,
    prodTime: typeof raw.prodTime === "string" ? raw.prodTime : null,
  };
}

export async function searchProducts({
  query,
  category,
  page = 1,
}: SearchProductsParams): Promise<PublicProduct[]> {
  const { url, acctId, loginId, authKey } = requireCredentials();

  const safePage =
    Number.isFinite(page) && (page as number) > 0 ? Math.floor(page as number) : 1;
  const startNum = (safePage - 1) * MAX_RECS + 1;

  const search: Record<string, unknown> = {
    quickSearch: query,
    endBuyerSearch: true,
    endUserOnly: true,
    applyPsSearchRestrictions: true,
    sort: "BESTMATCH",
    extraReturnFields: "DESCRIPTION,CATEGORY",
    maxRecs: MAX_RECS,
    startNum,
  };

  if (category && category.trim()) {
    search.categories = category.trim();
  }

  const requestBody = {
    serviceId: SEARCH_SERVICE_ID,
    apiVer: API_VER,
    auth: {
      acctId: Number(acctId),
      loginId,
      key: authKey,
    },
    search,
  };

  const data = await postToSage(
    url,
    requestBody,
    FRIENDLY_SEARCH_ERROR_MESSAGES,
    "The product search could not be completed. Please try again.",
  );

  const products = Array.isArray(data.products) ? data.products : [];
  return products.map((item) => toPublicProduct(item as Record<string, unknown>));
}

export async function getProductDetail(prodEId: number): Promise<PublicProductDetail> {
  const { url, acctId, loginId, authKey } = requireCredentials();

  const requestBody = {
    serviceId: DETAIL_SERVICE_ID,
    apiVer: API_VER,
    auth: {
      acctId: Number(acctId),
      loginId,
      key: authKey,
    },
    prodEId,
  };

  const data = await postToSage(
    url,
    requestBody,
    FRIENDLY_DETAIL_ERROR_MESSAGES,
    "The product detail could not be retrieved. Please try again.",
  );

  const product = data.product;
  if (!product || typeof product !== "object") {
    throw new SageError("That product could not be found.", { errNum: 10401 });
  }

  return toPublicProductDetail(prodEId, product as Record<string, unknown>);
}
