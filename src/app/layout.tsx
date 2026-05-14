import type { Metadata } from "next";
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
  icons: {
    icon: "/logo-dimali.png",
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
      <body
        className={`${playfair.variable} ${lato.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
