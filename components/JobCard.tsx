import { Job } from "@/lib/types"

export default function JobCard({ job }: { job: Job }) {
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor(diff / 3600000)
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  return (
    <a
      href={job.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-[#111111] border rounded-xl p-5 hover:bg-[#161616] transition-all group ${
        job.featured ? "featured-glow border-purple-700" : "border-[#1f1f1f] hover:border-[#333]"
      }`}
    >
      {job.featured && (
        <div className="text-xs text-purple-400 font-semibold mb-2 flex items-center gap-1">
          <span>⭐</span> FEATURED
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={job.company}
              className="w-10 h-10 rounded-lg object-contain bg-white/5 flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 font-bold text-sm">{job.company[0]}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-white group-hover:text-purple-300 transition-colors truncate">{job.title}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{job.company}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          {job.salary && <p className="text-sm font-semibold text-green-400">{job.salary}</p>}
          <p className="text-xs text-gray-500 mt-0.5">{timeAgo(job.posted_at)}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 items-center">
        <span className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 px-2 py-1 rounded-md">🌍 {job.location}</span>
        <span className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 px-2 py-1 rounded-md">⏱ {job.type}</span>
        {job.tags.slice(0, 4).map(tag => (
          <span key={tag} className="text-xs bg-purple-950/40 border border-purple-900/30 text-purple-300 px-2 py-1 rounded-md">{tag}</span>
        ))}
      </div>
    </a>
  )
}
