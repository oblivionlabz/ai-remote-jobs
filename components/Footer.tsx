export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] mt-16 py-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>⚡</span>
          <span>AI Remote Jobs — Updated every 30 minutes</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="/post-job" className="hover:text-purple-400 transition-colors">Post a Job</a>
          <a href="mailto:jobs@airemotejobs.io" className="hover:text-purple-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}
