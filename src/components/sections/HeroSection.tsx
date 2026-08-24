"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Layers, LayoutPanelLeft, SquarePlay } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "../ui/Container";
import { track } from "@vercel/analytics";

const CAPABILITIES = [
  {
    label: "Design Systems",
    caption: "UI Scalable & Tokenisée",
    Icon: Layers,
    iconWrapper: "bg-bg-blue-pill text-text-highlight",
    hoverStyles:
      "hover:border-[#0048e4]/60 hover:shadow-[0_0_30px_rgba(0,72,228,0.35)]",
    position: "top-[230px] right-[140px]",
    depth: 1,
    floatDelay: 0,
  },
  {
    label: "UX Design",
    caption: "Recherche, Wireframes & Tests",
    Icon: LayoutPanelLeft,
    iconWrapper: "bg-bg-yellow-pill text-text-pill-secondary",
    hoverStyles:
      "hover:border-[#ff8c00]/60 hover:shadow-[0_0_30px_rgba(255,140,0,0.35)]",
    position: "top-[385px] right-[200px]",
    depth: 1.6,
    floatDelay: 0.8,
  },
  {
    label: "Motion Design",
    caption: "After Effects, Lottie & MOGRT",
    Icon: SquarePlay,
    iconWrapper: "bg-bg-purple-pill text-text-pill-quartery",
    hoverStyles:
      "hover:border-[#a259ff]/60 hover:shadow-[0_0_30px_rgba(162,89,255,0.35)]",
    position: "top-[540px] right-[130px]",
    depth: 2.2,
    floatDelay: 1.6,
  },
];

const SPRING = { damping: 30, stiffness: 120, mass: 0.6 };

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, SPRING);
  const smoothY = useSpring(pointerY, SPRING);

  // Force le navigateur mobile à recharger la page au sommet (scroll = 0)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const handleMove = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect();
      pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
      pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    };

    const handleLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, [pointerX, pointerY]);

  const haloPrimaryX = useTransform(smoothX, (v) => v * 70);
  const haloPrimaryY = useTransform(smoothY, (v) => v * 50);
  const haloSecondaryX = useTransform(smoothX, (v) => v * -60);
  const haloSecondaryY = useTransform(smoothY, (v) => v * -45);

  const badgeX = [
    useTransform(smoothX, (v) => v * -14 * CAPABILITIES[0].depth),
    useTransform(smoothX, (v) => v * -14 * CAPABILITIES[1].depth),
    useTransform(smoothX, (v) => v * -14 * CAPABILITIES[2].depth),
  ];
  const badgeY = [
    useTransform(smoothY, (v) => v * -12 * CAPABILITIES[0].depth),
    useTransform(smoothY, (v) => v * -12 * CAPABILITIES[1].depth),
    useTransform(smoothY, (v) => v * -12 * CAPABILITIES[2].depth),
  ];

  // Fonction pour forcer le scroll SANS modifier l'URL (URL propre)
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Bloque le comportement par défaut (pas de # dans l'URL)
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate overflow-hidden bg-bg-page"
    >
      <motion.div
        aria-hidden
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.21, 0.47, 0.32, 0.98] as const,
        }}
        className="bg-grid pointer-events-none absolute inset-0 origin-center"
      />

      <motion.div
        aria-hidden
        style={{
          x: haloPrimaryX,
          y: haloPrimaryY,
          background: "radial-gradient(ellipse at top, rgba(0, 72, 228, 0.35) 0%, rgba(162, 89, 255, 0.20) 45%, transparent 75%)"
        }}
        className="pointer-events-none absolute -top-[15%] left-1/2 -z-10 h-[500px] w-[1000px] -ml-[500px] rounded-full blur-[100px]"
      />

      <motion.div
        aria-hidden
        style={{
          x: haloSecondaryX,
          y: haloSecondaryY,
          background: "radial-gradient(circle, rgba(0, 72, 228, 0.30) 0%, rgba(162, 89, 255, 0.15) 50%, transparent 80%)"
        }}
        className="pointer-events-none absolute right-[5%] top-[15%] -z-10 hidden h-[450px] w-[450px] rounded-full blur-[80px] xl:block"
      />

      <Container className="relative flex flex-col justify-start gap-6 pb-16 pt-32 sm:pt-36 md:pb-20 md:pt-[160px] lg:min-h-[818px] lg:justify-center lg:pb-24 lg:pt-[191px]">
        <div className="flex flex-col gap-6">
          
          <p
            style={{ animationDelay: "100ms" }}
            className="animate-hero-item text-[12px] font-bold uppercase leading-[1.2] tracking-[1.44px] text-text-highlight"
          >
            Freelance UX/UI &amp; Motion Designer
          </p>

          <div className="flex max-w-[740px] flex-col gap-8 md:gap-12">
            
            <h1
              className="animate-hero-title max-w-[740px] text-[32px] font-bold leading-[1.4] tracking-[-0.8px] text-text-default md:text-[40px] lg:text-[48px]"
            >
              Interfaces UX/UI, Design Systems &amp; Motion Design.
              <span className="block font-mono font-bold italic text-text-highlight">
                De la structure jusqu&apos;au mouvement.
              </span>
            </h1>

            <p
              style={{ animationDelay: "200ms" }}
              className="animate-hero-item max-w-[740px] text-base font-medium leading-[1.5] tracking-[0.36px] text-text-secondary md:text-[18px]"
            >
              <span className="block">
                Je conçois des interfaces UX/UI et Design Systems pour vos produits web,
              </span>
              <span className="block">
                et je réalise des créations en Motion Design pour vos contenus visuels.
              </span>
              <span className="block mt-1">
                Deux expertises distinctes, à mobiliser ensemble ou séparément.
              </span>
            </p>

            <div
              style={{ animationDelay: "300ms" }}
              className="animate-hero-item flex flex-wrap items-center gap-3 text-sm font-medium"
            >
              {/* CTA Principal : scroll propre + tracking */}
              <Link
                href="#contact"
                onClick={(e) => {
                  handleSmoothScroll(e, "contact");
                  track("click_cta_contact", { location: "hero" });
                }}
                className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-full border border-border-brand-btn bg-bg-action px-[22px] py-3 text-text-on-action transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,72,228,0.4)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[#1258f6] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                <span className="relative z-10 flex items-center gap-2 font-mono">
                  <span>Me contacter</span>
                  <span
                    aria-hidden
                    className="font-sans text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>

              {/* CTA Secondaire : scroll propre + tracking */}
              <Link
                href="#work"
                onClick={(e) => {
                  handleSmoothScroll(e, "work");
                  track("click_cta_work", { location: "hero" });
                }}
                className="group flex items-center justify-center gap-2 rounded-full border border-border-thin bg-bg-action-secondary px-[22px] py-3 text-text-default transition-all duration-300 hover:-translate-y-0.5 hover:border-border-thin/80"
              >
                <span className="flex items-center gap-2 font-mono">
                  <span>Voir mes réalisations</span>
                  <span
                    aria-hidden
                    className="font-sans text-lg leading-none text-icon-default transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {CAPABILITIES.map(
          (
            { label, caption, Icon, iconWrapper, hoverStyles, position, floatDelay },
            index
          ) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5 + index * 0.15,
                ease: [0.21, 0.47, 0.32, 0.98] as const,
              }}
              style={{ x: badgeX[index], y: badgeY[index] }}
              className={`absolute hidden xl:flex ${position}`}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                }}
                className={`flex items-center gap-4 rounded-full border-[0.5px] border-border-thin bg-bg-card py-3 pl-3 pr-4 shadow-sm transition-all duration-300 ${hoverStyles}`}
              >
                <span
                  className={`flex items-center rounded-full p-2 transition-transform duration-300 group-hover:scale-110 ${iconWrapper}`}
                >
                  <Icon size={24} strokeWidth={2} aria-hidden />
                </span>
                <span className="flex flex-col whitespace-nowrap leading-[1.4]">
                  <span className="text-sm font-bold text-text-default">
                    {label}
                  </span>
                  <span className="font-mono text-xs font-medium text-text-secondary">
                    {caption}
                  </span>
                </span>
              </motion.div>
            </motion.div>
          )
        )}
      </Container>
    </section>
  );
}