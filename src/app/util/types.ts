/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import {TechnologyType} from "@/app/components/technolagies/Technology";

export type Tag = "website" | "game" | "indev"

export interface Project {
  name: string,
  about: string,
  tags: Tag[],
  id: string,
  banner: string,
  screenshots: string[],
  registeredTo: string,
  credits: Record<string, string[]>,
  otherCredits: Record<string, string[]>,
  frameworks: TechnologyType[],
  type: "project" | "work",
  link: string,
  npm?: string,
  github?: string
}