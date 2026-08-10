import { ProductCatalog } from "@/components/product-catalog";
import { getProducts } from "@/lib/db";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
	title: "Mission Gear and Sponsorship Options",
	description: "Browse Veteran's Outdoor Therapy merchandise first, followed by nonprofit sponsorship options that help fund outdoor programs.",
	path: "/products",
});

export default async function ProductsPage() {
	const items = await getProducts();
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Every purchase supports the mission</p>
				<h1 className="display section-title">Gear that gives back.</h1>
				<p className="prose">
					Shop our collection of Veteran&apos;s Outdoor Therapy apparel and gear. Every order helps fund outdoor experiences
					for Veterans and Gold Star families.
				</p>
				<ProductCatalog products={items} />
			</div>
		</section>
	);
}
