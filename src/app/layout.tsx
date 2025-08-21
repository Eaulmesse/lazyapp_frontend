import type { Metadata, Viewport } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
// import PerformanceMonitor from "@/components/PerformanceMonitor";
import Script from "next/script";
import { LazyMotion, domAnimation } from "framer-motion";

// Optimisation des polices avec preload et display swap
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Métadonnées de viewport optimisées
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
};

// Métadonnées SEO complètes et optimisées
export const metadata: Metadata = {
  metadataBase: new URL("https://velocity.com"),
  title: {
    default: "Velocity - Optimisation de sites web alimentée par l'IA",
    template: "%s | Velocity"
  },
  description: "Arrêtez de deviner, commencez à optimiser. Velocity exécute des audits Lighthouse instantanés et vous donne des conseils personnalisés et actionnables de l'IA pour améliorer vos performances web.",
  keywords: [
    "optimisation de sites web",
    "audit Lighthouse",
    "IA",
    "performance web",
    "SEO",
    "développement web",
    "optimisation performance",
    "analyse de sites web",
    "recommandations IA",
    "audit de performance",
    "optimisation Core Web Vitals",
    "amélioration SEO",
    "outil de développement web"
  ],
  authors: [{ name: "Équipe Velocity", url: "https://velocity.com" }],
  creator: "Velocity",
  publisher: "Velocity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-verification-google",
    yandex: "votre-code-verification-yandex",
    yahoo: "votre-code-verification-yahoo",
  },
  alternates: {
    canonical: "https://velocity.com",
    languages: {
      "fr-FR": "https://velocity.com",
      "en-US": "https://velocity.com/en",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://velocity.com",
    siteName: "Velocity",
    title: "Velocity - Optimisation de sites web alimentée par l'IA",
    description: "Arrêtez de deviner, commencez à optimiser. Velocity exécute des audits Lighthouse instantanés et vous donne des conseils personnalisés et actionnables de l'IA pour améliorer vos performances web.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Velocity - Optimisation de sites web alimentée par l'IA",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@velocity",
    creator: "@velocity",
    title: "Velocity - Optimisation de sites web alimentée par l'IA",
    description: "Arrêtez de deviner, commencez à optimiser. Velocity exécute des audits Lighthouse instantanés et vous donne des conseils personnalisés et actionnables de l'IA pour améliorer vos performances web.",
    images: ["/twitter-image.png"],
  },
  other: {
    "application-name": "Velocity",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Velocity",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
  },
};

// Structured Data JSON-LD pour SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Velocity",
  "description": "Outil d'optimisation de sites web alimenté par l'IA qui exécute des audits Lighthouse et fournit des recommandations personnalisées",
  "url": "https://velocity.com",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  },
  "author": {
    "@type": "Organization",
    "name": "Velocity",
    "url": "https://velocity.com"
  },
  "featureList": [
    "Audits Lighthouse instantanés",
    "Recommandations IA personnalisées",
    "Analyse de performance",
    "Optimisation SEO",
    "Rapports détaillés"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${sourceSans.variable}`}>
      <body className="antialiased bg-black text-white">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Google Analytics avec consentement - seulement en production */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'GA_MEASUREMENT_ID', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
        
        {/* Performance Monitor */}
        {/* <PerformanceMonitor /> */}
        
        {/* Configuration Framer Motion optimisée pour l'hydratation */}
        <LazyMotion features={domAnimation} strict>
          <main>{children}</main>
        </LazyMotion>
      </body>
    </html>
  );
}
