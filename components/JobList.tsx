"use client"

import { useState, useMemo } from "react"
import JobCard from "@/components/JobCard"
import { Job } from "@/lib/types"
import { FeaturedJob } from "@/lib/featured"

const FILTER_TAGS = ["All", "LLM", "Machine Learning", "MLOps", "Data Science", "AI Research", "Python", "PyTorch"]

type AnyJob = Job | FeaturedJob

export default function JobList({ featured, regular }: { featured: AnyJob[]; regular: Job[] }) {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState("All")

  const filteredFeatured = useMemo(() => {
    return featured.filter(job => matchesFilters(job, search, activeTag))
  }, [featured, search, activeTag])

  const filteredRegular = useMemo(() => {
    return regular.filter(job => matchesFilters(job, search, activeTag))
  }, [regular, search, activeTag])

  const total = filteredFeatured.length + filteredRegular.length

  return (
    <>
      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors text-sm"
        />
      </div>

      {/* Filter tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeTag === tag
                ? "bg-purple-700 border-purple-600 text-white"
                : "bg-[#111] border-[#222] text-gray-300 hover:border-purple-600 hover:text-purple-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      {(search || activeTag !== "All") && (
        <p className="text-xs text-gray-500 mb-4">{total} job{total !== 1 ? "s" : ""} found</p>
      )}

      {/* Featured jobs */}
      {filteredFeatured.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">⭐ Featured Jobs</h2>
          <div className="flex flex-col gap-3">
            {filteredFeatured.map(job => <JobCard key={job.id} job={job as Job} />)}
          </div>
        </div>
      )}

      {/* Regular jobs */}
      {filteredRegular.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">Latest Jobs</h2>
          <div className="flex flex-col gap-3">
            {filteredRegular.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p>No jobs match your search. Try different keywords.</p>
          <button onClick={() => { setSearch(""); setActiveTag("All") }} className="mt-4 text-purple-400 hover:text-purple-300 text-sm underline">
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}

function matchesFilters(job: AnyJob, search: string, tag: string): boolean {
  const q = search.toLowerCase()
  const matchesSearch = !q || [
    job.title, job.company, job.location,
    ...(job.tags || []),
    (job as any).description || ""
  ].some(s => s?.toLowerCase().includes(q))

  const matchesTag = tag === "All" || (job.tags || []).some(
    t => t.toLowerCase().includes(tag.toLowerCase())
  ) || job.title.toLowerCase().includes(tag.toLowerCase())

  return matchesSearch && matchesTag
}
