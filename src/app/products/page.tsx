import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product-catalog";
import { getProducts } from "@/lib/db";

export const metadata: Metadata = { title: "All Products" };

export default async function ProductsPage() {
	const items = await getProducts();
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Every purchase supports the mission</p>
				<h1 className="display section-title">Gear that gives back.</h1>
				<p className="prose">
					Shop our collection of Veterans Outdoor Therapy apparel and gear. Every order helps fund outdoor experiences
					for Veterans and Gold Star families.
				</p>
				<ProductCatalog products={items} />
			</div>
		</section>
	);
}
