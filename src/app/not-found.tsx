import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page introuvable | Maxime Lussiana",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-bg-page text-text-default px-6 text-center overflow-hidden isolate">
      {/* Grille de fond du site */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
      />

      {/* Halo de profondeur */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0048e4] opacity-10 blur-[100px]"
      />

      <div className="relative z-10 max-w-lg space-y-8">
        {/* 404 en JetBrains Mono */}
        <h1 className="text-[10rem] sm:text-[12rem] font-bold tracking-tighter text-text-default font-mono leading-none select-none">
          404
        </h1>

        {/* Textes Proposition 1 */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-text-default">
            Page introuvable.
          </h2>
          <p className="text-base sm:text-lg font-normal leading-relaxed text-[#D4D4D4] max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Bouton CTA harmonisé */}
        <div className="pt-4">
          <Link
            href="/"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-[#0048e4] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(0,72,228,0.4)]"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-[#1258f6] transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
            <span className="relative z-10 flex items-center gap-2 font-mono">
              <span>Retourner sur le site</span>
              <span
                aria-hidden
                className="font-sans text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}