"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

export function MobileDrawer({ isOpen, onClose, navItems }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-[80%] max-w-xs sm:max-w-sm bg-bg-card p-6 sm:p-8 flex flex-col shadow-2xl border-l border-border-thin"
          >
            {/* Bouton fermer */}
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="p-1.5 text-text-secondary hover:text-text-default cursor-pointer transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-xl font-bold text-text-default hover:text-text-highlight transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer Contact */}
            <div className="mt-auto pt-6 border-t border-border-thin">
              <p className="text-xs text-text-secondary font-mono tracking-widest uppercase mb-3">
                Me contacter
              </p>
              <a
                href="mailto:motion@maximelussiana.fr"
                className="text-base font-bold text-text-default hover:text-text-highlight transition-colors break-words"
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