/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

"use server";

import {redirect} from "next/navigation";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {checkPassword, createSession, destroySession, requireAdmin} from "@/app/util/auth";
import {connectToDatabase} from "@/app/util/mongo";
import {bucket, DBSCacheItem, s3client} from "@/app/util/media";
import {Project, Tag} from "@/app/util/types";
import {TechnologyType, technologyNames} from "@/app/components/technolagies/Technology";

export interface FormState {
  error?: string
}

const TAGS: Tag[] = ["website", "game", "indev"];
const ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  if (!checkPassword(String(formData.get("password") || ""))) {
    // Slow down guessing a little.
    await new Promise(r => setTimeout(r, 750));
    return {error: "Wrong password"};
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

function parseRecord(raw: string, field: string): Record<string, string[]> {
  if (raw.trim() === "") return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`${field} is not valid JSON`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed) ||
    !Object.values(parsed).every(v => Array.isArray(v) && v.every(s => typeof s === "string"))) {
    throw new Error(`${field} must look like {"Role": ["Name", ...]}`);
  }
  return parsed as Record<string, string[]>;
}

async function upload(file: File, key: string) {
  await s3client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type || undefined
  }));
  return key;
}

function extension(file: File) {
  const ext = file.name.split(".").pop();
  return ext && ext !== file.name ? `.${ext.toLowerCase()}` : "";
}

export async function saveProject(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const str = (key: string) => String(formData.get(key) || "").trim();
  const originalId = str("originalId");
  const id = str("id");

  let project: Project;
  try {
    if (!ID_PATTERN.test(id)) throw new Error("ID must be lowercase letters, numbers and dashes");
    if (str("name") === "") throw new Error("Name is required");
    const link = str("link");
    if (link !== "") {
      try { new URL(link); } catch { throw new Error("Link must be a full URL (or empty)"); }
    }
    const type = str("type");
    if (type !== "project" && type !== "work") throw new Error("Type must be project or work");

    project = {
      id,
      name: str("name"),
      about: str("about"),
      type,
      link,
      tags: formData.getAll("tags").map(String).filter((t): t is Tag => TAGS.includes(t as Tag)),
      frameworks: formData.getAll("frameworks").map(String).filter((t): t is TechnologyType => t in technologyNames),
      banner: str("banner"),
      screenshots: str("screenshots").split("\n").map(s => s.trim()).filter(s => s !== ""),
      registeredTo: str("registeredTo"),
      credits: parseRecord(str("credits"), "Credits"),
      otherCredits: parseRecord(str("otherCredits"), "Other credits")
    };
    if (str("npm")) project.npm = str("npm");
    if (str("github")) project.github = str("github");
  } catch (e) {
    return {error: (e as Error).message};
  }

  const db = (await connectToDatabase()).db;
  const projects = db.collection<Project>("projects");
  if (id !== originalId && await projects.findOne({id})) return {error: `A project with ID "${id}" already exists`};

  try {
    const banner = formData.get("bannerFile");
    if (banner instanceof File && banner.size > 0) {
      project.banner = await upload(banner, `projects/${id}/banner-${Date.now()}${extension(banner)}`);
    }
    const shots = formData.getAll("screenshotFiles").filter((f): f is File => f instanceof File && f.size > 0);
    for (const [i, shot] of shots.entries()) {
      project.screenshots.push(await upload(shot, `projects/${id}/screenshot-${Date.now()}-${i}${extension(shot)}`));
    }
  } catch (e) {
    return {error: `Upload failed: ${(e as Error).message}`};
  }
  if (project.banner === "") return {error: "A banner is required"};

  if (originalId) {
    // replaceOne so cleared optional fields (npm, github) are removed.
    const result = await projects.replaceOne({id: originalId}, project);
    if (result.matchedCount === 0) return {error: "Project no longer exists"};
  } else {
    await projects.insertOne(project);
  }
  redirect("/admin");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const db = (await connectToDatabase()).db;
  await db.collection<Project>("projects").deleteOne({id: String(formData.get("id"))});
  redirect("/admin");
}

export async function clearExpiredCache() {
  await requireAdmin();
  const db = (await connectToDatabase()).db;
  await db.collection<DBSCacheItem>("scache").deleteMany({expires: {$lt: Date.now() / 1000}});
  redirect("/admin");
}

export async function clearAllCache() {
  await requireAdmin();
  const db = (await connectToDatabase()).db;
  await db.collection<DBSCacheItem>("scache").deleteMany({});
  redirect("/admin");
}
