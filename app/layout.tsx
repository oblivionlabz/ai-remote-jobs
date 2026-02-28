import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'AI Remote Jobs — Find Remote AI & ML Jobs in 2026',
  description: 'The #1 job board for remote AI, Machine Learning, LLM, and Data Science jobs. Updated every 30 minutes from top companies worldwide.',
  keywords: 'AI jobs, remote AI jobs, machine learning jobs, LLM jobs, data science remote, MLOps remote, AI engineer jobs 2026',
  metadataBase: new URL('https://aijobsboard.oblivionlabz.net'),
  openGraph: {
    title: 'AI Remote Jobs — Remote AI & ML Jobs Board',
    description: 'The fastest-updating job board for AI engineers, ML researchers, LLM developers, and data scientists. All remote.',
    url: 'https://aijobsboard.oblivionlabz.net',
    siteName: 'AI Remote Jobs',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI Remote Jobs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Remote Jobs',
    description: 'Remote AI & ML jobs updated every 30 minutes. LLM, MLOps, Data Science.',
  },
  alternates: {
    canonical: 'https://aijobsboard.oblivionlabz.net',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
