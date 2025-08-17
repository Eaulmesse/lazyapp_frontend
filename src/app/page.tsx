"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Gauge, 
  Brain, 
  TrendingUp, 
  Target, 
  CheckCircle, 
  Star,
  Users,
  Globe,
  Shield,
  Rocket,
  BarChart3,
  Lightbulb,
  Settings,
  Play
} from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";
import HeroDemo from "@/components/HeroDemo";
import Testimonials from "@/components/Testimonials";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        </div>
       
       {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center scroll-mt-24">
        <motion.div 
          className="max-w-6xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
                          <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block"
              >
              <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 py-2 px-4 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Nouveau : IA spécialisée SEO & Performance
                </Badge>
              </motion.div>
            
                        <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Optimisez vos sites web
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                <br /> 
                grâce à l'IA
             </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Velocity exécute des audits Lighthouse instantanés et vous donne des conseils personnalisés et actionnables grâce à l'IA pour améliorer vos performances.
            </motion.p>

            {/* CTA Section */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Rejoindre la liste d'attente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-gray-400 text-sm mb-4">Rejoignez nos beta-testeurs !</p>
              <div className="flex justify-center items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Accès anticipé</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Pas de spam</span>
                </div>
              </div>
            </motion.div>
           </div>
           
          {/* Hero Demo */}
          <HeroDemo />
        </motion.div>
      </section>

      

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ça fonctionne
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Passez de l'audit à l'optimisation en trois étapes simples
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Audit",
                description: "Exécutez un audit Lighthouse instantané sur n'importe quelle URL",
                icon: <Gauge className="w-8 h-8" />,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "02", 
                title: "Analyser",
                description: "Notre IA analyse le rapport et identifie les problèmes clés",
                icon: <Brain className="w-8 h-8" />,
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "03",
                title: "Optimiser", 
                description: "Obtenez une feuille de route personnalisée avec des étapes actionnables",
                icon: <Target className="w-8 h-8" />,
                color: "from-green-500 to-green-600"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 group cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="text-blue-400 text-sm font-semibold mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Box Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fonctionnalités puissantes pour les développeurs modernes
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour optimiser les performances de votre site web
            </p>
          </motion.div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Coach IA Personnalisé",
                description: "Ne vous contentez pas d'un score. Obtenez des conseils sur mesure d'une IA qui apprend de votre site et de vos objectifs.",
                icon: <Brain className="w-6 h-6" />,
                color: "from-blue-500 to-blue-600",
                span: "col-span-1"
              },
              {
                title: "Aperçus Visuels",
                description: "Voyez exactement où votre site web peut s'améliorer avec des représentations visuelles claires des données de performance.",
                icon: <BarChart3 className="w-6 h-6" />,
                color: "from-purple-500 to-purple-600",
                span: "col-span-1"
              },
              {
                title: "Suivi des Progrès",
                description: "Surveillez les performances de votre site dans le temps et voyez l'impact direct de vos changements.",
                icon: <TrendingUp className="w-6 h-6" />,
                color: "from-green-500 to-green-600",
                span: "col-span-1"
              },
              {
                title: "Feuille de Route Actionnable",
                description: "Recevez un plan clair et étape par étape pour corriger les problèmes et améliorer votre SEO, accessibilité et vitesse.",
                icon: <Target className="w-6 h-6" />,
                color: "from-pink-500 to-pink-600",
                span: "col-span-1"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${feature.span} bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 hover:border-gray-600 transition-all duration-300 group cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à optimiser votre site web ?
            </h2>
            <p className="text-gray-400 text-lg">
              Rejoignez la liste d'attente et soyez parmi les premiers à expérimenter l'avenir de l'optimisation web
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      

      <footer>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Velocity. Tous droits réservés.</p>
        </div>
        
      </footer>
     </main>
  );
}
