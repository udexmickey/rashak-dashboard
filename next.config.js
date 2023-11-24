/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
      images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'loremflickr.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }
  
  module.exports = nextConfig
  