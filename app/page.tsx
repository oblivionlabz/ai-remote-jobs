import Header from "@/components/Header"
import Footer from "@/components/Footer"
import JobList from "@/components/JobList"
import { fetchAllJobs } from "@/lib/jobs"
import { getFeaturedJobs } from "@/lib/featured"

export const revalidate = 300

export default async function HomePage() {
  let jobs = []
  let paidFeatured = []

  try {
    ;[jobs, paidFeatured] = await Promise.all([fetchAllJobs(), getFeaturedJobs()])
  } catch {
    try { jobs = await fetchAllJobs() } catch {}
  }

  const organicFeatured = jobs.filter((j: any) => j.featured)
  const regular = jobs.filter((j: any) => !j.featured)
  const allFeatured = [...paidFeatured, ...organicFeatured]

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          Updated every 30 minutes · {jobs.length} jobs live
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Remote <span className="text-purple-400">AI & ML</span> Jobs
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          The fastest-updating job board for AI engineers, ML researchers, LLM developers, and data scientists. All remote.
        </p>
      </section>

      {/* Jobs with search + filter */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <JobList featured={allFeatured as any} regular={regular} />
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Hiring AI talent?</h2>
          <p className="text-gray-400 mb-6">Post your job to {jobs.length}+ active AI/ML job seekers. Featured listings get 10x more visibility.</p>
          <a href="/post-job" className="inline-block bg-purple-700 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Post a Featured Job — $99 →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
