"use client";

import { m } from "framer-motion";
import { useState, useEffect } from "react";
import { useClientOnly } from "@/lib/hooks/useHydration";
import { 
  Gauge, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  BarChart3,
  Brain,
  Search,
  Code,
  Image,
  Database,
  Shield,
  Globe
} from "lucide-react";

export default function HeroDemo() {
  const isClient = useClientOnly();

  const scores = [
    { name: "Performance", score: 92, color: "text-green-400", bgColor: "bg-green-500/20" },
    { name: "Accessibilité", score: 95, color: "text-green-400", bgColor: "bg-green-500/20" },
    { name: "Bonnes Pratiques", score: 88, color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    { name: "SEO", score: 85, color: "text-yellow-400", bgColor: "bg-yellow-500/20" }
  ];

  const recommendations = [
    { 
      title: "Optimiser les images avec Next.js Image", 
      impact: "Élevé", 
      savings: "2,3s",
      icon: <Image className="w-4 h-4" />,
      color: "text-blue-400",
      details: "Utilisez le composant Image de Next.js avec lazy loading et formats WebP"
    },
    { 
      title: "Implémenter la compression Brotli", 
      impact: "Élevé", 
      savings: "1,8s",
      icon: <BarChart3 className="w-4 h-4" />,
      color: "text-purple-400",
      details: "Activez la compression Brotli sur votre serveur pour réduire la taille des fichiers"
    },
    { 
      title: "Optimiser les métadonnées SEO", 
      impact: "Moyen", 
      savings: "SEO +15",
      icon: <Search className="w-4 h-4" />,
      color: "text-green-400",
      details: "Ajoutez des meta tags title, description et Open Graph optimisés"
    },
    { 
      title: "Code splitting avec React.lazy()", 
      impact: "Moyen", 
      savings: "1,2s",
      icon: <Code className="w-4 h-4" />,
      color: "text-yellow-400",
      details: "Divisez votre bundle en chunks plus petits pour un chargement plus rapide"
    },
    { 
      title: "Mise en cache des API avec SWR", 
      impact: "Moyen", 
      savings: "0,8s",
      icon: <Database className="w-4 h-4" />,
      color: "text-orange-400",
      details: "Implémentez SWR pour la mise en cache intelligente des données"
    },
    { 
      title: "Optimiser les polices avec font-display", 
      impact: "Faible", 
      savings: "0,4s",
      icon: <Globe className="w-4 h-4" />,
      color: "text-indigo-400",
      details: "Utilisez font-display: swap pour éviter le blocage du rendu"
    }
  ];

  if (!isClient) {
    return (
      <div className="relative max-w-4xl mx-auto mt-12">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl h-96 animate-pulse"></div>
      </div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="relative max-w-4xl mx-auto mt-12"
    >
      {/* Main Dashboard */}
      <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Gauge className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Audit Lighthouse</h3>
              <p className="text-gray-400 text-sm">exemple.com • Il y a 2 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Analyse IA terminée</span>
          </div>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {scores.map((score, index) => (
            <m.div
              key={score.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className={`${score.bgColor} border border-gray-700 rounded-xl p-4 text-center`}
            >
              <div className={`text-2xl font-bold ${score.color} mb-1`}>
                {score.score}
              </div>
              <div className="text-gray-300 text-sm">{score.name}</div>
            </m.div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <h4 className="text-white font-semibold">Recommandations IA Spécialisées</h4>
          </div>
          
          {recommendations.map((rec, index) => (
            <m.div
              key={rec.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 + index * 0.2 }}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/70 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`${rec.color} mt-1`}>
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-medium mb-1">{rec.title}</h5>
                    <p className="text-gray-400 text-sm mb-2 leading-relaxed">{rec.details}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm">Impact : {rec.impact}</span>
                      <span className="text-green-400 text-sm">Gain : {rec.savings}</span>
                    </div>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
              </div>
            </m.div>
          ))}
        </div>

        {/* Progress Bar */}
        <m.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 2.5 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Score global</span>
            <span className="text-white font-semibold">90/100</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <m.div
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ duration: 1.5, delay: 2.7 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
            />
          </div>
        </m.div>

        {/* Framework Detection */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="mt-6 pt-4 border-t border-gray-700"
        >
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300 text-sm font-medium">Technologies détectées</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((tech, index) => (
              <m.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2 + index * 0.1 }}
                className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md border border-blue-500/30"
              >
                {tech}
              </m.span>
            ))}
          </div>
        </m.div>
      </div>

      {/* Floating Elements */}
      <m.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
      />
      <m.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
      />
    </m.div>
  );
}
