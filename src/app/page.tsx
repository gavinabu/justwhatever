/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import LandingPage from "@/app/home/LandingPage";
import Socials from "@/app/home/Socials";
import Contact from "@/app/home/Contact";
import Footer from "@/app/home/Footer";
import ProjectCard from "@/app/components/project/Card";
import {findSignedURL} from "@/app/util/media";
import Projects from "@/app/home/Projects";
import Technology from "@/app/components/technolagies/Technology";
import Technologies from "@/app/home/Technologies";
import {connectToDatabase} from "@/app/util/mongo";
import {Project} from "@/app/util/types";
import {Suspense} from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const db = (await connectToDatabase()).db;
  const projects = await db.collection<Project>("projects").find({type: "project"}).toArray();
  const work = await db.collection<Project>("projects").find({type: "work"}).toArray();
  return (
    <>
      <LandingPage/>
      <Socials/>
      <Suspense fallback={<div></div>}>
        <Projects title="Projects" items={projects.map(e => {return {
          title: e.name,
          moreinfo: `/projects/${e.id}`,
          description: e.tags.includes("indev") ? "COMING SOON" : e.link === "" ? "UNRELEASED" : new URL(e.link).hostname,
          url: e.link === "" ? false : e.link,
          isLink: e.link !== "" && !e.tags.includes("indev"),
          banner: e.banner
        } as any})}/>
        <Projects title="Work Experience" items={work.map(e => {return {
          title: e.name,
          moreinfo: `/projects/${e.id}`,
          description: e.tags.includes("indev") ? "COMING SOON" : e.link === "" ? "UNRELEASED" : new URL(e.link).hostname,
          url: e.link === "" ? false : e.link,
          isLink: e.link !== "" && !e.tags.includes("indev"),
          banner: e.banner
        } as any})}/>
      </Suspense>
      <Technologies/>
      <Contact/>
      <Footer/>
    </>
  );
}
