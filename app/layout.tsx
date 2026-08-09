import type { Metadata } from "next";
import "./globals.css"; // Falls Ihre CSS-Datei woanders liegt, Pfad anpassen

// 🔏 STRUKTURIERTE PRODUCTION METADATA ENGINE (SEO AUDITED)
export const metadata: Metadata = {
  title: "NISOUFERRIES | Traversa Premium Fährbuchungsportal",
  description: "Buchen Sie Ihre Fährüberfahrt von Marseille nach Algier und Tunis. Sichere Echtzeit-Reservierung, Kabinen-Garantie und PCI-konforme Stripe-Zahlungsabwicklung.",
  keywords: ["Fähre Algier", "Fähre Marseille Algiers", "Corsica Linea buchen", "Nisou Ferries", "Traversa Gate"],
  alternates: {
    languages: {
      "de-DE": "/de",
      "fr-FR": "/fr",
      "ar-DZ": "/ar"
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://w3.org viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚢</text></svg>" />
      </head>
      <body className="antialiased selection:bg-[#0d9488]/30">
        {children}
      </body>
    </html>
  );
}
