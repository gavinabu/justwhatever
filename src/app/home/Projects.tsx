/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import ProjectCard from "@/app/components/project/Card";
import {findSignedURL} from "@/app/util/media";

import classes from './projects.module.css'

export const dynamic = "force-dynamic";

export default async function Projects(props: {title: string, items: {title: string, moreinfo: string, banner: string, isLink?: boolean, description: string, url?: string}[]}) {
  return (
    <div className={classes.container}>
      <h2>{props.title}</h2>
      <div className={classes.projects}>
        {props.items.map(async item => (
          <ProjectCard title={item.title} moreinfo={item.moreinfo} banner={await findSignedURL(item.banner, true)} isLink={item.isLink} description={item.description} url={item.url}  />
        ))}
      </div>
    </div>
  )
}