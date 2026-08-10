"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Position brute du curseur
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physique de suivi pour le grand cercle (effet d'inertie fluide)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Ne pas exécuter sur les appareils tactiles
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block overflow-hidden">
      {/* Grand cercle suiveur avec inertie */}
      <motion.div
        className="fixed size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/60 bg-brand/10 backdrop-blur-[1px]"
        style={{
          left: smoothX,
          top: smoothY,
        }}
      />

      {/* Point central (suit instantanément la pointe) */}
      <motion.div
        className="fixed size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />
    </div>
  );
}