"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

type CatalogTab = {
	label: string;
	count: number;
};

function normalize(value: string) {
	return value.trim().toLowerCase();
}

function isSponsorship(product: Product) {
	return normalize(product.category) === "sponsorships";
}

function sortProducts(products: Product[]) {
	return [...products].sort((first, second) => {
		const categoryOrder = Number(isSponsorship(first)) - Number(isSponsorship(second));
		if (categoryOrder !== 0) return categoryOrder;
		if (isSponsorship(first)) return second.price - first.price;
		return 0;
	});
}

export function ProductCatalog({ products }: { products: Product[] }) {
	const tabs = useMemo(() => {
		const counts = new Map<string, CatalogTab>();
		for (const product of products) {
			const label = product.category.trim() || "Uncategorized";
			const key = normalize(label);
			const existing = counts.get(key);
			if (existing) {
				existing.count += 1;
				continue;
			}
			counts.set(key, { label, count: 1 });
		}
		const dynamicTabs = Array.from(counts.entries())
			.sort((a, b) => {
				if (a[0] === "sponsorships") return 1;
				if (b[0] === "sponsorships") return -1;
				return a[1].label.localeCompare(b[1].label);
			})
			.map(([key, value]) => ({ key, ...value }));
		return [{ key: "all", label: "All products", count: products.length }, ...dynamicTabs];
	}, [products]);

	const [activeTab, setActiveTab] = useState("all");

	const filtered = useMemo(() => {
		if (activeTab === "all") return sortProducts(products);
		const categoryProducts = products.filter((product) => normalize(product.category) === activeTab);
		if (activeTab === "sponsorships") return sortProducts(categoryProducts);
		return categoryProducts;
	}, [activeTab, products]);

	return (
		<>
			<div className="catalog-tabs" role="tablist" aria-label="Filter products by category">
				{tabs.map((tab) => (
					<button
						key={tab.key}
						type="button"
						role="tab"
						aria-selected={activeTab === tab.key}
						className={activeTab === tab.key ? "catalog-tab active" : "catalog-tab"}
						onClick={() => setActiveTab(tab.key)}
					>
						<span>{tab.label}</span>
						<b>{tab.count}</b>
					</button>
				))}
			</div>
			<div className="product-masonry" key={activeTab}>
				{filtered.map((product, index) => (
					<div className="masonry-item" key={product.slug} style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</>
	);
}
