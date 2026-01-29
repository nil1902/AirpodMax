"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Navbar from "./Navbar";
import ScrollSequence from "./ScrollSequence";
import ScrollSequenceTwo from "./ScrollSequenceTwo";
import OverlaySection from "./OverlaySection";
import HotspotLayer from "./HotspotLayer";
import AudioExperience from "./AudioExperience";
import LoadingScreen from "./LoadingScreen";
import BentoGrid from "./BentoGrid";
import { ImagePreloader } from "@/lib/imagePreloader";

export default function Experience() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all images on mount
  useEffect(() => {
    const preloadAllImages = async () => {
      const preloader = new ImagePreloader();
      
      // Generate paths for both sequences
      const sequence1Paths = ImagePreloader.generateFramePaths("sequence", 240);
      const sequence2Paths = ImagePreloader.generateFramePaths("sequence2", 240);
      
      const allPaths = [...sequence1Paths, ...sequence2Paths];

      try {
        await preloader.preloadImages(
          allPaths,
          (progress) => {
            setLoadProgress(progress.percentage);
          },
          15 // Load 15 images in parallel for optimal performance
        );
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadAllImages();
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  // -- Sequence Logic --
  // Part 1: Explosion (0 to 0.45)
  // GAP: 0.45 to 0.55 (Static Black / Transition)
  // Part 2: Lifestyle/Views (0.55 to 1.0)

  const seq1Progress = useTransform(scrollYProgress, [0, 0.45], [0, 1]); // Ends at 0.45
  const seq2Progress = useTransform(scrollYProgress, [0.55, 1], [0, 1]); // Starts at 0.55
  
  // Opacity: Fade out Seq 1 by 0.45, Fade in Seq 2 at 0.55
  const seq1Opacity = useTransform(scrollYProgress, [0.40, 0.45], [1, 0]);
  const seq2Opacity = useTransform(scrollYProgress, [0.55, 0.60], [0, 1]);
  
  const seq1PointerEvents = useTransform(scrollYProgress, (v) => v < 0.45 ? "auto" : "none");

  // Parallax Canvas Shift (Modified for gap)
  const canvasX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.45, 0.55, 0.75, 1],
    ["0%", "0%", "15%", "0%", "0%", "-15%", "0%"]
  );

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      {/* Main Experience */}
      <div ref={containerRef} className="relative h-[1200vh] bg-apple-black">
      <Navbar />
      <AudioExperience />

      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* -- SEQUENCE 1 WRAPPER -- */}
        <motion.div 
           style={{ x: canvasX, opacity: seq1Opacity, pointerEvents: seq1PointerEvents }}
           transition={{ type: "spring", stiffness: 40, damping: 20 }}
           className="absolute inset-0 z-0"
        >
           <ScrollSequence progress={seq1Progress} />
           <div className="absolute inset-0 bg-radial-gradient from-transparent via-apple-black/30 to-apple-black pointer-events-none" />
           {/* Hotspots only for Sequence 1 */}
           <HotspotLayer progress={seq1Progress} />
        </motion.div>

        {/* -- SEQUENCE 2 WRAPPER -- */}
        <motion.div 
           style={{ x: canvasX, opacity: seq2Opacity }}
           className="absolute inset-0 z-0"
        >
           <ScrollSequenceTwo progress={seq2Progress} />
           <div className="absolute inset-0 bg-radial-gradient from-transparent via-apple-black/30 to-apple-black pointer-events-none" />
        </motion.div>
        
        {/* Floating Particles/Stars Background - Continuous */}
        <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
           <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
           <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-apple-blue rounded-full blur-[2px]" />
           <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-apple-cyan rounded-full shadow-[0_0_15px_cyan]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue/5 rounded-full blur-[150px] -z-10" />
        </div>

        {/* --- PART 1 CONTENT : ENGINEERING (0 - 45%) --- */}

        {/* --- PART 1 CONTENT : ENGINEERING (0 - 45%) --- */}

        {/* 1. HERO / INTRO (0 - 10%) */}
        <OverlaySection id="overview" progress={scrollYProgress} range={[0, 0.10]} align="center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
             <h3 className="text-yellow-400 font-mono text-sm md:text-xl tracking-[0.3em] uppercase mb-4">
                The Ultimate Listening Experience
             </h3>
             <h1 className="text-5xl md:text-9xl font-[family-name:var(--font-orbitron)] font-bold tracking-tighter mb-4 text-white uppercase transform scale-y-110">
               AirPods Max
             </h1>
             <h2 className="text-xl md:text-4xl font-light text-green-400 mb-8 tracking-wide font-mono">
               COMPUTATIONAL <span className="text-white">AUDIO.</span>
             </h2>
             <motion.div 
                className="text-white/60 text-xs md:text-sm tracking-[0.2em] border border-white/20 rounded-none px-6 py-2 inline-block backdrop-blur-sm uppercase font-mono hover:bg-white/10 transition-colors"
             >
                Scroll to Disassemble
             </motion.div>
          </motion.div>
        </OverlaySection>

        {/* 2. ENGINEERING / BUILD (15 - 25%) */}
        <OverlaySection id="audio-tech" progress={scrollYProgress} range={[0.15, 0.25]} align="left" type="card">
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-orbitron)] font-bold mb-6 leading-none text-white">
            UNCOMPROMISED <br /> <span className="text-yellow-400">BUILD.</span>
          </h2>
          <div className="space-y-6 text-base md:text-lg font-mono text-white/80">
            <p className="border-l-2 border-green-500 pl-4">
              Stainless steel frame wrapped in soft-to-the-touch material for a remarkable combination of strength, flexibility, and comfort.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-4">
               <div>
                  <h4 className="text-4xl font-bold text-white mb-1">H1</h4>
                  <span className="text-xs text-green-400 uppercase tracking-widest">Apple Silicon</span>
               </div>
               <div>
                  <h4 className="text-4xl font-bold text-white mb-1">10</h4>
                  <span className="text-xs text-yellow-400 uppercase tracking-widest">Audio Cores</span>
               </div>
            </div>
          </div>
        </OverlaySection>

        {/* 3. NOISE CANCELLING (30 - 40%) */}
        <OverlaySection progress={scrollYProgress} range={[0.30, 0.40]} align="right" type="card">
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-orbitron)] font-bold mb-6 text-green-400">
            SILENCE <br/> <span className="text-white">IS GOLDEN.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-6 font-mono leading-relaxed">
             Six outward-facing microphones detect noise from your environment. Two inward-facing microphones measure what you’re hearing.
          </p>
          <ul className="space-y-4 text-sm font-bold font-mono text-white uppercase tracking-wider">
             <li className="flex items-center justify-end gap-3 group">
                <span className="group-hover:text-yellow-400 transition-colors">Active Noise Cancellation</span>
                <div className="w-2 h-2 bg-green-500 rounded-none transform rotate-45" />
             </li>
             <li className="flex items-center justify-end gap-3 group">
                <span className="group-hover:text-yellow-400 transition-colors">Transparency Mode</span>
                <div className="w-2 h-2 bg-transparent border border-green-500 rounded-none transform rotate-45" />
             </li>
          </ul>
        </OverlaySection>

        {/* 4. SOUND & SPATIAL AUDIO (38 - 44%) */}
        <OverlaySection progress={scrollYProgress} range={[0.38, 0.44]} align="left" type="card">
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-orbitron)] font-bold mb-6 tracking-tight text-white">
            SPATIAL <span className="text-yellow-400">AUDIO.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-4 font-mono font-light leading-relaxed border-l-4 border-yellow-400 pl-4">
             Theater-like sound that surrounds you. Dynamic head tracking places sounds all around you for an immersive listening experience.
          </p>
          <div className="flex items-center gap-4 text-green-400 font-mono font-bold mt-6 uppercase tracking-widest">
              <span className="animate-pulse text-2xl">●</span>
              <span>Dolby Atmos Ready</span>
           </div>
        </OverlaySection>

        {/* --- INTERMISSION / TRANSITION GAP (50% - 58%) --- */}
        <OverlaySection progress={scrollYProgress} range={[0.50, 0.58]} align="center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, rotateX: 90 }}
             whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
             transition={{ duration: 1.2, ease: "circOut" }}
             className="text-center"
           >
              <h3 className="text-sm md:text-lg font-mono text-green-500 tracking-[0.5em] uppercase mb-6">
                 Orchestrated for Comfort
              </h3>
              <h2 className="text-4xl md:text-8xl font-[family-name:var(--font-orbitron)] font-bold text-white uppercase tracking-tighter leading-none">
                 The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">Perfect</span> Fit.
              </h2>
           </motion.div>
        </OverlaySection>


        {/* --- PART 2 CONTENT : LIFESTYLE (50 - 100%) --- */}
        
        {/* 5. COMFORT (65 - 73%) */}
        <OverlaySection id="specs" progress={scrollYProgress} range={[0.65, 0.73]} align="right" type="card">
           <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-orbitron)] font-bold mb-4 text-white">
             RADICAL <br /> <span className="text-green-400">COMPOSITION.</span>
           </h2>
           <p className="text-lg md:text-lg text-white/70 mb-6 font-mono border-l-2 border-yellow-400 pl-4">
             The breathable knit mesh canopy distributing weight to reduce on-head pressure.
           </p>
           <div className="grid grid-cols-2 gap-4 text-center font-mono">
              <div className="bg-white/5 rounded-none p-3 backdrop-blur-sm border border-white/10 hover:border-yellow-400 transition-colors">
                 <div className="text-2xl font-bold text-white">Mesh</div>
                 <div className="text-xs uppercase tracking-wider text-green-400">Canopy</div>
              </div>
              <div className="bg-white/5 rounded-none p-3 backdrop-blur-sm border border-white/10 hover:border-yellow-400 transition-colors">
                 <div className="text-2xl font-bold text-white">Memory</div>
                 <div className="text-xs uppercase tracking-wider text-green-400">Foam Earcups</div>
              </div>
           </div>
        </OverlaySection>

        {/* 6. BENTO GRID (REPLACING BATTERY) (78 - 86%) */}
        <BentoGrid progress={scrollYProgress} range={[0.78, 0.86]} />

        {/* 7. CONNECTIVITY / CTA (90 - 100%) */}
        <OverlaySection id="compare" progress={scrollYProgress} range={[0.90, 1.0]} align="center">
          <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.5 }}
          >
             <h2 className="text-5xl md:text-9xl font-[family-name:var(--font-orbitron)] font-bold tracking-tighter mb-8 text-white uppercase">
               AirPods Max
             </h2>
             
             <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <button 
                   onClick={() => window.open('https://www.apple.com/shop/product/MGYL3AM/A/airpods-max-silver', '_blank')}
                   className="group relative px-12 py-6 bg-yellow-400 text-black font-[family-name:var(--font-orbitron)] font-bold text-xl overflow-hidden hover:scale-105 transition-transform duration-300 clip-path-polygon cursor-pointer"
                >
                   <span className="relative z-10">BUY $549</span>
                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-50 transition-opacity" />
                </button>
                <button 
                   onClick={() => window.open('https://www.apple.com/airpods-max/', '_blank')}
                   className="text-green-400 hover:text-white transition-colors flex items-center gap-2 font-mono tracking-widest uppercase cursor-pointer"
                >
                   Watch the film <span className="text-xl">›</span>
                </button>
             </div>
          </motion.div>
        </OverlaySection>
      </div>
      
      {/* Scroll Indicator at bottom of first section */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/20 text-xs tracking-widest uppercase">
        Scroll to Explore
      </div>
    </div>
    </>
  );
}
