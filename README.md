# Life Hack Pull-Up

A searchable home for your life hacks, tools, and internet hidden gems — search by need, use, context, or keyword, browse everything by category, and add new finds as you discover them.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- SQLite (via `better-sqlite3`), seeded on first run from `data/seed.ts`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

- **Search** (`/`) — instant search across name, purpose, use-case context, category, and keywords, plus category filter chips.
- **All Tools** (`/tools`) — every entry grouped by category, with its purpose and link.
- **Add New** (`/add`) — add a new hack or tool; pick an existing category or create a new one.

The database file lives at `.data/life-hacks.db` and is created automatically on first run (it's git-ignored, so each environment gets a fresh copy seeded from `data/seed.ts`).

## Build

```bash
npm run build
npm start
```
