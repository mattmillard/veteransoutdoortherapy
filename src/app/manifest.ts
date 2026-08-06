import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veterans Outdoor Therapy",
    short_name: "VOT",
    description: "Fully funded outdoor adventures for Veterans, Gold Star families, and children.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2e8",
    theme_color: "#23432d",
    icons: [
      { src: "/vot-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/vot-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}