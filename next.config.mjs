/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/silkeborgfitness",
  reactStrictMode: true,
  trailingSlash: true,
  // Tilføj også assetPrefix for at sikre korrekt håndtering af statiske filer
  assetPrefix: "/silkeborgfitness/",
};

export default nextConfig;
