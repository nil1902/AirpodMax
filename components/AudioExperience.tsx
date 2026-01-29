"use client";

import React, { useRef, useState } from "react";
import { Howl } from "howler";
import { motion } from "framer-motion";

export default function AudioExperience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const noiseRef = useRef<Howl | null>(null);
  const musicRef = useRef<Howl | null>(null);

  const toggleSound = () => {
    // Initialize standard Noise
    if (!noiseRef.current) {
      noiseRef.current = new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'], // Airplane ambient
        loop: true,
        volume: 0, // Start at 0 for fade-in
        html5: true,
      });
    }

    // Initialize Beat / Music (Heavy Hip Hop / Bass Beat)
    if (!musicRef.current) {
      musicRef.current = new Howl({
        src: ['https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3'], // Heavy Rock/Drum Beat
        loop: true,
        volume: 0, 
        html5: true, 
      });
    }

    if (isPlaying) {
      // Fade out
      noiseRef.current.fade(0.1, 0, 1000); // Current vol to 0
      musicRef.current.fade(0.8, 0, 1000); // Current vol to 0
      
      setTimeout(() => {
        noiseRef.current?.pause(); // Pause instead of stop to keep buffer
        musicRef.current?.pause();
        setIsPlaying(false);
      }, 1000);
    } else {
      // Play and Fade in
      noiseRef.current.play();
      musicRef.current.play();
      
      // Fade from 0 to Target
      noiseRef.current.fade(0, 0.1, 1000); // Low volume for noise
      musicRef.current.fade(0, 0.8, 1000); // High volume for beat
      
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSound}
        className={`flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
          isPlaying 
            ? "bg-apple-blue/20 border-apple-blue text-apple-blue shadow-[0_0_20px_rgba(41,151,255,0.3)]" 
            : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
        }`}
      >
        <div className="flex gap-1 h-4 items-center">
            {[1,2,3,4,5].map(i => (
                <motion.div 
                    key={i}
                    animate={{ 
                       height: isPlaying ? [4, 16, 8, 20, 4] : 4,
                       marginBottom: isPlaying ? [0, 2, 0] : 0
                    }}
                    transition={{ 
                       repeat: Infinity, 
                       duration: 0.4, 
                       delay: i * 0.05,
                       ease: "easeInOut" 
                    }}
                    className={`w-1 rounded-full ${isPlaying ? "bg-apple-blue" : "bg-white/40"}`}
                />
            ))}
        </div>
        <div className="flex flex-col items-start text-xs">
           <span className="font-bold tracking-wide">
             {isPlaying ? "PLAYING DEMO" : "TEST AUDIO"}
           </span>
           {isPlaying && <span className="text-[10px] opacity-70">Spatial Audio On</span>}
        </div>
      </motion.button>
    </div>
  );
}
