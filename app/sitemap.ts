import { fetchAllJobs } from '@/lib/jobs'

export default async function sitemap() {
  const base = 'https://aijobsboard.oblivionlabz.net'
  let jobs = []
  try { jobs = await fetchAllJobs() } catch {}

  const jobUrls = jobs.slice(0, 200).map(job => ({
    url: `${base}/jobs/${job.id}`,
    lastModified: new Date(job.posted_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 1 },
    { url: `${base}/post-job`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...jobUrls,
  ]
}
