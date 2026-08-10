"use client";

import { motion } from "framer-motion";
import * as React from "react";

export interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({
  children,
  className = "",
}: StaggerContainerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  children,
  className = "",
  index = 0,
}: StaggerContainerProps & { index?: number }) {
  // Petit décalage horizontal (ex: colonne 0, 1, 2)
  const columnIndex = index % 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: columnIndex * 0.1, // Cascade uniquement entre les cartes de la même ligne
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}