---
name: Supabase DDL access in this repl
description: How to run schema changes (CREATE TABLE etc.) against the Supabase project, and why the obvious paths fail
---

# Running DDL against the Supabase project

This repl's Supabase project uses the NEW key format: `SUPABASE_ANON_KEY` is `sb_publishable_…`, `SUPABASE_SERVICE_ROLE_KEY` is `sb_secret_…`.

**The `sb_secret_` service key is data-plane only.** It can read/write rows (PostgREST) and read/write Storage objects, but it **cannot run DDL** (`CREATE TABLE`, `ALTER`, etc.). There is no `.sql()` on supabase-js v2 and no exec RPC exists by default.

**`DATABASE_URL` / `PG*` env vars point to Replit's built-in Postgres (`helium`/`heliumdb`), NOT Supabase** (`*.supabase.co`). Do not run Supabase migrations against them.

**Why:** Supabase intentionally separates the data API key from database superuser access. DDL needs either the SQL Editor or the DB password.

**How to apply — to create/alter Supabase tables, pick one:**
1. Have the user paste SQL into the Supabase SQL Editor (deep link: `https://supabase.com/dashboard/project/<PROJECT_REF>/sql/new`; project ref is the subdomain of `SUPABASE_URL`). Lowest friction, foolproof.
2. Get the **pooler** connection string (Project Settings → Database → Connection string → Transaction/Session pooler, `aws-0-<region>.pooler.supabase.com`, IPv4) as a secret and run DDL via `pg`. The **direct** `db.<ref>.supabase.co` connection is IPv6-only and usually unreachable from Replit.

Everything else (inserts, selects, Storage upload/list/remove, signed URLs) works fine with the service key via `@supabase/supabase-js`.
