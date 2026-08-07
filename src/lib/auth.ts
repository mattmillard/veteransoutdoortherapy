import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
const cookieName = "vot-admin";
function key() { if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is not configured"); return new TextEncoder().encode(process.env.AUTH_SECRET); }
function matches(value: string, expected: string) { const left = Buffer.from(value); const right = Buffer.from(expected); return left.length === right.length && timingSafeEqual(left, right); }
export async function login(username: string, password: string) { const expectedUsername = process.env.ADMIN_USERNAME ?? "mattmillard"; const expectedPassword = process.env.ADMIN_PASSWORD ?? "Evie1228857!"; if (!process.env.AUTH_SECRET || !matches(username, expectedUsername) || !matches(password, expectedPassword)) return false; const token = await new SignJWT({ username }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(key()); (await cookies()).set(cookieName, token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 28800, path: "/" }); return true; }
export async function isAdmin() { const token = (await cookies()).get(cookieName)?.value; if (!token || !process.env.AUTH_SECRET) return false; try { await jwtVerify(token, key()); return true; } catch { return false; } }
export async function logout() { (await cookies()).delete(cookieName); }