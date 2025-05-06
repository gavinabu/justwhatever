"use client"
/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

import classes from './landingpage.module.css'
import BlueShape from '../assets/shapes/blue.svg'
import RedShape from '../assets/shapes/red.svg'
import PinkShape from '../assets/shapes/pink.svg'
import GreenShape from '../assets/shapes/green.svg'
import DownArrow from '../assets/downArrow.svg'
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [title, setTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  
  useEffect(() => {
    async function writeSegment(segment: string) {
      for (let i = 0; i < segment.length; i++) {
        setTitle(prev => prev + segment[i]);
        if(i !== segment.length - 1) await new Promise(resolve => setTimeout(resolve, 80));
      }
    }
    
    async function writeSegments(segments: string[]) {
      for (let i = 0; i < segments.length; i++) {
        await writeSegment(segments[i]);
        if(i !== segments.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
      }
      setShowCursor(false);
      setShowSubtitle(true);
      setTimeout(() => setShowArrow(true), 250);
    }
    
    writeSegments(["Hey", ", ", "I'm Gavin"]);
  }, []);
  
  return (
    <div className={classes.landingpagecontainer}>
      <div className={classes.landingpage}>
        <div className={classes.noise} />
        <div className={classes.shapes}>
          <img src={RedShape.src} className={classes.redShape} alt="Red Shape" />
          <img src={BlueShape.src} className={classes.blueShape} alt="Blue Shape" />
          <img src={GreenShape.src} className={classes.greenShape} alt="Green Shape" />
          <img src={PinkShape.src} className={classes.pinkShape} alt="Pink Shape" />
        </div>
        <h1 className={classes.intro}>
          {title}
          {showCursor && <span className={classes.cursor}>_</span>}
        </h1>
        <span className={classes.subtitle} data-visible={showSubtitle}>I also go by “JustWhatever” and “prizs” online</span>
        <img src={DownArrow.src} className={classes.downarrow} alt="Down Arrow" data-visible={showArrow} />
      </div>
    </div>
  );
}
