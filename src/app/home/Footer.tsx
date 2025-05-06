/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from './footer.module.css'

export default function Footer(props: {}) {
  return (
    <div className={classes.footer}>
      <span>Icons by <a href="https://tabler.io/icons">Tabler</a></span>
      <span>justwhatever.net as of Jun 19 2022. previously jwnet.ca</span>
      <span>Copyright 2020-2025 JustWhatever</span>
    </div>
  )
}