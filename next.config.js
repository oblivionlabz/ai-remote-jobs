/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['remoteok.com', 'remotive.com', 'jobicy.com', 'logo.clearbit.com'],
    unoptimized: true,
  },
}
module.exports = nextConfig
