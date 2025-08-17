// Types globaux pour les optimisations de performance

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }

  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }

  interface Navigator {
    connection?: {
      effectiveType: string;
      downlink: number;
      rtt: number;
      saveData: boolean;
    };
  }
}

export {};
