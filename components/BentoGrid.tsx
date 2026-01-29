"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface BentoGridProps {
  progress: MotionValue<number>;
  range: [number, number];
}

export default function BentoGrid({ progress, range }: BentoGridProps) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const scale = useTransform(progress, [range[0], range[0] + 0.1], [0.8, 1]);
  const y = useTransform(progress, range, [100, -100]); // Parallax move

  return (
    <motion.div 
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 w-full max-w-6xl h-[70vh]">
        
        {/* Card 1: Main H1 Chip - Large Span */}
        <div className="md:col-span-2 row-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group">
           <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg className="w-64 h-64 text-apple-blue fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg> {/* Simulating Chip Icon */}
           </div>
           <div>
             <h3 className="text-apple-gray text-lg font-medium tracking-wide uppercase mb-2">The Brains</h3>
             <h2 className="text-5xl font-bold text-white mb-4">Apple H1 Chip.</h2>
             <p className="text-white/70 max-w-md text-lg">
                10 audio cores. Billions of operations per second. Computational audio that creates a breakthrough listening experience.
             </p>
           </div>
           <div className="flex gap-4 mt-8">
              <div className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold text-white">ADAPTIVE EQ</div>
              <div className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold text-white">ACTIVE NOISE CANCELLING</div>
           </div>
        </div>

        {/* Card 2: Battery */}
        <div className="bg-gradient-to-br from-green-500/20 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden">
           <div className="text-6xl font-bold text-green-400 mb-2">20h</div>
           <div className="text-white/60 text-sm font-medium">Listening Time</div>
           <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
             <div className="w-[80%] h-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
           </div>
        </div>

        {/* Card 3: Sensors */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between group">
           <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-white">Sensors</h3>
              <div className="w-2 h-2 rounded-full bg-apple-blue animate-pulse" />
           </div>
           <div className="space-y-2 text-sm text-white/60">
              <div className="flex justify-between border-b border-white/5 pb-1"><span>Optical sensor</span><span>x2</span></div>
              <div className="flex justify-between border-b border-white/5 pb-1"><span>Position sensor</span><span>x3</span></div>
              <div className="flex justify-between border-b border-white/5 pb-1"><span>Case-detect</span><span>x1</span></div>
              <div className="flex justify-between"><span>Accelerometer</span><span>x2</span></div>
           </div>
        </div>

      </div>
    </motion.div>
  );
}
