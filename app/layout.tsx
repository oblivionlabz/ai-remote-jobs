import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'AI Remote Jobs — Remote AI, ML & LLM Jobs | Updated Every 30 Min',
  description: 'The #1 job board for remote AI, Machine Learning, LLM, and Data Science jobs. Updated every 30 minutes from top companies worldwide. Find AI engineer, MLOps, and researcher roles.',
  keywords: [
    'AI jobs remote',
    'remote AI jobs',
    'machine learning jobs remote',
    'LLM jobs',
    'data science remote jobs',
    'MLOps remote',
    'AI engineer jobs 2026',
    'AI researcher jobs',
    'ChatGPT jobs',
    'AI jobs board',
    'remote ML engineer',
    'LLM developer jobs',
    'AI jobs worldwide',
    'AI jobs hiring now'
  ],
  metadataBase: new URL('https://aijobsboard.oblivionlabz.net'),
  openGraph: {
    title: 'AI Remote Jobs — Find Remote AI & ML Jobs in 2026',
    description: 'The fastest-updating job board for AI engineers, ML researchers, LLM developers, and data scientists. All remote. Updated every 30 minutes.',
    url: 'https://aijobsboard.oblivionlabz.net',
    siteName: 'AI Remote Jobs',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'AI Remote Jobs — Remote AI & ML Job Board'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Remote Jobs — Find Your Next AI Role',
    description: 'Remote AI & ML jobs updated every 30 minutes. LLM, MLOps, Data Science. All remote.',
    images: ['/og-image.png'],
    creator: '@oblivionlabz',
  },
  alternates: {
    canonical: 'https://aijobsboard.oblivionlabz.net',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Daniel Vermillion', url: 'https://oblivionlabz.net' }],
  creator: 'Oblivion Labz',
  publisher: 'Oblivion Labz',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
