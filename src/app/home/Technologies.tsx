/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from './technologies.module.css'
import Technology from "@/app/components/technolagies/Technology";
import {ReactNode} from "react";

export default function Technologies(props: {}) {
  const technologies: ReactNode[] = [
    <Technology type="ts"/>,
    <Technology type="js"/>,
    <Technology type="css"/>,
    <Technology type="bootstrap"/>,
    <Technology type="html"/>,
    <Technology type="react"/>,
    <Technology type="next"/>,
    <Technology type="webpack"/>,
    <Technology type="matterjs"/>,
    <Technology type="electron"/>,
    <Technology type="mongodb"/>,
    <Technology type="json"/>,
    <Technology type="socketio"/>,
    <Technology type="bun"/>,
    <Technology type="aws"/>,
    <Technology type="vercel"/>,
    <Technology type="nodejs"/>,
    <Technology type="linux"/>,
    <Technology type="java"/>,
    <Technology type="cpp"/>
  ]
  return (
    <div className={classes.technologiesContainer}>
      <h2>Technologies</h2>
      <div className={classes.technologies}>
        <div className={classes.technologiesTrack}>
          {new Array(2).fill(technologies).flat()}
        </div>
      </div>
    </div>
  )
}