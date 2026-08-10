"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Mots-clés du ticker, repris de SPEC.MD §3.4.
 * La maquette Figma (node 100:38087) n'est qu'un arrêt sur image du défilement
 * et n'en montre que 4 — la SPEC fait foi pour le contenu, Figma pour le style.
 */
const KEYWORDS = [
  "Design systems",
  "Micro-interactions",
  "Prototypes interactifs",
  "Landing pages",
  "Motion Design",
];

/** Une copie de la liste. `pr-8` reproduit le gap avant la copie suivante. */
function KeywordRun({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-4 pr-4 md:gap-6 md:pr-6 lg:gap-8 lg:pr-8"
    >
      {KEYWORDS.map((keyword) => (
        <li key={keyword} className="flex items-center gap-4 md:gap-6 lg:gap-8">
          {keyword}
          <span aria-hidden className="not-italic">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TickerBanner() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.section
      aria-label="Domaines d'expertise"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: 0.6, // Décalage pour laisser la HeroSection terminer son apparition
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="overflow-hidden border-y border-border-thin bg-bg-card"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex w-max cursor-pointer py-6 font-mono text-[20px] font-light italic leading-[1.2] tracking-[1.28px] whitespace-nowrap text-primary-400 md:text-[26px] lg:text-[32px]"
      >
        {/* Conteneur gérant le défilement infini et le ralentissement au survol */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isHovered ? 45 : 22,
              ease: "linear",
            },
          }}
          className="flex shrink-0"
        >
          <KeywordRun />
          <KeywordRun hidden />
        </motion.div>
      </div>
    </motion.section>
  );
}