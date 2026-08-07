"use client";
import { ChevronDown, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";

const groups = [
  { label: "Events", links: [["All events", "/events-3"], ["Get involved", "/application"]] },
  { label: "About", links: [["Our mission", "/about"], ["Gallery", "/gallery"], ["Contact", "/contact-7"]] },
  { label: "Shop", links: [["Merchandise", "/product-category/merchandise"], ["All products", "/products"]] },
];

export function Header() {
  const [open, setOpen] = useState(false); const { count } = useCart();
  return <><div className="notice">Fully funded adventures for Veterans and Gold Star families <Link href="/application">Apply now</Link></div><header className="site-header"><Link className="brand" href="/" aria-label="Veterans Outdoor Therapy home"><Image className="brand-mark" src="/vot-mark.png" alt="" width={72} height={34} priority /><strong>Veterans<br />Outdoor Therapy</strong></Link><nav className={open ? "nav open" : "nav"} aria-label="Main navigation">{groups.map((group) => <details className="nav-group" key={group.label}><summary>{group.label}<ChevronDown size={15} /></summary><div className="nav-dropdown">{group.links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</div></details>)}<Link href="/sponsorships-2" onClick={() => setOpen(false)}>Sponsorships</Link><Link className="give" href="/donate" onClick={() => setOpen(false)}>Donate</Link></nav><div className="header-tools"><Link className="account-link" href="/my-account" aria-label="My account" title="My account"><UserRound size={20} /></Link><Link className="cart-link" href="/cart" aria-label={`Cart with ${count} items`} title="Cart"><ShoppingBag size={21} /><span>{count}</span></Link><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button></div></header></>;
}