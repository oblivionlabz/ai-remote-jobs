import { fetchAllJobs } from "@/lib/jobs"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { notFound } from "next/navigation"

export const revalidate = 1800

export default async function JobPage({ params }: { params: { id: string } }) {
  const jobs = await fetchAllJobs()
  const job = jobs.find(j => j.id === params.id)

  if (!job) notFound()

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <a href="/" className="text-sm text-purple-400 hover:text-purple-300 mb-8 inline-block">← Back to jobs</a>
        <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
          <p className="text-lg text-gray-400 mb-6">{job.company}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 px-3 py-1.5 rounded-lg text-sm">🌍 {job.location}</span>
            <span className="bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 px-3 py-1.5 rounded-lg text-sm">⏱ {job.type}</span>
            {job.salary && <span className="bg-green-950/30 border border-green-900/30 text-green-400 px-3 py-1.5 rounded-lg text-sm">{job.salary}</span>}
          </div>
          {job.description && (
            <div className="text-gray-400 mb-8 leading-relaxed">{job.description}...</div>
          )}
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-700 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Apply Now →
          </a>
        </div>
      </section>
      <Footer />
    </main>
  )
}
