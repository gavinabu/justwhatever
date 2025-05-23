"use client"
/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import MarkdownPreview from "@uiw/react-markdown-preview";
import classes from './readme.module.css'

export default function ReadMePreview(props: {readme: string}) {
  return (
    <div className={classes.readmeWrapper}>
      <MarkdownPreview className={classes.readme} source={props.readme} />
    </div>
  )
}