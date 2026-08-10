import { neon } from "@neondatabase/serverless";
import { events as seedEvents, products as seedProducts, type Event, type EventTemplate, type Product } from "./data";
import { SITE_NAME } from "./site";

function sql() {
	return process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
}
async function ensureProducts() {
	const db = sql();
	if (!db) return null;
	await db`CREATE TABLE IF NOT EXISTS products (slug text PRIMARY KEY, name text NOT NULL, short_name text NOT NULL, price numeric NOT NULL, category text NOT NULL, description text NOT NULL, image text NOT NULL, gallery jsonb NOT NULL DEFAULT '[]', sizes jsonb, stock integer, featured boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now())`;
	await db`CREATE TABLE IF NOT EXISTS migrations (id text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`;
	const migration =
		await db`INSERT INTO migrations (id) VALUES ('bronze-price-1000') ON CONFLICT (id) DO NOTHING RETURNING id`;
	if (migration.length)
		await db`UPDATE products SET price = 1000, updated_at = now() WHERE slug = 'bronze-sponsor' AND price = 2000`;
	const officialNameMigration =
		await db`INSERT INTO migrations (id) VALUES ('official-name-veterans-to-veteran') ON CONFLICT (id) DO NOTHING RETURNING id`;
	if (officialNameMigration.length)
		await db`UPDATE products SET name = replace(name, 'Veterans Outdoor Therapy', ${SITE_NAME}), short_name = replace(short_name, 'Veterans Outdoor Therapy', ${SITE_NAME}), description = replace(description, 'Veterans Outdoor Therapy', ${SITE_NAME}), updated_at = now()`;
	return db;
}

async function ensureEvents() {
	const db = sql();
	if (!db) return null;
	await db`CREATE TABLE IF NOT EXISTS events (slug text PRIMARY KEY, title text NOT NULL, date_label text NOT NULL, start_date date NOT NULL, end_date date NOT NULL, image text NOT NULL, event_type text NOT NULL, location text NOT NULL, summary text NOT NULL, hero_title text NOT NULL, overview_title text NOT NULL, overview text NOT NULL, details_title text NOT NULL, details text NOT NULL, cta_label text NOT NULL, cta_href text NOT NULL, template text NOT NULL DEFAULT 'adventure', published boolean NOT NULL DEFAULT true, featured boolean NOT NULL DEFAULT false, sort_order integer NOT NULL DEFAULT 0, updated_at timestamptz NOT NULL DEFAULT now())`;
	await db`CREATE TABLE IF NOT EXISTS migrations (id text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`;
	const officialNameMigration =
		await db`INSERT INTO migrations (id) VALUES ('event-official-name-veterans-to-veteran') ON CONFLICT (id) DO NOTHING RETURNING id`;
	if (officialNameMigration.length)
		await db`UPDATE events SET title = replace(title, 'Veterans Outdoor Therapy', ${SITE_NAME}), summary = replace(summary, 'Veterans Outdoor Therapy', ${SITE_NAME}), hero_title = replace(hero_title, 'Veterans Outdoor Therapy', ${SITE_NAME}), overview = replace(overview, 'Veterans Outdoor Therapy', ${SITE_NAME}), details = replace(details, 'Veterans Outdoor Therapy', ${SITE_NAME}), updated_at = now()`;
	return db;
}

export async function getProducts(): Promise<Product[]> {
	const db = await ensureProducts();
	if (!db) return seedProducts;
	const rows = await db`SELECT * FROM products ORDER BY category, name`;
	if (!rows.length) {
		for (const product of seedProducts) await saveProduct(product);
		return seedProducts;
	}
	return rows.map((row) => ({
		slug: String(row.slug),
		name: String(row.name),
		shortName: String(row.short_name),
		price: Number(row.price),
		category: String(row.category),
		description: String(row.description),
		image: String(row.image),
		gallery: row.gallery as string[],
		sizes: row.sizes as string[] | undefined,
		stock: row.stock == null ? undefined : Number(row.stock),
		featured: Boolean(row.featured),
	}));
}

export async function saveProduct(product: Product) {
	const db = await ensureProducts();
	if (!db) throw new Error("DATABASE_URL is required to save products.");
	await db`INSERT INTO products (slug, name, short_name, price, category, description, image, gallery, sizes, stock, featured) VALUES (${product.slug}, ${product.name}, ${product.shortName}, ${product.price}, ${product.category}, ${product.description}, ${product.image}, ${JSON.stringify(product.gallery)}, ${product.sizes ? JSON.stringify(product.sizes) : null}, ${product.stock ?? null}, ${product.featured ?? false}) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, short_name = EXCLUDED.short_name, price = EXCLUDED.price, category = EXCLUDED.category, description = EXCLUDED.description, image = EXCLUDED.image, gallery = EXCLUDED.gallery, sizes = EXCLUDED.sizes, stock = EXCLUDED.stock, featured = EXCLUDED.featured, updated_at = now()`;
}

export async function deleteProduct(slug: string) {
	const db = await ensureProducts();
	if (!db) throw new Error("DATABASE_URL is required to delete products.");
	await db`DELETE FROM products WHERE slug = ${slug}`;
}

function rowToEvent(row: Record<string, unknown>): Event {
	return {
		slug: String(row.slug),
		title: String(row.title),
		date: String(row.date_label),
		startDate: String(row.start_date).slice(0, 10),
		endDate: String(row.end_date).slice(0, 10),
		image: String(row.image),
		type: String(row.event_type),
		location: String(row.location),
		summary: String(row.summary),
		heroTitle: String(row.hero_title),
		overviewTitle: String(row.overview_title),
		overview: String(row.overview),
		detailsTitle: String(row.details_title),
		details: String(row.details),
		ctaLabel: String(row.cta_label),
		ctaHref: String(row.cta_href),
		template: String(row.template) as EventTemplate,
		published: Boolean(row.published),
		featured: Boolean(row.featured),
		sortOrder: Number(row.sort_order),
	};
}

export async function getEvents(): Promise<Event[]> {
	const db = await ensureEvents();
	if (!db) return seedEvents;
	const rows = await db`SELECT * FROM events ORDER BY sort_order, start_date, title`;
	if (!rows.length) {
		for (const event of seedEvents) await saveEvent(event);
		return seedEvents;
	}
	return rows.map(rowToEvent);
}

export async function getEvent(slug: string): Promise<Event | undefined> {
	return (await getEvents()).find((event) => event.slug === slug);
}

export async function saveEvent(event: Event, previousSlug = event.slug) {
	const db = await ensureEvents();
	if (!db) throw new Error("DATABASE_URL is required to save events.");
	if (previousSlug && previousSlug !== event.slug) await db`DELETE FROM events WHERE slug = ${previousSlug}`;
	await db`INSERT INTO events (slug, title, date_label, start_date, end_date, image, event_type, location, summary, hero_title, overview_title, overview, details_title, details, cta_label, cta_href, template, published, featured, sort_order) VALUES (${event.slug}, ${event.title}, ${event.date}, ${event.startDate}, ${event.endDate}, ${event.image}, ${event.type}, ${event.location}, ${event.summary}, ${event.heroTitle}, ${event.overviewTitle}, ${event.overview}, ${event.detailsTitle}, ${event.details}, ${event.ctaLabel}, ${event.ctaHref}, ${event.template}, ${event.published}, ${event.featured}, ${event.sortOrder}) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, date_label = EXCLUDED.date_label, start_date = EXCLUDED.start_date, end_date = EXCLUDED.end_date, image = EXCLUDED.image, event_type = EXCLUDED.event_type, location = EXCLUDED.location, summary = EXCLUDED.summary, hero_title = EXCLUDED.hero_title, overview_title = EXCLUDED.overview_title, overview = EXCLUDED.overview, details_title = EXCLUDED.details_title, details = EXCLUDED.details, cta_label = EXCLUDED.cta_label, cta_href = EXCLUDED.cta_href, template = EXCLUDED.template, published = EXCLUDED.published, featured = EXCLUDED.featured, sort_order = EXCLUDED.sort_order, updated_at = now()`;
}

export async function deleteEvent(slug: string) {
	const db = await ensureEvents();
	if (!db) throw new Error("DATABASE_URL is required to delete events.");
	await db`DELETE FROM events WHERE slug = ${slug}`;
}

export async function saveSubmission(kind: string, data: Record<string, string>) {
	const db = sql();
	if (!db) throw new Error("DATABASE_URL is required to accept submissions.");
	await db`CREATE TABLE IF NOT EXISTS submissions (id bigserial PRIMARY KEY, kind text NOT NULL, data jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now())`;
	await db`INSERT INTO submissions (kind, data) VALUES (${kind}, ${JSON.stringify(data)})`;
}
