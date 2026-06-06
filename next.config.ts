import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Keep Unsplash as fallback (used in some pages)
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Local images in /public don't need remotePatterns
  },
};

export default nextConfig;
