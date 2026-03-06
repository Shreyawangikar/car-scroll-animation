import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/car-scroll-animation",
  assetPrefix: "/car-scroll-animation/",
};

export default nextConfig;
