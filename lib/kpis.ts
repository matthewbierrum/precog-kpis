export interface Kpi {
  id: string
  label: string
  value: string
  unit?: string
  /** Seven most-recent data points used for the sparkline trend. */
  trend: number[]
}

// TODO(neon): Replace this function with real SQL queries using lib/db.ts.
//
// Example swap-in:
//   import { sql } from "@/lib/db"
//
//   const [customers] = await sql`SELECT count(*)::int FROM customers WHERE active`
//   const [mrr]       = await sql`SELECT sum(mrr_cents) / 100.0 FROM subscriptions WHERE active`
//
// Return the same Kpi[] shape so callers need no changes.
export async function getKpis(): Promise<Kpi[]> {
  return [
    {
      id: "active-customers",
      label: "Active Customers",
      value: "142",
      trend: [120, 125, 130, 128, 135, 138, 142],
    },
    {
      id: "mrr",
      label: "MRR",
      value: "$47,800",
      unit: "USD",
      trend: [41000, 42500, 43800, 44200, 45500, 46800, 47800],
    },
    {
      id: "sync-success-rate",
      label: "Pipeline Sync Success Rate",
      value: "98.4%",
      trend: [97.1, 98.0, 97.8, 98.2, 97.9, 98.5, 98.4],
    },
    {
      id: "avg-sync-latency",
      label: "Avg Sync Latency",
      value: "2.3s",
      unit: "seconds",
      trend: [3.1, 2.9, 2.7, 2.8, 2.5, 2.4, 2.3],
    },
    {
      id: "active-connectors",
      label: "Active Connectors",
      value: "318",
      trend: [290, 295, 302, 308, 311, 315, 318],
    },
    {
      id: "data-volume",
      label: "Data Volume Synced",
      value: "1.24 TB",
      unit: "TB",
      trend: [0.89, 0.95, 1.02, 1.08, 1.13, 1.19, 1.24],
    },
  ]
}
