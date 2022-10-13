/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/notfound',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
