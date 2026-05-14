import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B2A4A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Di Mali — Manos Mágicas | Sombreros de Paja Toquilla Ecuatorianos",
  description:
    "Hermosas artesanías Ecuatorianas en paja toquilla. Sombreros hechos a mano con tradición y elegancia. Solicita nuestro catálogo y brilla con artesanía local.",
  keywords: [
    "sombreros de paja toquilla",
    "Panama hat",
    "artesanías ecuatorianas",
    "Di Mali",
    "paja toquilla",
    "sombreros artesanales",
    "Ecuador",
    "manos mágicas",
  ],
  authors: [{ name: "Di Mali" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DiMali",
  },
  openGraph: {
    title: "Di Mali — Manos Mágicas",
    description:
      "Hermosas artesanías Ecuatorianas en paja toquilla. Solicita nuestro catálogo y brilla con artesanía local.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Di Mali — Manos Mágicas",
    description:
      "Hermosas artesanías Ecuatorianas en paja toquilla. Solicita nuestro catálogo y brilla con artesanía local.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DiMali" />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
