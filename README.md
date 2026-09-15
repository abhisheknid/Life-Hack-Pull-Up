# Life Hack Pull-Up

A searchable home for your life hacks, tools, and internet hidden gems — search by need, use, context, or keyword, browse everything by category, and add new finds as you discover them.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Postgres (via `pg`), seeded on first run from `data/seed.ts`

## Getting started

1. Copy `.env.example` to `.env.local` and point `POSTGRES_URL` at a Postgres database (a free local one, Vercel Postgres, Neon, Supabase — anything works, since it's a plain connection string).
2. Install and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000. The `hacks` table and seed data are created automatically on first request.

- **Search** (`/`) — instant search across name, purpose, use-case context, category, and keywords, plus category filter chips.
- **All Tools** (`/tools`) — every entry grouped by category, with its purpose and link.
- **Add New** (`/add`) — add a new hack or tool; pick an existing category or create a new one.

## Build

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Go to [vercel.com](https://vercel.com), sign in, and click **Add New → Project**.
2. Import this GitHub repo (`abhisheknid/Life-Hack-Pull-Up`) and pick the `claude/life-hacks-search-site-pao3pj` branch (or merge it into whatever branch you want live). Framework preset is auto-detected as Next.js — no config needed.
3. Before or after the first deploy, add a database: in the project, go to **Storage → Create Database → Postgres**. Connect it to this project — Vercel automatically injects `POSTGRES_URL` (and friends) into your environment, which is exactly what `lib/db.ts` reads. No manual connection string copying required.
4. Redeploy (or deploy for the first time) once the database is connected. On the first request, the app creates the `hacks` table and seeds it from `data/seed.ts` automatically.

That's it — search, browsing, and adding new hacks will all persist against that Postgres database from then on.
