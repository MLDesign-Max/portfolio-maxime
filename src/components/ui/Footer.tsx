import React from "react";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-bg-page pb-10">
      {/* Conteneur de référence, identique à Navbar.tsx. */}
      <Container>
        <div className="flex flex-col gap-6">
          <hr className="border-t border-border-thin" />

          <div className="flex flex-col items-start justify-between gap-2 font-mono text-sm leading-[1.5] font-medium tracking-[-0.16px] text-text-secondary sm:flex-row sm:items-center md:text-base">
            <p>© 2026 Maxime Lussiana</p>
            <p>UX/UI &amp; Motion Designer</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
