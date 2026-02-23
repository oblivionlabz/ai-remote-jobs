export default function Header() {
  return (
    <header className="border-b border-[#1f1f1f] bg-[#0a0a0a] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-white text-lg">AI Remote Jobs</span>
          <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800/50">2026</span>
        </a>
        <a
          href="/post-job"
          className="bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Post a Job →
        </a>
      </div>
    </header>
  )
}
