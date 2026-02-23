/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['remoteok.com', 'remotive.com', 'jobicy.com', 'logo.clearbit.com'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "s-maxage=1800, stale-while-revalidate" }]
      }
    ]
  }
}
module.exports = nextConfig
