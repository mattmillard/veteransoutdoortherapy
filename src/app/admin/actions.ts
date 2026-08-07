"use server";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, login, logout } from "@/lib/auth";
import { deleteProduct, getProducts, saveProduct } from "@/lib/db";

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function safeUploadPath(slug: string, fileName: string) {
	const safeSlug = slugify(slug).slice(0, 60) || "product";
	const safeName = fileName
		.toLowerCase()
		.replace(/[^a-z0-9._-]+/g, "-")
		.replace(/-+/g, "-")
		.slice(-80) || "image";
	return `products/${safeSlug}/${Date.now()}-${safeName}`;
}

export async function loginAction(form: FormData) {
	const valid = await login(String(form.get("username") || ""), String(form.get("password") || ""));
	if (!valid) redirect("/admin?error=1");
	redirect("/admin");
}
export async function logoutAction() {
	await logout();
	redirect("/admin");
}
export async function saveProductAction(form: FormData) {
	if (!(await isAdmin())) redirect("/admin");
	const name = String(form.get("name") || "").trim();
	const slug = String(
		form.get("slug") ||
			name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, ""),
	);
	const file = form.get("imageFile");
	const existingImage = String(form.get("existingImage") || "").trim();
	let image = String(form.get("image") || "").trim() || existingImage;
	if (file instanceof File && file.size > 0) {
		if (!process.env.BLOB_READ_WRITE_TOKEN) redirect("/admin?saveError=upload-config");
		try {
			image = (await put(safeUploadPath(slug, file.name), file, { access: "public", addRandomSuffix: true })).url;
		} catch (error) {
			console.error("Product image upload failed", {
				slug,
				fileName: file.name,
				error,
			});
			redirect("/admin?saveError=upload-failed");
		}
	}
	try {
		await saveProduct({
			slug,
			name,
			shortName: String(form.get("shortName") || name),
			price: Number(form.get("price")),
			category: String(form.get("category")) === "Sponsorships" ? "Sponsorships" : "Merchandise",
			description: String(form.get("description") || ""),
			image,
			gallery: image ? [image] : [],
			sizes: String(form.get("sizes") || "")
				.split(",")
				.map((size) => size.trim())
				.filter(Boolean),
			stock: form.get("stock") ? Number(form.get("stock")) : undefined,
			featured: form.get("featured") === "on",
		});
	} catch (error) {
		console.error("Product save failed", { slug, error });
		redirect("/admin?saveError=save-failed");
	}
	revalidatePath("/");
	revalidatePath("/shop");
	revalidatePath("/sponsor");
	revalidatePath(`/product/${slug}`);
	revalidatePath("/admin");
	redirect("/admin?saved=1");
}

function getDuplicateSlug(existingSlugs: Set<string>, sourceSlug: string) {
	const base = `${slugify(sourceSlug).slice(0, 48) || "product"}-copy`;
	if (!existingSlugs.has(base)) return base;
	let index = 2;
	while (existingSlugs.has(`${base}-${index}`)) index += 1;
	return `${base}-${index}`;
}

export async function duplicateProductAction(form: FormData) {
	if (!(await isAdmin())) redirect("/admin");
	const sourceSlug = String(form.get("slug") || "").trim();
	if (!sourceSlug) redirect("/admin?saveError=save-failed");

	const products = await getProducts();
	const source = products.find((product) => product.slug === sourceSlug);
	if (!source) redirect("/admin?saveError=save-failed");

	const existingSlugs = new Set(products.map((product) => product.slug));
	const duplicateSlug = getDuplicateSlug(existingSlugs, source.slug);

	try {
		await saveProduct({
			...source,
			slug: duplicateSlug,
			name: `${source.name} (Copy)`,
			shortName: `${source.shortName} Copy`,
		});
	} catch {
		redirect("/admin?saveError=save-failed");
	}

	revalidatePath("/");
	revalidatePath("/shop");
	revalidatePath("/sponsor");
	revalidatePath(`/product/${duplicateSlug}`);
	revalidatePath("/admin");
	redirect(`/admin?edit=${duplicateSlug}&saved=1`);
}
export async function deleteProductAction(form: FormData) {
	if (!(await isAdmin())) redirect("/admin");
	const slug = String(form.get("slug") || "");
	await deleteProduct(slug);
	revalidatePath("/");
	revalidatePath("/shop");
	revalidatePath("/sponsor");
	revalidatePath(`/product/${slug}`);
	revalidatePath("/admin");
}
