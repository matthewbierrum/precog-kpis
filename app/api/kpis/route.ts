import { NextResponse } from "next/server"
import { getKpis } from "@/lib/kpis"

export async function GET() {
  const kpis = await getKpis()
  return NextResponse.json(kpis)
}
