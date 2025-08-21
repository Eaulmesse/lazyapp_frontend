"use client";

import { useState } from "react";
import { 
  BarChart3, 
  Zap, 
  Settings, 
  History, 
  BookOpen,
  User,
  Plus,
  ExternalLink,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "./components/Sidebar";

// Données simulées pour le MVP
const mockAudits = [
  {
    id: 1,
    url: "https://exemple.com",
    date: "2025-01-15",
    score: 87,
    status: "completed",
    performance: 92,
    accessibility: 95,
    seo: 85,
    bestPractices: 88
  },
  {
    id: 2,
    url: "https://mon-site.fr",
    date: "2025-01-14",
    score: 73,
    status: "completed",
    performance: 78,
    accessibility: 90,
    seo: 65,
    bestPractices: 82
  },
  {
    id: 3,
    url: "https://portfolio.dev",
    date: "2025-01-13",
    score: 94,
    status: "completed",
    performance: 96,
    accessibility: 98,
    seo: 92,
    bestPractices: 95
  },
  {
    id: 4,
    url: "https://ecommerce-shop.com",
    date: "2025-01-12",
    score: 68,
    status: "completed",
    performance: 72,
    accessibility: 85,
    seo: 60,
    bestPractices: 75
  },
  {
    id: 5,
    url: "https://blog-tech.io",
    date: "2025-01-11",
    score: 81,
    status: "completed",
    performance: 85,
    accessibility: 92,
    seo: 78,
    bestPractices: 88
  }
];

const kpiData = {
  totalAudits: 24,
  averageScore: 81,
  sitesMonitored: 8,
  lastAudit: "Il y a 2 heures"
};

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsSubmitting(true);
    
    // Simulation d'un délai
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // TODO: Appel API réel
    console.log("Nouvel audit pour:", url);
    
    setIsSubmitting(false);
    setUrl("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Terminé</Badge>;
      case "running":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">En cours</Badge>;
      case "error":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Erreur</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Vue d'ensemble</h1>
              <p className="text-gray-400 mt-1">Bienvenue sur votre dashboard Velocity</p>
            </div>
            
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Audits effectués</p>
                    <p className="text-2xl font-bold text-white">{kpiData.totalAudits}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Score moyen</p>
                    <p className="text-2xl font-bold text-white">{kpiData.averageScore}/100</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Sites surveillés</p>
                    <p className="text-2xl font-bold text-white">{kpiData.sitesMonitored}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Dernier audit</p>
                    <p className="text-2xl font-bold text-white">{kpiData.lastAudit}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nouvel audit */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nouvel audit
              </CardTitle>
              <CardDescription className="text-gray-400">
                Analysez un nouveau site web pour obtenir des recommandations d'optimisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewAudit} className="flex gap-3">
                <Input
                  type="url"
                  placeholder="https://exemple.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !url}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyse...
        </div>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Lancer l'audit
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Derniers audits */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <History className="w-5 h-5" />
                Derniers audits
              </CardTitle>
              <CardDescription className="text-gray-400">
                Historique de vos analyses de performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Site</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Score</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Statut</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAudits.map((audit) => (
                      <tr key={audit.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-white font-medium">{audit.url}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(audit.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold ${getScoreColor(audit.score)}`}>
                            {audit.score}/100
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(audit.status)}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Voir détails
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}