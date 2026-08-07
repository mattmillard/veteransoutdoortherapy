import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product-catalog";
import { getProducts } from "@/lib/db";

export const metadata: Metadata = { title: "All Products" };

export default async function ProductsPage() {
	const items = await getProducts();
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Explore the full catalog</p>
				<h1 className="display section-title">All products, sorted your way.</h1>
				<p className="prose">
					Use category tabs to browse by product type. As you add new categories like mugs, hoodies, shirts, or
					packs in admin, they automatically appear here.
				</p>
				<ProductCatalog products={items} />
			</div>
		</section>
	);
}
