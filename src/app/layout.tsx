import type { Metadata } from "next";
import { Archivo, Barlow_Condensed } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const archivo = Archivo({
	variable: "--font-body",
	subsets: ["latin"],
});

const barlow = Barlow_Condensed({
	variable: "--font-display",
	subsets: ["latin"],
	weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://veteransoutdoortherapy.org"),
	title: { default: "Veterans Outdoor Therapy", template: "%s | Veterans Outdoor Therapy" },
	description: "Fully funded outdoor adventures for Veterans, Gold Star families, and children.",
	icons: {
		icon: [
			{ url: "/vot-icon-192.png", sizes: "192x192", type: "image/png" },
			{ url: "/vot-icon-512.png", sizes: "512x512", type: "image/png" },
		],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
	},
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${archivo.variable} ${barlow.variable}`}>
			<body>
				<CartProvider>
					<Header />
					<main>{children}</main>
					<Footer />
				</CartProvider>
			</body>
		</html>
	);
}
