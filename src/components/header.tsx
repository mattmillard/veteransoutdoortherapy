"use client";
import { Menu, Mountain, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
const links = [["Mission", "/about"], ["Adventures", "/adventures"], ["Get Support", "/apply"], ["Gallery", "/gallery"], ["Shop", "/shop"]];
export function Header() {
  const [open, setOpen] = useState(false); const { count } = useCart();
  return <><div className="notice">Fully funded adventures for Veterans and Gold Star families <Link href="/apply">Apply now</Link></div><header className="site-header"><Link className="brand" href="/" aria-label="Veterans Outdoor Therapy home"><span><Mountain size={27} /></span><strong>Veterans<br />Outdoor Therapy</strong></Link><nav className={open ? "nav open" : "nav"} aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="give" href="/donate" onClick={() => setOpen(false)}>Give</Link></nav><div className="header-tools"><Link className="cart-link" href="/cart" aria-label={`Cart with ${count} items`}><ShoppingBag size={21} /><span>{count}</span></Link><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button></div></header></>;
}