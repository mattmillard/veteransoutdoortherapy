"use client";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "./cart-provider";
export function AddToCart({ product }: { product: Product }) { const [size, setSize] = useState(product.sizes?.[0]); const [added, setAdded] = useState(false); const { add } = useCart(); return <div className="buy-box">{product.sizes && <label>Size<select className="field" value={size} onChange={(event) => setSize(event.target.value)}>{product.sizes.map((option) => <option key={option}>{option}</option>)}</select></label>}<button className="button orange" onClick={() => { add({ slug: product.slug, name: product.shortName, price: product.price, image: product.image, size }); setAdded(true); }}><ShoppingBag size={18} />{added ? "Added to cart" : "Add to cart"}</button></div>; }