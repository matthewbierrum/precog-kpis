# Precog KPIs

Read-only internal dashboard showing key Precog metrics, restricted to `@precog.com` Google accounts.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Auth.js v5 (Google OAuth) · Neon Postgres (`@neondatabase/serverless`) · Vercel

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in values (see sections below)
cp .env.example .env.local

# 3. Start the dev server
npm run dev
# → http://localhost:3000
```

> **Tip:** The dashboard is protected by middleware. Unauthenticated requests are redirected to the Google sign-in page, so you need real OAuth credentials even in dev.

---

## Google OAuth setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2. Create an **OAuth 2.0 Client ID** (Application type: **Web application**).
3. Under **Authorized redirect URIs** add **both**:
   - `http://localhost:3000/api/auth/callback/google` (local dev)
   - `https://<your-vercel-production-url>/api/auth/callback/google` (production)
4. Copy the **Client ID** and **Client Secret** into your env vars (see below).
5. On the **OAuth consent screen**, set the **User type** to **Internal** if your Google Workspace allows it — this limits sign-in to `@precog.com` accounts at the consent-screen level as a second layer of defence.

---

## Environment variables

### Local (`.env.local`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string (`postgresql://...?sslmode=require`) |
| `AUTH_SECRET` | Random secret — run `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `AUTH_URL` | `http://localhost:3000` for local dev |

### Vercel (Settings → Environment Variables)

Add all five variables above to **Production**, **Preview**, and **Development** environments. Set `AUTH_URL` to your Vercel production URL (e.g. `https://precog-kpis.vercel.app`).

> `DATABASE_URL` is already set in Vercel — verify it covers all three environments.

---

## Swapping in real data

All KPI data flows through one file: **`lib/kpis.ts`**.

Look for the `TODO(neon)` comment there. Replace `getKpis()` with SQL queries using the Neon client from `lib/db.ts` — no other files need to change. The `/api/kpis` route and the dashboard page both call `getKpis()` so they update automatically.

---

## Project structure

```
app/
  layout.tsx               # Root layout — header with user email + sign-out
  page.tsx                 # Dashboard (protected by middleware)
  globals.css
  api/
    kpis/route.ts          # GET /api/kpis — delegates to lib/kpis.ts
    auth/[...nextauth]/    # Auth.js handler
components/
  KpiCard.tsx              # KPI card with SVG sparkline
  sign-out.tsx             # Server Action sign-out form
lib/
  db.ts                    # Neon SQL client (wired, unused until TODO(neon))
  kpis.ts                  # ← Data layer. Swap mock data for SQL here.
auth.ts                    # Auth.js config — Google provider + hd: precog.com check
middleware.ts              # Protects all routes; redirects to sign-in if no session
```
