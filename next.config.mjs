/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.sanity.io",
      "storage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
