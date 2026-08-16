import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-bg-page pb-10 transition-colors duration-300">
      {/* Conteneur de référence, identique à Navbar.tsx */}
      <Container>
        <div className="flex flex-col gap-6">
          <hr className="border-t border-border-thin" />

          <div className="flex flex-col items-start justify-between gap-3 font-mono text-sm leading-[1.5] font-medium tracking-[-0.16px] text-text-secondary sm:flex-row sm:items-center md:text-base">
            <p>© 2026 Maxime Lussiana — UX/UI &amp; Motion Designer</p>
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-text-default"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}