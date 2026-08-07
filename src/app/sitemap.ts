import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
	const base = process.env.NEXT_PUBLIC_SITE_URL || "https://veteransoutdoortherapy.org";
	const routes = [
		"",
		"/about",
		"/adventures",
		"/events-3",
		"/application",
		"/veteran-application",
		"/gold-star-family-application",
		"/fundraising-application",
		"/contact",
		"/donate",
		"/gallery",
		"/services-2",
		"/shop",
		"/sponsorships-2",
		"/team",
		"/wilderness-to-wellness",
		"/poker-run-2026",
		"/2026-gun-raffle",
	];
	return [
		...routes.map((route) => ({
			url: `${base}${route}`,
			changeFrequency: route === "/shop" ? ("weekly" as const) : ("monthly" as const),
			priority: route === "" ? 1 : 0.7,
		})),
		...products.map((product) => ({
			url: `${base}/product/${product.slug}`,
			changeFrequency: "weekly" as const,
			priority: 0.6,
		})),
	];
}
