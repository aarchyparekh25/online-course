import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React strict mode
  images: {
    domains: ["drive.google.com"], // Allow images from Google Drive
  },
};

export default nextConfig;
