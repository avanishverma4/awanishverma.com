import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project images are hotlinked from Unsplash, as on the live site.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
