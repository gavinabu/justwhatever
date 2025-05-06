/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from "./project.module.css";
import {IconChevronLeft} from "@tabler/icons-react";
import {connectToDatabase} from "@/app/util/mongo";
import {Project} from "@/app/util/types";
import {findSignedURL} from "@/app/util/media";
import Technology from "@/app/components/technolagies/Technology";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProjectPage(params: any) {
  const parms = await params.params;
  const id: string = parms.id;
  const db = (await connectToDatabase()).db;
  const project = await db.collection<Project>("projects").findOne({ id: id });
  
  if(!project) {
    return notFound();
  }
  
  const desc = project.tags.includes("indev") ? "COMING SOON" : project.link === "" ? "UNRELEASED" : new URL(project.link).hostname
  
  return (
    <div className={classes.projectContainer}>
      <a className={classes.backHome} href="/">
        <IconChevronLeft size={24} stroke={3}/>
        <span>Home</span>
      </a>
      <div className={classes.project}>
        <div className={classes.header}>
          <div className={classes.info}>
            <h1>{project.name}</h1>
            {(project.link !== "" && !project.tags.includes("indev")) ?
              <a href={project.link}>{desc}</a> :
              <span>{desc}</span>
            }
          </div>
          <div className={classes.banner}>
            <img src={await findSignedURL(project.banner, true)}/>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.frameworks}>{project.frameworks.map(e => (<Technology type={e}/>))}</div>
          <p>{project.about}</p>
          <div className={classes.screenshots}>
            {project.screenshots.map(async (e) => (<img src={await findSignedURL(e)}/>))}
          </div>
        </div>
      </div>
    </div>
  )
}