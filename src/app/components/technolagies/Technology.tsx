/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from "./technology.module.css";
import {
  IconAtom,
  IconBrandAws,
  IconBrandBootstrap,
  IconBrandCpp,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandSocketIo,
  IconBrandTypescript,
  IconBrandVercelFilled,
  IconCube,
  IconDumplingFilled,
  IconFile,
  IconFileTypeCss,
  IconFileTypeHtml,
  IconJson,
  IconTerminal2
} from "@tabler/icons-react";

export type TechnologyType = "ts"|"js"|"java"|"cpp"|"css"|"json"|"html"|"nodejs"|"react"|"next"|"bootstrap"|"matterjs"|"mongodb"|"aws"|"linux"|"webpack"|"electron"|"socketio"|"bun"|"vercel"

export default function Technolnogy(params: {type: TechnologyType}) {
  function getIcon(type: TechnologyType) {
    switch (type) {
      case "ts": return <IconBrandTypescript/>;
      case "js": return <IconBrandJavascript/>;
      case "java": return <IconFile/>;
      case "cpp": return <IconBrandCpp/>;
      case "css": return <IconFileTypeCss/>;
      case "json": return <IconJson/>;
      case "html": return <IconFileTypeHtml/>;
      case "nodejs": return <IconBrandNodejs/>;
      case "react": return <IconBrandReact/>;
      case "next": return <IconBrandNextjs/>;
      case "bootstrap": return <IconBrandBootstrap/>;
      case "matterjs": return <IconCube/>;
      case "mongodb": return <IconBrandMongodb/>;
      case "aws": return <IconBrandAws/>;
      case "linux": return <IconTerminal2/>;
      case "webpack": return <IconCube/>;
      case "electron": return <IconAtom/>;
      case "socketio": return <IconBrandSocketIo/>;
      case "bun": return <IconDumplingFilled/>;
      case "vercel": return <IconBrandVercelFilled/>;
    }
  }
  const names: Record<TechnologyType, string> = {
    aws: "AWS",
    cpp: "C++",
    css: "CSS",
    bun: "Bun",
    js: "Javascript",
    ts: "Typescript",
    bootstrap: "Bootstrap",
    electron: "Electron",
    html: "HTML",
    java: "Java",
    linux: "Linux",
    json: "JSON",
    next: "NextJS",
    matterjs: "MatterJS",
    mongodb: "MongoDB",
    nodejs: "NodeJS",
    react: "React",
    socketio: "SocketIO",
    vercel: "Vercel",
    webpack: "Webpack",
  };
  return (
    <div className={classes.technolagy}>
      {getIcon(params.type)}
      <span>{names[params.type]}</span>
    </div>
  )
}