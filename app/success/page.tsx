import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <section className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-2">Your job listing has been received and is being processed.</p>
        <p className="text-gray-400 mb-8">It will appear on AI Remote Jobs within <strong className="text-white">5 minutes</strong>.</p>
        <a href="/" className="inline-block bg-purple-700 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
          View Job Board →
        </a>
      </section>
      <Footer />
    </main>
  )
}
