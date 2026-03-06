import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/welcome-to-itzfizz",
  assetPrefix: "/welcome-to-itzfizz/",
};

export default nextConfig;
