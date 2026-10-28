/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import {redirect} from "next/navigation";
import {IconChevronLeft} from "@tabler/icons-react";
import {adminConfigured, isAdmin} from "@/app/util/auth";
import LoginForm from "@/app/admin/login/LoginForm";

import classes from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <>
      <a className={classes.backHome} href="/">
        <IconChevronLeft size={24} stroke={3}/>
        <span>Home</span>
      </a>
      <div className={`${classes.panel} ${classes.login}`}>
        <h1>Admin</h1>
        {!adminConfigured() && <p className={classes.error}>ADMIN_PASSWORD_HASH is not set, so login is disabled.</p>}
        <LoginForm/>
      </div>
    </>
  );
}
