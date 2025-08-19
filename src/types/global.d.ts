// Types globaux pour l'application Velocity

// Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: {
        page_title?: string;
        page_location?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Performance API extensions
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

// Navigator extensions
declare global {
  interface Navigator {
    connection?: {
      effectiveType: string;
      downlink: number;
      rtt: number;
    };
  }
}

export {};
