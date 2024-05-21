/** @type {import('next').NextConfig} */
const serverEnv = !!process.env.BUILD_ENV?process.env.BUILD_ENV:''
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/webapi/:path*',
          destination: `https://${serverEnv}www.cctalk.com/webapi/:path*`,
        },
      ],
    }
  },
  reactStrictMode: false,
};

export default nextConfig;


