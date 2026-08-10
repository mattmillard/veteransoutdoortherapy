import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		short_name: "VOT",
		description: SITE_DESCRIPTION,
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
