/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from "./card.module.css";

export default function ProjectCard(props: {banner: string, title: string, description: string, url?: string, isLink?: boolean, moreinfo: string, npm?: string}) {
  return (
    <div className={classes.card}>
      <img src={props.banner} alt={props.title} />
      <div className={classes.body}>
        <h3>{props.title}</h3>
        {props.npm ?
          <code>npm i <a href={`https://www.npmjs.com/package/${props.npm}`}>{props.npm}</a></code> :
          props.isLink ?
            <a href={props.url}>{props.description}</a> :
            <span>{props.description}</span>
        }
        <div className={classes.buttonContainer}>
          <a href={props.moreinfo}><button>See More</button></a>
        </div>
      </div>
    </div>
  )
}