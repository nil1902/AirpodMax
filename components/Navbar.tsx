"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setHidden(false);
      setScrolled(true);
    } else {
      setHidden(true);
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: hidden ? 0 : 1, 
        y: hidden ? -20 : 0 
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300",
        scrolled ? "bg-apple-black/75 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-medium tracking-tight text-white/90 flex items-center gap-2">
           <svg className="w-5 h-5 fill-current" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
        </Link>
        <span className="text-white/40 text-sm font-light">|</span>
        <a href="#" className="flex items-center gap-2 group">
           <span className="text-xl font-semibold tracking-tight text-white group-hover:text-apple-blue transition-colors">AirPods Max</span>
        </a>
      </div>

      {/* Center: Links */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          {["Overview", "Audio Tech", "Specs", "Compare"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
      </div>

      {/* Right: CTA */}
      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
          Buy
        </button>
      </div>
    </motion.nav>
  );
}
