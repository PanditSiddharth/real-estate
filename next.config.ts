import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "res.cloudinary.com",
          },
          {
              protocol: "https",
              hostname: "lh3.googleusercontent.com"
          },
          {
              protocol: "https",
              hostname: "avatars.githubusercontent.com"
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com"
          },
          {
            protocol: "https",
            hostname: "img.youtube.com"
          },
          {
            protocol: "https",
            hostname: "bayut-production.s3.eu-central-1.amazonaws.com"
          }
      ],
  }
};

export default nextConfig;

