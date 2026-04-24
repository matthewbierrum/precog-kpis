import { sql } from "@/lib/db"

export interface Kpi {
  id: string
  label: string
  value: string
  unit?: string
  /** Recent data points for the sparkline. Empty until kpi_measurements is populated. */
  trend: number[]
  /** Optional sub-label shown beneath the value. */
  meta?: string
}

export async function getKpis(): Promise<Kpi[]> {
  // Each query runs against the Neon database defined by DATABASE_URL.
  //
  // To add a new card: add a query to the Promise.all and a corresponding
  // entry in the returned array below.
  //
  // To show trend sparklines: replace the empty `trend: []` arrays with
  // the last 7 measurements from kpi_measurements, e.g.:
  //   const rows = await sql`
  //     SELECT value_numeric::float
  //     FROM kpi_measurements
  //     WHERE kpi_id = 'cops_first_response_time_hours'
  //     ORDER BY measured_at DESC LIMIT 7
  //   `
  //   trend: rows.map(r => r.value_numeric).reverse()

  const [
    totalAccounts,
    atRisk,
    prospects,
    activeKpis,
    upcomingMilestones,
    overdueMilestones,
  ] = await Promise.all([
    sql`SELECT count(*)::int AS n FROM accounts`,
    sql`SELECT count(*)::int AS n FROM accounts WHERE status = 'at-risk'`,
    sql`SELECT count(*)::int AS n FROM accounts WHERE segment = 'prospect'`,
    sql`SELECT count(*)::int AS n FROM kpi_definitions WHERE is_active`,
    sql`
      SELECT count(*)::int AS n
      FROM milestones
      WHERE target_date BETWEEN now() AND now() + interval '30 days'
        AND status NOT IN ('completed', 'cancelled')
    `,
    sql`
      SELECT count(*)::int AS n
      FROM milestones
      WHERE target_date < now()
        AND status NOT IN ('completed', 'cancelled')
    `,
  ])

  return [
    {
      id: "total-accounts",
      label: "Customer Accounts",
      value: String(totalAccounts[0].n),
      trend: [],
    },
    {
      id: "at-risk-accounts",
      label: "At-Risk Accounts",
      value: String(atRisk[0].n),
      meta: `of ${totalAccounts[0].n} total`,
      trend: [],
    },
    {
      id: "design-partner-targets",
      label: "Design-Partner Targets",
      value: String(prospects[0].n),
      meta: "prospects in pipeline",
      trend: [],
    },
    {
      id: "active-kpis",
      label: "Active KPIs Tracked",
      value: String(activeKpis[0].n),
      meta: "across 4 departments",
      trend: [],
    },
    {
      id: "milestones-upcoming",
      label: "Milestones Due (30 days)",
      value: String(upcomingMilestones[0].n),
      trend: [],
    },
    {
      id: "milestones-overdue",
      label: "Overdue Milestones",
      value: String(overdueMilestones[0].n),
      trend: [],
    },
  ]
}
