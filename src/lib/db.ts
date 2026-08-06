import { neon } from "@neondatabase/serverless";
import { products as seedProducts, type Product } from "./data";

function sql() { return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null; }
async function ensureProducts() { const db = sql(); if (!db) return null; await db`CREATE TABLE IF NOT EXISTS products (slug text PRIMARY KEY, name text NOT NULL, short_name text NOT NULL, price numeric NOT NULL, category text NOT NULL, description text NOT NULL, image text NOT NULL, gallery jsonb NOT NULL DEFAULT '[]', sizes jsonb, stock integer, featured boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now())`; return db; }

export async function getProducts(): Promise<Product[]> {
  const db = await ensureProducts(); if (!db) return seedProducts;
  const rows = await db`SELECT * FROM products ORDER BY category, name`;
  if (!rows.length) { for (const product of seedProducts) await saveProduct(product); return seedProducts; }
  return rows.map((row) => ({ slug: String(row.slug), name: String(row.name), shortName: String(row.short_name), price: Number(row.price), category: row.category as Product["category"], description: String(row.description), image: String(row.image), gallery: row.gallery as string[], sizes: row.sizes as string[] | undefined, stock: row.stock == null ? undefined : Number(row.stock), featured: Boolean(row.featured) }));
}

export async function saveProduct(product: Product) {
  const db = await ensureProducts(); if (!db) throw new Error("DATABASE_URL is required to save products.");
  await db`INSERT INTO products (slug, name, short_name, price, category, description, image, gallery, sizes, stock, featured) VALUES (${product.slug}, ${product.name}, ${product.shortName}, ${product.price}, ${product.category}, ${product.description}, ${product.image}, ${JSON.stringify(product.gallery)}, ${product.sizes ? JSON.stringify(product.sizes) : null}, ${product.stock ?? null}, ${product.featured ?? false}) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, short_name = EXCLUDED.short_name, price = EXCLUDED.price, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image, gallery = EXCLUDED.gallery, sizes = EXCLUDED.sizes, stock = EXCLUDED.stock, featured = EXCLUDED.featured, updated_at = now()`;
}

export async function deleteProduct(slug: string) { const db = await ensureProducts(); if (!db) throw new Error("DATABASE_URL is required to delete products."); await db`DELETE FROM products WHERE slug = ${slug}`; }

export async function saveSubmission(kind: string, data: Record<string, string>) { const db = sql(); if (!db) throw new Error("DATABASE_URL is required to accept submissions."); await db`CREATE TABLE IF NOT EXISTS submissions (id bigserial PRIMARY KEY, kind text NOT NULL, data jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now())`; await db`INSERT INTO submissions (kind, data) VALUES (${kind}, ${JSON.stringify(data)})`; }