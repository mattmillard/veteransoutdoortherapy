import { ArrowLeft, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { products } from "@/lib/data";
import { getProducts } from "@/lib/db";
export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = (await getProducts()).find((item) => item.slug === slug); if (!product) notFound(); return <section className="section product-page"><div className="container"><Link className="back-link" href={product.category === "Merchandise" ? "/shop" : "/sponsor"}><ArrowLeft size={17} /> Back</Link><div className="product-detail"><div className="product-main-image"><Image src={product.image} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 55vw" /></div><div className="product-copy"><p className="eyebrow">{product.category}</p><h1 className="display">{product.name}</h1><p className="price">${product.price.toLocaleString()}</p><p>{product.description}</p>{product.stock && <p className="stock"><PackageCheck size={18} /> {product.stock} in stock</p>}<AddToCart product={product} /><div className="product-assurance"><span><ShieldCheck /> Secure PayPal checkout</span><span><Truck /> Purpose-driven purchase</span></div></div></div></div></section>; }