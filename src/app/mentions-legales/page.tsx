import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Maxime Lussiana",
  description:
    "Mentions légales et informations réglementaires du site maximelussiana.fr",
};

export default function MentionsLegales() {
  return (
    <main className="relative min-h-screen bg-bg-page text-text-default pt-24 pb-20 px-6 isolate transition-colors duration-300">
      {/* Grille de fond pour la continuité visuelle */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
      />

      <div className="max-w-3xl mx-auto w-full space-y-10">
        {/* Bouton retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-text-default transition-colors"
        >
          <span aria-hidden>←</span> Retour à l'accueil
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-text-default tracking-tight">
          Mentions Légales
        </h1>

        <div className="space-y-10 text-text-secondary text-sm sm:text-base leading-relaxed">
          {/* 1. Éditeur du site */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-default">1. Éditeur du site</h2>
            <p>
              Le site <strong className="text-text-default">maximelussiana.fr</strong> est édité par :
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li><strong className="text-text-default">Nom / Prénom :</strong> Maxime Lussiana</li>
              <li><strong className="text-text-default">Statut :</strong> Entrepreneur Individuel (Freelance UX/UI & Motion Designer)</li>
              <li><strong className="text-text-default">SIRET :</strong> 880 689 252 00018</li>
              <li><strong className="text-text-default">Email :</strong> contact@maximelussiana.fr</li>
              <li><strong className="text-text-default">Directeur de la publication :</strong> Maxime Lussiana</li>
            </ul>
          </section>

          {/* 2. Hébergement */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-default">2. Hébergement</h2>
            <p>
              Le site est hébergé par la société <strong className="text-text-default">Vercel Inc.</strong> :
            </p>
            <p>
              Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              Site web :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-highlight hover:underline font-medium"
              >
                https://vercel.com
              </a>
            </p>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-default">3. Propriété intellectuelle</h2>
            <p>
              L’ensemble des contenus présents sur ce site (textes, créations visuelles, designs d’interfaces, animations motion, logos) sont la propriété exclusive de Maxime Lussiana, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.
            </p>
          </section>

          {/* 4. Données personnelles */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-default">4. Données personnelles & Cookies</h2>
            <p>
              Les informations transmises via le formulaire de contact servent uniquement à répondre aux demandes de devis ou de renseignement. Aucune donnée n’est cédée ni vendue à des tiers.
            </p>
            <p>
              Ce site n’utilise aucun cookie publicitaire ou de traçage nécessitant le consentement préalable de l’utilisateur.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}