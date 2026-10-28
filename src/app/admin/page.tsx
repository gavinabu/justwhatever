/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import {IconChevronLeft, IconPlus} from "@tabler/icons-react";
import {requireAdmin} from "@/app/util/auth";
import {connectToDatabase} from "@/app/util/mongo";
import {DBSCacheItem, findSignedURL} from "@/app/util/media";
import {Project} from "@/app/util/types";
import {clearAllCache, clearExpiredCache, deleteProject, logout} from "@/app/admin/actions";
import ConfirmButton from "@/app/admin/ConfirmButton";

import classes from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();

  const db = (await connectToDatabase()).db;
  const projects = await db.collection<Project>("projects").find().sort({type: 1, name: 1}).toArray();
  const scache = db.collection<DBSCacheItem>("scache");
  const [cacheTotal, cacheExpired] = await Promise.all([
    scache.countDocuments(),
    scache.countDocuments({expires: {$lt: Date.now() / 1000}})
  ]);
  const banners = await Promise.all(projects.map(p => p.banner ? findSignedURL(p.banner, true).catch(() => "") : ""));

  const stats = [
    {label: "Projects", value: projects.filter(p => p.type === "project").length},
    {label: "Work", value: projects.filter(p => p.type === "work").length},
    {label: "In development", value: projects.filter(p => p.tags.includes("indev")).length},
    {label: "Cached URLs", value: cacheTotal, detail: `${cacheExpired} expired`}
  ];

  return (
    <>
      <div className={classes.topBar}>
        <a className={classes.backHome} href="/">
          <IconChevronLeft size={24} stroke={3}/>
          <span>Home</span>
        </a>
        <form action={logout}>
          <button type="submit" className={classes.secondary}>Log out</button>
        </form>
      </div>

      <div className={classes.panel}>
        <div className={classes.header}>
          <h1>Dashboard</h1>
          <a href="/admin/projects/new" className={classes.primaryLink}><IconPlus size={18} stroke={3}/>New project</a>
        </div>

        <div className={classes.stats}>
          {stats.map(s => (
            <div key={s.label} className={classes.stat}>
              <span className={classes.statValue}>{s.value}</span>
              <span className={classes.statLabel}>{s.label}</span>
              {s.detail && <span className={classes.statDetail}>{s.detail}</span>}
            </div>
          ))}
        </div>

        <section className={classes.section}>
          <h2>Projects</h2>
          {projects.length === 0 ? <p className={classes.muted}>No projects yet.</p> : (
            <div className={classes.tableWrap}>
              <table className={classes.table}>
                <thead>
                  <tr><th></th><th>Name</th><th>Type</th><th>Tags</th><th>Link</th><th></th></tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr key={p.id}>
                      <td>{banners[i] ? <img src={banners[i]} alt="" className={classes.thumb}/> : <div className={classes.thumb}/>}</td>
                      <td>
                        <a href={`/projects/${p.id}`} className={classes.name}>{p.name}</a>
                        <code>{p.id}</code>
                      </td>
                      <td>{p.type}</td>
                      <td>{p.tags.map(t => <span key={t} className={classes.tag}>{t}</span>)}</td>
                      <td className={classes.linkCell}>{p.link ? <a href={p.link}>{new URL(p.link).hostname}</a> : <span className={classes.muted}>—</span>}</td>
                      <td>
                        <div className={classes.rowActions}>
                          <a href={`/admin/projects/${p.id}`} className={classes.secondaryLink}>Edit</a>
                          <form action={deleteProject}>
                            <input type="hidden" name="id" value={p.id}/>
                            <ConfirmButton message={`Delete "${p.name}"? This can't be undone.`} className={classes.danger}>Delete</ConfirmButton>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className={classes.section}>
          <h2>Signed URL cache</h2>
          <p className={classes.muted}>Signed S3 links are cached in <code>scache</code> for 5 minutes. Expired entries are only removed when that key is requested again.</p>
          <div className={classes.rowActions}>
            <form action={clearExpiredCache}>
              <button type="submit" className={classes.secondary}>Clear expired ({cacheExpired})</button>
            </form>
            <form action={clearAllCache}>
              <ConfirmButton message="Clear every cached URL? They'll be regenerated on the next page load." className={classes.danger}>Clear all</ConfirmButton>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
