"use client"
/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from './technologies.module.css'
import Technology from "@/app/components/technolagies/Technology";
import {ReactNode, useState} from "react";
import {
  IconBaselineDensityLarge,
  IconBaselineDensityMedium, IconBaselineDensitySmall,
  IconLineDashed,
  IconLineDotted,
  IconMenu
} from "@tabler/icons-react";

export default function Technologies(props: {}) {
  const [isList, setIsList] = useState(false);
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
      <div className={classes.technologiesHeader}>
        <h2>Technologies</h2>
        <button onClick={() => setIsList(!isList)}>{isList ? <IconLineDotted size={12}/> : <IconBaselineDensitySmall size={12}/>}</button>
      </div>
      <div className={classes.technologies} data-isList={isList ? "true" : "false"}>
        {isList ? technologies : <div className={classes.technologiesTrack}>
          {new Array(8).fill(technologies).flat()}
        </div>}
      </div>
    </div>
  )
}