export interface Job {
  id: string
  title: string
  company: string
  company_logo?: string
  location: string
  type: string
  tags: string[]
  url: string
  posted_at: string
  salary?: string
  description?: string
  featured: boolean
  source: string
}
