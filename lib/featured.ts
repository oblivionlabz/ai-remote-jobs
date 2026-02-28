export interface FeaturedJob {
  id: string
  title: string
  company: string
  company_logo?: string
  location: string
  type: string
  tags: string[]
  url: string
  posted_at: string
  salary?: string
  description?: string
  featured: true
  source: string
  plan: string
  paid_at: string
}

const REPO = 'oblivionlabz/ai-remote-jobs'
const FILE_PATH = 'featured_jobs.json'
const GH_API = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`

export async function getFeaturedJobs(): Promise<FeaturedJob[]> {
  try {
    const res = await fetch(GH_API, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 300 } // 5 min cache
    })
    if (!res.ok) return []
    const data = await res.json()
    const content = Buffer.from(data.content, 'base64').toString('utf-8')
    const jobs: FeaturedJob[] = JSON.parse(content)
    // Only show jobs from last 60 days
    const cutoff = Date.now() - 60 * 24 * 60 * 60 * 1000
    return jobs.filter(j => new Date(j.paid_at).getTime() > cutoff)
  } catch {
    return []
  }
}

export async function addFeaturedJob(job: FeaturedJob): Promise<boolean> {
  try {
    // Get current file + sha
    const res = await fetch(GH_API, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    })
    if (!res.ok) return false
    const data = await res.json()
    const sha = data.sha
    const current: FeaturedJob[] = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))

    // Append new job
    current.push(job)
    const newContent = Buffer.from(JSON.stringify(current, null, 2)).toString('base64')

    // Update file
    const updateRes = await fetch(GH_API, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: add featured job — ${job.title} @ ${job.company}`,
        content: newContent,
        sha,
      })
    })
    return updateRes.ok
  } catch {
    return false
  }
}
