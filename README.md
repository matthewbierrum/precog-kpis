# Precog KPIs

Read-only internal KPI dashboard. No authentication — deploy behind Vercel's access controls or a VPN if needed.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Neon Postgres (`@neondatabase/serverless`) · Vercel

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Set DATABASE_URL if you want to test against real Neon data
cp .env.example .env.local
# Edit .env.local and paste your Neon connection string

# 3. Start the dev server
npm run dev
# → http://localhost:3000
```

> Without a `DATABASE_URL` the app runs fine — it shows mock data from `lib/kpis.ts`.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Only for real data | Neon Postgres connection string (`postgresql://...?sslmode=require`) |

`DATABASE_URL` is already set in Vercel (Production + Preview + Development).

---

## Swapping in real data

Edit **`lib/kpis.ts`** only — see the `TODO(neon)` comment for the query pattern. No other files need to change.

---

## Project structure

```
app/
  layout.tsx               # Root layout — sticky header
  page.tsx                 # Dashboard — 6 KPI cards in a responsive grid
  globals.css
  api/
    kpis/route.ts          # GET /api/kpis — delegates to lib/kpis.ts
components/
  KpiCard.tsx              # KPI card with value, trend badge, SVG sparkline
lib/
  db.ts                    # Neon SQL client (wired, unused until TODO(neon))
  kpis.ts                  # ← Data layer. Swap mock data for SQL here.
```
