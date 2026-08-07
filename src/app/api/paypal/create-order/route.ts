import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db";
type RequestedItem = { slug: string; quantity: number };
async function accessToken() {
	const credentials = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString(
		"base64",
	);
	const response = await fetch(`${process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com"}/v1/oauth2/token`, {
		method: "POST",
		headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
		body: "grant_type=client_credentials",
	});
	if (!response.ok) throw new Error("PayPal authentication failed");
	return ((await response.json()) as { access_token: string }).access_token;
}
export async function POST(request: Request) {
	try {
		const { items } = (await request.json()) as { items: RequestedItem[] };
		const products = await getProducts();
		const total = items.reduce((sum, item) => {
			const product = products.find((entry) => entry.slug === item.slug);
			return sum + (product?.price || 0) * Math.max(1, Math.min(20, item.quantity));
		}, 0);
		if (total <= 0) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
		const token = await accessToken();
		const response = await fetch(
			`${process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com"}/v2/checkout/orders`,
			{
				method: "POST",
				headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
				body: JSON.stringify({
					intent: "CAPTURE",
					purchase_units: [
						{
							amount: { currency_code: "USD", value: total.toFixed(2) },
							description: "Veterans Outdoor Therapy purchase",
						},
					],
				}),
			},
		);
		const order = await response.json();
		return NextResponse.json(order, { status: response.status });
	} catch {
		return NextResponse.json({ error: "Unable to create PayPal order" }, { status: 500 });
	}
}
