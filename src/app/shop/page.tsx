import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/db";
export const metadata: Metadata = { title: "Shop Mission Gear" };
export default async function ShopPage() {
	const items = (await getProducts()).filter((item) => item.category === "Merchandise");
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Every order gives back</p>
				<h1 className="display section-title">
					Mission gear,
					<br />
					field tested.
				</h1>
				<p className="prose">
					Wear the mission outside. Proceeds help fund outdoor experiences for Veterans and Gold Star families.
				</p>
				<div className="product-grid shop-grid">
					{items.map((product) => (
						<ProductCard key={product.slug} product={product} />
					))}
				</div>
			</div>
		</section>
	);
}
