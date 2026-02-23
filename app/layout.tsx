import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Remote Jobs — Find Remote AI & ML Jobs in 2026',
  description: 'The #1 job board for remote AI, Machine Learning, LLM, and Data Science jobs. Updated daily from top companies worldwide.',
  keywords: 'AI jobs, remote AI jobs, machine learning jobs, LLM jobs, data science remote, MLOps remote',
  openGraph: {
    title: 'AI Remote Jobs',
    description: 'Remote AI & ML jobs updated daily',
    url: 'https://airemotejobs.io',
    siteName: 'AI Remote Jobs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Remote Jobs',
    description: 'Remote AI & ML jobs updated daily',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
