import Header from "@/components/Header"
import Footer from "@/components/Footer"
import JobCard from "@/components/JobCard"
import { fetchAllJobs } from "@/lib/jobs"
import { getFeaturedJobs } from "@/lib/featured"

export const revalidate = 300 // 5 min ISR

export default async function HomePage() {
  let jobs = []
  let paidFeatured = []

  try {
    [jobs, paidFeatured] = await Promise.all([
      fetchAllJobs(),
      getFeaturedJobs(),
    ])
  } catch (e) {
    console.error("Failed to fetch jobs", e)
    try { jobs = await fetchAllJobs() } catch {}
  }

  // Merge paid featured on top, then organic featured, then regular
  const organicFeatured = jobs.filter(j => j.featured)
  const regular = jobs.filter(j => !j.featured)
  const allFeatured = [...paidFeatured, ...organicFeatured]
  const totalCount = jobs.length + paidFeatured.length

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

        {/* Search/filter tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["All", "LLM", "Machine Learning", "MLOps", "Data Science", "AI Research", "Python", "PyTorch"].map(tag => (
            <span key={tag} className="text-xs bg-[#111] border border-[#222] text-gray-300 px-3 py-1.5 rounded-full cursor-pointer hover:border-purple-600 hover:text-purple-300 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        {allFeatured.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">⭐ Featured Jobs</h2>
            <div className="flex flex-col gap-3">
              {allFeatured.map(job => <JobCard key={job.id} job={job as any} />)}
            </div>
          </div>
        )}

        {regular.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">Latest Jobs</h2>
            <div className="flex flex-col gap-3">
              {regular.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </div>
        )}

        {jobs.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <p className="text-4xl mb-4">🤖</p>
            <p>Loading jobs... check back in a moment.</p>
          </div>
        )}
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
