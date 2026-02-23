"use client"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState } from "react"

const PLANS = [
  { id: "basic",    label: "Basic",    price: "$99",  desc: "Standard listing · 30 days · Searchable" },
  { id: "featured", label: "Featured", price: "$199", desc: "⭐ Top of page · Purple highlight · 30 days" },
  { id: "premium",  label: "Premium",  price: "$299", desc: "Featured + social post + 60 days" },
]

export default function PostJobPage() {
  const [plan, setPlan] = useState("featured")
  const [form, setForm] = useState({ company: "", title: "", email: "", url: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || "Something went wrong")
    } catch {
      setError("Network error — please try again")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-2">Post a Job</h1>
        <p className="text-gray-400 mb-8">Reach thousands of active AI/ML job seekers. Updated every 30 minutes across search and social.</p>

        {/* Plan selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {PLANS.map(p => (
            <button
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                plan === p.id
                  ? "border-purple-600 bg-purple-950/40"
                  : "border-[#222] bg-[#111] hover:border-[#333]"
              }`}
            >
              <div className="font-bold text-white text-lg">{p.price}</div>
              <div className="text-sm font-medium text-purple-300 mt-0.5">{p.label}</div>
              <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "title",   label: "Job Title",       placeholder: "e.g. Senior ML Engineer" },
            { name: "company", label: "Company Name",    placeholder: "e.g. Acme AI" },
            { name: "email",   label: "Your Email",      placeholder: "billing@yourcompany.com" },
            { name: "url",     label: "Application URL", placeholder: "https://yourcompany.com/jobs/..." },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
              <input
                type={field.name === "email" ? "email" : field.name === "url" ? "url" : "text"}
                required
                placeholder={field.placeholder}
                value={(form as any)[field.name]}
                onChange={e => setForm(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>
          ))}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? "Redirecting to checkout..." : `Pay & Post Job →`}
          </button>
          <p className="text-xs text-gray-500 text-center">Secure checkout via Stripe · Live within 1 hour of payment</p>
        </form>
      </section>
      <Footer />
    </main>
  )
}
