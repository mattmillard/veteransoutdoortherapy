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
			.sort((a, b) => a[1].label.localeCompare(b[1].label))
			.map(([key, value]) => ({ key, ...value }));
		return [{ key: "all", label: "All products", count: products.length }, ...dynamicTabs];
	}, [products]);

	const [activeTab, setActiveTab] = useState("all");

	const filtered = useMemo(() => {
		if (activeTab === "all") return products;
		return products.filter((product) => normalize(product.category) === activeTab);
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
