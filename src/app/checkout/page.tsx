import { Checkout } from "@/components/checkout";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata({ title: "Secure Checkout", description: "Complete your Veteran's Outdoor Therapy merchandise order securely.", path: "/checkout", noIndex: true });
export default function CheckoutPage() {
	return (
		<section className="section">
			<div className="container">
				<p className="eyebrow">Complete your order</p>
				<h1 className="display section-title">Secure checkout.</h1>
				<Checkout />
			</div>
		</section>
	);
}
