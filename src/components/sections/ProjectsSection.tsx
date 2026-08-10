"use client";

import * as React from "react";
import { useState } from "react";
import { ProjectCard } from "../projects/ProjectCard";
import { ProjectModal } from "../ui/ProjectModal";
import projects from "../../data/projects.json";
import type { ProjectData } from "../../types/project";
import { Container } from "../ui/Container";
import { TextReveal } from "../ui/animations/TextReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "../ui/animations/StaggerContainer";

const PROJECTS = projects as ProjectData[];

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  return (
    <section id="work" className="relative isolate overflow-hidden bg-bg-page py-16 md:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[80px] left-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#0048e4] opacity-[0.20] blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[25%] right-[-10%] -z-10 h-[700px] w-[600px] rounded-full bg-[#a259ff] opacity-[0.16] blur-[180px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[15%] left-[-10%] -z-10 h-[450px] w-[500px] rounded-full bg-[#0048e4] opacity-[0.14] blur-[180px]"
      />
      <Container>
        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h2 className="flex flex-wrap items-center gap-x-3 text-[32px] leading-[1.2] font-bold tracking-[-0.48px] text-text-default md:text-[40px] lg:text-[48px]">
            <TextReveal text="Mes" />
            <span className="font-mono font-bold text-text-highlight">
              <TextReveal text="réalisations" delay={0.15} />
            </span>
          </h2>
          <p className="max-w-[620px] text-base leading-[1.6] tracking-[-0.09px] text-text-secondary md:text-[18px]">
            <span className="block">
              Une sélection de projets récents en UX/UI et Motion Design.
            </span>
            <span className="block">
              Des cas d&apos;études détaillés, du problème initial jusqu&apos;au résultat final.
            </span>
          </p>
        </div>

        {/* Grille : chaque carte s'anime indépendamment quand elle apparaît */}
        <StaggerContainer className="mt-12 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:mt-[72px] xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <StaggerItem key={project.id} index={index}>
              <ProjectCard
                project={project}
                onOpen={setActiveProject}
                priority={index < 3}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}