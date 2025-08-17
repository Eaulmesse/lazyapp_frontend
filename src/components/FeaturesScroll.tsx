"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Données des fonctionnalités
const features = [
  {
    id: "audit",
    title: "Audit Lighthouse Intelligent",
    description: "Notre technologie analyse votre site web en profondeur et fournit des métriques détaillées sur la performance, l'accessibilité, les bonnes pratiques et le SEO.",
    color: "from-blue-500 to-blue-600",
    highlight: "98% de précision",
    icon: "📊"
  },
  {
    id: "ai",
    title: "Conseils IA Spécialisés",
    description: "Notre IA est entraînée sur des milliers de documents SEO et performance pour vous fournir des recommandations ultra-précises et contextuelles.",
    color: "from-purple-500 to-purple-600",
    highlight: "Technologie exclusive",
    icon: "🤖"
  },
  {
    id: "tracking",
    title: "Suivi Continu des Performances",
    description: "Surveillez l'évolution des performances de votre site dans le temps. Recevez des alertes lorsque des métriques importantes se dégradent.",
    color: "from-green-500 to-green-600",
    highlight: "Suivi en temps réel",
    icon: "📈"
  },
  {
    id: "optimization",
    title: "Optimisation Sur Mesure",
    description: "Notre équipe d'experts peut implémenter les améliorations recommandées pour vous. Service personnalisé disponible sur devis.",
    color: "from-pink-500 to-pink-600",
    highlight: "Résultats garantis",
    icon: "⚡"
  }
];

export default function FeaturesScroll() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Roadmap 2024
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos fonctionnalités à venir
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les outils innovants que nous développons pour révolutionner l'optimisation web.
          </p>
        </motion.div>

        {/* Layout en deux colonnes */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Colonne gauche - Présentation */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center lg:text-left"
            >
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Une révolution dans l'optimisation web
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Nous combinons l'intelligence artificielle et l'expertise humaine pour créer des outils qui transforment réellement vos performances web.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    En développement
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Bêta privée
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite - Timeline moderne */}
          <div className="relative">
            <div className="relative">
              {/* Ligne de timeline avec effet de progression */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 via-green-500 to-pink-500"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
              
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <TimelineItem 
                    key={feature.id}
                    feature={feature} 
                    index={index}
                    isActive={activeFeature === index}
                    onHover={() => setActiveFeature(index)}
                    onLeave={() => setActiveFeature(null)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Composant pour chaque étape de la timeline
function TimelineItem({ 
  feature, 
  index, 
  isActive, 
  onHover, 
  onLeave 
}: { 
  feature: typeof features[0], 
  index: number,
  isActive: boolean,
  onHover: () => void,
  onLeave: () => void
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="relative flex items-start group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Point de timeline avec animation */}
      <div className="absolute left-8 transform -translate-x-1/2 z-10">
        <motion.div 
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg relative overflow-hidden",
            `bg-gradient-to-r ${feature.color}`
          )}
          whileHover={{ scale: 1.1 }}
          animate={isActive ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-2xl">{feature.icon}</span>
          <motion.div 
            className="absolute inset-0 bg-white/20"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>

      {/* Contenu avec animation */}
      <div className="ml-20 flex-1">
        <motion.div 
          className={cn(
            "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300",
            isActive ? "shadow-lg border-blue-200 bg-blue-50/30" : "hover:shadow-md"
          )}
          animate={isActive ? { x: 8 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white",
                `bg-gradient-to-r ${feature.color}`
              )}>
                {feature.highlight}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Étape {index + 1}
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4 text-blue-500" />
            </motion.div>
          </div>
          
          <h4 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h4>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <p className="text-sm text-blue-600 font-medium">
                  🚀 Disponible prochainement
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
