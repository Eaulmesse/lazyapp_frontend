"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Calendar, Star } from "lucide-react";

interface WaitlistStats {
  totalSubscribers: number;
  preferenceStats: Array<{ preference: string; count: number }>;
  dailyStats: Array<{ date: string; count: number }>;
  recentSubscribers: Array<{ email: string; preferences: string[]; createdAt: string }>;
}

export default function WaitlistStats() {
  const [stats, setStats] = useState<WaitlistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/waitlist/stats');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des statistiques');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-400 mt-2">Chargement des statistiques...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Erreur: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const preferenceLabels: Record<string, string> = {
    seo: "Optimisation SEO",
    performance: "Performance web",
    accessibility: "Accessibilité",
    bestPractices: "Bonnes pratiques"
  };

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center"
        >
          <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{stats.totalSubscribers}</div>
          <div className="text-gray-400 text-sm">Inscrits total</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center"
        >
          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">
            {stats.dailyStats.reduce((sum, day) => sum + day.count, 0)}
          </div>
          <div className="text-gray-400 text-sm">Cette semaine</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center"
        >
          <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">
            {stats.preferenceStats.length > 0 ? stats.preferenceStats[0].preference : "N/A"}
          </div>
          <div className="text-gray-400 text-sm">Préférence top</div>
        </motion.div>
      </div>

      {/* Préférences populaires */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Préférences populaires</h3>
        <div className="space-y-3">
          {stats.preferenceStats.map((pref, index) => (
            <div key={pref.preference} className="flex items-center justify-between">
              <span className="text-gray-300">
                {preferenceLabels[pref.preference] || pref.preference}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(pref.count / stats.totalSubscribers) * 100}%` }}
                  />
                </div>
                <span className="text-white text-sm font-medium">{pref.count}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dernières inscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
      >
        <h3 className="text-white font-semibold mb-4">Dernières inscriptions</h3>
        <div className="space-y-3">
          {stats.recentSubscribers.map((subscriber, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
              <div>
                <div className="text-white font-medium">{subscriber.email}</div>
                <div className="text-gray-400 text-sm">
                  {subscriber.preferences.map(pref => preferenceLabels[pref] || pref).join(', ')}
                </div>
              </div>
              <div className="text-gray-500 text-sm">
                {new Date(subscriber.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
