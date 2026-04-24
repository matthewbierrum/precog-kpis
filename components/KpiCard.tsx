import type { Kpi } from "@/lib/kpis"

function Sparkline({ data }: { data: number[] }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const W = 100
  const H = 32

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W
      const y = H - ((v - min) / range) * (H - 4) - 2
      return `${x},${y}`
    })
    .join(" ")

  const isUp = data[data.length - 1] >= data[0]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-8"
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? "#10b981" : "#ef4444"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TrendBadge({ data }: { data: number[] }) {
  const first = data[0] || 1
  const last = data[data.length - 1]
  const isUp = last >= first
  const pct = Math.abs(((last - first) / first) * 100).toFixed(1)

  return (
    <span
      className={`text-xs font-medium tabular-nums ${
        isUp ? "text-emerald-600" : "text-red-500"
      }`}
    >
      {isUp ? "▲" : "▼"} {pct}%
    </span>
  )
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
      <p className="text-3xl font-bold text-gray-900 tabular-nums">
        {kpi.value}
      </p>
      <div className="flex items-center justify-between mt-1">
        <TrendBadge data={kpi.trend} />
        <span className="text-xs text-gray-400">7-day</span>
      </div>
      <div className="mt-1">
        <Sparkline data={kpi.trend} />
      </div>
    </div>
  )
}
