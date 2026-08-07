"use client";
import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "./cart-provider";
export function AddToCart({ product }: { product: Product }) {
	const [size, setSize] = useState(product.sizes?.[0]);
	const [added, setAdded] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const { add } = useCart();

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	function handleAdd() {
		add({ slug: product.slug, name: product.shortName, price: product.price, image: product.image, size });
		setAdded(true);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => setAdded(false), 1800);
	}

	return (
		<div className="buy-box">
			{product.sizes && (
				<label>
					Size
					<select className="field" value={size} onChange={(event) => setSize(event.target.value)}>
						{product.sizes.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</label>
			)}
			<div className="add-to-cart-actions">
				<button className={added ? "button orange add-button added" : "button orange add-button"} onClick={handleAdd}>
					{added ? <Check size={18} /> : <ShoppingBag size={18} />}
					{added ? "Added to cart" : "Add to cart"}
				</button>
				<p className="cart-feedback" role="status" aria-live="polite">
					{added ? `${product.shortName} added to your cart.` : " "}
				</p>
				{added && (
					<Link className="text-link cart-link-inline" href="/cart">
						View cart
					</Link>
				)}
			</div>
		</div>
	);
}
