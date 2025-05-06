/*
 * © 2020-2025 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */
'use client';

import { useEffect, useRef } from 'react';

export default function NoiseMap(props: {height: number, width: number, colour?: [number, number, number], className?: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colour = props.colour || [255,255,255]
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = props.width;
    canvas.height = props.height;
    const imageData = ctx.createImageData(props.width, props.height);
    const buffer = imageData.data;
    
    for (let i = 0; i < buffer.length; i += 4) {
      buffer[i] = colour[0]
      buffer[i+1] = colour[1]
      buffer[i+2] = colour[2]
      buffer[i + 3] = Math.random()*255;
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [props.width, props.height]);
  
  return (
    <canvas
      ref={canvasRef}
      className={props.className}
    />
  );
}
