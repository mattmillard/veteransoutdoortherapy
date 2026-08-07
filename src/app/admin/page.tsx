import { LockKeyhole, LogOut, PackagePlus, Pencil } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { getProducts } from "@/lib/db";
import { deleteProductAction, loginAction, logoutAction, saveProductAction } from "./actions";

export default async function AdminPage({
	searchParams,
}: {
	searchParams: Promise<{ edit?: string; error?: string; saved?: string; saveError?: string }>;
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
	const products = await getProducts();
	const selected = products.find((product) => product.slug === query.edit);
	return (
		<section className="admin-page">
			<div className="container">
				<header>
					<div>
						<p className="eyebrow">Store operations</p>
						<h1 className="display">Product admin</h1>
					</div>
					<form action={logoutAction}>
						<button className="button secondary">
							<LogOut size={17} /> Sign out
						</button>
					</form>
				</header>
				{query.saved && <p className="success-note">Product saved.</p>}
				{query.saveError === "upload-config" && (
					<p className="form-error">Image upload is not configured. Add BLOB_READ_WRITE_TOKEN to your environment.</p>
				)}
				{query.saveError === "upload-failed" && (
					<p className="form-error">Image upload failed. Please try again or use an existing image URL.</p>
				)}
				<div className="admin-grid">
					<form className="product-form" action={saveProductAction}>
						<h2>
							<PackagePlus size={20} /> {selected ? "Edit product" : "Add product"}
						</h2>
						<label>
							Product name
							<input className="field" name="name" defaultValue={selected?.name} required />
						</label>
						<div className="form-row">
							<label>
								Short display name
								<input className="field" name="shortName" defaultValue={selected?.shortName} required />
							</label>
							<label>
								Slug
								<input className="field" name="slug" defaultValue={selected?.slug} />
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
									defaultValue={selected?.price}
									required
								/>
							</label>
							<label>
								Category
								<select className="field" name="category" defaultValue={selected?.category}>
									<option>Merchandise</option>
									<option>Sponsorships</option>
								</select>
							</label>
						</div>
						<label>
							Description
							<textarea className="field" name="description" rows={5} defaultValue={selected?.description} required />
						</label>
						<label>
							Existing image URL
							<input className="field" name="image" type="url" defaultValue={selected?.image} />
						</label>
						<label>
							Or upload a new image
							<input className="field" name="imageFile" type="file" accept="image/png,image/jpeg,image/webp" />
						</label>
						<div className="form-row">
							<label>
								Sizes, comma separated
								<input className="field" name="sizes" defaultValue={selected?.sizes?.join(", ")} />
							</label>
							<label>
								Stock
								<input className="field" name="stock" type="number" min="0" defaultValue={selected?.stock} />
							</label>
						</div>
						<label className="consent">
							<input name="featured" type="checkbox" defaultChecked={selected?.featured} /> Feature on home page
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
			</div>
		</section>
	);
}
