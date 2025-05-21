"use client"
/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import MarkdownPreview from "@uiw/react-markdown-preview";

export default function ReadMePreview(props: {readme: string}) {
  return (
    <MarkdownPreview source={props.readme} style={{padding: 24, borderRadius: 12}} />
  )
}