/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

"use client";

import {useActionState} from "react";
import {login} from "@/app/admin/actions";

import classes from "../admin.module.css";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className={classes.form}>
      <label>
        Password
        <input type="password" name="password" autoComplete="current-password" required autoFocus/>
      </label>
      {state.error && <p className={classes.error}>{state.error}</p>}
      <button type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
