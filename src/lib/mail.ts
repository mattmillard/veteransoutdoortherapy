import "server-only";
import nodemailer from "nodemailer";

export type ContactNotification = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
};

function requiredEnvironment(name: string) {
	const value = process.env[name]?.trim();
	if (!value) throw new Error(`${name} is required to send contact notifications.`);
	return value;
}

export async function sendContactNotification(contact: ContactNotification) {
	const port = Number(process.env.SMTP_PORT || 465);
	const user = requiredEnvironment("SMTP_USER");
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST?.trim() || "mail.privateemail.com",
		port,
		secure: port === 465,
		auth: { user, pass: requiredEnvironment("SMTP_PASSWORD") },
		connectionTimeout: 10_000,
		greetingTimeout: 10_000,
		socketTimeout: 15_000,
		tls: { minVersion: "TLSv1.2" },
	});

	const name = `${contact.firstName} ${contact.lastName}`.trim();
	await transporter.sendMail({
		from: `Veterans Outdoor Therapy Website <${user}>`,
		to: requiredEnvironment("CONTACT_EMAIL_TO"),
		replyTo: contact.email,
		subject: `New website contact from ${name}`,
		text: [
			"A new contact form was submitted at veteransoutdoortherapy.org.",
			"",
			`Name: ${name}`,
			`Email: ${contact.email}`,
			`Phone: ${contact.phone || "Not provided"}`,
			"",
			"Message:",
			contact.message,
			"",
			"Reply to this email to respond directly to the sender.",
		].join("\n"),
	});
}