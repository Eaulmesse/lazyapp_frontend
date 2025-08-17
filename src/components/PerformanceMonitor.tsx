"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  FCP: number;
  LCP: number;
  FID: number;
  CLS: number;
  TTFB: number;
}

export default function PerformanceMonitor() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Fonction pour envoyer les métriques à Analytics
    const sendToAnalytics = (metric: { name: string; value: number; id: string }) => {
      // Google Analytics 4
      if (typeof window !== "undefined" && typeof gtag !== "undefined") {
        gtag("event", metric.name, {
          event_category: "Web Vitals",
          event_label: metric.id,
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Console pour le développement
      if (process.env.NODE_ENV === "development") {
        console.log(`Web Vital: ${metric.name} = ${metric.value}`);
      }

      // Stockage local pour analyse
      if (typeof window !== "undefined") {
        const metrics = JSON.parse(localStorage.getItem("web-vitals") || "{}");
        metrics[metric.name] = {
          value: metric.value,
          timestamp: Date.now(),
        };
        localStorage.setItem("web-vitals", JSON.stringify(metrics));
      }
    };

    // Import dynamique de web-vitals avec gestion d'erreur
    const loadWebVitals = async () => {
      try {
        const webVitals = await import("web-vitals");
        
        if (webVitals && typeof webVitals.getCLS === 'function') {
          webVitals.getCLS(sendToAnalytics);
          webVitals.getFID(sendToAnalytics);
          webVitals.getFCP(sendToAnalytics);
          webVitals.getLCP(sendToAnalytics);
          webVitals.getTTFB(sendToAnalytics);
        } else {
          console.warn('Web Vitals functions not available');
        }
      } catch (error) {
        console.error("Erreur lors du chargement de web-vitals:", error);
      }
    };

    // Mesures de performance personnalisées
    const measureCustomMetrics = () => {
      if (typeof window === "undefined") return;

      // Temps de chargement de la page
      window.addEventListener("load", () => {
        const loadTime = performance.now();
        sendToAnalytics({
          name: "PageLoadTime",
          value: loadTime,
          id: "page-load",
        });
      });

      // Temps de First Paint
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === "first-paint") {
                sendToAnalytics({
                  name: "FirstPaint",
                  value: entry.startTime,
                  id: "first-paint",
                });
              }
            }
          });
          observer.observe({ entryTypes: ["paint"] });
        } catch (error) {
          console.warn('PerformanceObserver not supported:', error);
        }
      }
    };

    // Mesures d'interaction
    const measureInteractionMetrics = () => {
      if (typeof window === "undefined" || typeof document === "undefined") return;

      let firstInteraction = true;

      const interactionHandler = () => {
        if (firstInteraction) {
          const interactionTime = performance.now();
          sendToAnalytics({
            name: "FirstInteraction",
            value: interactionTime,
            id: "first-interaction",
          });
          firstInteraction = false;
        }
      };

      // Écouter les interactions utilisateur
      document.addEventListener("click", interactionHandler, { once: true });
      document.addEventListener("keydown", interactionHandler, { once: true });
      document.addEventListener("touchstart", interactionHandler, { once: true });
    };

    // Mesures de mémoire
    const measureMemoryUsage = () => {
      if (typeof window === "undefined" || !("performance" in window)) return;
      
      const perf = performance as any;
      if (perf.memory) {
        sendToAnalytics({
          name: "MemoryUsage",
          value: perf.memory.usedJSHeapSize / 1024 / 1024, // MB
          id: "memory-usage",
        });
      }
    };

    // Mesures de réseau
    const measureNetworkMetrics = () => {
      if (typeof window === "undefined" || !("navigator" in window)) return;
      
      const nav = navigator as any;
      if (nav.connection) {
        sendToAnalytics({
          name: "NetworkSpeed",
          value: nav.connection.downlink || 0,
          id: "network-speed",
        });
      }
    };

    // Initialisation des mesures
    loadWebVitals();
    measureCustomMetrics();
    measureInteractionMetrics();

    // Mesures périodiques
    const interval = setInterval(() => {
      measureMemoryUsage();
      measureNetworkMetrics();
    }, 30000); // Toutes les 30 secondes

    return () => {
      clearInterval(interval);
    };
  }, [isClient]);

  // Ce composant ne rend rien visuellement
  return null;
}
