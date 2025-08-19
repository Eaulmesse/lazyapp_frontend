"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useClientOnly } from "@/lib/hooks/useHydration";
import { Badge } from "@/components/ui/badge";
import { Zap, Menu, X, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClient = useClientOnly();

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const navItems = [
    { name: "Accueil", href: "#home" },
    { name: "Comment ça marche", href: "#how-it-works" },
    { name: "Fonctionnalités", href: "#features" },    
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Scroll vers l'ancre avec offset pour la navbar
    const element = document.querySelector(href);
    if (element) {
      const offset = 96; // Hauteur de la navbar + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <m.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isClient && isScrolled 
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <m.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-xl font-bold text-white">Velocity</span>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 text-xs">
                Bêta
              </Badge>
            </m.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <m.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.name}
                </m.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <a href="#waitlist" className="hidden md:flex items-center gap-4">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                
                Rejoindre la liste d'attente
                <ArrowRight className="w-4 h-4" />
                
              </Button>
            </a>
        
            {/* Mobile Menu Button */}
            <m.button
              className="md:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </m.button>
          </div>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <m.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-gray-300 hover:text-white transition-colors font-medium py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </m.button>
              ))}
              <a href="#waitlist" className="pt-4 border-t border-gray-800 space-y-3">
                <Button 
                  
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                > 
                
                Rejoindre la liste d'attente
                <ArrowRight className="w-4 h-4 ml-2" />
                
                  
                </Button>
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}