import { NextResponse } from "next/server"
import { fetchAllJobs } from "@/lib/jobs"

export const revalidate = 1800

export async function GET() {
  try {
    const jobs = await fetchAllJobs()
    return NextResponse.json({ jobs, count: jobs.length })
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}
