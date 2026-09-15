import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { seedHacks } from "@/data/seed";
import type { Hack, NewHackInput } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_PATH = path.join(DATA_DIR, "life-hacks.db");

declare global {
  // eslint-disable-next-line no-var
  var __lifeHacksDb: Database.Database | undefined;
}

function initDb(): Database.Database {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS hacks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      category TEXT NOT NULL,
      purpose TEXT NOT NULL,
      context TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '',
      pickTags TEXT NOT NULL DEFAULT '',
      createdAt TEXT NOT NULL
    );
  `);

  const count = db.prepare("SELECT COUNT(*) as c FROM hacks").get() as { c: number };
  if (count.c === 0) {
    const insert = db.prepare(`
      INSERT INTO hacks (name, url, category, purpose, context, tags, pickTags, createdAt)
      VALUES (@name, @url, @category, @purpose, @context, @tags, @pickTags, @createdAt)
    `);
    const insertMany = db.transaction((rows: typeof seedHacks) => {
      for (const row of rows) {
        insert.run({
          name: row.name,
          url: row.url,
          category: row.category,
          purpose: row.purpose,
          context: row.context,
          tags: row.tags.join(","),
          pickTags: row.pickTags.join(","),
          createdAt: new Date().toISOString(),
        });
      }
    });
    insertMany(seedHacks);
  }

  return db;
}

export function getDb(): Database.Database {
  if (!global.__lifeHacksDb) {
    global.__lifeHacksDb = initDb();
  }
  return global.__lifeHacksDb;
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
    pickTags: row.pickTags ? row.pickTags.split(",").filter(Boolean) : [],
    createdAt: row.createdAt,
  };
}

export function listHacks(): Hack[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM hacks ORDER BY category ASC, name ASC").all();
  return rows.map(rowToHack);
}

export function addHack(input: NewHackInput): Hack {
  const db = getDb();
  const createdAt = new Date().toISOString();
  const info = db
    .prepare(
      `INSERT INTO hacks (name, url, category, purpose, context, tags, pickTags, createdAt)
       VALUES (@name, @url, @category, @purpose, @context, @tags, @pickTags, @createdAt)`
    )
    .run({
      name: input.name.trim(),
      url: input.url.trim(),
      category: input.category.trim(),
      purpose: input.purpose.trim(),
      context: (input.context ?? "").trim(),
      tags: (input.tags ?? []).map((t) => t.trim()).filter(Boolean).join(","),
      pickTags: "",
      createdAt,
    });

  const row = db.prepare("SELECT * FROM hacks WHERE id = ?").get(info.lastInsertRowid);
  return rowToHack(row);
}

export function deleteHack(id: number): boolean {
  const db = getDb();
  const info = db.prepare("DELETE FROM hacks WHERE id = ?").run(id);
  return info.changes > 0;
}

export function listCategories(): string[] {
  const db = getDb();
  const rows = db.prepare("SELECT DISTINCT category FROM hacks ORDER BY category ASC").all() as {
    category: string;
  }[];
  return rows.map((r) => r.category);
}
