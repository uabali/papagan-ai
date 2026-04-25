import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Papagan AI — Yapay Zeka Modelleri API",
    template: "%s | Papagan AI",
  },
  description:
    "100+ LLM, görüntü, ses ve embedding modelini tek API ile kullanın. Serverless inference, dedicated endpoints, fine-tuning ve ham GPU erişimi.",
  keywords: ["AI", "LLM", "API", "inference", "fine-tuning", "GPU", "yapay zeka"],
  openGraph: {
    title: "Papagan AI",
    description: "Yapay zeka modellerini üretimde çalıştırmanın en hızlı yolu",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
