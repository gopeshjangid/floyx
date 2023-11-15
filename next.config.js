/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
      {
        protocol: 'https',
        hostname: 'beta.floyx.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'floyx.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
