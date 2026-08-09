import { Copy, LockKeyhole, LogOut, PackagePlus, Pencil } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { getEvents, getProducts } from "@/lib/db";
import { deleteProductAction, duplicateProductAction, loginAction, logoutAction, saveProductAction } from "./actions";
import { EventAdmin } from "./event-admin";

export default async function AdminPage({
	searchParams,
}: {
	searchParams: Promise<{ view?: string; edit?: string; error?: string; saved?: string; deleted?: string; saveError?: string }>;
}) {
	const query = await searchParams;
	const authenticated = await isAdmin();
	if (!authenticated)
		return (
			<section className="admin-login">
				<form action={loginAction}>
					<LockKeyhole size={30} />
					<p className="eyebrow">Authorized access</p>
					<h1 className="display">Admin login</h1>
					{query.error && <p className="form-error">That username or password is incorrect.</p>}
					<label>
						Username
						<input className="field" name="username" autoComplete="username" required />
					</label>
					<label>
						Password
						<input className="field" name="password" type="password" autoComplete="current-password" required />
					</label>
					<button className="button" type="submit">
						Sign in
					</button>
				</form>
			</section>
		);
	const view = query.view === "events" ? "events" : "products";
	const [products, events] = await Promise.all([getProducts(), getEvents()]);
	const categories = Array.from(
		new Set(products.map((product) => product.category.trim()).filter((category) => category.length > 0)),
	).sort((a, b) => a.localeCompare(b));
	const selectedProduct = products.find((product) => product.slug === query.edit);
	const selectedEvent = events.find((event) => event.slug === query.edit);
	return (
		<section className="admin-page">
			<div className="container">
				<header>
					<div>
						<p className="eyebrow">Site operations</p>
						<h1 className="display">Content admin</h1>
					</div>
					<form action={logoutAction}>
						<button className="button secondary">
							<LogOut size={17} /> Sign out
						</button>
					</form>
				</header>
				<nav className="admin-tabs" aria-label="Admin sections">
					<a className={view === "products" ? "active" : ""} href="/admin">
						Products
					</a>
					<a className={view === "events" ? "active" : ""} href="/admin?view=events">
						Events
					</a>
				</nav>
				{query.saved && <p className="success-note">{view === "events" ? "Event" : "Product"} saved.</p>}
				{query.deleted && <p className="success-note">Event deleted.</p>}
				{query.saveError === "upload-config" && (
					<p className="form-error">Image upload is not configured. Add BLOB_READ_WRITE_TOKEN to your environment.</p>
				)}
				{query.saveError === "upload-failed" && (
					<p className="form-error">Image upload failed. Please try again or use an existing image URL.</p>
				)}
				{query.saveError === "save-failed" && (
					<p className="form-error">Saving failed. Check required fields and make sure the slug is unique.</p>
				)}
				{view === "events" ? (
					<EventAdmin events={events} selected={selectedEvent} />
				) : (
				<div className="admin-grid">
					<form className="product-form" action={saveProductAction}>
						<h2>
							<PackagePlus size={20} /> {selectedProduct ? "Edit product" : "Add product"}
						</h2>
						<label>
							Product name
							<input className="field" name="name" defaultValue={selectedProduct?.name} required />
						</label>
						<div className="form-row">
							<label>
								Short display name
								<input className="field" name="shortName" defaultValue={selectedProduct?.shortName} required />
							</label>
							<label>
								Slug
								<input className="field" name="slug" defaultValue={selectedProduct?.slug} />
							</label>
						</div>
						<div className="form-row">
							<label>
								Price
								<input
									className="field"
									name="price"
									type="number"
									min="0"
									step="0.01"
									defaultValue={selectedProduct?.price}
									required
								/>
							</label>
							<label>
								Category
								<input
									className="field"
									name="category"
									list="product-categories"
									defaultValue={selectedProduct?.category || "Merchandise"}
									required
								/>
							</label>
						</div>
						<datalist id="product-categories">
							{categories.map((category) => (
								<option key={category} value={category} />
							))}
						</datalist>
						<label>
							Description
							<textarea className="field" name="description" rows={5} defaultValue={selectedProduct?.description} required />
						</label>
						<label>
							Existing image URL
							<input className="field" name="image" defaultValue={selectedProduct?.image} />
						</label>
						<input type="hidden" name="existingImage" value={selectedProduct?.image || ""} />
						<label>
							Or upload a new image
							<input className="field" name="imageFile" type="file" accept="image/png,image/jpeg,image/webp" />
						</label>
						<div className="form-row">
							<label>
								Sizes, comma separated
								<input className="field" name="sizes" defaultValue={selectedProduct?.sizes?.join(", ")} />
							</label>
							<label>
								Stock
								<input className="field" name="stock" type="number" min="0" defaultValue={selectedProduct?.stock} />
							</label>
						</div>
						<label className="consent">
							<input name="featured" type="checkbox" defaultChecked={selectedProduct?.featured} /> Feature on home page
						</label>
						<button className="button orange" type="submit">
							Save product
						</button>
					</form>
					<div className="admin-list">
						<h2>Catalog · {products.length}</h2>
						{products.map((product) => (
							<article key={product.slug}>
								<div>
									<strong>{product.shortName}</strong>
									<span>
										{product.category} · ${product.price.toLocaleString()}
									</span>
								</div>
								<a className="icon-button" href={`/admin?edit=${product.slug}`} aria-label={`Edit ${product.name}`}>
									<Pencil size={17} />
								</a>
								<form action={duplicateProductAction}>
									<input type="hidden" name="slug" value={product.slug} />
									<button className="icon-button" aria-label={`Duplicate ${product.name}`} type="submit">
										<Copy size={16} />
									</button>
								</form>
								<form action={deleteProductAction}>
									<input type="hidden" name="slug" value={product.slug} />
									<button className="icon-button danger" aria-label={`Delete ${product.name}`} type="submit">
										×
									</button>
								</form>
							</article>
						))}
					</div>
				</div>
				)}
			</div>
		</section>
	);
}
