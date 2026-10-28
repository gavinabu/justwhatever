/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

"use client";

import {startTransition, useActionState} from "react";
import {saveProject} from "@/app/admin/actions";
import {Project} from "@/app/util/types";
import {technologyNames} from "@/app/components/technolagies/Technology";

import classes from "../../admin.module.css";

const json = (v: Record<string, string[]> | undefined) => v && Object.keys(v).length > 0 ? JSON.stringify(v, null, 2) : "";

export default function ProjectForm({project}: {project?: Project}) {
  const [state, action, pending] = useActionState(saveProject, {});

  return (
    // Submit via onSubmit rather than action={} so React doesn't reset the inputs when validation fails.
    <form onSubmit={e => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      startTransition(() => action(formData));
    }} className={`${classes.form} ${classes.projectForm}`}>
      <input type="hidden" name="originalId" value={project?.id ?? ""}/>

      <fieldset>
        <legend>Basics</legend>
        <label>
          Name
          <input name="name" defaultValue={project?.name} required/>
        </label>
        <label>
          ID <small>used in the URL: /projects/&lt;id&gt;</small>
          <input name="id" defaultValue={project?.id} pattern="[a-z0-9][a-z0-9\-]*" required/>
        </label>
        <label>
          Type
          <select name="type" defaultValue={project?.type ?? "project"}>
            <option value="project">Project</option>
            <option value="work">Work experience</option>
          </select>
        </label>
        <label className={classes.full}>
          About
          <textarea name="about" rows={5} defaultValue={project?.about}/>
        </label>
        <div className={classes.full}>
          <span className={classes.groupLabel}>Tags</span>
          <div className={classes.checks}>
            {(["website", "game", "indev"] as const).map(t => (
              <label key={t} className={classes.check}>
                <input type="checkbox" name="tags" value={t} defaultChecked={project?.tags.includes(t)}/>
                {t}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Links</legend>
        <label>
          Link <small>leave empty if unreleased</small>
          <input name="link" type="url" defaultValue={project?.link} placeholder="https://"/>
        </label>
        <label>
          GitHub repo <small>owner/name</small>
          <input name="github" defaultValue={project?.github} placeholder="gavinabu/example"/>
        </label>
        <label>
          npm package
          <input name="npm" defaultValue={project?.npm}/>
        </label>
        <label>
          Registered to
          <input name="registeredTo" defaultValue={project?.registeredTo}/>
        </label>
      </fieldset>

      <fieldset>
        <legend>Technologies</legend>
        <div className={`${classes.checks} ${classes.full}`}>
          {Object.entries(technologyNames).map(([key, name]) => (
            <label key={key} className={classes.check}>
              <input type="checkbox" name="frameworks" value={key} defaultChecked={project?.frameworks.includes(key as keyof typeof technologyNames)}/>
              {name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Media</legend>
        <label>
          Banner S3 key
          <input name="banner" defaultValue={project?.banner}/>
        </label>
        <label>
          …or upload a new banner
          <input type="file" name="bannerFile" accept="image/*"/>
        </label>
        <label>
          Screenshot S3 keys <small>one per line</small>
          <textarea name="screenshots" rows={4} defaultValue={project?.screenshots.join("\n")}/>
        </label>
        <label>
          Upload screenshots <small>added after the keys above</small>
          <input type="file" name="screenshotFiles" accept="image/*" multiple/>
        </label>
      </fieldset>

      <fieldset>
        <legend>Credits</legend>
        <label>
          Credits <small>JSON, e.g. {`{"Developer": ["Gavin"]}`}</small>
          <textarea name="credits" rows={4} defaultValue={json(project?.credits)} className={classes.mono}/>
        </label>
        <label>
          Other credits <small>same format</small>
          <textarea name="otherCredits" rows={4} defaultValue={json(project?.otherCredits)} className={classes.mono}/>
        </label>
      </fieldset>

      {state.error && <p className={classes.error}>{state.error}</p>}
      <div className={classes.rowActions}>
        <button type="submit" disabled={pending}>{pending ? "Saving…" : project ? "Save changes" : "Create project"}</button>
        <a href="/admin" className={classes.secondaryLink}>Cancel</a>
      </div>
    </form>
  );
}
