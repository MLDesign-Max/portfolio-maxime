"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "../../types/project";

/**
 * Pastille d'accent — réservée au PREMIER tag.
 */
const ACCENT_PILL =
  "bg-bg-blue-pill border border-border-brand-pill text-text-pill-primary font-bold";

/** Pastilles 2 et 3 : neutres, jamais colorées par la donnée. */
const NEUTRAL_PILL =
  "bg-bg-pill-lighter border border-border-thin text-text-secondary font-medium";

/** Logiciel déduit du type de projet. */
const SOFTWARE: Record<ProjectData["type"], { label: string; icon?: string }> = {
  "ux-ui": { label: "Figma", icon: "/assets/software/figma.png" },
  motion: { label: "After Effects", icon: "/assets/software/after-effect.png" }
};

interface ProjectCardProps {
  project: ProjectData;
  onOpen: (project: ProjectData) => void;
  priority?: boolean;
}

export function ProjectCard({ project, onOpen, priority }: ProjectCardProps) {
  const software = SOFTWARE[project.type];
  const [accentTag, neutralTag] = project.tags;

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Voir le détail du projet ${project.title} — ${project.client}`}
      className="group flex w-full cursor-pointer flex-col text-left transition-transform duration-300 ease-out hover:-translate-y-1.5 focus-visible:-translate-y-1.5 focus-visible:outline-none"
    >
      {/* Visuel */}
      <div className="relative aspect-[384/420] w-full overflow-hidden rounded-xl border border-border-thin bg-bg-card transition-shadow duration-[450ms] ease-out group-hover:shadow-[0px_2px_36px_0px_rgba(0,72,228,0.12)] group-focus-visible:shadow-[0px_2px_36px_0px_rgba(0,72,228,0.12)]">
        <Image
          src={project.thumbnailUrl}
          alt={`Aperçu du projet ${project.title}`}
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Détail */}
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl leading-none font-medium text-text-default transition-colors duration-300 group-hover:text-brand group-focus-visible:text-brand">
            {project.title}
          </p>
          <p className="font-mono text-base leading-none text-text-secondary">
            {project.client}
          </p>
        </div>

        {/* Ligne des badges + Flèche */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {accentTag && (
              <span
                className={`flex items-center justify-center rounded-full border px-2.5 py-1.5 text-xs leading-none whitespace-nowrap ${ACCENT_PILL}`}
              >
                {accentTag.label}
              </span>
            )}

            {neutralTag && (
              <span
                className={`flex items-center justify-center rounded-full border px-2.5 py-1.5 text-xs leading-none whitespace-nowrap ${NEUTRAL_PILL}`}
              >
                {neutralTag.label}
              </span>
            )}

            <span
              className={`flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs leading-none whitespace-nowrap ${NEUTRAL_PILL}`}
            >
              {software.icon && (
                <span className="relative size-3.5 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={software.icon}
                    alt=""
                    fill
                    sizes="14px"
                    className="object-contain"
                  />
                </span>
              )}
              {software.label}
            </span>
          </div>

          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-all duration-[450ms] ease-out group-hover:bg-bg-blue-pill group-hover:text-text-pill-primary group-focus-visible:bg-bg-blue-pill group-focus-visible:text-text-pill-primary"
          >
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </button>
  );
}