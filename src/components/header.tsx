"use client";
import { ChevronDown, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-provider";

const groups = [
	{
		label: "Events",
		links: [
			["All events", "/events-3"],
			["Get involved", "/application"],
		],
	},
	{
		label: "About",
		links: [
			["Our mission", "/about"],
			["Gallery", "/gallery"],
			["Contact", "/contact-7"],
		],
	},
	{
		label: "Shop",
		links: [
			["Merchandise", "/product-category/merchandise"],
			["All products", "/products"],
		],
	},
];

export function Header() {
	const pathname = usePathname();
	const [openPath, setOpenPath] = useState<string | null>(null);
	const [openGroup, setOpenGroup] = useState<string | null>(null);
	const open = openPath === pathname;
	const closeNavigation = () => {
		setOpenPath(null);
		setOpenGroup(null);
	};
	const { count } = useCart();
	return (
		<>
			<div className="notice">
				Fully funded adventures for Veterans and Gold Star families <Link href="/application">Apply now</Link>
			</div>
			<header className="site-header">
				<Link className="brand" href="/" aria-label="Veterans Outdoor Therapy home" onClick={closeNavigation}>
					<Image
						className="brand-logo"
						src="/vot-logo-horizontal.png?v=6"
						alt="Veterans Outdoor Therapy"
						width={272}
						height={104}
						priority
						unoptimized
					/>
				</Link>
				<nav key={pathname} className={open ? "nav open" : "nav"} aria-label="Main navigation">
					{groups.map((group) => (
						<details className="nav-group" key={group.label} open={openGroup === group.label}>
							<summary
								onClick={(event) => {
									event.preventDefault();
									setOpenGroup((current) => (current === group.label ? null : group.label));
								}}
							>
								{group.label}
								<ChevronDown size={15} />
							</summary>
							<div className="nav-dropdown">
								{group.links.map(([label, href]) => (
									<Link key={href} href={href} onClick={closeNavigation}>
										{label}
									</Link>
								))}
							</div>
						</details>
					))}
					<Link href="/sponsorships-2" onClick={closeNavigation}>
						Sponsorships
					</Link>
					<Link className="give" href="/donate" onClick={closeNavigation}>
						Donate
					</Link>
				</nav>
				<div className="header-tools">
					<Link className="account-link" href="/my-account" aria-label="My account" title="My account" onClick={closeNavigation}>
						<UserRound size={20} />
					</Link>
					<Link className="cart-link" href="/cart" aria-label={`Cart with ${count} items`} title="Cart" onClick={closeNavigation}>
						<ShoppingBag size={21} />
						<span>{count}</span>
					</Link>
					<button
						className="menu"
						onClick={() => setOpenPath(open ? null : pathname)}
						aria-label="Toggle navigation"
						aria-expanded={open}
					>
						{open ? <X /> : <Menu />}
					</button>
				</div>
			</header>
		</>
	);
}
