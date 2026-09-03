"use client";

import { sendContactEmail } from "../../app/actions/contact";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { CheckCheck, Calendar, ArrowUp, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Container } from "../ui/Container";
import { track } from "../../lib/analytics";

const LINKEDIN_URL = "https://www.linkedin.com/in/maxime-lussiana/";
const BOOKING_URL = "https://calendar.app.google/vZDDFJJaktzNcdMp7";

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

// --- COMPOSANT CUSTOM SELECT (Dropdown stylisé FinTech / Dark mode) ---
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function CustomSelect({ value, onChange, options }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input de validation masqué */}
      <input type="hidden" required value={value} name="type" />

      {/* Champ principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="peer flex h-14 w-full cursor-pointer items-center justify-between rounded-2xl border border-border-thin bg-bg-page px-4 pb-2 pt-5 text-left text-sm font-medium outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4]"
      >
        <span className={value === "" ? "text-text-secondary/60" : "text-text-default"}>
          {value || "Sélectionner un type de besoin..."}
        </span>

        <ChevronDown
          className={`h-4 w-4 text-text-secondary transition-transform duration-300 ${
            isOpen ? "rotate-180 text-text-default" : ""
          }`}
        />
      </button>

      {/* Label Flottant */}
      <label
        className={`pointer-events-none absolute left-4 top-2 z-10 text-[11px] font-bold transition-colors duration-200 ${
          isOpen ? "text-[#0048e4]" : "text-text-secondary"
        }`}
      >
        Type de projet
      </label>

      {/* Menu déroulant sur-mesure */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border-thin bg-bg-card p-1.5 transform-gpu shadow-2xl backdrop-blur-xl"
          >
            {options.map((option) => {
              const isSelected = value === option;
              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-3 text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-[#0048e4]/10 text-text-pill-primary"
                        : "text-text-default hover:bg-bg-page"
                    }`}
                  >
                    <span>{option}</span>
                    {isSelected && <Check className="h-4 w-4 text-text-pill-primary" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SECTION CONTACT PRINCIPALE ---
export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
    website: "", // Champ Honeypot (piège à robots)
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation type de besoin
    if (!formData.type) {
      alert("Veuillez sélectionner un type de besoin.");
      return;
    }

    // Verification du format email cote client
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Veuillez saisir une adresse email valide.");
      return;
    }

    setStatus("loading");

    const result = await sendContactEmail(formData);

    if (result.success) {
      track("submit_contact_form", { project_type: formData.type });
      setStatus("success");
      setFormData({ name: "", email: "", type: "", message: "", website: "" });
    } else {
      setStatus("idle");
      alert(result.error || "Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <>
      <section id="contact" className="relative isolate bg-bg-page py-24 md:py-32 lg:py-36 transition-colors duration-300">
        <Container className="relative">
          {/* Halo externe */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -top-[100px] -z-10 h-[260px] w-[80%] -translate-x-1/2 transform-gpu rounded-full bg-gradient-to-r from-[#0048e4] to-[#a259ff] opacity-12 dark:opacity-40 blur-[110px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative isolate overflow-hidden rounded-[24px] sm:rounded-[32px] border border-border-thin bg-bg-card px-4 py-8 shadow-[0px_2px_36px_0px_rgba(0,72,228,0.08)] sm:px-6 md:px-12 md:py-16 xl:px-14 xl:py-20"
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
              className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[400px] w-[400px] -translate-y-1/2 transform-gpu rounded-full bg-[#a259ff] opacity-[0.04] dark:opacity-[0.14] blur-[130px]"
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

                {/* Paragraphe */}
                <motion.p
                  variants={itemVariants}
                  className="w-full text-base leading-[1.5] font-medium text-text-secondary md:text-[17px]"
                >
                  Un besoin en UX/UI Design ou Motion Design ?
                  <br />
                  Remplissez le formulaire ci-contre ou contactez-moi directement sur LinkedIn pour échanger sur votre projet.
                </motion.p>

                {/* Bouton LinkedIn */}
                <motion.div variants={itemVariants} className="w-full sm:w-auto">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("click_social", {
                        platform: "LinkedIn",
                        location: "contact_section",
                      })
                    }
                    className="group flex w-full sm:w-auto items-center justify-center rounded-full border border-border-thin bg-bg-action-secondary px-4 py-3 text-text-default transition-all duration-300 hover:-translate-y-0.5 hover:border-border-thin/80 sm:px-6"
                  >
                    <span className="font-mono text-xs sm:text-sm font-bold leading-[1.2] flex items-center gap-2 whitespace-nowrap">
                      <span>Me contacter sur LinkedIn</span>
                      <span
                        aria-hidden
                        className="font-sans text-base sm:text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </a>
                </motion.div>
              </motion.div>

              {/* Colonne Droite : Formulaire ou Succès */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="xl:col-span-6"
              >
                <div className="rounded-2xl border border-border-thin bg-bg-card/80 p-4 sm:p-6 md:p-8 transform-gpu backdrop-blur-md shadow-xl transition-colors duration-300">
                  {status === "success" ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="flex min-h-[420px] flex-col items-center justify-center py-8 text-center"
                    >
                      {/* Icône CheckCheck */}
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border-thin bg-bg-card text-icon-modal shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                        <CheckCheck size={28} />
                      </div>

                      {/* Titre */}
                      <h3 className="text-2xl font-black tracking-tight text-text-default md:text-3xl">
                        Message bien reçu !
                      </h3>

                      {/* Paragraphe principal */}
                      <p className="mt-4 max-w-[280px] md:max-w-md text-base font-medium leading-[1.6] text-text-secondary md:text-[17px]">
                        Merci pour votre message. Je prends connaissance de vos éléments et je vous fais un retour sous 24h à 48h.
                      </p>

                      {/* Bloc d'action immédiate : Prise de RDV */}
                      <div className="mt-10 flex flex-col items-center gap-5 w-full max-w-sm">
                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track("click_booking_calendar")}
                          className="group relative overflow-hidden flex w-full items-center justify-center gap-2 rounded-full bg-[#0048e4] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(0,72,228,0.4)]"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 origin-left scale-x-0 bg-[#1258f6] transition-transform duration-300 ease-out group-hover:scale-x-100"
                          />
                          <span className="relative z-10 flex items-center gap-2 font-mono">
                            <Calendar size={16} />
                            <span>Planifier un appel (30 min)</span>
                            <span
                              aria-hidden
                              className="font-sans text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </span>
                        </a>

                        {/* Bouton discret pour remonter en haut du site */}
                        <button
                          type="button"
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          className="flex items-center gap-1.5 text-xs font-mono font-medium text-text-secondary hover:text-text-default transition-colors duration-200 cursor-pointer"
                        >
                          <ArrowUp size={14} />
                          <span>Retourner en haut de page</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      
                      {/* CHAMP HONEYPOT (Invisible pour les humains, rempli par les bots) */}
                      <div className="sr-only aria-hidden:true hidden" aria-hidden="true">
                        <label htmlFor="website">Site web</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </div>

                      {/* Ligne 1 : Nom complet & Email */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Champ Nom complet */}
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            required
                            placeholder=" "
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="peer block h-14 w-full rounded-2xl border border-border-thin bg-bg-page px-4 pb-2 pt-5 text-sm font-medium text-text-default outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4]"
                          />
                          <label
                            htmlFor="name"
                            className="pointer-events-none absolute left-4 top-2 z-10 origin-[0] text-[11px] font-bold text-text-secondary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/60 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#0048e4]"
                          >
                            Nom complet
                          </label>
                        </div>

                        {/* Champ Email */}
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            required
                            placeholder=" "
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="peer block h-14 w-full rounded-2xl border border-border-thin bg-bg-page px-4 pb-2 pt-5 text-sm font-medium text-text-default outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4]"
                          />
                          <label
                            htmlFor="email"
                            className="pointer-events-none absolute left-4 top-2 z-10 origin-[0] text-[11px] font-bold text-text-secondary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/60 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#0048e4]"
                          >
                            Email
                          </label>
                        </div>
                      </div>

                      {/* Ligne 2 : Type de besoin (Dropdown Custom Stylisé) */}
                      <CustomSelect
                        value={formData.type}
                        onChange={(val) => setFormData({ ...formData, type: val })}
                        options={[
                          "UX/UI Design",
                          "Motion Design",
                          "Prise de contact / Autre",
                        ]}
                      />

                      {/* Ligne 3 : Votre message */}
                      <div className="relative">
                        <textarea
                          id="message"
                          required
                          rows={4}
                          placeholder=" "
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="peer block w-full resize-none rounded-2xl border border-border-thin bg-bg-page px-4 pb-3 pt-6 text-sm font-medium text-text-default outline-none transition-all focus:border-[#0048e4] focus:ring-1 focus:ring-[#0048e4]"
                        />
                        <label
                          htmlFor="message"
                          className="pointer-events-none absolute left-4 top-3.5 z-10 origin-[0] text-[11px] font-bold text-text-secondary transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/60 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-[#0048e4]"
                        >
                          Votre message
                        </label>
                      </div>

                      {/* Bouton d'envoi */}
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