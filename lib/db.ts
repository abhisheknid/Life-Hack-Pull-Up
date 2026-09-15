import { Pool } from "pg";
import { seedHacks } from "@/data/seed";
import type { Hack, NewHackInput } from "@/lib/types";

declare global {
  // eslint-disable-next-line no-var
  var __lifeHacksPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __lifeHacksReady: Promise<void> | undefined;
}

function getConnectionString(): string {
  const url =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!url) {
    throw new Error(
      "No Postgres connection string found. Set POSTGRES_URL (or DATABASE_URL) in your environment. " +
        "In Vercel, add the Postgres storage integration to inject this automatically."
    );
  }
  return url;
}

function getPool(): Pool {
  if (!global.__lifeHacksPool) {
    global.__lifeHacksPool = new Pool({
      connectionString: getConnectionString(),
      ssl: /localhost|127\.0\.0\.1/.test(getConnectionString()) ? false : { rejectUnauthorized: false },
    });
  }
  return global.__lifeHacksPool;
}

async function ensureReady(): Promise<void> {
  if (!global.__lifeHacksReady) {
    global.__lifeHacksReady = (async () => {
      const pool = getPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS hacks (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          url TEXT NOT NULL,
          category TEXT NOT NULL,
          purpose TEXT NOT NULL,
          context TEXT NOT NULL DEFAULT '',
          tags TEXT NOT NULL DEFAULT '',
          pick_tags TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);

      const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM hacks");
      if (rows[0].count === 0) {
        for (const row of seedHacks) {
          await pool.query(
            `INSERT INTO hacks (name, url, category, purpose, context, tags, pick_tags)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              row.name,
              row.url,
              row.category,
              row.purpose,
              row.context,
              row.tags.join(","),
              row.pickTags.join(","),
            ]
          );
        }
      }
    })();
  }
  return global.__lifeHacksReady;
}

function rowToHack(row: any): Hack {
  return {
    id: row.id,
    name: row.name,
    url: row.url,
    category: row.category,
    purpose: row.purpose,
    context: row.context,
    tags: row.tags ? row.tags.split(",").filter(Boolean) : [],
    pickTags: row.pick_tags ? row.pick_tags.split(",").filter(Boolean) : [],
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  };
}

export async function listHacks(): Promise<Hack[]> {
  await ensureReady();
  const { rows } = await getPool().query("SELECT * FROM hacks ORDER BY category ASC, name ASC");
  return rows.map(rowToHack);
}

export async function addHack(input: NewHackInput): Promise<Hack> {
  await ensureReady();
  const { rows } = await getPool().query(
    `INSERT INTO hacks (name, url, category, purpose, context, tags, pick_tags)
     VALUES ($1, $2, $3, $4, $5, $6, '')
     RETURNING *`,
    [
      input.name.trim(),
      input.url.trim(),
      input.category.trim(),
      input.purpose.trim(),
      (input.context ?? "").trim(),
      (input.tags ?? []).map((t) => t.trim()).filter(Boolean).join(","),
    ]
  );
  return rowToHack(rows[0]);
}

export async function deleteHack(id: number): Promise<boolean> {
  await ensureReady();
  const result = await getPool().query("DELETE FROM hacks WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}

export async function listCategories(): Promise<string[]> {
  await ensureReady();
  const { rows } = await getPool().query(
    "SELECT DISTINCT category FROM hacks ORDER BY category ASC"
  );
  return rows.map((r) => r.category);
}
