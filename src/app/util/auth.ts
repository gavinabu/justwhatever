/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import {createHmac, timingSafeEqual} from "crypto";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const COOKIE_NAME = "admin_session";
const SESSION_SECONDS = 12 * 60 * 60;

function secret() {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD is not set");
  return s;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(password: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  // Compare HMACs so both sides are the same length.
  return safeEqual(sign(password), sign(real));
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
  if (!process.env.ADMIN_PASSWORD) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || !safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now() / 1000;
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
