import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
const cookieName = "vot-admin";
const devToken = "vot-dev-admin";
function key() {
	if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is not configured");
	return new TextEncoder().encode(process.env.AUTH_SECRET);
}
function matches(value: string, expected: string) {
	const left = Buffer.from(value);
	const right = Buffer.from(expected);
	return left.length === right.length && timingSafeEqual(left, right);
}
export async function login(username: string, password: string) {
	const expectedUsername = (process.env.ADMIN_USERNAME ?? "mattmillard").trim();
	const expectedPassword = (process.env.ADMIN_PASSWORD ?? "Evie1228857!").trim();
	const providedUsername = username.trim();
	const providedPassword = password.trim();
	if (!matches(providedUsername, expectedUsername) || !matches(providedPassword, expectedPassword)) return false;

	const token = process.env.AUTH_SECRET
		? await new SignJWT({ username: providedUsername })
				.setProtectedHeader({ alg: "HS256" })
				.setIssuedAt()
				.setExpirationTime("8h")
				.sign(key())
		: devToken;

	(await cookies()).set(cookieName, token, {
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		maxAge: 28800,
		path: "/",
	});
	return true;
}
export async function isAdmin() {
	const token = (await cookies()).get(cookieName)?.value;
	if (!token) return false;
	if (!process.env.AUTH_SECRET) return token === devToken;
	try {
		await jwtVerify(token, key());
		return true;
	} catch {
		return false;
	}
}
export async function logout() {
	(await cookies()).delete(cookieName);
}
