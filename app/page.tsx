import { getKpis } from "@/lib/kpis"
import { KpiCard } from "@/components/KpiCard"

// Always server-render so KPIs reflect the latest data on each request.
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const kpis = await getKpis()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Key metrics — refreshed on each page load
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </div>
  )
}
