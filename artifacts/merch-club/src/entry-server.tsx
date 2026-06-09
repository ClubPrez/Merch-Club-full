import { renderToString } from "react-dom/server";
import App from "./App";

function setupGlobals(pathname: string) {
  const noop = () => {};
  const noopTrue = () => true;

  const location = {
    pathname,
    search: "",
    hash: "",
    href: `https://merchclub.com${pathname}`,
    origin: "https://merchclub.com",
    host: "merchclub.com",
    hostname: "merchclub.com",
    protocol: "https:",
    port: "",
    toString() {
      return this.href;
    },
  };

  const matchMediaResult = {
    matches: false,
    media: "",
    addListener: noop,
    removeListener: noop,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: noopTrue,
  };

  const mockWindow: Record<string, unknown> = {
    location,
    history: {
      pushState: noop,
      replaceState: noop,
      back: noop,
      forward: noop,
      go: noop,
      state: null,
      length: 1,
    },
    scrollTo: noop,
    scroll: noop,
    scrollX: 0,
    scrollY: 0,
    pageXOffset: 0,
    pageYOffset: 0,
    innerWidth: 1280,
    innerHeight: 900,
    outerWidth: 1280,
    outerHeight: 900,
    devicePixelRatio: 1,
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: noopTrue,
    matchMedia: () => matchMediaResult,
    requestAnimationFrame: (_cb: FrameRequestCallback) => 0,
    cancelAnimationFrame: noop,
    getComputedStyle: () => ({
      getPropertyValue: () => "",
      setProperty: noop,
      removeProperty: noop,
      length: 0,
    }),
    performance: { now: () => 0, mark: noop, measure: noop },
    navigator: {
      userAgent: "node-ssr/1.0",
      platform: "node",
      language: "en-US",
      languages: ["en-US"],
      onLine: true,
    },
    screen: { width: 1280, height: 900 },
    localStorage: {
      getItem: () => null,
      setItem: noop,
      removeItem: noop,
      clear: noop,
      length: 0,
      key: () => null,
    },
    sessionStorage: {
      getItem: () => null,
      setItem: noop,
      removeItem: noop,
      clear: noop,
      length: 0,
      key: () => null,
    },
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
    setInterval: globalThis.setInterval,
    clearInterval: globalThis.clearInterval,
    queueMicrotask: globalThis.queueMicrotask,
    fetch: typeof fetch !== "undefined" ? fetch : noop,
    URL: globalThis.URL,
    URLSearchParams: globalThis.URLSearchParams,
    TextEncoder: globalThis.TextEncoder,
    TextDecoder: globalThis.TextDecoder,
    crypto: typeof crypto !== "undefined" ? crypto : { getRandomValues: noop },
    btoa: typeof btoa !== "undefined" ? btoa : noop,
    atob: typeof atob !== "undefined" ? atob : noop,
    isSecureContext: true,
    origin: "https://merchclub.com",
    self: null as unknown,
  };
  mockWindow.self = mockWindow;
  mockWindow.window = mockWindow;

  const mockDocument = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => Object.assign([], { length: 0, forEach: noop, item: () => null }),
    createElement: () => ({
      style: {},
      setAttribute: noop,
      getAttribute: () => null,
      appendChild: noop,
      removeChild: noop,
      classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    }),
    createElementNS: () => ({
      style: {},
      setAttribute: noop,
      getAttribute: () => null,
      appendChild: noop,
    }),
    createTextNode: () => ({ nodeValue: "", data: "" }),
    createComment: () => ({}),
    createDocumentFragment: () => ({ appendChild: noop, childNodes: [] }),
    head: {
      appendChild: noop,
      removeChild: noop,
      querySelector: () => null,
      querySelectorAll: () => [],
      children: [],
    },
    body: {
      style: {},
      classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
      appendChild: noop,
      removeChild: noop,
      getAttribute: () => null,
      setAttribute: noop,
    },
    documentElement: {
      style: {},
      lang: "en",
      dir: "ltr",
      classList: { contains: () => false, add: noop, remove: noop },
      setAttribute: noop,
      getAttribute: () => null,
    },
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: noopTrue,
    readyState: "complete",
    cookie: "",
    title: "",
    URL: `https://merchclub.com${pathname}`,
    baseURI: "https://merchclub.com",
    hidden: false,
    visibilityState: "visible",
  };

  class NoopObserver {
    observe = noop;
    unobserve = noop;
    disconnect = noop;
  }

  // Use defineProperty to safely override read-only getter properties
  // (e.g. `navigator` is a getter-only on globalThis in Node 20+)
  const def = (key: string, value: unknown) => {
    try {
      Object.defineProperty(globalThis, key, {
        value,
        writable: true,
        configurable: true,
        enumerable: false,
      });
    } catch {
      // Fall back to direct assignment if defineProperty itself is restricted
      try {
        (globalThis as Record<string, unknown>)[key] = value;
      } catch {
        // ignore
      }
    }
  };

  def("window", mockWindow);
  def("document", mockDocument);
  def("navigator", mockWindow.navigator);
  def("location", location);
  def("history", mockWindow.history);
  def("screen", mockWindow.screen);
  def("localStorage", mockWindow.localStorage);
  def("sessionStorage", mockWindow.sessionStorage);
  def("matchMedia", mockWindow.matchMedia);
  def("getComputedStyle", mockWindow.getComputedStyle);
  def("performance", mockWindow.performance);
  def("requestAnimationFrame", mockWindow.requestAnimationFrame);
  def("cancelAnimationFrame", mockWindow.cancelAnimationFrame);
  def("IntersectionObserver", NoopObserver);
  def("ResizeObserver", NoopObserver);
  def("MutationObserver", class {
    observe = noop;
    disconnect = noop;
    takeRecords = () => [];
  });
  def("CustomEvent", class { constructor(_t?: string, _i?: unknown) {} });
  def("Event", class { constructor(_t?: string, _i?: unknown) {} });
  def("PointerEvent", class { constructor(_t?: string, _i?: unknown) {} });
}

export function render(url: string): string {
  setupGlobals(url);
  try {
    return renderToString(<App />);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[SSR] render failed for ${url}: ${message}`);
    return "";
  }
}
