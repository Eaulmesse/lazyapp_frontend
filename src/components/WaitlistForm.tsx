"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle, Users, Zap, Sparkles, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Pourcentage de progression du lancement (à modifier selon l'avancement réel)
const LAUNCH_PROGRESS = 75;

// Données pour la FAQ
const faqItems = [
  {
            question: "Quand Velocity sera-t-il disponible ?",
        answer: "Nous prévoyons de lancer Velocity au cours du prochain trimestre. Les membres de la waitlist auront un accès anticipé."
  },
  {
            question: "Est-ce que Velocity sera gratuit ?",
        answer: "Velocity proposera un plan gratuit avec des fonctionnalités de base et des plans premium avec des fonctionnalités avancées."
  },
  {
            question: "Comment fonctionne l'IA de Velocity ?",
    answer: "Notre IA est entraînée sur des milliers de documents SEO et de performance web pour fournir des recommandations ultra-précises et contextuelles."
  }
];

// Options de préférences
const preferenceOptions = [
  { id: "seo", label: "Optimisation SEO" },
  { id: "performance", label: "Performance web" },
  { id: "accessibility", label: "Accessibilité" },
  { id: "bestPractices", label: "Bonnes pratiques" }
];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showFaq, setShowFaq] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  
  // Gérer les changements de préférences
  const handlePreferenceChange = (id: string) => {
    setSelectedPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Appel API réel
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          preferences: selectedPreferences 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }
      
      setIsSubmitted(true);
      
      // Analytics pour mesurer l'engagement
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'waitlist_signup', {
          event_category: 'engagement',
          event_label: 'landing_page',
          value: 1
        });
      }
      
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 opacity-50"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/20 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-xl"></div>
            
            <CardHeader>
              <motion.div 
                className="flex items-center justify-center mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/30 rounded-full blur-md"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-full p-3">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CardTitle className="text-white text-center text-2xl">Merci !</CardTitle>
                <CardDescription className="text-gray-300 text-center text-lg mt-2">
                  Vous êtes maintenant sur la liste d'attente. Nous vous tiendrons informé dès que Velocity sera disponible !
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent>
              <motion.div 
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/30 py-2 px-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Accès prioritaire garanti
                </Badge>
                
                {/* Barre de progression */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progression du lancement</span>
                    <span className="font-medium text-green-400">{LAUNCH_PROGRESS}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full" 
                      style={{ width: `${LAUNCH_PROGRESS}%` }}
                    ></div>
                  </div>
                </div>
                
                {selectedPreferences.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Vos préférences sélectionnées :</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedPreferences.map(pref => {
                        const option = preferenceOptions.find(o => o.id === pref);
                        return option ? (
                          <Badge key={pref} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            {option.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full transform -translate-x-1/2 translate-y-1/2 blur-xl"></div>
            
            <CardHeader>
              <motion.div 
                className="flex items-center justify-center mb-4"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-md"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-3">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
              
              <CardTitle className="text-white text-center text-2xl">Rejoignez la waitlist</CardTitle>
              <CardDescription className="text-gray-300 text-center text-lg mt-2">
                Soyez parmi les premiers à tester Velocity et obtenez un accès prioritaire
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Votre email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-600 bg-gray-700/50 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 shadow-inner"
                    disabled={isSubmitting}
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </Button>
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.p 
                      className="text-red-400 text-sm text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
                
                {/* Barre de progression */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Progression du lancement</span>
                    <span className="font-medium text-blue-400">{LAUNCH_PROGRESS}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${LAUNCH_PROGRESS}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Préférences */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">Quelles fonctionnalités vous intéressent le plus ?</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {preferenceOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={option.id} 
                          checked={selectedPreferences.includes(option.id)}
                          onCheckedChange={() => handlePreferenceChange(option.id)}
                          className="data-[state=checked]:bg-blue-600 border-gray-600"
                        />
                        <Label 
                          htmlFor={option.id} 
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* FAQ */}
                <div className="pt-2">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg bg-blue-500/10 border border-blue-500/20 overflow-hidden"
                  >
                    <motion.button
                      type="button"
                      onClick={() => setShowFaq(!showFaq)}
                      className="flex items-center justify-between w-full text-left text-sm font-medium px-4 py-3 text-blue-400 hover:text-blue-300 transition-colors"
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      animate={{ backgroundColor: showFaq ? "rgba(59, 130, 246, 0.1)" : "transparent" }}
                    >
                      <div className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Questions fréquentes
                      </div>
                      <motion.div
                        animate={{ rotate: showFaq ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence initial={false}>
                      {showFaq && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ 
                            duration: 0.3,
                            ease: [0.04, 0.62, 0.23, 0.98]
                          }}
                          className="overflow-hidden border-t border-blue-500/20"
                        >
                          <motion.div 
                            className="px-4 py-3 bg-gray-800/50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          >
                            {faqItems.map((item, index) => (
                              <div 
                                key={index}
                                className={`py-2 ${index !== faqItems.length - 1 ? 'border-b border-gray-700' : ''}`}
                              >
                                <div className="font-medium text-gray-200 mb-1">
                                  {item.question}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {item.answer}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                
                <div className="text-center space-y-2 pt-2">
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 py-2 px-4">
                    <Users className="w-4 h-4 mr-2" />
                    Accès gratuit en avant-première
                  </Badge>
                  <p className="text-xs text-gray-500">
                    Pas de spam • Désinscription à tout moment
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
