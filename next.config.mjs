/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.sanity.io",
      "storage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },
  crossOrigin: false,
};

// images: {
//   remotePatterns: [
//     {
//       protocol: 'https',
//       hostname: 'example.com',
//       port: '',
//       pathname: '/account123/**',
//     },
//   ],
// },
export default nextConfig;
