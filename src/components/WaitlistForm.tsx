"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Zap } from "lucide-react";

interface FormData {
  email: string;
  preferences: string[];
}

const preferenceOptions = [
  { id: "performance", label: "Optimisation des performances", description: "Vitesse de chargement, Core Web Vitals" },
  { id: "seo", label: "Amélioration du SEO", description: "Métadonnées, structure, mots-clés" },
  { id: "accessibility", label: "Accessibilité", description: "WCAG, navigation clavier, lecteurs d'écran" },
  { id: "best-practices", label: "Bonnes pratiques", description: "Sécurité, standards web, optimisation" },
  { id: "mobile", label: "Optimisation mobile", description: "Responsive design, PWA, performance mobile" }
];

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    preferences: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0);

  // Progression fixe du projet Velocity (50% de développement)
  const projectProgress = 50;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
    setError(null);
  };

  const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked
        ? [...prev.preferences, preferenceId]
        : prev.preferences.filter(p => p !== preferenceId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          preferences: formData.preferences
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTotalSubscribers(data.totalSubscribers || 0);
        setFormData({ email: "", preferences: [] });
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Inscription réussie !
            </h3>
            <p className="text-gray-300 mb-6">
              Merci de vous être inscrit à la liste d&apos;attente de Velocity. Nous vous tiendrons informé de nos avancées !
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{totalSubscribers} inscrits</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Accès anticipé</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </m.div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Rejoignez la liste d&apos;attente
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Soyez parmi les premiers à tester Velocity et recevez un accès anticipé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Adresse email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                placeholder="votre@email.com"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                required
              />
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <Label className="text-white font-medium">
                Quelles optimisations vous intéressent le plus ?
              </Label>
              <div className="flex flex-wrap gap-4 mt-4">
                {preferenceOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 bg-gray-800 border-gray-700 text-white rounded-lg p-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.preferences.includes(option.id)}
                      onCheckedChange={(checked: boolean) => handlePreferenceChange(option.id, checked)}
                      className="mt-1 bg-gray-800 border-gray-700 rounded-lg p-2"
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor={option.id}
                        className="text-white font-medium cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Progression du projet</span>
                <span className="text-sm text-blue-400 font-medium">{projectProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <m.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${projectProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-gray-400">
                Développement en cours • Lancement prévu Automne 2025
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </m.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Inscription en cours...
                </div>
              ) : (
                <>
                  Rejoindre la liste d&apos;attente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            {/* Trust indicators */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">
                🔒 Vos données sont protégées • 📧 Pas de spam • 🚀 Accès anticipé
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </m.div>
  );
}
