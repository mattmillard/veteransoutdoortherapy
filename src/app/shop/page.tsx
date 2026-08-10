import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/db";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata({
	title: "Veteran's Outdoor Therapy Apparel and Gear",
	description: "Shop Veteran's Outdoor Therapy shirts, hoodies, mugs, and field gear. Merchandise proceeds help support outdoor programs for Veterans and Gold Star families.",
	path: "/shop",
});
export default async function ShopPage() {
	const items = (await getProducts()).filter((item) => item.category === "Merchandise");
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Every order gives back</p>
				<h1 className="display section-title">Veteran&apos;s Outdoor Therapy apparel and mission gear.</h1>
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
