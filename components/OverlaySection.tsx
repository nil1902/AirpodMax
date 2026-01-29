"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface OverlaySectionProps {
  progress: MotionValue<number>;
  range: [number, number]; // [start, end] of the global scroll (0-1)
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  id?: string;
  type?: "text" | "card"; // Simple text or Glass Card
}

export default function OverlaySection({ 
  progress, 
  range, 
  children, 
  align = "center",
  className,
  type = "text",
  id
}: OverlaySectionProps) {
  
  // Adjusted for sharper entry/exit and longer reading time
  const fadeDuration = 0.02; // Very quick fade in/out
  const startIn = range[0];
  const endIn = range[0] + fadeDuration;
  const startOut = range[1] - fadeDuration;
  const endOut = range[1];

  // Opacity: Fade in quickly, stay 1, fade out quickly
  const opacity = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    [0, 1, 1, 0]
  );
  
  // Slide effect based on alignment
  // If Left: Slide in from left (-50 -> 0 -> -50)
  // If Right: Slide in from right (50 -> 0 -> 50)
  // If Center: Slide up (50 -> 0 -> -50)
  const x = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    align === "left" ? [-100, 0, 0, -100] : 
    align === "right" ? [100, 0, 0, 100] : 
    [0, 0, 0, 0]
  );

  const y = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    align === "center" ? [100, 0, 0, -100] : [0, 0, 0, 0]
  );
  
  // Blur effect for "cinematic" focus
  const blur = useTransform(
    progress,
    [startIn, endIn, startOut, endOut],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
  );

  const alignmentClasses = {
    left: "items-start justify-center px-6 md:pl-24 md:pr-[50%]", 
    center: "items-center justify-center px-6",
    right: "items-end justify-center px-6 md:pr-24 md:pl-[50%]", 
  };

  return (
    <motion.div
      id={id}
      style={{ opacity, x, y, filter: blur, pointerEvents: "none" }} 
      className={cn(
        "absolute inset-0 flex flex-col pointer-events-none z-10",
        alignmentClasses[align],
        className
      )}
    >
      <div className={cn(
        "pointer-events-auto",
        type === "card" && "bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
      )}>
        {children}
      </div>
    </motion.div>
  );
}
