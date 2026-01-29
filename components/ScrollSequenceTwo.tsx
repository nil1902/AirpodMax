"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 160;

interface ScrollSequenceProps {
  progress: MotionValue<number>; // External scroll progress 0-1
}

export default function ScrollSequenceTwo({ progress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Transform external progress (0-1) to frame index (0-159)
  const frameIndex = useTransform(progress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadImages = async () => {
      const imgs: HTMLImageElement[] = [];
      // Detect basePath from current URL
      const basePath = window.location.pathname.startsWith('/AirpodMax') ? '/AirpodMax' : '';
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const fileName = `ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
        img.src = `${basePath}/sequence2/${fileName}`;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
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

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // Background is transparent here so we can layer it, or black? 
    // The prompt says "match background #050505"
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    if (!imagesLoaded || images.length === 0) return;

    const imgIndex = Math.min(FRAME_COUNT - 1, Math.floor(Math.max(0, index)));
    const img = images[imgIndex];
    
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const imgAspect = img.width / img.height;
    const screenAspect = w / h;
    
    let drawW, drawH;
    const scaleFactor = 0.85;

    if (screenAspect > imgAspect) {
      drawH = h * scaleFactor; // Fit Height with gap
      drawW = drawH * imgAspect;
    } else {
      drawW = w * scaleFactor; // Fit Width with gap
      drawH = drawW / imgAspect;
    }
    
    const x = (w - drawW) / 2;
    const y = (h - drawH) / 2;
    
    ctx.drawImage(img, x, y, drawW, drawH);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => renderFrame(latest));
  });
  
  useEffect(() => {
     if (imagesLoaded) renderFrame(0.1); // Render first frame
  }, [imagesLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}
