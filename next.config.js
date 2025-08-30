/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets.coingecko.com', 'coinicons-api.vercel.app'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    COINBASE_API_KEY: process.env.COINBASE_API_KEY,
    COINBASE_WEBHOOK_SECRET: process.env.COINBASE_WEBHOOK_SECRET,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
}

module.exports = nextConfig
