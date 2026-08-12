import Link from "next/link";
import { Metadata } from "next";

// Métadonnées pour la page 404
export const metadata: Metadata = {
  title: "404 — Page introuvable | Maxime Lussiana",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0d0f12] text-white px-6 text-center relative overflow-hidden">
      
      {/* Grille de points radiale subtile (rappel démo précédente) - Sans halo central */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: `24px 24px`,
        }}
      />
      
      {/* Discret dégradé de bleu en haut (côté "dégradé" sans halo central) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none opacity-40" 
      />

      <div className="relative z-10 max-w-lg space-y-10">
        {/* Gros titre 404 en police mono */}
        <h1 className="text-[12rem] sm:text-[14rem] font-extrabold tracking-tighter text-white font-mono leading-none">
          404
        </h1>

        {/* Message d'erreur simple, harmonisé avec l'identité de Maxime */}
        <div className="space-y-4">
          <p className="text-xl sm:text-2xl font-normal text-white">
            Oups, <span className="text-blue-500">hors cadre.</span>
          </p>
          <p className="text-base sm:text-lg font-normal leading-relaxed text-neutral-400">
            La page que vous recherchez n'existe pas, a été déplacée ou n'est plus en mouvement. Ne vous inquiétez pas, <span className="text-white">retrouvons la structure.</span>
          </p>
        </div>

        {/* Bouton de retour à l'accueil */}
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-colors duration-200 shadow-xl shadow-blue-600/30"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}