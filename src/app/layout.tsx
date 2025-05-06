/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import type { Metadata } from "next";
import {Figtree, Rubik} from "next/font/google";
import "./global.css"
import Favicon from "./assets/favicon.png"

const rubikFont = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const figTreeFont = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JustWhatever",
  description: "Hey, I am Gavin Abu-Zahra, and I am a full stack web developer.",
  icons: {
    icon: Favicon.src,
    apple: Favicon.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikFont.variable} ${figTreeFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
