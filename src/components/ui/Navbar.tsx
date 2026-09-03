"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { MobileDrawer } from "./MobileDrawer";
import { Container } from "./Container";
import { track } from "../../lib/analytics";

const NAV_ITEMS = [
  { label: "Accueil", href: "#" },
  { label: "Réalisations", href: "#work" },
  { label: "Expertises", href: "#expertises" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction de scroll fluide sans modifier l'URL
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string
  ) => {
    e.preventDefault();

    track("click_nav_item", { label });

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
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 left-0 right-0 z-50 transform-gpu transition-[padding,background-color,border-color,box-shadow] duration-300 ${
          isScrolled
            ? "py-4 bg-bg-page/75 backdrop-blur-md border-b border-border-thin/50 shadow-sm"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo - Retour en haut propre */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              track("click_logo");
            }}
            className="flex items-center"
          >
            <Image
              src="/assets/logo-light.svg"
              alt="Maxime Lussiana — UX/UI & Motion Designer"
              width={180}
              height={40}
              priority
              className="h-auto w-auto dark:hidden"
            />
            <Image
              src="/assets/logo-dark.svg"
              alt="Maxime Lussiana — UX/UI & Motion Designer"
              width={180}
              height={40}
              priority
              className="hidden h-auto w-auto dark:block"
            />
          </Link>

          {/* Desktop Menu Items */}
          <nav className="hidden lg:flex items-center gap-6 px-[10px] py-[8px] bg-bg-card border border-border-thin rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.025)]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.label)}
                className="px-[12px] py-[6px] rounded-full text-sm font-medium text-text-secondary hover:text-text-navitem-active hover:bg-bg-nav-item transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Status Badge - Desktop only */}
            <div className="hidden md:flex h-[38px] items-center gap-2.5 px-4 bg-bg-card border border-border-thin rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.025)]">
              {/* Point lumineux */}
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-icon-available opacity-75 [animation-duration:3s]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-icon-available" />
              </span>

              <span className="text-xs font-mono font-bold text-text-pill-available tracking-wider uppercase leading-none">
                Disponible
              </span>
            </div>

            {/* Hamburger Menu - Mobile only */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden p-2 text-text-default cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Drawer (sorti du header) */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={NAV_ITEMS}
      />
    </>
  );
}