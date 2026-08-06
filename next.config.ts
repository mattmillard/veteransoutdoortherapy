import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { remotePatterns: [
    { protocol: "https", hostname: "veteransoutdoortherapy.org", pathname: "/wp-content/uploads/**" },
    { protocol: "https", hostname: "images.unsplash.com" },
  ] },
  async redirects() {
    return [
      { source: "/author/mmillard", destination: "/about", permanent: true },
      { source: "/category/uncategorized", destination: "/adventures", permanent: true },
    ];
  },
};

export default nextConfig;
