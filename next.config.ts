import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ustozlar muqova uchun istalgan https havolani berishi mumkin
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
