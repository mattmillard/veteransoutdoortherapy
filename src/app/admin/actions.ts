"use server";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, login, logout } from "@/lib/auth";
import { deleteProduct, saveProduct } from "@/lib/db";

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
	let image = String(form.get("image") || "");
	if (file instanceof File && file.size > 0) {
		if (!process.env.BLOB_READ_WRITE_TOKEN) redirect("/admin?saveError=upload-config");
		try {
			image = (await put(`products/${slug}-${file.name}`, file, { access: "public", addRandomSuffix: true })).url;
		} catch {
			redirect("/admin?saveError=upload-failed");
		}
	}
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
	revalidatePath("/");
	revalidatePath("/shop");
	revalidatePath("/sponsor");
	revalidatePath(`/product/${slug}`);
	revalidatePath("/admin");
	redirect("/admin?saved=1");
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
