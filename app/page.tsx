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

  // JSON-LD Schema for JobBoard + Organization
  const jobBoardSchema = {
    "@context": "https://schema.org",
    "@type": "JobBoard",
    "name": "AI Remote Jobs",
    "description": "The #1 job board for remote AI, Machine Learning, LLM, and Data Science jobs. Updated every 30 minutes.",
    "url": "https://aijobsboard.oblivionlabz.net",
    "logo": "https://aijobsboard.oblivionlabz.net/logo.png",
    "publisher": {
      "@type": "Organization",
      "name": "Oblivion Labz",
      "url": "https://oblivionlabz.net"
    },
    "numberOfJobs": jobs.length,
    "industry": ["AI", "Machine Learning", "Data Science", "MLOps", "LLM", "NLP"]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of AI jobs are posted on this board?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We post remote AI jobs including Machine Learning Engineer, AI Researcher, MLOps Engineer, LLM Developer, Data Scientist, NLP Engineer, Computer Vision Engineer, and Prompt Engineer roles. All positions are remote-friendly and updated every 30 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "How often are jobs updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jobs are updated every 30 minutes using automated aggregation from top companies, startups, and remote job platforms worldwide. This ensures you see the latest AI and ML openings as soon as they are posted."
        }
      },
      {
        "@type": "Question",
        "name": "Are all jobs on this board fully remote?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all jobs on AI Remote Jobs are remote-friendly. We filter for fully remote, distributed, and remote-first companies. Some roles may have optional timezone requirements but allow working from anywhere."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to post a job?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Job postings start at $99 for a 30-day listing. Featured listings get 10x more visibility and are displayed at the top of search results and category pages."
        }
      }
    ]
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* SEO: JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobBoardSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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

      {/* What Is This Section - HCU Compliance */}
      <section id="what-is-ai-jobs-board" className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">What Is AI Remote Jobs?</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            <strong className="text-gray-200">AI Remote Jobs</strong> is a specialized job board focused exclusively on remote opportunities in artificial intelligence, machine learning, data science, and LLM development. Unlike general job boards, we aggregate AI-specific roles from top tech companies, AI startups, and research institutions worldwide.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Our automated aggregation system scans dozens of sources every 30 minutes, ensuring you never miss a new opportunity. Whether you are a senior ML engineer seeking FAANG roles or a researcher looking for cutting-edge LLM positions, this board surfaces the roles that match your expertise.
          </p>
        </div>
      </section>

      {/* Who Is This For / Not For */}
      <section id="who-is-this-for" className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Who This Board Is For</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-950/20 border border-green-900/40 rounded-xl p-6">
            <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
              <span>✓</span> Perfect for you if...
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2"><span className="text-green-500">→</span> You have AI/ML experience and want remote work</li>
              <li className="flex items-start gap-2"><span className="text-green-500">→</span> You are an AI engineer, ML researcher, or data scientist</li>
              <li className="flex items-start gap-2"><span className="text-green-500">→</span> You want LLM, MLOps, NLP, or Computer Vision roles</li>
              <li className="flex items-start gap-2"><span className="text-green-500">→</span> You need curated, high-quality remote AI opportunities</li>
              <li className="flex items-start gap-2"><span className="text-green-500">→</span> You want jobs updated in real-time, not stale listings</li>
            </ul>
          </div>
          <div className="bg-red-950/20 border border-red-900/40 rounded-xl p-6">
            <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
              <span>✗</span> Not for you if...
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2"><span className="text-red-500">→</span> You are looking for non-technical roles</li>
              <li className="flex items-start gap-2"><span className="text-red-500">→</span> You require 100% on-site/hybrid positions only</li>
              <li className="flex items-start gap-2"><span className="text-red-500">→</span> You have zero AI/ML/data background</li>
              <li className="flex items-start gap-2"><span className="text-red-500">→</span> You want general tech roles (frontend, backend, etc)</li>
              <li className="flex items-start gap-2"><span className="text-red-500">→</span> You are looking for short-term gig/freelance work only</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section — Featured Snippet Target */}
      <section id="faq" className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What types of AI jobs are posted on this board?",
              a: "We post remote AI jobs including Machine Learning Engineer, AI Researcher, MLOps Engineer, LLM Developer, Data Scientist, NLP Engineer, Computer Vision Engineer, and Prompt Engineer roles. All positions are remote-friendly and updated every 30 minutes."
            },
            {
              q: "How often are jobs updated?",
              a: "Jobs are updated every 30 minutes using automated aggregation from top companies, startups, and remote job platforms worldwide. This ensures you see the latest AI and ML openings as soon as they are posted."
            },
            {
              q: "Are all jobs on this board fully remote?",
              a: "Yes, all jobs on AI Remote Jobs are remote-friendly. We filter for fully remote, distributed, and remote-first companies. Some roles may have optional timezone requirements but allow working from anywhere."
            },
            {
              q: "How much does it cost to post a job?",
              a: "Job postings start at $99 for a 30-day listing. Featured listings get 10x more visibility and are displayed at the top of search results and category pages."
            }
          ].map(({ q, a }) => (
            <div key={q} className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">{q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-purple-950/30 border border-purple-800/40 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Hiring AI talent?</h2>
          <p className="text-gray-400 mb-6">Post your job to {jobs.length}+ active AI/ML job seekers. Featured listings get 10x more visibility.</p>
          <a href="/post-job" className="inline-block bg-purple-700 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Post a Job — from $99 →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
