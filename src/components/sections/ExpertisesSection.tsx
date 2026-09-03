"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Container } from "../ui/Container";
import { TextReveal } from "../ui/animations/TextReveal";

const PILL_STYLES = [
  "bg-bg-blue-pill border-border-brand-pill-lighter text-text-pill-primary",
  "bg-bg-yellow-pill border-border-yellow-pill-lighter text-text-pill-secondary",
  "bg-bg-cyan-pill border-border-cyan-pill-lighter text-text-pill-tertiary",
  "bg-bg-purple-pill border-border-purple-pill-lighter text-text-pill-quartery",
];

interface Expertise {
  title: string;
  description: string;
  visual: string;
  picto: string;
  pills: string[];
}

const EXPERTISES: Expertise[] = [
  {
    title: "UX/UI Design",
    description:
      "Je structure l’information et conçois des interfaces claires qui guident naturellement vos utilisateurs. Du prototype interactif au design system, je crée des expériences cohérentes et efficaces.",
    visual: "/assets/expertises/ux-ui-design.png",
    picto: "/assets/software/figma-square.png",
    pills: ["Wireframe", "Design system", "Responsive", "Prototypage"],
  },
  {
    title: "Motion Design",
    description:
      "Je conçois des animations sur-mesure pour donner de la vie et du rythme à votre communication. De l'animation de marque aux contenus réseaux sociaux et templates vidéo, je transforme vos messages en visuels percutants.",
    visual: "/assets/expertises/motion-design.png",
    picto: "/assets/software/after-effects.png",
    pills: ["Brand Animation", "Social Media", "Lottie", "Template MOGRT"],
  },
];

const SERVICES = [
  {
    label: "01 / Architecture",
    title: "Design Systems",
    description:
      "Tokens UI, composants Figma réutilisables et documentation claire pour un handoff fluide avec les développeurs.",
  },
  {
    label: "02 / Ergonomie",
    title: "UX & Wireframing",
    description:
      "User flows, wireframes et prototypes interactifs pensés pour structurer les parcours et garantir une navigation intuitive.",
  },
  {
    label: "03 / Dynamisme",
    title: "Micro-interactions",
    description:
      "Micro-animations, animations Lottie légères et états interactifs pour guider l'attention et donner du relief aux interfaces.",
  },
  {
    label: "04 / Branding",
    title: "Motion Branding",
    description:
      "Vidéos de présentation produit, contenus réseaux sociaux et habillages animés sur-mesure pour affirmer votre identité de marque.",
  },
];

// --- VARIANTES FRAMER MOTION ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Animation des grandes cartes (UX/UI & Motion) */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

/** Animation STRICTEMENT UNIQUE : Pure opacité (0 -> 1) */
const serviceCardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

function ExpertiseCard({ expertise }: { expertise: Expertise }) {
  return (
    <motion.article
      variants={itemVariants}
      /* Changement ici : hover:border-border-brand-card */
      className="group flex flex-col overflow-hidden rounded-3xl border border-border-thin bg-bg-card transform-gpu transition-colors duration-300 hover:border-border-brand-card"
    >
      <div className="p-4 pb-0">
        <div className="relative aspect-[556/292] w-full overflow-hidden rounded-[10px]">
          <Image
            src={expertise.visual}
            alt={`Aperçu ${expertise.title}`}
            fill
            sizes="(min-width: 1024px) 556px, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-6 px-6 py-6 pt-4">
        <div className="flex flex-col gap-3">
          <Image
            src={expertise.picto}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-lg"
          />
          <h3 className="text-2xl leading-none font-bold text-text-default md:text-[28px]">
            {expertise.title}
          </h3>
        </div>

        <p className="text-base leading-[1.5] font-medium text-text-secondary">
          {expertise.description}
        </p>

        <ul className="flex flex-wrap items-center gap-2">
          {expertise.pills.map((pill, index) => (
            <li
              key={pill}
              className={`flex items-center justify-center rounded-full border px-3 py-2 text-xs leading-none font-medium whitespace-nowrap ${PILL_STYLES[index % PILL_STYLES.length]}`}
            >
              {pill}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function ExpertisesSection() {
  return (
    <section id="expertises" className="relative isolate overflow-hidden bg-bg-page py-16 md:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[15%] left-[-5%] -z-10 h-[500px] w-[500px] transform-gpu rounded-full bg-[#0048e4] opacity-[0.18] blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[15%] right-[-5%] -z-10 h-[500px] w-[500px] transform-gpu rounded-full bg-[#a259ff] opacity-[0.16] blur-[150px]"
      />
      <Container>
        {/* Heading avec saut à la ligne avant "l'alliance" et minuscules */}
        <div className="flex flex-col gap-4">
          <h2 className="flex flex-col gap-1 text-[28px] leading-[1.2] font-bold tracking-[-0.4px] text-text-default md:text-[34px] lg:text-[40px]">
            <div className="flex flex-wrap items-center gap-x-3">
              <TextReveal text="UX/UI & Motion Design :" />
            </div>
            <div className="flex flex-wrap items-center gap-x-3">
              <TextReveal text="l'alliance" delay={0.1} />
              <TextReveal text="de la" delay={0.15} />
              <span className="font-mono font-bold text-text-highlight">
                <TextReveal text="structure" delay={0.2} />
              </span>
              <TextReveal text="et du" delay={0.25} />
              <span className="font-mono font-bold text-text-highlight">
                <TextReveal text="mouvement" delay={0.3} />
              </span>
            </div>
          </h2>

          <p className="max-w-[900px] text-base leading-[1.5] font-medium tracking-[-0.09px] text-text-secondary md:text-[18px]">
            Je combine design d&apos;interface et motion design pour créer des
            expériences digitales complètes.
            <br className="hidden sm:block" />
            De la structure à l&apos;animation, chaque détail est pensé pour guider
            vos utilisateurs et valoriser votre marque.
          </p>
        </div>

        {/* Grille principale (UX/UI & Motion) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {EXPERTISES.map((expertise) => (
            <ExpertiseCard key={expertise.title} expertise={expertise} />
          ))}
        </motion.div>

        {/* Grille secondaire : Cartes services (01 à 04) - Fondu unique instantané */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.title}
              variants={serviceCardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-start gap-6 rounded-xl border border-border-thin bg-bg-card p-6 transform-gpu transition-colors duration-300 hover:border-border-brand-card"
            >
              <span className="flex w-fit items-center justify-center rounded-full bg-bg-brand-pill px-2 py-1.5 font-mono text-[10px] leading-none font-bold uppercase whitespace-nowrap text-text-pill-primary transition-colors duration-300">
                {service.label}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg leading-none font-bold text-text-default">
                  {service.title}
                </h3>
                <p className="text-sm leading-[1.5] font-medium text-text-secondary">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}