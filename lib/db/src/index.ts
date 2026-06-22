import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// Lazily create the connection pool + Drizzle client on first use, NOT at import
// time. This lets any process import `@workspace/db` (and use the exported schema
// objects) with DATABASE_URL unset without crashing — the pool is only created,
// and the connection string only required, when the database is actually used.
// This is what keeps the serverless API function booting (search, quotes, upload,
// health, image proxy) when no database is configured; only the newsletter route
// calls getDb().

function createDb(connectionString: string) {
  const pool = new Pool({ connectionString });
  return { pool, db: drizzle(pool, { schema }) };
}

let bundle: ReturnType<typeof createDb> | undefined;

export function getDb() {
  if (!bundle) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?",
      );
    }
    bundle = createDb(connectionString);
  }
  return bundle.db;
}

export function getPool() {
  if (!bundle) {
    getDb();
  }
  return bundle!.pool;
}

export * from "./schema";
