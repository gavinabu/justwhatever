/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from './footer.module.css'

export default function Contact(props: {}) {
  return (
    <div className={classes.contact}>
      <h2>Contact Me?</h2>
      <a href="mailto:gavinabuzahra@justwhatever.net">gavinabuzahra@justwhatever.net</a>
    </div>
  )
}