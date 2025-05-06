/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import {IconChevronLeft} from "@tabler/icons-react";

import classes from "./notfound.module.css"

export default function NotFound() {
  return (
    <div className={classes.container}>
      <a className={classes.backHome} href="/">
        <IconChevronLeft size={24} stroke={3}/>
        <span>Home</span>
      </a>
      <div className={classes.error}>
        <h1>Error 404</h1>
        <span>We couldn’t find this page</span>
      </div>
    </div>
  )
}