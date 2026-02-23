import { Job } from "./types"

const CACHE_TTL = 1000 * 60 * 30 // 30 min cache
let cache: { data: Job[]; ts: number } | null = null

export async function fetchAllJobs(): Promise<Job[]> {
  if (cache && Date.now() - cache.ts < CACHE_TTL) return cache.data

  const [remoteok, remotive, jobicy] = await Promise.allSettled([
    fetchRemoteOK(),
    fetchRemotive(),
    fetchJobicy(),
  ])

  const jobs: Job[] = [
    ...(remoteok.status === "fulfilled" ? remoteok.value : []),
    ...(remotive.status === "fulfilled" ? remotive.value : []),
    ...(jobicy.status === "fulfilled" ? jobicy.value : []),
  ]

  // Deduplicate by title+company
  const seen = new Set<string>()
  const unique = jobs.filter(j => {
    const key = `${j.title.toLowerCase()}-${j.company.toLowerCase()}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  // Sort: featured first, then by date
  unique.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime()
  })

  cache = { data: unique, ts: Date.now() }
  return unique
}

async function fetchRemoteOK(): Promise<Job[]> {
  const tags = ["ai", "machine-learning", "llm"]
  const allJobs: Job[] = []
  for (const tag of tags) {
    const res = await fetch(`https://remoteok.com/api?tag=${tag}`, {
      headers: { "User-Agent": "AIRemoteJobs/1.0" },
      next: { revalidate: 1800 }
    })
    const data = await res.json()
    const jobs = data
      .filter((j: any) => j && j.position)
      .map((j: any): Job => ({
        id: `rok-${j.id}`,
        title: j.position,
        company: j.company || "Unknown",
        company_logo: j.company_logo,
        location: "Remote",
        type: "Full-time",
        tags: (j.tags || []).slice(0, 6),
        url: j.url,
        posted_at: j.date,
        salary: j.salary || undefined,
        description: j.description?.replace(/<[^>]*>/g, "").slice(0, 300),
        featured: false,
        source: "RemoteOK"
      }))
    allJobs.push(...jobs)
  }
  return allJobs
}

async function fetchRemotive(): Promise<Job[]> {
  const categories = ["ai-ml", "data"]
  const allJobs: Job[] = []
  for (const cat of categories) {
    try {
      const res = await fetch(`https://remotive.com/api/remote-jobs?category=${cat}&limit=50`, {
        headers: { "User-Agent": "AIRemoteJobs/1.0" },
        next: { revalidate: 1800 }
      })
      const data = await res.json()
      const jobs = (data.jobs || []).map((j: any): Job => ({
        id: `rem-${j.id}`,
        title: j.title,
        company: j.company_name,
        company_logo: j.company_logo,
        location: j.candidate_required_location || "Remote",
        type: j.job_type || "Full-time",
        tags: (j.tags || []).slice(0, 6),
        url: j.url,
        posted_at: j.publication_date,
        salary: j.salary || undefined,
        description: j.description?.replace(/<[^>]*>/g, "").slice(0, 300),
        featured: false,
        source: "Remotive"
      }))
      allJobs.push(...jobs)
    } catch {}
  }
  return allJobs
}

async function fetchJobicy(): Promise<Job[]> {
  const res = await fetch("https://jobicy.com/api/v2/remote-jobs?count=50&tag=ai", {
    headers: { "User-Agent": "AIRemoteJobs/1.0" },
    next: { revalidate: 1800 }
  })
  const data = await res.json()
  return (data.jobs || []).map((j: any): Job => ({
    id: `jcy-${j.id}`,
    title: j.jobTitle,
    company: j.companyName,
    company_logo: j.companyLogo,
    location: j.jobGeo || "Remote",
    type: j.jobType?.[0] || "Full-time",
    tags: (j.jobIndustry || []).concat(j.jobType || []).slice(0, 6),
    url: j.url,
    posted_at: j.pubDate,
    salary: j.annualSalaryMin ? `$${j.annualSalaryMin}–$${j.annualSalaryMax}` : undefined,
    description: j.jobExcerpt?.replace(/<[^>]*>/g, "").slice(0, 300),
    featured: false,
    source: "Jobicy"
  }))
}
