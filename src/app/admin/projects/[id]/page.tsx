/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import {notFound} from "next/navigation";
import {IconChevronLeft} from "@tabler/icons-react";
import {requireAdmin} from "@/app/util/auth";
import {connectToDatabase} from "@/app/util/mongo";
import {Project} from "@/app/util/types";
import ProjectForm from "@/app/admin/projects/[id]/ProjectForm";

import classes from "../../admin.module.css";

export const dynamic = "force-dynamic";

export default async function EditProjectPage(props: {params: Promise<{id: string}>}) {
  await requireAdmin();
  const {id} = await props.params;

  let project: Project | undefined;
  if (id !== "new") {
    const db = (await connectToDatabase()).db;
    const found = await db.collection<Project>("projects").findOne({id}, {projection: {_id: 0}});
    if (!found) return notFound();
    project = found;
  }

  return (
    <>
      <a className={classes.backHome} href="/admin">
        <IconChevronLeft size={24} stroke={3}/>
        <span>Dashboard</span>
      </a>
      <div className={classes.panel}>
        <div className={classes.header}>
          <h1>{project ? `Edit ${project.name}` : "New project"}</h1>
          {project && <a href={`/projects/${project.id}`} className={classes.secondaryLink}>View page</a>}
        </div>
        <ProjectForm project={project}/>
      </div>
    </>
  );
}
