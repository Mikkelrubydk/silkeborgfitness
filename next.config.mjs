/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/sileborgfitness",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Deaktiver billedoptimering
  },
};

export default nextConfig;
