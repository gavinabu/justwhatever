/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import type {Metadata} from "next";

import classes from "./admin.module.css";

export const metadata: Metadata = {
  title: "Admin · JustWhatever",
  robots: {index: false, follow: false}
};

export default function AdminLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return <div className={classes.container}>{children}</div>;
}
