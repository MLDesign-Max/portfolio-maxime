"use client";

import * as React from "react";
import { useState } from "react";
import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Container } from "../ui/Container";

const LINKEDIN_URL = "https://www.linkedin.com/in/maxime-lussiana/";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", type: "", message: "" });
    }, 800);
  };

  return (
    <>
      <section id="contact" className="relative isolate bg-bg-page py-24 md:py-32 lg:py-36 transition-colors duration-300">
        <Container className="relative">
          {/* Halo externe : jaillit au-dessus de la carte sans être coupé par overflow-hidden */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -top-[100px] -z-10 h-[260px] w-[80%] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0048e4] to-[#a259ff] opacity-12 dark:opacity-40 blur-[110px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative isolate overflow-hidden rounded-[32px] border border-border-thin bg-bg-card px-6 py-12 shadow-[0px_2px_36px_0px_rgba(0,72,228,0.08)] md:px-12 md:py-16 xl:px-14 xl:py-20"
          >
            {/* Grille de fond */}
            <div
              aria-hidden
              className="bg-grid pointer-events-none absolute inset-0"
            />

           {/* Ligne néon supérieure + Ambiance interne */}
           <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#a259ff]/30 dark:via-[#a259ff] to-transparent z-10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#a259ff] opacity-[0.04] dark:opacity-[0.14] blur-[130px]"
            />

            {/* Grille responsive */}
            <div className="relative grid items-center gap-10 xl:grid-cols-12 xl:gap-12">
              
              {/* Colonne Gauche */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col items-start gap-8 xl:col-span-6"
              >
                {/* Badge disponibilité */}
                <motion.span
                  variants={itemVariants}
                  className="flex items-center justify-center gap-2 rounded-full border border-border-thin bg-bg-pill-available px-[18px] py-2.5 backdrop-blur-[6px]"
                >
                  <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-icon-available opacity-75 [animation-duration:3s]" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-icon-available" />
                  </span>

                  <span className="font-mono text-xs leading-none font-medium tracking-[1.44px] text-text-pill-available">
                    DISPONIBLE POUR DE NOUVEAUX PROJETS
                  </span>
                </motion.span>

                {/* Titre principal */}
                <motion.h2
                  variants={itemVariants}
                  className="flex flex-col gap-2 text-[28px] tracking-[-0.4px] md:text-[34px] lg:text-[38px] xl:text-[42px]"
                >
                  <span className="leading-[1.2] font-black text-text-default">
                    Prêt à passer à l&apos;action ?
                  </span>
                  <span className="font-mono leading-[1.4] font-bold italic text-text-highlight">
                    Discutons de votre projet.
                  </span>
                </motion.h2>

                {/* Paragraphe pleine largeur de colonne avec saut à la ligne */}
                <motion.p
                  variants={itemVariants}
                  className="w-full text-base leading-[1.5] font-medium text-text-secondary md:text-[17px]"
                >
                  Un besoin en UX/UI Design ou Motion Design ?
                  <br />
                  Remplissez le formulaire ci-contre ou contactez-moi directement sur LinkedIn pour échanger sur votre projet.
                </motion.p>

                {/* Bouton LinkedIn aligné à gauche */}
                <motion.div variants={itemVariants}>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center rounded-full border border-border-thin bg-bg-action-secondary px-6 py-3 text-text-default transition-all duration-300 hover:-translate-y-0.5 hover:border-border-thin/80"
                  >
                    <span className="font-mono text-sm font-bold leading-[1.2] flex items-center gap-2">
                      <span>Me contacter sur LinkedIn</span>
                      <span
                        aria-hidden
                        className="font-sans text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </a>
                </motion.div>
              </motion.div>

              {/* Colonne Droite : Formulaire */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="xl:col-span-6"
              >
                <div className="rounded-2xl border border-border-thin bg-bg-card/80 p-6 md:p-8 backdrop-blur-md shadow-xl transition-colors duration-300">
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <Check size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-text-default">Message envoyé !</h3>
                      <p className="mt-2 text-sm text-text-secondary">
                        Merci pour votre message. Je vous répondrai sous 24h à 48h.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-xs font-mono text-text-highlight underline underline-offset-4 cursor-pointer"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {/* Ligne 1 : Nom complet & Email */}
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-xs font-bold text-text-default">
                            Nom complet
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            placeholder="Nom complet"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-xl border border-border-thin bg-bg-page px-4 py-3 text-sm text-text-default placeholder:text-text-secondary/50 outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4]"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-xs font-bold text-text-default">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder="email@entreprise.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-xl border border-border-thin bg-bg-page px-4 py-3 text-sm text-text-default placeholder:text-text-secondary/50 outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4]"
                          />
                        </div>
                      </div>

                      {/* Ligne 2 : Type de besoin */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="type" className="text-xs font-bold text-text-default">
                          Type de besoin
                        </label>
                        <div className="relative">
                          <select
                            id="type"
                            required
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full appearance-none rounded-xl border border-border-thin bg-bg-page px-4 py-3 text-sm text-text-default outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4] cursor-pointer"
                          >
                            <option value="" disabled className="bg-bg-card text-text-default">
                              Sélectionnez une option
                            </option>
                            <option value="ux-ui" className="bg-bg-card text-text-default">UX/UI Design</option>
                            <option value="motion" className="bg-bg-card text-text-default">Motion Design</option>
                            <option value="contact-autre" className="bg-bg-card text-text-default">Prise de contact / Autre</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Ligne 3 : Votre message */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs font-bold text-text-default">
                          Votre message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          placeholder="Décrivez brièvement votre projet, vos objectifs, vos délais..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full resize-none rounded-xl border border-border-thin bg-bg-page px-4 py-3 text-sm text-text-default placeholder:text-text-secondary/50 outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4]"
                        />
                      </div>

                      {/* Bouton d'envoi rond */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group relative overflow-hidden mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0048e4] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(0,72,228,0.4)] disabled:opacity-50 disabled:pointer-events-none"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 origin-left scale-x-0 bg-[#1258f6] transition-transform duration-300 ease-out group-hover:scale-x-100"
                        />

                        <span className="relative z-10 flex items-center gap-2 font-mono">
                          {status === "loading" ? (
                            "Envoi en cours..."
                          ) : (
                            <>
                              <span>Envoyer le message</span>
                              <span
                                aria-hidden
                                className="font-sans text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
} 