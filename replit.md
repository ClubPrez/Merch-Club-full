# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/merch-club` (`@workspace/merch-club`)

Dark, editorial-style merch store landing page for Merch Club. React + Vite + Tailwind CSS + wouter for routing.

- **Pages**: Home (`/`), About (`/about`), Blog listing (`/blog`), Blog post (`/blog/:slug`), Healthcare (`/industries/healthcare`)
- **Key files**: `src/pages/home.tsx`, `src/pages/about.tsx`, `src/pages/blog.tsx`, `src/pages/blog-post.tsx`, `src/pages/healthcare.tsx`
- **Shared components**: `src/components/start-project-modal.tsx` (AI-powered mockup generator modal — URL → scrape → logo + palette → composited merch concepts → lead capture, used on every page), `src/components/seo.tsx`
- **AI mockup generator**: Backend at `@workspace/api-server`, route `POST /api/generate-mockups` with `{url}` body. Pipeline: `lib/safeFetch.ts` (SSRF-hardened fetcher with pinned-IP undici dispatcher) → `lib/scrape.ts` → `lib/logo.ts` (img + inline-SVG candidate scoring, photo rejection, sharp rasterization, monogram fallback) → `lib/colors.ts` (palette from logo pixels + page CSS) → `lib/mockups.ts` (3 SVG product templates: tee, drinkware, cap; adaptive light/dark fabric based on logo brightness; conditional negate only for dark monochrome logos). Generated PNGs stored in `os.tmpdir()/merchclub-generated`, served at `/api/generated/*`. Lead capture at `POST /api/lead`.
- **SEO**: Reusable `src/components/seo.tsx` component with dynamic title/description/OG/Twitter tags per page. `public/robots.txt` and `public/sitemap.xml` (7 URLs).
- **Design**: Dark (#0a0a0a / #111) backgrounds with white/gray text, Bebas Neue for headlines, reveal-on-scroll animations via IntersectionObserver
- **Navigation**: Consistent header across all pages with Home/About/Blog links (desktop + mobile on homepage)
- **Assets**: `@assets` alias → `attached_assets/` directory. Team photos: `1_*.png` (Chris), `2_*.png` (Jason), `3_*.png` (Sarah), `4_*.png` (Amir)
- **About page sections**: Hero, Mission, Why Us (4-value grid), Team (4 members, grayscale hover), Testimonials carousel (auto-rotate), Stats bar, CTA, Footer
- **Blog**: 3 articles with rich content blocks (paragraph, heading, quote, stats, list, callout)

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
