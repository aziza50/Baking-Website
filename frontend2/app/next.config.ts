import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "folioimagess.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;
