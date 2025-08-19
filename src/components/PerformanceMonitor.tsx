"use client";

import { useEffect, useState } from "react";

interface CustomMetric {
  name: string;
  value: number;
  unit: string;
}

export default function PerformanceMonitor() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Mesures personnalisées
    const measureCustomMetrics = () => {
      if (typeof window === "undefined") return;

      const metrics: CustomMetric[] = [];

      // Temps de chargement de la page
      if (window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          metrics.push({
            name: 'Page Load Time',
            value: navigation.loadEventEnd - navigation.loadEventStart,
            unit: 'ms'
          });
        }
      }

      // Première peinture
      if (window.performance) {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        if (firstPaint) {
          metrics.push({
            name: 'First Paint',
            value: firstPaint.startTime,
            unit: 'ms'
          });
        }
      }

      // Première peinture de contenu
      if (window.performance) {
        const paintEntries = performance.getEntriesByType('paint');
        const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (firstContentfulPaint) {
          metrics.push({
            name: 'First Contentful Paint',
            value: firstContentfulPaint.startTime,
            unit: 'ms'
          });
        }
      }

      // Utilisation mémoire (si disponible)
      if (window.performance && window.performance.memory) {
        metrics.push({
          name: 'Memory Usage',
          value: window.performance.memory.usedJSHeapSize / 1024 / 1024, // MB
          unit: 'MB'
        });
      }

      // Vitesse réseau (si disponible)
      if (window.navigator && window.navigator.connection) {
        metrics.push({
          name: 'Network Speed',
          value: window.navigator.connection.downlink,
          unit: 'Mbps'
        });
      }

      // Log des métriques personnalisées
      metrics.forEach(metric => {
        if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
          window.gtag("event", metric.name, {
            event_category: "Performance",
            value: Math.round(metric.value),
            custom_parameter_1: metric.unit,
          });
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(`📈 ${metric.name}:`, `${Math.round(metric.value)}${metric.unit}`);
        }
      });
    };

    // Mesurer après le chargement complet
    if (document.readyState === 'complete') {
      measureCustomMetrics();
    } else {
      window.addEventListener('load', measureCustomMetrics);
    }

    // Observer les changements de performance
    if (typeof window !== "undefined" && window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('🔍 Performance Entry:', entry);
            }
          });
        });

        observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
      } catch (error) {
        console.warn('PerformanceObserver non supporté:', error);
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', measureCustomMetrics);
    };
  }, [isClient]);

  return null;
}
