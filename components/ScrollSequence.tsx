"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 240;

interface ScrollSequenceProps {
  progress?: MotionValue<number>; 
}

export default function ScrollSequence({ progress: externalProgress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const activeProgress = externalProgress || scrollYProgress;

  // Transform scroll (0 to 1) to frame index (0 to 239)
  const frameIndex = useTransform(activeProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const imgs: HTMLImageElement[] = [];
      // Detect basePath from current URL
      const basePath = window.location.pathname.startsWith('/AirpodMax') ? '/AirpodMax' : '';
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        // Matching the actual filenames matching ezgif-frame-001.jpg format
        const fileName = `ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
        img.src = `${basePath}/sequence/${fileName}`;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
        imgs.push(img);
      }
      setImages(imgs);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;
    // We only set width/height if they changed to avoid flickering/performance hits
    if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    
    // Clear
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#000000"; // Apple Black
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    if (!imagesLoaded || images.length === 0) return;

    const imgIndex = Math.min(FRAME_COUNT - 1, Math.floor(Math.max(0, index)));
    const img = images[imgIndex];
    
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // "Contain" logic with breathing room (0.85 scale)
    const w = window.innerWidth;
    const h = window.innerHeight;
    const imgAspect = img.width / img.height;
    const screenAspect = w / h;
    
    let drawW, drawH;
    const scaleFactor = 0.85; // Reduce size to avoid hitting top/bottom
    
    if (screenAspect > imgAspect) {
      // Screen is wider than image -> fit to height
      drawH = h * scaleFactor;
      drawW = drawH * imgAspect;
    } else {
      // Screen is taller -> fit to width
      drawW = w * scaleFactor; 
      drawH = drawW / imgAspect;
    }
    
    // Center it
    const x = (w - drawW) / 2;
    const y = (h - drawH) / 2;
    
    ctx.drawImage(img, x, y, drawW, drawH);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => renderFrame(latest));
  });
  
  // Initial draw once loaded
  useEffect(() => {
     if (imagesLoaded) renderFrame(0);
  }, [imagesLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}
