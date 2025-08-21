"use client";

import { useState } from "react";
import { 
  Globe, 
  Plus, 
  Settings, 
  History, 
  BookOpen,
  User,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "../components/Sidebar";

// Données simulées pour les sites
const mockSites = [
  {
    id: 1,
    url: "https://exemple.com",
    name: "Site Principal",
    lastAudit: "2025-01-15",
    score: 87,
    status: "active",
    performance: 92,
    accessibility: 95,
    seo: 85,
    bestPractices: 88,
    auditsCount: 12,
    lastImprovement: "+5 points"
  },
  {
    id: 2,
    url: "https://mon-site.fr",
    name: "Portfolio",
    lastAudit: "2025-01-14",
    score: 73,
    status: "active",
    performance: 78,
    accessibility: 90,
    seo: 65,
    bestPractices: 82,
    auditsCount: 8,
    lastImprovement: "+12 points"
  },
  {
    id: 3,
    url: "https://portfolio.dev",
    name: "Blog Tech",
    lastAudit: "2025-01-13",
    score: 94,
    status: "active",
    performance: 96,
    accessibility: 98,
    seo: 92,
    bestPractices: 95,
    auditsCount: 15,
    lastImprovement: "+3 points"
  },
  {
    id: 4,
    url: "https://ecommerce-shop.com",
    name: "Boutique en ligne",
    lastAudit: "2025-01-12",
    score: 68,
    status: "warning",
    performance: 72,
    accessibility: 85,
    seo: 60,
    bestPractices: 75,
    auditsCount: 6,
    lastImprovement: "-2 points"
  },
  {
    id: 5,
    url: "https://blog-tech.io",
    name: "Blog Personnel",
    lastAudit: "2025-01-11",
    score: 81,
    status: "active",
    performance: 85,
    accessibility: 92,
    seo: 78,
    bestPractices: 88,
    auditsCount: 10,
    lastImprovement: "+8 points"
  }
];

export default function SitesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredSites = mockSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || site.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Actif</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Attention</Badge>;
      case "error":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Erreur</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getImprovementColor = (improvement: string) => {
    if (improvement.includes("+")) return "text-green-400";
    if (improvement.includes("-")) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Sites surveillés</h1>
              <p className="text-gray-400 mt-1">Gérez vos sites web et suivez leurs performances</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un site
            </Button>
          </div>

          {/* Filtres et recherche */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Rechercher un site..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                  </div>
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-md px-2  focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="warning">Attention</option>
                  <option value="error">Erreur</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Liste des sites */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSites.map((site) => (
              <Card key={site.id} className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/30 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <CardTitle className="text-white text-lg">{site.name}</CardTitle>
                        {getStatusBadge(site.status)}
                      </div>
                      <CardDescription className="text-gray-400 text-sm">
                        {site.url}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Score principal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Score global</span>
                    <span className={`text-2xl font-bold ${getScoreColor(site.score)}`}>
                      {site.score}/100
                    </span>
                  </div>

                  {/* Scores détaillés */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-white">{site.performance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accessibilité</span>
                      <span className="text-white">{site.accessibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SEO</span>
                      <span className="text-white">{site.seo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bonnes pratiques</span>
                      <span className="text-white">{site.bestPractices}</span>
                    </div>
                  </div>

                  {/* Métadonnées */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <span>Dernier audit : {new Date(site.lastAudit).toLocaleDateString('fr-FR')}</span>
                      <span>{site.auditsCount} audits</span>
                    </div>
                    <span className={`font-medium ${getImprovementColor(site.lastImprovement)}`}>
                      {site.lastImprovement}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-800">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                      <Eye className="w-4 h-4 mr-1" />
                      Voir suivi
                    </Button>
                    <div>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700/50">
                        <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredSites.length === 0 && (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Aucun site trouvé</h3>
                <p className="text-gray-400">Aucun site ne correspond à vos critères de recherche.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
