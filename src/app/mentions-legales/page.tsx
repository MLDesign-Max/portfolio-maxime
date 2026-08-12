import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Maxime Lussiana",
  description: "Mentions légales et informations réglementaires du site maximelussiana.fr",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-neutral-300 px-6 py-20 max-w-4xl mx-auto space-y-12">
      <Link 
        href="/"
        className="inline-flex items-center text-sm font-mono text-blue-400 hover:underline"
      >
        ← Retour à l'accueil
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Mentions Légales
      </h1>

      {/* Éditeur du site */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">1. Éditeur du site</h2>
        <p className="text-sm leading-relaxed text-neutral-400">
          Le site <strong className="text-neutral-200">maximelussiana.fr</strong> est édité par :
        </p>
        <ul className="text-sm space-y-1 text-neutral-400 list-disc list-inside">
          <li><strong>Nom / Prénom :</strong> Maxime Lussiana</li>
          <li><strong>Statut :</strong> Entrepreneur Individuel (Freelance UX/UI & Motion Designer)</li>
          <li><strong>SIRET :</strong> [Ton numéro SIRET ici]</li>
          <li><strong>Email :</strong> contact@maximelussiana.fr</li>
          <li><strong>Directeur de la publication :</strong> Maxime Lussiana</li>
        </ul>
      </section>

      {/* Hébergement */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">2. Hébergement</h2>
        <p className="text-sm leading-relaxed text-neutral-400">
          Le site est hébergé par la société <strong className="text-neutral-200">Vercel Inc.</strong> :
        </p>
        <p className="text-sm text-neutral-400">
          Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
          Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://vercel.com</a>
        </p>
      </section>

      {/* Propriété intellectuelle */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">3. Propriété intellectuelle</h2>
        <p className="text-sm leading-relaxed text-neutral-400">
          L’ensemble des contenus présents sur ce site (textes, créations visuelles, designs d’interfaces, animations motion, logos) sont la propriété exclusive de Maxime Lussiana, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.
        </p>
      </section>

      {/* Données personnelles */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">4. Données personnelles & Cookies</h2>
        <p className="text-sm leading-relaxed text-neutral-400">
          Les informations transmises via le formulaire de contact servent uniquement à répondre aux demandes de devis ou de renseignement. Aucune donnée n’est cédée ni vendue à des tiers.
        </p>
        <p className="text-sm leading-relaxed text-neutral-400">
          Ce site n’utilise aucun cookie publicitaire ou de traçage nécessitant le consentement préalable de l’utilisateur.
        </p>
      </section>
    </main>
  );
}