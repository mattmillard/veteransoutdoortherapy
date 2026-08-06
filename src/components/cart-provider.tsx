"use client";
import { createContext, useContext, useSyncExternalStore } from "react";
export type CartItem = { slug: string; name: string; price: number; image: string; size?: string; quantity: number };
type CartContextValue = { items: CartItem[]; count: number; total: number; add: (item: Omit<CartItem, "quantity">) => void; remove: (slug: string, size?: string) => void; clear: () => void };
const CartContext = createContext<CartContextValue | null>(null);
const emptyCart: CartItem[] = [];
let cachedValue = "";
let cachedCart: CartItem[] = [];
function subscribe(callback: () => void) { window.addEventListener("vot-cart-change", callback); window.addEventListener("storage", callback); return () => { window.removeEventListener("vot-cart-change", callback); window.removeEventListener("storage", callback); }; }
function snapshot() { const value = localStorage.getItem("vot-cart") || "[]"; if (value !== cachedValue) { cachedValue = value; try { cachedCart = JSON.parse(value) as CartItem[]; } catch { cachedCart = []; } } return cachedCart; }
function writeCart(items: CartItem[]) { localStorage.setItem("vot-cart", JSON.stringify(items)); window.dispatchEvent(new Event("vot-cart-change")); }
export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, snapshot, () => emptyCart);
  function add(item: Omit<CartItem, "quantity">) { const index = items.findIndex((entry) => entry.slug === item.slug && entry.size === item.size); writeCart(index < 0 ? [...items, { ...item, quantity: 1 }] : items.map((entry, entryIndex) => entryIndex === index ? { ...entry, quantity: entry.quantity + 1 } : entry)); }
  return <CartContext.Provider value={{ items, count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.price * item.quantity, 0), add, remove: (slug, size) => writeCart(items.filter((item) => item.slug !== slug || item.size !== size)), clear: () => writeCart([]) }}>{children}</CartContext.Provider>;
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used inside CartProvider"); return context; }