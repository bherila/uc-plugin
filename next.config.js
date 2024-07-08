/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  modularizeImports: {},
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
