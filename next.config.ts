import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    qualities: [70, 75, 80, 85, 90, 95, 100],
  },
  allowedDevOrigins: [
    "preview-chat-69cf1f47-e8d6-4d54-9a72-1c1ed6a1d2e7.space-z.ai",
  ],
};

export default nextConfig;
