"use client";

import { useEffect } from "react";
import { motion, useScroll } from "framer-motion";

export default function ClientPage() {
  const { scrollY } = useScroll();

  useEffect(() => {
    // Gestion des clics sur les boutons de navigation
    const handleButtonClicks = () => {
      const buttons = document.querySelectorAll('button[data-scroll-to]');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = button.getAttribute('data-scroll-to');
          if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    };

    handleButtonClicks();

    // Nettoyage
    return () => {
      const buttons = document.querySelectorAll('button[data-scroll-to]');
      buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClicks);
      });
    };
  }, []);

  // Ce composant ne rend rien visible, il gère seulement les interactions
  return null;
}
