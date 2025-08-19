import { Suspense } from "react";
import { ArrowRight, Users, Zap, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WaitlistForm from "@/components/WaitlistForm";
import HeroDemo from "@/components/HeroDemo";
import ClientPage from "@/components/ClientPage";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24 mt-10">

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Content */}
            <div className="max-w-4xl mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Nouveau : IA spécialisée
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Optimisez vos sites web
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  <br />
                  grâce à l&apos;IA
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Velocity exécute des audits Lighthouse instantanés et vous donne des conseils personnalisés et actionnables grâce à l&apos;IA pour améliorer vos performances.
              </p>

              <a href="#waitlist" className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                  data-scroll-to="waitlist"
                >
                  Rejoindre la liste d&apos;attente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>

            {/* Demo */}
            <div className="w-full max-w-4xl">
              <Suspense fallback={<div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>}>
                <HeroDemo />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              En 3 étapes simples, obtenez des recommandations d&apos;optimisation personnalisées
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Analysez votre site",
                description: "Collez simplement l&apos;URL de votre site web et laissez notre IA analyser vos performances."
              },
              {
                icon: BarChart3,
                title: "Recevez des insights",
                description: "Obtenez un rapport détaillé avec des métriques claires et des recommandations prioritaires."
              },
              {
                icon: Zap,
                title: "Optimisez et améliorez",
                description: "Implémentez nos conseils et voyez vos performances s&apos;améliorer instantanément."
              }
            ].map((step, index) => (
              <div key={index}>
                <Card className="bg-gray-900/50 border-gray-800 text-white h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-300">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Box */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Fonctionnalités principales
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tout ce dont vous avez besoin pour optimiser vos performances web
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Coach IA personnalisé",
                description: "Recommandations adaptées à votre site et vos objectifs",
                icon: "🤖",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Insights visuels",
                description: "Graphiques et métriques faciles à comprendre",
                icon: "📊",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Suivi des progrès",
                description: "Surveillez l&apos;amélioration de vos performances",
                icon: "📈",
                color: "from-green-500 to-green-600"
              },
              {
                title: "Roadmap actionnable",
                description: "Plan d&apos;action détaillé pour vos optimisations",
                icon: "🗺️",
                color: "from-pink-500 to-pink-600"
              }
            ].map((feature, index) => (
              <div key={index}>
                <Card className="bg-gray-900/50 border-gray-800 text-white h-full hover:bg-gray-800/50 transition-colors">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à optimiser votre site ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez la liste d&apos;attente et soyez parmi les premiers à tester Velocity
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            data-scroll-to="waitlist"
          >
            Rejoindre la liste d&apos;attente
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div className="h-96 bg-gray-800 rounded-lg animate-pulse"></div>}>
            <WaitlistForm />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Velocity. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>

      {/* Client-side interactions */}
      <Suspense fallback={null}>
        <ClientPage />
      </Suspense>
    </div>
  );
}
