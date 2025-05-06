/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from './socials.module.css'
import {IconBrandGithubFilled, IconBrandNpm} from "@tabler/icons-react";

export default function Socials(props: {}) {
  return (
    <div className={classes.socials}>
      <a href="https://github.com/gavinabu"><IconBrandGithubFilled/></a>
      <a href="https://www.npmjs.com/~gavinabu"><IconBrandNpm/></a>
    </div>
  )
}