import { Checkout } from "@/components/checkout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata({ title: "Your Cart", description: "Review merchandise in your cart before checkout.", path: "/cart", noIndex: true });
export default function CartPage() {
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Secure checkout</p>
				<h1 className="display section-title">Your cart.</h1>
				<Checkout />
			</div>
		</section>
	);
}
