/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/sileborgfitness",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Deaktiver billedoptimering
  },
};

export default nextConfig;
