"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

export function MobileDrawer({ isOpen, onClose, navItems }: MobileDrawerProps) {
  // Navigation fluide + URL propre + ferme le drawer + tracking
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string
  ) => {
    e.preventDefault();
    onClose();

    track("click_nav_item", { label, location: "mobile_drawer" });

    if (href === "#" || href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (assombrissement léger de l'arrière-plan) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer : fond aligné sur Dark-800 (bg-bg-page / #1e1e1e) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-[80%] max-w-xs sm:max-w-sm bg-bg-page/95 backdrop-blur-xl p-6 sm:p-8 flex flex-col shadow-2xl border-l border-border-thin"
          >
            {/* Bouton fermer */}
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="p-1.5 text-text-secondary hover:text-text-default cursor-pointer transition-colors"
                aria-label="Fermer le menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-5">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.label)}
                    className="text-lg font-bold tracking-tight text-text-default hover:text-text-highlight transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer Contact */}
            <div className="mt-auto pt-6 border-t border-border-thin">
              <p className="text-xs text-text-secondary font-mono tracking-widest uppercase mb-2">
                Me contacter
              </p>
              <a
                href="mailto:motion@maximelussiana.fr"
                onClick={() => track("click_email", { location: "mobile_drawer" })}
                className="block text-sm font-bold text-text-default hover:text-text-highlight transition-colors truncate"
                title="motion@maximelussiana.fr"
              >
                motion@maximelussiana.fr
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}