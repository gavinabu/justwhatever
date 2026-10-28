import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin uploads go through server actions; Vercel caps request bodies at 4.5MB anyway.
    serverActions: { bodySizeLimit: "4mb" }
  }
};

export default nextConfig;
