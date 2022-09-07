/** @type {import('next').NextConfig} */

const isProd = (process.env.NODE_ENV || 'production') === 'production'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  basePath:  isProd ? "/gothic-space" : '',
  assetPrefix:  isProd ? "/gothic-space" : '',
  swcMinify: true,
};

module.exports = nextConfig;
