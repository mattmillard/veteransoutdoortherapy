import { NextResponse } from "next/server";
import { z } from "zod";
import { saveSubmission } from "@/lib/db";
import { sendContactNotification, type ContactNotification } from "@/lib/mail";

export const runtime = "nodejs";

const contactSchema = z.object({
	firstName: z.string().trim().min(1).max(100),
	lastName: z.string().trim().min(1).max(100),
	email: z.email().max(254),
	phone: z.string().trim().max(40).default(""),
	message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
	}

	if (String(form.get("website") || "").trim()) return NextResponse.json({ ok: true });

	const kind = String(form.get("kind") || "application").slice(0, 60);
	let data = Object.fromEntries(
		[...form.entries()]
			.filter(([key, value]) => !["kind", "website"].includes(key) && typeof value === "string")
			.map(([key, value]) => [key, String(value).slice(0, 5000)]),
	);
	let contact: ContactNotification | null = null;

	if (kind === "contact") {
		const result = contactSchema.safeParse(data);
		if (!result.success) return NextResponse.json({ error: "Please check the contact form fields" }, { status: 400 });
		contact = result.data;
		data = result.data;
	}

	try {
		await saveSubmission(kind, data);
	} catch {
		return NextResponse.json({ error: "Submission storage is not configured" }, { status: 503 });
	}

	if (contact) {
		try {
			await sendContactNotification(contact);
		} catch (error) {
			console.error("Contact notification delivery failed", error);
			return NextResponse.json({ ok: true, notificationSent: false }, { status: 202 });
		}
	}

	return NextResponse.json({ ok: true, notificationSent: contact ? true : undefined });
}
