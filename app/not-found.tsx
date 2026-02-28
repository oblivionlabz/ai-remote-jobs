import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <section className="max-w-2xl mx-auto px-4 py-32 text-center">
        <p className="text-6xl mb-6">🤖</p>
        <h1 className="text-4xl font-bold text-white mb-4">404 — Not Found</h1>
        <p className="text-gray-400 mb-8">This job listing may have expired or the page doesn't exist.</p>
        <a href="/" className="inline-block bg-purple-700 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
          Back to Jobs →
        </a>
      </section>
      <Footer />
    </main>
  )
}
