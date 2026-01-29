"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useTransform, MotionValue } from "framer-motion";

interface HotspotProps {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  label: string;
  description: string;
}

interface HotspotLayerProps {
  progress: MotionValue<number>;
}

const hotspots: HotspotProps[] = [
  { x: 35, y: 40, label: "V1 Processor", description: "Integrated Processor V1 unlocks the full potential of our HD Noise Cancelling Processor QN1." },
  { x: 65, y: 45, label: "Soft Fit Leather", description: "Soft fit leather ensures comfort and high sound insulation." },
  { x: 50, y: 65, label: "30mm Driver", description: "Specialty designed 30mm driver unit with soft edge enhances noise cancelling." },
];

export default function HotspotLayer({ progress }: HotspotLayerProps) {
  // Only show hotspots during the "Engineering Reveal" (approx 0.15 to 0.40) 
  // and "Noise Cancelling" (0.40 to 0.65) phases when components are exploded.
  
  // We transform opacity so they fade in/out smoothly
  const opacity = useTransform(progress, [0.25, 0.3, 0.6, 0.65], [0, 1, 1, 0]);
  const pointerEvents = useTransform(progress, (v) => (v > 0.25 && v < 0.65 ? "auto" : "none"));

  return (
    <motion.div 
      className="absolute inset-0 z-20"
      style={{ opacity, pointerEvents }}
    >
      {hotspots.map((spot, i) => (
        <Hotspot key={i} {...spot} />
      ))}
    </motion.div>
  );
}

function Hotspot({ x, y, label, description }: HotspotProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
        >
           {/* Pulsing rings */}
           <span className="absolute inline-flex h-full w-full rounded-full bg-apple-cyan opacity-20 animate-ping" />
           <span className="relative inline-flex rounded-full h-3 w-3 bg-apple-cyan shadow-[0_0_10px_#0077ED] group-hover:scale-150 transition-transform duration-300" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              className="absolute left-1/2 -translate-x-1/2 mt-4 w-64 bg-apple-black/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl text-left"
            >
              <h4 className="text-sm font-bold text-white mb-1">{label}</h4>
              <p className="text-xs text-white/70 leading-relaxed">{description}</p>
              
              {/* Connector Line */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-apple-black/90" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
