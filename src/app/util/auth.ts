/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import {createHmac, scrypt, timingSafeEqual} from "crypto";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const COOKIE_NAME = "admin_session";
const SESSION_SECONDS = 12 * 60 * 60;

// ADMIN_PASSWORD_HASH is "scrypt:N:r:p:saltHex:hashHex", made by `npm run hash-password`.
// Colons rather than $ because Next's .env loader expands $ sequences.
function passwordHash() {
  return process.env.ADMIN_PASSWORD_HASH || undefined;
}

export function adminConfigured() {
  return passwordHash() !== undefined;
}

function secret() {
  const s = process.env.ADMIN_SECRET || passwordHash();
  if (!s) throw new Error("ADMIN_PASSWORD_HASH is not set");
  return s;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export async function checkPassword(password: string) {
  const stored = passwordHash();
  if (!stored) return false;
  const [scheme, n, r, p, salt, hash] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hash) throw new Error("ADMIN_PASSWORD_HASH is malformed; regenerate it with `npm run hash-password`");

  const expected = Buffer.from(hash, "hex");
  const actual = await new Promise<Buffer>((resolve, reject) => scrypt(
    password, Buffer.from(salt, "hex"), expected.length,
    {N: Number(n), r: Number(r), p: Number(p), maxmem: 256 * 1024 * 1024},
    (err, key) => err ? reject(err) : resolve(key)
  ));
  return timingSafeEqual(actual, expected);
}

export async function createSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  (await cookies()).set(COOKIE_NAME, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_SECONDS
  });
}

export async function destroySession() {
  (await cookies()).delete({name: COOKIE_NAME, path: "/admin"});
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || !safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now() / 1000;
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
