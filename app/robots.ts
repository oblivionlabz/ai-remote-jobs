export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://aijobsboard.oblivionlabz.net/sitemap.xml',
  }
}
