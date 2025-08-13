import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com", // GitHub
      "lh3.googleusercontent.com", // Google
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
