import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: { remotePatterns: [
    { protocol: "https", hostname: "veteransoutdoortherapy.org", pathname: "/wp-content/uploads/**" },
    { protocol: "https", hostname: "images.unsplash.com" },
  ] },
  async redirects() {
    return [
      { source: "/events-2", destination: "/adventures", permanent: true },
      { source: "/events-3", destination: "/adventures", permanent: true },
      { source: "/products", destination: "/shop", permanent: true },
      { source: "/product-category/merchandise", destination: "/shop", permanent: true },
      { source: "/product-category/sponsorships", destination: "/sponsor", permanent: true },
      { source: "/sponsorships-2", destination: "/sponsor", permanent: true },
      { source: "/contact-7", destination: "/contact", permanent: true },
      { source: "/application", destination: "/apply", permanent: true },
      { source: "/veteran-application", destination: "/apply?type=veteran", permanent: true },
      { source: "/gold-star-family-application", destination: "/apply?type=gold-star", permanent: true },
      { source: "/fundraising-application", destination: "/apply?type=volunteer", permanent: true },
      { source: "/contribute", destination: "/donate", permanent: true },
      { source: "/memberships", destination: "/apply", permanent: true },
      { source: "/services-2", destination: "/adventures", permanent: true },
      { source: "/banquet-2026", destination: "/wilderness-to-wellness", permanent: true },
    ];
  },
};

export default nextConfig;
