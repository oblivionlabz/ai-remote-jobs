import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { plan, company, title, email, url } = body

    const plans: Record<string, { price: number; label: string; days: number }> = {
      basic:    { price: 9900,  label: "Basic Listing (30 days)",    days: 30 },
      featured: { price: 19900, label: "Featured Listing (30 days)", days: 30 },
      premium:  { price: 29900, label: "Premium Bundle (60 days)",   days: 60 },
    }

    const selected = plans[plan] || plans.basic

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: selected.label,
            description: `Job listing for ${title} at ${company} — AI Remote Jobs`,
          },
          unit_amount: selected.price,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/post-job`,
      customer_email: email,
      metadata: { company, title, plan, days: String(selected.days), url: url || '' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
