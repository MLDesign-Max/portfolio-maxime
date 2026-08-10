"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectData } from "../../types/project";

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

interface ProjectModalProps {
  /** `null` = fermée. La modale est démontée, donc la vidéo aussi (SPEC §3.6). */
  project: ProjectData | null;
  onClose: () => void;
}

/** Une des 4 colonnes de métadonnées sous le titre. */
function MetaColumn({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col justify-center gap-1">
      <span className="font-mono text-xs uppercase text-text-secondary md:text-sm lg:text-[18px] lg:leading-[1.4]">
        {label}
      </span>
      <span className="text-sm font-bold text-text-default md:text-base lg:text-[18px] lg:leading-[1.4]">
        {value}
      </span>
    </div>
  );
}

function ProjectMedia({ project }: { project: ProjectData }) {
  const { media, title } = project;

  if (media.type === "video") {
    return (
      <video
        src={media.url}
        poster={media.posterUrl}
        autoPlay
        muted
        loop
        playsInline
        controls
        className="size-full object-cover"
      />
    );
  }

  const src =
    media.type === "lottie" ? media.posterUrl : media.url;
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={`Aperçu du projet ${title}`}
      fill
      sizes="(min-width: 1080px) 984px, 100vw"
      loading="lazy"
      className="object-cover"
    />
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = project !== null;

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => restoreFocusRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[80] overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Panneau */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="relative my-8 md:my-12 flex w-full max-w-[1080px] flex-col rounded-lg md:rounded-2xl bg-bg-card shadow-2xl overflow-hidden"
          >

            {/* En-tête fixe */}
            <div className="px-6 pt-6 md:px-8 lg:px-12 lg:pt-10">
              <div className="flex items-center gap-4">
                <h2
                  id="project-modal-title"
                  className="min-w-0 flex-1 text-[22px] leading-[1.4] font-bold tracking-[-0.8px] text-text-default md:text-[34px] lg:text-[48px]"
                >
                  {project.title}
                </h2>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg-brand-pill text-text-highlight transition-all duration-300 ease-out hover:bg-brand hover:text-white focus-visible:bg-brand focus-visible:text-white md:size-14"
                >
                  <X size={24} strokeWidth={2.5} aria-hidden />
                </button>
              </div>

              {/* Trait de séparation */}
              <div className="mt-6 w-full border-b border-border-thin md:mt-8" />
            </div>

            {/* Corps de la modale */}
            <div className="flex flex-col px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16 lg:px-12 lg:pt-8 lg:pb-20">
              {/* Métadonnées — 4 colonnes */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:w-full sm:items-start sm:justify-between mb-6 md:mb-8">
                <MetaColumn label="Client" value={project.client} />
                <MetaColumn label="Rôle" value={project.role} />
                <MetaColumn label="Secteur" value={project.sector} />
                <MetaColumn label="Année" value={project.year} />
              </div>

              {/* Média */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-bg-brand-pill mb-10 md:mb-14">
                <ProjectMedia project={project} />
              </div>

              {/* Étapes — liste verticale */}
              <ol className="flex flex-col gap-10">
                {project.steps.map((step) => (
                  <li key={step.number} className="flex items-start gap-6">
                    <span className="flex shrink-0 items-center justify-center rounded-full border border-border-brand-pill bg-bg-brand-pill px-3 py-3.5 font-mono text-sm leading-none font-bold uppercase text-text-highlight lg:text-[18px]">
                      {step.number}
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 pt-2 lg:gap-4">
                      <h3 className="font-mono text-base leading-none font-bold uppercase text-text-highlight md:text-xl lg:text-2xl">
                        {step.title}
                      </h3>
                      <p
                        className="whitespace-pre-line text-sm font-medium md:text-base lg:text-[18px] leading-[1.6] tracking-[0.2px] text-text-secondary [&_b]:font-bold [&_b]:text-text-default"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    </div>
                  </li>
                ))}
              </ol>

              {/* CTA Tertiaire — Retour aux réalisations */}
              <div className="mt-12 md:mt-16 pt-8 border-t border-border-thin flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="group flex items-center gap-2 font-mono text-sm md:text-base font-bold text-text-secondary transition-all duration-300 hover:text-text-highlight cursor-pointer"
                >
                  <span
                    aria-hidden
                    className="font-sans text-lg leading-none transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  <span>Retour aux réalisations</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}