import type { NextConfig } from "next";
import { OPTIMIZABLE_IMAGE_HOSTS } from "./lib/image-hosts";

const nextConfig: NextConfig = {
  images: {
    // Hosts the optimizer may fetch from. Anything not listed still renders —
    // <SmartImage> falls back to unoptimised — so this is a performance
    // allowlist, not a functional requirement.
    remotePatterns: OPTIMIZABLE_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
    })),
  },
};

export default nextConfig;
