/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

"use client";

export default function ConfirmButton(props: {message: string, className?: string, children: React.ReactNode}) {
  return (
    <button type="submit" className={props.className} onClick={e => {
      if (!confirm(props.message)) e.preventDefault();
    }}>
      {props.children}
    </button>
  );
}
