import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "rsmzlbrqqavungarggrm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
