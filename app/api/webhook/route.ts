import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { addFeaturedJob, FeaturedJobEntry } from "@/lib/featured"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const { company, title, plan, url } = session.metadata || {}

    console.log(`✅ Payment received: ${plan} — ${title} @ ${company} | $${(session.amount_total || 0) / 100}`)

    const job: FeaturedJobEntry = {
      id: `paid-${session.id}`,
      title: title || "Untitled",
      company: company || "Unknown",
      plan: plan || "basic",
      email: session.customer_email || "",
      url: url || "#",
      paid_at: new Date().toISOString(),
      featured: true,
      location: "Remote",
      type: "Full-time",
      tags: ["AI", "Remote", plan || "basic"],
      posted_at: new Date().toISOString(),
      source: "Paid",
    }

    const saved = await addFeaturedJob(job)
    console.log(`📝 Job saved to featured list: ${saved}`)
  }

  return NextResponse.json({ received: true })
}
