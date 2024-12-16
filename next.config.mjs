/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/silkeborgfitness",
  assetPrefix: "/silkeborgfitness/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
